import { AppController } from '@app/app.controller';
import { AppService } from '@app/app.service';
import { config } from '@configs';
import { MiddlewareConsumer, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';

import { StudentsModule } from '@app/students/students.module';
import { UsersModule } from '@app/users/users.module';
import { MongooseModule } from '@nestjs/mongoose';
import { AppConfigurationModule } from './app-configuration/app-configuration.module';
import { AuthModule } from './auth/auth.module';
import { AuthService } from './auth/auth.service';
import { ClassesModule } from './masters/classes/classes.module';

import { FeeManagementModule } from './masters/fee-management/fee-management.module';
import { SubjectModule } from './masters/subject/subject.module';
import { ModulesModule } from './modules/modules.module';
import { RolesModel } from './roles/models/roles.model';
import { RolesModule } from './roles/roles.module';
import { RolesService } from './roles/roles.service';
import { excludeRoutes } from './routes/excludeRoutes';
import { Roles, RolesSchema } from './schemas/roles.schema';
import { TeachersModule } from './teachers/teachers.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [config],
      cache: true,
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => {
        return {
          uri: `${configService.get<string>(
            'mongodb.database.connectionString',
          )}/${configService.get<string>('mongodb.database.databaseName')}`,
        };
      },
      inject: [ConfigService],
    }),
    UsersModule,
    StudentsModule,
    AuthModule,
    ModulesModule,
    TeachersModule,
    RolesModule,

    MongooseModule.forFeature([{ name: Roles.name, schema: RolesSchema }]),
    ClassesModule,
    AppConfigurationModule,
    SubjectModule,
    FeeManagementModule,
  ],
  controllers: [AppController],
  providers: [AppService, AuthService, RolesService, RolesModel],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    excludeRoutes(consumer);
  }
}
