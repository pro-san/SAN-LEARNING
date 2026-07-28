import React from 'react';
import { User, Course, Certificate } from '../types';
import { BookOpen, Award, Clock, Bookmark, CheckCircle2, User as UserIcon, Play, Mail, ShieldCheck } from 'lucide-react';
import { LearningProgressChart } from './LearningProgressChart';

interface StudentProfileViewProps {
  user: User;
  courses: Course[];
  onSelectCourse: (course: Course) => void;
  onViewCertificate: (cert: Certificate) => void;
  onOpenEmailInbox?: () => void;
  lang: 'km' | 'en';
}

export const StudentProfileView: React.FC<StudentProfileViewProps> = ({
  user,
  courses,
  onSelectCourse,
  onViewCertificate,
  onOpenEmailInbox,
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

      {/* Email Notification Status Bar */}
      {onOpenEmailInbox && (
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200/80 rounded-2xl p-4 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-2xs">
          <div className="flex items-center gap-3 text-left">
            <div className="p-2.5 bg-blue-600 text-white rounded-xl shadow-xs">
              <Mail className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-1.5 text-xs font-bold text-slate-900">
                <span>{isKm ? 'ប្រព័ន្ធអ៊ីម៉ែលជូនដំណឹងវិញ្ញាបនបត្រ' : 'Certificate Email Notification System'}</span>
                <span className="px-1.5 py-0.2 rounded bg-emerald-100 text-emerald-800 text-[10px] font-extrabold flex items-center gap-1">
                  <ShieldCheck className="w-3 h-3 text-emerald-600" />
                  {isKm ? 'សកម្ម' : 'ACTIVE'}
                </span>
              </div>
              <p className="text-[11px] text-slate-600 mt-0.5">
                {isKm 
                  ? `រាល់ពេលបញ្ចប់មេរៀនក្នុងវគ្គសិក្សា ប្រព័ន្ធនឹងផ្ញើអ៊ីម៉ែលជូនដំណឹងទៅ ${user.email}` 
                  : `Automated certificate issuance emails sent directly to ${user.email}`}
              </p>
            </div>
          </div>

          <button
            onClick={onOpenEmailInbox}
            className="w-full sm:w-auto px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold transition-all shadow-xs flex items-center justify-center gap-2 shrink-0 cursor-pointer"
          >
            <Mail className="w-4 h-4" />
            <span>{isKm ? 'ពិនិត្យប្រអប់សំបុត្រអ៊ីម៉ែល' : 'Check Email Inbox'}</span>
          </button>
        </div>
      )}

      {/* Learning Progress Visual Analytics Chart */}
      <LearningProgressChart user={user} courses={courses} lang={lang} />

      {/* Per-Lesson Detailed Time Spent Log */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm space-y-4 transition-colors">
        <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
          <div className="flex items-center gap-2">
            <div className="p-2 bg-indigo-100 dark:bg-indigo-900/50 text-indigo-700 dark:text-indigo-300 rounded-xl">
              <Clock className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-extrabold text-slate-900 dark:text-white font-heading">
                {isKm ? 'កត់ត្រាពេលវេលារៀនតាមមេរៀន (Lesson Time Logs)' : 'Per-Lesson Time Logs'}
              </h3>
              <p className="text-[11px] text-slate-500 dark:text-slate-400">
                {isKm ? 'ពេលវេលាដែលបានសិក្សាពិតប្រាកដក្នុងមេរៀននីមួយៗ' : 'Exact recorded duration spent studying each individual lesson'}
              </p>
            </div>
          </div>
          <span className="text-xs font-mono font-bold px-2.5 py-1 rounded-lg bg-indigo-50 dark:bg-indigo-950/80 text-indigo-700 dark:text-indigo-300 border border-indigo-200/80 dark:border-indigo-800/80">
            {user.totalMinutesLearned} {isKm ? 'នាទីសរុប' : 'Total Mins'}
          </span>
        </div>

        {(() => {
          // Gather all lessons across enrolled courses
          const enrolled = courses.filter(c => user.enrolledCourseIds.includes(c.id));
          const allLessonsWithTime = enrolled.flatMap(course => 
            course.modules.flatMap(mod => 
              mod.lessons.map(les => ({
                courseTitle: isKm ? course.titleKm : course.titleEn,
                lessonId: les.id,
                title: isKm ? les.titleKm : les.titleEn,
                expectedDuration: les.duration,
                secondsSpent: user.lessonTimeSpentSeconds?.[les.id] || 0,
                isCompleted: user.completedLessonIds.includes(les.id)
              }))
            )
          );

          if (allLessonsWithTime.length === 0) {
            return (
              <p className="text-xs text-slate-500 dark:text-slate-400 text-center py-4">
                {isKm ? 'ចុះឈ្មោះវគ្គសិក្សាដើម្បីចាប់ផ្តើមកត់ត្រាពេលវេលារៀន' : 'Enroll in a course to begin tracking lesson study duration.'}
              </p>
            );
          }

          return (
            <div className="space-y-2 max-h-72 overflow-y-auto pr-1">
              {allLessonsWithTime.map((item) => {
                const mins = Math.floor(item.secondsSpent / 60);
                const secs = item.secondsSpent % 60;
                const formatted = mins > 0 ? `${mins}m ${secs}s` : `${secs}s`;

                return (
                  <div key={item.lessonId} className="p-3 bg-slate-50 dark:bg-slate-800/60 rounded-2xl border border-slate-100 dark:border-slate-800 flex items-center justify-between gap-3 text-xs">
                    <div className="flex items-center gap-3 overflow-hidden">
                      <div className={`p-2 rounded-xl shrink-0 ${item.isCompleted ? 'bg-emerald-100 dark:bg-emerald-900/50 text-emerald-700 dark:text-emerald-300' : 'bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-slate-300'}`}>
                        {item.isCompleted ? <CheckCircle2 className="w-4 h-4" /> : <Clock className="w-4 h-4" />}
                      </div>
                      <div className="overflow-hidden">
                        <div className="font-bold text-slate-900 dark:text-slate-100 truncate">{item.title}</div>
                        <div className="text-[10px] text-slate-500 dark:text-slate-400 truncate">{item.courseTitle}</div>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 shrink-0">
                      <span className="text-[10px] text-slate-400 dark:text-slate-500 font-mono hidden sm:inline">
                        {isKm ? 'គោលដៅ' : 'Target'}: {item.expectedDuration}
                      </span>
                      <span className={`px-2.5 py-1 rounded-xl text-xs font-mono font-bold border ${
                        item.secondsSpent > 0 
                          ? 'bg-sky-50 dark:bg-sky-950/80 text-sky-700 dark:text-sky-300 border-sky-200 dark:border-sky-800' 
                          : 'bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 border-slate-200 dark:border-slate-700'
                      }`}>
                        ⏱️ {formatted}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          );
        })()}
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
