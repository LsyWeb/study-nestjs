import { NestMiddleware } from '@nestjs/common';
import { Request, Response } from 'express';

export default class LoggerMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: () => void) {
    console.log('Request...', 'path:', req.path, 'method:', req.method);
    next();
  }
}
