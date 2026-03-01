import React, { useState, useEffect } from "react";
import { CardQuestion } from "../types";
import { X } from "lucide-react";

interface QuestionFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (question: Omit<CardQuestion, "id">) => Promise<void>;
  initialData?: CardQuestion | null;
}

export function QuestionFormModal({
  isOpen,
  onClose,
  onSubmit,
  initialData,
}: QuestionFormModalProps) {
  const [content, setContent] = useState("");
  const [category, setCategory] = useState<"fun" | "deep" | "spicy">("fun");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (initialData) {
      setContent(initialData.content);
      setCategory(initialData.category);
    } else {
      setContent("");
      setCategory("fun");
    }
  }, [initialData, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!content.trim()) return;

    try {
      setLoading(true);
      await onSubmit({ content: content.trim(), category });
      onClose();
    } catch (error) {
      console.error(error);
      alert("Đã xảy ra lỗi khi lưu câu hỏi");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="bg-white rounded-2xl w-full max-w-md overflow-hidden relative shadow-xl">
        <div className="h-14 bg-gradient-to-r from-rose-500 to-pink-500 flex items-center justify-between px-6">
          <h2 className="text-white font-semibold text-lg font-serif">
            {initialData ? "Sửa Câu Hỏi" : "Thêm Câu Hỏi Mới"}
          </h2>
          <button
            onClick={onClose}
            className="text-white/80 hover:text-white transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 flex flex-col gap-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              Nội dung câu hỏi
            </label>
            <textarea
              required
              rows={3}
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="w-full px-3 py-2 border border-slate-200 rounded-xl focus:ring-2 focus:ring-rose-500/20 focus:border-rose-500 outline-none transition-all resize-none"
              placeholder="Nhập nội dung câu hỏi..."
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              Thể loại
            </label>
            <select
              value={category}
              onChange={(e) =>
                setCategory(e.target.value as "fun" | "deep" | "spicy")
              }
              className="w-full px-3 py-2 border border-slate-200 rounded-xl focus:ring-2 focus:ring-rose-500/20 focus:border-rose-500 outline-none transition-all bg-white"
            >
              <option value="fun">Vui vẻ (Fun)</option>
              <option value="deep">Sâu sắc (Deep)</option>
              <option value="spicy">Nóng bỏng (Spicy)</option>
            </select>
          </div>

          <div className="flex gap-3 justify-end mt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-slate-600 hover:bg-slate-100 rounded-xl font-medium transition-colors"
            >
              Hủy
            </button>
            <button
              type="submit"
              disabled={loading || !content.trim()}
              className="px-6 py-2 bg-gradient-to-r from-rose-500 to-pink-500 text-white rounded-xl font-medium shadow-md shadow-rose-500/25 hover:shadow-rose-500/40 transform active:scale-95 transition-all disabled:opacity-50"
            >
              {loading ? "Đang lưu..." : "Lưu lại"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
