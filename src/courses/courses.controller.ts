import { Body, Controller, Delete, FileTypeValidator, Get, Param, ParseFilePipe, Post, Put, Req, UploadedFile, UseGuards, UseInterceptors, UsePipes, ValidationPipe } from '@nestjs/common';
import { CreateCourseDto } from './dto/create-course.dto';
import { CoursesService } from './courses.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Course } from './courses.model';
import { Roles } from 'src/auth/roles-auth.decorator';
import { RolesGuard } from 'src/auth/roles.guard';
import { GetUser } from 'src/auth/get-user.decorator';
import { CustomValidationPipe } from 'src/pipes/validation.pipe';
import { UpdateCourseDto } from './dto/update-course.dto';

@ApiTags('Курсы')
@Controller('courses')
export class CoursesController {
    constructor(private courseService: CoursesService) {}

    @ApiOperation({summary: 'Создать курс.'})
    @ApiResponse({status: 200, type: Course})
    @Roles("user")
    @UseGuards(RolesGuard)
    @UsePipes(ValidationPipe)
    @Post()
    @UseInterceptors(FileInterceptor('logo'))
    createCourse(@GetUser() user: any, @Body() dto: CreateCourseDto,
        @UploadedFile(
            new ParseFilePipe({
                validators: [
                    new FileTypeValidator({fileType: /(jpg|jpeg|png)$/})
                ]
            })
        ) logo: Express.Multer.File) {
        return this.courseService.create(dto,user.id, logo);
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
    @Roles('admin', 'user')
    @UseGuards(RolesGuard)
    @UsePipes(ValidationPipe)
    @Put('/:id')
    @UseInterceptors(FileInterceptor('logo'))
    updateCourse(@Param('id') id: string, @GetUser() user: any, @Body() dto: UpdateCourseDto, 
        @UploadedFile(
            new ParseFilePipe({
                validators: [
                    new FileTypeValidator({fileType: /(jpg|jpeg|png)$/})
                ],
                fileIsRequired: false
            })
        ) file?: Express.Multer.File) {
        return this.courseService.update(id, dto, user.id, file);
    }

    @ApiOperation({summary: 'Удалить курс по id.'})
    @ApiResponse({status: 200, type: Number})
    @Roles('admin', 'user')
    @UseGuards(RolesGuard)
    @Delete('/:id')
    deleteCourse(@Param('id') id: string,  @GetUser() user: any) {
        return this.courseService.delete(id, user);
    }
}
