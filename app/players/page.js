"use client";

import { useState } from "react";
import { members } from "@/data/members";

export default function PlayersPage() {
  const [selectedFlight, setSelectedFlight] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  // Filter members based on both flight tab and search query
  const filteredMembers = members.filter((member) => {
    const matchesFlight =
      selectedFlight === "All" || member.flight === selectedFlight;
    const matchesSearch = member.name
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    return matchesFlight && matchesSearch;
  });

  return (
    <div className="space-y-8">
      {/* Top Banner */}
      <div className="bg-white p-6 sm:p-8 rounded-2xl border border-gray-200 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-emerald-800 bg-emerald-100 px-2.5 py-1 rounded-full">
            Official Roster
          </span>
          <h1 className="text-3xl font-extrabold text-gray-950 mt-2">
            Member Directory
          </h1>
          <p className="text-sm text-gray-600 mt-1">
            Search active golfers, flight brackets, and official handicap indexes.
          </p>
        </div>
        <div className="text-right sm:text-left">
          <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
            Showing {filteredMembers.length} of {members.length} Golfers
          </span>
        </div>
      </div>

      {/* Search & Flight Filter Controls */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-white p-4 rounded-xl border border-gray-200 shadow-sm">
        {/* Flight Tabs */}
        <div className="flex items-center gap-2 w-full sm:w-auto overflow-x-auto pb-1 sm:pb-0">
          {["All", "A Flight", "B Flight", "C Flight"].map((flight) => (
            <button
              key={flight}
              onClick={() => setSelectedFlight(flight)}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-colors whitespace-nowrap ${
                selectedFlight === flight
                  ? "bg-[#0f4d3a] text-white shadow-sm"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
            >
              {flight}
            </button>
          ))}
        </div>

        {/* Search Input */}
        <div className="w-full sm:w-64">
          <input
            type="text"
            placeholder="Search golfer name..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full px-3 py-1.5 border border-gray-300 rounded-lg text-xs focus:outline-none focus:border-[#0f4d3a]"
          />
        </div>
      </div>

      {/* Profile Cards Grid */}
      {filteredMembers.length === 0 ? (
        <div className="bg-white p-12 rounded-xl border border-gray-200 text-center">
          <p className="text-gray-500 text-sm">No golfers found matching your search.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredMembers.map((member) => (
            <div
              key={member.id}
              className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow"
            >
              <div>
                {/* Header: Initials Avatar + Flight Tag */}
                <div className="flex items-start justify-between gap-4 mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-full bg-[#0f4d3a] text-white flex items-center justify-center font-bold text-base shadow-inner">
                      {member.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </div>
                    <div>
                      <h2 className="text-lg font-bold text-gray-900 leading-snug">
                        {member.name}
                      </h2>
                      <p className="text-xs text-gray-500 font-medium">
                        Member #{1000 + member.id} • Active
                      </p>
                    </div>
                  </div>

                  <span
                    className={`text-xs font-bold px-3 py-1 rounded-full ${
                      member.flight === "A Flight"
                        ? "bg-emerald-100 text-emerald-800"
                        : member.flight === "B Flight"
                        ? "bg-blue-100 text-blue-800"
                        : "bg-amber-100 text-amber-800"
                    }`}
                  >
                    {member.flight}
                  </span>
                </div>

                {/* Stats Breakdown */}
                <div className="grid grid-cols-3 gap-2 bg-[#f8faf8] border border-gray-100 rounded-lg p-3 text-center my-4">
                  <div>
                    <p className="text-[10px] uppercase font-semibold text-gray-500">Handicap</p>
                    <p className="text-base font-extrabold text-[#0f4d3a]">{member.handicap}</p>
                  </div>
                  <div>
                    <p className="text-[10px] uppercase font-semibold text-gray-500">Bracket</p>
                    <p className="text-base font-bold text-gray-800">
                      {member.handicap <= 10 ? "Scratch" : member.handicap <= 18 ? "Mid-Cap" : "High-Cap"}
                    </p>
                  </div>
                  <div>
                    <p className="text-[10px] uppercase font-semibold text-gray-500">Status</p>
                    <p className="text-base font-bold text-emerald-700">Verified</p>
                  </div>
                </div>
              </div>

              {/* Card Footer */}
              <div className="pt-3 border-t border-gray-100 flex items-center justify-between text-xs text-gray-500">
                <span>Agave Shooters VGA</span>
                <span className="font-semibold text-[#0f4d3a]">Tournament Ready</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
