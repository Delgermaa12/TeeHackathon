import type { Program, Training, Teacher, Article, Request, Appreciation, Lesson, StudentProject } from '../types/admin';
import photo1 from '../assets/photo1.jpg';
import cert1 from '../assets/cert1.png';
import cert2 from '../assets/cert2.png';

export const mockPrograms: Program[] = [
    {
        id: 'p1',
        title: 'Ухаалаг Боловсрол - Анхан шат',
        category: 'bogino',
        level: 'Анхан шат',
        duration: '12 долоо хоног',
        trainingsCount: 5,
        teachersCount: 3,
        status: 'active',
        featured: true,
        createdAt: '2026-01-15T08:00:00Z',
        updatedAt: '2026-02-20T10:30:00Z',
        description: 'Хүүхэд залууст зориулсан програмчлалын үндсэн ойлголтуудыг олгох цогц хөтөлбөр.',
        price: '450,000₮',
        icon: 'fa-code',
        color: 'from-blue-400 to-indigo-600',
        tagColor: 'bg-blue-500',
        ageGroup: '8-12 нас'
    },
    {
        id: 'p2',
        title: 'Ахисан түвшний Робототехник',
        category: 'zuslaan',
        level: 'Ахисан шат',
        duration: '16 долоо хоног',
        trainingsCount: 2,
        teachersCount: 2,
        status: 'active',
        createdAt: '2025-11-10T09:15:00Z',
        updatedAt: '2026-01-05T14:20:00Z',
        price: '650,000₮',
        icon: 'fa-bolt',
        color: 'from-orange-400 to-red-500',
        tagColor: 'bg-orange-500',
        ageGroup: '13-16 нас'
    },
    {
        id: 'p3',
        title: '3 дугаар ангийн хөтөлбөр',
        category: 'bogino',
        level: 'Анхан шат',
        duration: '9 сар',
        trainingsCount: 0,
        teachersCount: 0,
        status: 'active',
        featured: true,
        createdAt: '2026-03-01T11:00:00Z',
        updatedAt: '2026-03-05T16:45:00Z',
        price: '450,000₮',
        icon: 'fa-book-open',
        color: 'from-blue-400 to-indigo-600',
        tagColor: 'bg-blue-500',
        ageGroup: '8-9 нас',
        description: 'Компьютерын үндэс, алгоритм, програмчлалын анхан шатыг сурах'
    },
    {
        id: 'p4',
        title: '4 дүгээр ангийн хөтөлбөр',
        category: 'bogino',
        level: 'Анхан шат',
        duration: '9 сар',
        trainingsCount: 0,
        teachersCount: 0,
        status: 'active',
        createdAt: '2026-03-01T11:00:00Z',
        updatedAt: '2026-03-05T16:45:00Z',
        price: '450,000₮',
        icon: 'fa-code',
        color: 'from-purple-400 to-violet-600',
        tagColor: 'bg-purple-500',
        ageGroup: '9-10 нас',
        description: 'Python програмчлал, логик сэтгэлгээг хөгжүүлэх'
    },
    {
        id: 'p5',
        title: '5-р ангийн хөтөлбөр',
        category: 'bogino',
        level: 'суурь шат',
        duration: '9 сар',
        trainingsCount: 0,
        teachersCount: 0,
        status: 'active',
        createdAt: '2026-03-01T11:00:00Z',
        updatedAt: '2026-03-05T16:45:00Z',
        price: '450,000₮',
        icon: 'fa-globe',
        color: 'from-cyan-400 to-blue-500',
        tagColor: 'bg-cyan-500',
        ageGroup: '10-11 нас',
        description: 'Вэб хөгжүүлэлт, HTML, CSS, JavaScript сурах'
    },
    {
        id: 'p6',
        title: '6-р ангийн хөтөлбөр',
        category: 'bogino',
        level: 'Дунд шат',
        duration: '9 сар',
        trainingsCount: 0,
        teachersCount: 0,
        status: 'active',
        createdAt: '2026-03-01T11:00:00Z',
        updatedAt: '2026-03-05T16:45:00Z',
        price: '500,000₮',
        icon: 'fa-palette',
        color: 'from-red-400 to-orange-500',
        tagColor: 'bg-red-500',
        ageGroup: '11-12 нас',
        description: 'Дизайн ба UI/UX үндэс, бүтээлч сэтгэлгээ'
    },
    {
        id: 'p7',
        title: '7-р ангийн хөтөлбөр',
        category: 'bogino',
        level: 'Дунд шат',
        duration: '9 сар',
        trainingsCount: 0,
        teachersCount: 0,
        status: 'active',
        createdAt: '2026-03-01T11:00:00Z',
        updatedAt: '2026-03-05T16:45:00Z',
        price: '500,000₮',
        icon: 'fa-mobile',
        color: 'from-blue-500 to-emerald-500',
        tagColor: 'bg-blue-500',
        ageGroup: '12-13 нас',
        description: 'Мобайл хэрэгслэлийн хөгжүүлэлт ба дизайн'
    },
    {
        id: 'p8',
        title: '8-р ангийн хөтөлбөр',
        category: 'bogino',
        level: 'Ахисан шат',
        duration: '9 сар',
        trainingsCount: 0,
        teachersCount: 0,
        status: 'active',
        createdAt: '2026-03-01T11:00:00Z',
        updatedAt: '2026-03-05T16:45:00Z',
        price: '550,000₮',
        icon: 'fa-brain',
        color: 'from-indigo-500 to-purple-600',
        tagColor: 'bg-indigo-500',
        ageGroup: '13-14 нас',
        description: 'Өндөрлөг програмчлал, өгөгдлийн бүтэц'
    },
    {
        id: 'p9',
        title: '9-р ангийн хөтөлбөр',
        category: 'bogino',
        level: 'Ахисан шат',
        duration: '9 сар',
        trainingsCount: 0,
        teachersCount: 0,
        status: 'active',
        createdAt: '2026-03-01T11:00:00Z',
        updatedAt: '2026-03-05T16:45:00Z',
        price: '550,000₮',
        icon: 'fa-zap',
        color: 'from-orange-500 to-yellow-500',
        tagColor: 'bg-orange-500',
        ageGroup: '14-15 нас',
        description: 'AI, машин сургалт ба системүүдийн зарчим'
    }
];

