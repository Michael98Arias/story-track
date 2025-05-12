import type { AxiosError } from 'axios';

export interface IHttpError {
  statusCode: number;
  message: string;
  error?: string;
}

export class HttpErrorFactory {
  static fromAxiosError(error: AxiosError): IHttpError {
    return {
      statusCode: error.response?.status || 500,
      message: (error.response?.data as { message?: string })?.message || 'Error inesperado',
      error: error.message,
    };
  }
}
