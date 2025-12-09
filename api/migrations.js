import { db } from "./connect.js";

// Migration để thêm video column vào bảng posts nếu chưa có
export const migrateDatabase = () => {
  // Kiểm tra và thêm cột video vào bảng posts nếu chưa tồn tại
  const query = `
    ALTER TABLE posts 
    ADD COLUMN IF NOT EXISTS video VARCHAR(255) DEFAULT NULL
  `;

  db.query(query, (err, results) => {
    if (err) {
      // Nếu lỗi là "Duplicate column", thì column đã tồn tại (không có vấn đề)
      if (err.code === "ER_DUP_FIELDNAME") {
        console.log("✓ Video column already exists in posts table");
      } else {
        console.error("Migration error:", err);
      }
    } else {
      console.log("✓ Migration completed: video column added to posts table");
    }
  });

  // Kiểm tra và thêm cột created_at nếu chưa có (optional)
  const queryMessages = `
    CREATE TABLE IF NOT EXISTS messages (
      id INT AUTO_INCREMENT PRIMARY KEY,
      senderId INT NOT NULL,
      receiverId INT NOT NULL,
      text TEXT,
      createAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (senderId) REFERENCES users(id) ON DELETE CASCADE,
      FOREIGN KEY (receiverId) REFERENCES users(id) ON DELETE CASCADE,
      INDEX idx_sender_receiver (senderId, receiverId)
    )
  `;

  db.query(queryMessages, (err, results) => {
    if (err) {
      if (err.code === "ER_TABLE_EXISTS_ERROR") {
        console.log("✓ Messages table already exists");
      } else {
        console.error("Messages table creation error:", err);
      }
    } else {
      console.log("✓ Messages table created or already exists");
    }
  });
};
