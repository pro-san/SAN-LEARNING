import React, { useState, useEffect } from 'react';
import { INITIAL_COURSES } from './data/coursesData';
import { INITIAL_REVIEWS } from './data/reviewsData';
import { Course, Lesson, User, LessonNote, Certificate, CourseReview, SimulatedEmail } from './types';
import { Navbar } from './components/Navbar';
import { HeroBanner } from './components/HeroBanner';
import { CourseCard } from './components/CourseCard';
import { CourseDetailsModal } from './components/CourseDetailsModal';
import { VideoPlayerLessonView } from './components/VideoPlayerLessonView';
import { AiTutorDrawer } from './components/AiTutorDrawer';
import { AuthModal } from './components/AuthModal';
import { CertificateModal } from './components/CertificateModal';
import { StudentProfileView } from './components/StudentProfileView';
import { EmailNotificationModal } from './components/EmailNotificationModal';
import { EmailToastNotification } from './components/EmailToastNotification';
import { initAuth, logoutUser, setAccessToken } from './services/auth';
import { BookOpen, Sparkles, GraduationCap, CheckCircle2 } from 'lucide-react';

const INITIAL_EMAILS: SimulatedEmail[] = [
  {
    id: 'email-welcome-1',
    toEmail: 'student@prolearning.edu.kh',
    fromName: 'PRO LEARNING Certificate Office',
    fromEmail: 'certificates@prolearning.edu.kh',
    subject: '🎓 ស្វាគមន៍មកកាន់ PRO LEARNING! ប្រព័ន្ធវិញ្ញាបនបត្រ និងអ៊ីម៉ែលជូនដំណឹង',
    bodyText: 'ស្វាគមន៍មកកាន់ប្រព័ន្ធសិក្សាអនឡាញ PRO LEARNING! នៅពេលអ្នករៀនបញ្ចប់មេរៀនទាំងអស់ក្នុងវគ្គសិក្សាណាមួយ ប្រព័ន្ធនឹងផ្ញើអ៊ីម៉ែលជូនដំណឹងអំពីការទទួលបានវិញ្ញាបនបត្រផ្លូវការដោយស្វ័យប្រវត្តិ។',
    bodyHtml: '',
    sentAt: '09:00 AM',
    isRead: false,
  }
];

