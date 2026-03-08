export type Status = 'active' | 'inactive' | 'pending' | 'draft' | 'published' | 'archived' | 'new' | 'in_review' | 'approved' | 'rejected' | 'resolved';

export interface BaseEntity {
    id: string;
    createdAt: string;
    updatedAt: string;
}

export interface Program extends BaseEntity {
    title: string;
    category: string;
    level: string;
    duration: string;
    trainingsCount: number;
    teachersCount: number;
    status: Status;
    description?: string;
    featured?: boolean;
    coverImage?: string;
    ageGroup?: string;
    tools?: string;
    contactInfo?: string;
    curriculumSummary?: string;
    price?: string;
    icon?: string;
    color?: string;
    tagColor?: string;
}

export interface Training extends BaseEntity {
    title: string;
    programId: string;
    teacherId: string;
    format: 'online' | 'offline' | 'hybrid';
    startDate: string;
    endDate: string;
    capacity: number;
    enrolledCount: number;
    status: Status;
}

export interface Teacher extends BaseEntity {
    name: string;
    avatar?: string;
    specialization: string;
    email: string;
    phone: string;
    activeTrainingsCount: number;
    status: Status;
    age?: number;
    gender?: 'male' | 'female' | 'other';
    bio?: string;
    skills?: string[];
    experience?: string;
    education?: string;
    philosophy?: string;
    github?: string;
    type: 'udirdlaga' | 'bagsh';
    certificates?: Array<{
        title: string;
        image: string;
    }>;
    socialLinks?: Array<{
        platform: 'facebook' | 'instagram' | 'linkedin' | string;
        url: string;
    }>;
}

export type BlockType = 'text' | 'image' | 'gallery' | 'quote' | 'video' | 'course_grid';

export interface ArticleBlock {
    id: string;
    type: BlockType;
    content: any; // Flexible based on type
    order: number;
    settings?: any;
}

export interface Article extends BaseEntity {
    title: string;
    cover?: string;
    authorId: string;
    category: string;
    excerpt?: string;
    blocks: ArticleBlock[]; // Replaces single content string
    tags?: string[];
    status: Status;
    publishedDate?: string;
    views: number;
}

export interface Request extends BaseEntity {
    name: string;
    email?: string;
    phone?: string;
    type: 'training' | 'teacher' | 'support' | 'contact';
    priority: 'low' | 'medium' | 'high';
    status: Status;
}

export interface Appreciation extends BaseEntity {
    sender: string;
    targetType: 'teacher' | 'training' | 'program';
    targetId: string;
    messagePreview: string;
    fullMessage: string;
    visibility: 'public' | 'private';
    featured: boolean;
    status: Status;
}

export interface Lesson extends BaseEntity {
    programId: string;
    title: string;
    type: 'video' | 'reading' | 'assignment' | 'quiz';
    duration: string;
    order: number;
    status: Status;
    description?: string;
    videoId?: string;
    content?: string;
}

export interface StudentProject extends BaseEntity {
    title: string;
    type: 'scratch' | 'tinkercad';
    thumbnail: string;
    embedUrl?: string;
    openUrl?: string;
    studentName: string;
    color?: string;
    featured: boolean;
    status: Status;
}
