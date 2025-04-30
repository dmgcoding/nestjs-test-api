import { Body, Controller, Get, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login-dto';
import { User } from './decorators/user.decorator';
import { User as UserEntity } from './entity/user.entitiy';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(@Body() body: LoginDto) {
    return await this.authService.login(body);
  }

  @Get('user')
  async getUser(@User() user: UserEntity) {
    return user;
  }
}