export default function App() {
  const [lang, setLang] = useState<'km' | 'en'>('km');
  const [activeTab, setActiveTab] = useState<string>('courses');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  // Initial user state with local persistence
  const [user, setUser] = useState<User | null>(() => {
    const saved = localStorage.getItem('elearning_user');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) {}
    }
    return {
      id: 'student-demo-1',
      name: 'សុខ សុភា (Sophea Sok)',
      email: 'sophea.sok@gmail.com',
      avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
      role: 'student',
      enrolledCourseIds: ['course-web-dev', 'course-bac2-math'],
      completedLessonIds: ['les-1-1'],
      bookmarkedCourseIds: ['course-english-comm'],
      totalMinutesLearned: 145,
      certificates: [
        {
          id: 'cert-1',
          courseId: 'course-web-dev',
          courseTitle: 'មូលដ្ឋានគ្រឹះនៃការសរសេរកូដ Web Development (HTML, CSS, JS & React)',
          studentName: 'សុខ សុភា (Sophea Sok)',
          issuedDate: '2026-07-28',
          code: 'KH-EDU-884920'
        }
      ]
    };
  });

  // Active video viewing state
  const [activeCourse, setActiveCourse] = useState<Course | null>(null);
  const [activeLesson, setActiveLesson] = useState<Lesson | null>(null);

  // Modals state
  const [selectedCourseModal, setSelectedCourseModal] = useState<Course | null>(null);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isAiTutorOpen, setIsAiTutorOpen] = useState(false);
  const [activeCertificate, setActiveCertificate] = useState<Certificate | null>(null);

  // Notes state
  const [notes, setNotes] = useState<LessonNote[]>(() => {
    const saved = localStorage.getItem('elearning_notes');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) {}
    }
    return [
      {
        id: 'n-1',
        courseId: 'course-web-dev',
        lessonId: 'les-1-1',
        timestampSeconds: 45,
        noteText: 'Client-Server architecture: Browser ផ្ញើ HTTP Request ទៅកាន់ Server ដើម្បីទាញយក HTML files',
        createdAt: '2026-07-28'
      }
    ];
  });

  // Reviews state
  const [reviews, setReviews] = useState<CourseReview[]>(() => {
    const saved = localStorage.getItem('elearning_reviews');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) {}
    }
    return INITIAL_REVIEWS;
  });

  // Emails simulation state
  const [emails, setEmails] = useState<SimulatedEmail[]>(() => {
    const saved = localStorage.getItem('elearning_emails');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) {}
    }
    return INITIAL_EMAILS;
  });

  const [isEmailModalOpen, setIsEmailModalOpen] = useState<boolean>(false);
  const [emailToast, setEmailToast] = useState<{ email: SimulatedEmail; visible: boolean } | null>(null);

  // Save user & notes & reviews & emails state
  useEffect(() => {
    if (user) {
      localStorage.setItem('elearning_user', JSON.stringify(user));
    } else {
      localStorage.removeItem('elearning_user');
    }
  }, [user]);

  useEffect(() => {
    localStorage.setItem('elearning_notes', JSON.stringify(notes));
  }, [notes]);

  useEffect(() => {
    localStorage.setItem('elearning_reviews', JSON.stringify(reviews));
  }, [reviews]);

  useEffect(() => {
    localStorage.setItem('elearning_emails', JSON.stringify(emails));
  }, [emails]);

  const handleMarkEmailRead = (emailId: string) => {
    setEmails(prev => prev.map(e => e.id === emailId ? { ...e, isRead: true } : e));
  };

  const handleDeleteEmail = (emailId: string) => {
    setEmails(prev => prev.filter(e => e.id !== emailId));
  };

  const handleSendTestEmail = () => {
    const sampleCourse = INITIAL_COURSES[0];
    const testCertCode = `KH-EDU-${Math.floor(100000 + Math.random() * 900000)}`;
    const nowFormatted = new Date().toLocaleTimeString('km-KH', { hour: '2-digit', minute: '2-digit' });
    
    const testEmail: SimulatedEmail = {
      id: `email-${Date.now()}`,
      toEmail: user?.email || 'student@prolearning.edu.kh',
      fromName: 'PRO LEARNING Certificate Office',
      fromEmail: 'certificates@prolearning.edu.kh',
      subject: lang === 'km'
        ? `🎓 [សាកល្បង] អបអរសាទរ! អ្នកបានបញ្ចប់វគ្គសិក្សា ${sampleCourse.titleKm}`
        : `🎓 [TEST] Congratulations! You completed ${sampleCourse.titleEn}`,
      bodyText: lang === 'km'
        ? `នេះជាអ៊ីម៉ែលគំរូសាកល្បង៖ សូមអបអរសាទរ ${user?.name || 'សិស្សជាទីស្រឡាញ់'}! អ្នកបានបញ្ចប់វគ្គសិក្សា "${sampleCourse.titleKm}" ដោយជោគជ័យ និងទទួលបានវិញ្ញាបនបត្រផ្លូវការលេខកូដ ${testCertCode}។`
        : `This is a test notification email: Hearty congratulations ${user?.name || 'Student'}! You have completed "${sampleCourse.titleEn}" and earned your official certificate with code ${testCertCode}.`,
      bodyHtml: '',
      sentAt: nowFormatted,
      isRead: false,
      courseId: sampleCourse.id,
      courseTitle: lang === 'km' ? sampleCourse.titleKm : sampleCourse.titleEn,
      certificateCode: testCertCode,
    };

    if (user) {
      setUser(prev => {
        if (!prev) return null;
        if (prev.certificates.some(c => c.code === testCertCode)) return prev;
        const newCert: Certificate = {
          id: `cert-${Date.now()}`,
          courseId: sampleCourse.id,
          courseTitle: sampleCourse.titleKm,
          studentName: prev.name,
          issuedDate: new Date().toISOString().split('T')[0],
          code: testCertCode,
        };
        return {
          ...prev,
          certificates: [newCert, ...prev.certificates]
        };
      });
    }

    setEmails(prev => [testEmail, ...prev]);
    setEmailToast({ email: testEmail, visible: true });
  };

  const handleViewCertificateFromEmail = (code?: string) => {
    if (!code) {
      if (user?.certificates.length) {
        setActiveCertificate(user.certificates[0]);
      }
      return;
    }

    const existingCert = user?.certificates.find(c => c.code === code);
    if (existingCert) {
      setActiveCertificate(existingCert);
    } else {
      const sampleCert: Certificate = {
        id: `cert-view-${Date.now()}`,
        courseId: 'course-web-dev',
        courseTitle: INITIAL_COURSES[0].titleKm,
        studentName: user?.name || 'សិស្សកម្ពុជា',
        issuedDate: new Date().toISOString().split('T')[0],
        code: code
      };
      setActiveCertificate(sampleCert);
    }
  };

  const handleAddReview = (newReviewData: Omit<CourseReview, 'id' | 'createdAt'>) => {
    const nowFormatted = new Date().toLocaleDateString('km-KH', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });

    setReviews((prev) => {
      const existingIndex = prev.findIndex(
        (r) => r.courseId === newReviewData.courseId && r.userId === newReviewData.userId
      );

      if (existingIndex >= 0) {
        const updated = [...prev];
        updated[existingIndex] = {
          ...updated[existingIndex],
          rating: newReviewData.rating,
          comment: newReviewData.comment,
          createdAt: nowFormatted,
        };
        return updated;
      }

      const newRev: CourseReview = {
        ...newReviewData,
        id: `rev-${Date.now()}`,
        createdAt: nowFormatted,
      };
      return [newRev, ...prev];
    });
  };

  const handleDeleteReview = (reviewId: string) => {
    setReviews((prev) => prev.filter((r) => r.id !== reviewId));
  };

  // Firebase Auth state initialization listener
  useEffect(() => {
    initAuth((fbUser, token) => {
      if (fbUser) {
        setAccessToken(token);
        setUser(prev => ({
          id: fbUser.uid,
          name: fbUser.displayName || prev?.name || 'សិស្សអនឡាញ',
          email: fbUser.email || prev?.email || '',
          avatarUrl: fbUser.photoURL || prev?.avatarUrl,
          role: 'student',
          enrolledCourseIds: prev?.enrolledCourseIds || ['course-web-dev'],
          completedLessonIds: prev?.completedLessonIds || [],
          bookmarkedCourseIds: prev?.bookmarkedCourseIds || [],
          totalMinutesLearned: prev?.totalMinutesLearned || 30,
          certificates: prev?.certificates || [],
          isGoogleAuthenticated: true,
          googleAccessToken: token
        }));
      }
    });
  }, []);

  const isKm = lang === 'km';

  // Course Filter logic
  const filteredCourses = INITIAL_COURSES.filter((c) => {
    const matchesCategory = selectedCategory === 'all' || c.category === selectedCategory;
    const query = searchQuery.toLowerCase().trim();
    const matchesSearch = !query || 
      c.titleKm.toLowerCase().includes(query) || 
      c.titleEn.toLowerCase().includes(query) ||
      c.instructorName.toLowerCase().includes(query) ||
      c.tags.some(t => t.toLowerCase().includes(query));
    return matchesCategory && matchesSearch;
  });

  // Enroll handler
  const handleEnroll = (course: Course) => {
    if (!user) {
      setIsAuthModalOpen(true);
      return;
    }

    if (!user.enrolledCourseIds.includes(course.id)) {
      setUser(prev => prev ? {
        ...prev,
        enrolledCourseIds: [...prev.enrolledCourseIds, course.id]
      } : null);
    }

    // Start first lesson
    const firstLesson = course.modules[0]?.lessons[0];
    if (firstLesson) {
      setActiveCourse(course);
      setActiveLesson(firstLesson);
    }
  };

  // Toggle Bookmark
  const handleToggleBookmark = (courseId: string) => {
    if (!user) {
      setIsAuthModalOpen(true);
      return;
    }

    setUser(prev => {
      if (!prev) return null;
      const exists = prev.bookmarkedCourseIds.includes(courseId);
      return {
        ...prev,
        bookmarkedCourseIds: exists 
          ? prev.bookmarkedCourseIds.filter(id => id !== courseId)
          : [...prev.bookmarkedCourseIds, courseId]
      };
    });
  };

  // Update time spent on individual lesson
  const handleUpdateLessonTimeSpent = (lessonId: string, secondsIncrement: number) => {
    if (!user) return;
    setUser(prev => {
      if (!prev) return null;
      const currentMap = prev.lessonTimeSpentSeconds || {};
      const previousSecs = currentMap[lessonId] || 0;
      const newSecs = previousSecs + secondsIncrement;
      const updatedMap = {
        ...currentMap,
        [lessonId]: newSecs
      };

      // Sum all seconds spent across all lessons
      const totalSecsAll = (Object.values(updatedMap) as number[]).reduce((acc: number, curr: number) => acc + curr, 0);
      const calculatedTotalMinutes = Math.floor(totalSecsAll / 60);

      return {
        ...prev,
        lessonTimeSpentSeconds: updatedMap,
        totalMinutesLearned: Math.max(prev.totalMinutesLearned, calculatedTotalMinutes)
      };
    });
  };

  // Mark lesson as completed
  const handleMarkLessonCompleted = (lessonId: string) => {
    if (!user) return;
    setUser(prev => {
      if (!prev) return null;
      const isCompleted = prev.completedLessonIds.includes(lessonId);
      const newCompleted = isCompleted 
        ? prev.completedLessonIds.filter(id => id !== lessonId)
        : [...prev.completedLessonIds, lessonId];
      
      // Check if all lessons of activeCourse are completed to generate certificate & send email
      if (activeCourse && !isCompleted) {
        const allLessonIds = activeCourse.modules.flatMap(m => m.lessons.map(l => l.id));
        const hasAll = allLessonIds.every(id => newCompleted.includes(id) || id === lessonId);
        
        let updatedCertificates = [...prev.certificates];
        if (hasAll && !updatedCertificates.some(cert => cert.courseId === activeCourse.id)) {
          const newCert: Certificate = {
            id: `cert-${Date.now()}`,
            courseId: activeCourse.id,
            courseTitle: activeCourse.titleKm,
            studentName: prev.name,
            issuedDate: new Date().toISOString().split('T')[0],
            code: `KH-EDU-${Math.floor(100000 + Math.random() * 900000)}`
          };
          updatedCertificates.push(newCert);
          setActiveCertificate(newCert);

          // Dispatch simulated email notification!
          const nowFormatted = new Date().toLocaleTimeString('km-KH', { hour: '2-digit', minute: '2-digit' });
          const certEmail: SimulatedEmail = {
            id: `email-${Date.now()}`,
            toEmail: prev.email || 'student@prolearning.edu.kh',
            fromName: 'PRO LEARNING Certificate Office',
            fromEmail: 'certificates@prolearning.edu.kh',
            subject: lang === 'km'
              ? `🎓 អបអរសាទរ! អ្នកបានបញ្ចប់វគ្គសិក្សា ${activeCourse.titleKm} និងទទួលបានវិញ្ញាបនបត្រ`
              : `🎓 Congratulations! You completed ${activeCourse.titleEn} and earned a Certificate`,
            bodyText: lang === 'km'
              ? `សូមអបអរសាទរ ${prev.name}! អ្នកបានរៀន និងបញ្ចប់មេរៀនទាំងអស់ក្នុងវគ្គសិក្សា "${activeCourse.titleKm}" ដោយជោគជ័យ។ វិញ្ញាបនបត្រផ្លូវការលេខកូដ ${newCert.code} ត្រូវប្រគល់ជូនអ្នក។`
              : `Hearty congratulations ${prev.name}! You have successfully completed all lessons in "${activeCourse.titleEn}". Your official certificate (Code: ${newCert.code}) has been issued.`,
            bodyHtml: '',
            sentAt: nowFormatted,
            isRead: false,
            courseId: activeCourse.id,
            courseTitle: lang === 'km' ? activeCourse.titleKm : activeCourse.titleEn,
            certificateCode: newCert.code,
          };

          setEmails(existing => [certEmail, ...existing]);
          setEmailToast({ email: certEmail, visible: true });
        }

        return { ...prev, completedLessonIds: newCompleted, certificates: updatedCertificates };
      }

      return { ...prev, completedLessonIds: newCompleted };
    });
  };

  // Note management
  const handleAddNote = (noteText: string, timestampSeconds: number) => {
    if (!activeCourse || !activeLesson) return;
    const newNote: LessonNote = {
      id: `note-${Date.now()}`,
      courseId: activeCourse.id,
      lessonId: activeLesson.id,
      timestampSeconds,
      noteText,
      createdAt: new Date().toLocaleDateString()
    };
    setNotes(prev => [newNote, ...prev]);
  };

  const handleDeleteNote = (noteId: string) => {
    setNotes(prev => prev.filter(n => n.id !== noteId));
  };

  const handleLogout = async () => {
    await logoutUser();
    setUser(null);
  };

  // IF WATCHING LESSON VIDEO -> RENDER VIDEO PLAYER VIEW
  if (activeCourse && activeLesson) {
    const currentNotes = notes.filter(n => n.lessonId === activeLesson.id);
    const isCompleted = user?.completedLessonIds.includes(activeLesson.id) || false;

    return (
      <VideoPlayerLessonView
        course={activeCourse}
        currentLesson={activeLesson}
        user={user}
        onSelectLesson={(les) => setActiveLesson(les)}
        onBackToCourse={() => {
          setActiveLesson(null);
          setActiveCourse(null);
        }}
        onMarkLessonCompleted={handleMarkLessonCompleted}
        isLessonCompleted={isCompleted}
        notes={currentNotes}
        onAddNote={handleAddNote}
        onDeleteNote={handleDeleteNote}
        onUpdateLessonTimeSpent={handleUpdateLessonTimeSpent}
        lang={lang}
      />
    );
  }

  // STANDARD PLATFORM VIEW
  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 flex flex-col font-sans selection:bg-blue-500 selection:text-white">
      
      {/* Navigation Header */}
      <Navbar
        user={user}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        lang={lang}
        setLang={setLang}
        onOpenAuth={() => setIsAuthModalOpen(true)}
        onLogout={handleLogout}
        onOpenAiTutor={() => setIsAiTutorOpen(true)}
        onOpenEmailInbox={() => setIsEmailModalOpen(true)}
        unreadEmailCount={emails.filter(e => !e.isRead).length}
      />

      {/* Main View Switcher */}
      <main className="flex-1">
        
        {activeTab === 'courses' && (
          <>
            {/* Hero Banner with Search */}
            <HeroBanner
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
              selectedCategory={selectedCategory}
              setSelectedCategory={setSelectedCategory}
              lang={lang}
              onOpenAiTutor={() => setIsAiTutorOpen(true)}
            />

            {/* Course Catalog Grid Section */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-6">
              
              <div className="flex items-center justify-between border-b border-slate-200 pb-4">
                <div>
                  <h2 className="text-xl sm:text-2xl font-bold text-slate-900 font-heading">
                    {isKm ? 'បញ្ជីមេរៀន និងវគ្គសិក្សា' : 'Course Catalog'}
                  </h2>
                  <p className="text-xs text-slate-500 mt-0.5">
                    {isKm ? `បង្ហាញវគ្គសិក្សា ${filteredCourses.length} ក្នុងចំណោម ${INITIAL_COURSES.length}` : `Showing ${filteredCourses.length} courses`}
                  </p>
                </div>
              </div>

              {/* Grid of Courses */}
              {filteredCourses.length === 0 ? (
                <div className="p-12 text-center bg-white rounded-3xl border border-slate-200 shadow-xs space-y-3">
                  <BookOpen className="w-10 h-10 text-slate-300 mx-auto" />
                  <h3 className="text-sm font-bold text-slate-700">
                    {isKm ? 'រកមិនឃើញវគ្គសិក្សាដែលត្រូវគ្នាទេ' : 'No courses match your search criteria'}
                  </h3>
                  <button
                    onClick={() => { setSearchQuery(''); setSelectedCategory('all'); }}
                    className="px-4 py-2 bg-blue-600 text-white rounded-xl text-xs font-bold"
                  >
                    {isKm ? 'បង្ហាញមេរៀនទាំងអស់' : 'Clear Filters'}
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredCourses.map((course) => {
                    const isEnrolled = user?.enrolledCourseIds.includes(course.id) || false;
                    const isBookmarked = user?.bookmarkedCourseIds.includes(course.id) || false;

                    return (
                      <CourseCard
                        key={course.id}
                        course={course}
                        isEnrolled={isEnrolled}
                        isBookmarked={isBookmarked}
                        onSelectCourse={(c) => setSelectedCourseModal(c)}
                        onEnroll={handleEnroll}
                        onToggleBookmark={handleToggleBookmark}
                        lang={lang}
                      />
                    );
                  })}
                </div>
              )}

            </section>
          </>
        )}

        {/* MY COURSES TAB */}
        {activeTab === 'my-courses' && user && (
          <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-6">
            <h1 className="text-2xl font-bold text-slate-900 font-heading">
              {isKm ? 'មេរៀនរបស់ខ្ញុំ (My Enrolled Courses)' : 'My Enrolled Courses'}
            </h1>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {INITIAL_COURSES.filter(c => user.enrolledCourseIds.includes(c.id)).map((course) => (
                <CourseCard
                  key={course.id}
                  course={course}
                  isEnrolled={true}
                  isBookmarked={user.bookmarkedCourseIds.includes(course.id)}
                  onSelectCourse={(c) => {
                    const firstLes = c.modules[0]?.lessons[0];
                    if (firstLes) {
                      setActiveCourse(c);
                      setActiveLesson(firstLes);
                    }
                  }}
                  onEnroll={handleEnroll}
                  onToggleBookmark={handleToggleBookmark}
                  lang={lang}
                />
              ))}
            </div>
          </section>
        )}

        {/* STUDENT PROFILE TAB */}
        {activeTab === 'profile' && user && (
          <StudentProfileView
            user={user}
            courses={INITIAL_COURSES}
            onSelectCourse={(c) => {
              const firstLes = c.modules[0]?.lessons[0];
              if (firstLes) {
                setActiveCourse(c);
                setActiveLesson(firstLes);
              }
            }}
            onViewCertificate={(cert) => setActiveCertificate(cert)}
            onOpenEmailInbox={() => setIsEmailModalOpen(true)}
            lang={lang}
          />
        )}

        {/* CERTIFICATES TAB */}
        {activeTab === 'certificates' && user && (
          <section className="max-w-5xl mx-auto px-4 py-10 space-y-6">
            <h1 className="text-2xl font-bold text-slate-900 font-heading">
              {isKm ? 'វិញ្ញាបនបត្ររបស់ខ្ញុំ' : 'My Certificates'}
            </h1>

            {user.certificates.length === 0 ? (
              <div className="p-8 bg-white rounded-2xl border border-slate-200 text-center text-slate-500 text-xs">
                {isKm ? 'អ្នកមិនទាន់មានវិញ្ញាបនបត្រនៅឡើយទេ។ សូមសិក្សាបញ្ចប់វគ្គសិក្សា!' : 'No certificates earned yet.'}
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {user.certificates.map((cert) => (
                  <div key={cert.id} className="p-4 bg-white rounded-2xl border border-amber-200 shadow-xs flex items-center justify-between">
                    <div>
                      <div className="text-xs font-bold text-slate-900">{cert.courseTitle}</div>
                      <div className="text-[10px] text-slate-500">{cert.issuedDate} • {cert.code}</div>
                    </div>
                    <button
                      onClick={() => setActiveCertificate(cert)}
                      className="px-3 py-1.5 bg-amber-500 text-white rounded-xl text-xs font-bold hover:bg-amber-600"
                    >
                      {isKm ? 'មើល' : 'View'}
                    </button>
                  </div>
                ))}
              </div>
            )}
          </section>
        )}

      </main>

      {/* Modals & Drawers */}
      <CourseDetailsModal
        course={selectedCourseModal}
        isOpen={!!selectedCourseModal}
        onClose={() => setSelectedCourseModal(null)}
        isEnrolled={user?.enrolledCourseIds.includes(selectedCourseModal?.id || '') || false}
        onEnroll={handleEnroll}
        onStartLesson={(course, lesson) => {
          setActiveCourse(course);
          setActiveLesson(lesson);
        }}
        onSelectCourse={(course) => setSelectedCourseModal(course)}
        allCourses={INITIAL_COURSES}
        lang={lang}
        reviews={reviews}
        user={user}
        onAddReview={handleAddReview}
        onDeleteReview={handleDeleteReview}
        onOpenAuth={() => setIsAuthModalOpen(true)}
      />

      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        onLoginSuccess={(u) => setUser(u)}
        lang={lang}
      />

      <AiTutorDrawer
        isOpen={isAiTutorOpen}
        onClose={() => setIsAiTutorOpen(false)}
        lang={lang}
      />

      <CertificateModal
        certificate={activeCertificate}
        isOpen={!!activeCertificate}
        onClose={() => setActiveCertificate(null)}
        lang={lang}
      />

      <EmailNotificationModal
        isOpen={isEmailModalOpen}
        onClose={() => setIsEmailModalOpen(false)}
        emails={emails}
        onMarkAsRead={handleMarkEmailRead}
        onDeleteEmail={handleDeleteEmail}
        onViewCertificate={handleViewCertificateFromEmail}
        onSendTestEmail={handleSendTestEmail}
        user={user}
        certificates={user?.certificates || []}
        lang={lang}
      />

      <EmailToastNotification
        toast={emailToast}
        onClose={() => setEmailToast(null)}
        onOpenInbox={() => setIsEmailModalOpen(true)}
        onViewCertificate={handleViewCertificateFromEmail}
        lang={lang}
      />

      {/* Footer */}
      <footer className="bg-slate-900 text-slate-400 py-8 border-t border-slate-800 text-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <GraduationCap className="w-5 h-5 text-blue-400" />
            <span className="font-extrabold text-white font-heading tracking-wide">PRO LEARNING</span>
            <span>- Online Learning Platform</span>
          </div>

          <p className="text-[11px] text-slate-500">
            © 2026 {isKm ? 'រក្សាសិទ្ធិគ្រប់យ៉ាងដោយ PRO LEARNING' : 'All rights reserved by PRO LEARNING.'}
          </p>
        </div>
      </footer>

    </div>
  );
}
