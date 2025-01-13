import { filterSettingsByNameAndAppendFirst } from '@app/common/model/Utils/helper';
import { AppConfiguration } from '@app/schemas/app-configuration.schema';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { AppConfigModel } from './model/app-configuration.model';

@Injectable()
export class AppConfigurationService {
  constructor(
    @InjectModel(AppConfiguration.name)
    private readonly appConfig: AppConfigModel,
  ) {}

  async getClassTableConfig(header: string) {
    const config = await this.appConfig.findOne({
      name: 'tableHeaderConfig',
      'setting.name': header,
    });

    if (!config) {
      throw new Error('Configuration not found');
    }

    return filterSettingsByNameAndAppendFirst(config.setting, header);
  }
}
