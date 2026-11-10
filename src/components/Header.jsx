import React from "react";
import { Sparkles } from "lucide-react";

export default function Header() {
  return (
    <header className="shrink-0 bg-gradient-to-r from-blue-700 via-blue-600 to-blue-700 text-white shadow-xs border-b border-blue-800/40 z-20">
      <div className="w-full px-4 sm:px-6 py-2 sm:py-2.5 flex items-center justify-between gap-2">
        <div className="flex items-center space-x-2.5">
          <div className="p-1.5 bg-white/10 rounded-lg backdrop-blur-xs">
            <Sparkles className="w-4 h-4 text-blue-200" />
          </div>
          <div>
            <h1 className="text-sm sm:text-base md:text-lg font-extrabold tracking-tight text-white drop-shadow-xs leading-tight">
              Chào mừng anh chị đến với Trung Tâm SSC - 87333
            </h1>
          </div>
        </div>

        <div className="flex items-center space-x-2 text-[11px] font-semibold bg-white/15 px-3 py-1 rounded-full border border-white/20">
          <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
          <span>Trực tuyến</span>
        </div>
      </div>
    </header>
  );
}
