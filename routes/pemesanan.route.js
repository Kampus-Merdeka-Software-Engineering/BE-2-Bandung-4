const express = require("express");
const pemesananRoutes = express.Router();
const { prisma } = require("../config/prisma");

// Get all pemesanan
pemesananRoutes.get("/", async (req, res) => {
  try {
    const pemesanans = await prisma.pemesanan.findMany();
    res.status(200).json(pemesanans);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Get pemesanan by id
pemesananRoutes.get("/:id", async (req, res) => {
  try {
    const pemesananId = parseInt(req.params.id);
    const pemesanan = await prisma.pemesanan.findUnique({
      where: { id: pemesananId },
    });

    if (!pemesanan) {
      return res.status(404).json({ message: "Pemesanan not found" });
    }

    res.status(200).json(pemesanan);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

const { v4: uuidv4 } = require("uuid");

// Create pemesanan
pemesananRoutes.post("/", async (req, res) => {
  try {
    const { idProduk, jumlahOrang } = req.body;

    // Validasi idProduk dan jumlahOrang
    if (!idProduk || !jumlahOrang || jumlahOrang < 1) {
      res.status(400).json({
        error: "Invalid request. idProduk and jumlahOrang are required.",
      });
      return;
    }

    const product = await prisma.product.findUnique({
      where: { id: idProduk },
    });

    if (!product) {
      res.status(404).json({ error: "Product not found" });
      return;
    }

    // Generate kode tiket otomatis menggunakan UUID
    const kodeTiket = uuidv4();

    // Hitung total harga dengan aturan tambahan
    let totalHarga = product.price * jumlahOrang; // Harga dasar

    if (product.category === "group_trip") {
      // Kategori Group Trip
      if (jumlahOrang > 1) {
        // Harga tambah 50% per orang tambah (2 orang ke atas)
        totalHarga += Math.floor(totalHarga * 0.5 * (jumlahOrang - 1));
      }
    } else if (product.category === "concert_trip") {
      // Kategori Concert Trip
      // Harga kali jumlah orang
      totalHarga *= jumlahOrang;
    }

    const newPemesanan = await prisma.pemesanan.create({
      data: {
        ...req.body,
        kodeTiket,
        totalHarga,
      },
    });

    res.json(newPemesanan);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Update pemesanan
pemesananRoutes.put("/:id", async (req, res) => {
  try {
    const pemesananId = parseInt(req.params.id);
    const { jumlahOrang } = req.body;

    if (!jumlahOrang || jumlahOrang < 1) {
      res.status(400).json({
        error: "Invalid request. jumlahOrang must be a positive integer.",
      });
      return;
    }

    const existingPemesanan = await prisma.pemesanan.findUnique({
      where: { id: pemesananId },
    });

    if (!existingPemesanan) {
      res.status(404).json({ error: "Pemesanan not found" });
      return;
    }

    const product = await prisma.product.findUnique({
      where: { id: existingPemesanan.idProduk },
    });

    if (!product) {
      res.status(404).json({ error: "Product not found" });
      return;
    }

    // Hitung total harga dengan aturan tambahan
    let totalHarga = product.price * jumlahOrang; // Harga dasar

    if (product.category === "group_trip") {
      // Kategori Group Trip
      if (jumlahOrang > 1) {
        // Harga tambah 50% per orang tambah (2 orang ke atas)
        totalHarga += Math.floor(totalHarga * 0.5 * (jumlahOrang - 1));
      }
    } else if (product.category === "concert_trip") {
      // Kategori Concert Trip
      // Harga kali jumlah orang
      totalHarga *= jumlahOrang;
    }

    const updatedPemesanan = await prisma.pemesanan.update({
      where: { id: pemesananId },
      data: {
        ...req.body,
        totalHarga,
      },
    });

    res.status(200).json({
      message: `Pemesanan with id: ${pemesananId} is updated`,
      data: updatedPemesanan,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = { pemesananRoutes };

// Delete pemesanan
pemesananRoutes.delete("/:id", async (req, res) => {
  try {
    const pemesananId = parseInt(req.params.id);
    await prisma.pemesanan.delete({
      where: { id: pemesananId },
    });

    res.status(200).json({
      message: `Pemesanan with id: ${pemesananId} successfully deleted`,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = { pemesananRoutes };
