import {
  AppConfiguration,
  AppConfigurationSchema,
} from '@app/schemas/app-configuration.schema';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppConfigurationController } from './app-configuration.controller';
import { AppConfigurationService } from './app-configuration.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: AppConfiguration.name, schema: AppConfigurationSchema },
    ]),
  ],

  providers: [AppConfigurationService],
  controllers: [AppConfigurationController],
})
export class AppConfigurationModule {}
