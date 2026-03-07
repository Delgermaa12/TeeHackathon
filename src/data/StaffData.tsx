import photo1 from "../assets/photo1.jpg";
import cert1 from "../assets/cert1.png";
import cert2 from "../assets/cert2.png";

export type StaffType = "udirdlaga" | "bagsh";

export interface LocalizedText {
  mn: string;
  en: string;
}

export interface StaffArticle {
  title: LocalizedText;
  category: LocalizedText;
  readTime: LocalizedText;
  url?: string;
}

export interface StaffCourse {
  title: LocalizedText;
  image: string;
}

export interface StaffMember {
  id: string;
  name: LocalizedText;
  role: LocalizedText;
  type: StaffType;
  image: string;
  philosophy: LocalizedText;
  experience: LocalizedText;
  education: LocalizedText;
  github?: string;
  skills: LocalizedText[];
  courses: StaffCourse[];
  articles: StaffArticle[];
}

export const staffData: StaffMember[] = [
  {
    id: "1",
    name: { mn: "Б.Билгүүн", en: "B. Bilguun" },
    role: { mn: "Захирал", en: "Director" },
    type: "udirdlaga",
    image: "https://tee.education/wp-content/uploads/2022/10/DSC0443232-min-1024x683.jpg",
    philosophy: {
      mn: "Хүүхэд бүр өөрийн онцлог, хурд, авьяастай. Боловсролын зорилго нь зөвхөн мэдлэг олгох биш, харин хүүхдийн өөртөө итгэх итгэл, бүтээлч сэтгэлгээ, багаар ажиллах чадварыг хөгжүүлэхэд оршино.",
      en: "Every child has unique strengths, pace, and talent. The goal of education is not only to provide knowledge, but also to develop confidence, creativity, and teamwork.",
    },
    experience: { mn: "8 жил", en: "8 years" },
    education: { mn: "Удирдлага", en: "Management" },
    github: "https://github.com/",
    skills: [
      { mn: "Манлайлал", en: "Leadership" },
      { mn: "Сургуулийн менежмент", en: "School Management" },
      { mn: "Харилцаа", en: "Communication" },
      { mn: "Академик стратеги", en: "Academic Strategy" },
    ],
    courses: [],
    articles: [
      {
        title: {
          mn: "Сурагч төвтэй сургалтын орчны ач холбогдол",
          en: "The Importance of a Student-Centered Learning Environment",
        },
        category: { mn: "Боловсрол", en: "Education" },
        readTime: { mn: "5 мин", en: "5 min" },
        url: "#",
      },
      {
        title: {
          mn: "Орчин үеийн сургалтын удирдлагын чиг хандлага",
          en: "Modern Trends in Educational Management",
        },
        category: { mn: "Менежмент", en: "Management" },
        readTime: { mn: "7 мин", en: "7 min" },
        url: "#",
      },
    ],
  },
    {
    id: "2",
    name: { mn: "Б.Билгүүн", en: "B. Bilguun" },
    role: { mn: "Захирал", en: "Director" },
    type: "udirdlaga",
    image: "https://tee.education/wp-content/uploads/2022/10/DSC0443232-min-1024x683.jpg",
    philosophy: {
      mn: "Хүүхэд бүр өөрийн онцлог, хурд, авьяастай. Боловсролын зорилго нь зөвхөн мэдлэг олгох биш, харин хүүхдийн өөртөө итгэх итгэл, бүтээлч сэтгэлгээ, багаар ажиллах чадварыг хөгжүүлэхэд оршино.",
      en: "Every child has unique strengths, pace, and talent. The goal of education is not only to provide knowledge, but also to develop confidence, creativity, and teamwork.",
    },
    experience: { mn: "8 жил", en: "8 years" },
    education: { mn: "Удирдлага", en: "Management" },
    github: "https://github.com/",
    skills: [
      { mn: "Манлайлал", en: "Leadership" },
      { mn: "Сургуулийн менежмент", en: "School Management" },
      { mn: "Харилцаа", en: "Communication" },
      { mn: "Академик стратеги", en: "Academic Strategy" },
    ],
    courses: [],
    articles: [
      {
        title: {
          mn: "Сурагч төвтэй сургалтын орчны ач холбогдол",
          en: "The Importance of a Student-Centered Learning Environment",
        },
        category: { mn: "Боловсрол", en: "Education" },
        readTime: { mn: "5 мин", en: "5 min" },
        url: "#",
      },
      {
        title: {
          mn: "Орчин үеийн сургалтын удирдлагын чиг хандлага",
          en: "Modern Trends in Educational Management",
        },
        category: { mn: "Менежмент", en: "Management" },
        readTime: { mn: "7 мин", en: "7 min" },
        url: "#",
      },
    ],
  },
    {
    id: "3",
    name: { mn: "Б.Билгүүн", en: "B. Bilguun" },
    role: { mn: "Захирал", en: "Director" },
    type: "udirdlaga",
    image: "https://tee.education/wp-content/uploads/2022/10/DSC0443232-min-1024x683.jpg",
    philosophy: {
      mn: "Хүүхэд бүр өөрийн онцлог, хурд, авьяастай. Боловсролын зорилго нь зөвхөн мэдлэг олгох биш, харин хүүхдийн өөртөө итгэх итгэл, бүтээлч сэтгэлгээ, багаар ажиллах чадварыг хөгжүүлэхэд оршино.",
      en: "Every child has unique strengths, pace, and talent. The goal of education is not only to provide knowledge, but also to develop confidence, creativity, and teamwork.",
    },
    experience: { mn: "8 жил", en: "8 years" },
    education: { mn: "Удирдлага", en: "Management" },
    github: "https://github.com/",
    skills: [
      { mn: "Манлайлал", en: "Leadership" },
      { mn: "Сургуулийн менежмент", en: "School Management" },
      { mn: "Харилцаа", en: "Communication" },
      { mn: "Академик стратеги", en: "Academic Strategy" },
    ],
    courses: [],
    articles: [
      {
        title: {
          mn: "Сурагч төвтэй сургалтын орчны ач холбогдол",
          en: "The Importance of a Student-Centered Learning Environment",
        },
        category: { mn: "Боловсрол", en: "Education" },
        readTime: { mn: "5 мин", en: "5 min" },
        url: "#",
      },
      {
        title: {
          mn: "Орчин үеийн сургалтын удирдлагын чиг хандлага",
          en: "Modern Trends in Educational Management",
        },
        category: { mn: "Менежмент", en: "Management" },
        readTime: { mn: "7 мин", en: "7 min" },
        url: "#",
      },
    ],
  },
    {
    id: "4",
    name: { mn: "Б.Билгүүн", en: "B. Bilguun" },
    role: { mn: "Захирал", en: "Director" },
    type: "udirdlaga",
    image: "https://tee.education/wp-content/uploads/2022/10/DSC0443232-min-1024x683.jpg",
    philosophy: {
      mn: "Хүүхэд бүр өөрийн онцлог, хурд, авьяастай. Боловсролын зорилго нь зөвхөн мэдлэг олгох биш, харин хүүхдийн өөртөө итгэх итгэл, бүтээлч сэтгэлгээ, багаар ажиллах чадварыг хөгжүүлэхэд оршино.",
      en: "Every child has unique strengths, pace, and talent. The goal of education is not only to provide knowledge, but also to develop confidence, creativity, and teamwork.",
    },
    experience: { mn: "8 жил", en: "8 years" },
    education: { mn: "Удирдлага", en: "Management" },
    github: "https://github.com/",
    skills: [
      { mn: "Манлайлал", en: "Leadership" },
      { mn: "Сургуулийн менежмент", en: "School Management" },
      { mn: "Харилцаа", en: "Communication" },
      { mn: "Академик стратеги", en: "Academic Strategy" },
    ],
    courses: [],
    articles: [
      {
        title: {
          mn: "Сурагч төвтэй сургалтын орчны ач холбогдол",
          en: "The Importance of a Student-Centered Learning Environment",
        },
        category: { mn: "Боловсрол", en: "Education" },
        readTime: { mn: "5 мин", en: "5 min" },
        url: "#",
      },
      {
        title: {
          mn: "Орчин үеийн сургалтын удирдлагын чиг хандлага",
          en: "Modern Trends in Educational Management",
        },
        category: { mn: "Менежмент", en: "Management" },
        readTime: { mn: "7 мин", en: "7 min" },
        url: "#",
      },
    ],
  },
  {
    id: "5",
    name: { mn: "Б.Солонгоо", en: "B. Solongoo" },
    role: { mn: "Багш", en: "Teacher" },
    type: "bagsh",
    image: photo1,
    philosophy: {
      mn: "Хүн бүр программист болох албагүй, гэхдээ технологийн мэдлэгтэй байж, түүнийг зөв ашигласнаар амьдралд тулгардаг олон асуудлыг илүү оновчтой шийдэх боломжтой юм.",
      en: "Not everyone has to become a programmer, but having technological knowledge and using it correctly helps solve many real-life problems more effectively.",
    },
    experience: { mn: "1 жил", en: "1 year" },
    education: { mn: "Мэдээллийн технологийн инженер", en: "IT Engineering" },
    github: "https://github.com/",
    skills: [
      { mn: "UI/UX дизайн", en: "UI/UX Design" },
      { mn: "Python программчлал", en: "Python Programming" },
      { mn: "Өгөгдөл шинжилгээ", en: "Data Analysis" },
      { mn: "Төслийн менежмент", en: "Project Management" },
    ],
    courses: [
      {
        title: { mn: "Linux Unhatched", en: "Linux Unhatched" },
        image: cert1,
      },
      {
        title: { mn: "Linux Essentials", en: "Linux Essentials" },
        image: cert2,
      },
    ],
    articles: [
      {
        title: { mn: "Дижитал эрх", en: "Digital Rights" },
        category: { mn: "Боловсрол", en: "Education" },
        readTime: { mn: "4 мин", en: "4 min" },
        url: "#",
      },
      {
        title: { mn: "Хүний эрх ба технологи", en: "Human Rights and Technology" },
        category: { mn: "Боловсрол", en: "Education" },
        readTime: { mn: "4 мин", en: "4 min" },
        url: "#",
      },
    ],
  },
  {
    id: "6",
    name: { mn: "Б.Солонгоо", en: "B. Solongoo" },
    role: { mn: "Багш", en: "Teacher" },
    type: "bagsh",
    image: photo1,
    philosophy: {
      mn: "Хүн бүр программист болох албагүй, гэхдээ технологийн мэдлэгтэй байж, түүнийг зөв ашигласнаар амьдралд тулгардаг олон асуудлыг илүү оновчтой шийдэх боломжтой юм.",
      en: "Not everyone has to become a programmer, but having technological knowledge and using it correctly helps solve many real-life problems more effectively.",
    },
    experience: { mn: "1 жил", en: "1 year" },
    education: { mn: "Мэдээллийн технологийн инженер", en: "IT Engineering" },
    github: "https://github.com/",
    skills: [
      { mn: "UI/UX дизайн", en: "UI/UX Design" },
      { mn: "Python программчлал", en: "Python Programming" },
      { mn: "Өгөгдөл шинжилгээ", en: "Data Analysis" },
      { mn: "Төслийн менежмент", en: "Project Management" },
    ],
    courses: [
      {
        title: { mn: "Linux Unhatched", en: "Linux Unhatched" },
        image: cert1,
      },
      {
        title: { mn: "Linux Essentials", en: "Linux Essentials" },
        image: cert2,
      },
    ],
    articles: [
      {
        title: { mn: "Дижитал эрх", en: "Digital Rights" },
        category: { mn: "Боловсрол", en: "Education" },
        readTime: { mn: "4 мин", en: "4 min" },
        url: "#",
      },
      {
        title: { mn: "Хүний эрх ба технологи", en: "Human Rights and Technology" },
        category: { mn: "Боловсрол", en: "Education" },
        readTime: { mn: "4 мин", en: "4 min" },
        url: "#",
      },
    ],
  },
{
    id: "7",
    name: { mn: "Б.Солонгоо", en: "B. Solongoo" },
    role: { mn: "Багш", en: "Teacher" },
    type: "bagsh",
    image: photo1,
    philosophy: {
      mn: "Хүн бүр программист болох албагүй, гэхдээ технологийн мэдлэгтэй байж, түүнийг зөв ашигласнаар амьдралд тулгардаг олон асуудлыг илүү оновчтой шийдэх боломжтой юм.",
      en: "Not everyone has to become a programmer, but having technological knowledge and using it correctly helps solve many real-life problems more effectively.",
    },
    experience: { mn: "1 жил", en: "1 year" },
    education: { mn: "Мэдээллийн технологийн инженер", en: "IT Engineering" },
    github: "https://github.com/",
    skills: [
      { mn: "UI/UX дизайн", en: "UI/UX Design" },
      { mn: "Python программчлал", en: "Python Programming" },
      { mn: "Өгөгдөл шинжилгээ", en: "Data Analysis" },
      { mn: "Төслийн менежмент", en: "Project Management" },
    ],
    courses: [
      {
        title: { mn: "Linux Unhatched", en: "Linux Unhatched" },
        image: cert1,
      },
      {
        title: { mn: "Linux Essentials", en: "Linux Essentials" },
        image: cert2,
      },
    ],
    articles: [
      {
        title: { mn: "Дижитал эрх", en: "Digital Rights" },
        category: { mn: "Боловсрол", en: "Education" },
        readTime: { mn: "4 мин", en: "4 min" },
        url: "#",
      },
      {
        title: { mn: "Хүний эрх ба технологи", en: "Human Rights and Technology" },
        category: { mn: "Боловсрол", en: "Education" },
        readTime: { mn: "4 мин", en: "4 min" },
        url: "#",
      },
    ],
  },
  {
    id: "8",
    name: { mn: "Б.Солонгоо", en: "B. Solongoo" },
    role: { mn: "Багш", en: "Teacher" },
    type: "bagsh",
    image: photo1,
    philosophy: {
      mn: "Хүн бүр программист болох албагүй, гэхдээ технологийн мэдлэгтэй байж, түүнийг зөв ашигласнаар амьдралд тулгардаг олон асуудлыг илүү оновчтой шийдэх боломжтой юм.",
      en: "Not everyone has to become a programmer, but having technological knowledge and using it correctly helps solve many real-life problems more effectively.",
    },
    experience: { mn: "1 жил", en: "1 year" },
    education: { mn: "Мэдээллийн технологийн инженер", en: "IT Engineering" },
    github: "https://github.com/",
    skills: [
      { mn: "UI/UX дизайн", en: "UI/UX Design" },
      { mn: "Python программчлал", en: "Python Programming" },
      { mn: "Өгөгдөл шинжилгээ", en: "Data Analysis" },
      { mn: "Төслийн менежмент", en: "Project Management" },
    ],
    courses: [
      {
        title: { mn: "Linux Unhatched", en: "Linux Unhatched" },
        image: cert1,
      },
      {
        title: { mn: "Linux Essentials", en: "Linux Essentials" },
        image: cert2,
      },
    ],
    articles: [
      {
        title: { mn: "Дижитал эрх", en: "Digital Rights" },
        category: { mn: "Боловсрол", en: "Education" },
        readTime: { mn: "4 мин", en: "4 min" },
        url: "#",
      },
      {
        title: { mn: "Хүний эрх ба технологи", en: "Human Rights and Technology" },
        category: { mn: "Боловсрол", en: "Education" },
        readTime: { mn: "4 мин", en: "4 min" },
        url: "#",
      },
    ],
  },
];
