// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import mail from '@sendgrid/mail';
import { ContactFormData } from '../../interfaces/formData';

const SENDGRID_API_KEY = process.env.SENDGRID_API_KEY as string;
const CATENA_EMAIL_ACCOUNT = process.env.CATENA_EMAIL_ACCOUNT as string;

mail.setApiKey(SENDGRID_API_KEY);

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const body: ContactFormData = JSON.parse(req.body);
  
  const message = `
    Name: ${body.name}\r\n
    Email: ${body.email}\r\n
    Message: ${body.message}
  `;

  const data: mail.MailDataRequired = {
    to: CATENA_EMAIL_ACCOUNT,
    from: 'contact@catenastringquartet.com',
    subject: `New Contact Form Message from ${body.name}`,
    text: message,
    html: message.replace(/\r\n/g, '<br>')
  }

  try {
    await mail.send(data);
    res.status(200).json({ status: 'OK' });
  } catch (e) {
    res.status(400).json({ error: e });
  }
}
