import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { EmailService } from '../email/email.service';
import { EmailModule } from '../email/email.module';
import { JwtModule } from '@nestjs/jwt';
import { AuthController } from './auth.controller';
import { UsersModule } from '../users/users.module';
import { UsersService } from '../users/users.service';

@Module({
  providers: [AuthService, EmailService, UsersService],
  imports: [
    UsersModule,
    EmailModule,
    JwtModule.register({
      secret: 'secret-key',
      signOptions: {
        expiresIn: '60s',
      },
    }),
  ],
  exports: [AuthService],
  controllers: [AuthController],
})
export class AuthModule {}
