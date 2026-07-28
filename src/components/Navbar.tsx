import React, { useState } from 'react';
import { 
  GraduationCap, 
  BookOpen, 
  Bot, 
  Award, 
  User as UserIcon, 
  LogOut, 
  Globe, 
  Search, 
  LogIn, 
  Menu, 
  X,
  Sparkles,
  CheckCircle2,
  Mail,
  Sun,
  Moon
} from 'lucide-react';
import { User } from '../types';

interface NavbarProps {
  user: User | null;
  activeTab: string;
  setActiveTab: (tab: string) => void;
  lang: 'km' | 'en';
  setLang: (lang: 'km' | 'en') => void;
  theme?: 'light' | 'dark';
  onToggleTheme?: () => void;
  onOpenAuth: () => void;
  onLogout: () => void;
  onOpenAiTutor: () => void;
  onOpenEmailInbox?: () => void;
  unreadEmailCount?: number;
}

export const Navbar: React.FC<NavbarProps> = ({
  user,
  activeTab,
  setActiveTab,
  lang,
  setLang,
  theme = 'light',
  onToggleTheme,
  onOpenAuth,
  onLogout,
  onOpenAiTutor,
  onOpenEmailInbox,
  unreadEmailCount = 0,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);

  const isKm = lang === 'km';
  const isDark = theme === 'dark';

  return (
    <header className="sticky top-0 z-40 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 shadow-xs transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* Logo & Brand */}
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => setActiveTab('courses')}>
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-600 via-indigo-600 to-sky-500 flex items-center justify-center text-white shadow-md shadow-blue-500/20">
              <GraduationCap className="w-6 h-6" />
            </div>
            <div>
              <span className="text-lg font-extrabold bg-gradient-to-r from-blue-700 via-indigo-700 to-sky-600 dark:from-blue-400 dark:via-indigo-400 dark:to-sky-300 bg-clip-text text-transparent font-heading tracking-wide">
                PRO LEARNING
              </span>
              <span className="block text-[10px] font-bold text-slate-500 dark:text-slate-400 tracking-wider uppercase -mt-0.5">
                Online Learning Platform
              </span>
            </div>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-1">
            <button
              onClick={() => setActiveTab('courses')}
              className={`px-3.5 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-2 ${
                activeTab === 'courses'
                  ? 'bg-blue-50 dark:bg-blue-950/80 text-blue-700 dark:text-blue-400 font-semibold border border-blue-200/80 dark:border-blue-800'
                  : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800'
              }`}
            >
              <BookOpen className="w-4 h-4 text-blue-600 dark:text-blue-400" />
              <span>{isKm ? 'វគ្គសិក្សាទាំងអស់' : 'All Courses'}</span>
            </button>

            {user && (
              <button
                onClick={() => setActiveTab('my-courses')}
                className={`px-3.5 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-2 ${
                  activeTab === 'my-courses'
                    ? 'bg-blue-50 dark:bg-blue-950/80 text-blue-700 dark:text-blue-400 font-semibold border border-blue-200/80 dark:border-blue-800'
                    : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800'
                }`}
              >
                <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                <span>{isKm ? 'មេរៀនរបស់ខ្ញុំ' : 'My Courses'}</span>
                {user.enrolledCourseIds.length > 0 && (
                  <span className="ml-1 px-1.5 py-0.5 text-xs font-semibold bg-emerald-100 dark:bg-emerald-900/60 text-emerald-800 dark:text-emerald-300 rounded-full">
                    {user.enrolledCourseIds.length}
                  </span>
                )}
              </button>
            )}

            <button
              onClick={onOpenAiTutor}
              className="px-3.5 py-2 rounded-lg text-sm font-medium bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-indigo-950/60 dark:to-purple-950/60 text-indigo-700 dark:text-indigo-300 border border-indigo-200/60 dark:border-indigo-800 hover:border-indigo-300 dark:hover:border-indigo-700 transition-all flex items-center gap-1.5 shadow-xs"
            >
              <Sparkles className="w-4 h-4 text-indigo-600 dark:text-indigo-400 animate-pulse" />
              <span>{isKm ? 'គ្រូបង្រៀន AI' : 'AI Tutor'}</span>
            </button>
          </nav>

          {/* Right Action Bar */}
          <div className="hidden md:flex items-center gap-2.5">
            {/* Global Theme Toggle Button */}
            {onToggleTheme && (
              <button
                onClick={onToggleTheme}
                className="p-2 rounded-xl border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors flex items-center justify-center cursor-pointer shadow-2xs"
                title={isDark ? (isKm ? 'ប្តូរទៅ Theme ភ្លឺ (Light)' : 'Switch to Light Mode') : (isKm ? 'ប្តូរទៅ Theme ងងឹត (Dark)' : 'Switch to Dark Mode')}
              >
                {isDark ? (
                  <Sun className="w-4 h-4 text-amber-400 animate-spin-slow" />
                ) : (
                  <Moon className="w-4 h-4 text-slate-600" />
                )}
              </button>
            )}

            {/* Email Inbox Simulation Button */}
            {onOpenEmailInbox && (
              <button
                onClick={onOpenEmailInbox}
                className="relative p-2 rounded-xl border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors flex items-center justify-center cursor-pointer"
                title={isKm ? 'ប្រអប់អ៊ីម៉ែលជូនដំណឹង' : 'Simulated Email Inbox'}
              >
                <Mail className="w-4 h-4 text-slate-600 dark:text-slate-300" />
                {unreadEmailCount > 0 && (
                  <span className="absolute -top-1 -right-1 px-1.5 py-0.5 rounded-full text-[10px] font-black bg-rose-500 text-white animate-bounce shadow-xs">
                    {unreadEmailCount}
                  </span>
                )}
              </button>
            )}

            {/* Language Switcher */}
            <button
              onClick={() => setLang(isKm ? 'en' : 'km')}
              className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border border-slate-200 dark:border-slate-800 text-xs font-semibold text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              title={isKm ? 'ប្តូរទៅភាសាអង់គ្លេស' : 'Switch to Khmer'}
            >
              <Globe className="w-3.5 h-3.5 text-slate-500 dark:text-slate-400" />
              <span>{isKm ? 'ភាសាខ្មែរ (KM)' : 'English (EN)'}</span>
            </button>

            {/* Auth Button or User Profile */}
            {user ? (
              <div className="relative">
                <button
                  onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
                  className="flex items-center gap-2.5 p-1.5 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-800 transition-colors"
                >
                  <img
                    src={user.avatarUrl || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&q=80'}
                    alt={user.name}
                    className="w-8 h-8 rounded-lg object-cover ring-2 ring-blue-500/30"
                  />
                  <div className="text-left hidden lg:block pr-1">
                    <div className="text-xs font-bold text-slate-800 dark:text-slate-100 line-clamp-1">{user.name}</div>
                    <div className="text-[10px] text-slate-500 dark:text-slate-400 font-medium">
                      {isKm ? 'សិស្សអនឡាញ' : 'Student'}
                    </div>
                  </div>
                </button>

                {/* Profile Dropdown */}
                {profileDropdownOpen && (
                  <div 
                    className="absolute right-0 mt-2 w-56 bg-white dark:bg-slate-900 rounded-xl shadow-xl border border-slate-200 dark:border-slate-800 py-2 z-50 animate-in fade-in zoom-in-95 duration-100"
                    onMouseLeave={() => setProfileDropdownOpen(false)}
                  >
                    <div className="px-4 py-2 border-b border-slate-100 dark:border-slate-800">
                      <p className="text-xs text-slate-500 dark:text-slate-400">{isKm ? 'ចូលប្រើប្រាស់ជា' : 'Signed in as'}</p>
                      <p className="text-sm font-bold text-slate-800 dark:text-slate-100 truncate">{user.email}</p>
                    </div>

                    <button
                      onClick={() => {
                        setActiveTab('profile');
                        setProfileDropdownOpen(false);
                      }}
                      className="w-full text-left px-4 py-2 text-xs font-medium text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800 flex items-center gap-2"
                    >
                      <UserIcon className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                      <span>{isKm ? 'គណនី និងវឌ្ឍនភាព' : 'Student Profile'}</span>
                    </button>

                    {onOpenEmailInbox && (
                      <button
                        onClick={() => {
                          onOpenEmailInbox();
                          setProfileDropdownOpen(false);
                        }}
                        className="w-full text-left px-4 py-2 text-xs font-medium text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800 flex items-center justify-between"
                      >
                        <div className="flex items-center gap-2">
                          <Mail className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
                          <span>{isKm ? 'ប្រអប់អ៊ីម៉ែលជូនដំណឹង' : 'Email Notifications'}</span>
                        </div>
                        {unreadEmailCount > 0 && (
                          <span className="px-1.5 py-0.5 rounded-full text-[10px] font-extrabold bg-rose-500 text-white">
                            {unreadEmailCount}
                          </span>
                        )}
                      </button>
                    )}

                    <button
                      onClick={() => {
                        setActiveTab('certificates');
                        setProfileDropdownOpen(false);
                      }}
                      className="w-full text-left px-4 py-2 text-xs font-medium text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800 flex items-center gap-2"
                    >
                      <Award className="w-4 h-4 text-amber-500" />
                      <span>{isKm ? 'វិញ្ញាបនបត្ររបស់ខ្ញុំ' : 'My Certificates'}</span>
                    </button>

                    <div className="border-t border-slate-100 dark:border-slate-800 my-1"></div>

                    <button
                      onClick={() => {
                        onLogout();
                        setProfileDropdownOpen(false);
                      }}
                      className="w-full text-left px-4 py-2 text-xs font-medium text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/30 flex items-center gap-2"
                    >
                      <LogOut className="w-4 h-4" />
                      <span>{isKm ? 'ចាកចេញពីប្រព័ន្ធ' : 'Sign Out'}</span>
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <button
                onClick={onOpenAuth}
                className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs transition-all shadow-md shadow-blue-500/20 flex items-center gap-1.5"
              >
                <LogIn className="w-4 h-4" />
                <span>{isKm ? 'ចុះឈ្មោះ / ចូលរៀន' : 'Enroll / Login'}</span>
              </button>
            )}
          </div>

          {/* Mobile menu trigger */}
          <div className="md:hidden flex items-center gap-1.5">
            {onToggleTheme && (
              <button
                onClick={onToggleTheme}
                className="p-2 text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg"
                title={isDark ? 'Light Mode' : 'Dark Mode'}
              >
                {isDark ? <Sun className="w-5 h-5 text-amber-400" /> : <Moon className="w-5 h-5 text-slate-700" />}
              </button>
            )}

            {onOpenEmailInbox && (
              <button
                onClick={onOpenEmailInbox}
                className="relative p-2 text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg"
                title={isKm ? 'ប្រអប់អ៊ីម៉ែល' : 'Email Inbox'}
              >
                <Mail className="w-5 h-5 text-slate-700 dark:text-slate-200" />
                {unreadEmailCount > 0 && (
                  <span className="absolute top-1 right-1 px-1.5 py-0.2 rounded-full text-[9px] font-black bg-rose-500 text-white">
                    {unreadEmailCount}
                  </span>
                )}
              </button>
            )}

            <button
              onClick={() => setLang(isKm ? 'en' : 'km')}
              className="p-2 text-xs font-bold text-slate-700 dark:text-slate-200"
            >
              {isKm ? 'EN' : 'KM'}
            </button>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 px-4 pt-2 pb-4 space-y-2">
          <button
            onClick={() => { setActiveTab('courses'); setMobileMenuOpen(false); }}
            className="w-full text-left px-3 py-2 rounded-lg text-sm font-semibold text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 flex items-center gap-2"
          >
            <BookOpen className="w-4 h-4 text-blue-600 dark:text-blue-400" />
            <span>{isKm ? 'វគ្គសិក្សាទាំងអស់' : 'All Courses'}</span>
          </button>

          {user && (
            <button
              onClick={() => { setActiveTab('my-courses'); setMobileMenuOpen(false); }}
              className="w-full text-left px-3 py-2 rounded-lg text-sm font-semibold text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 flex items-center gap-2"
            >
              <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
              <span>{isKm ? 'មេរៀនរបស់ខ្ញុំ' : 'My Enrolled Courses'}</span>
            </button>
          )}

          {onOpenEmailInbox && (
            <button
              onClick={() => { onOpenEmailInbox(); setMobileMenuOpen(false); }}
              className="w-full text-left px-3 py-2 rounded-lg text-sm font-semibold text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 flex items-center justify-between"
            >
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
                <span>{isKm ? 'ប្រអប់អ៊ីម៉ែលជូនដំណឹង' : 'Email Notifications'}</span>
              </div>
              {unreadEmailCount > 0 && (
                <span className="px-2 py-0.5 rounded-full text-xs font-bold bg-rose-500 text-white">
                  {unreadEmailCount}
                </span>
              )}
            </button>
          )}

          <button
            onClick={() => { onOpenAiTutor(); setMobileMenuOpen(false); }}
            className="w-full text-left px-3 py-2 rounded-lg text-sm font-semibold text-indigo-700 dark:text-indigo-300 bg-indigo-50 dark:bg-indigo-950/60 flex items-center gap-2"
          >
            <Bot className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
            <span>{isKm ? 'គ្រូបង្រៀន AI (AI Tutor)' : 'AI Tutor'}</span>
          </button>

          {onToggleTheme && (
            <button
              onClick={() => { onToggleTheme(); setMobileMenuOpen(false); }}
              className="w-full text-left px-3 py-2 rounded-lg text-sm font-semibold text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 flex items-center gap-2"
            >
              {isDark ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-slate-600" />}
              <span>{isDark ? (isKm ? 'Theme ភ្លឺ (Light Mode)' : 'Light Mode') : (isKm ? 'Theme ងងឹត (Dark Mode)' : 'Dark Mode')}</span>
            </button>
          )}

          <div className="pt-2 border-t border-slate-100 dark:border-slate-800">
            {user ? (
              <div className="space-y-2">
                <button
                  onClick={() => { setActiveTab('profile'); setMobileMenuOpen(false); }}
                  className="w-full text-left px-3 py-2 rounded-lg text-sm font-semibold text-slate-800 dark:text-slate-100 flex items-center gap-2"
                >
                  <UserIcon className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                  <span>{user.name} ({isKm ? 'ប្រវត្តិរូប' : 'Profile'})</span>
                </button>
                <button
                  onClick={() => { onLogout(); setMobileMenuOpen(false); }}
                  className="w-full text-left px-3 py-2 rounded-lg text-sm font-semibold text-red-600 flex items-center gap-2"
                >
                  <LogOut className="w-4 h-4" />
                  <span>{isKm ? 'ចាកចេញ' : 'Sign Out'}</span>
                </button>
              </div>
            ) : (
              <button
                onClick={() => { onOpenAuth(); setMobileMenuOpen(false); }}
                className="w-full py-2.5 rounded-xl bg-blue-600 text-white font-semibold text-sm text-center block shadow-sm"
              >
                {isKm ? 'ចុះឈ្មោះ / ចូលរៀន' : 'Sign Up / Login'}
              </button>
            )}
          </div>
        </div>
      )}
    </header>
  );
};
