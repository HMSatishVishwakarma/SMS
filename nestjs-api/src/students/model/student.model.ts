import { AggregationOptions } from '@app/common/dto/index.dto';
import { STATUS } from '@app/common/enums';
import { BaseModel } from '@app/common/model/baseModel.model';
import { Students } from '@app/schemas';
import { InjectModel } from '@nestjs/mongoose';
import { FilterQuery, Model } from 'mongoose';

export class StudentModel extends BaseModel {
  constructor(
    @InjectModel(Students.name)
    private studentModel: Model<Students>,
  ) {
    super(studentModel);
  }

  async aggregateDocuments<T>(options: AggregationOptions): Promise<T[]> {
    const {
      pipeline = [],
      where = {},
      projection = {},
      limit = 10,
      skip = 0,
      orderBy,
      sortBy = 'asc',
      lookup = [],
      addFields = {},
      unwind = [],
    } = options;

    const filter: FilterQuery<T> = where;
    let aggregationPipeline: any[] = [{ $match: filter }];

    aggregationPipeline = aggregationPipeline.concat(pipeline);

    for (const lookupStage of lookup) {
      aggregationPipeline.push({
        $lookup: {
          from: lookupStage.from,
          localField: lookupStage.localField,
          foreignField: lookupStage.foreignField,
          as: lookupStage.as,
        },
      });
    }

    for (const unwindStage of unwind) {
      const unwindParams: any = { path: unwindStage.path };
      if (unwindStage.includeArrayIndex) {
        unwindParams.includeArrayIndex = unwindStage.includeArrayIndex;
      }
      if (unwindStage.preserveNullAndEmptyArrays !== undefined) {
        unwindParams.preserveNullAndEmptyArrays =
          unwindStage.preserveNullAndEmptyArrays;
      }
      aggregationPipeline.push({ $unwind: unwindParams });
    }

    if (Object.keys(addFields).length > 0) {
      aggregationPipeline.push({ $addFields: addFields });
    }

    if (Object.keys(projection).length > 0) {
      aggregationPipeline.push({ $project: projection });
    }

    if (orderBy && sortBy) {
      const sortStage = {};
      sortStage[orderBy] = sortBy === 'asc' ? 1 : -1;
      aggregationPipeline.push({ $sort: sortStage });
    }

    aggregationPipeline.push({ $skip: skip });
    aggregationPipeline.push({ $limit: limit });

    return await this.studentModel.aggregate(aggregationPipeline);
  }

  getStudentWithAgg() {
    return this.studentModel.aggregate([
      {
        $match: { status: { $ne: 0 } },
      },
      {
        $lookup: {
          from: 'users',
          localField: 'userId',
          foreignField: '_id',
          as: 'users',
          pipeline: [
            {
              $project: {
                'profileImage.profile': 1,
                status: 1,
              },
            },
          ],
        },
      },
      {
        $unwind: {
          path: '$users',
          preserveNullAndEmptyArrays: true,
        },
      },
      {
        $addFields: {
          statusLabel: {
            $switch: {
              branches: [
                {
                  case: { $eq: ['$status', STATUS.DELETE] },
                  then: 'Deleted',
                },
                {
                  case: { $eq: ['$status', STATUS.ACTIVE] },
                  then: 'Active',
                },
                {
                  case: { $eq: ['$status', STATUS.INACTIVE] },
                  then: 'Inactive',
                },
              ],
              default: '',
            },
          },
        },
      },
      {
        $project: {
          profileImage: '$users.profileImage.profile',
          firstName: 1,
          lastName: 1,
          fatherName: 1,
          motherName: 1,
          class: 1,
          status: 1,
          dob: 1,
          gender: 1,
          createdBy: 1,
          userId: 1,
          createdAt: 1,
          updatedAt: 1,
          statusLabel: 1,
        },
      },
    ]);
  }

  getStudentWithConditonAggre(where) {
    return this.studentModel.aggregate([
      {
        $match: where,
      },
      {
        $lookup: {
          from: 'users',
          localField: 'userId',
          foreignField: '_id',
          as: 'users',
        },
      },
    ]);
  }

  updateStudentById(id: string, data: object) {
    return this.studentModel.findByIdAndUpdate(id, data);
  }
}
