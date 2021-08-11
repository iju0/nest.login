import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from '../users/dto/create-user.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post()
  sendAuthEmail(@Body() createUserDto: CreateUserDto) {
    return this.authService.sendAuthEmail(createUserDto);
  }

  @Get(':token')
  confirm(@Param('token') token: string) {
    return this.authService.confirm(token);
  }
}
