import express from "express";
import multer from "multer";
import { getPosts, addPost, deletePost } from "../controllers/post.js";

const router = express.Router();

// Parse FormData text fields
const upload = multer();

router.get("/", getPosts);

// ⬅⬅⬅ SỬA QUAN TRỌNG
router.post("/", upload.none(), addPost);

router.delete("/:id", deletePost);

export default router;