export const mockTrainings: Training[] = [
    {
        id: 'tr1',
        title: 'Хөтөлбөр 1: Вэб хөгжүүлэлтийн эхлэл',
        programId: 'p1',
        teacherId: 't1',
        format: 'offline',
        startDate: '2026-04-01',
        endDate: '2026-06-25',
        capacity: 20,
        enrolledCount: 15,
        status: 'active',
        createdAt: '2026-02-15T10:00:00Z',
        updatedAt: '2026-03-02T09:30:00Z',
    },
    {
        id: 'tr2',
        title: 'Python Программчлал (Цахим)',
        programId: 'p1',
        teacherId: 't2',
        format: 'online',
        startDate: '2026-03-15',
        endDate: '2026-05-15',
        capacity: 50,
        enrolledCount: 48,
        status: 'active',
        createdAt: '2026-01-20T14:00:00Z',
        updatedAt: '2026-03-01T11:15:00Z',
    },
    {
        id: 'tr3',
        title: 'Робот угсрах практик - Хавар',
        programId: 'p2',
        teacherId: 't3',
        format: 'hybrid',
        startDate: '2026-05-10',
        endDate: '2026-08-30',
        capacity: 15,
        enrolledCount: 5,
        status: 'pending',
        createdAt: '2026-03-05T08:30:00Z',
        updatedAt: '2026-03-06T15:20:00Z',
    }
];

