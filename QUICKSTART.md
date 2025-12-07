## 🚀 Hướng Dẫn Nhanh Chạy BoomSocial

### 1️⃣ Chuẩn Bị

- ✅ MySQL Server đã chạy
- ✅ Đã tạo database `social` (xem SETUP.md)

### 2️⃣ Cài Đặt (Lần Đầu Tiên)

**Windows:**

```bash
setup.bat
```

**Mac/Linux:**

```bash
chmod +x setup.sh
./setup.sh
```

**Hoặc Thủ Công:**

```bash
cd api && npm install
cd ../client && npm install
cd ..
```

### 3️⃣ Chạy Ứng Dụng

```bash
npm run dev
```

Hoặc chạy riêng biệt:

```bash
# Terminal 1
cd api && npm start

# Terminal 2
cd client && npm start
```

### 4️⃣ Truy Cập

| Component | URL                   |
| --------- | --------------------- |
| Frontend  | http://localhost:3000 |
| API       | http://localhost:8800 |

### 5️⃣ Đăng Ký Tài Khoản

1. Vào http://localhost:3000/register
2. Điền thông tin:
   - Username: `testuser`
   - Email: `test@example.com`
   - Password: `password123` (tối thiểu 8 ký tự)
   - Name: `Test User`
3. Click "Đăng kí"

### ✅ Các Tính Năng Đã Sửa

- ✅ Fixed import spacing errors (like.js, relationship.js)
- ✅ Fixed upload path (api/index.js, story.js)
- ✅ Fixed darkModeContext localStorage
- ✅ Fixed Login form (username field)
- ✅ Fixed comment parameter (desc instead of text)
- ✅ Added database error handling
- ✅ Added auto folder creation for uploads

### ❓ Gặp Vấn Đề?

1. **MySQL không kết nối**: Kiểm tra Server đang chạy
2. **CORS errors**: Kiểm tra port 3000 và 8800
3. **Upload không hoạt động**: Thư mục `api/public/upload` sẽ được tạo tự động

---

📖 **Chi tiết xem: SETUP.md**
