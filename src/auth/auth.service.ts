import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { LoginDto } from './dto/login-dto';
import { User } from './entity/user.entitiy';

@Injectable()
export class AuthService {
  constructor(private jwtService: JwtService) {}

  users = [
    {
      email: 'test@test.com',
      password: 'test',
    },
  ];

  async login(body: LoginDto) {
    const matchingUser = this.users.find(
      (user) => user.email === body.email && user.password === body.password,
    );

    if (!matchingUser) {
      throw new HttpException(
        { errors: 'Invalid credetials' },
        HttpStatus.UNAUTHORIZED,
      );
    }

    return {
      message: 'Login successful',
      user: matchingUser,
      token: await this.createToken(matchingUser),
    };
  }

  getUserFromToken(email: string): User {
    const matches = this.users.find((user) => user.email === email);
    if (!matches) {
      throw new HttpException(
        { errors: 'No such user' },
        HttpStatus.UNAUTHORIZED,
      );
    }
    const user = new User();
    user.email = matches.email;
    return user;
  }

  async verifyToken(token: string): Promise<any> {
    try {
      return await this.jwtService.verifyAsync(token);
    } catch (error) {
      return null;
    }
  }
  private async createToken(user: any) {
    const payload = {
      email: user.email,
      sub: user.id,
    };
    return await this.jwtService.signAsync(payload);
  }
}
