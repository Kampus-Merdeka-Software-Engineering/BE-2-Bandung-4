// awal tampilan
require("dotenv").config();
const express = require("express");
const { MongoClient } = require("mongodb");
const bodyParser = require("body-parser");
const User = require("./models/User");

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

mongoose.connect("mongodb://localhost/mydatabase", { useNewUrlParser: true });

app.post("/register", async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const newUser = new User({ name, email, password });
    await newUser.save();
    res.status(201).json(newUser);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

app.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const isValidPassword = await user.isValidPassword(password);
    if (!isValidPassword) {
      return res.status(400).json({ message: "Invalid password" });
    }

    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Rute tambahan untuk mengelola pengguna, jika diperlukan

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
