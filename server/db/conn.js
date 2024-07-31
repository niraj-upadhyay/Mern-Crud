const mongoose = require("mongoose");
const DB = "mongodb+srv://satyaupadh78:hb1O7Ra1fw6iaGnX@cluster0.z6jstd0.mongodb.net/mernstack?retryWrites=true&w=majority&appName=Cluster0"

mongoose
  .connect(DB)
  .then(() => console.log("Connection successful"))
  .catch((err) => console.error("Connection error:", err));
