import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import bodyParser from 'body-parser'
import userRouter from './routes/user.routes.js'  
import productRouter from './routes/product.routes.js';
import connect from './db/db.js'
import orderRouter from './routes/order.routes.js'
const app = express();
dotenv.config();
const port = process.env.PORT || 3000
app.use(cors({
  origin: "hhttps://e-commerce-site-one-lime.vercel.app/", // or "*" for all origins
  credentials: true
}))
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json()); 
app.use('/api/user',userRouter)
app.use('/api/products',productRouter)
app.use('/api/order',orderRouter);


const start = () =>{
    connect();
    app.listen(port,()=>{
        console.log(`server is running at ${port}`)
    })
}
start();