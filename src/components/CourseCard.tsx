import React from 'react';
import { Star, Clock, BookOpen, CheckCircle, Bookmark, ArrowRight, Sparkles } from 'lucide-react';
import { Course } from '../types';

interface CourseCardProps {
  course: Course;
  isEnrolled: boolean;
  isBookmarked: boolean;
  onSelectCourse: (course: Course) => void;
  onEnroll: (course: Course) => void;
  onToggleBookmark: (courseId: string) => void;
  lang: 'km' | 'en';
}

export const CourseCard: React.FC<CourseCardProps> = ({
  course,
  isEnrolled,
  isBookmarked,
  onSelectCourse,
  onEnroll,
  onToggleBookmark,
  lang
}) => {
  const isKm = lang === 'km';

  return (
    <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col overflow-hidden group">
      
      {/* Thumbnail & Badges */}
      <div className="relative aspect-video overflow-hidden bg-slate-100 dark:bg-slate-800 cursor-pointer" onClick={() => onSelectCourse(course)}>
        <img
          src={course.thumbnail}
          alt={course.titleKm}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent"></div>

        {/* Top Badges */}
        <div className="absolute top-3 left-3 flex flex-wrap gap-1.5 z-10">
          <span className={`px-2.5 py-1 rounded-lg text-[11px] font-bold shadow-sm ${
            course.isFree 
              ? 'bg-emerald-500 text-white' 
              : 'bg-blue-600 text-white'
          }`}>
            {course.isFree ? (isKm ? 'ឥតគិតថ្លៃ' : 'Free') : `$${course.price}`}
          </span>

          <span className="px-2.5 py-1 rounded-lg text-[11px] font-semibold bg-slate-900/80 text-slate-100 backdrop-blur-md">
            {isKm ? course.levelKm : course.levelEn}
          </span>
        </div>

        {/* Bookmark Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onToggleBookmark(course.id);
          }}
          className={`absolute top-3 right-3 p-2 rounded-xl backdrop-blur-md transition-all z-10 ${
            isBookmarked
              ? 'bg-amber-500 text-white shadow-md'
              : 'bg-slate-900/40 text-slate-200 hover:bg-slate-900/80 hover:text-white'
          }`}
          title={isBookmarked ? 'បានរក្សាទុក' : 'រក្សាទុកវគ្គសិក្សា'}
        >
          <Bookmark className={`w-4 h-4 ${isBookmarked ? 'fill-current' : ''}`} />
        </button>

        {/* Bottom Thumbnail Overlay info */}
        <div className="absolute bottom-2.5 left-3 right-3 flex items-center justify-between text-xs text-slate-200 z-10 font-medium">
          <div className="flex items-center gap-1 bg-slate-900/60 px-2 py-0.5 rounded-md backdrop-blur-xs">
            <Clock className="w-3.5 h-3.5 text-sky-400" />
            <span>{course.totalHours} {isKm ? 'ម៉ោង' : 'hrs'}</span>
          </div>
          <div className="flex items-center gap-1 bg-slate-900/60 px-2 py-0.5 rounded-md backdrop-blur-xs">
            <BookOpen className="w-3.5 h-3.5 text-emerald-400" />
            <span>{course.totalLessons} {isKm ? 'មេរៀន' : 'lessons'}</span>
          </div>
        </div>
      </div>

      {/* Course Body Info */}
      <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between space-y-4">
        
        <div>
          {/* Rating & Review */}
          <div className="flex items-center justify-between text-xs mb-2">
            <div className="flex items-center gap-1 text-amber-500 font-bold">
              <Star className="w-4 h-4 fill-amber-400" />
              <span>{course.rating.toFixed(1)}</span>
              <span className="text-slate-400 font-normal">({course.reviewCount})</span>
            </div>
            {course.isPopular && (
              <span className="px-2 py-0.5 bg-amber-50 dark:bg-amber-950/50 text-amber-700 dark:text-amber-300 font-bold text-[10px] rounded-md border border-amber-200 dark:border-amber-800 flex items-center gap-1">
                <Sparkles className="w-3 h-3 text-amber-500" />
                {isKm ? 'ពេញនិយម' : 'Popular'}
              </span>
            )}
          </div>

          {/* Title */}
          <h3 
            onClick={() => onSelectCourse(course)}
            className="text-base font-bold text-slate-900 dark:text-slate-100 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors line-clamp-2 leading-snug cursor-pointer font-heading"
          >
            {isKm ? course.titleKm : course.titleEn}
          </h3>

          <p className="text-xs text-slate-500 dark:text-slate-400 mt-2 line-clamp-2 leading-relaxed">
            {isKm ? course.descriptionKm : course.descriptionEn}
          </p>
        </div>

        {/* Instructor & Actions */}
        <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between gap-2">
          
          <div className="flex items-center gap-2">
            <img
              src={course.instructorAvatar}
              alt={course.instructorName}
              className="w-7 h-7 rounded-full object-cover ring-1 ring-slate-200 dark:ring-slate-700"
            />
            <div className="text-[11px] font-semibold text-slate-700 dark:text-slate-300 truncate max-w-[120px]">
              {course.instructorName}
            </div>
          </div>

          {/* Main Action Button */}
          {isEnrolled ? (
            <button
              onClick={() => onSelectCourse(course)}
              className="px-3 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold transition-all shadow-xs flex items-center gap-1"
            >
              <CheckCircle className="w-3.5 h-3.5" />
              <span>{isKm ? 'ចូលរៀន' : 'Watch'}</span>
            </button>
          ) : (
            <button
              onClick={() => onEnroll(course)}
              className="px-3.5 py-1.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold transition-all shadow-xs flex items-center gap-1 group-hover:translate-x-0.5"
            >
              <span>{isKm ? 'ចុះឈ្មោះ' : 'Enroll'}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          )}

        </div>

      </div>

    </div>
  );
};
