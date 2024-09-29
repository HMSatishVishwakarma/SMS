import { AuthService } from '@app/auth/auth.service';
import { jwtConstants } from '@app/common/constants/constants';
import { UsersService } from '@app/users/users.service';
import {
  Injectable,
  Logger,
  NestMiddleware,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { NextFunction, Request, Response } from 'express';

import { AbilityBuilder, createMongoAbility } from '@casl/ability';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  static user = null;
  constructor(
    private readonly userService: UsersService,
    private readonly authService: AuthService,
    private jwtService: JwtService,
  ) {}

  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }

  setUserPermission(userData) {
    const { can, build } = new AbilityBuilder(createMongoAbility);

    userData.roleDetails.forEach((role) => {
      const rolePerms = userData.role_permission
        .filter((rp) => rp.role_id === role._id)
        .map((rp) => {
          const perm = userData.permissions.find(
            (p) => p._id === rp.permissions,
          );
          return perm ? perm.name : null;
        })
        .filter(Boolean) as string[];

      rolePerms.forEach((permission) => {
        // Split the permission to determine action and subject
        const [subject, action] = permission.split('.'); // e.g., "students.manage" -> ["students", "manage"]
        if (subject && action) {
          can(action, subject.charAt(0).toUpperCase() + subject.slice(1)); // Capitalize subject for consistency
        }
      });
    });

    return build();
  }

  async use(req: Request, resp: Response, next: NextFunction) {
    try {
      const token = this.extractTokenFromHeader(req);

      if (!token) {
        throw new UnauthorizedException();
      }

      const payload = await this.jwtService.verifyAsync(token, {
        secret: jwtConstants.secret,
      });

      req['user'] = payload;
      req['user']['permission'] = this.setUserPermission(payload);
      return next();
    } catch (error) {
      Logger.error(error);
      throw new UnauthorizedException();
    }
  }
}
