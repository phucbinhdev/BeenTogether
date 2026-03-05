"use client";

import React, { useEffect, useState } from "react";
import { supabase } from "../../utils/supabase/client";
import { CardQuestion } from "../../types";
import { QuestionFormModal } from "../../components/QuestionFormModal";
import {
  Plus,
  Pencil,
  Trash2,
  Eye,
  EyeOff,
  Upload,
  ArrowLeft,
  ClipboardPaste,
  X,
  ChevronDown,
} from "lucide-react";
import Link from "next/link";
import Papa from "papaparse";

const PASTE_PLACEHOLDER = `[
  {
    "content": "Khoảnh khắc nào bên nhau khiến bạn hạnh phúc nhất?",
    "category": "deep"
  },
  {
    "content": "Nếu có thể đi du lịch ngay bây giờ, bạn chọn đi đâu?",
    "category": "fun"
  }
]`;

export default function QuestionsPage() {
  const [questions, setQuestions] = useState<CardQuestion[]>([]);
  const [loading, setLoading] = useState(true);
  const [importing, setImporting] = useState(false);
  const fileInputRef = React.useRef<HTMLInputElement>(null);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingQuestion, setEditingQuestion] = useState<CardQuestion | null>(
    null,
  );

  // Paste JSON modal state
  const [isPasteModalOpen, setIsPasteModalOpen] = useState(false);
  const [pasteText, setPasteText] = useState("");
  const [pasteError, setPasteError] = useState("");
  const [importMenuOpen, setImportMenuOpen] = useState(false);

  useEffect(() => {
    fetchQuestions();
  }, []);

  const fetchQuestions = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from("questions")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;
      setQuestions(data || []);
    } catch (error) {
      console.error("Error fetching questions:", error);
    } finally {
      setLoading(false);
    }
  };

  const processAndInsert = async (items: any[]) => {
    const validItems = items
      .filter((item) => item.content && item.category)
      .map((item) => ({
        content: item.content.trim(),
        category: item.category.toLowerCase().trim() as
          | "fun"
          | "deep"
          | "spicy",
        is_hidden:
          item.is_hidden === "true" || item.is_hidden === true || false,
      }));

    if (validItems.length === 0) {
      throw new Error(
        "Không tìm thấy dữ liệu hợp lệ! Mỗi item cần có 'content' và 'category'.",
      );
    }

    const { error } = await supabase.from("questions").insert(validItems);
    if (error) throw error;
    return validItems.length;
  };

  const handleAddSubmit = async (data: Omit<CardQuestion, "id">) => {
    try {
      if (editingQuestion) {
        const { error } = await supabase
          .from("questions")
          .update(data)
          .eq("id", editingQuestion.id);
        if (error) throw error;
      } else {
        const { error } = await supabase.from("questions").insert([data]);
        if (error) throw error;
      }
      fetchQuestions();
    } catch (error: any) {
      console.error("Lỗi khi lưu câu hỏi:", error.message);
      throw error;
    }
  };

  const toggleHidden = async (q: CardQuestion) => {
    try {
      const { error } = await supabase
        .from("questions")
        .update({ is_hidden: !q.is_hidden })
        .eq("id", q.id);

      if (error) throw error;
      setQuestions(
        questions.map((item) =>
          item.id === q.id ? { ...item, is_hidden: !item.is_hidden } : item,
        ),
      );
    } catch (error) {
      console.error("Lỗi khi ẩn/hiện câu hỏi:", error);
      alert("Đã xảy ra lỗi khi cập nhật trạng thái");
    }
  };

  const deleteQuestion = async (id: string | number) => {
    if (!window.confirm("Bạn có chắc chắn muốn xóa câu hỏi này?")) return;

    try {
      const { error } = await supabase.from("questions").delete().eq("id", id);
      if (error) throw error;
      setQuestions(questions.filter((item) => item.id !== id));
    } catch (error) {
      console.error("Lỗi khi xóa câu hỏi:", error);
      alert("Đã xảy ra lỗi khi xóa");
    }
  };

  const handleFileImport = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setImporting(true);
    try {
      if (file.name.endsWith(".json")) {
        const text = await file.text();
        const data = JSON.parse(text);
        const items = Array.isArray(data) ? data : data.questions || [];
        const count = await processAndInsert(items);
        alert(`Đã import thành công ${count} câu hỏi!`);
        fetchQuestions();
        setImporting(false);
      } else if (file.name.endsWith(".csv")) {
        Papa.parse(file, {
          header: true,
          complete: async (results) => {
            try {
              const count = await processAndInsert(results.data);
              alert(`Đã import thành công ${count} câu hỏi!`);
              fetchQuestions();
            } catch (err: any) {
              alert("Lỗi: " + err.message);
            } finally {
              setImporting(false);
            }
          },
          error: () => {
            alert("Lỗi khi đọc file CSV");
            setImporting(false);
          },
        });
        return;
      } else {
        alert("Vui lòng chọn file JSON hoặc CSV");
        setImporting(false);
      }
    } catch (error: any) {
      alert("Đã xảy ra lỗi khi import: " + error.message);
      setImporting(false);
    } finally {
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  };

  const handlePasteImport = async () => {
    setPasteError("");
    if (!pasteText.trim()) {
      setPasteError("Vui lòng dán nội dung JSON vào ô bên trên.");
      return;
    }
    try {
      setImporting(true);
      const data = JSON.parse(pasteText.trim());
      const items = Array.isArray(data) ? data : data.questions || [];
      const count = await processAndInsert(items);
      alert(`Đã import thành công ${count} câu hỏi!`);
      setPasteText("");
      setIsPasteModalOpen(false);
      fetchQuestions();
    } catch (err: any) {
      if (err instanceof SyntaxError) {
        setPasteError("JSON không hợp lệ. Kiểm tra lại định dạng nhé!");
      } else {
        setPasteError(err.message);
      }
    } finally {
      setImporting(false);
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "fun":
        return "bg-amber-100 text-amber-700";
      case "deep":
        return "bg-blue-100 text-blue-700";
      case "spicy":
        return "bg-rose-100 text-rose-700";
      default:
        return "bg-slate-100 text-slate-700";
    }
  };

  const getCategoryLabel = (category: string) => {
    switch (category) {
      case "fun":
        return "Vui vẻ";
      case "deep":
        return "Sâu sắc";
      case "spicy":
        return "Nóng bỏng";
      default:
        return category;
    }
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <header className="bg-white/80 backdrop-blur-md sticky top-0 z-40 border-b border-slate-200">
        <div className="max-w-5xl mx-auto px-3 sm:px-4 h-14 sm:h-16 flex items-center justify-between">
          <div className="flex items-center gap-2 sm:gap-4">
            <Link
              href="/"
              className="p-1.5 sm:p-2 hover:bg-slate-100 rounded-full transition-colors"
            >
              <ArrowLeft size={20} className="text-slate-600" />
            </Link>
            <h1 className="font-serif font-bold text-lg sm:text-xl text-slate-900">
              Quản lý <span className="text-rose-500">Câu Hỏi</span>
            </h1>
          </div>

          <div className="flex gap-2">
            <input
              type="file"
              accept=".csv,.json"
              className="hidden"
              ref={fileInputRef}
              onChange={handleFileImport}
            />

            {/* Import dropdown */}
            <div className="relative">
              <button
                onClick={() => setImportMenuOpen(!importMenuOpen)}
                disabled={importing}
                className="flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium bg-slate-100 hover:bg-slate-200 disabled:opacity-50 text-slate-700 rounded-lg transition-colors"
              >
                {importing ? (
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-slate-700" />
                ) : (
                  <Upload size={16} />
                )}
                <span className="hidden sm:inline">
                  {importing ? "Đang import..." : "Import"}
                </span>
                <ChevronDown size={14} />
              </button>

              {importMenuOpen && (
                <>
                  <div
                    className="fixed inset-0 z-10"
                    onClick={() => setImportMenuOpen(false)}
                  />
                  <div className="absolute right-0 mt-1 w-52 bg-white border border-slate-200 rounded-xl shadow-lg z-20 overflow-hidden">
                    <button
                      onClick={() => {
                        setImportMenuOpen(false);
                        fileInputRef.current?.click();
                      }}
                      className="w-full flex items-center gap-2.5 px-4 py-2.5 text-sm text-slate-700 hover:bg-slate-50 transition-colors"
                    >
                      <Upload size={16} className="text-slate-400" />
                      Tải file JSON / CSV
                    </button>
                    <button
                      onClick={() => {
                        setImportMenuOpen(false);
                        setPasteText("");
                        setPasteError("");
                        setIsPasteModalOpen(true);
                      }}
                      className="w-full flex items-center gap-2.5 px-4 py-2.5 text-sm text-slate-700 hover:bg-slate-50 transition-colors border-t border-slate-100"
                    >
                      <ClipboardPaste size={16} className="text-slate-400" />
                      Dán JSON trực tiếp
                    </button>
                  </div>
                </>
              )}
            </div>

            <button
              onClick={() => {
                setEditingQuestion(null);
                setIsModalOpen(true);
              }}
              className="flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium bg-rose-500 hover:bg-rose-600 text-white rounded-lg transition-colors shadow-sm"
            >
              <Plus size={16} />
              <span className="hidden sm:inline">Thêm mới</span>
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-3 sm:px-4 py-4 sm:py-8">
        {loading ? (
          <div className="flex items-center justify-center h-64">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-rose-500" />
          </div>
        ) : questions.length === 0 ? (
          <div className="bg-white rounded-2xl p-8 sm:p-12 text-center border border-slate-200">
            <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-4">
              <Plus className="text-slate-400" size={32} />
            </div>
            <h3 className="text-lg font-medium text-slate-900 mb-2">
              Chưa có câu hỏi nào
            </h3>
            <p className="text-slate-500 mb-6">
              Hãy thêm câu hỏi mới từ nút <strong>Thêm mới</strong> hoặc{" "}
              <strong>Import</strong>.
            </p>
          </div>
        ) : (
          <div>
            <div className="px-1 py-2 text-sm text-slate-500 mb-2">
              {questions.length} câu hỏi
            </div>
            <div className="flex flex-col gap-2">
              {questions.map((q) => (
                <div
                  key={String(q.id)}
                  className={`bg-white rounded-xl border border-slate-200 p-3 sm:p-4 transition-colors ${q.is_hidden ? "opacity-50 bg-slate-50/80" : ""}`}
                >
                  <div className="flex items-start gap-3">
                    <div className="flex-1 min-w-0">
                      <p
                        className={`text-sm sm:text-base text-slate-900 leading-relaxed ${q.is_hidden ? "line-through text-slate-500" : ""}`}
                      >
                        {q.content}
                      </p>
                      <div className="mt-2">
                        <span
                          className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${getCategoryColor(q.category)}`}
                        >
                          {getCategoryLabel(q.category)}
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center gap-0.5 shrink-0">
                      <button
                        onClick={() => toggleHidden(q)}
                        className="p-2 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-lg transition-colors active:bg-slate-200"
                        title={q.is_hidden ? "Hiện câu hỏi" : "Ẩn câu hỏi"}
                      >
                        {q.is_hidden ? <EyeOff size={18} /> : <Eye size={18} />}
                      </button>
                      <button
                        onClick={() => {
                          setEditingQuestion(q);
                          setIsModalOpen(true);
                        }}
                        className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors active:bg-blue-100"
                        title="Sửa"
                      >
                        <Pencil size={18} />
                      </button>
                      <button
                        onClick={() => deleteQuestion(q.id)}
                        className="p-2 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors active:bg-rose-100"
                        title="Xóa"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </main>

      <QuestionFormModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleAddSubmit}
        initialData={editingQuestion}
      />

      {/* Paste JSON Modal */}
      {isPasteModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="bg-white rounded-2xl w-full max-w-lg overflow-hidden shadow-xl">
            <div className="h-14 bg-slate-800 flex items-center justify-between px-6">
              <div className="flex items-center gap-2">
                <ClipboardPaste size={18} className="text-white/80" />
                <h2 className="text-white font-semibold">Dán JSON trực tiếp</h2>
              </div>
              <button
                onClick={() => setIsPasteModalOpen(false)}
                className="text-white/70 hover:text-white transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            <div className="p-6 flex flex-col gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Dán nội dung JSON vào đây
                </label>
                <textarea
                  rows={12}
                  value={pasteText}
                  onChange={(e) => {
                    setPasteText(e.target.value);
                    setPasteError("");
                  }}
                  className="w-full px-3 py-2.5 border border-slate-200 rounded-xl focus:ring-2 focus:ring-slate-500/20 focus:border-slate-500 outline-none font-mono text-sm resize-none"
                  placeholder={PASTE_PLACEHOLDER}
                  spellCheck={false}
                />
                {pasteError && (
                  <p className="mt-2 text-sm text-rose-600">{pasteError}</p>
                )}
              </div>

              <div className="bg-slate-50 rounded-xl p-3 text-xs text-slate-500">
                Mỗi item cần có:{" "}
                <code className="bg-white px-1 rounded border border-slate-200">
                  content
                </code>{" "}
                và{" "}
                <code className="bg-white px-1 rounded border border-slate-200">
                  category
                </code>{" "}
                (fun / deep / spicy)
              </div>

              <div className="flex gap-3 justify-end">
                <button
                  onClick={() => setIsPasteModalOpen(false)}
                  className="px-4 py-2 text-slate-600 hover:bg-slate-100 rounded-xl font-medium transition-colors"
                >
                  Hủy
                </button>
                <button
                  onClick={handlePasteImport}
                  disabled={importing || !pasteText.trim()}
                  className="px-6 py-2 bg-slate-800 hover:bg-slate-900 text-white rounded-xl font-medium transition-colors disabled:opacity-50"
                >
                  {importing ? "Đang import..." : "Import"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