export const mockTeachers: Teacher[] = [
    {
        id: '1',
        name: 'Б.Билгүүн',
        avatar: 'https://tee.education/wp-content/uploads/2022/10/DSC0443232-min-1024x683.jpg',
        specialization: 'Захирал',
        email: 'bilguun@teeeducation.mn',
        phone: '99112233',
        activeTrainingsCount: 0,
        status: 'active',
        experience: '7 жил',
        education: 'Электроникийн инженер',
        philosophy: 'Хүүхэд бүр өөрийн онцлог, хурд, авьяастай. Боловсролын зорилго нь зөвхөн мэдлэг олгох биш, харин хүүхдийн өөртөө итгэх итгэл, бүтээлч сэтгэлгээ, багаар ажиллах чадварыг хөгжүүлэхэд оршино.',
        github: 'https://github.com/bilguun',
        type: 'udirdlaga',
        skills: ['Манлайлал', 'Сургуулийн менежмент', 'Харилцаа', 'Академик стратеги'],
        certificates: [
            { title: 'Linux Unhatched', image: cert1 },
            { title: 'Linux Essentials', image: cert2 }
        ],
        socialLinks: [{ platform: 'linkedin', url: 'https://linkedin.com' }],
        createdAt: '2022-10-10T09:00:00Z',
        updatedAt: '2026-01-15T10:30:00Z',
    },
    {
        id: '5',
        name: 'Б.Солонгоо',
        avatar: photo1,
        specialization: 'Багш',
        email: 'solongoo@teeeducation.mn',
        phone: '88997766',
        activeTrainingsCount: 2,
        status: 'active',
        experience: '1 жил',
        education: 'Мэдээллийн технологийн инженер',
        philosophy: 'Хүн бүр программист болох албагүй, гэхдээ технологийн мэдлэгтэй байж, түүнийг зөв ашигласнаар амьдралд тулгардаг олон асуудлыг илүү оновчтой шийдэх боломжтой юм.',
        github: 'https://github.com/solongoo',
        type: 'bagsh',
        skills: ['UI/UX дизайн', 'Python программчлал', 'Өгөгдөл шинжилгээ', 'Төслийн менежмент'],
        certificates: [
            { title: 'Linux Unhatched', image: cert1 },
            { title: 'Linux Essentials', image: cert2 }
        ],
        socialLinks: [{ platform: 'facebook', url: 'https://facebook.com' }, { platform: 'instagram', url: 'https://instagram.com' }],
        createdAt: '2025-02-20T11:15:00Z',
        updatedAt: '2026-02-28T14:45:00Z',
    },
    {
        id: 't3',
        name: 'Тэмүүлэн',
        avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=800',
        specialization: 'Робототехник',
        email: 'temuulen@teeeducation.mn',
        phone: '99001122',
        activeTrainingsCount: 1,
        status: 'active',
        experience: '3 жил',
        education: 'Мехатроник инженер',
        philosophy: 'Робот бол хүний оюун ухааны бүтээл.',
        github: 'https://github.com/temuulen',
        type: 'bagsh',
        skills: ['Arduino', 'Robotics', 'C++'],
        certificates: [
            { title: 'Linux Unhatched', image: cert1 },
            { title: 'Linux Essentials', image: cert2 }
        ],
        createdAt: '2025-08-05T10:30:00Z',
        updatedAt: '2026-03-01T09:10:00Z',
    }
];

