import { db } from "./connect.js";

export const migrateDatabase = () => {
  // 1. Kiểm tra xem cột "video" đã tồn tại chưa
  const checkColumnQuery = `
    SHOW COLUMNS FROM posts LIKE 'video';
  `;

  db.query(checkColumnQuery, (err, results) => {
    if (err) {
      console.error("Error checking 'video' column:", err);
      return;
    }

    if (results.length === 0) {
      // Chưa có -> thêm vào
      const addColumnQuery = `
        ALTER TABLE posts ADD COLUMN video VARCHAR(255) DEFAULT NULL;
      `;

      db.query(addColumnQuery, (err2) => {
        if (err2) {
          console.error("Error adding 'video' column:", err2);
        } else {
          console.log(
            "✓ Migration completed: 'video' column added to posts table"
          );
        }
      });
    } else {
      console.log("✓ 'video' column already exists in posts table");
    }
  });

  // 2. Tạo bảng messages nếu chưa có
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
    );
  `;

  db.query(queryMessages, (err) => {
    if (err) {
      console.error("Messages table creation error:", err);
    } else {
      console.log("✓ Messages table created or already exists");
    }
  });
};
