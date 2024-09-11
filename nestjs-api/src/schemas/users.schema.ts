import { STATUS } from '@app/common/enums';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as mongooseSchema } from 'mongoose';

export interface UsersDocuments extends Document {
  email: string;
  username: string;
  password: string;
  role: string;
  profileImage: object;
  status: number;
  createdAt: Date;
  updatedAt: Date;
}

@Schema({ collection: 'users' })
export class Users {
  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: true })
  username: string;

  @Prop({ required: true })
  password: string;

  /*   @Prop({ required: true, default: ROLES.GUEST })
  role: string; */

  @Prop({ type: mongooseSchema.Types.ObjectId, ref: 'Roles', default: '' })
  roles: string;

  @Prop({ required: true, type: mongooseSchema.Types.Mixed }) // Use Schema.Types.Mixed for object
  profileImage: object;

  @Prop({ required: true, default: STATUS.INACTIVE })
  status: number;

  @Prop({ required: true, default: Date.now })
  createdAt: Date;

  @Prop({ required: true, default: Date.now })
  updatedAt: Date;
}

export const usersSchema = SchemaFactory.createForClass(Users);
//usersSchema.index({ email: 1, username: 1 }, { unique: true });
//usersSchema.index({ email: 1 }, { unique: true });
