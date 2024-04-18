import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateCourseDto } from './dto/create-course.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Course } from './courses.model';
import { FilesService } from 'src/files/files.service';
import { v1 as uuidv1 } from 'uuid';
import { UsersService } from 'src/users/users.service';
import { User } from 'src/users/users.model';

@Injectable()
export class CoursesService {

    constructor(@InjectModel(Course) private courseRepository: typeof Course,
                private filesService: FilesService,
                private usersSevice: UsersService) {

    }

    async create(dto: CreateCourseDto, image: any) {
        const fileName = await this.filesService.create(image);
        const id = uuidv1();
        const description = JSON.stringify(dto.description);
        const course = await this.courseRepository.create({... dto, id, description, logo: fileName });
        return course;
    }

    async getById(id: string) {
        const course = await this.courseRepository.findOne({
            where: {id},
            include: [{all: true}]
        }
        );
        if (!course) {
            throw new HttpException('Курс не найден.', HttpStatus.NOT_FOUND);
        }
        return course;
        
    }
}
