import { STATUS } from '@app/common/enums';
import { fileInterFace } from '@app/common/interfaces';
import { randomUserName } from '@app/common/utils';
import { UsersService } from '@app/users/users.service';
import { BadRequestException, Injectable } from '@nestjs/common';
import { StudentDto } from './dto/student.dto';
import { StudentModel } from './model/student.model';

import { first } from 'lodash';

import * as fs from 'fs';

import { DATAIMAGEPREFIX, STUDENT_ROLE } from '@app/common/constants/constants';
import { AggregationOptions } from '@app/common/dto/index.dto';
import { mongodbDateFormat } from '@app/common/helpers';
import { Types } from 'mongoose';
import { join } from 'path';

@Injectable()
export class StudentsService {
  constructor(
    private readonly studentModel: StudentModel,
    private readonly usersService: UsersService,
  ) {}

  async createStudent(
    {
      body,
      files,
    }: {
      body: StudentDto;
      files: fileInterFace;
    },
    request,
  ) {
    const { fieldname, originalname, encoding, mimetype, filename, size } =
      files;

    const filePath = join(__dirname, './../../../', 'uploads', filename);

    const profileImageBase64 = `${DATAIMAGEPREFIX}${fs.readFileSync(filePath, 'base64')}`;

    const { userId: _id } = request['user'];

    const userId = new Types.ObjectId(_id);

    const prePareRegData = {
      username: randomUserName(),
      password: 'Test@123',
      role: [STUDENT_ROLE],
      createdAt: new Date(),
      updatedAt: new Date(),
      profileImage: {
        profile: profileImageBase64,
        fieldname,
        originalname,
        encoding,
        mimetype,
        filename,
        size,
      },
      status: STATUS.INACTIVE,
      email: body.email,
      emergencyContactNumber: body.emergencyContactNumber,
    };

    console.log('------------>', prePareRegData);

    if (body._id) {
      const { userId: studentUserId } =
        await this.studentModel.updateStudentById(body._id, {
          ...body,
          updatedAt: prePareRegData.updatedAt,
          updatedBy: userId,
        });

      return await this.usersService.findAndUpdate(
        { _id: studentUserId },
        {
          profileImage: prePareRegData.profileImage,
          updatedAt: prePareRegData.updatedAt,
          updatedBy: userId,
        },
      );
    } else {
      const userInfo = await this.usersService.registerUser(prePareRegData);

      console.log(userInfo, '--------DS--');

      return this.studentModel.save({
        ...body,
        ...{
          class: new Types.ObjectId(body.class),
          userId: userInfo._id,
          createdBy: userId,
          updatedBy: userId,
        },
      });
    }
  }

  async getAllStudent({
    page = 1,
    limit = 5,
    sortBy = 'id',
    sortOrder = 'asc',
    searchText = '',
  }) {
    let queryFilter: any = { status: { $ne: 0 } };

    if (searchText !== '') {
      queryFilter = {
        ...queryFilter,
        $or: [
          { firstName: { $regex: searchText, $options: 'i' } },
          { lastName: { $regex: searchText, $options: 'i' } },
          { email: { $regex: searchText, $options: 'i' } },
        ],
      };
    }

    const totalRows = this.studentModel.getStudentWithAgg({ queryFilter });
    const studentData = this.studentModel.getStudentWithAgg({
      page,
      limit,
      sortBy,
      sortOrder,
      queryFilter,
    });

    const [totalRow, data] = await Promise.all([totalRows, studentData]);

    return {
      data,
      totalRow: totalRow.length,
    };
  }

  async deleteStudent(id, request) {
    try {
      const { userId: _id } = request['user'];
      await this.studentModel.findByIdAndUpdate(id, {
        status: 0,
        updatedAt: new Date(),
        updatedBy: _id,
      });

      return 'Student deleted successfully.';
    } catch (error) {
      throw new BadRequestException();
    }
  }

  async updateStudent(id, request, { status }) {
    try {
      const { userId: _id } = request['user'];
      await this.studentModel.findByIdAndUpdate(id, {
        status: status,
        updatedAt: new Date(),
        updatedBy: _id,
      });

      return 'Status updated  successfully.';
    } catch (error) {
      throw new BadRequestException();
    }
  }

  async getStudentInfo(id) {
    try {
      const options: AggregationOptions = {
        where: { _id: new Types.ObjectId(id) },
        lookup: [
          {
            from: 'users',
            localField: 'userId',
            foreignField: '_id',
            as: 'users',
          },
        ],
        unwind: [
          {
            path: '$users',
            preserveNullAndEmptyArrays: true,
          },
        ],

        addFields: {
          email: '$users.email',
          image: '$users.profileImage',
          dob: mongodbDateFormat('$dob'),
        },

        projection: {
          _id: 1,
          firstName: 1,
          lastName: 1,
          fatherName: 1,
          motherName: 1,
          class: 1,
          status: 1,
          dob: 1,
          gender: 1,
          email: 1,
          image: 1,
          emergencyContactNumber: 1,
        },
      };

      return first(await this.studentModel.aggregateDocuments(options));
    } catch (error) {
      console.log(error);
      throw new BadRequestException();
    }
  }
}
