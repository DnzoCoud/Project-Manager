import { HttpException, HttpStatus } from '@nestjs/common';

export class DuplicatedResourceException extends HttpException {
  constructor(message: string = 'Este recurso ya existe') {
    super(message, HttpStatus.BAD_REQUEST);
  }
}
