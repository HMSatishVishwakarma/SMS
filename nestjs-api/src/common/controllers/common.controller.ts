// common.controller.ts
import { Body, Get, Param, Post, Put, Query } from '@nestjs/common';
import { objectIdDto } from '../dto/index.dto';

export class CommonController {
  constructor(private readonly commonService) {}

  @Post()
  create(@Body() createDto) {
    return this.commonService.create(createDto);
  }

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

    return this.commonService.findAll(
      page,
      limit,
      parsedFilter,
      parsedProjection,
      sortBy,
      sortOrder,
    );
  }

  @Get('all')
  getAllData() {
    return this.commonService.findAllData();
  }

  @Put('updateStatus/:id')
  async updateStatus(@Param('id') id: objectIdDto, @Body() body) {
    return this.commonService.updateStatus(id, body);
  }

  @Get(':id')
  getClassById(@Param('id') id: objectIdDto) {
    return this.commonService.getDataById(id);
  }

  @Put(':id')
  async updateData(@Param('id') id: objectIdDto, @Body() body) {
    return this.commonService.updateData(id, body);
  }
}
