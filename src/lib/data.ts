
export const teachers = [
  { id: '1', name: 'Ш. Бонор', role: 'Багш', years: 5, classes: [3, 4, 5], image: 'https://i.pravatar.cc/150?u=bonor' },
  { id: '2', name: 'М. Зоригт', role: 'Ахлах багш', years: 8, classes: [6, 7, 8], image: 'https://i.pravatar.cc/150?u=zorigt' },
  { id: '3', name: 'Ж. Солонго', role: 'Роботикийн багш', years: 4, classes: [9, 10, 11], image: 'https://i.pravatar.cc/150?u=solongo' },
  { id: '4', name: 'У. Санж-Очир', role: 'Програмчлалын багш', years: 6, classes: [9, 10, 11, 12], image: 'https://i.pravatar.cc/150?u=sanj' },
];

export const programs = [
  { id: '1', title: 'Scratch Pixels', grade: '3-Р АНГИ', level: 'Elementary', ageRange: '8-10', teacherId: '1', color: '#4285F4' },
  { id: '2', title: 'Zero 2 Hero', grade: '5-Р АНГИ', level: 'Intermediate', ageRange: '10-12', teacherId: '2', color: '#0F9D58' },
  { id: '3', title: 'Electrikid', grade: '7-Р АНГИ', level: 'Intermediate', ageRange: '12-14', teacherId: '3', color: '#F4B400' },
  { id: '4', title: 'Python Programmer', grade: '9-Р АНГИ', level: 'Advanced', ageRange: '14-18', teacherId: '4', color: '#DB4437' },
];

export const paidCourses = [
  { id: '1', title: 'Web Design 101', category: 'Design', price: 450000, duration: '8 weeks', ageRange: '12+' },
  { id: '2', title: 'Robotics Basic', category: 'Hardware', price: 600000, duration: '12 weeks', ageRange: '10+' },
  { id: '3', title: 'Python AI Intro', category: 'Software', price: 550000, duration: '10 weeks', ageRange: '14+' },
];

export const formatPrice = (price: number) => new Intl.NumberFormat('mn-MN').format(price);