export const mockArticles: Article[] = [
    {
        id: 'a1',
        title: 'Ирээдүйн мэргэжлүүд: Програмчлал яагаад чухал вэ?',
        cover: 'https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?auto=format&fit=crop&q=80&w=800',
        authorId: '5',
        category: 'Боловсрол',
        excerpt: 'Технологийн эрин зуунд програмчлалын чадвар нь зөвхөн инженерүүдэд биш, хүн бүрт хэрэгцээтэй суурь мэдлэг болж байна.',
        blocks: [
            {
                id: 'b1',
                type: 'text',
                order: 1,
                content: '<h2>Програмчлал бол шинэ хэл</h2><p>Өнөөдөр бидний эргэн тойронд байгаа бүх зүйл кодоор ажиллаж байна. Хөргөгчнөөс эхлээд сансрын хөлөг хүртэл...</p>'
            },
            {
                id: 'b2',
                type: 'quote',
                order: 2,
                content: {
                    text: 'Код бичих нь асуудлыг шийдвэрлэх урлаг юм.',
                    author: 'Стив Жобс'
                }
            },
            {
                id: 'b3',
                type: 'image',
                order: 3,
                content: {
                    url: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&q=80&w=800',
                    caption: 'Програмчлалын орчин'
                }
            }
        ],
        tags: ['Технологи', 'Боловсрол', 'Код'],
        status: 'published',
        publishedDate: '2026-02-10T08:00:00Z',
        views: 1250,
        createdAt: '2026-02-05T14:20:00Z',
        updatedAt: '2026-03-07T12:00:00Z',
    },
    {
        id: 'a2',
        title: 'Хүүхдээ хэрхэн технологид зөв дурлуулах вэ?',
        cover: 'https://images.unsplash.com/photo-1543269865-cbf427effbad?auto=format&fit=crop&q=80&w=800',
        authorId: 't2',
        category: 'Зөвлөгөө',
        excerpt: 'Дэлгэцийн донтолтоос сэргийлж, бүтээлчээр технологийг ашиглаж сургах зөвлөмжүүд.',
        blocks: [
            {
                id: 'b4',
                type: 'video',
                order: 1,
                content: {
                    url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
                    title: 'Технологи ба Хүүхэд'
                }
            },
            {
                id: 'b5',
                type: 'text',
                order: 2,
                content: '<p>Технологи бол зөвхөн хэрэглээ биш, харин бүтээх хэрэгсэл юм. Хүүхдээ тоглоом тоглуулахын оронд тоглоом хэрхэн бүтээхийг зааж өгөөрэй.</p>'
            }
        ],
        tags: ['Зөвлөгөө', 'Хүүхэд', 'Хүмүүжил'],
        status: 'published',
        publishedDate: '2026-03-01T09:30:00Z',
        views: 890,
        createdAt: '2026-02-25T10:10:00Z',
        updatedAt: '2026-03-01T10:00:00Z',
    },
    {
        id: 'a3',
        title: 'Зуны сургалтын бүртгэл эхэллээ',
        authorId: 't3',
        category: 'Мэдээ',
        excerpt: 'Тээ Хакатон 2026 зуны сургалтын бүртгэл албан ёсоор нээгдлээ. Эрт бүртгүүлж хөнгөлөлт эдлээрэй.',
        blocks: [
            {
                id: 'b6',
                type: 'course_grid',
                order: 1,
                content: {
                    courseIds: ['p1', 'p2'],
                    title: 'Санал болгож буй сургалтууд'
                },
                settings: {
                    showPreview: true,
                    buttonText: 'Бүртгүүлэх'
                }
            }
        ],
        tags: ['Мэдээ', 'Сургалт', 'Зун'],
        status: 'draft',
        views: 0,
        createdAt: '2026-03-06T13:00:00Z',
        updatedAt: '2026-03-06T15:30:00Z',
    }
];

export const mockRequests: Request[] = [
    {
        id: 'r1',
        name: 'Б. Саруул',
        email: 'saruul@example.com',
        phone: '99118877',
        type: 'training',
        priority: 'high',
        status: 'new',
        createdAt: '2026-03-07T08:15:00Z',
        updatedAt: '2026-03-07T08:15:00Z',
    },
    {
        id: 'r2',
        name: 'Д. Энхтуяа',
        email: 'enkhtuya@example.com',
        type: 'support',
        priority: 'medium',
        status: 'in_review',
        createdAt: '2026-03-06T14:30:00Z',
        updatedAt: '2026-03-06T16:00:00Z',
    },
    {
        id: 'r3',
        name: 'Г. Болд',
        phone: '88990011',
        type: 'contact',
        priority: 'low',
        status: 'resolved',
        createdAt: '2026-03-01T10:00:00Z',
        updatedAt: '2026-03-02T09:45:00Z',
    }
];

export const mockAppreciations: Appreciation[] = [
    {
        id: 'ap1',
        sender: 'Сурагч Анар',
        targetType: 'teacher',
        targetId: 't1',
        messagePreview: 'Бат-Эрдэнэ багшдаа маш их баярлалаа...',
        fullMessage: 'Бат-Эрдэнэ багшдаа маш их баярлалаа. Вэб хөгжүүлэлтийн хичээл маш ойлгомжтой, сонирхолтой байсан. Би одоо өөрийн гэсэн вэбсайттай болсон!',
        visibility: 'public',
        featured: true,
        status: 'approved',
        createdAt: '2026-02-20T16:30:00Z',
        updatedAt: '2026-02-21T09:00:00Z',
    },
    {
        id: 'ap2',
        sender: 'Эцэг эх Болормаа',
        targetType: 'program',
        targetId: 'p1',
        messagePreview: 'Ухаалаг боловсрол хөтөлбөрт баярлалаа...',
        fullMessage: 'Ухаалаг боловсрол хөтөлбөрт баярлалаа. Миний хүү утас тоглохын оронд одоо код бичиж суугааг харах үнэхээр сайхан байна.',
        visibility: 'public',
        featured: false,
        status: 'pending',
        createdAt: '2026-03-05T11:15:00Z',
        updatedAt: '2026-03-05T11:15:00Z',
    }
];

