import { Controller, Get, Query } from '@nestjs/common';
import { SubjectService } from './subject.service';

@Controller('subject')
export class SubjectController {
  constructor(private readonly subjectService: SubjectService) {}

  @Get()
  async findAll(
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 10,
    @Query('filter') filter: string = '{}',
    @Query('projection') projection: string = '',
    @Query('sortBy') sortBy: string = 'createdAt',
    @Query('sortOrder') sortOrder: string = 'asc',
  ) {
    const parsedFilter = filter && JSON.parse(filter);
    const parsedProjection = projection
      ? projection
          .split(' ')
          .reduce((acc, field) => ({ ...acc, [field]: 1 }), {})
      : {};

    return this.subjectService.findAll(
      page,
      limit,
      parsedFilter,
      parsedProjection,
      sortBy,
      sortOrder,
    );
  }
}
