import express from "express";
import { blogController } from "../controllers/blogController.js";

const router = express.Router();

router.get("/", blogController);

export default router;
