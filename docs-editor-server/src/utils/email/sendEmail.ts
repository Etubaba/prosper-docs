import { EmailDataType } from '../../types/index';
import config from '../../../config';
import * as nodemailer from 'nodemailer';

export async function sendEmail(emailProps: EmailDataType) {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    secure: true,
    disableFileAccess: true,
    auth: {
      user: config().mail.user, // generated ethereal user
      pass: config().mail.pass, // generated ethereal password
    },
  });

  transporter.verify(function (error: any, success: any) {
    if (error) {
      console.log(error.message);
    } else {
      console.log('Email connected');
    }
  });

  const { email, html, text }: EmailDataType = emailProps;
  // send mail with defined transport object
  await transporter.sendMail({
    from: 'charlsembehart@gmail.com', // sender address
    to: email,
    subject: 'Document Invitation',
    html: html, // html body
    text: text, // plain text body
  });
}
