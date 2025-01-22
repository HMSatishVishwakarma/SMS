import { PaginationResponse } from '@app/common/interfaces';
import { BaseModel } from '@app/common/model/baseModel.model';
import { applyDynamicOrFilter } from '@app/common/model/Utils/helper';
import { Classes } from '@app/schemas/classes.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

export class ClassesModel extends BaseModel {
  constructor(
    @InjectModel(Classes.name)
    private classesModel: Model<Classes>,
  ) {
    super(classesModel);
  }

  findWithSubject() {
    return this.classesModel.find().populate('subjects', 'name');
  }

  async getPaginatedDataWithSubject(
    page: number = 1,
    limit: number = 10,
    filter: any = {},
    projection: any = {},
    sortBy: string = 'createdAt',
    sortOrder: 'asc' | 'desc' = 'asc',
  ): Promise<PaginationResponse<any>> {
    const skip = (page - 1) * limit;
    const sort = sortOrder === 'desc' ? -1 : 1;

    // Assuming applyDynamicOrFilter returns a filter query based on the input filter.
    const filterWithLike = applyDynamicOrFilter(filter);

    const filterQuery = {
      $and: [filterWithLike, { status: { $ne: 0 } }],
    };

    // Count documents matching the filter query
    const totalCount = await this.classesModel.countDocuments(filterQuery);

    // Fetch paginated data, populate 'subjects', apply projection and sorting
    const data = await this.classesModel
      .find(filterQuery)
      .populate('subjects', 'name') // Populating related subjects with just the 'name' field
      .skip(skip)
      .limit(limit)
      .select(projection)
      .sort({ [sortBy]: sort });

    const resultArray = data.map((classDoc: any) => {
      const subjectsString = classDoc.subjects
        .map((subject) => subject.name)
        .join(', ');

      // Check if the length of the subjects string exceeds 30 characters
      const truncatedSubjects =
        subjectsString.length > 20
          ? subjectsString.slice(0, 20) + '...'
          : subjectsString;

      return {
        ...classDoc.toObject(), // Convert the Mongoose document to a plain object
        subjects: truncatedSubjects, // Assign the truncated subjects string
      };
    });

    // Returning the result with data and totalCount
    return {
      data: resultArray,
      totalCount,
    };
  }
}
