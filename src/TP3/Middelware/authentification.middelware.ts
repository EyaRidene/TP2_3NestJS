import { Injectable, NestMiddleware } from '@nestjs/common';
import * as jwt from 'jsonwebtoken';
import { NextFunction, Request, Response } from 'express';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const authHeader = req.headers['authorization'] as string;
    if (!authHeader) {
      console.log('No auth header');
      return res.status(401).json({ message: 'Unauthorized' });
    }
    try {
      const token = authHeader.split(' ')[1];
      const decoded = jwt.verify(token, 'maryoumaAyouta') as any;
      req['userId'] = decoded['userId'];
      console.log('decoded', decoded);
      next();
    } catch (e) {
      console.log('Invalid token');
      return res.status(401).json({ message: 'Unauthorized' });
    }
  }
}