const express = require("express");
const app = express();
// You can change this to any port you prefer
const mongoose = require("mongoose");

// Define the user schema
const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});

// Create a User model based on the user schema
const User = mongoose.model("User", userSchema);

//  ab hum mmongodb se conndect kr rhe hai

const uri =
  "mongodb+srv://sushantonit:cinema123@cluster0.32nz4hw.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0&ssl=true";


// Connect to MongoDB
mongoose
  .connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.error("Error connecting to MongoDB:", err);
  });
// Define a route
app.get("/", (req, res) => {
  res.send("Hello, Express!");
});

const bodyParser = require("body-parser");
const bcrypt = require("bcrypt");
const { v4: uuidv4 } = require("uuid");

app.use(bodyParser.json());

// Simulated user database
let users = [];

// POST /api/auth
// POST /api/auth
app.post("/api/auth", (req, res) => {
  const { email, password, action } = req.body;

  console.log('Request received:', { email, action });

  if (action === "login") {
    // Login action
    console.log("Login attempt:", { email });

    const user = users.find((user) => user.email === email);

    if (!user) {
      console.log("User not found:", { email });
      return res.status(404).json({ message: "User not found" });
    }

    if (!bcrypt.compareSync(password, user.password)) {
      console.log("Wrong password:", { email });
      return res.status(401).json({ message: "Wrong password" });
    }

    // Successful login
    console.log("Login successful:", { email });
    res
      .status(200)
      .json({ message: "Login successful", user: { email: user.email } });
  } else if (action === "register") {
    // Registration action
    console.log("Registration attempt:", { email });

    const existingUser = users.find((user) => user.email === email);

    if (existingUser) {
      console.log("Email already registered:", { email });
      return res.status(409).json({ message: "Email already registered" });
    }

    const newUser = {
      id: uuidv4(),
      email: email,
      password: bcrypt.hashSync(password, 10),
    };

    users.push(newUser);

    // User registration successful
    console.log("User registered successfully:", { email });
    res
      .status(201)
      .json({
        message: "User registered successfully",
        user: { email: newUser.email },
      });
  } else {
    // Invalid action
    console.log("Invalid action:", { action });
    res.status(400).json({ message: "Invalid action" });
  }
});


// Start the server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
