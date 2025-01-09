import { STATUS } from '@app/common/enums';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type SubjectDocument = Subject & Document;

@Schema({ collection: 'subjects' })
export class Subject {
  @Prop({ required: true, type: String })
  name: string;

  @Prop({ type: String, default: '' })
  description: string;

  @Prop({ required: true, default: STATUS.INACTIVE })
  status: number;

  @Prop({ required: true, default: Date.now })
  createdAt: Date;

  @Prop({ required: true, default: Date.now })
  updatedAt: Date;
}

export const SubjectSchema = SchemaFactory.createForClass(Subject);
