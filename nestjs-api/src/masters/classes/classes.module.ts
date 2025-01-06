import { Classes, ClassesSchema } from '@app/schemas/classes.schema';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ClassesController } from './classes.controller';
import { ClassesService } from './classes.service';
import { ClassesModel } from './model/class.model';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Classes.name, schema: ClassesSchema }]),
  ],
  providers: [ClassesService, ClassesModel],
  controllers: [ClassesController],
})
export class ClassesModule {}
