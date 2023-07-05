import React from 'react';

const PRDPage = () => {
    return (
        <div className="container">
            <div className="card">
                <div className="card-body">
                    <h1 className="card-title">Product Requirements Document: Individual Book Management System</h1>
                    <div className="card-text">
                        <h3 className="section-title">1. Introduction</h3>
                        <p>
                            The Individual Book Management System là một ứng dụng web cho phép người dùng quản lý
                            bộ sưu tập sách cá nhân của mình. Hệ thống sẽ cung cấp cho người dùng các tính năng
                            như đăng ký người dùng, xác thực, quản lý danh mục sách và chức năng đánh giá. Ứng dụng
                            sẽ được xây dựng bằng Node.js, Express và PostgreSQL để xây dựng máy chủ và API, và
                            React.js cho giao diện người dùng.
                        </p>

                        <h3 className="section-title">2. User Management</h3>
                        <p>
                            Hệ thống sẽ có một thành phần quản lý người dùng để xử lý việc đăng ký người dùng,
                            đăng nhập và xác thực. Các yêu cầu sau đây nên được đáp ứng:</p>

                        <li>Người dùng có thể đăng ký bằng cách cung cấp tên người dùng, email và mật khẩu duy nhất.</li>
                        <li>Mật khẩu phải được mã hóa một cách an toàn trước khi lưu trữ vào cơ sở dữ liệu.</li>
                        <li>Người dùng có thể đăng nhập bằng thông tin đăng nhập đã đăng ký của họ.</li>
                        <li>Xác thực nên được thực hiện để xác minh danh tính người dùng.</li>
                        <h3 className="section-title">3. Database Design</h3>
                        <p>
                            Hệ thống sẽ bao gồm hai cơ sở dữ liệu chính: users và books.
                            Cấu trúc của mỗi cơ sở dữ liệu nên tuân thủ các thông số kỹ thuật sau:</p>

                        <h5 className="sub-section-title">Users Database</h5>
                        <li>ID Người dùng (integer): Định danh duy nhất cho mỗi người dùng.</li>
                        <li>Tên người dùng (string): Tên người dùng do người dùng lựa chọn.</li>
                        <li>Email (string): Địa chỉ email của người dùng.</li>
                        <li>Mật khẩu (string): Mật khẩu được mã hóa một cách an toàn.</li>

                        <h5 className="sub-section-title">Books Database</h5>
                        <li>Book ID (number): Định danh duy nhất cho mỗi cuốn sách.</li>
                        <li>User ID (integer): Khóa ngoại liên kết mỗi cuốn sách với chủ sở hữu tương ứng.</li>
                        <li>Title (string): Tiêu đề của cuốn sách.</li>
                        <li>Author (string): Tác giả của cuốn sách.</li>
                        <li>Review (string): Nhận xét hoặc ý kiến của người dùng về cuốn sách.</li>

                        <h3 className="section-title">4. API Endpoints</h3>
                        <p>
                            Hệ thống sẽ cung cấp các điểm cuối API để thực hiện các hoạt động CRUD (Tạo, Đọc, Cập nhật, Xóa)
                            trên cơ sở dữ liệu sách. Các điểm cuối API sau đây nên được triển khai:</p>
                        <h5 className="sub-section-title">User Management Endpoints</h5>
                        <li>/auth/register (POST): Đăng ký người dùng mới với tên người dùng, email và mật khẩu đã cung cấp.</li>
                        <li>/auth/login (POST): Xác thực và đăng nhập người dùng bằng thông tin đăng nhập đã cung cấp.</li>

                        <h5 className="sub-section-title">Book Management Endpoints</h5>
                        <li>/api/v1/books (GET): Lấy tất cả các cuốn sách trong cơ sở dữ liệu của người dùng đang đăng nhập.</li>
                        <li>/api/v1/books/:id (GET): Lấy một cuốn sách cụ thể bằng ID của nó.</li>
                        <li>/api/v1/books (POST): Thêm một cuốn sách mới vào cơ sở dữ liệu với tiêu đề, tác giả và đánh giá đã cung cấp.</li>
                        <li>/api/v1/books/:id (PUT): Cập nhật thông tin (tiêu đề, tác giả, đánh giá) của một cuốn sách cụ thể.</li>
                        <li>/api/v1/books/:id (DELETE): Xóa một cuốn sách cụ thể khỏi cơ sở dữ liệu.</li>

                        <h3 className="section-title">5. User Interface (UI)</h3>
                        <p>Giao diện người dùng sẽ được phát triển bằng React.js, cung cấp một trải nghiệm mượt mà cho
                            người dùng tương tác với hệ thống. Giao diện người dùng nên bao gồm các thành phần sau:</p>
                        <li>Biểu mẫu đăng ký: Người dùng có thể đăng ký bằng cách cung cấp tên người dùng, email và mật khẩu.</li>
                        <li>Biểu mẫu đăng nhập: Người dùng có thể đăng nhập bằng thông tin đăng nhập đã đăng ký.</li>
                        <li>Hiển thị danh mục sách: Người dùng có thể xem bộ sưu tập sách của mình, bao gồm chi tiết sách và nhận xét.</li>
                        <li>Biểu mẫu thêm sách: Người dùng có thể thêm sách mới vào bộ sưu tập bằng cách cung cấp tiêu đề sách, tác giả và nhận xét.</li>
                        <li>Biểu mẫu chỉnh sửa sách: Người dùng có thể chỉnh sửa thông tin (tiêu đề, tác giả, nhận xét) của một cuốn sách đã tồn tại.</li>
                        <li>Chức năng xóa sách: Người dùng có thể xóa một cuốn sách khỏi bộ sưu tập.</li>

                        <h3 className="section-title">6. Security</h3>
                        <p>Để đảm bảo an toàn thông tin người dùng và ngăn chặn truy cập trái phép, các biện pháp sau nên được triển khai:</p>

                        <li>Mật khẩu nên được mã hóa an toàn bằng cách sử dụng thuật toán băm mạnh.</li>
                        <li>Xác thực người dùng nên được thực hiện bằng cách sử dụng phiên, token hoặc JWT (JSON Web Tokens).</li>
                        <li>Kiểm tra và làm sạch dữ liệu người dùng cung cấp nên được thực hiện để ngăn ngừa các lỗ hổng bảo mật thông thường.</li>

                        <h3 className="section-title"> 7. Deployment and Hosting</h3>
                        <p>Ứng dụng nên được triển khai và lưu trữ đúng cách trên một máy chủ hoặc nền tảng đám mây
                            để người dùng có thể truy cập. Cần xem xét về khả năng mở rộng, hiệu suất và bảo mật.</p>

                        <h3 className="section-title">8. Future Enhancements</h3>
                        <p>Các tính năng sau đây có thể được xem xét cho việc phát triển và mở rộng hệ thống trong tương lai:</p>

                        <li>Chức năng tìm kiếm: Người dùng có thể tìm kiếm sách dựa trên tiêu đề, tác giả hoặc các tiêu chí khác.</li>
                        <li>Tùy chọn sắp xếp và lọc cho danh mục sách.</li>
                        <li>Quản lý hồ sơ người dùng: Cho phép người dùng cập nhật thông tin hồ sơ của họ.</li>
                        <li>Các tính năng xã hội: Triển khai chia sẻ hoặc chức năng gợi ý giữa người dùng.</li>
                        <li>Tích hợp với các API bên ngoài hoặc cơ sở dữ liệu sách để tự động lấy thông tin sách.</li>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PRDPage;
