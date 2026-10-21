Trạng thái: quy tắc kỹ thuật; frontend có prototype, backend chưa triển khai.

# Quy tắc Git và PR

Dùng các quyết định đã chốt khi làm việc với nhánh, commit, PR và phát hành.

## Nhánh và quyền thao tác

Giữ mọi chức năng mới hoặc sửa lỗi trên nhánh riêng.

- Tạo nhánh mới từ nhánh chính cho mọi chức năng mới hoặc sửa lỗi, dù nhỏ.
- Không commit trực tiếp vào nhánh chính.
- Không commit cục bộ trên nhánh mới trước khi Product Owner review; giữ thay đổi chưa commit để review.
- Chỉ merge vào nhánh chính sau khi PR được review và Product Owner đồng ý.
- Không tự merge hoặc tự đóng PR.
- Không tự push, kể cả nhánh mới, khi tác vụ hiện tại chưa yêu cầu rõ.
- Chỉ push khi Product Owner nói rõ trong tác vụ đó; quyền push chỉ có hiệu lực cho lần ấy.

## Tên nhánh và commit

Tra [Naming](naming.md#4-git) cho mẫu tên nhánh, commit và tag đã chốt.

## Nội dung PR

Tra [AGENTS.md](../../AGENTS.md#commit--pull-request-guidelines) cho nội dung PR đã quy định.

- Nêu rủi ro, TODO và bước kiểm tra thủ công khi có.

## Điều kiện merge

Giữ bước review và đồng ý của Product Owner trước mọi lần merge.

- Chỉ merge khi CI liên quan chạy đạt, không còn comment review chặn merge và PR không xung đột.

## Tag và phát hành

Tra [Naming](naming.md#4-git) cho mẫu tên tag đã chốt.

- Chỉ tạo tag hoặc phát hành sau khi merge và khi Product Owner yêu cầu rõ.
- Không tự tạo hoặc push tag khi chưa có yêu cầu phát hành trong tác vụ đó.
