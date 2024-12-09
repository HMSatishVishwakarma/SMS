import { Classes } from '@app/schemas/classes.schema';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { ClassesModel } from './model/class.model';

@Injectable()
export class ClassesService {
  constructor(
    @InjectModel(Classes.name) private readonly classModel: ClassesModel,
  ) {}

  async findAll(): Promise<Classes[]> {
    return this.classModel.findAll();
  }
}
