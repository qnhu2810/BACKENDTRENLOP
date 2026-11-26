
# BÀI TẬP THỰC HÀNH BACKEND

## 1. Thông tin sinh viên

- Họ và tên: Hà Quỳnh Như
- MSSV: 31241026992
- Trường: Đại học Kinh tế Thành phố Hồ Chí Minh (UEH)
- Chuyên ngành: Thương mại điện tử
- Môn học: Phát triển ứng dụng WEB/TMĐT
- Giảng viên: TS. Nguyễn Mạnh Tuấn

## 2. Nội dung bài thực hành

### Bài 1: CSS Transform, Transition và Animation

Thực hành xây dựng giao diện và tạo hiệu ứng chuyển động bằng CSS.

Các nội dung thực hiện:

- CSS Transform: biến đổi hình dạng phần tử.
- CSS Filter: tạo hiệu ứng hình ảnh.
- CSS Transition: tạo hiệu ứng chuyển đổi trạng thái.
- CSS Animation: xây dựng hiệu ứng chuyển động.
- Sử dụng thư viện Hover.css và Animate.css.

[Xem giao diện Bài 1](https://qnhu2810.github.io/BACKENDTRENLOP/Bai1.html)

[Xem mã nguồn Bài 1](./Bai1.html)

### Bài 2: Xây dựng HTTP Server bằng Node.js

Thực hành xây dựng máy chủ HTTP cơ bản bằng Node.js.

Các nội dung thực hiện:

- Sử dụng module HTTP.
- Khởi tạo HTTP Server.
- Tiếp nhận yêu cầu từ trình duyệt.
- Trả về nội dung phản hồi.
- Thiết lập máy chủ hoạt động tại cổng 8080.

[Xem mã nguồn Bài 2](./Bai2.js)

### Bài 3: TaskFlow - Website quản lý công việc cá nhân

TaskFlow là ứng dụng quản lý công việc cá nhân, hỗ trợ người dùng lập kế hoạch, quản lý thông tin công việc và theo dõi tiến độ hoàn thành.

Website được thiết kế theo phong cách Modern Productivity Dashboard với tông màu Forest Green và Matcha, kết hợp font chữ Be Vietnam Pro nhằm tạo giao diện hiện đại, trực quan và chuyên nghiệp.

**Thông điệp: Plan better. Achieve more.**

[Xem giao diện website TaskFlow](https://qnhu2810.github.io/BACKENDTRENLOP/TODOLIST/index.html)

[Xem mã nguồn TaskFlow](./TODOLIST/)

## 3. Các chức năng của TaskFlow

| STT | Chức năng | Mô tả |
|---|---|---|
| 1 | Thêm công việc | Tạo công việc mới với đầy đủ thông tin |
| 2 | Xem công việc | Hiển thị danh sách công việc |
| 3 | Chỉnh sửa | Cập nhật tên, mô tả, thời hạn và mức độ ưu tiên |
| 4 | Xóa công việc | Xóa công việc không còn cần thiết |
| 5 | Cập nhật trạng thái | Chưa thực hiện, đang thực hiện và hoàn thành |
| 6 | Tìm kiếm | Tìm kiếm công việc theo tên |
| 7 | Bộ lọc | Lọc công việc theo trạng thái |
| 8 | Thống kê | Thống kê số lượng công việc theo từng trạng thái |
| 9 | Theo dõi tiến độ | Tính tỷ lệ phần trăm công việc hoàn thành |
| 10 | Lưu trữ dữ liệu | Lưu thông tin công việc bằng SQLite |
| 11 | Responsive | Tương thích với máy tính và điện thoại |

## 4. Công nghệ sử dụng

| Công nghệ | Vai trò |
|---|---|
| HTML5 | Xây dựng cấu trúc website |
| CSS3 | Thiết kế giao diện và hiệu ứng |
| JavaScript | Xử lý tương tác và logic nghiệp vụ |
| Node.js | Môi trường thực thi Backend |
| Express.js | Xây dựng RESTful API |
| SQLite | Lưu trữ và quản lý dữ liệu |
| Font Awesome | Cung cấp biểu tượng giao diện |
| Google Fonts | Cung cấp font chữ Be Vietnam Pro |
| GitHub | Quản lý và lưu trữ mã nguồn |
| GitHub Pages | Triển khai giao diện website tĩnh |

## 5. Cấu trúc thư mục

    BACKENDTRENLOP/
    ├── Bai1.html
    ├── Bai2.js
    ├── README.md
    └── TODOLIST/
        ├── index.html
        ├── style.css
        ├── script.js
        ├── server.js
        └── package.json

## 6. Các API được xây dựng

| Method | Endpoint | Chức năng |
|---|---|---|
| GET | /api/tasks | Lấy danh sách công việc |
| POST | /api/tasks | Thêm công việc mới |
| PUT | /api/tasks/:id | Cập nhật thông tin công việc |
| PATCH | /api/tasks/:id/status | Cập nhật trạng thái |
| DELETE | /api/tasks/:id | Xóa công việc |
| GET | /api/statistics | Thống kê công việc |

## 7. Hướng dẫn chạy ứng dụng

Yêu cầu: Máy tính đã cài đặt Node.js và npm.

Bước 1: Tải mã nguồn từ GitHub.

Bước 2: Mở thư mục TODOLIST trong Visual Studio Code.

Bước 3: Cài đặt các thư viện cần thiết.

    npm install

Bước 4: Khởi động máy chủ.

    npm start

Bước 5: Truy cập website tại:

    http://localhost:8080

Cơ sở dữ liệu todo.db sẽ được tự động tạo khi máy chủ khởi động.

**Lưu ý:** GitHub Pages chỉ hỗ trợ hiển thị giao diện tĩnh. Để sử dụng đầy đủ các chức năng CRUD và cơ sở dữ liệu SQLite, cần chạy Backend bằng Node.js.

## 8. Kiến thức đạt được

Thông qua bài thực hành, sinh viên có thể:

- Hiểu nguyên lý hoạt động của Client và Server.
- Xây dựng HTTP Server bằng Node.js.
- Thiết kế giao diện website bằng HTML, CSS và JavaScript.
- Xây dựng các API thực hiện thao tác CRUD.
- Kết nối Backend với cơ sở dữ liệu SQLite.
- Xử lý dữ liệu giữa Frontend và Backend.
- Xây dựng chức năng thống kê và theo dõi tiến độ.
- Quản lý mã nguồn bằng GitHub.

## 9. Tự đánh giá

Bài thực hành đã xây dựng mã nguồn website quản lý công việc cá nhân với các chức năng thêm, sửa, xóa, cập nhật trạng thái, tìm kiếm, lọc và thống kê.

Giao diện được cải tiến theo phong cách dashboard hiện đại, sử dụng màu sắc đồng nhất, biểu tượng trực quan, thanh điều hướng và hiệu ứng chuyển động.

Hướng phát triển tiếp theo là kiểm thử đầy đủ các chức năng Backend, bổ sung đăng nhập, phân quyền người dùng, thông báo thời hạn và triển khai ứng dụng trên môi trường hosting hỗ trợ Node.js.

---

**TaskFlow - Make every day meaningful.**

© 2026 Hà Quỳnh Như | UEH
