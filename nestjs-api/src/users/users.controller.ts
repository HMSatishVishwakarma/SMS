import { MongoExceptionFilter } from '@app/common/filters/mongo-exception.filter';
import {
  Body,
  Controller,
  Get,
  Post,
  Req,
  UnauthorizedException,
  UseFilters,
} from '@nestjs/common';

import { Action } from '@app/casl/enums/action.enum';
import { Subject } from '@app/casl/enums/subject.enum';
import { userRequest } from '@app/common/interfaces';
import { UserDto } from './dto/users.dto';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  getUsers() {
    return this.usersService.getAllUser();
  }

  @UseFilters(MongoExceptionFilter)
  @Post('register')
  registerUser(@Body() body: UserDto) {
    return this.usersService.registerUser(body);
  }

  @Get('profile')
  getUserInfo(@Req() req: userRequest) {
    const ability = req['user']['permission'];
    if (ability.can(Action.READ, Subject.User)) {
      return req.user;
    }
    throw new UnauthorizedException();
  }
}
