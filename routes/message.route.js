const express = require("express");
const { prisma } = require("../config/prisma");
const messageRoutes = express.Router();

// CREATE Message
messageRoutes.post("/", async (req, res) => {
  try {
    const newMessage = await prisma.message.create({
      data: req.body,
    });
    res.json(newMessage);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// // READ all messages
// messageRoutes.get("/", async (req, res) => {
//   try {
//     const messages = await prisma.message.findMany();
//     res.json(messages);
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: "Internal Server Error" });
//   }
// });

// // READ one message by ID
// messageRoutes.get("/:id", async (req, res) => {
//   const { id } = req.params;
//   try {
//     const message = await prisma.message.findUnique({
//       where: { id: parseInt(id) },
//     });
//     if (!message) {
//       res.status(404).json({ error: "Message not found" });
//     } else {
//       res.json(message);
//     }
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: "Internal Server Error" });
//   }
// });

// // UPDATE Message
// messageRoutes.put("/:id", async (req, res) => {
//   const { id } = req.params;
//   try {
//     const updatedMessage = await prisma.message.update({
//       where: { id: parseInt(id) },
//       data: req.body,
//     });
//     res.json(updatedMessage);
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: "Internal Server Error" });
//   }
// });

// // DELETE Message
// messageRoutes.delete("/:id", async (req, res) => {
//   const { id } = req.params;
//   try {
//     const deletedMessage = await prisma.message.delete({
//       where: { id: parseInt(id) },
//     });
//     res.json(deletedMessage);
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: "Internal Server Error" });
//   }
// });

module.exports = { messageRoutes };
