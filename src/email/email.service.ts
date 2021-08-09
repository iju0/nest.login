import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';
import smtpConfiguration from '../../config/smtpConfiguration';
import { MailOption } from './MailOption';

@Injectable()
export class EmailService {
  async send(mailOption: MailOption) {
    const smtpConfig = smtpConfiguration();
    const tranporter = nodemailer.createTransport(smtpConfig);
    const result = await tranporter
      .sendMail(mailOption)
      .then((info) => info)
      .catch((err) => err);
    return result;
  }
}
