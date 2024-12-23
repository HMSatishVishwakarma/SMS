import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { STATUS } from '../common/enums/global.enum';
export type classesDocument = Classes & Document;

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
}

export const ClassesSchema = SchemaFactory.createForClass(Classes);
