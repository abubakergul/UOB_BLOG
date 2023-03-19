import express from "express";
import dotenv from "dotenv";
import morgan from "morgan";
dotenv.config();
import "express-async-errors";
import fileUpload from "express-fileupload";
import connectDB from "./db/connect.js";
import cloudinaryModule from "cloudinary";

import { dirname } from "path";
import { fileURLToPath } from "url";
import path from "path";

import notFoundMiddleware from "./middleware/not-found.js";
import errorHandlerMiddleware from "./middleware/error-handler.js";

import authRouter from "./routes/authRoutes.js";
import postRouter from "./routes/postRoutes.js";
import reviewRouter from "./routes/reviewRoutes.js";

const app = express();

if (process.env.NODE_ENV !== "production") {
  app.use(morgan("dev"));
}

// app.use(express.json());
// app.use(express.static("./client/public"));
app.use(fileUpload({ useTempFiles: true }));

const cloudinary = cloudinaryModule.v2;
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
});

const __dirname = dirname(fileURLToPath(import.meta.url));

// only when ready to deploy
app.use(express.static(path.resolve(__dirname, "./client/build")));
app.use(express.json());

app.use("/api/v1/auth", authRouter);
app.use("/api/v1/posts", postRouter);
app.use("/api/v1/reviews", reviewRouter);
app.use("/api/v1/posts/myPosts", postRouter);

app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);
const port = process.env.PORT || 5000;
const start = async () => {
  try {
    await connectDB(process.env.MONGO_URL);
    app.listen(port, () => console.log(`Server is listening on ${port}`));
  } catch (error) {
    console.log(error);
  }
};
start();
