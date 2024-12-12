import { Controller, Get, Query } from '@nestjs/common';
import { AppConfigurationService } from './app-configuration.service';

@Controller('app-configuration')
export class AppConfigurationController {
  constructor(private readonly appConfig: AppConfigurationService) {}

  @Get('getHeaderConfig')
  async getClassConfig(@Query('tableName') tableName: string) {
    try {
      const config = await this.appConfig.getClassTableConfig(tableName);
      return config;
    } catch (error) {
      return { message: error.message };
    }
  }
}
