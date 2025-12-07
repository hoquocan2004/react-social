# Hướng dẫn chạy ứng dụng BoomSocial

## Yêu cầu

- Node.js (v14 hoặc cao hơn)
- MySQL Server
- npm hoặc yarn

## 1. Cài đặt Database

### Tạo database MySQL:

```sql
CREATE DATABASE social;
USE social;

-- Tạo bảng users
CREATE TABLE users (
  id INT PRIMARY KEY AUTO_INCREMENT,
  username VARCHAR(255) UNIQUE NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  name VARCHAR(255),
  city VARCHAR(255),
  website VARCHAR(255),
  profilePic VARCHAR(255),
  coverPic VARCHAR(255),
  createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tạo bảng posts
CREATE TABLE posts (
  id INT PRIMARY KEY AUTO_INCREMENT,
  desc VARCHAR(500),
  img VARCHAR(255),
  userId INT,
  createAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (userId) REFERENCES users(id) ON DELETE CASCADE
);

-- Tạo bảng comments
CREATE TABLE comments (
  id INT PRIMARY KEY AUTO_INCREMENT,
  desc VARCHAR(500),
  createAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  userId INT,
  postId INT,
  FOREIGN KEY (userId) REFERENCES users(id) ON DELETE CASCADE,
  FOREIGN KEY (postId) REFERENCES posts(id) ON DELETE CASCADE
);

-- Tạo bảng likes
CREATE TABLE likes (
  id INT PRIMARY KEY AUTO_INCREMENT,
  userId INT,
  postId INT,
  FOREIGN KEY (userId) REFERENCES users(id) ON DELETE CASCADE,
  FOREIGN KEY (postId) REFERENCES posts(id) ON DELETE CASCADE
);

-- Tạo bảng relationships (followers)
CREATE TABLE relationships (
  id INT PRIMARY KEY AUTO_INCREMENT,
  followerUserId INT,
  followedUserId INT,
  FOREIGN KEY (followerUserId) REFERENCES users(id) ON DELETE CASCADE,
  FOREIGN KEY (followedUserId) REFERENCES users(id) ON DELETE CASCADE
);

-- Tạo bảng stories
CREATE TABLE stories (
  id INT PRIMARY KEY AUTO_INCREMENT,
  img VARCHAR(255),
  createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  userId INT,
  FOREIGN KEY (userId) REFERENCES users(id) ON DELETE CASCADE
);
```

## 2. Cài đặt API Server

```bash
cd api
npm install
```

**Kiểm tra file `connect.js`** để đảm bảo thông tin database:

- host: localhost
- user: root
- password: Hoang7720@
- database: social

Nếu khác, hãy cập nhật thông tin phù hợp.

### Chạy API Server

```bash
npm start
```

API sẽ chạy tại: `http://localhost:8800`

## 3. Cài đặt Client

```bash
cd ../client
npm install
```

### Chạy Client

```bash
npm start
```

Client sẽ chạy tại: `http://localhost:3000`

## 4. Chạy cả API và Client cùng lúc

Từ thư mục gốc (DoAnNodejs):

```bash
npm run dev
```

## Các vấn đề thường gặp

### 1. Lỗi kết nối database

- Kiểm tra MySQL server đang chạy
- Kiểm tra thông tin kết nối trong `api/connect.js`
- Kiểm tra database `social` đã được tạo

### 2. Lỗi port đã được sử dụng

- API dùng port 8800
- Client dùng port 3000
- Thay đổi port trong file nếu cần

### 3. CORS errors

- Kiểm tra CORS được bật trong `api/index.js`
- Đảm bảo client chạy trên `http://localhost:3000`

### 4. Lỗi upload file

- Kiểm tra thư mục `api/public/upload` tồn tại
- Nếu không, nó sẽ được tạo tự động khi server chạy

## Tài khoản test

Đăng ký tài khoản mới hoặc sử dụng:

- Username: `testuser`
- Password: `password123`

## Các tính năng

- ✅ Đăng ký/Đăng nhập
- ✅ Tạo bài viết
- ✅ Bình luận
- ✅ Like/Unlike
- ✅ Follow/Unfollow
- ✅ Stories
- ✅ Dark Mode
- ✅ Cập nhật hồ sơ

## Cấu trúc thư mục

```
DoAnNodejs/
├── api/
│   ├── controllers/
│   ├── routes/
│   ├── connect.js
│   ├── index.js
│   └── package.json
├── client/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── context/
│   │   └── App.js
│   └── package.json
└── package.json
```

## Liên hệ

Nếu có vấn đề, vui lòng kiểm tra console trong DevTools hoặc terminal.
