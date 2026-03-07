import type { Program, Training, Teacher, Article, Request, Appreciation, Lesson } from '../types/admin';

export const mockPrograms: Program[] = [
    {
        id: 'p1',
        title: 'Ухаалаг Боловсрол - Анхан шат',
        category: 'Програмчлал',
        level: 'Анхан шат',
        duration: '12 долоо хоног',
        trainingsCount: 5,
        teachersCount: 3,
        status: 'active',
        featured: true,
        createdAt: '2026-01-15T08:00:00Z',
        updatedAt: '2026-02-20T10:30:00Z',
        description: 'Хүүхэд залууст зориулсан програмчлалын үндсэн ойлголтуудыг олгох цогц хөтөлбөр.',
        ageGroup: '8-12 нас',
        curriculumSummary: 'Алгоритм, Scratch, Вэб хөгжүүлэлтийн суурь',
        tools: 'Scratch, VS Code',
        contactInfo: '88112233',
        coverImage: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&q=80&w=800'
    },
    {
        id: 'p2',
        title: 'Ахисан түвшний Робототехник',
        category: 'Инженерчлэл',
        level: 'Ахисан шат',
        duration: '16 долоо хоног',
        trainingsCount: 2,
        teachersCount: 2,
        status: 'active',
        createdAt: '2025-11-10T09:15:00Z',
        updatedAt: '2026-01-05T14:20:00Z',
        ageGroup: '12-16 нас',
        curriculumSummary: 'Arduino, Мэдрэгчүүд, Робот угсралт',
        tools: 'Arduino Kit, Tinkercad',
        contactInfo: '99001122',
        coverImage: 'https://images.unsplash.com/photo-1561557944-6e7860d1a7eb?auto=format&fit=crop&q=80&w=800'
    },
    {
        id: 'p3',
        title: 'Зуны программчлалын кемп',
        category: 'Зуны сургалт',
        level: 'Бүх түвшин',
        duration: '4 долоо хоног',
        trainingsCount: 0,
        teachersCount: 5,
        status: 'draft',
        createdAt: '2026-03-01T11:00:00Z',
        updatedAt: '2026-03-05T16:45:00Z',
        ageGroup: '10-18 нас',
        curriculumSummary: 'Төсөлд суурилсан хакатон сургалт',
        tools: 'Github, Replit',
        contactInfo: '77665544',
        coverImage: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&q=80&w=800'
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
        price: 350000,
        salesCount: 15,
        type: 'paid',
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
        price: 250000,
        salesCount: 48,
        type: 'paid',
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
        price: 0,
        salesCount: 5,
        type: 'free',
        status: 'pending',
        createdAt: '2026-03-05T08:30:00Z',
        updatedAt: '2026-03-06T15:20:00Z',
    }
];

export const mockTeachers: Teacher[] = [
    {
        id: 't1',
        name: 'Бат-Эрдэнэ',
        avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=800',
        specialization: 'Вэб хөгжүүлэлт',
        email: 'baterdene@teeeducation.mn',
        phone: '99112233',
        activeTrainingsCount: 2,
        status: 'active',
        createdAt: '2024-05-10T09:00:00Z',
        updatedAt: '2026-01-15T10:30:00Z',
    },
    {
        id: 't2',
        name: 'Оюунчимэг',
        avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=800',
        specialization: 'Python & Өгөгдлийн шинжлэх ухаан',
        email: 'oyunchimeg@teeeducation.mn',
        phone: '88997766',
        activeTrainingsCount: 3,
        status: 'active',
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
        createdAt: '2025-08-05T10:30:00Z',
        updatedAt: '2026-03-01T09:10:00Z',
    }
];

export const mockArticles: Article[] = [
    {
        id: 'a1',
        title: 'Ирээдүйн мэргэжлүүд: Програмчлал яагаад чухал вэ?',
        cover: 'https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?auto=format&fit=crop&q=80&w=800',
        authorId: 't1',
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
        title: 'Оршил: Програмчлал гэж юу вэ?',
        type: 'video',
        duration: '15 минут',
        order: 1,
        status: 'published',
        createdAt: '2026-02-01T10:00:00Z',
        updatedAt: '2026-02-01T10:00:00Z',
    },
    {
        id: 'l2',
        programId: 'p1',
        title: 'Код бичих орчинг бэлтгэх',
        type: 'reading',
        duration: '10 минут',
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
