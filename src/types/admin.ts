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
    // content centric fields
    ageGroup?: string;
    curriculumSummary?: string;
    tools?: string;
    contactInfo?: string;
    coverImage?: string;
}

export interface Training extends BaseEntity {
    title: string;
    programId: string;
    teacherId: string;
    format: 'online' | 'offline' | 'hybrid';
    startDate: string;
    endDate: string;
    price: number;
    salesCount: number;
    status: Status;
    type: 'free' | 'paid';
}

export interface Teacher extends BaseEntity {
    name: string;
    avatar?: string;
    specialization: string;
    email: string;
    phone: string;
    age?: number;
    gender?: 'male' | 'female' | 'other';
    skills?: string[];
    bio?: string;
    socialLinks?: { platform: 'facebook' | 'instagram' | 'linkedin' | 'website', url: string }[];
    activeTrainingsCount: number;
    status: Status;
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
}
