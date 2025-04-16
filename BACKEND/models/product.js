import mongoose from 'mongoose'

const productSchema = new mongoose.Schema({
    brand:{
        type: String,
        required: true
    },
    name:{
        type: String,
        required: true,
    },
    price:{
        type: Number,
        required: true
    },
    category:{
        type: String,
        required: true,
    },
    image: {
        type: String,
        required: true
    }
})
const productModel = mongoose.model("product",productSchema);
export default productModel