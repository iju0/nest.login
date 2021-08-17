import { Injectable, UnauthorizedException } from '@nestjs/common';
import { EmailService } from '../email/email.service';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { MailOption } from '../email/MailOption';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private emailService: EmailService,
    private jwtService: JwtService,
  ) {}

  sendAuthEmail(createUserDto: CreateUserDto) {
    const payload = {
      email: createUserDto.email,
      password: createUserDto.password,
    };

    const accessToken = this.jwtService.sign(payload);

    this.usersService.create(createUserDto, accessToken);

    const mailOption: MailOption = {
      from: 'insert@kakao.com',
      to: 'insert@kakao.com',
      subject: '테스트입니다.',
      text: '인증토큰:' + this.jwtService.sign(payload),
      html: `<a href='http://localhost:3000/auth/token/${accessToken}'>인증하러 가기</a>`,
    };

    return this.emailService.send(mailOption);
  }

  confirm(token: string) {
    const decodeData = this.jwtService.decode(token);
    const user = this.usersService.findOne(decodeData['email']);

    console.log('===========================================');
    console.log(user);
    console.log('===========================================');

    if (!user) {
      throw new UnauthorizedException();
    }

    this.usersService.signUp(user);
  }

  async validateUser(username: string, password: string): Promise<any> {
    const user = await this.usersService.findOne(username);
    if (user && user.password === password) {
      return user;
    }
    return null;
  }

  login(email: string) {
    const user = this.usersService.findOne(email);
    if (!user || !user.isActive) {
      throw new UnauthorizedException();
    }
    const payload = { email: user.email };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
