// src/teachers/teachers.service.ts

import { CreateTeacherDto } from '@app/teachers/dto/create-teacher.dto';
import { Teacher } from '@app/teachers/schemas/teacher/teacher.schema';
import { Injectable, NotFoundException } from '@nestjs/common';
import { TeacherModel } from './models/teacher.model';

import { STATUS } from '@app/common/enums';
import {
  defaultCreatedAndUpdatedBy,
  getUsersDataFromRequest,
} from '@app/common/helpers';
import { randomUserName } from '@app/common/utils';
import { UsersDocuments } from '@app/schemas';
import { UsersService } from '@app/users/users.service';
import { Request as ExpressRequest } from 'express';
import { ObjectId } from 'mongodb';

@Injectable()
export class TeachersService {
  constructor(
    private readonly teacherModel: TeacherModel,
    private readonly usersService: UsersService,
  ) {}

  async findAll(): Promise<Teacher[]> {
    return this.teacherModel.find({});
  }

  async findOne(id: string): Promise<Teacher> {
    const teacher = await this.teacherModel.findById(id);
    if (!teacher) {
      throw new NotFoundException(`Teacher with ID ${id} not found`);
    }
    return teacher;
  }

  async create(
    createTeacherDto: CreateTeacherDto,
    request: ExpressRequest,
  ): Promise<any> {
    const { userId }: { userId: ObjectId } = getUsersDataFromRequest(request);

    const prepareUserSaveData = {
      status: STATUS.INACTIVE,
      username: randomUserName(),
      password: 'Test@123',
      role: [],
      email: createTeacherDto.email,
      ...defaultCreatedAndUpdatedBy(userId),
    };

    const userResponse: UsersDocuments =
      await this.usersService.registerUser(prepareUserSaveData);

    const prepareSaveObject: Teacher = {
      ...createTeacherDto,
      ...defaultCreatedAndUpdatedBy(userId),
      userId: userResponse._id,
    };

    const teacherResponse = await this.teacherModel.save(prepareSaveObject);

    return teacherResponse;
  }

  async update(
    id: string,
    updateTeacherDto: CreateTeacherDto,
  ): Promise<Teacher> {
    const existingTeacher = await this.teacherModel.findByIdAndUpdate(
      id,
      updateTeacherDto,
    );

    if (!existingTeacher) {
      throw new NotFoundException(`Teacher with ID ${id} not found`);
    }
    return existingTeacher;
  }
}
