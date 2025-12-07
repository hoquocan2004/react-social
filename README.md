# 📱 BoomSocial - Social Network Application

Một ứng dụng mạng xã hội được xây dựng bằng **Node.js**, **Express**, **React**, và **MySQL**.

## ✨ Tính Năng

- 👤 **Đăng ký/Đăng nhập** - Tạo tài khoản và đăng nhập an toàn
- 📝 **Tạo bài viết** - Chia sẻ bài viết với hình ảnh
- 💬 **Bình luận** - Bình luận trên các bài viết
- ❤️ **Like/Unlike** - Yêu thích các bài viết
- 👥 **Follow/Unfollow** - Theo dõi những người dùng khác
- 📱 **Stories** - Chia sẻ các bài viết tạm thời
- 🌙 **Dark Mode** - Giao diện sáng/tối
- 👤 **Hồ sơ cá nhân** - Quản lý thông tin cá nhân

## 🚀 Bắt Đầu

### Yêu Cầu

- **Node.js** v14+
- **MySQL** 5.7+
- **npm** hoặc **yarn**

### 1. Chạy Setup Script

**Trên Windows:**

```bash
setup.bat
```

**Trên Mac/Linux:**

```bash
chmod +x setup.sh
./setup.sh
```

### 2. Cài Đặt Database

Xem **SETUP.md** để có hướng dẫn cài đặt database MySQL chi tiết.

### 3. Chạy Ứng Dụng

```bash
npm run dev
```

## 🌐 Truy Cập Ứng Dụng

- **Client**: [http://localhost:3000](http://localhost:3000)
- **API**: [http://localhost:8800](http://localhost:8800)

## 📂 Cấu Trúc Thư Mục

```
DoAnNodejs/
├── api/                   # Backend API
├── client/                # React frontend
├── SETUP.md              # Hướng dẫn cài đặt
└── README.md             # File này
```

## 📝 Đăng Ký Tài Khoản Test

1. Vào [http://localhost:3000/register](http://localhost:3000/register)
2. Điền thông tin đăng ký
3. Click "Đăng kí"
4. Đăng nhập với tài khoản vừa tạo

## 🔐 Bảo Mật

- Mật khẩu được mã hóa bằng **bcryptjs**
- JWT tokens cho xác thực
- CORS được bật cho `http://localhost:3000`

## 📚 Công Nghệ

- **Backend**: Express.js, MySQL2, bcryptjs, JWT
- **Frontend**: React 18, React Query, Axios, Material-UI, Sass

## 🐛 Xử Lý Sự Cố

Xem **SETUP.md** để xem các vấn đề thường gặp và cách giải quyết.

---

**Chúc bạn sử dụng vui vẻ! 🎉**
