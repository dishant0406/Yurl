//simple express REST API
import express, { json } from 'express'
import { config } from 'dotenv';
import shortnerRoute from './Routes/URLShortenerRoute.js'
import connectDB from './db.js';

//dotenv
config();

const app = express();

//connect to db
connectDB();

//to use req.body
app.use(json());

//define routes
app.use('/api', shortnerRoute)

//port
const PORT = process.env.PORT || 3000;

//run app
app.listen(PORT, function () {
  console.log(`App Listening on Port ${PORT}`);
})


