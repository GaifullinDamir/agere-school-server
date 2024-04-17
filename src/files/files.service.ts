import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import * as path from 'path';
import * as fs from 'fs';
import {v4 as uuidv4} from 'uuid';

@Injectable()
export class FilesService {
    async createFile(file): Promise<string> {
        try {
            const fileExt = path.parse(file.originalname).ext;
            const fileName = `${uuidv4()}${fileExt}`;
            const filePath = path.resolve(__dirname, '..', 'static');

            // Здесь лучше перейти на асинхронную версию.
            if (!fs.existsSync(filePath)) {
                fs.mkdirSync(filePath, {recursive: true})
            }
            fs.writeFileSync(path.join(filePath, fileName), file.buffer);

            return fileName;
        } catch (e) {
            throw new HttpException('Произошла ошибка при записи файла.', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
