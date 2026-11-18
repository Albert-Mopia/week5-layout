"use client";

import { useState } from "react";

export default function MemberCard({ name, flight, handicap, phone, email, image }) {
  const [isOpen, setIsOpen] = useState(false);

  // Initials fallback if player doesn't have an uploaded picture yet
  const initials = name
    ? name
        .split(" ")
        .map((n) => n[0])
        .join("")
    : "AS";

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

        {/* View Detail Button */}
        <div className="pt-5">
          <button
            type="button"
            onClick={() => setIsOpen(true)}
            className="px-4 py-2 bg-[#0f4d3a] hover:bg-[#0c3d2e] text-white text-xs font-semibold rounded-lg transition-colors cursor-pointer shadow-sm"
          >
            View Detail
          </button>
        </div>
      </div>

      {/* 2. Modal Pop-up (Shows when View Detail is clicked) */}
      {isOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4"
          onClick={() => setIsOpen(false)}
        >
          <div
            className="bg-white w-full max-w-md rounded-2xl shadow-2xl border border-gray-100 overflow-hidden relative"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="absolute top-4 right-4 z-10 w-8 h-8 rounded-full bg-white/80 hover:bg-white text-gray-700 flex items-center justify-center font-bold text-base transition shadow-sm cursor-pointer"
            >
              ×
            </button>

            {/* Banner Header */}
            <div className="bg-[#0f4d3a] h-24 w-full relative"></div>

            {/* Profile Content */}
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
                      ? "bg-blue-100 text-blue-800"
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

              {/* Stats Box */}
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

              {/* Contact Information */}
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

              {/* Close Button */}
              <div className="mt-6">
                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  className="w-full py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-800 text-xs font-bold rounded-xl transition-colors cursor-pointer"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
