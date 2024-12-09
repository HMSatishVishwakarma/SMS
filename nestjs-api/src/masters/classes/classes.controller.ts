import { Classes } from '@app/schemas/classes.schema';
import { Controller, Get } from '@nestjs/common';
import { ClassesService } from './classes.service';

@Controller('classes')
export class ClassesController {
  constructor(private readonly classesService: ClassesService) {}

  @Get()
  async findAll(): Promise<Classes[]> {
    return this.classesService.findAll();
  }
}
