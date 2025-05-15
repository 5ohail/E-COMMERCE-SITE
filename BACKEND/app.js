import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import bodyParser from 'body-parser';
import userRouter from './routes/user.routes.js';
import productRouter from './routes/product.routes.js';
import orderRouter from './routes/order.routes.js';
import connect from './db/db.js';

dotenv.config();
const app = express();
const port = process.env.PORT || 3000;

// ✅ Allowed origins (no trailing slash)
const allowedOrigins = [
  "https://e-commerce-site-one-lime.vercel.app"
];

// ✅ CORS middleware
app.use(cors({
  origin: (origin, callback) => {
    // Allow non-browser tools like Postman (no origin)
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true
}));

// ✅ Body parser
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// ✅ Routes
app.use('/api/user', userRouter);
app.use('/api/products', productRouter);
app.use('/api/order', orderRouter);

// ✅ Start server
const start = () => {
  connect();
  app.listen(port, () => {
    console.log(`🚀 Server running at port ${port}`);
  });
};

start();
