const AvailableSchedule = require("../models/availableSchedule");

const getScheduleByYear = (req, res) => {
  const { year } = req.params;

  AvailableSchedule.aggregate([
    {
      $match: {
        year,
      },
    },
    {
      $group: {
        _id: "$month",
      },
    },
    {
      $project: {
        _id: 0,
        month: "$_id",
      },
    },
  ])
    .then((result) => {
      return res.send(result);
    })
    .catch((error) => {
      console.error(error);
    });
};

const getScheduleByYearMonth = (req, res) => {
  const { year, month } = req.params;

  AvailableSchedule.aggregate([
    {
      $match: {
        year,
        month,
      },
    },
    {
      $sort: {
        day: 1,
      },
    },
  ])
    .then((result) => {
      return res.send(result);
    })
    .catch((error) => {
      console.error(error);
    });
};

const getSchedule = (req, res) => {
  const { year, month, day } = req.params;

  AvailableSchedule.aggregate([
    {
      $match: {
        year,
        month,
        day,
      },
    },
    {
      $sort: {
        day: 1,
      },
    },
  ])
    .then((result) => {
      return res.send(result);
    })
    .catch((error) => {
      console.error(error);
    });
};

const addAvailableSchedule = (req, res) => {
  const { year, month, day, openingTime, closingTime, timeSpan, slots, persons } = req.body;

  const schedule = generateSchedule(openingTime, closingTime, timeSpan, slots);

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
      if (result.length !== 0) {
        return res.status(403).send(JSON.stringify("Schedule already exists in the database"));
      }

      AvailableSchedule.create({
        year,
        month,
        day,
        openingTime,
        closingTime,
        schedule,
        persons,
      })
        .then((result) => {
          return res.send(JSON.stringify("Added schedule successfully"));
        })
        .catch((error) => {
          console.error(error);
        });
    })
    .catch((error) => {
      console.error(error);
    });
};

const deleteSchedule = (req, res) => {
  const { _id } = req.params;

  AvailableSchedule.deleteOne({ _id })
    .then((result) => {
      return res.send(JSON.stringify("Deleted schedule successfully"));
    })
    .catch((error) => {
      console.error(error);
    });
};

function generateSchedule(openingTime, closingTime, timeSpan, slots) {
  const startTime = require("../utils/time").convertTime12to24(openingTime);
  const endTime = require("../utils/time").convertTime12to24(closingTime);
  let list = [];

  for (let i = startTime; i < endTime; i += timeSpan) {
    let hours = ((i + 11) % 12) + 1;
    let suffix = i >= 12 ? "PM" : "AM";
    list = [...list, { time: `${hours}:00 ${suffix}`, slots }];
  }

  return list;
}

module.exports = { addAvailableSchedule, getScheduleByYear, getScheduleByYearMonth, getSchedule, deleteSchedule };
