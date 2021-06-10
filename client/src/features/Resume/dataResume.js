export const resumeDefault = (name) => ({
  header: {
    record: 'Header',
    name: name,
    title: '',
    email: '@gmail.com',
    location: '',
    phone: '',
    link: '',
    showTitle: true,
    showPhone: true,
    showLink: true,
    showEmail: true,
    showLocation: true,
    uppercaseName: true,
    showPhoto: true,
    photoStyle: 'round',
    photo:
      'https://res.cloudinary.com/khanhk62hust/image/upload/v1623120778/l03f82piciileebout9s.png',
  },
  sections: [
    {
      record: 'AchievementSection',
      enabled: true,
      showIcons: false,
      name: 'Thành tích',
      items: [
        {
          title: '',
          description: '',
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
          title: '',
          description: '',
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
          tags: [''],
          title: 'Ngôn ngữ lập trình',
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
          record: '',
          degree: '',
          institution: '',
          location: '',
          gpa: '',
          gpaText: '',
          maxGpa: '',
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
      items: [
        {
          bullets: ['', ''],
          record: 'ExperienceItem',
          position: '',
          workplace: '',
          description: '',
          location: '',
          from: null,
          to: null,
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
          bullets: ['', ''],
          record: 'ActivityItem',
          title: '',
          location: '',
          from: null,
          to: null,
          link: '',
          description: '',
          showDescription: true,
          showBullets: false,
          showTitle: true,
          showLocation: true,
          showDateRange: true,
          showLink: false,
        },
      ],
    },
    {
      record: 'VolunteerSection',
      enabled: false,
      name: 'Hoạt động từ thiện',
      items: [
        {
          bullets: ['', ''],
          role: '',
          institution: '',
          location: '',
          from: null,
          to: null,
          description: '',
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
      items: [{ record: 'SummaryItem', text: '' }],
    },
    {
      showSlider: true,
      record: 'SkillSection',
      enabled: true,
      name: 'Kỹ năng khác',
      items: [
        {
          record: 'SkillItem',
          level: 2,
          name: '',
        },
      ],
    },
  ],
  title: 'IT CV',
  createdAt: Date.now(),
});