import { BaseModel } from '@app/common/model/baseModel.model';
import { Classes } from '@app/schemas/classes.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

export class ClassesModel extends BaseModel {
  constructor(
    @InjectModel(Classes.name)
    private classesModel: Model<Classes>,
  ) {
    super(classesModel);
  }

  create(data: object) {
    return this.save(data);
  }
}
