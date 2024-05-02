import { Body, Controller, Param, Post, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { MessagesService } from './messages.service';
import { Message } from './messages.model';
import { Roles } from 'src/auth/roles-auth.decorator';
import { RolesGuard } from 'src/auth/roles.guard';
import { GetUser } from 'src/auth/get-user.decorator';
import { CreateMessageDto } from './dto/create-message.dto';

@ApiTags('Сообщения')
@Controller('messages')
export class MessagesController {
    constructor(private messageService: MessagesService) {}
    
    @ApiOperation({summary: 'Создать сообщение.'})
    @ApiResponse({status: 200, type: Message})
    @Roles('user')
    @UseGuards(RolesGuard)
    @UsePipes(ValidationPipe)
    @Post('/:lessonId')
    createMessage(@GetUser() actor: any, @Param('lessonId') lessonId: string, @Body() dto: CreateMessageDto) {
        return this.messageService.create(actor, lessonId, dto);
    }

}
