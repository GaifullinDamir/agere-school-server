import { Body, Controller, FileTypeValidator, Get, Param, ParseFilePipe, Post, Res, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { FilesService } from './files.service';
import { Roles } from 'src/auth/roles-auth.decorator';
import { RolesGuard } from 'src/auth/roles.guard';

@Controller('files')
export class FilesController {
    constructor(private filesService: FilesService) {

    }

    @Roles('admin', 'user')
    @UseGuards(RolesGuard)
    @Post()
    @UseInterceptors(FileInterceptor('file'))
    createCourse(@UploadedFile(
            new ParseFilePipe({
                validators: [
                    new FileTypeValidator({fileType: /(jpg|jpeg|png)$/})
                ]
            })
        ) file: Express.Multer.File) {
        return this.filesService.create(file);
    }

    // @Roles('admin', 'user')
    // @UseGuards(RolesGuard)
    // @Get('/:value')
    // getFileByName(@Param('value') value: string) {
    //     return this.filesService.getByName(value);
    // }

    @Roles('admin', 'user')
    @UseGuards(RolesGuard)
    @Get('/:value')
    getFileByName(@Param('value') value: string, @Res() res: any) {
        res.sendFile(value, { root: 'static'});
    }
}
