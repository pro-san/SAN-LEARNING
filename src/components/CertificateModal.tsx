import React from 'react';
import { X, Award, Printer, Download, CheckCircle2, Sparkles } from 'lucide-react';
import { Certificate } from '../types';

interface CertificateModalProps {
  certificate: Certificate | null;
  isOpen: boolean;
  onClose: () => void;
  lang: 'km' | 'en';
}

export const CertificateModal: React.FC<CertificateModalProps> = ({
  certificate,
  isOpen,
  onClose,
  lang,
}) => {
  if (!isOpen || !certificate) return null;

  const isKm = lang === 'km';

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/80 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200">
      
      <div className="bg-white rounded-3xl max-w-2xl w-full shadow-2xl border border-slate-200 overflow-hidden relative flex flex-col">
        
        {/* Header Actions */}
        <div className="p-4 bg-slate-900 text-white flex items-center justify-between print:hidden">
          <div className="flex items-center gap-2">
            <Award className="w-5 h-5 text-amber-400" />
            <span className="text-xs font-bold">{isKm ? 'វិញ្ញាបនបត្របញ្ចប់ការសិក្សា' : 'Certificate of Completion'}</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs font-bold flex items-center gap-1.5"
            >
              <Printer className="w-4 h-4" />
              <span>{isKm ? 'បោះពុម្ព / ទាញយក' : 'Print / Download'}</span>
            </button>
            <button onClick={onClose} className="p-1.5 text-slate-400 hover:text-white">
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Certificate Frame Content */}
        <div className="p-8 sm:p-12 bg-amber-50/40 text-center space-y-6 border-8 border-double border-amber-600/30 m-4 rounded-2xl relative print:m-0 print:border-4">
          
          <div className="absolute top-4 left-4 text-amber-600/20">
            <Sparkles className="w-12 h-12" />
          </div>
          <div className="absolute bottom-4 right-4 text-amber-600/20">
            <Sparkles className="w-12 h-12" />
          </div>

          {/* Seal */}
          <div className="w-16 h-16 mx-auto bg-gradient-to-tr from-amber-600 to-yellow-400 text-white rounded-full flex items-center justify-center shadow-lg ring-4 ring-amber-200">
            <Award className="w-9 h-9" />
          </div>

          <div className="space-y-1">
            <h2 className="text-xs uppercase tracking-widest font-bold text-amber-800">
              {isKm ? 'ព្រះរាជាណាចក្រកម្ពុជា' : 'KINGDOM OF CAMBODIA'}
            </h2>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-heading">
              {isKm ? 'វិញ្ញាបនបត្របញ្ជាក់ការសិក្សា' : 'CERTIFICATE OF COMPLETION'}
            </h1>
            <p className="text-xs text-slate-500 font-semibold italic">
              {isKm ? 'PRO LEARNING - វិទ្យាស្ថានអប់រំឌីជីថល' : 'PRO LEARNING Digital Academy'}
            </p>
          </div>

          <div className="py-2 space-y-1">
            <p className="text-xs text-slate-500">{isKm ? 'វិញ្ញាបនបត្រនេះផ្តល់ជូនចំពោះ៖' : 'This is proudly awarded to:'}</p>
            <div className="text-2xl sm:text-3xl font-extrabold text-blue-900 font-heading border-b-2 border-amber-400 inline-block px-8 py-1">
              {certificate.studentName}
            </div>
          </div>

          <p className="text-xs sm:text-sm text-slate-700 max-w-lg mx-auto leading-relaxed">
            {isKm ? (
              <>បានបញ្ជាក់ថាសិស្សបានសិក្សាបញ្ចប់ដោយជោគជ័យនូវវគ្គសិក្សា <strong>"{certificate.courseTitle}"</strong> ដោយទទួលបានការវាយតម្លៃលទ្ធផលល្អប្រសើរ។</>
            ) : (
              <>For successfully completing all requirements and lessons for the course <strong>"{certificate.courseTitle}"</strong>.</>
            )}
          </p>

          <div className="pt-6 flex items-center justify-between text-xs text-slate-600 border-t border-amber-200">
            <div className="text-left">
              <div className="text-[10px] text-slate-400 uppercase">{isKm ? 'កាលបរិច្ឆេទចេញ' : 'Issued Date'}</div>
              <div className="font-bold text-slate-800">{certificate.issuedDate}</div>
            </div>

            <div className="text-center">
              <div className="text-[10px] text-slate-400 uppercase">{isKm ? 'លេខកូដសម្គាល់' : 'Verification Code'}</div>
              <div className="font-mono font-bold text-amber-700">{certificate.code}</div>
            </div>

            <div className="text-right">
              <div className="text-[10px] text-slate-400 uppercase">{isKm ? 'ហត្ថលេខានាយក' : 'Authorized Signature'}</div>
              <div className="font-bold text-blue-900 font-heading">លោកគ្រូ សុខ ចាន់ដារ៉ា</div>
            </div>
          </div>

        </div>

      </div>

    </div>
  );
};
