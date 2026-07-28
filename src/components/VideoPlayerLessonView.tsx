import React, { useState, useRef, useEffect } from 'react';
import { 
  Play, 
  Pause, 
  Volume2, 
  VolumeX, 
  Maximize, 
  RotateCcw, 
  RotateCw, 
  CheckCircle2, 
  BookOpen, 
  MessageSquare, 
  FileText, 
  HelpCircle, 
  Sparkles, 
  Bookmark, 
  Download, 
  Send, 
  Plus, 
  Trash2, 
  ChevronLeft, 
  Settings,
  ArrowRight,
  Clock,
  Award
} from 'lucide-react';
import { Course, Lesson, LessonNote, DiscussionMessage, QuizQuestion, User } from '../types';

interface VideoPlayerLessonViewProps {
  course: Course;
  currentLesson: Lesson;
  user: User | null;
  onSelectLesson: (lesson: Lesson) => void;
  onBackToCourse: () => void;
  onMarkLessonCompleted: (lessonId: string) => void;
  isLessonCompleted: boolean;
  notes: LessonNote[];
  onAddNote: (noteText: string, timestamp: number) => void;
  onDeleteNote: (noteId: string) => void;
  lang: 'km' | 'en';
}

export const VideoPlayerLessonView: React.FC<VideoPlayerLessonViewProps> = ({
  course,
  currentLesson,
  user,
  onSelectLesson,
  onBackToCourse,
  onMarkLessonCompleted,
  isLessonCompleted,
  notes,
  onAddNote,
  onDeleteNote,
  lang,
}) => {
  const isKm = lang === 'km';
  const videoRef = useRef<HTMLVideoElement>(null);

  // Player state
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);
  const [isMuted, setIsMuted] = useState(false);
  const [playbackSpeed, setPlaybackSpeed] = useState(1);
  const [activeBottomTab, setActiveBottomTab] = useState<'overview' | 'notes' | 'discussion' | 'resources' | 'quiz'>('overview');

  // Notes state
  const [newNoteText, setNewNoteText] = useState('');

  // AI & Discussion state
  const [discussions, setDiscussions] = useState<DiscussionMessage[]>([
    {
      id: 'd-1',
      lessonId: currentLesson.id,
      userName: 'លោកគ្រូ សុខ ចាន់ដារ៉ា',
      userAvatar: course.instructorAvatar,
      text: isKm ? 'សូមស្វាគមន៍មកកាន់មេរៀន! បើមានឆ្ងល់ ឬមិនយល់ត្រង់ណា អាចសួរក្នុងប្រអប់ខាងក្រោមបាន!' : 'Welcome to the lesson! Feel free to ask any questions below.',
      createdAt: '10 នាទីមុន',
      isAiReply: false
    }
  ]);
  const [discussionInput, setDiscussionInput] = useState('');
  const [isAskingAi, setIsAskingAi] = useState(false);

  // Quiz state
  const [quizAnswers, setQuizAnswers] = useState<Record<number, number>>({});
  const [quizSubmitted, setQuizSubmitted] = useState(false);

  // Reset quiz state when lesson changes
  useEffect(() => {
    setQuizAnswers({});
    setQuizSubmitted(false);
  }, [currentLesson.id]);

  // Video Time updates
  const handleTimeUpdate = () => {
    if (videoRef.current) {
      setCurrentTime(videoRef.current.currentTime);
    }
  };

  const handleLoadedMetadata = () => {
    if (videoRef.current) {
      setDuration(videoRef.current.duration);
    }
  };

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const time = parseFloat(e.target.value);
    if (videoRef.current) {
      videoRef.current.currentTime = time;
      setCurrentTime(time);
    }
  };

  const handleSpeedChange = (speed: number) => {
    setPlaybackSpeed(speed);
    if (videoRef.current) {
      videoRef.current.playbackRate = speed;
    }
  };

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const handleFullscreen = () => {
    if (videoRef.current) {
      if (videoRef.current.requestFullscreen) {
        videoRef.current.requestFullscreen();
      }
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  // Add Note
  const handleSaveNote = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newNoteText.trim()) return;
    onAddNote(newNoteText.trim(), Math.floor(currentTime));
    setNewNoteText('');
  };

  // Discussion & AI Question
  const handleSendDiscussion = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!discussionInput.trim()) return;

    const userMsgText = discussionInput.trim();
    const newMsg: DiscussionMessage = {
      id: Date.now().toString(),
      lessonId: currentLesson.id,
      userName: user?.name || (isKm ? 'សិស្សអនឡាញ' : 'Student'),
      userAvatar: user?.avatarUrl,
      text: userMsgText,
      createdAt: 'ទើបតែឥឡូវ',
      isAiReply: false
    };

    setDiscussions(prev => [...prev, newMsg]);
    setDiscussionInput('');

    // Trigger AI response if question is posed
    setIsAskingAi(true);
    try {
      const res = await fetch('/api/ai/tutor', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          question: userMsgText,
          lessonContext: `${course.titleKm} - ${currentLesson.titleKm}`,
          language: lang
        })
      });

      const data = await res.json();
      if (data.reply) {
        const aiMsg: DiscussionMessage = {
          id: (Date.now() + 1).toString(),
          lessonId: currentLesson.id,
          userName: 'គ្រូបង្រៀន AI (Gemini Assistant)',
          userAvatar: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=100&q=80',
          text: data.reply,
          createdAt: 'ទើបតែឥឡូវ',
          isAiReply: true
        };
        setDiscussions(prev => [...prev, aiMsg]);
      }
    } catch (err) {
      console.error('AI response error:', err);
    } finally {
      setIsAskingAi(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 text-white flex flex-col">
      
      {/* Top Header Bar */}
      <div className="bg-slate-950 px-4 py-3 border-b border-slate-800 flex items-center justify-between z-30">
        <div className="flex items-center gap-3">
          <button
            onClick={onBackToCourse}
            className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors flex items-center gap-1.5 text-xs font-semibold"
          >
            <ChevronLeft className="w-4 h-4" />
            <span>{isKm ? 'ត្រឡប់ទៅវគ្គសិក្សា' : 'Back to Course'}</span>
          </button>

          <div className="hidden sm:block h-5 w-[1px] bg-slate-800"></div>

          <div>
            <h1 className="text-xs sm:text-sm font-bold text-white line-clamp-1">
              {isKm ? currentLesson.titleKm : currentLesson.titleEn}
            </h1>
            <p className="text-[10px] text-slate-400">
              {isKm ? course.titleKm : course.titleEn}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => onMarkLessonCompleted(currentLesson.id)}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
              isLessonCompleted
                ? 'bg-emerald-600 text-white shadow-sm'
                : 'bg-slate-800 hover:bg-slate-700 text-slate-200'
            }`}
          >
            <CheckCircle2 className="w-4 h-4 text-emerald-300" />
            <span>{isLessonCompleted ? (isKm ? 'រៀនរួចរាល់' : 'Completed') : (isKm ? 'ចំណាំថារៀនរួច' : 'Mark Complete')}</span>
          </button>
        </div>
      </div>

      {/* Main Grid: Player (Left/Top) + Lessons Navigation Sidebar (Right) */}
      <div className="flex-1 grid grid-cols-1 lg:grid-cols-4 overflow-hidden">
        
        {/* Video Player & Bottom Controls Section */}
        <div className="lg:col-span-3 flex flex-col overflow-y-auto bg-slate-950">
          
          {/* Custom Video Player Container */}
          <div className="relative aspect-video bg-black flex items-center justify-center group overflow-hidden border-b border-slate-800">
            <video
              ref={videoRef}
              src={currentLesson.videoUrl}
              className="w-full h-full object-contain cursor-pointer"
              onClick={togglePlay}
              onTimeUpdate={handleTimeUpdate}
              onLoadedMetadata={handleLoadedMetadata}
            />

            {/* Play Overlay Big Icon when paused */}
            {!isPlaying && (
              <button
                onClick={togglePlay}
                className="absolute w-16 h-16 rounded-full bg-blue-600/90 text-white flex items-center justify-center shadow-2xl backdrop-blur-md hover:scale-110 transition-transform"
              >
                <Play className="w-7 h-7 ml-1 fill-current" />
              </button>
            )}

            {/* Video Player Control Bar */}
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 via-black/60 to-transparent p-3 opacity-90 group-hover:opacity-100 transition-opacity space-y-2">
              
              {/* Progress Slider */}
              <input
                type="range"
                min="0"
                max={duration || 100}
                value={currentTime}
                onChange={handleSeek}
                className="w-full h-1.5 bg-slate-700 accent-blue-500 rounded-lg cursor-pointer"
              />

              <div className="flex items-center justify-between text-xs text-slate-300">
                <div className="flex items-center gap-3">
                  <button onClick={togglePlay} className="hover:text-white transition-colors">
                    {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5 fill-current" />}
                  </button>

                  <div className="flex items-center gap-1.5">
                    <button onClick={toggleMute} className="hover:text-white">
                      {isMuted ? <VolumeX className="w-4 h-4 text-red-400" /> : <Volume2 className="w-4 h-4" />}
                    </button>
                    <span className="font-mono text-[11px] text-slate-400">
                      {formatTime(currentTime)} / {formatTime(duration)}
                    </span>
                  </div>
                </div>

                {/* Right Controls (Speed, PiP, Fullscreen) */}
                <div className="flex items-center gap-3">
                  {/* Speed Selector */}
                  <div className="flex items-center gap-1 bg-slate-800/80 rounded-lg px-2 py-0.5 border border-slate-700 text-[11px]">
                    {[0.75, 1, 1.25, 1.5, 2].map((spd) => (
                      <button
                        key={spd}
                        onClick={() => handleSpeedChange(spd)}
                        className={`px-1.5 py-0.5 rounded font-bold ${
                          playbackSpeed === spd ? 'bg-blue-600 text-white' : 'text-slate-400 hover:text-white'
                        }`}
                      >
                        {spd}x
                      </button>
                    ))}
                  </div>

                  <button onClick={handleFullscreen} className="hover:text-white">
                    <Maximize className="w-4 h-4" />
                  </button>
                </div>
              </div>

            </div>
          </div>

          {/* Bottom Tabs Bar */}
          <div className="bg-slate-900 border-b border-slate-800 px-4 flex items-center gap-2 overflow-x-auto">
            <button
              onClick={() => setActiveBottomTab('overview')}
              className={`py-3 px-4 text-xs font-bold border-b-2 transition-colors flex items-center gap-2 whitespace-nowrap ${
                activeBottomTab === 'overview'
                  ? 'border-blue-500 text-blue-400'
                  : 'border-transparent text-slate-400 hover:text-slate-200'
              }`}
            >
              <BookOpen className="w-4 h-4" />
              <span>{isKm ? 'ព័ត៌មានមេរៀន' : 'Overview'}</span>
            </button>

            <button
              onClick={() => setActiveBottomTab('notes')}
              className={`py-3 px-4 text-xs font-bold border-b-2 transition-colors flex items-center gap-2 whitespace-nowrap ${
                activeBottomTab === 'notes'
                  ? 'border-blue-500 text-blue-400'
                  : 'border-transparent text-slate-400 hover:text-slate-200'
              }`}
            >
              <FileText className="w-4 h-4" />
              <span>{isKm ? 'កំណត់ត្រារបស់ខ្ញុំ' : 'Notes'} ({notes.length})</span>
            </button>

            <button
              onClick={() => setActiveBottomTab('discussion')}
              className={`py-3 px-4 text-xs font-bold border-b-2 transition-colors flex items-center gap-2 whitespace-nowrap ${
                activeBottomTab === 'discussion'
                  ? 'border-indigo-500 text-indigo-400'
                  : 'border-transparent text-slate-400 hover:text-slate-200'
              }`}
            >
              <Sparkles className="w-4 h-4 text-indigo-400" />
              <span>{isKm ? 'សួរសំណួរ & AI Tutor' : 'Q&A AI Tutor'}</span>
            </button>

            <button
              onClick={() => setActiveBottomTab('resources')}
              className={`py-3 px-4 text-xs font-bold border-b-2 transition-colors flex items-center gap-2 whitespace-nowrap ${
                activeBottomTab === 'resources'
                  ? 'border-amber-500 text-amber-400'
                  : 'border-transparent text-slate-400 hover:text-slate-200'
              }`}
            >
              <Download className="w-4 h-4" />
              <span>{isKm ? 'ឯកសារមេរៀន' : 'Resources'}</span>
            </button>

            {currentLesson.quizQuestions && currentLesson.quizQuestions.length > 0 && (
              <button
                onClick={() => setActiveBottomTab('quiz')}
                className={`py-3 px-4 text-xs font-bold border-b-2 transition-colors flex items-center gap-2 whitespace-nowrap ${
                  activeBottomTab === 'quiz'
                    ? 'border-emerald-500 text-emerald-400'
                    : 'border-transparent text-slate-400 hover:text-slate-200'
                }`}
              >
                <HelpCircle className="w-4 h-4 text-emerald-400" />
                <span>{isKm ? 'តេស្តសមត្ថភាព' : 'Quiz Test'}</span>
              </button>
            )}
          </div>

          {/* Bottom Tab Content Panels */}
          <div className="p-6 bg-slate-900 flex-1 space-y-6 text-slate-200">
            
            {/* OVERVIEW PANEL */}
            {activeBottomTab === 'overview' && (
              <div className="space-y-4 max-w-3xl">
                <div className="flex items-center justify-between">
                  <h2 className="text-lg font-bold text-white font-heading">
                    {isKm ? currentLesson.titleKm : currentLesson.titleEn}
                  </h2>
                  <span className="text-xs text-slate-400 flex items-center gap-1 bg-slate-800 px-2.5 py-1 rounded-md">
                    <Clock className="w-3.5 h-3.5 text-blue-400" />
                    {currentLesson.duration}
                  </span>
                </div>

                <p className="text-sm text-slate-300 leading-relaxed">
                  {isKm ? currentLesson.descriptionKm : currentLesson.descriptionEn}
                </p>

                {/* Course Instructor Card */}
                <div className="pt-4 border-t border-slate-800 flex items-center gap-3">
                  <img src={course.instructorAvatar} alt={course.instructorName} className="w-10 h-10 rounded-full object-cover ring-2 ring-blue-500/30" />
                  <div>
                    <div className="text-xs font-bold text-white">{course.instructorName}</div>
                    <div className="text-[11px] text-slate-400">{course.instructorRole}</div>
                  </div>
                </div>
              </div>
            )}

            {/* NOTES PANEL */}
            {activeBottomTab === 'notes' && (
              <div className="space-y-6 max-w-3xl">
                <form onSubmit={handleSaveNote} className="space-y-2 bg-slate-800/80 p-4 rounded-2xl border border-slate-700">
                  <div className="flex items-center justify-between text-xs text-slate-400">
                    <span className="font-semibold text-slate-200">{isKm ? 'កត់ត្រាមេរៀនត្រង់នាទី' : 'Add Note at'} {formatTime(currentTime)}</span>
                    <button
                      type="button"
                      onClick={() => {
                        if (videoRef.current) videoRef.current.pause();
                      }}
                      className="text-[10px] text-blue-400 hover:underline"
                    >
                      {isKm ? 'ផ្អាកវីដេអូដើម្បីកត់ត្រា' : 'Pause video to write'}
                    </button>
                  </div>

                  <textarea
                    value={newNoteText}
                    onChange={(e) => setNewNoteText(e.target.value)}
                    placeholder={isKm ? 'សរសេរចំណុចសំខាន់នៃមេរៀន...' : 'Write important notes here...'}
                    className="w-full p-3 bg-slate-900 border border-slate-700 rounded-xl text-xs text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    rows={3}
                  />

                  <div className="flex justify-end">
                    <button
                      type="submit"
                      disabled={!newNoteText.trim()}
                      className="px-4 py-2 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white rounded-xl text-xs font-bold transition-all flex items-center gap-1.5"
                    >
                      <Plus className="w-4 h-4" />
                      <span>{isKm ? 'រក្សាទុកកត់ត្រា' : 'Save Note'}</span>
                    </button>
                  </div>
                </form>

                {/* Notes List */}
                <div className="space-y-3">
                  <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                    {isKm ? 'បញ្ជីកំណត់ត្រាទាំងអស់' : 'Your Lesson Notes'}
                  </h3>

                  {notes.length === 0 ? (
                    <div className="text-center py-8 text-slate-500 text-xs">
                      {isKm ? 'មិនទាន់មានកត់ត្រានៅឡើយទេ។' : 'No notes added yet for this lesson.'}
                    </div>
                  ) : (
                    notes.map((note) => (
                      <div key={note.id} className="p-3.5 bg-slate-800/60 rounded-xl border border-slate-700 flex items-start justify-between gap-3">
                        <div className="space-y-1">
                          <button
                            onClick={() => {
                              if (videoRef.current) {
                                videoRef.current.currentTime = note.timestampSeconds;
                              }
                            }}
                            className="px-2 py-0.5 bg-blue-500/20 text-blue-300 rounded font-mono text-[10px] font-bold hover:bg-blue-500/30"
                          >
                            ⏱️ {formatTime(note.timestampSeconds)}
                          </button>
                          <p className="text-xs text-slate-200">{note.noteText}</p>
                          <span className="text-[10px] text-slate-500">{note.createdAt}</span>
                        </div>

                        <button
                          onClick={() => onDeleteNote(note.id)}
                          className="p-1.5 text-slate-500 hover:text-red-400 transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    ))
                  )}
                </div>
              </div>
            )}

            {/* DISCUSSION & AI TUTOR PANEL */}
            {activeBottomTab === 'discussion' && (
              <div className="space-y-6 max-w-3xl">
                
                <div className="space-y-4 max-h-[350px] overflow-y-auto pr-2">
                  {discussions.map((msg) => (
                    <div
                      key={msg.id}
                      className={`p-4 rounded-2xl border ${
                        msg.isAiReply 
                          ? 'bg-gradient-to-r from-indigo-950/80 to-slate-900 border-indigo-500/40 text-indigo-100'
                          : 'bg-slate-800/70 border-slate-700 text-slate-200'
                      }`}
                    >
                      <div className="flex items-center gap-2.5 mb-2">
                        {msg.isAiReply ? (
                          <div className="p-1.5 bg-indigo-600 rounded-lg text-white">
                            <Sparkles className="w-4 h-4" />
                          </div>
                        ) : (
                          <img src={msg.userAvatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&q=80'} alt="" className="w-7 h-7 rounded-full object-cover" />
                        )}
                        <div>
                          <span className="text-xs font-bold text-white">{msg.userName}</span>
                          <span className="text-[10px] text-slate-400 ml-2">{msg.createdAt}</span>
                        </div>
                      </div>

                      <p className="text-xs leading-relaxed whitespace-pre-wrap">{msg.text}</p>
                    </div>
                  ))}

                  {isAskingAi && (
                    <div className="p-3 bg-indigo-950/50 rounded-xl border border-indigo-500/30 text-indigo-200 text-xs flex items-center gap-2 animate-pulse">
                      <Sparkles className="w-4 h-4 text-amber-400" />
                      <span>{isKm ? 'គ្រូបង្រៀន AI កំពុងវិភាគ និងឆ្លើយសំណួរ...' : 'AI Tutor is generating answer...'}</span>
                    </div>
                  )}
                </div>

                {/* Question Input Form */}
                <form onSubmit={handleSendDiscussion} className="flex gap-2">
                  <input
                    type="text"
                    value={discussionInput}
                    onChange={(e) => setDiscussionInput(e.target.value)}
                    placeholder={isKm ? 'សួរសំណួរមេរៀន ឬសួរ AI Tutor...' : 'Ask a question about this lesson or query AI Tutor...'}
                    className="flex-1 px-4 py-3 bg-slate-800 border border-slate-700 rounded-2xl text-xs text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 placeholder-slate-400"
                  />
                  <button
                    type="submit"
                    disabled={!discussionInput.trim() || isAskingAi}
                    className="px-5 py-3 bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 text-white rounded-2xl font-bold text-xs transition-all flex items-center gap-1.5 shadow-md shadow-indigo-600/30"
                  >
                    <span>{isKm ? 'ផ្ញើ' : 'Send'}</span>
                    <Send className="w-4 h-4" />
                  </button>
                </form>

              </div>
            )}

            {/* RESOURCES PANEL */}
            {activeBottomTab === 'resources' && (
              <div className="space-y-4 max-w-3xl">
                <div className="flex items-center justify-between">
                  <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                    {isKm ? 'ឯកសារសម្រាប់ទាញយក' : 'Downloadable Study Attachments'}
                  </h3>
                </div>

                {currentLesson.resources && currentLesson.resources.length > 0 ? (
                  <div className="space-y-2">
                    {currentLesson.resources.map((res) => (
                      <div key={res.id} className="p-3 bg-slate-800 rounded-xl border border-slate-700 flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <FileText className="w-5 h-5 text-blue-400" />
                          <div>
                            <div className="text-xs font-bold text-white">{res.title}</div>
                            <div className="text-[10px] text-slate-400 uppercase">{res.type}</div>
                          </div>
                        </div>

                        <a
                          href={res.url}
                          target="_blank"
                          rel="noreferrer"
                          className="px-3 py-1.5 bg-slate-700 hover:bg-slate-600 text-xs text-white rounded-lg font-semibold flex items-center gap-1"
                        >
                          <Download className="w-3.5 h-3.5" />
                          <span>{isKm ? 'ទាញយក' : 'Download'}</span>
                        </a>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-xs text-slate-500">
                    {isKm ? 'មិនមានឯកសារបន្ថែមសម្រាប់មេរៀននេះទេ។' : 'No extra resources attached to this lesson.'}
                  </p>
                )}
              </div>
            )}

            {/* QUIZ PANEL */}
            {activeBottomTab === 'quiz' && currentLesson.quizQuestions && (
              <div className="space-y-6 max-w-2xl bg-slate-800/60 p-6 rounded-2xl border border-slate-700">
                <div className="flex items-center justify-between border-b border-slate-700 pb-3">
                  <h3 className="text-sm font-bold text-white font-heading">
                    {isKm ? 'សំណួរតេស្តសមត្ថភាពចុងមេរៀន' : 'Lesson Comprehension Quiz'}
                  </h3>
                  <span className="text-xs text-emerald-400 font-semibold">
                    {currentLesson.quizQuestions.length} {isKm ? 'សំណួរ' : 'Questions'}
                  </span>
                </div>

                <div className="space-y-6">
                  {currentLesson.quizQuestions.map((q, qIndex) => (
                    <div key={q.id} className="space-y-3">
                      <div className="text-xs font-bold text-slate-200 flex items-start gap-2">
                        <span className="p-1 bg-blue-600 rounded text-[10px] text-white">Q{qIndex + 1}</span>
                        <span>{q.question}</span>
                      </div>

                      <div className="space-y-2">
                        {q.options.map((opt, oIndex) => {
                          const isSelected = quizAnswers[q.id] === oIndex;
                          const isCorrect = q.correctIndex === oIndex;

                          let btnStyle = 'bg-slate-900 border-slate-700 text-slate-300 hover:bg-slate-800';
                          if (quizSubmitted) {
                            if (isCorrect) btnStyle = 'bg-emerald-950 border-emerald-500 text-emerald-200 font-bold';
                            else if (isSelected) btnStyle = 'bg-red-950 border-red-500 text-red-200';
                          } else if (isSelected) {
                            btnStyle = 'bg-blue-900 border-blue-500 text-blue-100 font-bold';
                          }

                          return (
                            <button
                              key={oIndex}
                              disabled={quizSubmitted}
                              onClick={() => setQuizAnswers(prev => ({ ...prev, [q.id]: oIndex }))}
                              className={`w-full text-left p-3 rounded-xl border text-xs transition-all flex items-center justify-between ${btnStyle}`}
                            >
                              <span>{opt}</span>
                              {quizSubmitted && isCorrect && <CheckCircle2 className="w-4 h-4 text-emerald-400" />}
                            </button>
                          );
                        })}
                      </div>

                      {quizSubmitted && (
                        <div className="p-3 bg-slate-900/80 rounded-xl text-[11px] text-slate-300 border border-slate-700/80">
                          <span className="font-bold text-emerald-400">{isKm ? 'ពន្យល់៖ ' : 'Explanation: '}</span>
                          {q.explanation}
                        </div>
                      )}
                    </div>
                  ))}
                </div>

                {!quizSubmitted ? (
                  <button
                    onClick={() => setQuizSubmitted(true)}
                    disabled={Object.keys(quizAnswers).length < currentLesson.quizQuestions.length}
                    className="w-full py-3 bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 text-white font-bold rounded-xl text-xs shadow-md transition-all"
                  >
                    {isKm ? 'បញ្ជូនចម្លើយពិនិត្យពិន្ទុ' : 'Submit Answers'}
                  </button>
                ) : (
                  <button
                    onClick={() => {
                      setQuizAnswers({});
                      setQuizSubmitted(false);
                    }}
                    className="w-full py-2.5 bg-slate-700 hover:bg-slate-600 text-white font-bold rounded-xl text-xs transition-all"
                  >
                    {isKm ? 'ធ្វើតេស្តឡើងវិញ' : 'Retake Quiz'}
                  </button>
                )}
              </div>
            )}

          </div>

        </div>

        {/* Right Sidebar: Course Lesson Chapters Playlist Navigation */}
        <div className="bg-slate-900 border-l border-slate-800 flex flex-col h-full overflow-y-auto">
          
          <div className="p-4 border-b border-slate-800 bg-slate-950">
            <h3 className="text-xs font-bold text-slate-300 uppercase tracking-wider font-heading">
              {isKm ? 'មាតិកាមេរៀន (Course Lessons)' : 'Course Content'}
            </h3>
            <p className="text-[11px] text-slate-500 mt-1">
              {course.totalLessons} {isKm ? 'មេរៀនសរុប' : 'total lessons'} • {course.totalHours} {isKm ? 'ម៉ោង' : 'hours'}
            </p>
          </div>

          <div className="divide-y divide-slate-800 flex-1">
            {course.modules.map((mod) => (
              <div key={mod.id} className="py-2">
                <div className="px-4 py-2 text-[11px] font-bold text-blue-400 uppercase tracking-wider bg-slate-950/60">
                  {isKm ? mod.titleKm : mod.titleEn}
                </div>

                <div className="divide-y divide-slate-800/60">
                  {mod.lessons.map((les) => {
                    const isCurrent = les.id === currentLesson.id;
                    return (
                      <button
                        key={les.id}
                        onClick={() => onSelectLesson(les)}
                        className={`w-full text-left p-3.5 px-4 transition-colors flex items-center justify-between gap-2 ${
                          isCurrent 
                            ? 'bg-blue-600/20 border-l-4 border-blue-500 text-white font-semibold' 
                            : 'hover:bg-slate-800/80 text-slate-300'
                        }`}
                      >
                        <div className="flex items-center gap-2.5 overflow-hidden">
                          <div className={`p-1 rounded ${isCurrent ? 'text-blue-400' : 'text-slate-500'}`}>
                            <Play className="w-3.5 h-3.5 fill-current" />
                          </div>
                          <span className="text-xs truncate">
                            {isKm ? les.titleKm : les.titleEn}
                          </span>
                        </div>

                        <span className="text-[10px] font-mono text-slate-500">
                          {les.duration}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>

        </div>

      </div>

    </div>
  );
};
