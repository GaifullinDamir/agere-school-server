import { Controller, Post } from '@nestjs/common';
import { CreateCourseDto } from './dto/create-course.dto';
import { CoursesService } from './courses.service';

@Controller('courses')
export class CoursesController {
    constructor(private courseService: CoursesService) {

    }

    @Post()
    createCourse(dto: CreateCourseDto) {
        this.courseService.create(dto, image);
    }
}
