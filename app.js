const express = require("express");

const app = express();

const { google } = require("googleapis");

const OAuth2Data = require("./credentials.json");

const CLIENT_ID = OAuth2Data.web.client_id;
const CLIENT_SECRET = OAuth2Data.web.client_secret;
const REDIRECT_URI = OAuth2Data.web.redirect_uris[0];

const oAuth2Client = new google.auth.OAuth2({
  CLIENT_ID,
  CLIENT_SECRET,
  REDIRECT_URI,
});

var authed = false;

const SCOPES =
  "https://www.googleapis.com/auth/drive.file https://www.googleapis.com/auth/userinfo.profile";

app.set("view engine", "ejs");

app.get("/", (req, res) => {
  if (!authed) {
    var url = oAuth2Client.generateAuthUrl({
      access_type: "offline",
      scope: SCOPES,
    });
    console.log(url);

    res.render("index", { url: url });
  } else {
  }
});

app.listen(3000, () => {
  console.log("App started on Port 3000");
});
