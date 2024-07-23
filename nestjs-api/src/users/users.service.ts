import { UserModel } from '@app/users/model/users.model';
import { Injectable } from '@nestjs/common';

import { UsersDocuments } from '@app/schemas';
import * as bcrypt from 'bcrypt';
import { UserDto } from './dto/users.dto';

@Injectable()
export class UsersService {
  constructor(private userModel: UserModel) {}

  getAllUser() {
    return this.userModel.find({});
  }

  async registerUser({
    username,
    password,
    email,
    profileImage,
  }: UserDto): Promise<UsersDocuments> {
    const hash = await bcrypt.hash(password, await bcrypt.genSalt());
    const prepareUserObj = {
      username,
      password: hash,
      email,
      profileImage,
    };
    await this.userModel.save(prepareUserObj);
    return this.userModel.findOne(
      { email: email },
      {
        password: 0,
        __v: 0,
      },
    );
  }

  findOne(condition) {
    return this.userModel.findOne(condition);
  }

  comparePassword({ requestPassword, hashPassword }) {
    return new Promise((resolve) => {
      return bcrypt.compare(requestPassword, hashPassword, function (err, res) {
        if (err) {
          resolve(false);
        }
        resolve(res);
      });
    });
  }

  findAndUpdate(where, data) {
    return this.userModel.findAndUpdate(where, data);
  }
}
