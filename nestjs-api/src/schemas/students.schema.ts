import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { GENDER, STATUS } from './../common/enums/global.enum';
export type StudentsDocument = Students & Document;

import { Schema as MongooseSchema } from 'mongoose';

@Schema({ collection: 'students' })
export class Students {
  @Prop({ required: true, type: String })
  firstName: string;

  @Prop({ required: true, type: String })
  lastName: string;

  @Prop({ required: true, type: String })
  fatherName: string;

  @Prop({ required: true, type: String })
  motherName: string;

  @Prop({ required: true, type: MongooseSchema.Types.ObjectId, ref: 'Classes' })
  class: MongooseSchema.Types.ObjectId;

  @Prop({ required: true, default: STATUS.INACTIVE })
  status: number;

  @Prop({ required: true, default: '' })
  emergencyContactNumber: number;

  @Prop({ required: true, type: Date })
  dob: string;

  @Prop({ required: true, type: String, enum: GENDER })
  gender: GENDER;

  @Prop({ required: true, default: Date.now })
  createdAt: Date;

  @Prop({ required: true, default: Date.now })
  updatedAt: Date;

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'Users', default: null })
  createdBy: MongooseSchema.Types.ObjectId;

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'Users', default: null })
  userId: MongooseSchema.Types.ObjectId;

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'Users', default: null })
  updatedBy: MongooseSchema.Types.ObjectId;
}

export const studentsSchema = SchemaFactory.createForClass(Students);
