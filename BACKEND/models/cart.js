import mongoose from 'mongoose';

const cartSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique : true,
    },
    cart: {
        type: [{ productId: String,name: String, brand: String, price: Number, category: String, src: String, quantity: Number }], // Example structure
        default: []
    }
});

const cartModel = mongoose.model("Cart", cartSchema);
export default cartModel;
