import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Roles } from 'src/auth/roles-auth.decorator';
import { RolesGuard } from 'src/auth/roles.guard';
import { GetUser } from 'src/auth/get-user.decorator';
import { Lesson } from './lesson.model';
import { CreateLessonDto } from './dto/create-lesson.dto';
import { LessonsService } from './lesson.service';
import { ViewLessonDto } from './dto/view-lesson.dto';

@ApiTags('Уроки')
@Controller('lessons')
export class LessonsController {
    constructor(private lessonService: LessonsService) {}

    @ApiOperation({summary: 'Создать урок.'})
    @ApiResponse({status: 200, type: Lesson})
    @Roles('admin', 'user')
    @UseGuards(RolesGuard)
    @UsePipes(ValidationPipe)
    @Post('/:moduleId')
    createLesson(@GetUser() actor: any, @Param('moduleId') moduleId: string, @Body() dto: CreateLessonDto) {
        return this.lessonService.create(actor, moduleId, dto);
    }

    @ApiOperation({summary: 'Получить все уроки.'})
    @ApiResponse({status: 200, type: [ViewLessonDto]})
    @Get('mdoule/:moduleId')
    getAllModules(@Param('moduleId') moduleId: string) {
        return this.lessonService.getAll(moduleId);
    }

    // @ApiOperation({summary: 'Получить модуль по id.'})
    // @ApiResponse({status: 200, type: LearnModule})
    // @Get('/:id')
    // getModuleById(@Param('id') id: string) {
    //     return this.learnModuleService.getById(id);
    // }

    // @ApiOperation({summary: 'Изменить модуль.'})
    // @ApiResponse({status: 200, type: [Number]})
    // @Roles('admin', 'user')
    // @UseGuards(RolesGuard)
    // @UsePipes(ValidationPipe)
    // @Put('/:id')
    // updateCourse(@Param('id') id: string, @Body() dto: UpdatetLearnModuleDto, @GetUser() actor: any,) {
    //     return this.learnModuleService.update(id, dto, actor);
    // }

    // @ApiOperation({summary: 'Удалить модуль по id.'})
    // @ApiResponse({status: 200, type: Number})
    // @Roles('admin', 'user')
    // @UseGuards(RolesGuard)
    // @Delete('/:id')
    // deleteModule(@Param('id') id: string,  @GetUser() actor: any) {
    //     return this.learnModuleService.delete(id, actor);
    // }
}
