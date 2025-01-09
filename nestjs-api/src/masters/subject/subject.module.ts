import { Subject, SubjectSchema } from '@app/schemas';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { SubjectModel } from './model/subject.model';
import { SubjectController } from './subject.controller';
import { SubjectService } from './subject.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Subject.name, schema: SubjectSchema }]),
  ],
  providers: [SubjectService, SubjectModel],
  controllers: [SubjectController],
})
export class SubjectModule {}
