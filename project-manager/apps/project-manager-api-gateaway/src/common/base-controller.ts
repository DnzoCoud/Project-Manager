import { HttpException, HttpStatus } from '@nestjs/common';

export class BaseController {
  protected successResponse<T>(
    data: T,
    message: string = 'Success',
    statusCode = HttpStatus.OK,
  ) {
    return {
      status: 'success',
      message,
      data,
      statusCode,
    };
  }

  protected errorResponse(
    error: any,
    message: string = 'Error',
    statusCode: HttpStatus = HttpStatus.INTERNAL_SERVER_ERROR,
  ) {
    const status =
      error instanceof HttpException ? error.getStatus() : statusCode;
    return {
      status: 'error',
      message,
      data: null,
      error: error.message || 'An unexpected error occurred',
      statusCode: status,
    };
  }
}
