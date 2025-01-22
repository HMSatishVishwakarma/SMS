// src/classes/dto/create-class.dto.ts

import { STATUS } from '@app/common/enums';
import { IsArray, IsDate, IsEnum, IsOptional, IsString } from 'class-validator';

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

  @IsArray()
  @IsOptional()
  subjects: string[]; // Array of MongoDB ObjectIds referencing subjects
}

export class StatusUpdateDTO {
  @IsString()
  @IsOptional()
  className: string;

  @IsEnum(STATUS)
  @IsOptional()
  status: STATUS;

  @IsDate()
  @IsOptional()
  createdAt: Date;

  @IsDate()
  @IsOptional()
  updatedAt: Date;

  @IsArray()
  @IsOptional()
  subjects: [];
}
