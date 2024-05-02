import { ApiProperty } from "@nestjs/swagger";
import { IsOptional, IsString } from "class-validator";

export class UpdateMessageDto {
    @ApiProperty({example: 'Раскройте данную тему более подробно, пожалуйста.', description: 'text.'})
    @IsString({message: 'text-должно быть строкой.'})
    @IsOptional()
    readonly text: string;
}