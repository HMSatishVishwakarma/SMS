import { objectIdDto } from '@app/common/dto/common.dto';
import { Injectable } from '@nestjs/common';
import { CreateClassDto, StatusUpdateDTO } from './dto/classes.dto';
import { ClassesModel } from './model/class.model';

@Injectable()
export class ClassesService {
  constructor(private readonly classModel: ClassesModel) {}

  async findAll() {
    return await this.classModel.find(
      { status: { $ne: 0 } },
      {},
      { createdAt: 1 },
    );
  }

  async create({ className, status }: CreateClassDto) {
    await this.classModel.save({
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
      updatedAt: new Date(),
    });
  }

  async getClassById(id) {
    return this.classModel.findById(id, { _id: 1, className: 1, status: 1 });
  }

  async updateClass(id: objectIdDto, body: StatusUpdateDTO) {
    body.updatedAt = new Date();

    await this.classModel.findByIdAndUpdate(id, body);

    return 'Data Updated successfully.';
  }

  getDataWithPagination(page, limit, filter, projection, sortBy, sortOrder) {
    return this.classModel.getPaginatedData(
      page,
      limit,
      filter,
      projection,
      sortBy,
      sortOrder,
    );
  }
}
