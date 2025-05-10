import mongoose from 'mongoose'

const orderSchema = mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    orders: {
        type: [{ productId: String,name: String, brand: String, price: Number, category: String, src: String, quantity: Number }],
        default : []
    },
    paymentMethod:{
        type: String, 
        enum: ['COD', 'UPI', 'Credit Card', 'Debit Card'], 
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
      placedAt: { type: Date, default: Date.now }
    });