// common.service.ts
import { Injectable } from '@nestjs/common';
import { objectIdDto } from '../dto/index.dto';

@Injectable()
export class CommonService {
  constructor(private readonly commonService) {}

  async findAll(
    page,
    limit,
    parsedFilter,
    parsedProjection,
    sortBy,
    sortOrder,
  ) {
    // parsedFilter = {
    //   status: { $ne: 0 },
    //   ...parsedFilter,
    // };

    return this.commonService.getPaginatedData(
      page,
      limit,
      parsedFilter,
      parsedProjection,
      sortBy,
      sortOrder,
    );
  }

  async updateStatus(id: objectIdDto, body) {
    return this.commonService.findByIdAndUpdate(id, {
      status: body.status,
      updatedAt: new Date(),
    });
  }

  async create(body) {
    await this.commonService.save(body);
    return 'Data Saved successfully.';
  }

  async getDataById(id) {
    return this.commonService.findById(id);
  }

  async updateData(id: objectIdDto, body) {
    body.updatedAt = new Date();
    await this.commonService.findByIdAndUpdate(id, body);
    return 'Data Updated successfully.';
  }

  async findAllData() {
    return await this.commonService.find({ status: { $ne: 0 } });
  }
}
