import { BaseModel } from '@app/common/model/baseModel.model';
import { Roles } from '@app/schemas/roles.schema';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { Model } from 'mongoose';

@Injectable()
export class RolesModel extends BaseModel {
  constructor(
    @InjectModel(Roles.name)
    private readonly rolesModel: Model<Roles>,
  ) {
    super(rolesModel);
  }
}
