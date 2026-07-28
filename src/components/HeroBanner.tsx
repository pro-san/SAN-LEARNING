import React from 'react';
import { Search, Sparkles, Video, Award, Users, BookOpen, CheckCircle } from 'lucide-react';
import { CourseCategory } from '../types';

interface HeroBannerProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  selectedCategory: string;
  setSelectedCategory: (cat: string) => void;
  lang: 'km' | 'en';
  onOpenAiTutor: () => void;
}

export const HeroBanner: React.FC<HeroBannerProps> = ({
  searchQuery,
  setSearchQuery,
  selectedCategory,
  setSelectedCategory,
  lang,
  onOpenAiTutor,
}) => {
  const isKm = lang === 'km';

  const categories = [
    { id: 'all', labelKm: 'ទាំងអស់', labelEn: 'All Categories' },
    { id: 'coding', labelKm: 'ព័ត៌មានវិទ្យា & កូដ', labelEn: 'IT & Coding' },
    { id: 'languages', labelKm: 'ភាសាបរទេស', labelEn: 'Languages' },
    { id: 'stem', labelKm: 'គណិត & វិទ្យាសាស្ត្រ', labelEn: 'Math & STEM' },
    { id: 'business', labelKm: 'ធុរកិច្ច & Marketing', labelEn: 'Business' },
    { id: 'design', labelKm: 'ក្រាហ្វិក & UI/UX Design', labelEn: 'Graphic Design' },
  ];

  return (
    <div className="relative overflow-hidden bg-gradient-to-b from-blue-900 via-indigo-900 to-slate-900 text-white pt-10 pb-16 px-4 sm:px-6 lg:px-8">
      {/* Background Decorative Patterns */}
      <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#3b82f6_1px,transparent_1px)] [background-size:16px_16px]"></div>
      <div className="absolute -top-24 -right-24 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-0 left-1/4 w-80 h-80 bg-indigo-500/20 rounded-full blur-3xl pointer-events-none"></div>

      <div className="relative max-w-5xl mx-auto text-center space-y-6">
        
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-500/20 border border-blue-400/30 text-blue-200 text-xs font-semibold backdrop-blur-md">
          <Sparkles className="w-3.5 h-3.5 text-amber-300" />
          <span>
            {isKm 
              ? 'វេទិកាសិក្សាអនឡាញឈានមុខគេក្នុងប្រទេសកម្ពុជា' 
              : 'Cambodia\'s Leading Online E-Learning Platform'}
          </span>
        </div>

        {/* Main Title */}
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight leading-tight font-heading text-white">
          {isKm ? (
            <>
              រៀនសូត្រអនឡាញ <span className="bg-gradient-to-r from-sky-300 via-blue-200 to-amber-200 bg-clip-text text-transparent">មើលមេរៀនវីដេអូ</span> <br className="hidden sm:inline" />
              និងអភិវឌ្ឍជំនាញជីវិត
            </>
          ) : (
            <>
              Watch Lessons Online & <span className="bg-gradient-to-r from-sky-300 via-blue-200 to-amber-200 bg-clip-text text-transparent">Master New Skills</span>
            </>
          )}
        </h1>

        <p className="max-w-2xl mx-auto text-sm sm:text-base text-slate-300 leading-relaxed font-normal">
          {isKm
            ? 'ប្រភពវគ្គសិក្សាវីដេអូមានគុណភាពខ្ពស់ សម្រួលជាភាសាខ្មែរ មានប្រព័ន្ធចុះឈ្មោះ និងសំណួរតេស្តសមត្ថភាពជាច្រើន!'
            : 'Access high-quality Khmer video lessons with interactive enrollment and practice quizzes.'}
        </p>

        {/* Search Bar */}
        <div className="max-w-2xl mx-auto relative pt-2">
          <div className="relative flex items-center">
            <Search className="absolute left-4 w-5 h-5 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={isKm ? 'ស្វែងរកមេរៀន (ឧទាហរណ៍៖ React, អង់គ្លេស, គណិតវិទ្យា, Figma...)' : 'Search lessons (e.g., React, English, Math, Figma...)'}
              className="w-full pl-11 pr-24 py-3.5 bg-white/95 text-slate-900 rounded-2xl shadow-xl border border-white/20 text-sm focus:outline-none focus:ring-2 focus:ring-sky-400 placeholder-slate-400 font-medium"
            />
            <button
              onClick={onOpenAiTutor}
              className="absolute right-2 px-3.5 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white rounded-xl text-xs font-semibold flex items-center gap-1.5 shadow-md transition-all"
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-300" />
              <span>{isKm ? 'សួរ AI' : 'Ask AI'}</span>
            </button>
          </div>
        </div>

        {/* Categories Bar */}
        <div className="pt-4 flex flex-wrap items-center justify-center gap-2">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                selectedCategory === cat.id
                  ? 'bg-blue-500 text-white shadow-md ring-2 ring-blue-300'
                  : 'bg-white/10 hover:bg-white/20 text-slate-200 border border-white/10'
              }`}
            >
              {isKm ? cat.labelKm : cat.labelEn}
            </button>
          ))}
        </div>

        {/* Stats Summary Highlights */}
        <div className="pt-6 grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-3xl mx-auto border-t border-white/10 text-left">
          <div className="flex items-center gap-2.5 p-2 bg-white/5 rounded-xl border border-white/5">
            <div className="p-2 bg-blue-500/20 rounded-lg text-sky-300">
              <Video className="w-4 h-4" />
            </div>
            <div>
              <div className="text-xs font-bold text-white">100+ {isKm ? 'វីដេអូ' : 'Videos'}</div>
              <div className="text-[10px] text-slate-300">{isKm ? 'មេរៀនច្បាស់ HD' : 'HD Quality'}</div>
            </div>
          </div>

          <div className="flex items-center gap-2.5 p-2 bg-white/5 rounded-xl border border-white/5">
            <div className="p-2 bg-emerald-500/20 rounded-lg text-emerald-300">
              <CheckCircle className="w-4 h-4" />
            </div>
            <div>
              <div className="text-xs font-bold text-white">{isKm ? 'ចុះឈ្មោះងាយ' : 'Easy Enroll'}</div>
              <div className="text-[10px] text-slate-300">{isKm ? 'រៀនឥតគិតថ្លៃ' : 'Free Courses'}</div>
            </div>
          </div>

          <div className="flex items-center gap-2.5 p-2 bg-white/5 rounded-xl border border-white/5">
            <div className="p-2 bg-amber-500/20 rounded-lg text-amber-300">
              <Award className="w-4 h-4" />
            </div>
            <div>
              <div className="text-xs font-bold text-white">{isKm ? 'វិញ្ញាបនបត្រ' : 'Certificate'}</div>
              <div className="text-[10px] text-slate-300">{isKm ? 'ពេលរៀនចប់' : 'On Completion'}</div>
            </div>
          </div>

          <div className="flex items-center gap-2.5 p-2 bg-white/5 rounded-xl border border-white/5">
            <div className="p-2 bg-purple-500/20 rounded-lg text-purple-300">
              <Users className="w-4 h-4" />
            </div>
            <div>
              <div className="text-xs font-bold text-white">15,000+ {isKm ? 'សិស្ស' : 'Students'}</div>
              <div className="text-[10px] text-slate-300">{isKm ? 'សិក្សាទូទាំងប្រទេស' : 'Nationwide'}</div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};
