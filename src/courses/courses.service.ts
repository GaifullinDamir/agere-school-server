import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateCourseDto } from './dto/create-course.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Course } from './courses.model';
import { FilesService } from 'src/files/files.service';
import { v1 as uuidv1 } from 'uuid';
import { UpdateCourseDto } from './dto/update-course.dto';
import { ViewCourseDto } from './dto/view-course.dto';

@Injectable()
export class CoursesService {

    constructor(@InjectModel(Course) private courseRepository: typeof Course,
        private filesService: FilesService) {
    }
    async create(dto: CreateCourseDto, userId: string, image: Express.Multer.File): Promise<ViewCourseDto>{
        const id = uuidv1();
        const {fileName, description} = await this.processData(dto, image);
        const course = await this.courseRepository.create({... dto, id, userId, rating: 0, description, logo: fileName});

        return new ViewCourseDto(course);
    }

    async getAll(): Promise<ViewCourseDto[]> {
        const courses = await this.courseRepository.findAll({include: [{all: true}]});
        const coursesViews = [];
        if (courses.length) {
            courses.forEach(course => {
                coursesViews.push(new ViewCourseDto(course));
            })
        }
        return coursesViews;
    }

    async getById(id: string): Promise<ViewCourseDto>{
        const course = await this.courseRepository.findOne({
            where: {id},
            include: [{all: true}]
        }
        );
        if (!course) {
            throw new HttpException('Курс не найден.', HttpStatus.NOT_FOUND);
        }
        return new ViewCourseDto(course);
    }

    async update(id: string, dto: UpdateCourseDto, userId: string, image?: Express.Multer.File): Promise<[affectedCount: number]>{ 
        const {fileName, description} = await this.processData(dto, image);
        const course = await this.courseRepository.findOne({where: {id}});
        if (course && course.userId === userId) {
            const result = await this.courseRepository
            .update(
                {
                    ...dto, id, description, userId, logo: fileName? fileName : dto.logo
                },
                {where: {id}}
            )
            return result;
        }
        throw new HttpException('Данный курс не доступен.', HttpStatus.BAD_REQUEST);
    }

    async delete(id: string, user: any): Promise<number>{
        const role = user.roles.find(role => role.value === 'admin');
        if (role) {
            return await this.courseRepository.destroy({where: {id}})
        } else {
            const course = await this.courseRepository.findOne({where: {userId: user.id}});
            if (course && course.id === id) {
                return await this.courseRepository.destroy({where: {id}})
            }
            throw new HttpException('Этот курс не принадлежит данному пользователю.', HttpStatus.FORBIDDEN)
        }
    }

    private async processData(dto: CreateCourseDto | UpdateCourseDto, image?: Express.Multer.File):
        Promise<{fileName: string, description: string}>
    {
        const fileName = image ? await this.filesService.create(image) : null;
        const description = JSON.stringify(dto.description);

        return {
            fileName, description
        };
    }
}
