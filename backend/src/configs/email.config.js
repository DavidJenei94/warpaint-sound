import nodemailer from 'nodemailer';

export const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.WARPAINTVISION_GMAIL_EMAIL,
    pass: process.env.WARPAINTVISION_GMAIL_PASSWORD,
  },
  tls: {
    rejectUnauthorized: false,
  },
});

export const reportingMailOptions = (reportText) => {
  return {
    from: process.env.WARPAINTVISION_GMAIL_EMAIL,
    to: process.env.WARPAINTVISION_GMAIL_EMAIL,
    subject: 'Reported: Sound Record!',
    text: reportText,
  };
};
