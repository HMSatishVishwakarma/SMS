import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
export type AppConfigurationDocument = AppConfiguration & Document;

@Schema({ collection: 'appConfiguration' })
export class AppConfiguration {
  @Prop({ required: true, type: String })
  name: string;

  @Prop({ required: true, type: [] })
  setting: string;
}

export const AppConfigurationSchema =
  SchemaFactory.createForClass(AppConfiguration);
