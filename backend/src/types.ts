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

export interface UploadResponseError {
  error_code: ErrorCodeType;
  error_description: string;
}

export interface UploadResponseBadRequest extends UploadResponseError {}

export interface UploadResponseConflict extends UploadResponseError {}

export type ConfirmErrorCodeType =
  | "INVALID_DATA"
  | "MEASURE_NOT_FOUND"
  | "CONFIRMATION_DUPLICATE";
export interface ConfirmRequestBody {
  measure_uuid: string;
  confirmed_value: number;
}

export interface ConfirmResponseOK {
  success: boolean;
}

export interface ConfirmResponseError {
  error_code: ConfirmErrorCodeType;
  error_description: string | any[];
}

export interface ConfirmResponseBadRequest extends ConfirmResponseError {}

export interface ConfirmResponseNotFound extends ConfirmResponseError {}

export interface ConfirmResponseConflict extends ConfirmResponseError {}

export interface CustomerCodeListMeasure {
  measure_uuid: string;
  measure_datetime: Date;
  measure_type: string;
  has_confirmed: boolean;
  image_url: string;
}

export interface CustomerCodeListResponse {
  customer_code: string;
  measures: CustomerCodeListMeasure[];
}

export type CustomerCodeListErrorCodeType =
  | "INVALID_TYPE"
  | "MEASURES_NOT_FOUND";

export interface CustomerCodeListResponseError {
  error_code: CustomerCodeListErrorCodeType;
  error_description: string;
}

export interface CustomerCodeListResponseBadRequest
  extends CustomerCodeListResponseError {}

export interface CustomerCodeListResponseNotFound
  extends CustomerCodeListResponseError {}
