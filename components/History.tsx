import React, { useEffect, useState } from 'react';
import { getAnswerHistory, clearHistory } from '../services/storageService';
import { AnswerRecord } from '../types';
import { Calendar, Trash2, MessageCircleHeart } from 'lucide-react';

export const History: React.FC = () => {
  const [history, setHistory] = useState<AnswerRecord[]>([]);

  useEffect(() => {
    setHistory(getAnswerHistory());
  }, []);

  const handleClear = () => {
    if (confirm("Bạn có chắc chắn muốn xóa toàn bộ lịch sử không?")) {
      clearHistory();
      setHistory([]);
    }
  };

  // Group history by date
  const groupedHistory = history.reduce<Record<string, AnswerRecord[]>>((groups, record) => {
    const date = new Date(record.timestamp).toLocaleDateString('vi-VN', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
    if (!groups[date]) {
      groups[date] = [];
    }
    groups[date].push(record);
    return groups;
  }, {});

  return (
    <div className="max-w-2xl mx-auto px-4 pb-24">
        <div className="flex items-center justify-between mb-8 mt-4">
            <div>
                <h2 className="text-2xl font-serif font-bold text-slate-800">Kỷ niệm</h2>
                <p className="text-slate-500 text-sm">Những câu trả lời đã lưu</p>
            </div>
            {history.length > 0 && (
                <button 
                    onClick={handleClear}
                    className="p-2 text-rose-400 hover:text-rose-600 hover:bg-rose-50 rounded-full transition-colors"
                    title="Xóa lịch sử"
                >
                    <Trash2 size={20} />
                </button>
            )}
        </div>

      {history.length === 0 ? (
        <div className="text-center py-20 bg-white rounded-2xl border border-slate-100 shadow-sm">
          <MessageCircleHeart className="w-12 h-12 text-slate-300 mx-auto mb-4" />
          <p className="text-slate-500 font-medium">Chưa có câu trả lời nào được lưu.</p>
          <p className="text-slate-400 text-sm mt-1">Hãy chơi game và lưu lại khoảnh khắc nhé!</p>
        </div>
      ) : (
        <div className="space-y-8">
          {(Object.entries(groupedHistory) as [string, AnswerRecord[]][]).map(([date, records]) => (
            <div key={date} className="animate-fade-in">
              <div className="flex items-center gap-2 mb-4 text-rose-500 font-medium bg-rose-50 px-4 py-2 rounded-full inline-flex">
                <Calendar size={16} />
                <span className="text-sm">{date}</span>
              </div>
              
              <div className="space-y-4">
                {records.map((record) => (
                  <div key={record.id} className="bg-white p-5 rounded-xl shadow-sm border border-slate-200">
                    <p className="text-slate-800 font-serif font-medium text-lg mb-3">
                      {record.questionContent}
                    </p>
                    <div className="flex items-start gap-3 bg-slate-50 p-3 rounded-lg">
                      <div className="min-w-[60px]">
                        <span className={`text-xs font-bold uppercase tracking-wider px-2 py-1 rounded-md ${
                            record.player === 'Người 1' ? 'bg-blue-100 text-blue-600' : 'bg-pink-100 text-pink-600'
                        }`}>
                            {record.player === 'Người 1' ? 'N1' : 'N2'}
                        </span>
                      </div>
                      <p className="text-slate-600 text-sm leading-relaxed whitespace-pre-wrap">
                        {record.answer}
                      </p>
                    </div>
                    <div className="mt-2 text-right">
                        <span className="text-xs text-slate-400">
                            {new Date(record.timestamp).toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' })}
                        </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};