const express = require("express");
const app = express();
const mongoose = require("mongoose");
app.use(express.json());
require("./userDetails.js");

const bodyParser = require("body-parser");
const mongoUrl =
  "mongodb+srv://sushantonit:onit3652@cluster0.pdql0w2.mongodb.net/your_database_name"; // Replace 'your_database_name' with your actual database name

mongoose
  .connect(mongoUrl)
  .then(() => {
    console.log("Database Connected");
  })
  .catch((e) => {
    console.log(e);
  });
app.use(bodyParser.json());
const User = mongoose.model("UserInfo");

const db = mongoose.connection; // Define db object after connecting to MongoDB

db.on("error", console.error.bind(console, "MongoDB connection error:"));
db.once("open", () => {
  console.log("Connected to MongoDB");
  // Define your schemas and routes here, after the database connection is established
});

app.get("/", (req, res) => {
  res.send("welcome");
});

app.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    let user = await User.findOne({ email: email });
    if (!user) {
      // If user is not found, create a new user
      user = await User.create({ email, password });
      return res
        .status(200)
        .send({ status: "ok", data: "User created and logged in" });
    }
    // If user is found, check the password
    if (user.password === password) {
      return res.send({ status: "ok", data: "Login successful" });
    } else {
      return res.status(400).send({ error: "Invalid password" });
    }
  } catch (error) {
    console.error("Login Error:", error);
    return res.status(500).send({ error: "Internal server error" });
  }
});

app.post("/register", async (req, res) => {
  const { email, password } = req.body;

  const oldUser = await User.findOne({ email: email });
  if (oldUser) {
    return res.send("e2222");
  }
  try {
    await User.create({
      email: email,
      password: password,
    });
    res.send({ status: "ok", data: "User Created" });
  } catch (error) {
    res.send({ status: "error", data: error.message });
  }
});

//movie Api



const port = 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
