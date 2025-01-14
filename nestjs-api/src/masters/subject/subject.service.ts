import { CommonService } from '@app/common/services/common.service';
import { Injectable } from '@nestjs/common';
import { SubjectModel } from './model/subject.model';

@Injectable()
export class SubjectService extends CommonService {
  constructor(private readonly subjectModel: SubjectModel) {
    super(subjectModel);
  }
}
