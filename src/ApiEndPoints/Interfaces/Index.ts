export interface IEndPointResponse {
  error: IResponseError;
  status: boolean;
  response: any;
}

export interface IResponseError {
  errorCode: string | null;
  errorMessage: string | null;
}
