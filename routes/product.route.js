const express = require("express");
const { prisma } = require("../config/prisma");
const productRoutes = express.Router();

// Endpoint untuk mendapatkan semua produk
productRoutes.get("/", async (req, res) => {
  try {
    const products = await prisma.product.findMany();
    res.status(200).json(products);
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

productRoutes.get("/:id", async (req, res) => {
  const productId = parseInt(req.params.id);

  try {
    const product = await prisma.product.findUnique({
      where: { id: productId },
    });

    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }

    res.status(200).json(product);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Endpoint untuk membuat produk baru
productRoutes.post("/", async (req, res) => {
  const {
    title,
    category,
    location,
    imageURL,
    date,
    price,
    description,
    jumlahOrang,
  } = req.body;

  try {
    const newProduct = await prisma.product.create({
      data: {
        title,
        category,
        location,
        imageURL,
        date: new Date(date),
        price,
        description,
        jumlahOrang,
      },
    });

    res.status(201).json(newProduct);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Endpoint untuk memperbarui produk berdasarkan ID
productRoutes.put("/:id", async (req, res) => {
  const productId = parseInt(req.params.id);

  try {
    const updatedProduct = await prisma.product.update({
      where: { id: productId },
      data: { ...req.body, date: new Date(req.body.date) },
    });
    res.status(200).json(updatedProduct);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Endpoint untuk menghapus produk berdasarkan ID
productRoutes.delete("/:id", async (req, res) => {
  const productId = parseInt(req.params.id);

  if (isNaN(productId)) {
    return res.status(400).json({ error: "Invalid ID format" });
  }

  try {
    const deletedProduct = await prisma.product.delete({
      where: { id: productId },
    });

    if (!deletedProduct) {
      return res.status(404).json({ error: "Product not found" });
    }

    res.status(204).send();
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = { productRoutes };
