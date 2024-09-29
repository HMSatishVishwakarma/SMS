import { jwtConstants } from '@app/common/constants/constants';
import { STATUS } from '@app/common/enums';
import { UsersService } from '@app/users/users.service';
import { Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async signIn(username: string, pass: string): Promise<any> {
    try {
      const users = await this.usersService.findUserWithRoleAndPermistion({
        username: username,
        status: STATUS.ACTIVE,
      });

      const {
        password = null,
        username: userName = null,
        _id = null,
        role = null,
        email = null,
        status = null,
        roleDetails = null,
        permissions = null,
        role_permission = null,
      } = users[0] || {};

      const validatePassword = await this.usersService.comparePassword({
        requestPassword: pass,
        hashPassword: password,
      });

      if (!validatePassword) {
        throw new UnauthorizedException();
      }
      const payload = {
        userId: _id,
        username: userName,
        roles: role,
        roleDetails,
        permissions,
        role_permission,
      };
      return {
        userName,
        role,
        email,
        status,
        _id,
        access_token: await this.jwtService.signAsync(payload, {
          secret: jwtConstants.secret,
          expiresIn: '3.30h',
        }),
      };
    } catch (error) {
      Logger.error(error);

      throw new UnauthorizedException();
    }
  }
}
