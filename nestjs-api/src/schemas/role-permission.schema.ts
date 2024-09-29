import {
  Schema as MongooseSchema,
  Prop,
  SchemaFactory,
} from '@nestjs/mongoose';
import { Document } from 'mongoose';

@MongooseSchema({ collection: 'role-permission' })
export class Permission extends Document {
  @Prop({ required: true })
  name: string;

  @Prop()
  description?: string;
}

export const PermissionSchema = SchemaFactory.createForClass(Permission);
