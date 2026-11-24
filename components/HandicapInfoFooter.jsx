"use client";
import { useState } from "react";

export default function HandicapInfoFooter() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Clickable button placed inside the footer */}
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        className="hover:text-emerald-300 text-emerald-100 flex items-center gap-1.5 transition-colors cursor-pointer text-left"
      >
        <span>ℹ️</span> How Our Handicap System Works ↗
      </button>

      {/* Popup Modal */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-xs">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl relative text-left text-gray-900">
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-700 font-bold text-lg cursor-pointer"
            >
              ✕
            </button>

            <h3 className="text-lg font-black text-gray-900 mb-3 flex items-center gap-2">
              ⛳ How Our Handicap System Works
            </h3>

            <div className="text-xs text-gray-600 space-y-3 leading-relaxed max-h-[70vh] overflow-y-auto pr-1">
              <p>
                Our club follows the official World Handicap System (WHS) standard to keep competition fun and fair across all flights. Your Handicap Index is calculated dynamically from your <strong>last 20 tournament scores</strong>.
              </p>

              <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-3 text-emerald-900">
                <p className="font-bold mb-1">The "Best 8 of 20" Rule:</p>
                For every tournament, your gross score is converted into a <strong>Score Differential</strong> based on the course rating and slope of the tees played. The system takes your <strong>best 8 differentials</strong> (highlighted with <span className="font-bold text-emerald-700">★ Used</span>) and averages them to establish your live Handicap Index.
              </div>

              <p>
                <strong>Rolling 20-Round Updates:</strong> When new scores are posted, your newest round is added to the top and your 21st oldest round automatically drops off. Your index recalculates instantly.
              </p>

              <p>
                <strong>Missed Tournaments:</strong> If you miss an event, your record simply stays frozen on your previous rounds until your next tournament.
              </p>

              <p>
                <strong>Newer Members:</strong> For players with fewer than 20 rounds recorded, the USGA sliding scale automatically uses your top 2 to 6 rounds until a full 20-round history is established.
              </p>
            </div>

            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="mt-5 w-full bg-[#0f4d3a] text-white py-2.5 rounded-xl text-xs font-bold hover:bg-[#0c3c2d] transition-colors cursor-pointer"
            >
              Got it, close
            </button>
          </div>
        </div>
      )}
    </>
  );
}
