import { Module } from '@nestjs/common';
import { FilesService } from './files.service';
import { FilesController } from './files.controller';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  providers: [FilesService],
  controllers: [FilesController],
  exports: [FilesService],
  imports: [
    AuthModule
  ]
})
export class FilesModule {}
