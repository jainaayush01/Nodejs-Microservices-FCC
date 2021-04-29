const express = require('express')
const app = express()
const cors = require('cors')
require('dotenv').config()
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const User = require('./models/User');
// const Exercise = require('./models/Exercise');

app.use(cors())
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.static('public'))
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/views/index.html')
});

const DB = process.env['DB'];

mongoose.connect(DB, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
})

const connection = mongoose.connection;
connection.on("error", () => console.log("connection error"));
connection.once("open", () => {
  console.log("connection success");
});

app.post('/api/users', async (req, res) => {
  const username = req.body.username;
  if (!username) {
    res.json({ error: "empty username" });
  }
  else {
    try {
      let findUser = await User.findOne({ username });

      if (findUser) {
        res.end('username already taken');
      }
      else {
        findUser = new User({
          username: username
        });

        await findUser.save();

        res.json({
          _id: findUser._id,
          username: findUser.username
        })
      }
    }
    catch (error) {
      console.log("Server Error: " + error);
      res.json(error);
    }
  }
})

app.get('/api/users', async (req, res) => {
  try {
    let users = await User.find({});
    res.json(users);
  }
  catch (error) {
    res.json({ error });
    console.log(error);
  }
})

app.post('/api/users/:_id/exercises', async (req, res) => {
  try {
    // console.log(req.body);
    let userid = req.params._id;
    let description = req.body.description;
    let duration = parseInt(req.body.duration);
    let date = req.body.date;

    let findUser = await User.findOne({ _id: userid });

    if (!findUser) {
      console.log(findUser);
      res.end('unknown _id');
    }
    else {
      if (!description && !duration) {
        res.end(`Path ${!description ? `description` : `duration`} is required.`);
      }
      else if (!Number(duration)) {
        res.end(`Cast to Number failed for value "${userdata.duration}" at path "duration"`);
      }
      else if (date && (new Date(date).toUTCString() == "Invalid Date")) {
        res.end(`Cast to Date failed for value "${date}" at path "date"`);
      }
      else {
        if (!date) {
          date = new Date();
        }
        else {
          date = new Date(date);
        }
        date = date.toDateString();
        let exercise = {
          description,
          duration,
          date
        }

        let user = await User.findOneAndUpdate({ _id: userid }, {
          $push: { log: exercise },
          $inc: { count: 1 },
        });
        res.json({
          _id: userid,
          username: findUser.username,
          description,
          duration,
          date,
        });
      }
    }
  }
  catch (error) {
    console.log(error);
    res.json({ error });
  }
})


app.get('/api/users/:_id/logs', async (req, res) => {
  try {
    let userid = req.params._id;

    let findUser = await User.findOne({ _id: userid }, { __v: 0 });
    if (!findUser) {
      res.end('unknown _id');
    }
    else {
      const { _id, count, username, log } = findUser;
      var templog = log.slice();

      if (req.params.from && req.params.to) {
        let from = new Date(req.params.from);
        let to = new Date(req.params.to);

        if (!(from == "Invalid Date" || to == "Invalid Date")) {
          templog = log.filter((exercise) => {
            var date = new Date(exercise.date);
            return (date <= to && date >= from);
          })
        }
        else {
          res.end('invalid date parameters');
        }
      }

      if (req.query.limit) {
        let limit = Number(req.query.limit);
        if (Number(limit)) {
          if (limit < count) {
            templog.length = limit;
          }
        }
        else {
          res.end('invalid limit');
        }
      }

      templog = templog.map((exercise) => {
        var newex = { description: exercise.description, duration: exercise.duration, date: exercise.date };
        return newex;
      })

      res.json({
        _id,
        username,
        count,
        log: templog
      });
    }
  }
  catch (error) {
    console.log(error);
    res.json({ error });
  }
})

const listener = app.listen(process.env.PORT || 3000, () => {
  console.log('Your app is listening on port ' + listener.address().port)
})
