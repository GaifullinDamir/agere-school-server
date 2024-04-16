import { Injectable } from '@nestjs/common';
import { CreateCourseDto } from './dto/create-course.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Course } from './courses.model';
import { FilesService } from 'src/files/files.service';
import { v1 as uuidv1 } from 'uuid';

@Injectable()
export class CoursesService {

    constructor(@InjectModel(Course) private courseRepository: typeof Course,
                private filesService: FilesService) {

    }

    async create(dto: CreateCourseDto, image: any) {
        const fileName = await this.filesService.createFile(image);
        const id = uuidv1();
        const description = JSON.stringify(dto.description);
        const course = await this.courseRepository.create({... dto, id, description, logo: fileName });
        return course;
    }
}
