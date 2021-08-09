import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { EmailService } from '../email/email.service';
import { EmailModule } from '../email/email.module';
import { ConfigModule } from '@nestjs/config';
import smtpConfiguration from '../../config/smtpConfiguration';
import { JwtModule } from '@nestjs/jwt';

@Module({
  providers: [AuthService, EmailService],
  imports: [
    EmailModule,
    JwtModule.register({
      secretOrPrivateKey: 'secret-key',
      signOptions: {
        expiresIn: '60s',
      },
    }),
  ],
  exports: [AuthService],
})
export class AuthModule {}
