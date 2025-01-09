import { PaginationResponse } from '@app/common/interfaces';
import { Subject } from '@app/schemas';
import { Injectable } from '@nestjs/common';
import { SubjectModel } from './model/subject.model';

@Injectable()
export class SubjectService {
  constructor(private readonly subjectModel: SubjectModel) {}

  async findAll(
    page,
    limit,
    parsedFilter,
    parsedProjection,
    sortBy,
    sortOrder,
  ): Promise<PaginationResponse<Subject[]>> {
    return this.subjectModel.getPaginatedData(
      page,
      limit,
      parsedFilter,
      parsedProjection,
      sortBy,
      sortOrder,
    );
  }
}
