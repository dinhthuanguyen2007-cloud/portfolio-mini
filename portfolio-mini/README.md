# Portfolio Mini – Nguyễn Đình Thuận

## 1. Công nghệ sử dụng
- HTML5 Semantic: header, nav, main, section, footer.
- SCSS/CSS: biến, bố cục Flexbox, Grid và Media Query.
- JavaScript: DOM, Event, Form Validation.
- Fetch API: đọc dữ liệu dự án từ `data/projects.json`.
- LocalStorage: lưu giao diện sáng/tối và dự án yêu thích.
- Lazy Loading: ảnh dự án dùng `loading="lazy"`.

## 2. Cách chạy
1. Giải nén thư mục `portfolio-mini`.
2. Mở thư mục bằng Visual Studio Code.
3. Cài extension **Live Server** nếu máy chưa có.
4. Nhấn chuột phải vào `index.html` → **Open with Live Server**.
5. Không mở trực tiếp bằng cách nhấp đúp file HTML vì Fetch API có thể bị trình duyệt chặn khi dùng `file://`.

## 3. Biên dịch SCSS (không bắt buộc nếu chỉ chạy website)
Mở Terminal tại thư mục dự án và chạy:
```bash
sass scss/main.scss css/style.css
```
Nếu máy Windows đang dùng lệnh `sass.cmd`:
```powershell
sass.cmd scss/main.scss css/style.css
```
File `css/style.css` đã được chuẩn bị sẵn để website chạy ngay.

## 4. Kiểm tra các yêu cầu
- Menu: thu nhỏ cửa sổ hoặc mở trên điện thoại, bấm nút ☰.
- Theme: bấm nút Giao diện, tải lại trang để kiểm tra LocalStorage.
- Dự án: mở DevTools → Network, tải lại trang và xem `projects.json`.
- Yêu thích: bấm nút Yêu thích ở dự án, tải lại trang để kiểm tra trạng thái.
- Form: thử bỏ trống, nhập email sai, nội dung dưới 10 ký tự rồi sửa lại.
- Lazy loading: kiểm tra thuộc tính `loading="lazy"` trong phần tử ảnh dự án.

## 5. Lưu ý
Form liên hệ hiện chỉ kiểm tra dữ liệu ở trình duyệt, chưa gửi email hoặc lưu lên máy chủ. Dữ liệu dự án là JSON tĩnh trong thư mục `data`.
