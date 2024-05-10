import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import * as path from 'path';
import * as fsPromises from 'fs/promises';
import {v1 as uuidv1} from 'uuid';

@Injectable()
export class FilesService {
    async create(file: Express.Multer.File): Promise<string> {
        try {
            const fileExt = path.parse(file.originalname).ext;
            const fileName = `${uuidv1()}${fileExt}`;
            const dirPath = path.resolve(__dirname, '..', '..', 'static');

            fsPromises.access(dirPath)
                .catch((err) => {
                    return fsPromises.mkdir(dirPath, {recursive: true});
                })
                .finally(() => {
                    fsPromises.writeFile(path.join(dirPath, fileName), file.buffer)
                        .catch((err) => {
                            throw new HttpException('Произошла ошибка при записи файла.', HttpStatus.INTERNAL_SERVER_ERROR);
                        })
                });
            return fileName;
        } catch (e) {
            throw new HttpException(e.message, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async getByName(fileName: string): Promise<Buffer> {
        try {
            const dirPath = path.resolve(__dirname, '..', '..', 'static');
            const filePath = path.join(dirPath, fileName);
            const file = await fsPromises.readFile(filePath);
            return file;
                
        } catch (e) {
            throw new HttpException(e.message, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
