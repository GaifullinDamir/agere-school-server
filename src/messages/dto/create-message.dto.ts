
import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";

export class CreateMessageDto {
    @ApiProperty({example: 'Раскройте данную тему более подробно, пожалуйста.', description: 'text.'})
    @IsString({message: 'text-должно быть строкой.'})
    readonly text: string;
}