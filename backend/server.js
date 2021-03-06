import express from 'express';
import dotenv from 'dotenv';
import colors from 'colors';
import errorHandler from './middleware/error.js';
import connectDB from './config/db.js';

import productRoutes from './routes/productRoutes.js';
import userRoutes from './routes/userRoutes.js';

dotenv.config();

//Connect database
connectDB();

const app = express();

app.use(express.json());

app.use('/api/v1/products', productRoutes);
app.use('/api/v1/users', userRoutes);

//errorHandler middleware
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(
  PORT,
  console.log(
    `Server running in ${process.env.NODE_ENV} on port ${PORT}`.yellow.bold
  )
);

process.on('unhandledRejection', (err, response) => {
  console.log(`Error : ${err.message}`.red);
});
