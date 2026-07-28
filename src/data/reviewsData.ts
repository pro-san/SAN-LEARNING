import { CourseReview } from '../types';

export const INITIAL_REVIEWS: CourseReview[] = [
  {
    id: 'rev-1',
    courseId: 'course-web-dev',
    userId: 'user-stu-1',
    userName: 'សុខ ជា',
    userAvatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=120&q=80',
    rating: 5,
    comment: 'មេរៀនល្អខ្លាំងណាស់លោកគ្រូ! ពន្យល់ច្បាស់ៗជាភាសាខ្មែរ ងាយយល់សម្រាប់អ្នកគ្មានមូលដ្ឋានសរសេរកូដពីមុនមក។ ឥឡូវខ្ញុំបង្កើត Web ខ្លួនឯងបានហើយ!',
    createdAt: '២៨ កក្កដា ២០២៦',
    isVerifiedEnrolled: true
  },
  {
    id: 'rev-2',
    courseId: 'course-web-dev',
    userId: 'user-stu-2',
    userName: 'ម៉េង លី',
    userAvatar: 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?auto=format&fit=crop&w=120&q=80',
    rating: 5,
    comment: 'Great full-stack course for Cambodian students! Project examples are very practical and easy to follow.',
    createdAt: '២៥ កក្កដា ២០២៦',
    isVerifiedEnrolled: true
  },
  {
    id: 'rev-3',
    courseId: 'course-web-dev',
    userId: 'user-stu-3',
    userName: 'ចាន់ ធារ៉ា',
    userAvatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=120&q=80',
    rating: 4,
    comment: 'មេរៀនល្អ មានលំហាត់អនុវត្តច្រើន និងមាន Quiz តេស្តសមត្ថភាពចុងមេរៀនទៀតផង!',
    createdAt: '២០ កក្កដា ២០២៦',
    isVerifiedEnrolled: true
  },
  {
    id: 'rev-4',
    courseId: 'course-english-comm',
    userId: 'user-stu-4',
    userName: 'សុផល ពិសិដ្ឋ',
    userAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=120&q=80',
    rating: 5,
    comment: 'គ្រូបង្រៀនបញ្ចេញសំឡេងច្បាស់ៗ ជួយបង្កើនទំនុកចិត្តក្នុងការនិយាយភាសាអង់គ្លេសការងារខ្លាំងណាស់!',
    createdAt: '២២ កក្កដា ២០២៦',
    isVerifiedEnrolled: true
  },
  {
    id: 'rev-5',
    courseId: 'course-python-ai',
    userId: 'user-stu-5',
    userName: 'គឹម ស្រីណុច',
    userAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&q=80',
    rating: 5,
    comment: 'វគ្គសិក្សា Python & AI ល្អបំផុត! លោកគ្រូពន្យល់ពី AI ងាយយល់ និងមានគំរូកូដច្បាស់លាស់។',
    createdAt: '១៨ កក្កដា ២០២៦',
    isVerifiedEnrolled: true
  }
];
