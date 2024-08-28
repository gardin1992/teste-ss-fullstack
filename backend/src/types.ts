export type Base64 = string;
export type MeasureType = "WATER" | "GAS";
export type ErrorCodeType = "INVALID_DATA" | "DOUBLE_REPORT";

export interface UploadRequestBody {
  image: Base64;
  customer_code: string;
  measure_datetime: string;
  measure_type: MeasureType;
}

export interface UploadResponseOK {
  image_url: string;
  measure_value: number;
  measure_uuid: string;
}

export interface UploadResponseBadRequest {
  error_code: ErrorCodeType;
  error_description: string;
}

export interface UploadResponseConflict {
  error_code: ErrorCodeType;
  error_description: string;
}
