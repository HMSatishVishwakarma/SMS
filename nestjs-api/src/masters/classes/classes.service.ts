import { objectIdDto } from '@app/common/dto/common.dto';
import { Classes } from '@app/schemas/classes.schema';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { CreateClassDto, StatusUpdateDTO } from './dto/classes.dto';
import { ClassesModel } from './model/class.model';

@Injectable()
export class ClassesService {
  constructor(
    @InjectModel(Classes.name) private readonly classModel: ClassesModel,
  ) {}

  async findAll(): Promise<Classes[]> {
    return this.classModel.find({ status: { $ne: 0 } });
  }

  async create({ className, status }: CreateClassDto) {
    return await this.classModel.create({
      className,
      status,
      createdBy: new Date(),
      updatedBy: new Date(),
    });
  }

  async updateStatus(id: objectIdDto, body: StatusUpdateDTO) {
    return this.classModel.findByIdAndUpdate(id, {
      status: body.status,
    });
  }
}
