const express = require("express");
const productRoutes = express.Router();
const { prisma } = require("../config/prisma");

// Get all products
productRoutes.get("/", async (req, res) => {
  const { lokasi, tipeTrip, bulan } = req.query;

  try {
    const filter = {};
    if (lokasi) filter.location = { contains: lokasi.toLowerCase() };
    if (tipeTrip)
      filter.categoryId = { equals: Number(tipeTrip.toLowerCase()) };
    if (bulan) filter.date = { gte: new Date(bulan) }; // Sesuaikan dengan format dan logika pencocokan tanggal yang benar

    const size = Object.keys(filter).length;
    let products;
    if (size) {
      products = await prisma.product.findMany({
        where: filter,
      });
    } else {
      products = await prisma.product.findMany();
    }
    res.status(200).json(products);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Get product by id
productRoutes.get("/:id", async (req, res) => {
  try {
    const productId = parseInt(req.params.id);
    const product = await prisma.product.findUnique({
      where: { id: productId },
    });

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.status(200).json(product);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Create product
productRoutes.post("/", async (req, res) => {
  try {
    const newProduct = await prisma.product.create({
      data: req.body,
    });

    res.status(201).json({
      message: "Product created",
      data: newProduct,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Update product
productRoutes.put("/:id", async (req, res) => {
  try {
    const productId = parseInt(req.params.id);
    const updatedProduct = await prisma.product.update({
      where: { id: productId },
      data: req.body,
    });

    res.status(200).json({
      message: `Product with id: ${productId} is updated`,
      data: updatedProduct,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Delete product
productRoutes.delete("/:id", async (req, res) => {
  try {
    const productId = parseInt(req.params.id);
    await prisma.product.delete({
      where: { id: productId },
    });

    res.status(200).json({
      message: `Product with id: ${productId} successfully deleted`,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = { productRoutes };
