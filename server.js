import express from "express";
// import { readdirSync } from "fs";
import cors from "cors";
import mongoose from "mongoose";

import Auth from './routes/auth'
import Hotel from './routes/hotel'
import Stripe from './routes/stripe'
import morgan from "morgan";
import dotenv from 'dotenv';
dotenv.config()

const app = express();





mongoose
  .connect(process.env.DATABASE, {
    useNewUrlParser: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then(() => console.log("DB Connected"))
  .catch((err) => console.log("DB Connection Error: ", err));

// middlewares
app.use(cors());
app.use(morgan("dev"));
app.use(express.json());

// route middleware
// readdirSync("./routes").map(r => app.use("/api", require(`./routes/${r}`)));
app.use('/api', Auth)
app.use('/api', Hotel)
app.use('/api', Stripe)

const port = process.env.PORT || 8000;
app.listen(port, () => console.log(`Server is running on port ${port}`));
