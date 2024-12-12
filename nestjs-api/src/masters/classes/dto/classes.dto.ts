// src/classes/dto/create-class.dto.ts

import { STATUS } from '@app/common/enums';
import { IsDate, IsEnum, IsOptional, IsString } from 'class-validator';

export class CreateClassDto {
  @IsString()
  className: string;

  @IsEnum(STATUS)
  status: STATUS;

  @IsDate()
  @IsOptional()
  createdAt: Date;

  @IsDate()
  @IsOptional()
  updatedAt: Date;
}
