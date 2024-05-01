import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { TasksService } from './tasks.service';
import { Task } from './tasks.model';
import { Roles } from 'src/auth/roles-auth.decorator';
import { RolesGuard } from 'src/auth/roles.guard';
import { GetUser } from 'src/auth/get-user.decorator';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';

@ApiTags('Задания')
@Controller('tasks')
export class TasksController {
    constructor(private taskService: TasksService) {}

    @ApiOperation({summary: 'Создать задание.'})
    @ApiResponse({status: 200, type: Task})
    @Roles('admin', 'user')
    @UseGuards(RolesGuard)
    @UsePipes(ValidationPipe)
    @Post('/:lessonId')
    createTask(@GetUser() actor: any, @Param('lessonId') lessonId: string, @Body() dto: CreateTaskDto) {
        return this.taskService.create(actor, lessonId, dto);
    }

    @ApiOperation({summary: 'Получить все задачи урока.'})
    @ApiResponse({status: 200, type: [Task]})
    @Get('lessons/:lessonId')
    getAllTasks(@Param('lessonId') lessonId: string) {
        return this.taskService.getAll(lessonId);
    }

    @ApiOperation({summary: 'Получить задание по id.'})
    @ApiResponse({status: 200, type: [Task]})
    @Get('/:id')
    getTaskById(@Param('id') id: string) {
        return this.taskService.getById(id);
    }

    @ApiOperation({summary: 'Изменить задание.'})
    @ApiResponse({status: 200, type: Task})
    @Roles('admin', 'user')
    @UseGuards(RolesGuard)
    @UsePipes(ValidationPipe)
    @Put('/:id')
    updateTask(@Param('id') id: string, @Body() dto: UpdateTaskDto, @GetUser() actor: any,) {
        return this.taskService.update(id, dto, actor);
    }

    @ApiOperation({summary: 'Удалить задание по id.'})
    @ApiResponse({status: 200})
    @Roles('admin', 'user')
    @UseGuards(RolesGuard)
    @Delete('/:id')
    deleteTask(@Param('id') id: string,  @GetUser() actor: any) {
        return this.taskService.delete(id, actor);
    }
}