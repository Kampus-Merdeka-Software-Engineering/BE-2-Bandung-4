require("dotenv").config();
const express = require("express");
const cors = require("cors");
const { productRoutes } = require("./routes/product.route");
const { pemesananRoutes } = require("./routes/pemesanan.route");
const { messageRoutes } = require("./routes/message.route");
const { categoryRoutes } = require("./routes/category.route");
const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", async (req, res) => {
  res.send("respon");
});

//product route
app.use("/product", productRoutes);
app.use("/orders", pemesananRoutes);
app.use("/category", categoryRoutes);
app.use("/message", messageRoutes);

app.listen(PORT, "0.0.0.0", () => {
  console.log(`server is ready running at ${PORT}`);
});
