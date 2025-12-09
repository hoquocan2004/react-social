import { db } from "../connect.js";
import jwt from "jsonwebtoken";
import moment from "moment";
export const getComments = (req, res) => {
  const q = `SELECT c.*,u.id AS userId, name, profilePic FROM comments as c JOIN users AS u ON(u.id = c.userId)
     WHERE c.postId = ? ORDER BY c.createAt DESC`;
  db.query(q, [req.query.postId], (err, data) => {
    if (err) return res.status(500).json(err);
    return res.status(200).json(data);
  });
};

export const addComment = (req, res) => {
  console.log("🔥 [addComment] BODY:", req.body);

  const token = req.cookies.accessToken;
  if (!token) return res.status(401).json("Not logged in!");

  jwt.verify(token, "secretkey", (err, userInfo) => {
    if (err) return res.status(403).json("Token is not valid!");

    console.log("🧩 userInfo:", userInfo);

    const q =
      "INSERT INTO comments (`desc`, `createAt`, `userId`, `postId` ) VALUES (?)";
    const values = [
      req.body.desc,
      moment(Date.now()).format("YYYY-MM-DD HH:mm:ss"),
      userInfo.id,
      req.body.postId,
    ];

    console.log("🧱 SQL VALUES:", values);

    db.query(q, [values], (err, data) => {
      if (err) {
        console.log("❌ SQL ERROR:", err);
        return res.status(500).json(err);
      }
      return res.status(200).json("Comment has been created");
    });
  });
};

export const deleteComment = (req, res) => {
  const token = req.cookies.accessToken; // Lấy token từ cookie
  if (!token) return res.status(401).json("Not logged in!"); // Kiểm tra nếu không có token

  jwt.verify(token, "secretkey", (err, userInfo) => {
    if (err) return res.status(403).json("Token is not valid!"); // Nếu token không hợp lệ

    // Câu truy vấn xóa bình luận, kiểm tra id bình luận và userId
    const q = "DELETE FROM comments WHERE `id`=? AND `userId`=?";
    db.query(q, [req.params.id, userInfo.id], (err, data) => {
      if (err) return res.status(500).json(err); // Lỗi server khi truy vấn

      if (data.affectedRows > 0)
        return res.status(200).json("Comment has been deleted."); // Nếu xóa thành công

      return res.status(403).json("You can only delete your own comments!"); // Nếu không phải chủ sở hữu
    });
  });
};
