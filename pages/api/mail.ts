// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
// import mail from '@sendgrid/mail';
import { ContactFormData } from '../../interfaces/formData';
import aws from "aws-sdk";

// const SENDGRID_API_KEY = process.env.SENDGRID_API_KEY as string;
const CATENA_EMAIL_ACCOUNT = process.env.CATENA_EMAIL_ACCOUNT as string;
const AWS_SES_ACCESS_KEY = process.env.AWS_SES_ACCESS_KEY as string;
const AWS_SES_SECRET_ACCESS_KEY = process.env.AWS_SES_SECRET_ACCESS_KEY as string;

// mail.setApiKey(SENDGRID_API_KEY);

const ses = new aws.SES({
  credentials: {
    accessKeyId: AWS_SES_ACCESS_KEY,
    secretAccessKey: AWS_SES_SECRET_ACCESS_KEY
  },
 region: "us-east-2"
});

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

  // const data: mail.MailDataRequired = {
  //   to: CATENA_EMAIL_ACCOUNT,
  //   from: 'contact@catenastringquartet.com',
  //   subject: `New Contact Form Message from ${body.name}`,
  //   text: message,
  //   html: message.replace(/\r\n/g, '<br>')
  // }

  const sesParams: aws.SES.SendEmailRequest = {
    Destination: {
      ToAddresses: [CATENA_EMAIL_ACCOUNT]
    },
    Message: {
      Body: {
        Text: {
          Data: message
        },
        Html: {
          Data: message.replace(/\r\n/g, '<br>')
        }
      },
      Subject: {
        Data: `New Contact Form Message from ${body.name}`
      }
    },
    Source: CATENA_EMAIL_ACCOUNT
  }

  try {
    // await mail.send(data);
    const test = await ses.sendEmail(sesParams).promise()
    
    res.status(200).json({ status: 'OK' });
  } catch (e) {
    res.status(400).json({ error: e });
  }
}
