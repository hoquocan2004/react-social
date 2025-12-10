import moment from "moment";
import { db } from "../connect.js";
import jwt from "jsonwebtoken";

export const getPosts = (req, res) => {
  const userId = req.query.userId;
  const token = req.cookies.accessToken;
  if (!token) return res.status(401).json("Not logged in!");

  jwt.verify(token, "secretkey", (err, userInfo) => {
    if (err) return res.status(403).json("Token is not valid!");

    console.log(userId);

    const q =
      userId !== "undefined"
        ? `SELECT p.*,u.id AS userId, name, profilePic 
           FROM posts AS p 
           JOIN users AS u ON (u.id = p.userId) 
           WHERE p.userId = ? 
           ORDER BY p.createAt DESC`
        : `SELECT p.*,u.id AS userId, name, profilePic 
           FROM posts AS p 
           JOIN users AS u ON(u.id = p.userId)
           LEFT JOIN relationships AS r 
           ON (p.userId = r.followedUserId) 
           WHERE r.followerUserId = ? OR p.userId = ?
           ORDER BY p.createAt DESC`;

    const values =
      userId !== "undefined" ? [userId] : [userInfo.id, userInfo.id];

    db.query(q, values, (err, data) => {
      if (err) return res.status(500).json(err);
      console.log(`[getPosts] Returned ${data.length} posts`);
      data.forEach((p, i) => {
        console.log(`  Post ${i}: desc="${p.desc}", img="${p.img}"`);
      });
      return res.status(200).json(data);
    });
  });
};

export const addPost = (req, res) => {
  const token = req.cookies.accessToken;
  if (!token) return res.status(401).json("Not logged in!");

  jwt.verify(token, "secretkey", (err, userInfo) => {
    if (err) return res.status(403).json("Token is not valid!");

    console.log("[addPost] req.body:", req.body);

    const desc = req.body.desc || "";
    const img = req.body.img || null;
    const video = req.body.video || null;

    console.log(
      `[addPost] desc="${desc}", desc.length=${desc ? desc.length : 0}`
    );
    console.log(`[addPost] img="${img}", video="${video}"`);

    const q =
      "INSERT INTO posts (`desc`, `img`, `video`, `createAt`, `userId`) VALUES (?)";

    const values = [
      desc,
      img,
      video,
      moment(Date.now()).format("YYYY-MM-DD HH:mm:ss"),
      userInfo.id,
    ];

    db.query(q, [values], (err, data) => {
      if (err) {
        console.log("🔥 DATABASE ERROR:", err);
        return res.status(500).json(err);
      }

      console.log("✅ Post OK:", data);
      return res.status(200).json("Post has been created");
    });
  });
};

export const deletePost = (req, res) => {
  const token = req.cookies.accessToken;
  if (!token) return res.status(401).json("Not logged in!");

  jwt.verify(token, "secretkey", (err, userInfo) => {
    if (err) return res.status(403).json("Token is not valid!");

    const q = "DELETE FROM posts WHERE `id`=? AND `userId`=?";

    db.query(q, [req.params.id, userInfo.id], (err, data) => {
      if (err) return res.status(500).json(err);

      if (data.affectedRows > 0)
        return res.status(200).json("Post has been deleted.");
      return res.status(403).json("You can only delete your post!");
    });
  });
};
