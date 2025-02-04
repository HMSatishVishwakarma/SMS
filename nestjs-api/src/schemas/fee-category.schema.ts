import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
export type FeeCategoryDocument = FeeCategory & Document;

@Schema({ collection: 'fee-category' })
export class FeeCategory {
  @Prop({ required: true })
  name: string; // Name of the fee category (e.g., "Tuition", "Transport", etc.)

  @Prop({ required: true })
  amount: number; // The fee amount for the category

  @Prop({ required: true })
  description: string; // A description of the fee category

  @Prop({ default: Date.now })
  createdAt: Date; // The date the fee category was created

  @Prop({ default: Date.now })
  updatedAt: Date; // The last updated date
}

export const FeeCategorySchema = SchemaFactory.createForClass(FeeCategory);
