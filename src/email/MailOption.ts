import Mail from 'nodemailer/lib/mailer';

export class MailOption implements Mail.Options {
  from: string;
  to: string;
  subject: string;
  text: string;
}
