import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import * as path from 'path';
import * as fs from 'fs';
import * as fsPromises from 'fs/promises';
import {v4 as uuidv4} from 'uuid';

@Injectable()
export class FilesService {
    async createFile(file): Promise<string> {
        try {
            const fileExt = path.parse(file.originalname).ext;
            const fileName = `${uuidv4()}${fileExt}`;
            const filePath = path.resolve(__dirname, '..', 'static');

            fsPromises.access(filePath)
                .catch((err) => {
                    return fsPromises.mkdir(filePath, {recursive: true});
                })
                .finally(() => {
                    fsPromises.writeFile(path.join(filePath, fileName), file.buffer)
                        .catch((err) => {
                            throw new HttpException('Произошла ошибка при записи файла.', HttpStatus.INTERNAL_SERVER_ERROR);
                        })
                });
            return fileName;
        } catch (e) {
            throw new HttpException('Произошла ошибка при записи файла.', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
