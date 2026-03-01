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
} from "lucide-react";
import Link from "next/link";
import Papa from "papaparse";

export default function QuestionsPage() {
  const [questions, setQuestions] = useState<CardQuestion[]>([]);
  const [loading, setLoading] = useState(true);
  const [importing, setImporting] = useState(false);
  const fileInputRef = React.useRef<HTMLInputElement>(null);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingQuestion, setEditingQuestion] = useState<CardQuestion | null>(
    null,
  );

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
      // alert("Không thể tải danh sách câu hỏi. Vui lòng kiểm tra kết nối Supabase.");
    } finally {
      setLoading(false);
    }
  };

  const handleAddSubmit = async (data: Omit<CardQuestion, "id">) => {
    try {
      if (editingQuestion) {
        // Update
        const { error } = await supabase
          .from("questions")
          .update(data)
          .eq("id", editingQuestion.id);
        if (error) throw error;
      } else {
        // Add
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

  const handleImport = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setImporting(true);
    try {
      const processQuestions = async (items: any[]) => {
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
          alert("Không tìm thấy dữ liệu hợp lệ trong file!");
          return;
        }

        const { error } = await supabase.from("questions").insert(validItems);

        if (error) throw error;
        alert(`Đã import thành công ${validItems.length} câu hỏi!`);
        fetchQuestions();
      };

      if (file.name.endsWith(".json")) {
        const text = await file.text();
        const data = JSON.parse(text);
        let items = Array.isArray(data) ? data : data.questions || [];
        await processQuestions(items);
      } else if (file.name.endsWith(".csv")) {
        Papa.parse(file, {
          header: true,
          complete: async (results) => {
            await processQuestions(results.data);
          },
          error: (error) => {
            console.error("Lỗi parse CSV:", error);
            alert("Lỗi khi đọc file CSV");
          },
        });
      } else {
        alert("Vui lòng chọn file JSON hoặc CSV");
      }
    } catch (error: any) {
      console.error("Lỗi import:", error);
      alert("Đã xảy ra lỗi khi import: " + error.message);
    } finally {
      if (fileInputRef.current) fileInputRef.current.value = "";
      setImporting(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 pb-safe">
      <header className="bg-white/80 backdrop-blur-md sticky top-0 z-40 border-b border-slate-200">
        <div className="max-w-5xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link
              href="/"
              className="p-2 hover:bg-slate-100 rounded-full transition-colors"
            >
              <ArrowLeft size={20} className="text-slate-600" />
            </Link>
            <h1 className="font-serif font-bold text-xl text-slate-900">
              Quản lý <span className="text-rose-500">Câu Hỏi</span>
            </h1>
          </div>

          <div className="flex gap-2">
            <input
              type="file"
              accept=".csv,.json"
              className="hidden"
              ref={fileInputRef}
              onChange={handleImport}
            />
            <button
              onClick={() => fileInputRef.current?.click()}
              disabled={importing}
              className="flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium bg-slate-100 hover:bg-slate-200 disabled:opacity-50 text-slate-700 rounded-lg transition-colors"
            >
              {importing ? (
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-slate-700"></div>
              ) : (
                <Upload size={16} />
              )}
              <span className="hidden sm:inline">
                {importing ? "Đang import..." : "Import"}
              </span>
            </button>
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

      <main className="max-w-5xl mx-auto px-4 py-8">
        {loading ? (
          <div className="flex items-center justify-center h-64">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-rose-500"></div>
          </div>
        ) : questions.length === 0 ? (
          <div className="bg-white rounded-2xl p-12 text-center border border-slate-200">
            <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-4">
              <Plus className="text-slate-400" size={32} />
            </div>
            <h3 className="text-lg font-medium text-slate-900 mb-2">
              Chưa có câu hỏi nào
            </h3>
            <p className="text-slate-500 mb-6">
              Hãy thêm câu hỏi mới từ nút Thêm mới hoặc Import danh sách gốc.
            </p>
          </div>
        ) : (
          <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-slate-50 border-b border-slate-200">
                    <th className="py-3 px-4 font-semibold text-sm text-slate-600">
                      ID
                    </th>
                    <th className="py-3 px-4 font-semibold text-sm text-slate-600">
                      Nội dung
                    </th>
                    <th className="py-3 px-4 font-semibold text-sm text-slate-600 whitespace-nowrap">
                      Thể loại
                    </th>
                    <th className="py-3 px-4 font-semibold text-sm text-slate-600 whitespace-nowrap text-right">
                      Thao tác
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {questions.map((q) => (
                    <tr
                      key={String(q.id)}
                      className={`hover:bg-slate-50/50 transition-colors ${q.is_hidden ? "opacity-50 bg-slate-50/80" : ""}`}
                    >
                      <td className="py-3 px-4 text-sm text-slate-500">
                        {q.id}
                      </td>
                      <td className="py-3 px-4">
                        <span
                          className={`text-slate-900 ${q.is_hidden ? "line-through text-slate-500" : ""}`}
                        >
                          {q.content}
                        </span>
                      </td>
                      <td className="py-3 px-4">
                        <span
                          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getCategoryColor(q.category)}`}
                        >
                          {getCategoryLabel(q.category)}
                        </span>
                      </td>
                      <td className="py-3 px-4">
                        <div className="flex items-center justify-end gap-2">
                          <button
                            onClick={() => toggleHidden(q)}
                            className="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-lg transition-colors"
                            title={q.is_hidden ? "Hiện câu hỏi" : "Ẩn câu hỏi"}
                          >
                            {q.is_hidden ? (
                              <EyeOff size={18} />
                            ) : (
                              <Eye size={18} />
                            )}
                          </button>
                          <button
                            onClick={() => {
                              setEditingQuestion(q);
                              setIsModalOpen(true);
                            }}
                            className="p-1.5 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                            title="Sửa"
                          >
                            <Pencil size={18} />
                          </button>
                          <button
                            onClick={() => deleteQuestion(q.id)}
                            className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors"
                            title="Xóa"
                          >
                            <Trash2 size={18} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
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
    </div>
  );
}
