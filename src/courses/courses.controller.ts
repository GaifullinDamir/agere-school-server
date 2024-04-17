import { Body, Controller, FileTypeValidator, ParseFilePipe, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { CreateCourseDto } from './dto/create-course.dto';
import { CoursesService } from './courses.service';
import { FileInterceptor } from '@nestjs/platform-express';
import multer from 'multer';


@Controller('courses')
export class CoursesController {
    constructor(private courseService: CoursesService) {

    }

    @Post()
    @UseInterceptors(FileInterceptor('logo'))
    createCourse(@Body() dto: CreateCourseDto,
        @UploadedFile(
            new ParseFilePipe({
                validators: [
                    new FileTypeValidator({fileType: /(jpg|jpeg|png)$/})
                ]
            })
        ) file: Express.Multer.File) {
        return this.courseService.create(dto, file);
    }
}
