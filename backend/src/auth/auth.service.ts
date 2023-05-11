import {
  Injectable,
  UnauthorizedException,
  NotFoundException,
} from '@nestjs/common';
import { Credentials } from './dto/credentials.dto';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { Token } from './dto/token.dto';

@Injectable()
export class AuthService {
  constructor(
    private userService: UsersService,
    private jwtService: JwtService,
  ) {}

  async signIn({ password, email }: Credentials): Promise<Token> {
    const user = await this.userService.findByEmail(email);
    // any user with this email
    if (user == null) {
      throw new NotFoundException('Wrong credentials');
    }
    // the password wasn't in this user
    if (!bcrypt.compare(password, user.password)) {
      throw new UnauthorizedException();
    }
    const payload = { id: user._id };
    return {
      access_token:await this.jwtService.signAsync(payload,{secret:process.env.JWT_SECRET_KEY}),
    };
  }
}
