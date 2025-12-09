import express from "express";
import fs from "fs";
const app = express();
import authRoutes from "./routes/auth.js";
import userRoutes from "./routes/users.js";
import postRoutes from "./routes/posts.js";
import commentRoutes from "./routes/comments.js";
import likeRoutes from "./routes/likes.js";
import relationshipRoutes from "./routes/relationships.js";
import storyRoutes from "./routes/stories.js";
import searchRoutes from "./routes/search.js";
import messageRoutes from "./routes/messages.js";
import { migrateDatabase } from "./migrations.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import multer from "multer";

//middlewaves
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Credentials", true);
  next();
});
app.use(express.json());
app.use(
  cors({
    origin: ["http://localhost:3000", "http://localhost:3001"],
  })
);
app.use(cookieParser());

// Run migrations on startup
migrateDatabase();

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/upload");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "_" + file.originalname);
  },
});

const upload = multer({ storage: storage });

// Multer for video with size limit 500MB
const videoUpload = multer({
  storage: storage,
  limits: {
    fileSize: 500 * 1024 * 1024, // 500MB
  },
  fileFilter: function (req, file, cb) {
    if (file.mimetype.startsWith("video/")) {
      cb(null, true);
    } else {
      cb(new Error("Only video files are allowed"));
    }
  },
});

app.post("/api/upload", upload.single("file"), (req, res) => {
  const file = req.file;
  console.log(
    "[upload] file:",
    file && {
      filename: file.filename,
      mimetype: file.mimetype,
      size: file.size,
    }
  );
  res.status(200).json(file.filename);
});

// Video upload endpoint
app.post("/api/upload/video", videoUpload.single("file"), (req, res) => {
  const file = req.file;
  if (!file) {
    return res.status(400).json({ message: "No video file provided" });
  }
  console.log(
    "[upload-video] file:",
    file && {
      filename: file.filename,
      mimetype: file.mimetype,
      size: Math.round(file.size / (1024 * 1024)) + "MB",
    }
  );
  res.status(200).json(file.filename);
});
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/posts", postRoutes);
app.use("/api/comments", commentRoutes);
app.use("/api/likes", likeRoutes);
app.use("/api/relationships", relationshipRoutes);
app.use("/api/stories", storyRoutes);
app.use("/api/search", searchRoutes);
app.use("/api/messages", messageRoutes);
app.use("/upload", express.static("public/upload")); // Đảm bảo URL trỏ đến đúng thư mục public/upload

// Create upload folder if not exists
if (!fs.existsSync("public/upload")) {
  fs.mkdirSync("public/upload", { recursive: true });
}

app.listen(8800, () => {
  console.log("API Working on http://localhost:8800!");
});
