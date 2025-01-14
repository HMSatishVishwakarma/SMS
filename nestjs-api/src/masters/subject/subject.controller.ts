import { CommonController } from '@app/common/controllers/common.controller';
import { Controller } from '@nestjs/common';
import { SubjectService } from './subject.service';

@Controller('subject')
export class SubjectController extends CommonController {
  constructor(private readonly subjectService: SubjectService) {
    super(subjectService);
  }
}
