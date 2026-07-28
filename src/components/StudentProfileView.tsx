import React from 'react';
import { User, Course, Certificate } from '../types';
import { BookOpen, Award, Clock, Bookmark, CheckCircle2, User as UserIcon, Play } from 'lucide-react';

interface StudentProfileViewProps {
  user: User;
  courses: Course[];
  onSelectCourse: (course: Course) => void;
  onViewCertificate: (cert: Certificate) => void;
  lang: 'km' | 'en';
}

export const StudentProfileView: React.FC<StudentProfileViewProps> = ({
  user,
  courses,
  onSelectCourse,
  onViewCertificate,
  lang,
}) => {
  const isKm = lang === 'km';

  const enrolledCourses = courses.filter(c => user.enrolledCourseIds.includes(c.id));
  const bookmarkedCourses = courses.filter(c => user.bookmarkedCourseIds.includes(c.id));

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Profile Header */}
      <div className="bg-gradient-to-r from-blue-900 via-indigo-900 to-slate-900 text-white rounded-3xl p-6 sm:p-8 shadow-xl flex flex-col sm:flex-row items-center gap-6">
        <img
          src={user.avatarUrl || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80'}
          alt={user.name}
          className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl object-cover ring-4 ring-blue-400/40 shadow-lg"
        />

        <div className="text-center sm:text-left space-y-1 flex-1">
          <span className="px-2.5 py-1 rounded-md bg-blue-500/30 text-blue-200 text-[10px] font-bold uppercase tracking-wider">
            {isKm ? 'គណនីសិស្សអនឡាញ' : 'Student Account'}
          </span>
          <h1 className="text-2xl sm:text-3xl font-extrabold font-heading text-white">{user.name}</h1>
          <p className="text-xs text-slate-300">{user.email}</p>
        </div>

        {/* Learning Stats */}
        <div className="grid grid-cols-3 gap-3 w-full sm:w-auto text-center border-t sm:border-t-0 sm:border-l border-white/10 pt-4 sm:pt-0 sm:pl-6">
          <div className="p-2">
            <div className="text-xl font-bold text-sky-300">{user.enrolledCourseIds.length}</div>
            <div className="text-[10px] text-slate-300">{isKm ? 'វគ្គសិក្សា' : 'Courses'}</div>
          </div>
          <div className="p-2">
            <div className="text-xl font-bold text-emerald-300">{user.completedLessonIds.length}</div>
            <div className="text-[10px] text-slate-300">{isKm ? 'មេរៀនបានរៀន' : 'Lessons'}</div>
          </div>
          <div className="p-2">
            <div className="text-xl font-bold text-amber-300">{user.certificates.length}</div>
            <div className="text-[10px] text-slate-300">{isKm ? 'វិញ្ញាបនបត្រ' : 'Certificates'}</div>
          </div>
        </div>
      </div>

      {/* Enrolled Courses Section */}
      <div className="space-y-4">
        <h2 className="text-lg font-bold text-slate-900 font-heading flex items-center gap-2">
          <BookOpen className="w-5 h-5 text-blue-600" />
          <span>{isKm ? 'វគ្គសិក្សាកំពុងរៀន (Enrolled Courses)' : 'Enrolled Courses'}</span>
        </h2>

        {enrolledCourses.length === 0 ? (
          <div className="p-8 bg-white rounded-2xl border border-slate-200 text-center text-slate-500 text-xs">
            {isKm ? 'អ្នកមិនទាន់បានចុះឈ្មោះវគ្គសិក្សាណាមួយនៅឡើយទេ។' : 'No courses enrolled yet.'}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {enrolledCourses.map((c) => (
              <div key={c.id} className="bg-white rounded-2xl border border-slate-200 p-4 space-y-3 shadow-xs hover:shadow-md transition-all">
                <div className="flex gap-3">
                  <img src={c.thumbnail} alt="" className="w-16 h-16 rounded-xl object-cover shrink-0" />
                  <div className="overflow-hidden">
                    <h3 className="text-xs font-bold text-slate-900 line-clamp-2">{isKm ? c.titleKm : c.titleEn}</h3>
                    <div className="text-[10px] text-slate-500 mt-1">{c.totalLessons} {isKm ? 'មេរៀន' : 'lessons'}</div>
                  </div>
                </div>

                <button
                  onClick={() => onSelectCourse(c)}
                  className="w-full py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5"
                >
                  <Play className="w-3.5 h-3.5 fill-current" />
                  <span>{isKm ? 'ចូលរៀនបន្ត' : 'Continue Watching'}</span>
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Earned Certificates */}
      <div className="space-y-4">
        <h2 className="text-lg font-bold text-slate-900 font-heading flex items-center gap-2">
          <Award className="w-5 h-5 text-amber-500" />
          <span>{isKm ? 'វិញ្ញាបនបត្រទទួលបាន (Certificates Earned)' : 'Earned Certificates'}</span>
        </h2>

        {user.certificates.length === 0 ? (
          <div className="p-8 bg-amber-50/50 rounded-2xl border border-amber-200 text-center text-slate-600 text-xs">
            {isKm ? 'បញ្ចប់មេរៀនទាំងអស់ក្នុងវគ្គសិក្សា ដើម្បីទទួលបានវិញ្ញាបនបត្របញ្ជាក់!' : 'Complete all course lessons to claim your certificate!'}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {user.certificates.map((cert) => (
              <div key={cert.id} className="p-4 bg-white rounded-2xl border border-amber-200 shadow-xs flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-3 bg-amber-100 text-amber-700 rounded-xl">
                    <Award className="w-6 h-6" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-slate-900">{cert.courseTitle}</div>
                    <div className="text-[10px] text-slate-500">{isKm ? 'កាលបរិច្ឆេទ' : 'Issued'}: {cert.issuedDate}</div>
                  </div>
                </div>

                <button
                  onClick={() => onViewCertificate(cert)}
                  className="px-3 py-1.5 bg-amber-500 text-white rounded-xl text-xs font-bold hover:bg-amber-600 shadow-xs"
                >
                  {isKm ? 'មើលវិញ្ញាបនបត្រ' : 'View'}
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

    </div>
  );
};
