const Appointment = require("../models/appointment");
const AvailableSchedule = require("../models/availableSchedule");

const addAppointment = (req, res) => {
  const { year, month, day, time, firstName, lastName, email, phoneNumber, groupSize } = req.body;

  //Check if the user has an existing appointment in the same day
  Appointment.aggregate([
    {
      $match: {
        $and: [{ $or: [{ firstName }, { email }, { phoneNumber }] }, { day }],
      },
    },
  ]).then((result) => {
    if (result.length !== 0) {
      return res.status(403).json("User already has an appointment set");
    }

    //Check if the desired schedule is present in the database
    AvailableSchedule.aggregate([
      {
        $match: {
          year,
          month,
          day,
        },
      },
    ])
      .then((result) => {
        if (result.length === 0) {
          return res.status(406).json("No schedule found");
        }

        //Get the Object in Array result since there should only be 1 schedule
        result = result[0];

        for (let i = 0; i < result.schedule.length - 1; i++) {
          if (result.schedule[i].time === time) {
            let newSlotSize = Math.round(groupSize / result.persons);
            if (newSlotSize === 0) newSlotSize = 1;

            if (result.schedule[i].slots - newSlotSize < 0) {
              return res.status(403).json("Insufficient slots for the group size");
            }

            if (result.schedule[i].slots === 0) {
              return res.status(403).json("No slots available");
            }

            //Decrement the slots based on the user's group size
            AvailableSchedule.updateOne(
              { "schedule._id": result.schedule[i]._id },
              { $inc: { "schedule.$.slots": -newSlotSize } }
            )
              .then((result) => {
                //Add the appointment in the database
                Appointment.create(req.body)
                  .then((result) => {
                    //Get the last 6 characters of the ID and set it as appointment_id to be easily reference later
                    const appointment_id = result.id.slice(-6).toUpperCase();

                    //Update the newly created document with its appointment_id
                    Appointment.updateOne({ _id: result.id }, { $set: { appointment_id } })
                      .then((result) => {
                        return res.send({ ...result, appointment_id });
                      })
                      .catch((error) => {
                        console.error(error);
                      });
                  })
                  .catch((error) => {
                    console.error(error);
                  });
              })
              .catch((error) => {
                console.error(error);
              });

            break;
          }
        }
      })
      .catch((error) => {
        console.error(error);
      });
  });
};

module.exports = { addAppointment };
