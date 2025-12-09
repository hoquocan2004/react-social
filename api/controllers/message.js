import { db } from "../connect.js";
import jwt from "jsonwebtoken";
import moment from "moment";

// Get conversation list (chats with users)
export const getConversations = (req, res) => {
  const token = req.cookies.accessToken;
  if (!token) return res.status(401).json("Not logged in!");

  jwt.verify(token, "secretkey", (err, userInfo) => {
    if (err) return res.status(403).json("Token is not valid!");

    const q = `SELECT DISTINCT m.senderId, m.receiverId, u.username, u.name, u.profilePic, m.text, m.createdAt
               FROM messages m
               JOIN users u ON u.id = CASE 
                 WHEN m.senderId = ? THEN m.receiverId 
                 ELSE m.senderId 
               END
               WHERE m.senderId = ? OR m.receiverId = ?
               ORDER BY m.createdAt DESC`;

    db.query(q, [userInfo.id, userInfo.id, userInfo.id], (err, data) => {
      if (err) return res.status(500).json(err);
      return res.status(200).json(data);
    });
  });
};

// Get messages between two users
export const getMessages = (req, res) => {
  const token = req.cookies.accessToken;
  if (!token) return res.status(401).json("Not logged in!");

  jwt.verify(token, "secretkey", (err, userInfo) => {
    if (err) return res.status(403).json("Token is not valid!");

    const otherUserId = req.query.userId;

    const q = `SELECT * FROM messages 
               WHERE (senderId = ? AND receiverId = ?) OR (senderId = ? AND receiverId = ?)
               ORDER BY createdAt ASC`;

    db.query(
      q,
      [userInfo.id, otherUserId, otherUserId, userInfo.id],
      (err, data) => {
        if (err) return res.status(500).json(err);
        return res.status(200).json(data);
      }
    );
  });
};

// Send message
export const sendMessage = (req, res) => {
  const token = req.cookies.accessToken;
  if (!token) return res.status(401).json("Not logged in!");

  jwt.verify(token, "secretkey", (err, userInfo) => {
    if (err) return res.status(403).json("Token is not valid!");

    const q = `INSERT INTO messages (senderId, receiverId, text, createdAt) VALUES (?)`;
    const values = [
      userInfo.id,
      req.body.receiverId,
      req.body.text,
      moment(Date.now()).format("YYYY-MM-DD HH:mm:ss"),
    ];

    db.query(q, [values], (err, data) => {
      if (err) return res.status(500).json(err);
      return res.status(200).json("Message sent");
    });
  });
};
