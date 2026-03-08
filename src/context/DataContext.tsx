import React, { createContext, useContext, useState, useEffect } from 'react';
import type { Program, Training, Teacher, Article, Request, Appreciation, Lesson, StudentProject } from '../types/admin';
import { 
    mockPrograms, 
    mockTrainings, 
    mockTeachers, 
    mockArticles, 
    mockRequests, 
    mockAppreciations, 
    mockLessons,
    mockStudentProjects
} from '../mock/adminData';

interface DataContextType {
    programs: Program[];
    trainings: Training[];
    teachers: Teacher[];
    articles: Article[];
    requests: Request[];
    appreciations: Appreciation[];
    lessons: Lesson[];
    studentProjects: StudentProject[];
    
    // Programs
    addProgram: (program: Omit<Program, 'id' | 'createdAt' | 'updatedAt'>) => void;
    updateProgram: (id: string, program: Partial<Program>) => void;
    deleteProgram: (id: string) => void;

    // Trainings
    addTraining: (training: Omit<Training, 'id' | 'createdAt' | 'updatedAt'>) => void;
    updateTraining: (id: string, training: Partial<Training>) => void;
    deleteTraining: (id: string) => void;

    // Teachers
    addTeacher: (teacher: Omit<Teacher, 'id' | 'createdAt' | 'updatedAt'>) => void;
    updateTeacher: (id: string, teacher: Partial<Teacher>) => void;
    deleteTeacher: (id: string) => void;

    // Articles
    addArticle: (article: Omit<Article, 'id' | 'createdAt' | 'updatedAt'>) => void;
    updateArticle: (id: string, article: Partial<Article>) => void;
    deleteArticle: (id: string) => void;

    // Requests
    addRequest: (request: Omit<Request, 'id' | 'createdAt' | 'updatedAt'>) => void;
    updateRequest: (id: string, request: Partial<Request>) => void;
    deleteRequest: (id: string) => void;

    // Appreciations
    addAppreciation: (appreciation: Omit<Appreciation, 'id' | 'createdAt' | 'updatedAt'>) => void;
    updateAppreciation: (id: string, appreciation: Partial<Appreciation>) => void;
    deleteAppreciation: (id: string) => void;

    // Lessons
    addLesson: (lesson: Omit<Lesson, 'id' | 'createdAt' | 'updatedAt'>) => void;
    updateLesson: (id: string, lesson: Partial<Lesson>) => void;
    deleteLesson: (id: string) => void;

    // Student Projects
    addStudentProject: (project: Omit<StudentProject, 'id' | 'createdAt' | 'updatedAt'>) => void;
    updateStudentProject: (id: string, project: Partial<StudentProject>) => void;
    deleteStudentProject: (id: string) => void;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

const LOCAL_STORAGE_KEY = 'tee_hackathon_data';

export const DataProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [data, setData] = useState(() => {
        const storedData = localStorage.getItem(LOCAL_STORAGE_KEY);
        const defaults = {
            programs: mockPrograms,
            trainings: mockTrainings,
            teachers: mockTeachers,
            articles: mockArticles,
            requests: mockRequests,
            appreciations: mockAppreciations,
            lessons: mockLessons,
            studentProjects: mockStudentProjects,
        };

        if (storedData) {
            try {
                const parsed = JSON.parse(storedData);
                
                // Deep merge teachers to preserve new mock fields like certificates
                // while keeping other stored changes
                const mergedTeachers = defaults.teachers.map(mockT => {
                    const storedT = parsed.teachers?.find((t: any) => t.id === mockT.id);
                    if (storedT) {
                        return { 
                            ...mockT, 
                            ...storedT,
                            // Prioritize mock certificates if stored ones are empty
                            certificates: (storedT.certificates && storedT.certificates.length > 0) 
                                ? storedT.certificates 
                                : mockT.certificates,
                            // Prioritize mock avatar if stored one is a generic external link
                            avatar: (storedT.avatar && storedT.avatar.includes('unsplash.com'))
                                ? mockT.avatar
                                : (storedT.avatar || mockT.avatar)
                        };
                    }
                    return mockT;
                });

                // Add any extra teachers from storage that aren't in mock
                const extraTeachers = parsed.teachers?.filter((pt: any) => !defaults.teachers.find(dt => dt.id === pt.id)) || [];

                return { 
                    ...defaults, 
                    ...parsed, 
                    teachers: [...mergedTeachers, ...extraTeachers] 
                };
            } catch (e) {
                console.error("Failed to parse stored data", e);
            }
        }
        return defaults;
    });

