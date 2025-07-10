import express from 'express';
import { nanoid } from 'nanoid';
import dotenv from 'dotenv';
import connectDB from "./src/config/mongo.config.js"
import shortUrl from './src/routes/shortUrl.route.js';
import authRoutes from './src/routes/auth.route.js';
import userRoutes from './src/routes/user.route.js';
import {redirectFromShortUrl} from "./src/controller/shortUrl.controller.js"
import { errorHandler } from './src/utils/errorHandler.js';
import cors from 'cors'
import cookieParser from 'cookie-parser';

import { attachUser } from './src/utils/attachUser.js';

dotenv.config("./.env");
const app = express();

app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true,
}))
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(attachUser);

app.get("/", (req, res) => {
  res.send(nanoid(7));
});

app.use("/api/user", userRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/create", shortUrl)
app.get("/:id",redirectFromShortUrl);

app.use(errorHandler)

app.listen(3000, () => {
  connectDB();
  console.log('Server is running on http://localhost:3000');
});
