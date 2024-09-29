import { AuthMiddleware } from '@app/middleware';
import { MiddlewareConsumer, RequestMethod } from '@nestjs/common';
import { excludeRoutes as excludeAuthRoutes } from '.';
export const excludeRoutes = (consumer: MiddlewareConsumer) => {
  consumer
    .apply(AuthMiddleware)
    .exclude(...excludeAuthRoutes)
    .forRoutes({
      path: '*',
      method: RequestMethod.ALL,
    });

  /*  consumer
    .apply(AclMiddleware)
    .exclude(...excludeAuthRoutes)
    .forRoutes('*'); */

  // Add a middleware for only register-assessment Route
  // we can pass multiple routes which are similar like this route
  // consumer
  //   .apply(VerifyAuthorizationMiddleware)
  //   .forRoutes(...excludeCommonAuthRoutes);

  // Permission middleware to check the permission for the user
  // consumer
  //   .apply(RolesAndPermissionMiddleware)
  //   .exclude(...excludeAuthRoutes)
  //   .forRoutes({
  //     path: '*',
  //     method: RequestMethod.ALL,
  //   })
};
