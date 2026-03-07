import type { Article } from '../types/article';

export const articles: Article[] = [
  {
    id: '1',
    title: {
      mn: 'Ирээдүйн технологи: AI ба хүүхдийн боловсрол',
      en: 'Future Technology: AI and Child Education'
    },
    excerpt: {
      mn: 'Хиймэл оюун ухаан хүүхдийн сурах арга барилыг хэрхэн өөрчилж байна вэ?',
      en: 'How AI is changing the way children learn?'
    },
    content: {
      mn: 'Хиймэл оюун ухаан (AI) нь орчин үеийн боловсролын салбарт томоохон өөрчлөлтүүдийг авчирч байна. Ялангуяа хүүхдийн сурах арга барил, сэтгэлгээний хөгжилд AI-ийн нөлөө маш их байна. TEE сургалтын төвд бид хүүхдүүддээ AI-ийг зөвхөн хэрэглэх бус, түүнийг хэрхэн ажилладаг, яаж бүтээдэг талаар заадаг.',
      en: 'Artificial Intelligence (AI) is bringing significant changes to the modern education sector. Especially, the impact of AI on children\'s learning methods and cognitive development is immense. At TEE, we teach children not just how to use AI, but how it works and how to create it.'
    },
    date: '2026-03-01',
    author: {
      mn: 'Б. Номин',
      en: 'B. Nomin'
    },
    image: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&q=80&w=800',
    category: {
      mn: 'Технологи',
      en: 'Technology'
    },
    readTime: {
      mn: '5 мин',
      en: '5 min'
    },
    tags: ['AI', 'Education', 'Technology']
  },
  {
    id: '2',
    title: {
      mn: 'Роботик ба логик сэтгэлгээ',
      en: 'Robotics and Logical Thinking'
    },
    excerpt: {
      mn: 'Робот бүтээх нь хүүхдийн асуудал шийдвэрлэх чадварыг хэрхэн хөгжүүлдэг вэ?',
      en: 'How building robots develops children\'s problem-solving skills?'
    },
    content: {
      mn: 'Роботикийн хичээл нь хүүхдэд зөвхөн инженерчлэлийн мэдлэг олгохоос гадна асуудлыг олон талаас нь харж, шийдвэр гаргах чадварыг эзэмшүүлдэг. Arduino болон бусад платформууд дээр ажиллахдаа хүүхдүүд өөрсдийн санааг бодит болгож, технологийн ертөнцөд анхны алхмаа хийдэг.',
      en: 'Robotics classes not only provide children with engineering knowledge but also equip them with the ability to see problems from multiple perspectives and make decisions. By working on Arduino and other platforms, children bring their ideas to life and take their first steps into the tech world.'
    },
    date: '2026-02-15',
    author: {
      mn: 'Г. Батбаяр',
      en: 'G. Batbayar'
    },
    image: '/assets/niitlel2.png',
    category: {
      mn: 'Роботик',
      en: 'Robotics'
    },
    readTime: {
      mn: '4 мин',
      en: '4 min'
    },
    tags: ['Robotics', 'STEM', 'Education']
  },
  {
    id: '3',
    title: {
      mn: 'Код бичих нь 21-р зууны бичиг үсэг',
      en: 'Coding is the Literacy of the 21st Century'
    },
    excerpt: {
      mn: 'Яагаад хүүхэд бүрт програмчлалын анхан шатны мэдлэг хэрэгтэй вэ?',
      en: 'Why every child needs basic programming knowledge?'
    },
    content: {
      mn: 'Өнөөгийн дижитал эрин үед код бичих нь зөвхөн програм хангамжийн инженерүүдийн ажил биш болсон. Энэ нь бидний ирээдүйн хэл, сэтгэлгээний хэрэгсэл юм. Код бичиж сурснаар хүүхдүүд логик дараалал, бүтээлч байдал болон тэвчээрт суралцдаг.',
      en: 'In today\'s digital era, coding is no longer just a job for software engineers. It is the language and cognitive tool of our future. By learning to code, children learn logical sequencing, creativity, and patience.'
    },
    date: '2026-01-20',
    author: {
      mn: 'С. Сонор',
      en: 'S. Sonor'
    },
    image: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&q=80&w=800',
    category: {
      mn: 'Програмчлал',
      en: 'Programming'
    },
    readTime: {
      mn: '6 мин',
      en: '6 min'
    },
    tags: ['Coding', 'Future', 'Education']
  },
  {
    id: '4',
    title: {
      mn: 'STEM боловсролын давуу тал',
      en: 'Advantages of STEM Education'
    },
    excerpt: {
      mn: 'Шинжлэх ухаан, технологи, инженерчлэл, математикийн нэгдмэл сургалт.',
      en: 'Integrated learning of science, technology, engineering, and math.'
    },
    content: {
      mn: 'STEM боловсрол нь хүүхдийг ирээдүйн нийгэмд бэлтгэх хамгийн үр дүнтэй арга юм.',
      en: 'STEM education is the most effective way to prepare children for future society.'
    },
    date: '2026-03-05',
    author: {
      mn: 'О. Тэмүүлэн',
      en: 'O. Temuulen'
    },
    image: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&q=80&w=800',
    category: {
      mn: 'Боловсрол',
      en: 'Education'
    },
    readTime: {
      mn: '7 мин',
      en: '7 min'
    },
    tags: ['STEM', 'Education', 'Future']
  },
  {
    id: '5',
    title: {
      mn: 'Веб хөгжүүлэлтийн эхлэл',
      en: 'Introduction to Web Development'
    },
    excerpt: {
      mn: 'HTML, CSS, JavaScript-ийг хэрхэн хурдан сурах вэ?',
      en: 'How to learn HTML, CSS, and JavaScript quickly?'
    },
    content: {
      mn: 'Веб хөгжүүлэлт нь орчин үеийн хамгийн эрэлттэй чадваруудын нэг юм.',
      en: 'Web development is one of the most in-demand skills today.'
    },
    date: '2026-03-06',
    author: {
      mn: 'А. Эрдэнэ',
      en: 'A. Erdene'
    },
    image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&q=80&w=800',
    category: {
      mn: 'Програмчлал',
      en: 'Programming'
    },
    readTime: {
      mn: '10 мин',
      en: '10 min'
    },
    tags: ['Coding', 'Web', 'Technology']
  },
  {
    id: '6',
    title: {
      mn: 'Дижитал зургийн урлаг',
      en: 'Digital Art'
    },
    excerpt: {
      mn: 'Технологи ашиглан бүтээлч байдлаа илэрхийлэх нь.',
      en: 'Expressing creativity through technology.'
    },
    content: {
      mn: 'Дижитал зураг нь орчин үеийн урлагийн шинэ хэлбэр болон хөгжиж байна.',
      en: 'Digital drawing is developing as a new form of modern art.'
    },
    date: '2026-03-07',
    author: {
      mn: 'М. Ану',
      en: 'M. Anu'
    },
    image: 'https://images.unsplash.com/photo-1547658719-da2b51169166?auto=format&fit=crop&q=80&w=800',
    category: {
      mn: 'Урлаг',
      en: 'Art'
    },
    readTime: {
      mn: '4 мин',
      en: '4 min'
    },
    tags: ['Art', 'Design', 'Technology']
  }
];
