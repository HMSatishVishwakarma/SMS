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
    parsedFilter = {
      status: { $ne: 0 },
      ...parsedFilter,
    };

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
}
