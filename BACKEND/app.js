import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import bodyParser from 'body-parser'
import userRouter from './routes/user.routes.js'  
import productRouter from './routes/product.routes.js';
import connect from './db/db.js'
const app = express();
dotenv.config();
const port = process.env.PORT || 3000
app.use(cors())
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json()); 
app.use('/api/user',userRouter)
app.use('/api/products',productRouter)



const start = () =>{
    connect();
    app.listen(port,()=>{
        console.log(`server is running at ${port}`)
    })
}
start();