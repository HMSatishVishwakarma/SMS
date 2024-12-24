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
    return this.classModel.find({ status: { $ne: 0 } }, {}, { createdAt: 1 });
  }

  async create({ className, status }: CreateClassDto) {
    await this.classModel.create({
      className,
      status,
      createdBy: new Date(),
      updatedBy: new Date(),
    });

    return 'Data Saved successfully.';
  }

  async updateStatus(id: objectIdDto, body: StatusUpdateDTO) {
    return this.classModel.findByIdAndUpdate(id, {
      status: body.status,
    });
  }

  async getClassById(id) {
    return this.classModel.findById(id, { _id: 1, className: 1, status: 1 });
  }

  async updateClass(id: objectIdDto, body: StatusUpdateDTO) {
    await this.classModel.findByIdAndUpdate(id, body);

    return 'Data Updated successfully.';
  }
}
