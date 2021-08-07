import express from "express";
import cors from "cors";
import mongoose from "mongoose";


import Auth from './routes/auth'
import Hotel from './routes/hotel'
import Stripe from './routes/stripe'
import morgan from "morgan";
import dotenv from 'dotenv';
dotenv.config()

const app = express();
app.use(cors());
app.use(morgan("dev"));
app.use(express.json());

mongoose.connect(process.env.DATABASE, {
  useNewUrlParser: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
  useCreateIndex: true,
})
  .then(() => console.log("DB Connected"))
  .catch((err) => console.log("DB Connection Error: ", err));

// middlewares

// route middleware
// readdirSync("./routes").map(r => app.use("/api", require(`./routes/${r}`)));
app.use('/api', Auth)
app.use('/api', Hotel)
app.use('/api', Stripe)



// app.use((req, res, next) => {
//   res.header("Access-Control-Allow-Origin", "*");
//   res.header(
//       "Access-Control-Allow-Headers",
//       "Origin, X-Reequested-With, Content-type, Accept, Authorization"
//   );
//   if (req.method === "OPTIONS") {
//       res.header("Access-Control-Allow-Methods", "PUT, POST, PATCH, DELETE, GET");
//       return res.status(200).json({});
//   }
//   next();
// });


if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'));
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  }
  )
}

const port = process.env.PORT || 8000;
app.listen(port, () => console.log(`Server is running on port ${port}`));
// "client-install": "npm install --prefix client",
//     "client": "npm start --prefix client",
//     "server": "nodemon --experimental-modules --es-module-specifier-resolution=node server.js",
//     "dev": "concurrently \"npm run server\" \"npm run client\"",
//     "heroku-postbuild": "NPM_CONFIG_PRODUCTION=false npm install --prefix client && npm run build --prefix client"