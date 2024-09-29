import { BaseModel } from '@app/common/model/baseModel.model';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { Users } from '@app/schemas';

export class UserModel extends BaseModel {
  constructor(
    @InjectModel(Users.name)
    private userModel: Model<Users>,
  ) {
    super(userModel);
  }

  findUserWithPermissions<T>(pipeline): Promise<T[]> {
    return this.userModel.aggregate(pipeline);
  }
}
