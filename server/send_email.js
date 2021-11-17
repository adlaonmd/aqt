require("dotenv").config();

const sgMail = require("@sendgrid/mail");
sgMail.setApiKey(process.env.SENDGRID_API_KEY);
const msg = {
  to: "adlaon.mde@gmail.com",
  from: "appquatech@gmail.com",
  subject: "Sending with SendGrid is Fun",
  html: `
    <div>
        <h1>AQT</h1>
        <p>Your appointment is coming soon!</p>
    </div>
  `,
  send_at: 1637070000,
};

sgMail
  .send(msg)
  .then(() => {
    console.log("Email sent");
  })
  .catch((error) => {
    console.error(error);
  });

//CODE FOR SCHEDULING EMAIL NOTIF 30 MINS BEFORE APPOINTMENT
// const appointment_date = new Date("November 16, 2021 2:00 AM");
// const notif_date = new Date(`November 16, 2021 ${appointment_date.getHours() - 1}:30`);
// const notif_unix = Math.round(notif_date.getTime() / 1000);

// console.log(notif_unix);
