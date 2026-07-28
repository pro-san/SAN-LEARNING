import React, { useState } from 'react';
import { X, LogIn, UserPlus, Sparkles, Mail, Lock, User as UserIcon, CheckCircle2 } from 'lucide-react';
import { googleSignIn, registerEmailStudent, loginEmailStudent } from '../services/auth';
import { User } from '../types';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLoginSuccess: (user: User) => void;
  lang: 'km' | 'en';
}

export const AuthModal: React.FC<AuthModalProps> = ({
  isOpen,
  onClose,
  onLoginSuccess,
  lang,
}) => {
  if (!isOpen) return null;

  const isKm = lang === 'km';

  const [mode, setMode] = useState<'login' | 'register'>('register');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMsg(null);

    try {
      if (mode === 'register') {
        if (!fullName.trim()) throw new Error(isKm ? 'សូមបញ្ចូលឈ្មោះពេញរបស់អ្នក' : 'Please enter full name');
        const fbUser = await registerEmailStudent(email, password, fullName);
        const newUser: User = {
          id: fbUser.uid,
          name: fullName || fbUser.displayName || 'សិស្សអនឡាញ',
          email: fbUser.email || email,
          role: 'student',
          enrolledCourseIds: ['course-web-dev'], // Auto enroll in free web dev course
          completedLessonIds: [],
          bookmarkedCourseIds: [],
          totalMinutesLearned: 0,
          certificates: []
        };
        onLoginSuccess(newUser);
        onClose();
      } else {
        const fbUser = await loginEmailStudent(email, password);
        const loggedUser: User = {
          id: fbUser.uid,
          name: fbUser.displayName || 'សិស្សអនឡាញ',
          email: fbUser.email || email,
          role: 'student',
          enrolledCourseIds: ['course-web-dev'],
          completedLessonIds: [],
          bookmarkedCourseIds: [],
          totalMinutesLearned: 120,
          certificates: []
        };
        onLoginSuccess(loggedUser);
        onClose();
      }
    } catch (err: any) {
      console.error('Auth submit error:', err);
      setErrorMsg(err.message || (isKm ? 'មានបញ្ហាចុះឈ្មោះ! សូមពិនិត្យព័ត៌មានម្តងទៀត។' : 'Auth failed'));
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleAuth = async () => {
    setIsLoading(true);
    setErrorMsg(null);
    try {
      const result = await googleSignIn();
      if (result && result.user) {
        const loggedUser: User = {
          id: result.user.uid,
          name: result.user.displayName || 'សិស្ស Google',
          email: result.user.email || 'student@gmail.com',
          avatarUrl: result.user.photoURL || undefined,
          role: 'student',
          enrolledCourseIds: ['course-web-dev'],
          completedLessonIds: [],
          bookmarkedCourseIds: [],
          totalMinutesLearned: 45,
          certificates: [],
          isGoogleAuthenticated: true,
          googleAccessToken: result.accessToken
        };
        onLoginSuccess(loggedUser);
        onClose();
      }
    } catch (err: any) {
      console.error('Google auth error:', err);
      setErrorMsg('Google Sign in was cancelled or failed.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/75 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in duration-200">
      
      <div className="bg-white rounded-3xl max-w-md w-full shadow-2xl border border-slate-200 overflow-hidden relative">
        
        {/* Modal Header */}
        <div className="p-6 bg-gradient-to-r from-blue-900 to-indigo-900 text-white relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 text-slate-300 hover:text-white rounded-lg"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="space-y-1">
            <h2 className="text-xl font-bold font-heading">
              {mode === 'register' ? (isKm ? 'ចុះឈ្មោះសិស្សថ្មី' : 'Student Sign Up') : (isKm ? 'ចូលប្រើប្រាស់ប្រព័ន្ធ' : 'Student Login')}
            </h2>
            <p className="text-xs text-blue-200">
              {isKm ? 'បង្កើតគណនីដើម្បីចូលរៀនវីដេអូមេរៀន និងទទួលបានវិញ្ញាបនបត្រ' : 'Join online learning platform and track study progress'}
            </p>
          </div>

          {/* Toggle Mode Tabs */}
          <div className="mt-4 grid grid-cols-2 bg-blue-950/60 p-1 rounded-xl border border-blue-800 text-xs font-semibold">
            <button
              type="button"
              onClick={() => setMode('register')}
              className={`py-2 rounded-lg transition-all ${
                mode === 'register' ? 'bg-blue-600 text-white shadow-xs' : 'text-blue-200 hover:text-white'
              }`}
            >
              {isKm ? 'ចុះឈ្មោះ' : 'Sign Up'}
            </button>
            <button
              type="button"
              onClick={() => setMode('login')}
              className={`py-2 rounded-lg transition-all ${
                mode === 'login' ? 'bg-blue-600 text-white shadow-xs' : 'text-blue-200 hover:text-white'
              }`}
            >
              {isKm ? 'ចូលប្រព័ន្ធ' : 'Login'}
            </button>
          </div>
        </div>

        {/* Form Content */}
        <div className="p-6 space-y-4">
          
          {errorMsg && (
            <div className="p-3 bg-red-50 text-red-700 rounded-xl text-xs border border-red-200 font-medium">
              {errorMsg}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-3">
            
            {mode === 'register' && (
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">{isKm ? 'ឈ្មោះពេញ' : 'Full Name'}</label>
                <div className="relative">
                  <UserIcon className="absolute left-3.5 top-3 w-4 h-4 text-slate-400" />
                  <input
                    type="text"
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder={isKm ? 'ឧ. សុខ ចាន់ដារ៉ា' : 'e.g. John Doe'}
                    className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500 font-medium"
                  />
                </div>
              </div>
            )}

            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-700">{isKm ? 'អ៊ីមែល (Email)' : 'Email'}</label>
              <div className="relative">
                <Mail className="absolute left-3.5 top-3 w-4 h-4 text-slate-400" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="student@gmail.com"
                  className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500 font-medium"
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-700">{isKm ? 'ពាក្យសម្ងាត់ (Password)' : 'Password'}</label>
              <div className="relative">
                <Lock className="absolute left-3.5 top-3 w-4 h-4 text-slate-400" />
                <input
                  type="password"
                  required
                  minLength={6}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500 font-medium"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-bold text-xs shadow-md shadow-blue-500/20 transition-all flex items-center justify-center gap-2 mt-2"
            >
              <CheckCircle2 className="w-4 h-4" />
              <span>{mode === 'register' ? (isKm ? 'បង្កើតគណនី និងចុះឈ្មោះរៀន' : 'Complete Registration') : (isKm ? 'ចូលប្រព័ន្ធ' : 'Sign In')}</span>
            </button>
          </form>

          <div className="relative my-4">
            <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-slate-200"></div></div>
            <div className="relative flex justify-center text-[10px] uppercase"><span className="bg-white px-2 text-slate-400 font-semibold">{isKm ? 'ឬ' : 'OR'}</span></div>
          </div>

          {/* Sign in with Google Official Button */}
          <button
            onClick={handleGoogleAuth}
            disabled={isLoading}
            className="w-full py-2.5 bg-white border border-slate-300 text-slate-700 hover:bg-slate-50 font-bold text-xs rounded-xl transition-all shadow-xs flex items-center justify-center gap-2.5"
          >
            <svg className="w-4 h-4" viewBox="0 0 48 48">
              <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"></path>
              <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"></path>
              <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"></path>
              <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"></path>
            </svg>
            <span>{isKm ? 'ចូលប្រើប្រាស់ជាមួយ Google' : 'Sign in with Google'}</span>
          </button>

        </div>

      </div>

    </div>
  );
};
