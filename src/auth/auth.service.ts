import { Injectable } from '@nestjs/common';
import { EmailService } from '../email/email.service';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { MailOption } from '../email/MailOption';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private emailService: EmailService,
    private jwtService: JwtService,
  ) {}

  signUp(createUserDto: CreateUserDto) {
    const payload = {
      email: createUserDto.email,
      password: createUserDto.password,
    };
    const mailOption: MailOption = {
      from: 'insert@kakao.com',
      to: 'insert@kakao.com',
      subject: '테스트입니다.',
      text: '인증토큰:' + this.jwtService.sign(payload),
    };

    return this.emailService.send(mailOption);
  }
}
