import { IResponseError } from '../../ApiEndPoints/Interfaces/Index';

const ApiResponseError = (
  errorCode: string | null,
  errorMessage: string | null = null
): IResponseError => {
  return {
    errorCode,
    errorMessage,
  };
};

export default ApiResponseError;
