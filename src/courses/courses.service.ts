import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
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
    async create(dto: CreateCourseDto, image: Express.Multer.File): Promise<Course>{
        const id = uuidv1();
        const {fileName, description} = await this.processData(dto, image);
        const course = await this.courseRepository.create({... dto, id, description, logo: fileName});
        return course;
    }

    async getAll(): Promise<Course[]> {
        const courses = await this.courseRepository.findAll({include: [{all: true}]});
        return courses;
    }

    async getById(id: string): Promise<Course>{
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

    async update(dto: CreateCourseDto, image?: Express.Multer.File): Promise<[affectedCount: number]>{ 
        const {fileName, description} = await this.processData(dto, image);
        
        const course = await this.courseRepository
            .update(
                {
                    ...dto, description, logo: fileName? fileName : dto.logo
                },
                {where: {id: dto.id}}
            )
        return course;
    }

    async delete(id: string): Promise<number>{
        const result = await this.courseRepository.destroy({where: {id}})

        return result;
    }

    private async processData(dto: CreateCourseDto, image?: Express.Multer.File):
        Promise<{fileName: string, description: string}>
    {
        const fileName = image ? await this.filesService.create(image) : null;
        const description = JSON.stringify(dto.description);

        return {
            fileName, description
        };
    }
}
