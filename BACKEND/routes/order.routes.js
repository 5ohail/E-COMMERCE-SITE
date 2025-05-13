import express from "express";
import orderModel from "../models/orders.js";
const orderRouter = express.Router();

orderRouter.post('/',async (req,res)=>{
    const {username,orders,price,paymentMethod,shippingAddress} = req.body
    console.log(req.body)
    const createOrder = await orderModel.create({
    username : username,
    orders : [...orders],
    price: price,
    paymentMethod : paymentMethod,
    shippingAddress : {...shippingAddress}
   })
   res.json(createOrder);
})
export default orderRouter;