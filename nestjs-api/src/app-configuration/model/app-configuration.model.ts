import { BaseModel } from '@app/common/model/baseModel.model';
import { AppConfiguration } from '@app/schemas/app-configuration.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

export class AppConfigModel extends BaseModel {
  constructor(
    @InjectModel(AppConfiguration.name)
    private classesModel: Model<AppConfiguration>,
  ) {
    super(classesModel);
  }
}
