import { Classes } from '@app/schemas/classes.schema';
import { Body, Controller, Get, Post } from '@nestjs/common';
import { ClassesService } from './classes.service';
import { CreateClassDto } from './dto/classes.dto';

@Controller('classes')
export class ClassesController {
  constructor(private readonly classesService: ClassesService) {}

  @Get()
  async findAll(): Promise<Classes[]> {
    return this.classesService.findAll();
  }

  @Post()
  async create(@Body() body: CreateClassDto): Promise<CreateClassDto> {
    return this.classesService.create(body);
  }
}
