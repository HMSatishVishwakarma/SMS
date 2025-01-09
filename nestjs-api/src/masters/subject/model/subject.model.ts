import { BaseModel } from '@app/common/model/baseModel.model';
import { Subject } from '@app/schemas';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

export class SubjectModel extends BaseModel {
  constructor(
    @InjectModel(Subject.name)
    private subjectModel: Model<Subject>,
  ) {
    super(subjectModel);
  }
}
