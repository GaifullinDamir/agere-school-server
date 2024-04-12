import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { v1 as uuidv1 } from 'uuid';

@Injectable()
export class SetUuidMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    req.body.id = uuidv1();
    next();
  }
}
