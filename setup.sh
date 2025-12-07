#!/bin/bash

# Script để chạy ứng dụng Fakebook

echo "🚀 Bắt đầu cài đặt ứng dụng Fakebook..."

# Kiểm tra Node.js
if ! command -v node &> /dev/null
then
    echo "❌ Node.js không được cài đặt. Vui lòng cài đặt Node.js trước."
    exit 1
fi

echo "✅ Node.js: $(node -v)"
echo "✅ npm: $(npm -v)"

# Cài đặt dependencies cho API
echo ""
echo "📦 Cài đặt dependencies cho API..."
cd api
npm install
if [ $? -ne 0 ]; then
    echo "❌ Lỗi cài đặt API dependencies"
    exit 1
fi

# Cài đặt dependencies cho Client
echo ""
echo "📦 Cài đặt dependencies cho Client..."
cd ../client
npm install
if [ $? -ne 0 ]; then
    echo "❌ Lỗi cài đặt Client dependencies"
    exit 1
fi

echo ""
echo "✅ Cài đặt hoàn tất!"
echo ""
echo "📝 Hướng dẫn tiếp theo:"
echo "1. Chắc chắn MySQL Server đang chạy"
echo "2. Tạo database theo hướng dẫn trong SETUP.md"
echo "3. Chạy lệnh: npm run dev"
echo ""
echo "🌐 Ứng dụng sẽ chạy tại:"
echo "   - API: http://localhost:8800"
echo "   - Client: http://localhost:3000"
