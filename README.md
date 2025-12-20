# event-management
Event management project backend + frontend
# 1 Chức năng mà hệ thống sỡ hữu
- Xem danh sách sự kiện
- Tìm kiếm theo tên sự kiện
- Xem chi tiết sự kiện
- Đăng ký tham gia sự kiện
- Chọn ghế ngồi khi đăng ký
- Xem lại các sự kiện đã tham gia bằng email
- Thông báo nhắc nhở
- Quản lí sự kiện
- Thông kế báo cáo
# 2 Về kiến trúc hệ thống
Frontend(ReactJS & Vite) ----Rest API---->Backend(Node.js/FastAPI) ------> Database(PostgreSQL)
# 3 Công nghệ sử dụng
Frontend
- ReactJS
- Vite
- Html/Css/javaScript
Backend
-FastAPI
-Uvicon
Database
-PostgreSQL
# 4 Cấu trúc thư mục
<img width="203" height="433" alt="image" src="https://github.com/user-attachments/assets/d6247b85-9905-41bd-9903-d484f23cf3f7" />
<img width="186" height="300" alt="image" src="https://github.com/user-attachments/assets/944a47df-a9e1-4c40-85ac-af1cfc05cffa" />

# 5 Hướng dẫn cài đặt và chạy project
-Dowload:
git clone https://github.com/hoangnam247247/event-management.git
cd event-management
# Backend
-Cày đặt thư viện
cd event-managements/backend
Cày đặt môi trường ảo: python3 -m venv venv
Khởi động môi trường ảo: source venv/bin/activate
Cài thư viện: pip install -r requirements.txt
Khởi chạy: uvicorn app.main:app --reload
# frontend
cd event-managements/frontend
npm install
Khởi chạy: npm run dev
# 6 Hướng phát triển
Xuất báo cáo
Tích hợp thanh toán
Phân quyền người dùng
....
# 7 Tác giả
Name: Trương Hoàng Nam - 23050021
Name: Trần Quốc Vinh - 23050040
Môn học: Phát triển phần miềm mã nguồn mở
Đề tài: Event Management Platform (Quản lý sự kiện)






