import photo1 from "../assets/photo1.jpg";
import cert1 from "../assets/cert1.png";
import cert2 from "../assets/cert2.png";
export type StaffType = "udirdlaga" | "bagsh";

export interface StaffArticle {
  title: string;
  category: string;
  readTime: string;
  url?: string;
}

export interface StaffCourse {
  title: string;
  image: string;
}

export interface StaffMember {
  id: string;
  name: string;
  role: string;
  type: StaffType;
  image: string;
  philosophy: string;
  experience: string;
  education: string;
  github?: string;
  skills: string[];
  courses: StaffCourse[];
  articles: StaffArticle[];
}

export const staffData: StaffMember[] = [
  {
    id: "1",
    name: "Б.Билгүүн",
    role: "Захирал",
    type: "udirdlaga",
    image:
      "https://tee.education/wp-content/uploads/2022/10/DSC0443232-min-1024x683.jpg",
    philosophy:
      "Хүүхэд бүр өөрийн онцлог, хурд, авьяастай. Боловсролын зорилго нь зөвхөн мэдлэг олгох биш, харин хүүхдийн өөртөө итгэх итгэл, бүтээлч сэтгэлгээ, багаар ажиллах чадварыг хөгжүүлэхэд оршино.",
    experience: "8 жил",
    education: "МУИС — Боловсролын удирдлага",
    github: "https://github.com/",
    skills: [
      "Leadership",
      "School Management",
      "Communication",
      "Academic Strategy",
    ],
    courses: [],
    articles: [
      {
        title: "Сурагч төвтэй сургалтын орчны ач холбогдол",
        category: "Education",
        readTime: "5 мин",
        url: "#",
      },
      {
        title: "Орчин үеийн сургалтын удирдлагын чиг хандлага",
        category: "Management",
        readTime: "7 мин",
        url: "#",
      },
    ],
  },
  {
    id: "2",
    name: "Б.Сологоо",
    role: "Багш",
    type: "bagsh",
    image: photo1,
    philosophy:
      "Хүн бүр программист болох албагүй, гэхдээ технологийн мэдлэгтэй байж, түүнийг зөв ашигласнаар амьдралд тулгардаг олон асуудлыг илүү оновчтой шийдэх боломжтой юм.",
    experience: "1 жил",
    education: "Монгол Улсын Их Сургууль, мэдээллийн технологийн инженер",
    github: "https://github.com/",
    skills: [
      "Program Design",
      "Assessment",
      "Student Progress Tracking",
      "Coordination",
    ],
    courses: [
      {
        title: "linux unhatched",
        image: cert1,
      },
      {
        title: "linux essential",
        image: cert2,
      },
    ],
    articles: [
      {
        title: "Ахицад суурилсан үнэлгээний давуу тал",
        category: "Education",
        readTime: "4 мин",
        url: "#",
      },
    ],
  },

  {
    id: "3",
    name: "Б.Сологоо",
    role: "Багш",
    type: "bagsh",
    image: photo1,
    philosophy:
      "Хүн бүр программист болох албагүй, гэхдээ технологийн мэдлэгтэй байж, түүнийг зөв ашигласнаар амьдралд тулгардаг олон асуудлыг илүү оновчтой шийдэх боломжтой юм.",
    experience: "1 жил",
    education: "Монгол Улсын Их Сургууль, мэдээллийн технологийн инженер",
    github: "https://github.com/",
    skills: [
      "Program Design",
      "Assessment",
      "Student Progress Tracking",
      "Coordination",
    ],
    courses: [
      {
        title: "linux unhatched",
        image: cert1,
      },
      {
        title: "linux essential",
        image: cert2,
      },
    ],
    articles: [
      {
        title: "Ахицад суурилсан үнэлгээний давуу тал",
        category: "Education",
        readTime: "4 мин",
        url: "#",
      },
    ],
  },

  {
    id: "4",
    name: "Б.Сологоо",
    role: "Багш",
    type: "bagsh",
    image: photo1,
    philosophy:
      "Хүн бүр программист болох албагүй, гэхдээ технологийн мэдлэгтэй байж, түүнийг зөв ашигласнаар амьдралд тулгардаг олон асуудлыг илүү оновчтой шийдэх боломжтой юм.",
    experience: "1 жил",
    education: "Монгол Улсын Их Сургууль, мэдээллийн технологийн инженер",
    github: "https://github.com/",
    skills: [
      "Program Design",
      "Assessment",
      "Student Progress Tracking",
      "Coordination",
    ],
    courses: [
      {
        title: "linux unhatched",
        image: cert1,
      },
      {
        title: "linux essential",
        image: cert2,
      },
    ],
    articles: [
      {
        title: "Ахицад суурилсан үнэлгээний давуу тал",
        category: "Education",
        readTime: "4 мин",
        url: "#",
      },
    ],
  },
  {
    id: "5",
    name: "Б.Сологоо",
    role: "Багш",
    type: "bagsh",
    image: photo1,
    philosophy:
      "Хүн бүр программист болох албагүй, гэхдээ технологийн мэдлэгтэй байж, түүнийг зөв ашигласнаар амьдралд тулгардаг олон асуудлыг илүү оновчтой шийдэх боломжтой юм.",
    experience: "1 жил",
    education: "Монгол Улсын Их Сургууль, мэдээллийн технологийн инженер",
    github: "https://github.com/",
    skills: [
      "Program Design",
      "Assessment",
      "Student Progress Tracking",
      "Coordination",
    ],
    courses: [
      {
        title: "linux unhatched",
        image: cert1,
      },
      {
        title: "linux essential",
        image: cert2,
      },
    ],
    articles: [
      {
        title: "Ахицад суурилсан үнэлгээний давуу тал",
        category: "Education",
        readTime: "4 мин",
        url: "#",
      },
    ],
  },
  {
    id: "6",
    name: "Б.Сологоо",
    role: "Багш",
    type: "bagsh",
    image: photo1,
    philosophy:
      "Хүн бүр программист болох албагүй, гэхдээ технологийн мэдлэгтэй байж, түүнийг зөв ашигласнаар амьдралд тулгардаг олон асуудлыг илүү оновчтой шийдэх боломжтой юм.",
    experience: "1 жил",
    education: "Монгол Улсын Их Сургууль, мэдээллийн технологийн инженер",
    github: "https://github.com/",
    skills: [
      "Program Design",
      "Assessment",
      "Student Progress Tracking",
      "Coordination",
    ],
    courses: [
      {
        title: "linux unhatched",
        image: cert1,
      },
      {
        title: "linux essential",
        image: cert2,
      },
    ],
    articles: [
      {
        title: "Ахицад суурилсан үнэлгээний давуу тал",
        category: "Education",
        readTime: "4 мин",
        url: "#",
      },
    ],
  },
  {
    id: "7",
    name: "Б.Сологоо",
    role: "Багш",
    type: "bagsh",
    image: photo1,
    philosophy:
      "Хүн бүр программист болох албагүй, гэхдээ технологийн мэдлэгтэй байж, түүнийг зөв ашигласнаар амьдралд тулгардаг олон асуудлыг илүү оновчтой шийдэх боломжтой юм.",
    experience: "1 жил",
    education: "Монгол Улсын Их Сургууль, мэдээллийн технологийн инженер",
    github: "https://github.com/",
    skills: [
      "Program Design",
      "Assessment",
      "Student Progress Tracking",
      "Coordination",
    ],
    courses: [
      {
        title: "linux unhatched",
        image: cert1,
      },
      {
        title: "linux essential",
        image: cert2,
      },
    ],
    articles: [
      {
        title: "Ахицад суурилсан үнэлгээний давуу тал",
        category: "Education",
        readTime: "4 мин",
        url: "#",
      },
    ],
  },
  {
    id: "8",
    name: "Б.Сологоо",
    role: "Багш",
    type: "bagsh",
    image: photo1,
    philosophy:
      "Хүн бүр программист болох албагүй, гэхдээ технологийн мэдлэгтэй байж, түүнийг зөв ашигласнаар амьдралд тулгардаг олон асуудлыг илүү оновчтой шийдэх боломжтой юм.",
    experience: "1 жил",
    education: "Монгол Улсын Их Сургууль, мэдээллийн технологийн инженер",
    github: "https://github.com/",
    skills: [
      "Program Design",
      "Assessment",
      "Student Progress Tracking",
      "Coordination",
    ],
    courses: [
      {
        title: "linux unhatched",
        image: cert1,
      },
      {
        title: "linux essential",
        image: cert2,
      },
    ],
    articles: [
      {
        title: "Ахицад суурилсан үнэлгээний давуу тал",
        category: "Education",
        readTime: "4 мин",
        url: "#",
      },
    ],
  },
  {
    id: "9",
    name: "Б.Сологоо",
    role: "Багш",
    type: "bagsh",
    image: photo1,
    philosophy:
      "Хүн бүр программист болох албагүй, гэхдээ технологийн мэдлэгтэй байж, түүнийг зөв ашигласнаар амьдралд тулгардаг олон асуудлыг илүү оновчтой шийдэх боломжтой юм.",
    experience: "1 жил",
    education: "Монгол Улсын Их Сургууль, мэдээллийн технологийн инженер",
    github: "https://github.com/",
    skills: [
      "Program Design",
      "Assessment",
      "Student Progress Tracking",
      "Coordination",
    ],
    courses: [
      {
        title: "linux unhatched",
        image: cert1,
      },
      {
        title: "linux essential",
        image: cert2,
      },
    ],
    articles: [
      {
        title: "Ахицад суурилсан үнэлгээний давуу тал",
        category: "Education",
        readTime: "4 мин",
        url: "#",
      },
    ],
  },
];
