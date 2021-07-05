import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import morgan from "morgan";
import cors from "cors";
import mongoose from "mongoose";
import blogRouter from "./routes/blog.js";

dotenv.config({ path: ".env" });

const app = express();

//middlewares
app.use(morgan("dev"));
app.use(express.json());
app.use(cookieParser());

//cors
if (process.env.NODE_ENV === "development") {
  app.use(cors({ origin: `${process.env.CLIENT_URL}` }));
}

//routes middleware
app.use("/blog", blogRouter);

//routes
app.get("/api", (req, res) => {
  res.json({ time: Date().toString() });
});

//db
mongoose
  .connect(process.env.DATABASE, {
    useCreateIndex: true,
    useFindAndModify: false,
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("DB connected");
  });

//port
const port = process.env.PORT || 9000;

app.listen(port, () => {
  console.log(`server listening to port ${port}`);
});
