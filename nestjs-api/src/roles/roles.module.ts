import { Users, usersSchema } from '@app/schemas';
import { Roles, RolesSchema } from '@app/schemas/roles.schema';
import { UserModel } from '@app/users/model/users.model';
import { UsersService } from '@app/users/users.service';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { RolesModel } from './models/roles.model';
import { RolesController } from './roles.controller';
import { RolesService } from './roles.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Roles.name, schema: RolesSchema },

      { name: Users.name, schema: usersSchema },
    ]),
  ],
  providers: [RolesService, RolesModel, UsersService, UserModel],
  controllers: [RolesController],
})
export class RolesModule {}
