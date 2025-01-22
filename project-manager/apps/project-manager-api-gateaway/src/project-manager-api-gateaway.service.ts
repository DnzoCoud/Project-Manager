import { Injectable } from '@nestjs/common';

@Injectable()
export class ProjectManagerApiGateawayService {
  getHello(): string {
    return 'Hello World!';
  }
}
