import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { AuthModule } from '../auth/auth.module';
import { AuthService } from '../auth/auth.service';
import { EmailService } from '../email/email.service';
import { EmailModule } from '../email/email.module';
import { JwtModule, JwtService } from '@nestjs/jwt';

@Module({
  imports: [
    AuthModule,
    EmailModule,
    JwtModule.register({
      secretOrPrivateKey: 'secret-key',
      signOptions: {
        expiresIn: '60s',
      },
    }),
  ],
  controllers: [UsersController],
  providers: [UsersService, AuthService, EmailService],
})
export class UsersModule {}
