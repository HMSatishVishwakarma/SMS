import { BaseModelInterface } from '../interfaces/baseModel.interface';

import { FilterQuery } from 'mongoose';

interface WhereOptions {
  // Define your specific filter fields here
}

interface ProjectionOptions {
  [key: string]: any; // Include any specific projection fields
}

// Define default values for optional parameters
const DEFAULT_LIMIT = 10;
const DEFAULT_SKIP = 0;
const DEFAULT_SORT_BY = 'asc';

interface AggregationOptions {
  pipeline: any[];
  where?: FilterQuery<any>;
  projection?: any;
  limit?: number;
  skip?: number;
  orderBy?: string;
  sortBy?: 'asc' | 'desc';
}

interface AggregationOptions {
  pipeline: any[];
  where?: FilterQuery<any>;
  projection?: any;
  limit?: number;
  skip?: number;
  orderBy?: string;
  sortBy?: 'asc' | 'desc';
  lookups?: {
    from: string;
    localField: string;
    foreignField: string;
    as: string;
    pipeline?: any[];
  }[];
  unwinds?: {
    path: string;
    preserveNullAndEmptyArrays?: boolean;
  }[];
}

export abstract class BaseModel implements BaseModelInterface {
  private readonly currentModel;
  constructor(modelRef) {
    this.currentModel = modelRef;
  }

  save(data: object) {
    const response = new this.currentModel(data);
    return response.save();
  }
  save2(data: object) {
    const response = new this.currentModel(data);
    return response.save();
  }

  find(where: object, projection: object = {}, sort = {}) {
    console.log('000000000000000000', sort);

    let response = this.currentModel.find(where, projection);

    if (Object.keys(sort).length) {
      response = response.sort(sort);
    }

    return response;
  }

  findById(id: string, projection = {}) {
    return this.currentModel.findById(id, projection);
  }

  findOne(condition: object, projection: object = {}) {
    return this.currentModel.findOne(condition, projection);
  }

  findByIdAndUpdate(_id, data) {
    return this.currentModel.findByIdAndUpdate(_id, data, { new: true });
  }

  findAndUpdate(where: object, data: object) {
    return this.currentModel.findByIdAndUpdate(where, data, { new: true });
  }

  findByMatchWithAggre() {
    return this.currentModel.aggregate();
  }

  async aggregateDocuments<T>(options: AggregationOptions): Promise<T[]> {
    const {
      pipeline,
      where = {},
      projection = {},
      limit = DEFAULT_LIMIT,
      skip = DEFAULT_SKIP,
      orderBy,
      sortBy = DEFAULT_SORT_BY,
      lookups,
      unwinds,
    } = options;

    const filter: FilterQuery<T> = where;

    let aggregationPipeline: any = [{ $match: filter }];

    aggregationPipeline = aggregationPipeline.concat(pipeline);

    if (lookups && lookups.length > 0) {
      lookups.forEach((lookup) => {
        const {
          from,
          localField,
          foreignField,
          as,
          pipeline: lookupPipeline,
        } = lookup;
        const lookupStage: any = {
          $lookup: {
            from,
            localField,
            foreignField,
            as,
          },
        };

        if (lookupPipeline) {
          lookupStage.$lookup.pipeline = lookupPipeline;
        }

        aggregationPipeline.push(lookupStage);
      });
    }

    if (unwinds && unwinds.length > 0) {
      unwinds.forEach((unwind) => {
        const unwindStage: any = {
          $unwind: {
            path: unwind.path,
            preserveNullAndEmptyArrays:
              unwind.preserveNullAndEmptyArrays || false,
          },
        };

        aggregationPipeline.push(unwindStage);
      });
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

    return await this.currentModel.aggregate(aggregationPipeline);
  }
}
