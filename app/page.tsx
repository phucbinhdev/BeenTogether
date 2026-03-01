"use client";

import React from "react";
import { CardGame } from "../components/CardGame";
import { Heart, Settings } from "lucide-react";
import Link from "next/link";

export default function App() {
  return (
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
          <Link
            href="/questions"
            className="flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium text-slate-500 hover:text-rose-500 hover:bg-rose-50 rounded-lg transition-colors"
            title="Quản lý câu hỏi"
          >
            <Settings size={18} />
            <span className="hidden sm:inline">Câu hỏi</span>
          </Link>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 relative flex flex-col overflow-hidden">
        <CardGame />
      </main>
    </div>
  );
}
