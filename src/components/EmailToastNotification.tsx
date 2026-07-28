import React, { useEffect } from 'react';
import { Mail, Award, X, ExternalLink, Sparkles, CheckCircle2 } from 'lucide-react';
import { SimulatedEmail } from '../types';

interface EmailToastNotificationProps {
  toast: {
    email: SimulatedEmail;
    visible: boolean;
  } | null;
  onClose: () => void;
  onOpenInbox: () => void;
  onViewCertificate: (code?: string) => void;
  lang: 'km' | 'en';
}

export const EmailToastNotification: React.FC<EmailToastNotificationProps> = ({
  toast,
  onClose,
  onOpenInbox,
  onViewCertificate,
  lang,
}) => {
  useEffect(() => {
    if (toast?.visible) {
      const timer = setTimeout(() => {
        onClose();
      }, 8000); // Auto hide after 8s
      return () => clearTimeout(timer);
    }
  }, [toast, onClose]);

  if (!toast || !toast.visible) return null;

  const isKm = lang === 'km';
  const { email } = toast;

  return (
    <div className="fixed bottom-5 right-5 z-50 max-w-md w-full p-4 bg-slate-900 text-white rounded-2xl shadow-2xl border border-slate-700/80 animate-in slide-in-from-bottom-5 fade-in duration-300">
      
      <div className="flex items-start gap-3">
        <div className="p-3 bg-gradient-to-br from-blue-600 to-indigo-700 text-white rounded-xl shadow-md shrink-0">
          <Mail className="w-5 h-5" />
        </div>

        <div className="flex-1 min-w-0 pr-1">
          <div className="flex items-center gap-1.5 text-xs text-blue-400 font-extrabold uppercase tracking-wide">
            <Sparkles className="w-3.5 h-3.5" />
            <span>{isKm ? 'បានផ្ញើអ៊ីម៉ែលជូនដំណឹងថ្មី!' : 'New Email Notification Sent!'}</span>
          </div>

          <h4 className="text-sm font-bold text-white line-clamp-1 mt-0.5 font-heading">
            {email.subject}
          </h4>

          <p className="text-xs text-slate-300 line-clamp-2 mt-1 leading-snug">
            {email.bodyText}
          </p>

          <div className="flex items-center gap-2 mt-3 pt-2 border-t border-slate-800">
            <button
              onClick={() => {
                onOpenInbox();
                onClose();
              }}
              className="px-3 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold transition-all flex items-center gap-1.5 shadow-xs cursor-pointer"
            >
              <Mail className="w-3.5 h-3.5" />
              <span>{isKm ? 'បើកប្រអប់អ៊ីម៉ែល' : 'Open Email Inbox'}</span>
            </button>

            {email.certificateCode && (
              <button
                onClick={() => {
                  onViewCertificate(email.certificateCode);
                  onClose();
                }}
                className="px-3 py-1.5 rounded-lg bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-bold transition-all flex items-center gap-1.5 shadow-xs cursor-pointer"
              >
                <Award className="w-3.5 h-3.5" />
                <span>{isKm ? 'មើលវិញ្ញាបនបត្រ' : 'View Certificate'}</span>
              </button>
            )}
          </div>
        </div>

        <button
          onClick={onClose}
          className="text-slate-400 hover:text-white p-1 rounded-lg transition-colors shrink-0"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

    </div>
  );
};
