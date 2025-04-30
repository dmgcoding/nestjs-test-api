import {
  Injectable,
  NestMiddleware,
  UnauthorizedException,
} from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { AuthService } from '../auth.service';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor(private authService: AuthService) {}
  async use(req: Request, res: Response, next: NextFunction) {
    const token = req.headers.authorization;
    if (!token) {
      throw new UnauthorizedException();
    }
    const tokenParts = token.split(' ');
    if (tokenParts.length !== 2 || tokenParts[0] !== 'Bearer') {
      throw new UnauthorizedException();
    }
    const tokenString = tokenParts[1];
    try {
      const payload = await this.authService.verifyToken(tokenString);
      if (!payload) {
        throw new UnauthorizedException();
      }
      const user = this.authService.getUserFromToken(payload.email || '');
      (req as any).user = user;
    } catch (error) {
      throw error;
    }
    next();
  }
}
