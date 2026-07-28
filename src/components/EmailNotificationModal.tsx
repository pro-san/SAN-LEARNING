import React, { useState } from 'react';
import { 
  X, 
  Mail, 
  CheckCircle2, 
  Award, 
  Trash2, 
  Send, 
  ExternalLink, 
  Sparkles, 
  ShieldCheck, 
  Clock, 
  Inbox, 
  ChevronRight,
  RefreshCw
} from 'lucide-react';
import { SimulatedEmail, Certificate, User } from '../types';

interface EmailNotificationModalProps {
  isOpen: boolean;
  onClose: () => void;
  emails: SimulatedEmail[];
  onMarkAsRead: (emailId: string) => void;
  onDeleteEmail: (emailId: string) => void;
  onViewCertificate: (certificateCode?: string) => void;
  onSendTestEmail: () => void;
  user: User | null;
  certificates: Certificate[];
  lang: 'km' | 'en';
}

export const EmailNotificationModal: React.FC<EmailNotificationModalProps> = ({
  isOpen,
  onClose,
  emails,
  onMarkAsRead,
  onDeleteEmail,
  onViewCertificate,
  onSendTestEmail,
  user,
  certificates,
  lang,
}) => {
  const [selectedEmailId, setSelectedEmailId] = useState<string | null>(
    emails.length > 0 ? emails[0].id : null
  );

  if (!isOpen) return null;

  const isKm = lang === 'km';
  const selectedEmail = emails.find((e) => e.id === selectedEmailId) || emails[0];

  const handleSelectEmail = (email: SimulatedEmail) => {
    setSelectedEmailId(email.id);
    if (!email.isRead) {
      onMarkAsRead(email.id);
    }
  };

  const unreadCount = emails.filter((e) => !e.isRead).length;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/80 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl max-w-4xl w-full h-[85vh] shadow-2xl border border-slate-200 overflow-hidden flex flex-col relative">
        
        {/* Top Header Bar */}
        <div className="bg-slate-950 text-white px-6 py-4 flex items-center justify-between border-b border-slate-800 shrink-0">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-blue-600/20 text-blue-400 rounded-xl border border-blue-500/30">
              <Mail className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base font-extrabold font-heading text-white">
                  {isKm ? 'ប្រព័ន្ធសាកល្បងអ៊ីម៉ែលជូនដំណឹង' : 'Simulated Email Notification Inbox'}
                </h3>
                {unreadCount > 0 && (
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-black bg-rose-500 text-white">
                    {unreadCount} {isKm ? 'ថ្មី' : 'NEW'}
                  </span>
                )}
              </div>
              <p className="text-xs text-slate-400 font-medium">
                {isKm 
                  ? `អ៊ីម៉ែលផ្ញើជូនសិស្ស (${user?.email || 'student@prolearning.edu.kh'}) ពេលបញ្ចប់មេរៀន` 
                  : `Automated course completion notifications for ${user?.email || 'student@prolearning.edu.kh'}`}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={onSendTestEmail}
              className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold transition-all shadow-xs"
              title={isKm ? 'សាកល្បងផ្ញើអ៊ីម៉ែលបញ្ចប់មេរៀន' : 'Send Test Completion Email'}
            >
              <Send className="w-3.5 h-3.5" />
              <span>{isKm ? 'សាកល្បងផ្ញើអ៊ីម៉ែល' : 'Send Test Email'}</span>
            </button>

            <button
              onClick={onClose}
              className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Email Client Split View (Left List, Right Content) */}
        <div className="flex-1 grid grid-cols-1 md:grid-cols-12 overflow-hidden bg-slate-50">
          
          {/* LEFT SIDEBAR: Email List */}
          <div className="md:col-span-5 border-r border-slate-200 bg-white flex flex-col overflow-hidden">
            
            {/* Action Bar */}
            <div className="p-3 bg-slate-100/80 border-b border-slate-200 flex items-center justify-between text-xs font-semibold text-slate-600">
              <span className="flex items-center gap-1.5">
                <Inbox className="w-4 h-4 text-slate-500" />
                <span>{isKm ? 'ប្រអប់សំបុត្រ' : 'Inbox Messages'}</span>
                <span className="bg-slate-200 px-1.5 py-0.5 rounded text-[10px] font-bold text-slate-700">
                  {emails.length}
                </span>
              </span>

              <button
                onClick={onSendTestEmail}
                className="sm:hidden text-indigo-600 font-bold hover:underline flex items-center gap-1 text-[11px]"
              >
                <Send className="w-3 h-3" />
                <span>{isKm ? 'សាកល្បង' : 'Test'}</span>
              </button>
            </div>

            {/* Email List Scrollable Container */}
            <div className="flex-1 overflow-y-auto divide-y divide-slate-100">
              {emails.length === 0 ? (
                <div className="p-8 text-center space-y-3">
                  <div className="w-12 h-12 rounded-full bg-slate-100 text-slate-400 flex items-center justify-center mx-auto">
                    <Mail className="w-6 h-6" />
                  </div>
                  <p className="text-xs text-slate-500 font-medium">
                    {isKm ? 'មិនទាន់មានអ៊ីម៉ែលជូនដំណឹងទេ។' : 'No email notifications received yet.'}
                  </p>
                  <button
                    onClick={onSendTestEmail}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-blue-50 text-blue-700 border border-blue-200 text-xs font-bold hover:bg-blue-100 transition-colors"
                  >
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>{isKm ? 'បង្កើតអ៊ីម៉ែលគំរូ' : 'Generate Sample Email'}</span>
                  </button>
                </div>
              ) : (
                emails.map((email) => {
                  const isSelected = selectedEmail?.id === email.id;
                  return (
                    <div
                      key={email.id}
                      onClick={() => handleSelectEmail(email)}
                      className={`p-4 cursor-pointer transition-all border-l-4 text-left ${
                        isSelected
                          ? 'bg-blue-50/80 border-l-blue-600 shadow-2xs'
                          : email.isRead
                          ? 'bg-white border-l-transparent hover:bg-slate-50'
                          : 'bg-amber-50/40 border-l-amber-500 font-semibold hover:bg-amber-50/70'
                      }`}
                    >
                      <div className="flex items-center justify-between gap-2 mb-1">
                        <span className="text-xs font-bold text-slate-900 truncate">
                          {email.fromName}
                        </span>
                        <span className="text-[10px] text-slate-400 shrink-0 flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {email.sentAt}
                        </span>
                      </div>

                      <h4 className="text-xs font-extrabold text-slate-800 line-clamp-1">
                        {email.subject}
                      </h4>

                      <p className="text-[11px] text-slate-500 line-clamp-2 mt-1 leading-snug">
                        {email.bodyText}
                      </p>

                      <div className="flex items-center justify-between pt-2 mt-1">
                        {!email.isRead && (
                          <span className="px-1.5 py-0.5 rounded text-[9px] font-extrabold bg-amber-500 text-slate-950 uppercase">
                            {isKm ? 'មិនទាន់អាន' : 'Unread'}
                          </span>
                        )}

                        {email.certificateCode && (
                          <span className="ml-auto text-[10px] font-bold text-indigo-600 flex items-center gap-1">
                            <Award className="w-3 h-3 text-amber-500" />
                            <span>{isKm ? 'វិញ្ញាបនបត្រ' : 'Certificate'}</span>
                          </span>
                        )}
                      </div>
                    </div>
                  );
                })
              )}
            </div>

          </div>

          {/* RIGHT SIDE: Selected Email Detail View */}
          <div className="md:col-span-7 bg-white flex flex-col overflow-hidden">
            {selectedEmail ? (
              <div className="flex-1 flex flex-col overflow-y-auto">
                
                {/* Email Header Card */}
                <div className="p-6 border-b border-slate-200 bg-slate-50/50 space-y-4">
                  <div className="flex items-start justify-between gap-4">
                    <h2 className="text-lg font-extrabold text-slate-900 font-heading leading-snug">
                      {selectedEmail.subject}
                    </h2>

                    <button
                      onClick={() => onDeleteEmail(selectedEmail.id)}
                      className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors shrink-0"
                      title={isKm ? 'លុបអ៊ីម៉ែល' : 'Delete Email'}
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>

                  {/* Sender & Receiver Info */}
                  <div className="bg-white rounded-2xl p-4 border border-slate-200/80 shadow-2xs space-y-2">
                    <div className="flex items-center justify-between text-xs">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-full bg-blue-600 text-white font-black text-xs flex items-center justify-center">
                          PRO
                        </div>
                        <div>
                          <div className="font-bold text-slate-900 flex items-center gap-1.5">
                            <span>{selectedEmail.fromName}</span>
                            <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
                          </div>
                          <div className="text-[11px] text-slate-500 font-mono">
                            &lt;{selectedEmail.fromEmail}&gt;
                          </div>
                        </div>
                      </div>

                      <span className="text-[11px] text-slate-400 font-medium">
                        {selectedEmail.sentAt}
                      </span>
                    </div>

                    <div className="text-[11px] text-slate-500 pt-2 border-t border-slate-100 flex items-center gap-1">
                      <span className="font-semibold text-slate-700">{isKm ? 'ផ្ញើជូន:' : 'To:'}</span>
                      <span className="font-mono text-slate-800">{selectedEmail.toEmail}</span>
                    </div>
                  </div>
                </div>

                {/* Email Body Content */}
                <div className="p-6 flex-1 space-y-6">
                  
                  {/* Rich HTML Simulated Card */}
                  <div className="bg-gradient-to-b from-blue-50/50 to-white rounded-2xl p-6 border border-blue-100 shadow-sm space-y-5">
                    
                    <div className="flex items-center gap-3 border-b border-blue-100 pb-4">
                      <div className="w-10 h-10 rounded-2xl bg-amber-500 text-slate-950 flex items-center justify-center font-black shadow-md">
                        <Award className="w-6 h-6" />
                      </div>
                      <div>
                        <div className="text-xs font-black text-blue-700 uppercase tracking-wider">
                          PRO LEARNING ACADEMY
                        </div>
                        <div className="text-sm font-extrabold text-slate-900 font-heading">
                          {isKm ? 'ការជូនដំណឹងផ្លូវការអំពីការបញ្ចប់វគ្គសិក្សា' : 'Official Course Completion Notice'}
                        </div>
                      </div>
                    </div>

                    {/* Email Text / HTML Content */}
                    <div className="text-xs sm:text-sm text-slate-700 leading-relaxed space-y-3 font-normal">
                      <p className="font-semibold text-slate-900">
                        {isKm ? `ជម្រាបសួរ ${user?.name || 'សិស្សជាទីស្រឡាញ់'},` : `Dear ${user?.name || 'Student'},`}
                      </p>

                      <p>
                        {selectedEmail.bodyText}
                      </p>

                      {selectedEmail.courseTitle && (
                        <div className="my-4 p-4 rounded-xl bg-white border border-slate-200 space-y-2">
                          <div className="text-[11px] text-slate-500 font-bold uppercase">
                            {isKm ? 'ឈ្មោះវគ្គសិក្សាដែលបានបញ្ចប់' : 'Completed Course'}
                          </div>
                          <div className="text-sm font-bold text-blue-900">
                            {selectedEmail.courseTitle}
                          </div>
                          {selectedEmail.certificateCode && (
                            <div className="text-xs text-slate-600 flex items-center gap-2 pt-1 font-mono">
                              <span className="text-slate-400">{isKm ? 'លេខកូដផ្ទៀងផ្ទាត់:' : 'Verification Code:'}</span>
                              <span className="px-2 py-0.5 rounded bg-slate-100 text-slate-800 font-bold">
                                {selectedEmail.certificateCode}
                              </span>
                            </div>
                          )}
                        </div>
                      )}

                      <p className="text-xs text-slate-500">
                        {isKm
                          ? 'អ្នកអាចទាញយក ឬបោះពុម្ពវិញ្ញាបនបត្រផ្លូវការនេះបានគ្រប់ពេលវេលាតាមរយៈគណនីរបស់អ្នក។'
                          : 'You can download, share, or print your official certificate at any time directly from your dashboard.'}
                      </p>
                    </div>

                    {/* Certificate Action Button inside Email */}
                    {selectedEmail.certificateCode && (
                      <div className="pt-3">
                        <button
                          onClick={() => {
                            onViewCertificate(selectedEmail.certificateCode);
                            onClose();
                          }}
                          className="w-full sm:w-auto px-6 py-3 rounded-xl bg-gradient-to-r from-blue-700 to-indigo-800 hover:from-blue-600 hover:to-indigo-700 text-white font-extrabold text-xs transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer"
                        >
                          <Award className="w-4 h-4 text-amber-400" />
                          <span>{isKm ? 'មើលវិញ្ញាបនបត្រផ្លូវការឥឡូវនេះ' : 'View Official Certificate'}</span>
                          <ExternalLink className="w-3.5 h-3.5 opacity-80" />
                        </button>
                      </div>
                    )}

                  </div>

                </div>

              </div>
            ) : (
              <div className="flex-1 flex items-center justify-center p-8 text-slate-400 text-xs">
                {isKm ? 'សូមជ្រើសរើសអ៊ីម៉ែលមួយដើម្បីមើលព័ត៌មានលម្អិត' : 'Select an email from the left sidebar to view contents'}
              </div>
            )}
          </div>

        </div>

      </div>
    </div>
  );
};
