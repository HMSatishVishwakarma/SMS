import { objectIdDto } from '@app/common/dto/common.dto';
import { PaginationResponse } from '@app/common/interfaces';
import { Classes } from '@app/schemas/classes.schema';
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

  async create({ className, status, subjects }: CreateClassDto) {
    // Save the new class to the database
    await this.classModel.save({
      className,
      status,
      createdBy: new Date(),
      updatedBy: new Date(),
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      subjects: subjects.map((i: any) => i?.id),
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
    return this.classModel
      .findById(id, { _id: 1, className: 1, status: 1 })
      .populate('subjects', 'name');
  }

  async updateClass(id: objectIdDto, body: CreateClassDto) {
    body.updatedAt = new Date();

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (body.subjects = body.subjects.map((i: any) => i?.id)),
      await this.classModel.findByIdAndUpdate(id, body);

    console.log(body, '------------------');

    return 'Data Updated successfully.';
  }

  getDataWithPagination(
    page,
    limit,
    filter,
    projection,
    sortBy,
    sortOrder,
  ): Promise<PaginationResponse<Classes[]>> {
    return this.classModel.getPaginatedDataWithSubject(
      page,
      limit,
      filter,
      projection,
      sortBy,
      sortOrder,
    );
  }
}
