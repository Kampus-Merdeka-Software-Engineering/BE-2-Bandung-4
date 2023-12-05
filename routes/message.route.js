const express = require("express");
const messageRoutes = express.Router();
const { prisma } = require("../config/prisma");

// Get all messages
messageRoutes.get("/", async (req, res) => {
  try {
    const messages = await prisma.message.findMany();
    res.status(200).json(messages);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Get message by id
messageRoutes.get("/:id", async (req, res) => {
  try {
    const messageId = parseInt(req.params.id);
    const message = await prisma.message.findUnique({
      where: { id: messageId },
    });

    if (!message) {
      return res.status(404).json({ message: "Message not found" });
    }

    res.status(200).json(message);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Create message
messageRoutes.post("/", async (req, res) => {
  try {
    const newMessage = await prisma.message.create({
      data: req.body,
    });

    res.status(201).json({
      message: "Message created",
      data: newMessage,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Update message
messageRoutes.put("/:id", async (req, res) => {
  try {
    const messageId = parseInt(req.params.id);
    const updatedMessage = await prisma.message.update({
      where: { id: messageId },
      data: req.body,
    });

    res.status(200).json({
      message: `Message with id: ${messageId} is updated`,
      data: updatedMessage,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Delete message
messageRoutes.delete("/:id", async (req, res) => {
  try {
    const messageId = parseInt(req.params.id);
    await prisma.message.delete({
      where: { id: messageId },
    });

    res.status(200).json({
      message: `Message with id: ${messageId} successfully deleted`,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = { messageRoutes };
