import { Controller, Get } from '@nestjs/common';
import { ProjectManagerApiGateawayService } from './project-manager-api-gateaway.service';

@Controller()
export class ProjectManagerApiGateawayController {
  constructor(private readonly projectManagerApiGateawayService: ProjectManagerApiGateawayService) {}

  @Get()
  getHello(): string {
    return this.projectManagerApiGateawayService.getHello();
  }
}
