import { FeeCategory, FeeCategorySchema } from '@app/schemas';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { FeeManagementController } from './fee-management.controller';
import { FeeManagementService } from './fee-management.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: FeeCategory.name, schema: FeeCategorySchema },
    ]),
  ],
  providers: [FeeManagementService],
  controllers: [FeeManagementController],
})
export class FeeManagementModule {}
