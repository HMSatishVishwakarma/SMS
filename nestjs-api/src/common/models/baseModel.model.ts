import { BaseModelInterface } from '../interfaces/baseModel.interface';

export abstract class BaseModel implements BaseModelInterface {
  private readonly currentModel;
  constructor(modelRef) {
    this.currentModel = modelRef;
  }
  find(where: object, projection: object = {}) {
    return this.currentModel.find(where, projection);
  }

  findById(id: string) {
    return this.currentModel.findById(id);
  }

  save(data: object) {
    const response = new this.currentModel(data);
    return response.save();
  }

  findOne(condition: object) {
    return this.currentModel.findOne(condition);
  }

  async countDocuments2(paginationParams, filterConditions) {
    const { page, limit } = paginationParams;
    const skip = (page - 1) * limit;

    // First query to count total rows
    const totalRows = await this.currentModel.countDocuments(filterConditions);

    console.log(' ------------>', totalRows, filterConditions);

    // Second query to get paginated data
    const data = await this.currentModel
      .find(filterConditions)
      .skip(skip)
      .limit(limit);

    return {
      data,
      totalRows,
    };
  }
}
