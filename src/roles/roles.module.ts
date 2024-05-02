import { MiddlewareConsumer, Module, NestModule, RequestMethod, forwardRef } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { RolesController } from './roles.controller';
import { Role } from './roles.model';
import { RolesService } from './roles.service';
import { User } from 'src/users/users.model';
import { UserRoles } from './user-roles.model';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  providers: [RolesService],
  controllers: [RolesController],
  imports: [
    SequelizeModule.forFeature([Role, User, UserRoles]),
    AuthModule
  ],
  exports: [RolesService]
})
export class RolesModule {}
