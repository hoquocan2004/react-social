import { db } from "../connect.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const register = (req, res) => {
  // Kiểm tra xem tất cả các trường có được cung cấp không
  const { username, email, password, name } = req.body;

  if (!username || !email || !password || !name) {
    return res.status(400).json("Vui lòng điền đầy đủ thông tin.");
  }

  // Kiểm tra định dạng email hợp lệ
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json("Địa chỉ email không hợp lệ.");
  }

  // Kiểm tra độ dài mật khẩu
  if (password.length < 8) {
    return res.status(400).json("Mật khẩu phải có ít nhất 8 ký tự.");
  }

  // Kiểm tra tài khoản đã tồn tại
  const q = "SELECT * FROM users WHERE username = ?";
  db.query(q, [username], (err, data) => {
    if (err) return res.status(500).json(err);
    if (data.length) return res.status(409).json("Tài khoản đã tồn tại!");

    // Kiểm tra email đã tồn tại
    const emailCheckQuery = "SELECT * FROM users WHERE email = ?";
    db.query(emailCheckQuery, [email], (err, data) => {
      if (err) return res.status(500).json(err);
      if (data.length) return res.status(409).json("Email đã được sử dụng!");

      // Mã hóa mật khẩu
      const salt = bcrypt.genSaltSync(10);
      const hashedPassword = bcrypt.hashSync(password, salt);

      // Thực hiện thêm người dùng vào cơ sở dữ liệu
      const q =
        "INSERT INTO users (`username`, `email`, `password`, `name`) VALUES (?)";
      const values = [username, email, hashedPassword, name];

      db.query(q, [values], (err, data) => {
        if (err) return res.status(500).json(err);
        return res.status(200).json("Tạo tài khoản thành công.");
      });
    });
  });
};

export const login = (req, res) => {
  // Allow login by either username or email. Frontend may send `username` field.
  const identifier = req.body.username || req.body.email;
  const password = req.body.password;

  if (!identifier || !password) {
    return res.status(400).json("Vui lòng cung cấp tài khoản và mật khẩu.");
  }

  const q = "SELECT * FROM users WHERE username = ? OR email = ? LIMIT 1";
  db.query(q, [identifier, identifier], (err, data) => {
    if (err) return res.status(500).json(err);
    if (!data || data.length === 0)
      return res.status(404).json("Không tìm thấy người dùng");

    const user = data[0];
    const checkPassword = bcrypt.compareSync(password, user.password);

    if (!checkPassword)
      return res.status(400).json("Sai tài khoản hoặc mật khẩu!");

    const token = jwt.sign({ id: user.id }, "secretkey");

    const { password: pw, ...others } = user;
    res
      .cookie("accessToken", token, {
        httpOnly: true,
        secure: false, // Cho phép HTTP trong development
        sameSite: "lax", // Tương thích với localhost
      })
      .status(200)
      .json(others);
  });
};

export const logout = (req, res) => {
  res
    .clearCookie("accessToken", {
      httpOnly: true, // Đảm bảo cookie chỉ được gửi qua HTTP
      secure: false, // Cho phép HTTP trong development
      sameSite: "lax", // Thay đổi từ "none" để tương thích hơn
    })
    .status(200)
    .json("Đăng xuất thành công.");
};
