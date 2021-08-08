import SMTPTransport from 'nodemailer/lib/smtp-transport';

export default (): SMTPTransport.Options => ({
  host: 'smtp.kakao.com',
  port: 465,
  secure: true,
  auth: {
    user: process.env.EMAIL_HOST || 'smtp.user.email',
    pass: process.env.EMAIL_PASSWORD || 'smtp.user.password',
  },
});
