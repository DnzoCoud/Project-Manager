import { Test, TestingModule } from '@nestjs/testing';
import { ProjectManagerApiGateawayController } from './project-manager-api-gateaway.controller';
import { ProjectManagerApiGateawayService } from './project-manager-api-gateaway.service';

describe('ProjectManagerApiGateawayController', () => {
  let projectManagerApiGateawayController: ProjectManagerApiGateawayController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [ProjectManagerApiGateawayController],
      providers: [ProjectManagerApiGateawayService],
    }).compile();

    projectManagerApiGateawayController = app.get<ProjectManagerApiGateawayController>(ProjectManagerApiGateawayController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(projectManagerApiGateawayController.getHello()).toBe('Hello World!');
    });
  });
});
