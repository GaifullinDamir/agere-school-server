import { Body, Controller, FileTypeValidator, Get, Param, ParseFilePipe, Post, Put, UploadedFile, UseInterceptors } from '@nestjs/common';
import { CreateCourseDto } from './dto/create-course.dto';
import { CoursesService } from './courses.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';

@Controller('courses')
export class CoursesController {
    constructor(private courseService: CoursesService) {}

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

    @Get()
    getAllCourses() {
        return this.courseService.getAll();
    }
    
    @Get('/:id')
    getCourseById(@Param('id') id: string) {
        return this.courseService.getById(id);
    }

    @Put()
    @UseInterceptors(FileInterceptor('logo'))
    updateCourse(@Body() dto: CreateCourseDto, 
        @UploadedFile(
            new ParseFilePipe({
                validators: [
                    new FileTypeValidator({fileType: /(jpg|jpeg|png)$/})
                ],
                fileIsRequired: false
            })
        ) file?: Express.Multer.File) {
        return this.courseService.update(dto, file);
    }
}
