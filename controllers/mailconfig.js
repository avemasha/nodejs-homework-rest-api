const nodemailer = require("nodemailer");

async function verifyUser() {
  try {
    const mail = {
      from: "masha.novosad03@gmail.com",
      to: "masha.novosad03@gmail.com",
      subject: "test",
      html: "<h1>hello</h1>",
      text: "hello there",
    };

    var transport = nodemailer.createTransport({
      host: "sandbox.smtp.mailtrap.io",
      port: 2525,
      auth: {
        user: "2b9946e130c704",
        pass: "22a15c3c6ec1a9",
      },
    });

    const response = await transport.sendMail(mail);
    console.log(response);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Application error" });
  }
}

verifyUser();
