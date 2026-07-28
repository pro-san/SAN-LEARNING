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
  CheckCircle2
} from 'lucide-react';
import { User } from '../types';

interface NavbarProps {
  user: User | null;
  activeTab: string;
  setActiveTab: (tab: string) => void;
  lang: 'km' | 'en';
  setLang: (lang: 'km' | 'en') => void;
  onOpenAuth: () => void;
  onLogout: () => void;
  onOpenAiTutor: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  user,
  activeTab,
  setActiveTab,
  lang,
  setLang,
  onOpenAuth,
  onLogout,
  onOpenAiTutor
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);

  const isKm = lang === 'km';

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* Logo & Brand */}
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => setActiveTab('courses')}>
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-600 via-indigo-600 to-sky-500 flex items-center justify-center text-white shadow-md shadow-blue-500/20">
              <GraduationCap className="w-6 h-6" />
            </div>
            <div>
              <span className="text-lg font-extrabold bg-gradient-to-r from-blue-700 via-indigo-700 to-sky-600 bg-clip-text text-transparent font-heading tracking-wide">
                PRO LEARNING
              </span>
              <span className="block text-[10px] font-bold text-slate-500 tracking-wider uppercase -mt-0.5">
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
                  ? 'bg-blue-50 text-blue-700 font-semibold'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              <BookOpen className="w-4 h-4" />
              <span>{isKm ? 'វគ្គសិក្សាទាំងអស់' : 'All Courses'}</span>
            </button>

            {user && (
              <button
                onClick={() => setActiveTab('my-courses')}
                className={`px-3.5 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-2 ${
                  activeTab === 'my-courses'
                    ? 'bg-blue-50 text-blue-700 font-semibold'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                }`}
              >
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>{isKm ? 'មេរៀនរបស់ខ្ញុំ' : 'My Courses'}</span>
                {user.enrolledCourseIds.length > 0 && (
                  <span className="ml-1 px-1.5 py-0.5 text-xs font-semibold bg-emerald-100 text-emerald-800 rounded-full">
                    {user.enrolledCourseIds.length}
                  </span>
                )}
              </button>
            )}

            <button
              onClick={onOpenAiTutor}
              className="px-3.5 py-2 rounded-lg text-sm font-medium bg-gradient-to-r from-indigo-50 to-purple-50 text-indigo-700 border border-indigo-200/60 hover:border-indigo-300 transition-all flex items-center gap-1.5 shadow-xs"
            >
              <Sparkles className="w-4 h-4 text-indigo-600 animate-pulse" />
              <span>{isKm ? 'គ្រូបង្រៀន AI' : 'AI Tutor'}</span>
            </button>
          </nav>

          {/* Right Action Bar */}
          <div className="hidden md:flex items-center gap-3">
            {/* Language Switcher */}
            <button
              onClick={() => setLang(isKm ? 'en' : 'km')}
              className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border border-slate-200 text-xs font-semibold text-slate-700 hover:bg-slate-100 transition-colors"
              title={isKm ? 'ប្តូរទៅភាសាអង់គ្លេស' : 'Switch to Khmer'}
            >
              <Globe className="w-3.5 h-3.5 text-slate-500" />
              <span>{isKm ? 'ភាសាខ្មែរ (KM)' : 'English (EN)'}</span>
            </button>

            {/* Auth Button or User Profile */}
            {user ? (
              <div className="relative">
                <button
                  onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
                  className="flex items-center gap-2.5 p-1.5 rounded-xl hover:bg-slate-100 border border-slate-200 transition-colors"
                >
                  <img
                    src={user.avatarUrl || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&q=80'}
                    alt={user.name}
                    className="w-8 h-8 rounded-lg object-cover ring-2 ring-blue-500/30"
                  />
                  <div className="text-left hidden lg:block pr-1">
                    <div className="text-xs font-bold text-slate-800 line-clamp-1">{user.name}</div>
                    <div className="text-[10px] text-slate-500 font-medium">
                      {isKm ? 'សិស្សអនឡាញ' : 'Student'}
                    </div>
                  </div>
                </button>

                {/* Profile Dropdown */}
                {profileDropdownOpen && (
                  <div 
                    className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-xl border border-slate-200 py-2 z-50 animate-in fade-in zoom-in-95 duration-100"
                    onMouseLeave={() => setProfileDropdownOpen(false)}
                  >
                    <div className="px-4 py-2 border-b border-slate-100">
                      <p className="text-xs text-slate-500">{isKm ? 'ចូលប្រើប្រាស់ជា' : 'Signed in as'}</p>
                      <p className="text-sm font-bold text-slate-800 truncate">{user.email}</p>
                    </div>

                    <button
                      onClick={() => {
                        setActiveTab('profile');
                        setProfileDropdownOpen(false);
                      }}
                      className="w-full text-left px-4 py-2 text-xs font-medium text-slate-700 hover:bg-slate-50 flex items-center gap-2"
                    >
                      <UserIcon className="w-4 h-4 text-blue-600" />
                      <span>{isKm ? 'គណនី និងវឌ្ឍនភាព' : 'Student Profile'}</span>
                    </button>

                    <button
                      onClick={() => {
                        setActiveTab('certificates');
                        setProfileDropdownOpen(false);
                      }}
                      className="w-full text-left px-4 py-2 text-xs font-medium text-slate-700 hover:bg-slate-50 flex items-center gap-2"
                    >
                      <Award className="w-4 h-4 text-amber-500" />
                      <span>{isKm ? 'វិញ្ញាបនបត្ររបស់ខ្ញុំ' : 'My Certificates'}</span>
                    </button>

                    <div className="border-t border-slate-100 my-1"></div>

                    <button
                      onClick={() => {
                        onLogout();
                        setProfileDropdownOpen(false);
                      }}
                      className="w-full text-left px-4 py-2 text-xs font-medium text-red-600 hover:bg-red-50 flex items-center gap-2"
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
          <div className="md:hidden flex items-center gap-2">
            <button
              onClick={() => setLang(isKm ? 'en' : 'km')}
              className="p-2 text-xs font-bold text-slate-700"
            >
              {isKm ? 'EN' : 'KM'}
            </button>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-slate-600 hover:bg-slate-100"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-slate-200 bg-white px-4 pt-2 pb-4 space-y-2">
          <button
            onClick={() => { setActiveTab('courses'); setMobileMenuOpen(false); }}
            className="w-full text-left px-3 py-2 rounded-lg text-sm font-semibold text-slate-700 hover:bg-slate-100 flex items-center gap-2"
          >
            <BookOpen className="w-4 h-4 text-blue-600" />
            <span>{isKm ? 'វគ្គសិក្សាទាំងអស់' : 'All Courses'}</span>
          </button>

          {user && (
            <button
              onClick={() => { setActiveTab('my-courses'); setMobileMenuOpen(false); }}
              className="w-full text-left px-3 py-2 rounded-lg text-sm font-semibold text-slate-700 hover:bg-slate-100 flex items-center gap-2"
            >
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>{isKm ? 'មេរៀនរបស់ខ្ញុំ' : 'My Enrolled Courses'}</span>
            </button>
          )}

          <button
            onClick={() => { onOpenAiTutor(); setMobileMenuOpen(false); }}
            className="w-full text-left px-3 py-2 rounded-lg text-sm font-semibold text-indigo-700 bg-indigo-50 flex items-center gap-2"
          >
            <Bot className="w-4 h-4 text-indigo-600" />
            <span>{isKm ? 'គ្រូបង្រៀន AI (AI Tutor)' : 'AI Tutor'}</span>
          </button>

          <div className="pt-2 border-t border-slate-100">
            {user ? (
              <div className="space-y-2">
                <button
                  onClick={() => { setActiveTab('profile'); setMobileMenuOpen(false); }}
                  className="w-full text-left px-3 py-2 rounded-lg text-sm font-semibold text-slate-800 flex items-center gap-2"
                >
                  <UserIcon className="w-4 h-4 text-blue-600" />
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
