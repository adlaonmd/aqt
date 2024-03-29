const Appointment = require("../models/appointment");
const AvailableSchedule = require("../models/availableSchedule");

const sg = require("../utils/sendgrid");

const Status = {
  WAITING: "WAITING",
  ARRIVED: "ARRIVED",
  CANCELLED: "CANCELLED",
};

Object.freeze(Status);

const collation = { locale: "en_US", numericOrdering: true };

const addAppointment = (req, res) => {
  const { year, month, day, time, firstName, lastName, email, phoneNumber, groupSize } = req.body;

  const status = Status.WAITING;

  const fullSchedule = new Date(`${year}/${month}/${day} ${time}`).toLocaleString("ja-JP");

  //Check if the user has an existing appointment in the same day
  Appointment.aggregate([
    {
      $match: {
        $and: [{ $and: [{ firstName }, { email }, { phoneNumber }] }, { day }, { status: { $eq: Status.WAITING } }],
      },
    },
  ])
    .then((result) => {
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

          for (let i = 0; i < result.schedule.length; i++) {
            if (result.schedule[i].time === time) {
              let newTableSize = Math.round(groupSize / result.persons);
              let noOfTables = newTableSize;

              if (newTableSize === 0) newTableSize = 1;

              if (result.schedule[i].tables - newTableSize < 0) {
                return res.status(403).json("Insufficient tables for the group size");
              }

              if (result.schedule[i].tables === 0) {
                return res.status(403).json("No tables available");
              }

              //Decrement the tables based on the user's group size
              AvailableSchedule.updateOne(
                { "schedule._id": result.schedule[i]._id },
                { $inc: { "schedule.$.tables": -newTableSize } }
              )
                .then((result) => {
                  //Add the appointment in the database
                  Appointment.create({ ...req.body, fullSchedule, status, noOfTables })
                    .then((result) => {
                      //Get the last 6 characters of the ID and set it as appointment_id to be easily reference later
                      const appointment_id = result.id.slice(-6).toUpperCase();

                      //Process email notification
                      sg.sendAppointmentSetEmail(email, firstName, year, month, day, time, appointment_id);

                      //Update the newly created document with its appointment_id
                      Appointment.findOneAndUpdate({ _id: result.id }, { $set: { appointment_id } })
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
            }
          }
        })
        .catch((error) => {
          console.error(error);
        });
    })
    .catch((error) => {
      console.error(error);
    });
};

const getAppointments = (req, res) => {
  Appointment.aggregate([
    {
      $sort: {
        fullSchedule: 1,
      },
    },
  ])
    .collation(collation)
    .then((result) => {
      return res.send(result);
    })
    .catch((error) => {
      console.error(error);
    });
};

const getAppointment = (req, res) => {
  const { appointment_id } = req.params;

  Appointment.aggregate([{ $match: { appointment_id } }])
    .then((result) => {
      if (result.length !== 0) {
        return res.send(result[0]);
      }

      return res.status(404).json("No appointment found");
    })
    .catch((error) => {
      console.error(error);
    });
};

const getAppointmentsByDay = (req, res) => {
  const { year, month, day } = req.params;

  Appointment.aggregate([
    {
      $match: {
        year,
        month,
        day,
      },
    },
    {
      $sort: {
        fullSchedule: 1,
      },
    },
  ])
    .collation(collation)
    .then((result) => {
      return res.send(result);
    })
    .catch((error) => {
      console.error(error);
    });
};

const cancelAppointment = (req, res) => {
  const { year, month, day, time, groupSize, appointment_id, batch_id } = req.body;

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
      result = result[0];

      for (let i = 0; i < result.schedule.length; i++) {
        if (result.schedule[i].time === time) {
          let newTableSize = Math.round(groupSize / result.persons);
          if (newTableSize === 0) newTableSize = 1;

          AvailableSchedule.updateOne(
            { "schedule._id": result.schedule[i]._id },
            { $inc: { "schedule.$.tables": newTableSize } }
          )
            .then((result) => {
              Appointment.findOneAndUpdate({ appointment_id }, { status: Status.CANCELLED })
                .then((result) => {
                  const { email, firstName, year, month, day, time } = result;

                  //Process email notifcation
                  sg.cancelAppointmentEmail(email, firstName, year, month, day, time);

                  return res.json("Appointment cancelled");
                })
                .catch((error) => {
                  console.error(error);
                });
            })
            .catch((error) => {
              console.error(error);
            });
        }
      }
    })
    .catch((error) => {
      console.error(error);
    });
};

const arrivedAppointment = (req, res) => {
  const { appointment_id } = req.body;

  Appointment.updateOne({ appointment_id }, { status: Status.ARRIVED })
    .then((result) => {
      return res.json("Appointment arrived");
    })
    .catch((error) => {
      console.error(error);
    });
};

module.exports = {
  addAppointment,
  getAppointments,
  getAppointment,
  getAppointmentsByDay,
  cancelAppointment,
  arrivedAppointment,
};
