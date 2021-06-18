let User = {
  email: String, // email người dùng có dạng @gmail.com
  password: String, // mật khẩu người dùng
  passwordConfirm: String, // bản sao của password
  role: String, // vai trò của người dùng admin-user-company
  active: Boolean, // người dùng còn trong hệ thống
};

let Company = {
  name: String, // tên công ty
  phone: String, // số điện thoại liên hệ
  location: String, // trụ sở công ty
  position: String, // vai trò trong công ty
  type: String, // kiểu công ty: Product-Oursource
  photo: String, // ảnh công ty
  numEmployees: Number, // số lượng nhân viên
  status: String, // trạng thái công ty pending- reject - accept
  intro: String, // giới thiệu công ty
  details: String, // giới thiệu chi tiết công ty
  env: [String], // môi trường làm việc của công ty
  opportunity: [String], // cơ hội khi làm việc ở công ty
  workTime: String, // thời gian làm việc
  ot: String, // Chế độ khi làm việc Overtime
  country: String, // Quốc gia
  user: ObjectId, // Id của User chấp nhận là nhà tuyển dụng
};

let Job = {
  title: String, // Tiêu dề công việc
  salary: String, // Mức lương công việc
  location: String, // Thành phố làm việc
  type: String, // Kiểu công việc Full-time, Part-timme
  tags: [String], // Kỹ năng chính của công việc
  slugs: [String], // Kỹ năng chính của công việc được lưu dưới dạng slug
  createdAt: Date, // Thời gian tạo công việc
  to: Date, // Thời gian hết hạn ứng tuyển
  position: String, // Vị trí ứng tuyển
  company: ObjectId, // Công ty ứng tuyển
  descriptions: [String], // Mô tả công việc
  requirements: [String], // Yêu cầu công việc
};

let Apply = {
  job: ObjectId, // Việc cần tuyển dụng
  user: ObjectId, // Ứng viên ứng tuyển
  status: String, // Trạng thái ứng tuyển
  createAt: Date, // Thời gian ứng tuyển
  responseAt: Date, // Thời gian phản hồi ứng tuyển
};

const Notification = {
  user: ObjectId, // Người nhận tin nhắn
  message: String, // Tin nhắn của người gửi
};

const Resume = {
  header: {
    name: String, // tên ứng viên
    record: String, // Bản ghi - header
    title: String, // việc làm ứng tuyển
    email: String, // email ứng viên
    location: String, // địa chỉ ứng viên
    phone: Number, // số điện thoại ứng viên
    showTitle: Boolean, // hiển thị tiêu đề trong CV
    showPhone: Boolean, // hiển thị số điện thoại trong CV
    showEmail: Boolean, // hiển thị email trong CV
    showLocation: Boolean, // hiển thị vị trí trong CV
    showPhoto: Boolean, // trong ảnh ứng viên
    photo: String, // Ảnh ứng viên
  },
  sections: [
    {
      items: [
        {
          record: String, // Kỹ năng chính của ứng viên
          title: String, //  Tiêu dề kỹ năng
          showTitle: Boolean, // Hiển thị tiêu đề trong CV
          tags: [String], // kỹ năng của ứng viên
        },
      ],
    },
  ],
  title: String, // tiêu dề CV
  createdAt: Date, // thời gian tạo CV
  updatedAt: Date, // thời gian cập nhật CV
  user: ObjectId, // ứng viên
  position: String, // Vị trí ứng tuyển
  tags: [
    String, // các kỹ năng của ứng viên
  ],
};

// + userRoutes
// + applyRoutes
// + authRoutes
// + companyRoutes
// + jobRoutes
// + notificationRoutes
// + resumeRoutes
// + reviewRoutes
