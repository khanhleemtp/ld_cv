export const dataFromServer = {
  style: {
    record: 'ResumeStyle',
    colors: ['#000000', '#008CFF'],
    layout: 'double',
    layoutSize: 'medium',
    background: null,
    fontBody: 'interui',
    fontHeading: 'rubik',
    isMetaDataDisabled: false,
    marginOption: 1,
  },
  header: {
    record: 'Header',
    name: 'Lê Đình Khánh',
    title: 'Thực tập sinh',
    email: 'khanhleemtp@gmail.com',
    location: 'HaNoi, VietNam',
    phone: '0914078960',
    link: 'https://www.facebook.com/khanh.lee.3958/',
    showTitle: true,
    showPhone: true,
    showLink: true,
    showEmail: true,
    showLocation: true,
    uppercaseName: true,
    showPhoto: true,
    photoStyle: 'round',
    photo:
      'https://enhancv.s3.amazonaws.com/avatars/3016f4f91dc4340991e6391868fa8e81e9e774a49c29ca3d28c4159604ba1d7c.jpg',
  },
  record: 'Resume',
  version: 2,
  edits: 58,
  isCoverLetter: false,
  sections: [
    {
      record: 'AchievementSection',
      enabled: true,
      showIcons: false,
      name: 'Thành tích',
      items: [
        {
          icon: '139-free-diamond-01',
          id: 'g5ncbasxy9',
          record: 'AchievementItem',
          title: 'Kỳ thi học sinh giỏi GDCD Quốc gia',
          description: 'Huy chương vàng',
          showDescription: true,
        },
        {
          icon: '139-free-diamond-01',
          id: 'kp055lmi',
          record: 'AchievementItem',
          title: 'Olympic văn Quốc gia',
          description: 'Huy chương bạc',
          showDescription: true,
        },
      ],
    },
    {
      record: 'CourseSection',
      enabled: false,
      name: 'Chứng chỉ',
      items: [
        {
          id: '73d7t15tft',
          record: 'CourseItem',
          title: 'ReactJS tutorial',
          description:
            'Hiểu được concept và cách ứng dụng Reacjs trong website',
          height: 89,
          showDescription: true,
        },
        {
          id: 'syxce0no04',
          record: 'CourseItem',
          title: 'Next Js',
          description: 'SSR dùng trong Reacjs',
          showDescription: true,
        },
        {
          id: 'izim215a',
          record: 'CourseItem',
          title: 'MongoDB',
          description: 'Hiểu về ứng dụng mongoDB xây dựng website',
          showDescription: true,
        },
      ],
    },
    {
      record: 'TechnologySection',
      enabled: true,
      name: 'Kỹ năng chính',
      surroundingBorder: false,
      items: [
        {
          tags: ['C++', 'Javascript', 'Python'],
          id: 'b4yxsv0ph2',
          record: 'TechnologyItem',
          title: 'Ngôn ngữ lập trình',
          description: '',
          showTitle: true,
        },
        {
          tags: ['NextJs', 'ReactJs', 'VueJs'],
          id: 'b4yxsv0ph3',
          record: 'TechnologyItem',
          title: 'Framework',
          description: '',
          showTitle: true,
        },
      ],
    },
    {
      record: 'EducationSection',
      enabled: false,
      name: 'Học Vấn',
      items: [
        {
          bullets: [''],
          id: 'j6572top',
          record: 'EducationItem',
          degree: 'Chuyên ngành IT-3',
          institution: 'Đại học Bách Khoa Hà Nội',
          location: 'Hà Nội',
          gpa: '2.69',
          gpaText: 'CPA',
          maxGpa: '4',
          from: '2017/8',
          to: '2021/7',
          showGpa: true,
          showLocation: true,
          showDateRange: true,
          showBullets: false,
        },
      ],
    },
    {
      record: 'ExperienceSection',
      enabled: true,
      name: 'Kinh nghiệm',
      //
      items: [
        ///
        {
          bullets: ['Xây dựng module IPFM', 'Deploy website'],
          ///
          id: 'd2ip7toaao',
          record: 'ExperienceItem',
          position: 'Thực tập sinh',
          workplace: 'MDC Software',
          description: 'Xây dựng website',
          location: 'Ha noi, Viet Nam',
          from: '2018/7',
          to: '2020/12',
          link: '',
          showTitle: true,
          showCompany: true,
          showDescription: true,
          showBullets: true,
          showLocation: true,
          showDateRange: true,
          showLink: false,
        },
      ],
    },
    {
      record: 'ActivitySection',
      enabled: true,
      name: 'Hoạt động',
      items: [
        {
          bullets: ['Cách xây dựng phần mềm', 'Quản lý dự án'],
          id: 'u6kfkzh39f',
          record: 'ActivityItem',
          title: 'Hội viên',
          location: 'Đại học Bách Khoa Hà Nội',
          from: '2021/8',
          to: '2019/7',
          link: '',
          description: 'Hội thảo IDE',
          showDescription: true,
          showBullets: true,
          showTitle: true,
          showLocation: true,
          showDateRange: true,
          showLink: false,
        },
      ],
    },
    {
      record: 'VolunteerSection',
      enabled: true,
      name: 'Hoạt động từ thiện',
      items: [
        {
          bullets: ['Dạy học', 'Xây nhà tình thương'],
          id: 'z4k0w7yvx9',
          record: 'VolunteerItem',
          role: 'Thành viên',
          institution: 'Mùa hè xanh cho em',
          location: 'Cao bằng',
          from: '2018/4',
          to: '2018/5',
          description: 'Giúp đỡ các em vùng cao',
          showDescription: true,
          showLocation: true,
          showBullets: false,
          showDateRange: true,
        },
      ],
    },
    {
      record: 'SummarySection',
      enabled: true,
      name: 'Thông tin thêm',
      items: [
        { id: 'ipfpaw489a', record: 'SummaryItem', text: '', height: 53 },
      ],
    },
    {
      showSlider: true,
      record: 'SkillSection',
      enabled: true,
      name: 'Kỹ năng khác',
      indicatorType: 'lolly',
      items: [
        {
          icon: '21-free-star',
          id: 'rbletrcq9r',
          record: 'SkillItem',
          level: 2,
          name: 'PACK OFFICE: Word, Excel, PowerPoint',
        },
        {
          icon: '21-free-star',
          id: 'ix19o207',
          record: 'SkillItem',
          level: 7,
          name: 'English',
        },
      ],
    },
  ],

  title: 'IT Intern',
  userField: '',
  duplicatedFrom: null,
  coverLetterTemplate: '',
  createdAt: '2021-05-20T18:52:54.509Z',
  updatedAt: '2021-05-22T21:49:00.356Z',
  __v: 57,
  id: '60a6b006e52510004a5ef940',
};

export const getResumeData = () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => resolve(dataFromServer), 100);
  });
};

// export const ResumeWrapper = () => {
//   const [data, setData] = useState(null);

//   useEffect(() => {
//     const fetchData = async () => {
//       setData(await getResumeData());
//     };
//     fetchData();
//   }, []);

//   return data ? <ResumeProvider data={data} /> : <div>Loading...</div>;
// };