    useEffect(() => {
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(data));
    }, [data]);

    const generateId = (prefix: string) => `${prefix}_${Math.random().toString(36).substr(2, 9)}`;
    const generateTimestamp = () => new Date().toISOString();

    const createCrudHelpers = <T extends { id: string; createdAt: string; updatedAt: string }>(key: keyof typeof data, prefix: string) => {
        return {
            add: (item: Omit<T, 'id' | 'createdAt' | 'updatedAt'>) => {
                const newItem = {
                    ...item,
                    id: generateId(prefix),
                    createdAt: generateTimestamp(),
                    updatedAt: generateTimestamp(),
                } as T;
                setData((prev: any) => ({ ...prev, [key]: [...prev[key], newItem] }));
            },
            update: (id: string, changes: Partial<T>) => {
                setData((prev: any) => ({
                    ...prev,
                    [key]: prev[key].map((item: T) => 
                        item.id === id ? { ...item, ...changes, updatedAt: generateTimestamp() } : item
                    )
                }));
            },
            delete: (id: string) => {
                setData((prev: any) => ({
                    ...prev,
                    [key]: prev[key].filter((item: T) => item.id !== id)
                }));
            }
        };
    };

    const programHelpers = createCrudHelpers<Program>('programs', 'p');
    const trainingHelpers = createCrudHelpers<Training>('trainings', 'tr');
    const teacherHelpers = createCrudHelpers<Teacher>('teachers', 't');
    const articleHelpers = createCrudHelpers<Article>('articles', 'a');
    const requestHelpers = createCrudHelpers<Request>('requests', 'r');
    const appreciationHelpers = createCrudHelpers<Appreciation>('appreciations', 'ap');
    const lessonHelpers = createCrudHelpers<Lesson>('lessons', 'l');
    const projectHelpers = createCrudHelpers<StudentProject>('studentProjects', 'sp');

    const value: DataContextType = {
        ...data,
        addProgram: programHelpers.add,
        updateProgram: programHelpers.update,
        deleteProgram: programHelpers.delete,

        addTraining: trainingHelpers.add,
        updateTraining: trainingHelpers.update,
        deleteTraining: trainingHelpers.delete,

        addTeacher: teacherHelpers.add,
        updateTeacher: teacherHelpers.update,
        deleteTeacher: teacherHelpers.delete,

        addArticle: articleHelpers.add,
        updateArticle: articleHelpers.update,
        deleteArticle: articleHelpers.delete,

        addRequest: requestHelpers.add,
        updateRequest: requestHelpers.update,
        deleteRequest: requestHelpers.delete,

        addAppreciation: appreciationHelpers.add,
        updateAppreciation: appreciationHelpers.update,
        deleteAppreciation: appreciationHelpers.delete,

        addLesson: lessonHelpers.add,
        updateLesson: lessonHelpers.update,
        deleteLesson: lessonHelpers.delete,

        addStudentProject: projectHelpers.add,
        updateStudentProject: projectHelpers.update,
        deleteStudentProject: projectHelpers.delete,
    };

    return (
        <DataContext.Provider value={value}>
            {children}
        </DataContext.Provider>
    );
};

export const useDataContext = () => {
    const context = useContext(DataContext);
    if (!context) {
        throw new Error('useDataContext must be used within a DataProvider');
    }
    return context;
};
