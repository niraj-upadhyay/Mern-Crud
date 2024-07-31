require("dotenv").config();
const express = require("express");
const app = express();

require("./db/conn");
const users = require("./models/userSchema");
const mongoose = require("mongoose");
const DB =
  "mongodb+srv://satyaupadh78:hb1O7Ra1fw6iaGnX@cluster0.z6jstd0.mongodb.net/mernstack?retryWrites=true&w=majority&appName=Cluster0";
const port = process.env.PORT || 4000;
const cors = require("cors");
const router = require("./routers/router");

app.use(cors());
app.use(express.json());
app.use(router);

app.listen(port, () => {
  console.log(`connection is live at the port ${port}`);
});
