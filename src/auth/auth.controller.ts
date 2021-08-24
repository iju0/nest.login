import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { LocalAuthGuard } from './guards/local-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('email')
  sendAuthEmail(@Body() createUserDto: CreateUserDto) {
    return this.authService.sendAuthEmail(createUserDto);
  }

  @Get('token/:token')
  confirm(@Param('token') token: string) {
    return this.authService.confirm(token);
  }

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Request() req) {
    return this.authService.login(req.user.email);
  }



}