export const mockLessons: Lesson[] = [
    {
        id: 'l1',
        programId: 'p1',
        title: 'Кириш: Програмчлал гэж юу вэ?',
        type: 'video',
        duration: '10 мин',
        order: 1,
        status: 'published',
        description: 'Програмчлалын үндсэн ойлголтууд',
        createdAt: '2026-02-01T10:00:00Z',
        updatedAt: '2026-02-01T10:00:00Z',
    },
    {
        id: 'l2',
        programId: 'p1',
        title: 'Scratch-тэй танилцах',
        type: 'reading',
        duration: '15 мин',
        order: 2,
        status: 'published',
        createdAt: '2026-02-02T10:00:00Z',
        updatedAt: '2026-02-02T10:00:00Z',
    },
    {
        id: 'l3',
        programId: 'p1',
        title: 'Анхны програм: Үр дүнг хэвлэх',
        type: 'assignment',
        duration: '30 минут',
        order: 3,
        status: 'published',
        createdAt: '2026-02-03T10:00:00Z',
        updatedAt: '2026-02-03T10:00:00Z',
    },
    {
        id: 'l4',
        programId: 'p2',
        title: 'Робот хөдөлгүүрийн ажиллах зарчим',
        type: 'video',
        duration: '25 минут',
        order: 1,
        status: 'published',
        createdAt: '2026-02-01T10:00:00Z',
        updatedAt: '2026-02-01T10:00:00Z',
    },
    {
        id: 'l5',
        programId: 'p2',
        title: 'Булан тойрох алгоритм',
        type: 'assignment',
        duration: '45 минут',
        order: 2,
        status: 'published',
        createdAt: '2026-02-02T10:00:00Z',
        updatedAt: '2026-02-02T10:00:00Z',
    }
];

export const mockStudentProjects: StudentProject[] = [
    {
        id: 'sp1',
        title: 'Space Adventure',
        type: 'scratch',
        thumbnail: '/projects/scratch-1.jpg',
        embedUrl: 'https://scratch.mit.edu/projects/1249565877/embed',
        openUrl: 'https://scratch.mit.edu/projects/1249565877',
        studentName: 'Anu',
        color: 'bg-orange-400',
        featured: true,
        status: 'active',
        createdAt: '2026-01-10T10:00:00Z',
        updatedAt: '2026-01-10T10:00:00Z'
    },
    {
        id: 'sp2',
        title: 'Jump Hero',
        type: 'scratch',
        thumbnail: '/projects/scratch-2.jpg',
        embedUrl: 'https://scratch.mit.edu/projects/1201982030/embed',
        openUrl: 'https://scratch.mit.edu/projects/1201982030',
        studentName: 'Nomin',
        color: 'bg-orange-400',
        featured: true,
        status: 'active',
        createdAt: '2026-01-12T11:00:00Z',
        updatedAt: '2026-01-12T11:00:00Z'
    },
    {
        id: 'sp3',
        title: 'Maze Game',
        type: 'scratch',
        thumbnail: '/projects/scratch-3.jpg',
        embedUrl: 'https://scratch.mit.edu/projects/1204900026/embed',
        openUrl: 'https://scratch.mit.edu/projects/1204900026',
        studentName: 'Saraa',
        color: 'bg-orange-300',
        featured: false,
        status: 'active',
        createdAt: '2026-01-15T12:00:00Z',
        updatedAt: '2026-01-15T12:00:00Z'
    },
    {
        id: 'sp4',
        title: 'Robot Car',
        type: 'tinkercad',
        thumbnail: '/projects/tinker-1.jpg',
        openUrl: 'https://www.tinkercad.com/things/lDrYycuCToU-funky-jaban-amberis',
        studentName: 'Bilguun',
        color: 'bg-cyan-400',
        featured: true,
        status: 'active',
        createdAt: '2026-01-20T14:00:00Z',
        updatedAt: '2026-01-20T14:00:00Z'
    }
];
