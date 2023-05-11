import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private jwtService: JwtService) {}
  async canActivate(
    context: ExecutionContext,
  ): Promise<boolean>{
    const request = context.switchToHttp().getRequest();
    // private function of this class
    const token = this.extractTokenFromHeader(request);
    if (!token) {
      throw new UnauthorizedException();
    }
    try {
      // token to object
      const payload = await this.jwtService.verifyAsync(token, {
        secret: process.env.JWT_SECRET_KEY,
      });
      // set the content of future Req.user with the user id
      request['user'] = payload;
    }catch {
      throw new UnauthorizedException();
    }
    return true;
  }
  // if the token is type bearer return the token to coonver else undefined
  private extractTokenFromHeader(request: Request): string | undefined {
    try{
        const [type, token] = request.headers.authorization.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
    }catch {
        throw new UnauthorizedException("No token provided");
      }
  }
}
