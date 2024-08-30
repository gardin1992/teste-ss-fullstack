import { Request, Response } from "express";
import { validationResult } from "express-validator";
import {
  ConfirmRequestBody,
  ConfirmResponseBadRequest,
  ConfirmResponseNotFound,
  ConfirmResponseOK,
  CustomerCodeListResponse,
  CustomerCodeListResponseBadRequest,
  CustomerCodeListResponseNotFound,
  UploadRequestBody,
  UploadResponseBadRequest,
  UploadResponseConflict,
  UploadResponseOK,
} from "../types";
import { StatusCodes } from "http-status-codes";
import { PrismaClient } from "@prisma/client";
import { setDay, lastDayOfMonth } from "date-fns";
import {
  base64Decode,
  getFullMimeTypeFromBase64,
  getMimeTypeFromFullMimeType,
  isValidMimeType,
  rootDir,
} from "../utils";
import { GoogleGenerativeAI } from "@google/generative-ai";
import {
  GoogleAIFileManager,
  UploadFileResponse,
} from "@google/generative-ai/server";

const prisma = new PrismaClient();

class ApiController {
  async upload(req: Request<{}, {}, UploadRequestBody>, res: Response) {
    try {
      const result = validationResult(req);
      if (!result.isEmpty())
        return res.status(StatusCodes.BAD_REQUEST).json({
          error_code: "INVALID_DATA",
          error_description: "descrição do erro",
        } as UploadResponseBadRequest);

      if (!isValidMimeType(req.body.image))
        return res.status(StatusCodes.BAD_REQUEST).json({
          error_code: "INVALID_DATA",
          error_description: "Tipo de imagem inválido.",
        } as UploadResponseBadRequest);

      const {
        customer_code: customerCode,
        measure_datetime: measureDatetime,
        measure_type: measureType,
        image,
      } = req.body;

      const currentDate = new Date(measureDatetime);
      const lastDay = lastDayOfMonth(currentDate);
      const firstDay = setDay(currentDate, 1);

      const countMeasures = await prisma.measures.count({
        where: {
          customerCode,
          measureType,
          measureDatetime: {
            lte: lastDay,
            gte: firstDay,
          },
        },
      });

      if (countMeasures > 0)
        return res.status(StatusCodes.CONFLICT).json({
          error_code: "DOUBLE_REPORT",
          error_description: "Leitura do mês já realizada",
        } as UploadResponseConflict);

      const mimeType = getFullMimeTypeFromBase64(image);
      const pathname = `${rootDir}/uploads/${customerCode}${Date.now()}.${getMimeTypeFromFullMimeType(
        mimeType
      )}`;

      base64Decode(image.split(";base64,").pop() ?? "", pathname);

      const displayName =
        measureType === "WATER" ? "Registro de água" : "Registro de gas";

      const fileManager = new GoogleAIFileManager(
        process.env.GEMINI_API_KEY ?? ""
      );
      const uploadResponse = await fileManager.uploadFile(pathname, {
        mimeType,
        displayName,
      });

      const tempImageUrl = uploadResponse.file.uri;

      const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY ?? "");
      const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

      const context = await model.generateContent([
        {
          fileData: {
            mimeType: "image/jpeg",
            fileUri: uploadResponse.file.uri,
          },
        },
        { text: "Valor registrado" },
      ]);

      const text = context.response.text();
      const measureValue = parseInt(text);
      console.log("Valor extraido", parseInt(text));

      // salvar como uma nova leitura não confirmada
      const measure = await prisma.measures.create({
        data: {
          measureValue,
          tempImageUrl,
          customerCode,
          measureDatetime: new Date(measureDatetime),
          measureType,
          //  remover campo
          imageUrl: tempImageUrl,
        },
      });

      return res.status(StatusCodes.OK).json({
        image_url: tempImageUrl,
        measure_value: measureValue,
        measure_uuid: measure.measureUuid,
      } as UploadResponseOK);
    } catch (error: any) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        error: error.message,
      });
    }
  }

  async confirm(req: Request<{}, {}, ConfirmRequestBody>, res: Response) {
    const result = validationResult(req);

    if (result.isEmpty()) {
      return res.status(StatusCodes.OK).json({
        success: true,
      } as ConfirmResponseOK);
    }

    const errorMessages = result.array().map((r) => r.msg);

    return res.status(StatusCodes.BAD_REQUEST).json({
      error_code: "INVALID_DATA",
      error_description: errorMessages,
    } as ConfirmResponseBadRequest);

    // return res.status(StatusCodes.NOT_FOUND).json({
    //   error_code: "MEASURE_NOT_FOUND",
    //   error_description: "Leitura do mês járealizada",
    // } as ConfirmResponseNotFound);
  }

  async customerCodeList(req: Request, res: Response) {
    return res.status(StatusCodes.OK).json({} as CustomerCodeListResponse);

    return res.status(StatusCodes.BAD_REQUEST).json({
      error_code: "INVALID_TYPE",
      error_description: "errorMessages",
    } as CustomerCodeListResponseBadRequest);

    return res.status(StatusCodes.NOT_FOUND).json({
      error_code: "MEASURES_NOT_FOUND",
      error_description: "",
    } as CustomerCodeListResponseNotFound);
  }
}

export default ApiController;
