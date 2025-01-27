import { HttpStatus } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';

export class ServerException extends RpcException {
  constructor(message: string = 'Error del servidor') {
    super({
      message,
      statusCode: HttpStatus.INTERNAL_SERVER_ERROR, // 500
    });
  }
}
export class BadRequestException extends RpcException {
  constructor(message: string = 'Datos Incorrectos') {
    super({
      message,
      statusCode: HttpStatus.BAD_REQUEST, // 400
    });
  }
}

export class ForbiddenException extends RpcException {
  constructor(message: string = 'Forbidden') {
    super({
      message,
      statusCode: HttpStatus.FORBIDDEN, // 403
    });
  }
}

export class UnathorizetException extends RpcException {
  constructor(message: string = 'Unauthorize') {
    super({
      message,
      statusCode: HttpStatus.UNAUTHORIZED, // 401
    });
  }
}
