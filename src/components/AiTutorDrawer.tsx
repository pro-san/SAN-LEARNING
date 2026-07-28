import React, { useState } from 'react';
import { X, Sparkles, Send, Bot, User as UserIcon, RefreshCw, MessageSquare } from 'lucide-react';

interface AiTutorDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  lang: 'km' | 'en';
}

interface Message {
  id: string;
  sender: 'user' | 'ai';
  text: string;
  time: string;
}

export const AiTutorDrawer: React.FC<AiTutorDrawerProps> = ({ isOpen, onClose, lang }) => {
  if (!isOpen) return null;

  const isKm = lang === 'km';

  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      sender: 'ai',
      text: isKm 
        ? 'សួស្តីប្អូន! ខ្ញុំគឺជា "គ្រូបង្រៀន AI (Gemini Tutor)" របស់ PRO LEARNING។ ប្អូនមានសំណួរមេរៀន ត្រូវការពន្យល់លំហាត់ ឬគន្លឹះសិក្សាអ្វីខ្លះដែរ?'
        : 'Hello! I am your PRO LEARNING AI Tutor Assistant. Ask me any lesson questions, study tips, coding explanations, or math problems!',
      time: 'ទើបតែឥឡូវ'
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const quickPrompts = [
    { km: 'ពន្យល់ React State & Hooks ងាយៗ', en: 'Explain React State & Hooks simply' },
    { km: 'គន្លឹះដោះស្រាយលីមីត 0/0', en: 'Tips for solving limits 0/0' },
    { km: 'របៀបសរសេរ Email សុំច្បាប់ជាភាសាអង់គ្លេស', en: 'How to write formal leave email in English' },
    { km: 'តើធ្វើដូចម្តេចដើម្បីចងចាំមេរៀនបានយូរ?', en: 'How to memorize study lessons effectively?' }
  ];

  const handleSend = async (queryText?: string) => {
    const textToSend = queryText || inputText.trim();
    if (!textToSend || isLoading) return;

    const userMsg: Message = {
      id: Date.now().toString(),
      sender: 'user',
      text: textToSend,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMsg]);
    if (!queryText) setInputText('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/ai/tutor', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          question: textToSend,
          language: lang
        })
      });

      const data = await response.json();
      const aiReply: Message = {
        id: (Date.now() + 1).toString(),
        sender: 'ai',
        text: data.reply || (isKm ? 'សុំអភ័យទោស មិនអាចទាញយកចម្លើយបានទេ។ សូមព្យាយាមម្តងទៀត!' : 'Sorry, unable to get response.'),
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };

      setMessages(prev => [...prev, aiReply]);
    } catch (error) {
      console.error('AI Tutor error:', error);
      setMessages(prev => [...prev, {
        id: (Date.now() + 1).toString(),
        sender: 'ai',
        text: isKm ? 'មានបញ្ហាតភ្ជាប់បណ្តាញ! សូមពិនិត្យមើលអ៊ីនធឺណិតរបស់អ្នក។' : 'Network error! Please check connection.',
        time: 'ឥឡូវ'
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-y-0 right-0 z-50 w-full max-w-md bg-white shadow-2xl border-l border-slate-200 flex flex-col animate-in slide-in-from-right duration-300">
      
      {/* Header */}
      <div className="p-4 bg-gradient-to-r from-indigo-900 to-blue-900 text-white flex items-center justify-between border-b border-indigo-800">
        <div className="flex items-center gap-2.5">
          <div className="p-2 bg-indigo-500/30 rounded-xl text-amber-300 border border-indigo-400/30">
            <Sparkles className="w-5 h-5 animate-pulse" />
          </div>
          <div>
            <h2 className="text-sm font-bold font-heading">
              {isKm ? 'គ្រូបង្រៀន AI - ជំនួយការសិក្សា' : 'AI Tutor Assistant'}
            </h2>
            <p className="text-[10px] text-indigo-200">
              {isKm ? 'ឆ្ងល់អ្វី សួរ AI បាន ២៤/៧' : 'Powered by Gemini AI Engine'}
            </p>
          </div>
        </div>

        <button onClick={onClose} className="p-2 text-indigo-200 hover:text-white rounded-lg">
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Messages Scroll Area */}
      <div className="flex-1 p-4 overflow-y-auto space-y-4 bg-slate-50">
        
        {messages.map((m) => (
          <div
            key={m.id}
            className={`flex gap-3 ${m.sender === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            {m.sender === 'ai' && (
              <div className="w-8 h-8 rounded-full bg-indigo-600 text-white flex items-center justify-center shrink-0 shadow-sm mt-1">
                <Bot className="w-4 h-4" />
              </div>
            )}

            <div className={`max-w-[85%] rounded-2xl p-3.5 text-xs leading-relaxed ${
              m.sender === 'user'
                ? 'bg-blue-600 text-white font-medium'
                : 'bg-white text-slate-800 border border-slate-200 shadow-xs whitespace-pre-wrap'
            }`}>
              {m.text}
              <div className={`text-[9px] mt-1 text-right ${m.sender === 'user' ? 'text-blue-200' : 'text-slate-400'}`}>
                {m.time}
              </div>
            </div>
          </div>
        ))}

        {isLoading && (
          <div className="flex gap-2 items-center text-xs text-indigo-600 bg-indigo-50 p-3 rounded-2xl border border-indigo-100 max-w-[80%]">
            <RefreshCw className="w-4 h-4 animate-spin" />
            <span>{isKm ? 'គ្រូបង្រៀន AI កំពុងរៀបចំចម្លើយពន្យល់...' : 'AI Tutor is thinking...'}</span>
          </div>
        )}

      </div>

      {/* Quick Prompts */}
      <div className="p-3 bg-white border-t border-slate-100 space-y-1.5">
        <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
          {isKm ? 'សំណួរគំរូសួរញឹកញាប់' : 'Suggested Questions'}
        </div>
        <div className="flex flex-wrap gap-1.5 max-h-24 overflow-y-auto">
          {quickPrompts.map((qp, idx) => (
            <button
              key={idx}
              onClick={() => handleSend(isKm ? qp.km : qp.en)}
              className="text-[11px] px-2.5 py-1 bg-slate-100 hover:bg-indigo-50 hover:text-indigo-700 text-slate-700 rounded-lg transition-colors border border-slate-200/60 truncate max-w-full"
            >
              💡 {isKm ? qp.km : qp.en}
            </button>
          ))}
        </div>
      </div>

      {/* Footer Input */}
      <div className="p-3 bg-white border-t border-slate-200">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSend();
          }}
          className="flex items-center gap-2"
        >
          <input
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder={isKm ? 'សួរសំណួរមេរៀននៅទីនេះ...' : 'Ask your lesson question here...'}
            className="flex-1 px-3.5 py-2.5 bg-slate-100 border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500 font-medium"
          />
          <button
            type="submit"
            disabled={!inputText.trim() || isLoading}
            className="p-2.5 bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 text-white rounded-xl transition-all shadow-md"
          >
            <Send className="w-4 h-4" />
          </button>
        </form>
      </div>

    </div>
  );
};
