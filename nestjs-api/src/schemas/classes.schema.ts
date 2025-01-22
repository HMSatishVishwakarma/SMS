import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

import { STATUS } from '../common/enums/global.enum';
export type classesDocument = Classes & Document;

import { Document, Schema as MongooseSchema } from 'mongoose';

@Schema({ collection: 'classes' })
export class Classes {
  @Prop({ required: true, type: String })
  className: string;

  @Prop({ required: true, default: STATUS.INACTIVE })
  status: number;

  @Prop({ required: true, default: Date.now })
  createdAt: Date;

  @Prop({ required: true, default: Date.now })
  updatedAt: Date;

  @Prop({
    type: [{ type: MongooseSchema.Types.ObjectId, ref: 'Subject' }], // Array of ObjectId to Subject model
    required: true,
    default: [],
  })
  subjects: MongooseSchema.Types.ObjectId[]; // Stores an array of subject IDs
}

export const ClassesSchema = SchemaFactory.createForClass(Classes);
