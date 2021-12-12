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

// function scheduleAppointmentReminderEmail(email, firstName, year, month, day, time, appointmentId, batchId) {
//   //CODE FOR SCHEDULING EMAIL NOTIF 30 MINS BEFORE APPOINTMENT
//   const appointment_date = new Date(`${month} ${day}, ${year} ${time}`);
//   const notif_date = new Date(`${month} ${day}, ${year} ${appointment_date.getHours() - 1}:30`);
//   const notif_unix = Math.round(notif_date.getTime() / 1000);

//   const msg = {
//     to: email,
//     from: "appquatech@gmail.com",
//     subject: "AQT - Appointment Reminder",
//     html: `
//       <div style="padding: 2rem;">
//         <div style="width: 100%; max-width: 500px; border: 1px solid #000; margin: auto;">
//           <div style="padding: 1rem 2rem;">
//             <img src="cid:busan_logo_cid" alt="Busan PH" style="display: block; width: 100%; max-width: 400px; margin: auto;" />
//             <p>Hello <strong>${firstName}</strong>!</p>
//             <p>This is a reminder for your appointment today at <strong>${time}</strong></p>
//             <p>Your appointment ID is: <strong>${appointmentId}</strong></p>
//             <p>If you need to cancel your appointment,</p>
//             <a style="background: #2400fd; font-size: 1rem; padding: 0.5em 1em; font-weight: 700; color: #fff; text-decoration: none;" href="https://google.com">CLICK HERE</a>
//             <p>See you!</p>
//           </div>
//         </div>
//       </div>
//     `,
//     attachments: [
//       {
//         filename: "busan_logo.png",
//         contentType: "image/png",
//         content_id: "busan_logo_cid",
//         content: busanLogoBase64,
//         disposition: "inline",
//       },
//     ],
//     send_at: notif_unix,
//     batch_id: batchId,
//   };

//   sgMail
//     .send(msg)
//     .then(() => {
//       console.log("Appointment Reminder Email Scheduled");
//     })
//     .catch((error) => {
//       console.error(error.response.body.errors);
//     });
// }

function cancelAppointmentEmail() {}

module.exports = { sendAppointmentSetEmail, cancelAppointmentEmail };
