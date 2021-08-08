import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { EmailService } from './email/email.service';
import { ConfigModule } from '@nestjs/config';
import smtpConfiguration from '../config/smtpConfiguration';

@Module({
  imports: [
    UsersModule,
    ConfigModule.forRoot({
      load: [smtpConfiguration],
    }),
  ],
  controllers: [],
  providers: [EmailService],
})
export class AppModule {}
