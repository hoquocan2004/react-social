#!/bin/bash

# Script to run database migration for video feature
# This adds the video column to the posts table

echo "======================================"
echo "Database Migration - Adding Video Support"
echo "======================================"

cd "$(dirname "$0")"

# Check if node_modules exists
if [ ! -d "node_modules" ]; then
    echo "Installing dependencies..."
    npm install
fi

# Create a temporary Node.js script to run migrations
cat > run_migration.js << 'EOF'
import { db } from "./api/connect.js";

// Kiểm tra và thêm cột video vào bảng posts nếu chưa có
const query = `
  ALTER TABLE posts 
  ADD COLUMN IF NOT EXISTS video VARCHAR(255) DEFAULT NULL
`;

db.query(query, (err, results) => {
  if (err) {
    if (err.code === "ER_DUP_FIELDNAME") {
      console.log("✓ Video column already exists in posts table");
    } else {
      console.error("❌ Migration error:", err);
    }
  } else {
    console.log("✓ Migration completed: video column added to posts table");
  }
  
  // Close connection and exit
  db.end(() => {
    process.exit(0);
  });
});
EOF

# Run the migration
node run_migration.js

# Cleanup
rm -f run_migration.js

echo "======================================"
echo "Migration completed!"
echo "======================================"
