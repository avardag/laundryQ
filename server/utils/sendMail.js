const nodemailer = require("nodemailer");
exports.sendActivationMail = async (to, link) => {
  //1)Create a transporter

  //Gmail example
  const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    secure: false,
    requireTLS: true,
    auth: {
      user: process.env.EMAIL_USERNAME,
      pass: process.env.EMAIL_PASSWORD,
    },
  });
  //activate in GMAIL "less secure app" option

  //2)define email options
  const mailOptions = {
    from: `LaundryQ <${process.env.EMAIL_USERNAME}>`,
    to,
    subject: `Account activation on ${process.env.API_URL}`,
    text: "",
    html: `
    <div>
        <h1>For Account activation, please click the link below</h1>   
        <a href="${link}">${link}</a> 
    </div>
    `,
    headers: { "x-cloudmta-class": "standard" },
  };
  //3)send email
  await transporter.sendMail(mailOptions);
};
