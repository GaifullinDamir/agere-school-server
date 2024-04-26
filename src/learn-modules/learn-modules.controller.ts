import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { LearnModulesService } from './learn-modules.service';
import { LearnModule } from './learn-modules.model';
import { Roles } from 'src/auth/roles-auth.decorator';
import { RolesGuard } from 'src/auth/roles.guard';
import { CreateLearnModuleDto } from './dto/create-learn-module.dto';
import { GetUser } from 'src/auth/get-user.decorator';
import { UpdatetLearnModuleDto } from './dto/update-learn-module.dto';

@ApiTags('Модули')
@Controller('modules')
export class LearnModulesController {
    constructor(private learnModuleService: LearnModulesService) {}

    @ApiOperation({summary: 'Создать модуль.'})
    @ApiResponse({status: 200, type: LearnModule})
    @Roles('admin', 'user')
    @UseGuards(RolesGuard)
    @UsePipes(ValidationPipe)
    @Post('/:courseId')
    createModule(@GetUser() actor: any, @Param('courseId') courseId: string, @Body() dto: CreateLearnModuleDto) {
        return this.learnModuleService.create(actor, courseId, dto);
    }

    @ApiOperation({summary: 'Получить все модули.'})
    @ApiResponse({status: 200, type: [LearnModule]})
    @Get('course/:courseId')
    getAllModules(@Param('courseId') courseId: string) {
        return this.learnModuleService.getAll(courseId);
    }

    @ApiOperation({summary: 'Получить модуль по id.'})
    @ApiResponse({status: 200, type: LearnModule})
    @Get('/:id')
    getModuleById(@Param('id') id: string) {
        return this.learnModuleService.getById(id);
    }

    @ApiOperation({summary: 'Изменить модуль.'})
    @ApiResponse({status: 200, type: [Number]})
    @Roles('admin', 'user')
    @UseGuards(RolesGuard)
    @UsePipes(ValidationPipe)
    @Put('/:id')
    updateCourse(@Param('id') id: string, @Body() dto: UpdatetLearnModuleDto, @GetUser() actor: any,) {
        return this.learnModuleService.update(id, dto, actor);
    }

    @ApiOperation({summary: 'Удалить модуль по id.'})
    @ApiResponse({status: 200, type: Number})
    @Roles('admin', 'user')
    @UseGuards(RolesGuard)
    @Delete('/:id')
    deleteModule(@Param('id') id: string,  @GetUser() actor: any) {
        return this.learnModuleService.delete(id, actor);
    }
}
