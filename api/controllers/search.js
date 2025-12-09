import { db } from "../connect.js";
import jwt from "jsonwebtoken";

// Search users by username or name
export const searchUsers = (req, res) => {
  const token = req.cookies.accessToken;
  if (!token) return res.status(401).json("Not logged in!");

  jwt.verify(token, "secretkey", (err, userInfo) => {
    if (err) return res.status(403).json("Token is not valid!");

    const q = `SELECT id, username, name, profilePic FROM users 
               WHERE (username LIKE ? OR name LIKE ?) 
               AND id != ?
               LIMIT 20`;

    const searchTerm = `%${req.query.q}%`;

    db.query(q, [searchTerm, searchTerm, userInfo.id], (err, data) => {
      if (err) return res.status(500).json(err);
      return res.status(200).json(data);
    });
  });
};

// Search posts by description/caption
export const searchPosts = (req, res) => {
  const token = req.cookies.accessToken;
  if (!token) return res.status(401).json("Not logged in!");

  jwt.verify(token, "secretkey", (err, userInfo) => {
    if (err) return res.status(403).json("Token is not valid!");

    const q = `SELECT p.*, u.id AS userId, u.name, u.profilePic 
               FROM posts p 
               JOIN users u ON u.id = p.userId 
               WHERE p.desc LIKE ? 
               ORDER BY p.createAt DESC 
               LIMIT 50`;

    const searchTerm = `%${req.query.q}%`;

    db.query(q, [searchTerm], (err, data) => {
      if (err) return res.status(500).json(err);
      return res.status(200).json(data);
    });
  });
};
