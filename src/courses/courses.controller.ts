import { Body, Controller, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { CreateCourseDto } from './dto/create-course.dto';
import { CoursesService } from './courses.service';
import { FileInterceptor } from '@nestjs/platform-express';


@Controller('courses')
export class CoursesController {
    constructor(private courseService: CoursesService) {

    }

    @Post()
    @UseInterceptors(FileInterceptor('logo'))
    createCourse(@Body() dto: CreateCourseDto,
                @UploadedFile() image) {
        return this.courseService.create(dto, image);
    }
}
