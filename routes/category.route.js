const express = require("express");
const categoryRoutes = express.Router();
const { prisma } = require("../config/prisma");

// Get all categories
categoryRoutes.get("/", async (req, res) => {
  try {
    const categories = await prisma.category.findMany();
    res.status(200).json(categories);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Get category by id
categoryRoutes.get("/:id", async (req, res) => {
  try {
    const categoryId = parseInt(req.params.id);
    const category = await prisma.category.findUnique({
      where: { id: categoryId },
    });

    if (!category) {
      return res.status(404).json({ message: "Category not found" });
    }

    res.status(200).json(category);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Create category
categoryRoutes.post("/", async (req, res) => {
  try {
    const newCategory = await prisma.category.create({
      data: req.body,
    });

    res.status(201).json({
      message: "Category created",
      data: newCategory,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Update category
categoryRoutes.put("/:id", async (req, res) => {
  try {
    const categoryId = parseInt(req.params.id);
    const updatedCategory = await prisma.category.update({
      where: { id: categoryId },
      data: req.body,
    });

    res.status(200).json({
      message: `Category with id: ${categoryId} is updated`,
      data: updatedCategory,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Delete category
categoryRoutes.delete("/:id", async (req, res) => {
  try {
    const categoryId = parseInt(req.params.id);
    await prisma.category.delete({
      where: { id: categoryId },
    });

    res.status(200).json({
      message: `Category with id: ${categoryId} successfully deleted`,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = { categoryRoutes };
