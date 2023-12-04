const express = require("express");
const { prisma } = require("../config/prisma");
const pemesananRoutes = express.Router();

// Endpoint untuk membuat pemesanan baru
pemesananRoutes.post("/", async (req, res) => {
  try {
    const {
      kodeTiket,
      namaPelanggan,
      emailPelanggan,
      teleponPelanggan,
      orders,
    } = req.body;

    if (!orders || !Array.isArray(orders) || orders.length === 0) {
      return res.status(400).json({ error: "Invalid order payload" });
    }

    const createdOrders = await Promise.all(
      orders.map(async (order) => {
        const { idProduk, jumlahOrang } = order;

        if (!idProduk || !jumlahOrang || jumlahOrang <= 0) {
          return res.status(400).json({ error: "Invalid order details" });
        }

        const product = await prisma.product.findUnique({
          where: { id: idProduk },
        });

        if (!product) {
          return res.status(404).json({ error: "Product not found" });
        }

        // Hitung total harga dengan aturan tambahan
        const basePrice = product.price;
        const additionalPercentage = 0.2; // 20% tambahan per orang
        const additionalPrice = Math.floor(basePrice * additionalPercentage);

        const totalHarga = basePrice + additionalPrice * (jumlahOrang - 1);

        const newOrder = await prisma.pemesanan.create({
          data: {
            kodeTiket,
            namaPelanggan,
            emailPelanggan,
            teleponPelanggan,
            idProduk,
            jumlahOrang,
            totalHarga,
          },
        });

        return newOrder;
      })
    );

    res.status(201).json(createdOrders);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Endpoint untuk mendapatkan semua pemesanan
pemesananRoutes.get("/", async (req, res) => {
  try {
    const orders = await prisma.pemesanan.findMany();
    res.status(200).json(orders);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// untuk mendapatkan pemesanan berdasarkan ID
pemesananRoutes.get("/:id", async (req, res) => {
  const orderId = parseInt(req.params.id);

  try {
    const order = await prisma.pemesanan.findUnique({
      where: { id: idProduk },
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
pemesananRoutes.put("/:id", async (req, res) => {
  const orderId = parseInt(req.params.id);

  try {
    const updatedOrder = await prisma.pemesanan.update({
      where: { id: idProduk },
      data: req.body,
    });
    res.status(200).json(updatedOrder);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// untuk menghapus pemesanan berdasarkan ID
pemesananRoutes.delete("/:id", async (req, res) => {
  const orderId = parseInt(req.params.id);

  try {
    await prisma.pemesanan.delete({
      where: { id: idProduk },
    });
    res.status(204).send();
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = { pemesananRoutes };
