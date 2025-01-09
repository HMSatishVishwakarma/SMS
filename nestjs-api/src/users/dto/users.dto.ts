import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';

import { ERRORMESSAGE } from '@app/common/constants';
import { fileInterFace } from '@app/common/interfaces';
import { ApiProperty } from '@nestjs/swagger';

const { PASSOWRDVALIDATION } = ERRORMESSAGE;

export class UserDto {
  @ApiProperty({ description: 'user name' })
  @IsNotEmpty()
  username: string;

  @ApiProperty({ description: 'Email' })
  @IsOptional()
  @IsEmail()
  email?: string;

  @ApiProperty({
    description:
      'password should be minimum 8 characters with at least one letter and one number',
    minimum: 1,
    maximum: 20,
  })
  @IsString()
  @MinLength(8)
  @IsNotEmpty()
  @MaxLength(20)
  @Matches(/^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/, {
    message: PASSOWRDVALIDATION,
  })
  password: string;

  @IsOptional()
  @IsString()
  profileImage?: fileInterFace;

  @IsOptional()
  createdAt?: Date;

  @IsOptional()
  updatedAt?: Date;

  @IsOptional()
  role?: string[];

  @IsOptional()
  status?: number;
}
