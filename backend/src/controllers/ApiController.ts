import { Request, Response } from "express";
import isBase64 from "is-base64";
import { validationResult } from "express-validator";
import {
  UploadRequestBody,
  UploadResponseBadRequest,
  UploadResponseConflict,
  UploadResponseOK,
} from "../types";
import { StatusCodes } from "http-status-codes";

class ApiController {
  async upload(req: Request<{}, {}, UploadRequestBody>, res: Response) {
    const body = req.body;

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
}

export default ApiController;
