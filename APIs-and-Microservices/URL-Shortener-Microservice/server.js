const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const shortid = require("shortid");
const bodyParser = require("body-parser");
const dns = require("dns");
require("dotenv").config();

const URLSchema = require("./models/url");

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json());

const DB = process.env["DB"];

// Basic Configuration
const port = process.env.PORT || 3000;

mongoose.connect(DB, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const connection = mongoose.connection;
connection.on("error", () => console.log("connection error"));
connection.once("open", () => {
  console.log("connection success");
});

app.use(cors());

app.use("/public", express.static(`${process.cwd()}/public`));

app.get("/", function(req, res) {
  res.sendFile(process.cwd() + "/views/index.html");
});

// Your first API endpoint
app.post("/api/shorturl", async function(req, res) {
  const requrl = req.body.url;
  console.log(requrl);
  let isMatch = /^(https?:\/\/)(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#()?&//=]*)/.test(
    requrl
  );
  if (!isMatch) {
    res.json({ error: "invalid url" });
  } else {
    let url = new URL(req.body.url);
    console.log(url);
    try {
      dns.lookup(url.hostname, async (err) => {
        if (err) {
          res.json({
            error: "invalid url",
          });
          res.end();
        } else {
          try {
            var findURL = await URLSchema.findOne({
              original_url: url,
            });
            if (findURL) {
              res.json({
                original_url: findURL.original_url,
                short_url: findURL.short_url,
              });
              res.end();
            } else {
              const short = shortid.generate();
              var newURL = new URLSchema({
                original_url: url,
                short_url: short,
              });
              await newURL.save();
              res.json({
                original_url: newURL.original_url,
                short_url: newURL.short_url,
              });
              res.end();
            }
          } catch (error) {
            console.log(error);
            res.status(500).json("Server Error");
            res.end();
          }
        }
      });
    } catch (error) {
      console.log(error);
      res.status(500).json("Server Error");
      res.end();
    }
  }
});

app.get("/api/shorturl/:short_url", async (req, res) => {
  try {
    const short = req.params.short_url;
    var findURL = await URLSchema.findOne({
      short_url: short,
    });

    if (findURL) {
      res.redirect(findURL.original_url);
    } else {
      res.status(404).json("No URL found");
    }
  } catch (err) {
    console.log(err);
    res.status(500).json("Server Error");
  }
});

app.listen(port, function() {
  console.log(`Listening on port ${port}`);
});
