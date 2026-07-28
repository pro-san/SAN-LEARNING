export interface User {
  id: string;
  name: string;
  email: string;
  avatarUrl?: string;
  role: 'student' | 'instructor';
  enrolledCourseIds: string[];
  completedLessonIds: string[];
  bookmarkedCourseIds: string[];
  totalMinutesLearned: number;
  certificates: Certificate[];
  isGoogleAuthenticated?: boolean;
  googleAccessToken?: string | null;
}

export interface Certificate {
  id: string;
  courseId: string;
  courseTitle: string;
  studentName: string;
  issuedDate: string;
  code: string;
}

export interface QuizQuestion {
  id: number;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

export interface LessonResource {
  id: string;
  title: string;
  type: 'pdf' | 'code' | 'zip' | 'link';
  url: string;
  size?: string;
}

export interface Lesson {
  id: string;
  titleKm: string;
  titleEn: string;
  duration: string;
  videoUrl: string;
  descriptionKm?: string;
  descriptionEn?: string;
  isFreePreview?: boolean;
  resources?: LessonResource[];
  quizQuestions?: QuizQuestion[];
}

export interface CourseModule {
  id: string;
  titleKm: string;
  titleEn: string;
  lessons: Lesson[];
}

export interface Instructor {
  id: string;
  name: string;
  avatar: string;
  role: string;
  rating: number;
  studentsCount: number;
  coursesCount: number;
  experienceKm: string;
  experienceEn: string;
  bioKm: string;
  bioEn: string;
  expertise: string[];
}

export interface Course {
  id: string;
  titleKm: string;
  titleEn: string;
  category: CourseCategory;
  levelKm: string;
  levelEn: string;
  rating: number;
  reviewCount: number;
  price: number; // 0 if free
  isFree: boolean;
  isFeatured?: boolean;
  isPopular?: boolean;
  thumbnail: string;
  instructorName: string;
  instructorAvatar: string;
  instructorRole: string;
  instructorBioKm?: string;
  instructorBioEn?: string;
  instructorExpertise?: string[];
  instructorExperienceKm?: string;
  instructorExperienceEn?: string;
  instructorRating?: number;
  instructorStudentsCount?: number;
  descriptionKm: string;
  descriptionEn: string;
  totalHours: number;
  totalLessons: number;
  modules: CourseModule[];
  tags: string[];
}

export type CourseCategory = 
  | 'coding' 
  | 'languages' 
  | 'stem' 
  | 'business' 
  | 'design';

export interface LessonNote {
  id: string;
  lessonId: string;
  courseId: string;
  timestampSeconds: number;
  noteText: string;
  createdAt: string;
}

export interface DiscussionMessage {
  id: string;
  lessonId: string;
  userName: string;
  userAvatar?: string;
  text: string;
  createdAt: string;
  isAiReply?: boolean;
}

export interface CourseReview {
  id: string;
  courseId: string;
  userId: string;
  userName: string;
  userAvatar?: string;
  rating: number; // 1 to 5
  comment: string;
  createdAt: string;
  isVerifiedEnrolled?: boolean;
}

