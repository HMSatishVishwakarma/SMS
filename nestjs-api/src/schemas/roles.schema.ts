import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ collection: 'roles' })
export class Roles extends Document {
  @Prop({ required: true })
  name: string;

  @Prop()
  description?: string;
}

export const RolesSchema = SchemaFactory.createForClass(Roles);
