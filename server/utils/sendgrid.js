require("dotenv").config();
const sgMail = require("@sendgrid/mail");

const fs = require("fs");

const busanLogoBase64 = fs.readFileSync("./assets/busan_logo.png", "base64");

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

function sendAppointmentSetEmail(email, firstName, year, month, day, time, appointmentId) {
  const msg = {
    to: email,
    from: "appquatech@gmail.com",
    subject: "AQT - Appointment Set",
    html: `
      <div style="padding: 2rem;">
        <div style="width: 100%; max-width: 500px; border: 1px solid #000; margin: auto;">
          <div style="padding: 1rem 2rem;">
            <img src="cid:busan_logo_cid" alt="Busan PH" style="display: block; width: 100%; max-width: 400px; margin: auto;" />
            <p>Hello <strong>${firstName}</strong>!</p>
            <p>Your appointment has been set on <strong>${month} ${day}, ${year} - ${time}</strong></p>
            <p>Here is your appointment ID: <strong>${appointmentId}</strong></p>
            <p>Please present this to the staff when asked.</p>
            <p>See you soon. Thank you!</p>
          </div>
        </div>
      </div>
    `,
    attachments: [
      {
        filename: "busan_logo.png",
        contentType: "image/png",
        content_id: "busan_logo_cid",
        content: busanLogoBase64,
        disposition: "inline",
      },
    ],
  };

  sgMail
    .send(msg)
    .then(() => {
      console.log("Appontment Set Email Sent");
    })
    .catch((error) => {
      console.error(error);
    });
}

function cancelAppointmentEmail(email, firstName, year, month, day, time) {
  const msg = {
    to: email,
    from: "appquatech@gmail.com",
    subject: "AQT - Appointment Cancelled",
    html: `
      <div style="padding: 2rem;">
        <div style="width: 100%; max-width: 500px; border: 1px solid #000; margin: auto;">
          <div style="padding: 1rem 2rem;">
            <img src="cid:busan_logo_cid" alt="Busan PH" style="display: block; width: 100%; max-width: 400px; margin: auto;" />
            <p>Hello <strong>${firstName}</strong>!</p>
            <p>Your appointment on <strong>${month} ${day}, ${year} - ${time}</strong> has been cancelled.</p>
            <p>You can set another appointment if you need to.</p>
            <p>Thank you!</p>
          </div>
        </div>
      </div>
    `,
    attachments: [
      {
        filename: "busan_logo.png",
        contentType: "image/png",
        content_id: "busan_logo_cid",
        content: busanLogoBase64,
        disposition: "inline",
      },
    ],
  };

  sgMail
    .send(msg)
    .then(() => {
      console.log("Appontment Cancelled Email Sent");
    })
    .catch((error) => {
      console.error(error);
    });
}

module.exports = { sendAppointmentSetEmail, cancelAppointmentEmail };
