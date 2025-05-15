import express from "express";
import cartModel from "../models/cart.js";
import productModel from "../models/product.js";

const productRouter = express.Router();

// ✅ Add to Cart Route
productRouter.post("/cart/add", async (req, res) => {
  const { username, cart } = req.body;

  if (!username || !Array.isArray(cart)) {
    return res.status(400).json({ error: "Invalid request data" });
  }

  try {
    let existingCart = await cartModel.findOne({ username });

    if (!existingCart) {
      // Create a new cart
      existingCart = new cartModel({ username, cart });
    } else {
      // Replace existing cart
      existingCart.cart = cart;
    }

    await existingCart.save();
    res.status(200).json({ message: "Cart saved successfully", cart: existingCart.cart });
    
  } catch (error) {
    console.error("Cart update error:", error);
    res.status(500).json({ error: "Failed to save cart" });
  }
});
productRouter.get('/cart/add',async (req,res)=>{
  const { username } = req.query;

  if (!username) {
    return res.status(400).json({ error: "Username is required" });
  }

  try {
    const data = await cartModel.findOne({ username });
    res.status(200).json(data || { cart: [] });
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch cart" });
  }
})
// ✅ Get Products Route
productRouter.get("/", async (req, res) => {
  try {
    const products = await productModel.find();
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: "Error fetching products" });
  }
});
productRouter.post("/add",async (req,res)=>{
  const {name,brand,category,price,image,description} = req.body;
  const addedProduct = await productModel.create({
    name: name,
    brand: brand,
    category: category,
    price: price,
    image: image,
    description: description
  })
  res.json(addedProduct);
})
productRouter.post("/remove",async (req,res)=>{
  const {name} = req.body;
  const removedProduct = await productModel.findOneAndDelete({name:name})
  res.json(removedProduct)
})
export default productRouter;
