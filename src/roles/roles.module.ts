import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { RolesController } from './roles.controller';
import { Role } from './roles.model';
import { RolesService } from './roles.service';

@Module({
  providers: [RolesService],
  controllers: [RolesController],
  imports: [
    SequelizeModule.forFeature([Role])
  ]
})
export class RolesModule {}
