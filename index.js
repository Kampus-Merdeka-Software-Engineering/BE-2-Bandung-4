require("dotenv").config();
const express = require("express");
const cors = require("cors");
const { prisma } = require("./config/prisma");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", async (req, res) => {
  res.send("respon");
});

// Endpoint untuk mendapatkan semua produk
app.get("/products", async (req, res) => {
  const products = await prisma.product.findMany();
  res.status(200).send(products);
});

app.get("/products/:id", async (req, res) => {
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

// Endpoint untuk memperbarui produk berdasarkan ID
app.put("/products/:id", async (req, res) => {
  const productId = parseInt(req.params.id);

  try {
    const updatedProduct = await prisma.product.update({
      where: { id: productId },
      data: req.body,
    });
    res.status(200).json(updatedProduct);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Endpoint untuk membuat produk baru
app.post("/products", async (req, res) => {
  const { title, category, location, imageURL, date, price, description } =
    req.body;

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
      },
    });

    res.status(201).json(newProduct);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Endpoint untuk menghapus produk berdasarkan ID
app.delete("/products/:id", async (req, res) => {
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

// Endpoint untuk membuat pemesanan baru
app.post("/orders", async (req, res) => {
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
app.get("/orders", async (req, res) => {
  try {
    const orders = await prisma.pemesanan.findMany();
    res.status(200).json(orders);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Endpoint untuk mendapatkan pemesanan berdasarkan ID
app.get("/orders/:id", async (req, res) => {
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

// Endpoint untuk memperbarui pemesanan berdasarkan ID
app.put("/orders/:id", async (req, res) => {
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

// Endpoint untuk menghapus pemesanan berdasarkan ID
app.delete("/orders/:id", async (req, res) => {
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

// Endpoint untuk mendapatkan pesan
app.get("/messages", async (req, res) => {
  try {
    const messages = await prisma.message.findMany();
    res.status(200).json(messages);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.all("*", async (req, res) => {
  res.json({
    message: "tidak ada router",
  });
});

app.listen(PORT, "0.0.0.0", () => {
  console.log(`server is ready running at ${PORT}`);
});
