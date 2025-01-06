import { objectIdDto } from '@app/common/dto/common.dto';
import { PaginationResponse } from '@app/common/interfaces';
import { Classes } from '@app/schemas/classes.schema';
import { Body, Controller, Get, Param, Post, Put, Query } from '@nestjs/common';
import { ClassesService } from './classes.service';
import { CreateClassDto, StatusUpdateDTO } from './dto/classes.dto';

@Controller('classes')
export class ClassesController {
  constructor(private readonly classesService: ClassesService) {}

  @Get()
  async findAll(
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 10,
    @Query('filter') filter: string = '{}',
    @Query('projection') projection: string = '',
    @Query('sortBy') sortBy: string = 'createdAt',
    @Query('sortOrder') sortOrder: string = 'asc',
  ): Promise<PaginationResponse<Classes[]>> {
    const parsedFilter = JSON.parse(filter);
    const parsedProjection = projection
      ? projection
          .split(' ')
          .reduce((acc, field) => ({ ...acc, [field]: 1 }), {})
      : {};

    return this.classesService.getDataWithPagination(
      page,
      limit,
      parsedFilter,
      parsedProjection,
      sortBy,
      sortOrder,
    );
  }

  @Post()
  async create(@Body() body: CreateClassDto): Promise<string> {
    return this.classesService.create(body);
  }

  @Put('updateStatus/:id')
  async updateStatus(
    @Param('id') id: objectIdDto,
    @Body() body: StatusUpdateDTO,
  ) {
    return this.classesService.updateStatus(id, body);
  }

  @Get(':id')
  getClassById(@Param('id') id: objectIdDto) {
    return this.classesService.getClassById(id);
  }

  @Put(':id')
  async updateClass(
    @Param('id') id: objectIdDto,
    @Body() body: StatusUpdateDTO,
  ) {
    return this.classesService.updateClass(id, body);
  }
}
