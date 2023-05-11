import { Controller,Post,Body, HttpCode,HttpStatus } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Credentials } from './dto/credentials.dto';

@Controller('auth')
export class AuthController {
    constructor(private authService:AuthService){}
    @Post("login")
    @HttpCode(HttpStatus.OK)
    async signIn(@Body() credentials:Credentials){
        return await this.authService.signIn(credentials)
    }
}
