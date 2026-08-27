import { isAxiosError } from 'axios';

type ApiErrorBody = {
  error?: string;
  message?: string | string[];
  statusCode?: number;
};

export class ApiError extends Error {
  constructor(
    message: string,
    readonly status: number,
  ) {
    super(message);
    this.name = 'ApiError';
  }
}

export function toApiError(error: unknown) {
  if (error instanceof ApiError) return error;

  if (isAxiosError<ApiErrorBody>(error)) {
    const body = error.response?.data;
    const message = Array.isArray(body?.message) ? body.message.join('\n') : body?.message;

    return new ApiError(
      message ?? (error.response ? 'No pudimos completar la solicitud.' : 'No hay conexion con el servidor.'),
      error.response?.status ?? 0,
    );
  }

  return new ApiError('Ocurrio un error inesperado.', 0);
}
