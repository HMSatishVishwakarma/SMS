import { Roles } from '@app/schemas/roles.schema';
import { Injectable } from '@nestjs/common';
import { RolesModel } from './models/roles.model';

@Injectable()
export class RolesService {
  constructor(private readonly roleModel: RolesModel) {}

  async findRoleByName(name: string): Promise<Roles | null> {
    return this.roleModel.findOne({ name }).exec();
  }
}
