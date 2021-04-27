const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const shortid = require("shortid");
const validURL = require("valid-url");
const bodyParser = require("body-parser");
require("dotenv").config();

const URL = require("./models/url");

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));

const DB = process.env['DB']

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

app.get("/", function (req, res) {
    res.sendFile(process.cwd() + "/views/index.html");
});

// Your first API endpoint
app.post("/api/shorturl", async function (req, res) {
    // console.log(req);
    const url = req.body.url;

    if (!validURL.isWebUri(url)) {
        res.status(401).json({
            error: "invalid URL",
        });
    } else {
        try {
            var findURL = await URL.findOne({
                original_url: url,
            });

            if (findURL) {
                res.json({
                    original_url: findURL.original_url,
                    short_url: findURL.short_url,
                });
            } else {
                const short = shortid.generate();
                var newURL = new URL({
                    original_url: url,
                    short_url: short,
                });
                await newURL.save();
                res.json({
                    original_url: newURL.original_url,
                    short_url: newURL.short_url
                });
            }
        } catch (err) {
            console.log(err);
            res.status(500).json("Server Error");
        }
    }
});

app.get("/api/shorturl/:short_url", async (req, res) => {
    try {
        const short = req.params.short_url;
        var findURL = await URL.findOne({
            short_url: short
        });

        if (findURL) {
            res.redirect(findURL.original_url);
        }
        else {
            res.status(404).json('No URL found');
            }
    }
    catch (err) {
        console.log(err);
        res.status(500).json("Server Error");
    }
});

app.listen(port, function () {
    console.log(`Listening on port ${port}`);
});
