import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export interface Roles extends Document {
  firstName: string;
  name: string;
  permissions: string[];
}

@Schema({ collection: 'roles' })
export class Roles {
  @Prop({ required: true, type: String })
  firstName: string;

  @Prop({ required: true, type: String, unique: true })
  name: string;

  @Prop({
    type: [String],
    enum: ['read', 'write', 'delete'],
    required: true,
  })
  permissions: string[];
}

export const RolesSchema = SchemaFactory.createForClass(Roles);
