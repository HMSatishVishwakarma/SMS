import { Test, TestingModule } from '@nestjs/testing';
import { AppConfigurationController } from './app-configuration.controller';

describe('AppConfigurationController', () => {
  let controller: AppConfigurationController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AppConfigurationController],
    }).compile();

    controller = module.get<AppConfigurationController>(
      AppConfigurationController,
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
