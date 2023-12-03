const express = require("express");
const { prisma } = require("../config/prisma");
const messageRoutes = express.Router();

// untuk mendapatkan pesan
messageRoutes.get("/", async (req, res) => {
  try {
    const messages = await prisma.message.findMany();
    res.status(200).json(messages);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = { messageRoutes };
