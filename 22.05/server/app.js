const express = require("express");
const app = express();
const port = 3000;
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
require("dotenv").config();

const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(cors());

mongoose
  .connect(
    "mongodb+srv://bd89u19l1:aytac123@cluster0.mcpd69u.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
  )
  .then(() =>
    app.listen(PORT, () => {
      console.log(`Example app listening on port://http://localhost:${PORT}`);
    })
  );

const { Schema } = mongoose;

const productSchema = new Schema({
  img: { type: String, required: true },
  title: { type: String, required: true },
  price: { type: String, required: true },
  isNewProduct: { type: Boolean, required: true },
  discount: { type: Number, required: true },
});
const Product = mongoose.model("Product", productSchema);

app.get("/products", async (req, res) => {
  try {
    const products = await Product.find({});
    if (products.length > 0) {
      res.status(200).send({
        message: "success",
        data: products,
      });
    } else {
      res.status(204).send({
        message: "empty data",
        data: null,
      });
    }
  } catch (error) {
    res.status(500).send({
      message: error.message,
      error: true,
    });
  }
});
app.get("/products/:id", async (req, res) => {
  const{id}=req.params;
  try {
    const product = await Product.findById(id);
    if (product) {
      res.status(200).send({
        message: "success",
        data: product,
      });
    } else {
      res.status(204).send({
        message: "empty data",
        data: null,
      });
    }
  } catch (error) {
    res.status(500).send({
      message: error.message,
      error: true,
    });
  }
});

app.post("/products", async (req, res) => {
  const newProduct = new Product(req.body);
  try {
    await newProduct.save();
    res.status(200).send({
      message: "posted",
      newProduct: newProduct,
    });
  } catch (error) {
    res.status(500).send({
      message: error.message,
      error: true,
    });
  }
});

app.delete("/products/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const deleteProduct = await Product.findByIdAndDelete(id);
    res.status(200).send({
      message: "deleted",
      deleteProduct: deleteProduct,
    });
  } catch (error) {
    res.status(500).send({
      message: error.message,
      error: true,
    });
  }
});
