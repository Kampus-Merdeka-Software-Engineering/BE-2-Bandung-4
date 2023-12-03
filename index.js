require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", async (req, res) => {
  res.send("respon");
});

app.all("*", async (req, res) => {
  res.json({
    message: "tidak ada router",
  });
});

app.listen(PORT, "0.0.0.0", () => {
  console.log(`server is ready running at ${PORT}`);
});
