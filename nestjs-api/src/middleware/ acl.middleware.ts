// acl.middleware.ts
import { jwtConstants } from '@app/common/constants/constants';
import { RolesService } from '@app/roles/roles.service';
import { UsersService } from '@app/users/users.service';
import {
  ForbiddenException,
  Injectable,
  NestMiddleware,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { NextFunction, Request, Response } from 'express';

@Injectable()
export class AclMiddleware implements NestMiddleware {
  constructor(
    private readonly usersService: UsersService,
    private readonly rolesService: RolesService,
    private jwtService: JwtService,
  ) {}

  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }

  async use(req: Request, res: Response, next: NextFunction) {
    const token = this.extractTokenFromHeader(req);

    if (!token) {
      throw new UnauthorizedException();
    }

    const payload = await this.jwtService.verifyAsync(token, {
      secret: jwtConstants.secret,
    });

    console.log('-----------------payload ,', payload);

    const username = payload['username'];

    if (!username) {
      throw new UnauthorizedException('No username provided');
    }

    const user: any = await this.usersService.findUserByUsername(
      username as string,
    );

    if (!user) {
      throw new UnauthorizedException('User not found');
    }

    const requiredRoles = req.headers['roles'] as string[]; // Expected roles from request headers or elsewhere
    const requiredPermissions = req.headers['permissions'] as string[]; // Expected permissions from request headers or elsewhere

    if (requiredRoles) {
      const userRoles = await Promise.all(
        user.roles.map((roleId) =>
          this.rolesService.findRoleByName(roleId.toString()),
        ),
      );
      const userRoleNames = userRoles.map((role) => role.name);

      if (!requiredRoles.some((role) => userRoleNames.includes(role))) {
        throw new ForbiddenException('Access denied due to role');
      }
    }

    if (requiredPermissions) {
      const userRoles = await Promise.all(
        user.roles.map((roleId) =>
          this.rolesService.findRoleByName(roleId.toString()),
        ),
      );
      const userPermissions = userRoles.flatMap((role) => role.permissions);

      if (
        !requiredPermissions.every((permission) =>
          userPermissions.includes(permission),
        )
      ) {
        throw new ForbiddenException('Access denied due to permissions');
      }
    }

    req['user'] = user; // Optionally attach user info to request
    next();
  }
}
