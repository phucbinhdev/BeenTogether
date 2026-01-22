import React, { useState, useRef } from 'react';
import { Upload, Wand2, Search, Loader2, Image as ImageIcon, Save } from 'lucide-react';
import { fileToGenerativePart, fileToDataUrl, editImageContent, analyzeImageContent } from '../services/geminiService';
import { AppMode } from '../types';

interface ImageFeaturesProps {
  mode: AppMode.IMAGE_EDITOR | AppMode.IMAGE_ANALYZER;
}

export const ImageFeatures: React.FC<ImageFeaturesProps> = ({ mode }) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [prompt, setPrompt] = useState('');
  const [loading, setLoading] = useState(false);
  const [resultImage, setResultImage] = useState<string | null>(null);
  const [resultText, setResultText] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const isEditor = mode === AppMode.IMAGE_EDITOR;

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      const url = await fileToDataUrl(file);
      setPreviewUrl(url);
      setResultImage(null);
      setResultText(null);
    }
  };

  const handleProcess = async () => {
    if (!selectedFile) return;
    
    setLoading(true);
    setResultImage(null);
    setResultText(null);

    try {
      const base64Data = await fileToGenerativePart(selectedFile);
      const mimeType = selectedFile.type;

      if (isEditor) {
        // Edit Mode (Nano Banana)
        const { imageUrl, text } = await editImageContent(base64Data, mimeType, prompt);
        setResultImage(imageUrl);
        setResultText(text); // Sometimes it returns text explaining why it can't, or just text
      } else {
        // Analyze Mode (Gemini 3 Pro)
        const analysis = await analyzeImageContent(base64Data, mimeType, prompt || "Hãy phân tích hình ảnh này thật chi tiết cho tôi.");
        setResultText(analysis || "Không có phản hồi văn bản.");
      }
    } catch (error) {
      console.error(error);
      setResultText("Đã xảy ra lỗi khi xử lý hình ảnh. Vui lòng thử lại.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto px-4 pb-20">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-serif font-bold text-slate-800">
          {isEditor ? 'Chỉnh sửa ảnh sáng tạo' : 'Phân tích hình ảnh'}
        </h2>
        <p className="text-slate-500 mt-2">
          {isEditor 
            ? 'Sử dụng Gemini 2.5 để chỉnh sửa ảnh theo ý muốn của bạn.' 
            : 'Tải ảnh lên để Gemini 3 Pro phân tích và đưa ra nhận định.'}
        </p>
      </div>

      {/* Upload Section */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 mb-6">
        <input 
          type="file" 
          accept="image/*" 
          onChange={handleFileChange} 
          className="hidden" 
          ref={fileInputRef}
        />
        
        {!previewUrl ? (
          <div 
            onClick={() => fileInputRef.current?.click()}
            className="border-2 border-dashed border-slate-300 rounded-xl p-10 flex flex-col items-center justify-center cursor-pointer hover:bg-slate-50 transition-colors"
          >
            <Upload className="w-10 h-10 text-slate-400 mb-3" />
            <span className="text-slate-600 font-medium">Chạm để tải ảnh lên</span>
            <span className="text-slate-400 text-sm mt-1">JPG, PNG</span>
          </div>
        ) : (
          <div className="relative rounded-xl overflow-hidden bg-slate-100">
            <img src={previewUrl} alt="Preview" className="w-full h-auto max-h-[400px] object-contain mx-auto" />
            <button 
              onClick={() => {
                setPreviewUrl(null);
                setSelectedFile(null);
                setResultImage(null);
                setResultText(null);
              }}
              className="absolute top-2 right-2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full backdrop-blur-sm transition-colors"
            >
              <Upload size={16} className="rotate-45" />
            </button>
          </div>
        )}

        {/* Controls */}
        <div className="mt-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              {isEditor ? 'Yêu cầu chỉnh sửa' : 'Câu hỏi về bức ảnh (Tùy chọn)'}
            </label>
            <div className="flex gap-2">
              <input
                type="text"
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder={isEditor ? "Ví dụ: Thêm hiệu ứng retro..." : "Ví dụ: Bức ảnh này nói về điều gì?"}
                className="flex-1 px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent outline-none"
              />
              <button
                onClick={handleProcess}
                disabled={!selectedFile || loading || (isEditor && !prompt)}
                className={`px-6 py-2 rounded-lg font-medium text-white flex items-center gap-2 transition-all ${
                  !selectedFile || loading || (isEditor && !prompt)
                    ? 'bg-slate-300 cursor-not-allowed' 
                    : 'bg-rose-500 hover:bg-rose-600 shadow-md'
                }`}
              >
                {loading ? (
                  <Loader2 className="animate-spin" size={20} />
                ) : isEditor ? (
                  <><Wand2 size={20} /> Tạo</>
                ) : (
                  <><Search size={20} /> Phân tích</>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Results Section */}
      {(resultImage || resultText) && (
        <div className="bg-white rounded-2xl shadow-lg border border-rose-100 overflow-hidden animate-fade-in">
          <div className="bg-rose-50 px-6 py-3 border-b border-rose-100 flex items-center justify-between">
            <h3 className="font-semibold text-rose-800 flex items-center gap-2">
              {isEditor ? <ImageIcon size={18} /> : <Search size={18} />}
              Kết quả từ Gemini
            </h3>
            {resultImage && (
                <a 
                  href={resultImage} 
                  download="gemini_edit.png"
                  className="text-rose-600 hover:text-rose-700 p-1"
                  title="Download"
                >
                    <Save size={20}/>
                </a>
            )}
          </div>
          <div className="p-6">
            {resultImage && (
              <div className="mb-4 rounded-xl overflow-hidden border border-slate-100 shadow-sm">
                <img src={resultImage} alt="Generated result" className="w-full h-auto" />
              </div>
            )}
            {resultText && (
              <div className="prose prose-slate max-w-none text-slate-700 bg-slate-50 p-4 rounded-lg">
                <p className="whitespace-pre-wrap">{resultText}</p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};