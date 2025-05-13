import mongoose from 'mongoose'

const orderSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    orders: {
        type: [{ productId: String,name: String, brand: String, price: Number, category: String, src: String, quantity: Number }],
        default : []
    },
    price : {
        type: Number,
        required : true
    },
    paymentMethod:{
        type: String, 
        enum: ['COD', 'bank','UPI', 'Credit Card', 'Debit Card'], 
        required: true 
    },
    shippingAddress: {
        fullName: { type: String, required: true },
        phone: { type: String, required: true },
        addressLine1: { type: String, required: true },
        addressLine2: { type: String },
        city: { type: String, required: true },
        state: { type: String, required: true },
        postalCode: { type: String, required: true },
        country: { type: String, required: true }
      },
      status:{
        type: String,
        enum:['deliverd','notDelivered'],
        default: 'notDelivered',
        required : true
      },
      placedAt: { type: Date, default: Date.now }
    });

    const orderModel = mongoose.model("Orders",orderSchema);
    export default orderModel;