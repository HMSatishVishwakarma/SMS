import { objectIdDto } from '@app/common/dto/common.dto';
import { Classes } from '@app/schemas/classes.schema';
import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { ClassesService } from './classes.service';
import { CreateClassDto, StatusUpdateDTO } from './dto/classes.dto';

@Controller('classes')
export class ClassesController {
  constructor(private readonly classesService: ClassesService) {}

  @Get()
  async findAll(): Promise<Classes[]> {
    return this.classesService.findAll();
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
