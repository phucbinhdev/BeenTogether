import React, { useState, useEffect, useRef } from "react";
import { QUESTIONS } from "../constants";
import { PlayerTurn, CardQuestion } from "../types";
import { Heart, Plus, X } from "lucide-react";
import {
  getCustomQuestions,
  saveCustomQuestion,
} from "../services/storageService";
import { supabase } from "../utils/supabase/client";

export const CardGame: React.FC = () => {
  // Combine default questions with custom ones
  const [deck, setDeck] = useState<CardQuestion[]>(QUESTIONS);
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [turn, setTurn] = useState<PlayerTurn>(PlayerTurn.PLAYER_1);
  const [loading, setLoading] = useState(true);

  // Add Question Modal State
  const [showAddModal, setShowAddModal] = useState(false);
  const [newQuestionContent, setNewQuestionContent] = useState("");
  const [newQuestionCategory, setNewQuestionCategory] = useState<
    "fun" | "deep" | "spicy"
  >("fun");

  // Drag State
  const [dragX, setDragX] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const startX = useRef(0);

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const { data, error } = await supabase
          .from("questions")
          .select("*")
          // explicitly check handles both false and null if needed, or just neq true
          .neq("is_hidden", true);

        if (error) throw error;

        if (data && data.length > 0) {
          // Shuffle array so it's random each time
          const shuffled = [...data].sort(() => Math.random() - 0.5);
          setDeck(shuffled);
        } else {
          // Fallback if DB is empty
          const custom = getCustomQuestions();
          setDeck([...QUESTIONS, ...custom].sort(() => Math.random() - 0.5));
        }
      } catch (err) {
        console.warn(
          "Falling back to local questions due to Supabase error:",
          err,
        );
        const custom = getCustomQuestions();
        setDeck([...QUESTIONS, ...custom].sort(() => Math.random() - 0.5));
      } finally {
        setLoading(false);
      }
    };

    fetchQuestions();
  }, []);

  const handleNext = () => {
    setDragX(0); // Ensure drag is reset

    // Move to next card
    setCurrentCardIndex((prev) => (prev + 1) % deck.length);
    setTurn((prev) =>
      prev === PlayerTurn.PLAYER_1 ? PlayerTurn.PLAYER_2 : PlayerTurn.PLAYER_1,
    );
  };

  const handleAddQuestion = async () => {
    if (!newQuestionContent.trim()) return;

    try {
      const { data, error } = await supabase
        .from("questions")
        .insert([
          {
            content: newQuestionContent.trim(),
            category: newQuestionCategory,
          },
        ])
        .select();

      if (error) throw error;

      if (data && data.length > 0) {
        setDeck((prev) => [...prev, data[0]]);
      }
    } catch (err) {
      console.warn("Could not save to Supabase, saving locally", err);
      const newQuestion: CardQuestion = {
        id: `custom-${Date.now()}`,
        content: newQuestionContent.trim(),
        category: newQuestionCategory,
        isCustom: true,
      };
      saveCustomQuestion(newQuestion);
      setDeck((prev) => [...prev, newQuestion]);
    }

    setNewQuestionContent("");
    setShowAddModal(false);
  };

  // Touch/Mouse Handlers
  const handleDragStart = (e: React.TouchEvent | React.MouseEvent) => {
    setIsDragging(true);
    const clientX = "touches" in e ? e.touches[0].clientX : e.clientX;
    startX.current = clientX;
  };

  const handleDragMove = (e: React.TouchEvent | React.MouseEvent) => {
    if (!isDragging) return;
    const clientX = "touches" in e ? e.touches[0].clientX : e.clientX;
    setDragX(clientX - startX.current);
  };

  const handleDragEnd = () => {
    setIsDragging(false);
    if (Math.abs(dragX) > 100) {
      handleNext();
    } else {
      setDragX(0); // Snap back
    }
  };

  // Helper to render a single card
  const renderCard = (index: number, isTop: boolean) => {
    const question = deck[index % deck.length];

    // Style calculation
    let style: React.CSSProperties = {};
    let className =
      "absolute top-0 left-0 w-full h-full rounded-3xl shadow-xl bg-white flex flex-col items-center justify-center p-8 text-center border border-slate-100 transition-transform duration-300 select-none";

    if (isTop) {
      className += " z-30 cursor-grab active:cursor-grabbing";
      style = {
        transform: `translateX(${dragX}px) rotate(${dragX * 0.05}deg)`,
        transition: isDragging ? "none" : "transform 0.3s ease-out",
      };
    } else {
      // Stack effect
      const offsetIndex = index - currentCardIndex;
      const scale = 1 - offsetIndex * 0.05;
      const translateY = offsetIndex * 15; // move down slightly
      const opacity = 1 - offsetIndex * 0.3;

      className += ` z-${30 - offsetIndex * 10}`;
      style = {
        transform: `translateY(${translateY}px) scale(${scale})`,
        opacity: opacity,
      };
    }

    const categoryColor =
      question.category === "deep"
        ? "bg-rose-100 text-rose-500"
        : question.category === "fun"
          ? "bg-blue-100 text-blue-500"
          : "bg-purple-100 text-purple-500";

    return (
      <div
        key={`${question.id}-${index}`}
        className={className}
        style={style}
        onMouseDown={isTop ? handleDragStart : undefined}
        onTouchStart={isTop ? handleDragStart : undefined}
      >
        {/* Badge */}
        <span
          className={`mb-8 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest ${categoryColor}`}
        >
          {question.isCustom ? "Tự tạo • " : ""}
          {question.category}
        </span>

        {/* Content */}
        <p className="text-2xl font-serif font-medium text-slate-800 leading-relaxed max-w-[90%] pointer-events-none">
          {question.content}
        </p>

        {/* Heart Icon */}
        <div className="mt-12 text-rose-400 pointer-events-none">
          <Heart size={28} />
        </div>
      </div>
    );
  };

  return (
    <div
      className="flex flex-col items-center justify-center h-full w-full px-4 relative overflow-hidden"
      onMouseMove={handleDragMove}
      onMouseUp={handleDragEnd}
      onMouseLeave={handleDragEnd}
      onTouchMove={handleDragMove}
      onTouchEnd={handleDragEnd}
    >
      {/* Top Controls */}
      <div className="absolute top-4 w-full max-w-sm flex justify-between items-start z-40 px-2">
        <div className="flex flex-col">
          <h2 className="text-xl font-serif font-bold text-slate-800">
            Lượt của {turn}
          </h2>
          <span className="text-sm text-slate-400 font-medium mt-1">
            {deck.length > 0 ? (currentCardIndex % deck.length) + 1 : 0} /{" "}
            {deck.length}
          </span>
        </div>
        <button
          onClick={() => setShowAddModal(true)}
          className="flex items-center gap-1.5 px-4 py-2 bg-white border border-rose-200 text-rose-500 rounded-full text-sm font-semibold shadow-sm hover:bg-rose-50 transition-colors"
        >
          <Plus size={16} /> Thêm câu hỏi
        </button>
      </div>

      {loading ? (
        <div className="flex flex-col items-center justify-center">
          <div className="animate-pulse w-12 h-12 bg-rose-200 rounded-full mb-4"></div>
          <p className="text-slate-500 font-medium">Đang tải câu hỏi...</p>
        </div>
      ) : deck.length === 0 ? (
        <div className="flex flex-col items-center justify-center text-center px-6">
          <p className="text-slate-500 font-medium mb-4">
            Chưa có câu hỏi nào trong kho.
          </p>
          <button
            onClick={() => setShowAddModal(true)}
            className="px-6 py-2.5 bg-rose-500 text-white rounded-xl font-bold hover:bg-rose-600 transition-all shadow-md hover:shadow-lg hover:shadow-rose-300"
          >
            Tạo câu hỏi đầu tiên
          </button>
        </div>
      ) : (
        <div className="relative w-full max-w-sm aspect-[3/4] max-h-[65vh]">
          {/* Render stack order: Bottom to Top */}
          {/* We render next 2 cards for the stack effect */}
          {renderCard(currentCardIndex + 2, false)}
          {renderCard(currentCardIndex + 1, false)}
          {renderCard(currentCardIndex, true)}
        </div>
      )}

      {/* Add Question Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-fade-in">
          <div className="bg-white rounded-3xl shadow-2xl w-full max-w-sm overflow-hidden">
            <div className="px-6 py-5 border-b border-slate-100 flex justify-between items-center bg-slate-50/80">
              <h3 className="font-bold text-slate-800 text-lg">
                Thêm câu hỏi mới
              </h3>
              <button
                onClick={() => setShowAddModal(false)}
                className="text-slate-400 hover:text-slate-600 p-1 rounded-full hover:bg-slate-200/50 transition-colors"
              >
                <X size={20} />
              </button>
            </div>
            <div className="p-6 space-y-5">
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase mb-2 tracking-wide">
                  Nội dung câu hỏi
                </label>
                <textarea
                  value={newQuestionContent}
                  onChange={(e) => setNewQuestionContent(e.target.value)}
                  className="w-full border border-slate-200 rounded-xl p-4 focus:ring-2 focus:ring-rose-500 focus:border-transparent outline-none text-slate-700 bg-slate-50"
                  rows={3}
                  placeholder="Nhập câu hỏi của bạn..."
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase mb-2 tracking-wide">
                  Chủ đề
                </label>
                <div className="grid grid-cols-3 gap-3">
                  {(["fun", "deep", "spicy"] as const).map((cat) => (
                    <button
                      key={cat}
                      onClick={() => setNewQuestionCategory(cat)}
                      className={`py-2.5 rounded-xl text-sm font-semibold capitalize border transition-all ${
                        newQuestionCategory === cat
                          ? "border-rose-500 bg-rose-50 text-rose-600 shadow-sm"
                          : "border-slate-200 text-slate-500 hover:bg-slate-50"
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>
              <button
                onClick={handleAddQuestion}
                disabled={!newQuestionContent.trim()}
                className="w-full py-3.5 bg-rose-500 text-white rounded-xl font-bold hover:bg-rose-600 transition-all disabled:opacity-50 hover:shadow-lg hover:shadow-rose-200 mt-2"
              >
                Tạo thẻ bài
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
