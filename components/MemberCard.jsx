"use client";

import { useState, useMemo } from "react";

export default function MemberCard({
  id,
  name,
  flight,
  handicap,
  phone,
  email,
  image,
  rounds: customRounds,
}) {
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const [isHandicapOpen, setIsHandicapOpen] = useState(false);

  // Initials fallback
  const initials = name
    ? name
        .split(" ")
        .map((n) => n[0])
        .join("")
    : "AS";

  // Build or use 20 rounds of scoring history
  const recentRounds = useMemo(() => {
    if (customRounds && customRounds.length >= 20) {
      return customRounds.slice(-20);
    }

    // Realistic golf courses in the rotation
    const courses = [
      { name: "Coronado Golf Course", rating: 71.5, slope: 121 },
      { name: "Balboa Park Golf Course", rating: 71.1, slope: 125 },
      { name: "Torrey Pines (North)", rating: 72.1, slope: 128 },
      { name: "Steele Canyon", rating: 71.8, slope: 126 },
      { name: "Admiral Baker (South)", rating: 70.4, slope: 119 },
    ];

    // Variance pattern around player's handicap to simulate 20 rounds
    const offsets = [
      -2, 3, 0, 5, -1, 2, 4, -3, 1, 6, -1, 0, 2, -2, 4, 1, 7, -1, 3, 0,
    ];

    return offsets.map((offset, idx) => {
      const course = courses[idx % courses.length];
      const targetDiff = Math.max(0, parseFloat((handicap + offset).toFixed(1)));
      const gross = Math.round(targetDiff * (course.slope / 113) + course.rating);
      const diff = parseFloat(((113 / course.slope) * (gross - course.rating)).toFixed(1));

      return {
        id: idx + 1,
        date: `2026-0${Math.floor(idx / 4) + 5}-${10 + (idx % 18)}`,
        course: course.name,
        grossScore: gross,
        differential: diff,
      };
    });
  }, [handicap, customRounds]);

  // Find the lowest 8 differentials (WHS official counted rounds)
  const lowest8Indices = useMemo(() => {
    const sorted = recentRounds
      .map((r, i) => ({ diff: r.differential, index: i }))
      .sort((a, b) => a.diff - b.diff)
      .slice(0, 8);
    return new Set(sorted.map((item) => item.index));
  }, [recentRounds]);

  // Calculate stats
  const averageGross = useMemo(() => {
    const total = recentRounds.reduce((acc, r) => acc + r.grossScore, 0);
    return (total / recentRounds.length).toFixed(1);
  }, [recentRounds]);

  const best8AverageDiff = useMemo(() => {
    const best8 = recentRounds.filter((_, idx) => lowest8Indices.has(idx));
    const total = best8.reduce((acc, r) => acc + r.differential, 0);
    return (total / best8.length).toFixed(1);
  }, [recentRounds, lowest8Indices]);

  return (
    <>
      {/* 1. Main Card Surface */}
      <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow">
        <div>
          {/* Flight Badge */}
          <span
            className={`inline-block text-xs font-bold px-3 py-1 rounded-full mb-3 ${
              flight === "A Flight"
                ? "bg-emerald-100 text-emerald-800"
                : flight === "B Flight"
                ? "bg-blue-100 text-blue-800"
                : "bg-amber-100 text-amber-800"
            }`}
          >
            {flight}
          </span>

          <h3 className="text-xl font-extrabold text-gray-950">{name}</h3>
          <p className="text-sm text-gray-600 mt-1">
            Handicap: <span className="font-bold text-gray-900">{handicap}</span>
          </p>
        </div>

        {/* Action Buttons: View Detail & Last 20 Rounds */}
        <div className="pt-5 grid grid-cols-2 gap-2">
          <button
            type="button"
            onClick={() => setIsDetailOpen(true)}
            className="w-full py-2 bg-[#0f4d3a] hover:bg-[#0c3d2e] text-white text-xs font-semibold rounded-lg transition-colors cursor-pointer shadow-sm text-center"
          >
            View Detail
          </button>

          <button
            type="button"
            onClick={() => setIsHandicapOpen(true)}
            className="w-full py-2 bg-emerald-50 hover:bg-emerald-100 text-[#0f4d3a] border border-emerald-200 text-xs font-bold rounded-lg transition-colors cursor-pointer shadow-sm text-center"
          >
            Last 20
          </button>
        </div>
      </div>

      {/* 2. Modal: Member Detail Pop-up */}
      {isDetailOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4"
          onClick={() => setIsDetailOpen(false)}
        >
          <div
            className="bg-white w-full max-w-md rounded-2xl shadow-2xl border border-gray-100 overflow-hidden relative"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setIsDetailOpen(false)}
              className="absolute top-4 right-4 z-10 w-8 h-8 rounded-full bg-white/80 hover:bg-white text-gray-700 flex items-center justify-center font-bold text-base transition shadow-sm cursor-pointer"
            >
              ×
            </button>

            <div className="bg-[#0f4d3a] h-24 w-full relative"></div>

            <div className="px-6 pb-6 relative">
              <div className="-mt-12 mb-3 flex items-end justify-between">
                {image ? (
                  <img
                    src={image}
                    alt={name}
                    className="w-24 h-24 rounded-full border-4 border-white object-cover shadow-md bg-gray-100"
                  />
                ) : (
                  <div className="w-24 h-24 rounded-full border-4 border-white bg-[#0f4d3a] text-white flex items-center justify-center text-2xl font-bold shadow-md">
                    {initials}
                  </div>
                )}

                <span
                  className={`text-xs font-bold px-3 py-1 rounded-full ${
                    flight === "A Flight"
                      ? "bg-emerald-100 text-emerald-800"
                      : flight === "B Flight"
                      ? "bg-blue-100 text-blue-800"
                      : "bg-amber-100 text-amber-800"
                  }`}
                >
                  {flight}
                </span>
              </div>

              <h2 className="text-2xl font-black text-gray-900">{name}</h2>
              <p className="text-xs text-gray-500 font-medium mt-0.5">
                Agave Shooters Member • Active Status
              </p>

              <div className="grid grid-cols-2 gap-3 my-5 bg-gray-50 p-3 rounded-xl border border-gray-100 text-center">
                <div>
                  <span className="text-[10px] uppercase font-bold text-gray-400">
                    Handicap Index
                  </span>
                  <p className="text-xl font-black text-[#0f4d3a]">{handicap}</p>
                </div>
                <div>
                  <span className="text-[10px] uppercase font-bold text-gray-400">
                    Flight Bracket
                  </span>
                  <p className="text-base font-bold text-gray-800 mt-1">{flight}</p>
                </div>
              </div>

              <div className="space-y-3 border-t border-gray-100 pt-4 text-sm">
                <div className="flex items-center justify-between">
                  <span className="text-gray-500 text-xs font-medium">📞 Phone:</span>
                  <a
                    href={`tel:${phone || ""}`}
                    className="font-semibold text-[#0f4d3a] hover:underline text-xs"
                  >
                    {phone || "Not on file"}
                  </a>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-gray-500 text-xs font-medium">✉️ Email:</span>
                  <a
                    href={`mailto:${email || ""}`}
                    className="font-semibold text-[#0f4d3a] hover:underline text-xs truncate max-w-[200px]"
                  >
                    {email || "Not on file"}
                  </a>
                </div>
              </div>

              <div className="mt-6 flex gap-2">
                <button
                  type="button"
                  onClick={() => {
                    setIsDetailOpen(false);
                    setIsHandicapOpen(true);
                  }}
                  className="w-1/2 py-2.5 bg-emerald-50 hover:bg-emerald-100 text-[#0f4d3a] font-bold text-xs rounded-xl transition cursor-pointer"
                >
                  View Last 20
                </button>
                <button
                  type="button"
                  onClick={() => setIsDetailOpen(false)}
                  className="w-1/2 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-800 text-xs font-bold rounded-xl transition cursor-pointer"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 3. Modal: Last 20 Rounds & Handicap Calculation */}
      {isHandicapOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4"
          onClick={() => setIsHandicapOpen(false)}
        >
          <div
            className="bg-white w-full max-w-lg rounded-2xl shadow-2xl border border-gray-100 overflow-hidden relative flex flex-col max-h-[90vh]"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="bg-[#0f4d3a] p-5 text-white flex items-center justify-between">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-200">
                  USGA Scoring Record
                </span>
                <h3 className="text-xl font-black">{name}</h3>
                <p className="text-xs text-emerald-100">
                  Last 20 Rounds • {flight}
                </p>
              </div>
              <button
                type="button"
                onClick={() => setIsHandicapOpen(false)}
                className="w-8 h-8 rounded-full bg-white/20 hover:bg-white/30 text-white flex items-center justify-center font-bold text-base cursor-pointer"
              >
                ×
              </button>
            </div>

            {/* Quick Metrics (Last 20 Avg vs Best 8 Avg Index) */}
            <div className="grid grid-cols-3 gap-2 p-4 bg-gray-50 border-b border-gray-100 text-center">
              <div className="bg-white p-2.5 rounded-xl border border-gray-200">
                <span className="text-[9px] uppercase font-bold text-gray-400 block">
                  Last 20 Avg Score
                </span>
                <p className="text-base font-black text-gray-900 mt-0.5">
                  {averageGross}
                </p>
              </div>
              <div className="bg-white p-2.5 rounded-xl border border-gray-200">
                <span className="text-[9px] uppercase font-bold text-gray-400 block">
                  Best 8 Diff Avg
                </span>
                <p className="text-base font-black text-[#0f4d3a] mt-0.5">
                  {best8AverageDiff}
                </p>
              </div>
              <div className="bg-white p-2.5 rounded-xl border border-emerald-300">
                <span className="text-[9px] uppercase font-bold text-emerald-700 block">
                  Current Index
                </span>
                <p className="text-base font-black text-[#0f4d3a] mt-0.5">
                  {handicap}
                </p>
              </div>
            </div>

            {/* Scrollable Rounds Table */}
            <div className="p-4 overflow-y-auto flex-1 space-y-2">
              <div className="flex items-center justify-between text-[11px] font-bold text-gray-500 uppercase px-2 pb-1 border-b">
                <span>Date & Course</span>
                <div className="space-x-6">
                  <span>Gross</span>
                  <span>Differential</span>
                </div>
              </div>

              {recentRounds.map((round, idx) => {
                const isCounted = lowest8Indices.has(idx);

                return (
                  <div
                    key={round.id || idx}
                    className={`flex items-center justify-between p-2.5 rounded-lg text-xs transition border ${
                      isCounted
                        ? "bg-emerald-50/70 border-emerald-200 font-medium"
                        : "bg-white border-gray-100 text-gray-600"
                    }`}
                  >
                    <div>
                      <div className="flex items-center gap-1.5">
                        <span className="font-bold text-gray-900">{round.course}</span>
                        {isCounted && (
                          <span className="text-[9px] font-extrabold bg-[#0f4d3a] text-white px-1.5 py-0.2 rounded-full">
                            ★ Used
                          </span>
                        )}
                      </div>
                      <span className="text-[10px] text-gray-400">{round.date}</span>
                    </div>

                    <div className="flex items-center space-x-8 text-right">
                      <span className="font-bold text-gray-900">{round.grossScore}</span>
                      <span
                        className={`font-black w-10 ${
                          isCounted ? "text-[#0f4d3a]" : "text-gray-500"
                        }`}
                      >
                        {round.differential}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Footer */}
            <div className="p-3 bg-gray-50 border-t border-gray-100 flex items-center justify-between">
              <p className="text-[10px] text-gray-500">
                ★ = Lowest 8 differentials used for WHS index
              </p>
              <button
                type="button"
                onClick={() => setIsHandicapOpen(false)}
                className="px-4 py-1.5 bg-[#0f4d3a] hover:bg-[#0c3d2e] text-white text-xs font-bold rounded-lg cursor-pointer"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
