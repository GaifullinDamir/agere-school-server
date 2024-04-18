import { Body, Controller, Delete, FileTypeValidator, Get, Param, ParseFilePipe, Post, Put, UploadedFile, UseInterceptors } from '@nestjs/common';
import { CreateCourseDto } from './dto/create-course.dto';
import { CoursesService } from './courses.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Course } from './courses.model';

@ApiTags('Курсы')
@Controller('courses')
export class CoursesController {
    constructor(private courseService: CoursesService) {}

    @ApiOperation({summary: 'Создать курс.'})
    @ApiResponse({status: 200, type: Course})
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

    @ApiOperation({summary: 'Получить курсы.'})
    @ApiResponse({status: 200, type: [Course]})
    @Get()
    getAllCourses() {
        return this.courseService.getAll();
    }

    @ApiOperation({summary: 'Получить курс по id.'})
    @ApiResponse({status: 200, type: Course})
    @Get('/:id')
    getCourseById(@Param('id') id: string) {
        return this.courseService.getById(id);
    }

    @ApiOperation({summary: 'Изменить курс.'})
    @ApiResponse({status: 200, type: [Number]})
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

    @ApiOperation({summary: 'Удалить курс по id.'})
    @ApiResponse({status: 200, type: Number})
    @Delete('/:id')
    deleteCourse(@Param('id') id: string) {
        return this.courseService.delete(id);
    }
}
