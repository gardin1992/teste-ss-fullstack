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

class ApiController {
  async upload(req: Request<{}, {}, UploadRequestBody>, res: Response) {
    const result = validationResult(req);

    if (result.isEmpty()) {
      return res.status(StatusCodes.OK).json({
        image_url: "string",
        measure_value: 10,
        measure_uuid: "string",
      } as UploadResponseOK);
    } else {
      return res.status(StatusCodes.BAD_REQUEST).json({
        error_code: "INVALID_DATA",
        error_description: "descrição do erro",
      } as UploadResponseBadRequest);
    }

    return res.status(StatusCodes.CONFLICT).json({
      error_code: "DOUBLE_REPORT",
      error_description: "Leitura do mês já realizada",
    } as UploadResponseConflict);
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
