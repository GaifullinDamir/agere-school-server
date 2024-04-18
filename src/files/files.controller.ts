import { Body, Controller, FileTypeValidator, Get, Param, ParseFilePipe, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { FilesService } from './files.service';

@Controller('files')
export class FilesController {
    constructor(private filesService: FilesService) {

    }

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

    @Get('/:value')
    getFileByName(@Param('value') value: string) {
        return this.filesService.getByName(value);
    }
}
