import { Classes } from '@app/schemas/classes.schema';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { CreateClassDto } from './dto/classes.dto';
import { ClassesModel } from './model/class.model';

@Injectable()
export class ClassesService {
  constructor(
    @InjectModel(Classes.name) private readonly classModel: ClassesModel,
  ) {}

  async findAll(): Promise<Classes[]> {
    return this.classModel.find({});
  }

  async create({ className, status }: CreateClassDto) {
    return await this.classModel.create({
      className,
      status,
      createdBy: new Date(),
      updatedBy: new Date(),
    });
  }
}
