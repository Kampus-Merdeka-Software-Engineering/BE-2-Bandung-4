const express = require("express");
const { prisma } = require("../config/prisma");
const pembelianRoutes = express.Router();

// Endpoint untuk membuat pemesanan baru
pembelianRoutes.post("/", async (req, res) => {
  try {
    const newOrder = await prisma.pemesanan.create({
      data: req.body,
    });
    res.status(201).json(newOrder);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Endpoint untuk mendapatkan semua pemesanan
pembelianRoutes.get("/", async (req, res) => {
  try {
    const orders = await prisma.pemesanan.findMany();
    res.status(200).json(orders);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// untuk mendapatkan pemesanan berdasarkan ID
pembelianRoutes.get("/:id", async (req, res) => {
  const orderId = parseInt(req.params.id);

  try {
    const order = await prisma.pemesanan.findUnique({
      where: { id: orderId },
    });

    if (!order) {
      return res.status(404).json({ error: "Order not found" });
    }

    res.status(200).json(order);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// untuk memperbarui pemesanan berdasarkan ID
pembelianRoutes.put("/:id", async (req, res) => {
  const orderId = parseInt(req.params.id);

  try {
    const updatedOrder = await prisma.pemesanan.update({
      where: { id: orderId },
      data: req.body,
    });
    res.status(200).json(updatedOrder);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// untuk menghapus pemesanan berdasarkan ID
pembelianRoutes.delete("/:id", async (req, res) => {
  const orderId = parseInt(req.params.id);

  try {
    await prisma.pemesanan.delete({
      where: { id: orderId },
    });
    res.status(204).send();
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = { pembelianRoutes };
