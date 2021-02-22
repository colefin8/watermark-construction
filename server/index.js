require("dotenv").config();
const express = require("express");
const session = require("express-session");
const app = express();
const cors = require("cors");
const { SERVER_PORT, SESSION_SECRET } = process.env;
const glryCtrl = require("./galleryController");

app.use(cors());
app.use(express.json());
app.use(express.static(`${__dirname}/../build`));
app.use(
  session({
    resave: false,
    saveUninitialized: true,
    secret: SESSION_SECRET,
    cookie: {
      //max age 1 week
      maxAge: 1000 * 60 * 60 * 24 * 7 * 4,
    },
  })
);

app.get("/api/signs3", glryCtrl.signs3);
app.post("/api/gallery", glryCtrl.addToJSON);

app.listen(SERVER_PORT, () => {
  console.log(`Server is running on ${SERVER_PORT}`);
});
