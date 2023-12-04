const express = require("express");
const { prisma } = require("../config/prisma");
const pemesananRoutes = express.Router();

// Create Pemesanan
pemesananRoutes.post("/", async (req, res) => {
  try {
    const { idProduk, jumlahOrang } = req.body;
    const product = await prisma.product.findUnique({
      where: { id: idProduk },
    });

    if (!product) {
      res.status(404).json({ error: "Product not found" });
      return;
    }

    // jika nambah 1 orang
    const additionalCharge = 0.5;
    const totalHarga =
      product.price * jumlahOrang * (1 + additionalCharge * (jumlahOrang - 1));

    const newPemesanan = await prisma.pemesanan.create({
      data: { ...req.body, totalHarga },
    });

    res.json(newPemesanan);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// READ all pemesanan
pemesananRoutes.get("/", async (req, res) => {
  try {
    const pemesanan = await prisma.pemesanan.findMany();
    res.json(pemesanan);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// READ one pemesanan by ID
pemesananRoutes.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const pemesanan = await prisma.pemesanan.findUnique({
      where: { id: parseInt(id) },
    });
    if (!pemesanan) {
      res.status(404).json({ error: "Pemesanan not found" });
    } else {
      res.json(pemesanan);
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// UPDATE pemesanan
pemesananRoutes.put("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const updatedPemesanan = await prisma.pemesanan.update({
      where: { id: parseInt(id) },
      data: req.body,
    });
    res.json(updatedPemesanan);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// DELETE pemesanan
pemesananRoutes.delete("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const deletedPemesanan = await prisma.pemesanan.delete({
      where: { id: parseInt(id) },
    });
    res.json(deletedPemesanan);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = { pemesananRoutes };
