import express from "express";
import cors from 'cors'
import morgan from 'morgan'
import cookieParser from 'cookie-parser'

import ENV from './lib/env.js'

const app = express();

app.use(express.json());
app.use(cookieParser())
app.use(morgan('dev'))
app.use(cors({
  origin: ENV.CLIENT_URL,
  credentials: true
}));

app.get("/check", (req, res) => {
  res.send("API running");
});

app.use((err, req, res, next) => {
  console.log(err.stack)
  res.status(500).json({
    message: "Internal Server Error"
  })
})


export default app;
