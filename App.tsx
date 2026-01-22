import React, { useState } from 'react';
import { CardGame } from './components/CardGame';
import { ImageFeatures } from './components/ImageFeatures';
import { History } from './components/History';
import { AppMode } from './types';
import { Heart, Image, ScanEye, BookHeart } from 'lucide-react';

const App: React.FC = () => {
  const [mode, setMode] = useState<AppMode>(AppMode.GAME);

  const renderContent = () => {
    switch (mode) {
      case AppMode.GAME:
        return <CardGame />;
      case AppMode.IMAGE_EDITOR:
        return <ImageFeatures mode={AppMode.IMAGE_EDITOR} />;
      case AppMode.IMAGE_ANALYZER:
        return <ImageFeatures mode={AppMode.IMAGE_ANALYZER} />;
      case AppMode.HISTORY:
        return <History />;
      default:
        return <CardGame />;
    }
  };

  return (
    // Use fixed inset-0 to force the app to match the viewport height exactly, preventing body scroll
    <div className="fixed inset-0 bg-slate-50 flex flex-col overflow-hidden">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-md z-50 border-b border-slate-200 shrink-0">
        <div className="max-w-4xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-rose-500 rounded-lg flex items-center justify-center text-white">
              <Heart size={20} fill="currentColor" />
            </div>
            <h1 className="font-serif font-bold text-xl tracking-tight text-slate-900">
              Couple<span className="text-rose-500">Connect</span>
            </h1>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      {/* Conditionally handle overflow: Hidden for Game (to prevent swipe scroll), Auto for others */}
      <main className={`flex-1 relative flex flex-col ${mode === AppMode.GAME ? 'overflow-hidden' : 'overflow-y-auto'}`}>
        {renderContent()}
      </main>

      {/* Sticky Bottom Navigation */}
      <div className="bg-white border-t border-slate-200 pb-safe shrink-0 z-50">
        <div className="max-w-md mx-auto flex justify-between px-2 py-1">
          <button
            onClick={() => setMode(AppMode.GAME)}
            className={`flex flex-col items-center p-2 rounded-xl transition-all flex-1 ${
              mode === AppMode.GAME ? 'text-rose-500' : 'text-slate-400 hover:text-slate-600'
            }`}
          >
            <div className={`p-1 rounded-lg ${mode === AppMode.GAME ? 'bg-rose-50' : ''}`}>
                <Heart size={22} className={mode === AppMode.GAME ? 'fill-current' : ''} />
            </div>
            <span className="text-[10px] font-medium mt-1">Câu hỏi</span>
          </button>

          <button
            onClick={() => setMode(AppMode.IMAGE_EDITOR)}
            className={`flex flex-col items-center p-2 rounded-xl transition-all flex-1 ${
              mode === AppMode.IMAGE_EDITOR ? 'text-rose-500' : 'text-slate-400 hover:text-slate-600'
            }`}
          >
             <div className={`p-1 rounded-lg ${mode === AppMode.IMAGE_EDITOR ? 'bg-rose-50' : ''}`}>
                <Image size={22} />
             </div>
            <span className="text-[10px] font-medium mt-1">Chỉnh ảnh</span>
          </button>

          <button
            onClick={() => setMode(AppMode.IMAGE_ANALYZER)}
            className={`flex flex-col items-center p-2 rounded-xl transition-all flex-1 ${
              mode === AppMode.IMAGE_ANALYZER ? 'text-rose-500' : 'text-slate-400 hover:text-slate-600'
            }`}
          >
             <div className={`p-1 rounded-lg ${mode === AppMode.IMAGE_ANALYZER ? 'bg-rose-50' : ''}`}>
                <ScanEye size={22} />
             </div>
            <span className="text-[10px] font-medium mt-1">Phân tích</span>
          </button>

          <button
            onClick={() => setMode(AppMode.HISTORY)}
            className={`flex flex-col items-center p-2 rounded-xl transition-all flex-1 ${
              mode === AppMode.HISTORY ? 'text-rose-500' : 'text-slate-400 hover:text-slate-600'
            }`}
          >
            <div className={`p-1 rounded-lg ${mode === AppMode.HISTORY ? 'bg-rose-50' : ''}`}>
                <BookHeart size={22} />
             </div>
            <span className="text-[10px] font-medium mt-1">Kỷ niệm</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default App;