import React, { useState } from 'react';
import { 
  X, 
  CheckCircle2, 
  Play, 
  Clock, 
  BookOpen, 
  Star, 
  Award, 
  User as UserIcon, 
  Sparkles, 
  Lock,
  ChevronDown,
  ChevronUp,
  Briefcase,
  ShieldCheck,
  GraduationCap,
  ArrowRight
} from 'lucide-react';
import { Course, Lesson, CourseReview, User } from '../types';
import { INITIAL_COURSES } from '../data/coursesData';
import { ReviewSection } from './ReviewSection';

interface CourseDetailsModalProps {
  course: Course | null;
  isOpen: boolean;
  onClose: () => void;
  isEnrolled: boolean;
  onEnroll: (course: Course) => void;
  onStartLesson: (course: Course, lesson: Lesson) => void;
  onSelectCourse?: (course: Course) => void;
  allCourses?: Course[];
  lang: 'km' | 'en';
  reviews: CourseReview[];
  user: User | null;
  onAddReview: (review: Omit<CourseReview, 'id' | 'createdAt'>) => void;
  onDeleteReview?: (reviewId: string) => void;
  onOpenAuth: () => void;
}

export const CourseDetailsModal: React.FC<CourseDetailsModalProps> = ({
  course,
  isOpen,
  onClose,
  isEnrolled,
  onEnroll,
  onStartLesson,
  onSelectCourse,
  allCourses = INITIAL_COURSES,
  lang,
  reviews,
  user,
  onAddReview,
  onDeleteReview,
  onOpenAuth,
}) => {
  const [activeTab, setActiveTab] = useState<'syllabus' | 'instructor' | 'reviews'>('syllabus');
  const [expandedModules, setExpandedModules] = useState<Record<string, boolean>>({ 'mod-1': true });

  if (!isOpen || !course) return null;

  const isKm = lang === 'km';

  const toggleModule = (modId: string) => {
    setExpandedModules((prev) => ({ ...prev, [modId]: !prev[modId] }));
  };

  const handleLessonClick = (lesson: Lesson) => {
    if (isEnrolled || lesson.isFreePreview) {
      onStartLesson(course, lesson);
      onClose();
    }
  };

  // Find other courses taught by the same instructor
  const instructorOtherCourses = allCourses.filter(
    (c) => c.instructorName.trim().toLowerCase() === course.instructorName.trim().toLowerCase()
  );

  const courseReviews = reviews.filter((r) => r.courseId === course.id);
  const reviewCount = courseReviews.length > 0 ? courseReviews.length : course.reviewCount;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/75 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200">
      
      <div className="bg-white rounded-3xl max-w-4xl w-full shadow-2xl border border-slate-200 overflow-hidden relative max-h-[90vh] flex flex-col">
        
        {/* Header Bar */}
        <div className="sticky top-0 bg-white/95 backdrop-blur-md px-6 py-3.5 border-b border-slate-100 flex items-center justify-between z-20">
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-1 rounded-md bg-blue-50 text-blue-700 text-xs font-bold border border-blue-100 uppercase">
              {course.category}
            </span>
            <span className="text-xs text-slate-500 font-medium">
              {isKm ? course.levelKm : course.levelEn}
            </span>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Navigation Tabs (Syllabus, Instructor, Reviews) */}
        <div className="flex border-b border-slate-200 px-6 bg-slate-50/80 font-heading font-bold text-xs sm:text-sm shrink-0 overflow-x-auto">
          <button
            onClick={() => setActiveTab('syllabus')}
            className={`py-3 px-4 border-b-2 flex items-center gap-2 transition-all shrink-0 ${
              activeTab === 'syllabus'
                ? 'border-blue-600 text-blue-600 bg-white shadow-xs rounded-t-xl'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            <BookOpen className="w-4 h-4" />
            <span>{isKm ? 'មាតិកាវគ្គសិក្សា' : 'Syllabus'}</span>
          </button>

          <button
            onClick={() => setActiveTab('instructor')}
            className={`py-3 px-4 border-b-2 flex items-center gap-2 transition-all shrink-0 ${
              activeTab === 'instructor'
                ? 'border-blue-600 text-blue-600 bg-white shadow-xs rounded-t-xl'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            <UserIcon className="w-4 h-4" />
            <span>{isKm ? 'ព័ត៌មានគ្រូបង្រៀន' : 'Instructor'}</span>
            <span className="ml-1 px-1.5 py-0.5 rounded-full text-[10px] bg-amber-100 text-amber-800 font-bold border border-amber-200">
              {instructorOtherCourses.length} {isKm ? 'វគ្គ' : 'courses'}
            </span>
          </button>

          <button
            onClick={() => setActiveTab('reviews')}
            className={`py-3 px-4 border-b-2 flex items-center gap-2 transition-all shrink-0 ${
              activeTab === 'reviews'
                ? 'border-blue-600 text-blue-600 bg-white shadow-xs rounded-t-xl'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            <Star className="w-4 h-4 text-amber-500 fill-amber-400" />
            <span>{isKm ? 'ការវាយតម្លៃសិស្ស' : 'Student Reviews'}</span>
            <span className="ml-1 px-1.5 py-0.5 rounded-full text-[10px] bg-blue-100 text-blue-800 font-bold border border-blue-200">
              {reviewCount}
            </span>
          </button>
        </div>

        {/* Scrollable Content Body */}
        <div className="overflow-y-auto p-6 space-y-8 flex-1">
          
          {/* TAB 1: SYLLABUS & OVERVIEW */}
          {activeTab === 'syllabus' && (
            <>
              {/* Main Course Hero & Info */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                
                <div className="md:col-span-2 space-y-4">
                  <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 leading-tight font-heading">
                    {isKm ? course.titleKm : course.titleEn}
                  </h2>

                  <p className="text-sm text-slate-600 leading-relaxed font-normal">
                    {isKm ? course.descriptionKm : course.descriptionEn}
                  </p>

                  {/* Highlights row */}
                  <div className="flex flex-wrap items-center gap-4 text-xs font-semibold text-slate-600 pt-2">
                    <button 
                      onClick={() => setActiveTab('reviews')}
                      className="flex items-center gap-1 text-amber-500 font-bold hover:underline cursor-pointer"
                    >
                      <Star className="w-4 h-4 fill-amber-400" />
                      <span>{course.rating.toFixed(1)}</span>
                      <span className="text-slate-400">({reviewCount} {isKm ? 'ការវាយតម្លៃ' : 'reviews'})</span>
                    </button>

                    <div className="flex items-center gap-1">
                      <Clock className="w-4 h-4 text-blue-600" />
                      <span>{course.totalHours} {isKm ? 'ម៉ោង' : 'Hours'}</span>
                    </div>

                    <div className="flex items-center gap-1">
                      <BookOpen className="w-4 h-4 text-emerald-600" />
                      <span>{course.totalLessons} {isKm ? 'មេរៀន' : 'Lessons'}</span>
                    </div>

                    <div className="flex items-center gap-1">
                      <Award className="w-4 h-4 text-purple-600" />
                      <span>{isKm ? 'មានវិញ្ញាបនបត្រ' : 'Certificate Included'}</span>
                    </div>
                  </div>

                  {/* Interactive Instructor Card Preview */}
                  <div 
                    onClick={() => setActiveTab('instructor')}
                    className="pt-4 flex items-center justify-between p-3.5 bg-slate-50 hover:bg-blue-50/60 rounded-2xl border border-slate-200/80 cursor-pointer transition-all group"
                  >
                    <div className="flex items-center gap-3">
                      <div className="relative">
                        <img
                          src={course.instructorAvatar}
                          alt={course.instructorName}
                          className="w-11 h-11 rounded-full object-cover ring-2 ring-blue-500/30"
                        />
                        <div className="absolute -bottom-1 -right-1 bg-blue-600 text-white rounded-full p-0.5 shadow-xs">
                          <CheckCircle2 className="w-3 h-3" />
                        </div>
                      </div>
                      <div>
                        <div className="text-[10px] uppercase font-bold text-slate-400">{isKm ? 'គ្រូបង្រៀនផ្ទាល់' : 'Instructor'}</div>
                        <div className="text-sm font-bold text-slate-900 group-hover:text-blue-600 transition-colors flex items-center gap-1.5">
                          <span>{course.instructorName}</span>
                        </div>
                        <div className="text-[11px] text-slate-500">{course.instructorRole}</div>
                      </div>
                    </div>

                    <div className="text-xs font-bold text-blue-600 bg-blue-100/60 group-hover:bg-blue-600 group-hover:text-white px-3 py-1.5 rounded-xl transition-all flex items-center gap-1">
                      <span>{isKm ? 'មើលប្រវត្តិគ្រូ' : 'View Profile'}</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </div>
                  </div>
                </div>

                {/* Thumbnail Preview Card */}
                <div className="space-y-4 bg-slate-50 p-4 rounded-2xl border border-slate-200">
                  <div className="relative aspect-video rounded-xl overflow-hidden bg-slate-900 group">
                    <img src={course.thumbnail} alt={course.titleKm} className="w-full h-full object-cover opacity-90" />
                    <div className="absolute inset-0 bg-slate-950/40 flex items-center justify-center">
                      <button 
                        onClick={() => {
                          const firstFreeLesson = course.modules[0]?.lessons[0];
                          if (firstFreeLesson) handleLessonClick(firstFreeLesson);
                        }}
                        className="w-12 h-12 rounded-full bg-blue-600 hover:bg-blue-700 text-white flex items-center justify-center shadow-lg transition-transform group-hover:scale-110"
                      >
                        <Play className="w-5 h-5 ml-0.5" />
                      </button>
                    </div>
                    <span className="absolute bottom-2 left-2 px-2 py-0.5 rounded bg-slate-950/80 text-white text-[10px] font-medium">
                      {isKm ? 'មើលវីដេអូគំរូ' : 'Preview Video'}
                    </span>
                  </div>

                  <div className="text-center space-y-2">
                    <div className="text-2xl font-black text-slate-900">
                      {course.isFree ? (isKm ? 'ឥតគិតថ្លៃ (Free)' : 'FREE') : `$${course.price}`}
                    </div>

                    {isEnrolled ? (
                      <button
                        onClick={() => {
                          const firstLesson = course.modules[0]?.lessons[0];
                          if (firstLesson) {
                            onStartLesson(course, firstLesson);
                            onClose();
                          }
                        }}
                        className="w-full py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm transition-all shadow-md flex items-center justify-center gap-2"
                      >
                        <CheckCircle2 className="w-5 h-5" />
                        <span>{isKm ? 'ចូលរៀនបន្ត' : 'Continue Studying'}</span>
                      </button>
                    ) : (
                      <button
                        onClick={() => onEnroll(course)}
                        className="w-full py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm transition-all shadow-md shadow-blue-500/20 flex items-center justify-center gap-2"
                      >
                        <Sparkles className="w-4 h-4 text-amber-300" />
                        <span>{isKm ? 'ចុះឈ្មោះចូលរៀនឥឡូវនេះ' : 'Enroll Now'}</span>
                      </button>
                    )}

                    <p className="text-[11px] text-slate-500 font-medium pt-1">
                      {isKm ? 'ចូលរៀនបានរហូត គ្មានផុតកំណត់' : 'Full Lifetime Access'}
                    </p>
                  </div>
                </div>

              </div>

              {/* Syllabus Chapters */}
              <div className="space-y-4 pt-4 border-t border-slate-100">
                <h3 className="text-lg font-bold text-slate-900 font-heading">
                  {isKm ? 'មាតិកាវគ្គសិក្សា (Syllabus Course Modules)' : 'Course Syllabus'}
                </h3>

                <div className="space-y-3">
                  {course.modules.map((mod) => {
                    const isExpanded = expandedModules[mod.id] ?? true;
                    return (
                      <div key={mod.id} className="border border-slate-200 rounded-2xl overflow-hidden bg-white">
                        <button
                          onClick={() => toggleModule(mod.id)}
                          className="w-full p-4 bg-slate-50 hover:bg-slate-100/80 transition-colors flex items-center justify-between text-left"
                        >
                          <div>
                            <div className="text-xs font-bold text-blue-700">
                              {isKm ? mod.titleKm : mod.titleEn}
                            </div>
                            <div className="text-[11px] text-slate-500 font-medium">
                              {mod.lessons.length} {isKm ? 'មេរៀនវីដេអូ' : 'lessons'}
                            </div>
                          </div>
                          {isExpanded ? <ChevronUp className="w-5 h-5 text-slate-500" /> : <ChevronDown className="w-5 h-5 text-slate-500" />}
                        </button>

                        {isExpanded && (
                          <div className="divide-y divide-slate-100 bg-white">
                            {mod.lessons.map((les) => (
                              <div
                                key={les.id}
                                onClick={() => handleLessonClick(les)}
                                className="p-3.5 sm:px-5 flex items-center justify-between hover:bg-blue-50/50 cursor-pointer transition-colors"
                              >
                                <div className="flex items-center gap-3">
                                  <div className={`p-2 rounded-lg ${
                                    isEnrolled || les.isFreePreview 
                                      ? 'bg-blue-100 text-blue-700' 
                                      : 'bg-slate-100 text-slate-400'
                                  }`}>
                                    {isEnrolled || les.isFreePreview ? <Play className="w-4 h-4 fill-current" /> : <Lock className="w-4 h-4" />}
                                  </div>
                                  <div>
                                    <div className="text-xs sm:text-sm font-semibold text-slate-800">
                                      {isKm ? les.titleKm : les.titleEn}
                                    </div>
                                    {les.isFreePreview && (
                                      <span className="inline-block mt-0.5 text-[10px] font-bold text-emerald-600 bg-emerald-50 px-1.5 py-0.2 rounded border border-emerald-200">
                                        {isKm ? 'មើលឥតគិតថ្លៃ' : 'Free Preview'}
                                      </span>
                                    )}
                                  </div>
                                </div>

                                <div className="text-xs text-slate-500 font-medium flex items-center gap-2">
                                  <span>{les.duration}</span>
                                </div>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Inline Review Section preview inside Syllabus */}
              <div className="pt-6 border-t border-slate-100">
                <ReviewSection
                  course={course}
                  reviews={reviews}
                  user={user}
                  isEnrolled={isEnrolled}
                  onAddReview={onAddReview}
                  onDeleteReview={onDeleteReview}
                  onEnroll={onEnroll}
                  onOpenAuth={onOpenAuth}
                  lang={lang}
                />
              </div>
            </>
          )}

          {/* TAB 2: INSTRUCTOR TAB VIEW */}
          {activeTab === 'instructor' && (
            <div className="space-y-8 animate-in fade-in duration-300">
              
              {/* Teacher Main Header Banner */}
              <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-blue-900 text-white rounded-3xl p-6 sm:p-8 shadow-xl relative overflow-hidden flex flex-col sm:flex-row items-center sm:items-start gap-6 border border-slate-800">
                <div className="relative shrink-0">
                  <img
                    src={course.instructorAvatar}
                    alt={course.instructorName}
                    className="w-24 h-24 sm:w-28 sm:h-28 rounded-2xl object-cover ring-4 ring-blue-400/40 shadow-2xl"
                  />
                  <div className="absolute -bottom-2 -right-2 bg-blue-500 text-white p-1 rounded-xl shadow-md border-2 border-slate-900 flex items-center gap-1 text-[10px] font-bold px-2">
                    <ShieldCheck className="w-3.5 h-3.5 text-amber-300" />
                    <span>{isKm ? 'ផ្ទៀងផ្ទាត់' : 'Verified'}</span>
                  </div>
                </div>

                <div className="text-center sm:text-left space-y-2 flex-1">
                  <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
                    <span className="px-2.5 py-1 rounded-md bg-blue-500/20 text-blue-300 text-[10px] font-bold uppercase tracking-wider border border-blue-400/30">
                      {isKm ? 'គ្រូបង្រៀនជាន់ខ្ពស់' : 'Senior Educator'}
                    </span>
                    {course.instructorExperienceKm && (
                      <span className="px-2.5 py-1 rounded-md bg-emerald-500/20 text-emerald-300 text-[10px] font-bold border border-emerald-400/30">
                        {isKm ? course.instructorExperienceKm : course.instructorExperienceEn}
                      </span>
                    )}
                  </div>

                  <h2 className="text-2xl sm:text-3xl font-extrabold font-heading text-white">{course.instructorName}</h2>
                  <p className="text-xs sm:text-sm text-blue-200 font-medium">{course.instructorRole}</p>

                  {/* Rating & Stats Bar */}
                  <div className="flex flex-wrap items-center justify-center sm:justify-start gap-4 pt-2 text-xs">
                    <div className="flex items-center gap-1 bg-amber-500/20 text-amber-300 px-3 py-1 rounded-xl border border-amber-500/30 font-bold">
                      <Star className="w-4 h-4 fill-amber-400" />
                      <span>{course.instructorRating || course.rating} / 5.0</span>
                    </div>

                    <div className="flex items-center gap-1.5 bg-blue-500/20 text-blue-200 px-3 py-1 rounded-xl border border-blue-400/30 font-bold">
                      <GraduationCap className="w-4 h-4 text-sky-300" />
                      <span>{(course.instructorStudentsCount || 2500).toLocaleString()} {isKm ? 'សិស្សបានរៀន' : 'students'}</span>
                    </div>

                    <div className="flex items-center gap-1.5 bg-purple-500/20 text-purple-200 px-3 py-1 rounded-xl border border-purple-400/30 font-bold">
                      <BookOpen className="w-4 h-4 text-purple-300" />
                      <span>{instructorOtherCourses.length} {isKm ? 'វគ្គសិក្សា' : 'courses'}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Biography & Expertise Grid */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                
                {/* Biography */}
                <div className="md:col-span-2 bg-slate-50 rounded-2xl p-6 border border-slate-200 space-y-3">
                  <h3 className="text-sm font-bold text-slate-900 font-heading flex items-center gap-2">
                    <Briefcase className="w-4 h-4 text-blue-600" />
                    <span>{isKm ? 'អំពីគ្រូបង្រៀន (Biography & Background)' : 'About the Instructor'}</span>
                  </h3>

                  <p className="text-xs text-slate-700 leading-relaxed whitespace-pre-line font-medium">
                    {isKm 
                      ? (course.instructorBioKm || `${course.instructorName} ជាគ្រូបង្រៀនជំនាញដែលមានបទពិសោធន៍ជាច្រើនឆ្នាំក្នុងការបណ្តុះបណ្តាលសិស្ស និងនិស្សិតឱ្យទទួលបានចំណេះដឹងពិតប្រាកដ។`) 
                      : (course.instructorBioEn || `${course.instructorName} is a passionate instructor with years of industry experience mentoring students.`)}
                  </p>
                </div>

                {/* Core Expertise Tags */}
                <div className="bg-slate-50 rounded-2xl p-6 border border-slate-200 space-y-3">
                  <h3 className="text-sm font-bold text-slate-900 font-heading flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-amber-500" />
                    <span>{isKm ? 'ជំនាញ និងឯកទេស' : 'Areas of Expertise'}</span>
                  </h3>

                  <div className="flex flex-wrap gap-2 pt-1">
                    {(course.instructorExpertise || course.tags || ['Teaching', 'Mentorship']).map((exp, idx) => (
                      <span
                        key={idx}
                        className="px-3 py-1 bg-white border border-slate-200 rounded-xl text-xs font-bold text-slate-800 shadow-2xs"
                      >
                        ⚡️ {exp}
                      </span>
                    ))}
                  </div>
                </div>

              </div>

              {/* Other Courses Taught by this Instructor */}
              <div className="space-y-4 pt-4 border-t border-slate-200">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-bold text-slate-900 font-heading">
                      {isKm ? `វគ្គសិក្សាផ្សេងទៀតដោយ ${course.instructorName}` : `Other Courses by ${course.instructorName}`}
                    </h3>
                    <p className="text-xs text-slate-500 mt-0.5">
                      {isKm ? `មានចំនួន ${instructorOtherCourses.length} វគ្គសិក្សាទាក់ទង` : `${instructorOtherCourses.length} courses published`}
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {instructorOtherCourses.map((c) => {
                    const isCurrent = c.id === course.id;
                    return (
                      <div
                        key={c.id}
                        className={`bg-white rounded-2xl border p-4 space-y-3 transition-all flex flex-col justify-between ${
                          isCurrent ? 'border-blue-500 ring-2 ring-blue-500/20 bg-blue-50/20' : 'border-slate-200 hover:border-blue-300 shadow-xs'
                        }`}
                      >
                        <div className="flex gap-3">
                          <img
                            src={c.thumbnail}
                            alt={c.titleKm}
                            className="w-20 h-20 rounded-xl object-cover shrink-0"
                          />
                          <div className="space-y-1 overflow-hidden">
                            <div className="flex items-center gap-1.5">
                              <span className="text-[10px] font-bold text-blue-700 uppercase bg-blue-50 px-1.5 py-0.5 rounded">
                                {c.category}
                              </span>
                              {isCurrent && (
                                <span className="text-[10px] font-bold text-amber-700 bg-amber-50 px-1.5 py-0.5 rounded border border-amber-200">
                                  {isKm ? 'កំពុងមើល' : 'Currently Viewing'}
                                </span>
                              )}
                            </div>
                            <h4 className="text-xs font-bold text-slate-900 line-clamp-2 leading-snug">
                              {isKm ? c.titleKm : c.titleEn}
                            </h4>
                            <div className="flex items-center gap-2 text-[11px] text-slate-500 font-medium pt-1">
                              <span className="text-amber-500 font-bold flex items-center gap-0.5">
                                <Star className="w-3 h-3 fill-amber-400" />
                                {c.rating.toFixed(1)}
                              </span>
                              <span>•</span>
                              <span>{c.totalLessons} {isKm ? 'មេរៀន' : 'lessons'}</span>
                            </div>
                          </div>
                        </div>

                        {!isCurrent && (
                          <button
                            onClick={() => {
                              if (onSelectCourse) {
                                onSelectCourse(c);
                                setActiveTab('syllabus');
                              }
                            }}
                            className="w-full py-2 bg-slate-100 hover:bg-blue-600 hover:text-white text-slate-800 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5"
                          >
                            <span>{isKm ? 'មើលព័ត៌មានវគ្គនេះ' : 'View Course Details'}</span>
                            <ArrowRight className="w-3.5 h-3.5" />
                          </button>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>

            </div>
          )}

          {/* TAB 3: DEDICATED REVIEWS TAB */}
          {activeTab === 'reviews' && (
            <div className="animate-in fade-in duration-300">
              <ReviewSection
                course={course}
                reviews={reviews}
                user={user}
                isEnrolled={isEnrolled}
                onAddReview={onAddReview}
                onDeleteReview={onDeleteReview}
                onEnroll={onEnroll}
                onOpenAuth={onOpenAuth}
                lang={lang}
              />
            </div>
          )}

        </div>

      </div>

    </div>
  );
};

