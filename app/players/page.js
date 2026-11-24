"use client";
import { useState } from "react";
import MemberCard from "@/components/MemberCard";
import { members } from "@/data/members"; // <--- 1. Imported your members.js
import {
  membersRounds,
  getPlayerRealRounds,
  calculateRollingHcp,
} from "@/data/roundsData";

export default function PlayersPage() {
  const [statusFilter, setStatusFilter] = useState("Active");
  const [searchQuery, setSearchQuery] = useState("");
  const [flightFilter, setFlightFilter] = useState("All");

  // Build the complete roster by merging member contact info with their rounds
  const roster = (members || []).map((m) => {
    // Find matching scoring data for this member
    const roundData =
      (membersRounds || []).find(
        (r) => r.id === m.id || r.name?.toLowerCase() === m.name?.toLowerCase()
      ) || {};

    // Convert "Abad, Rolando" -> "Rolando Abad"
    const parts = (m.name || "").split(",").map((s) => s.trim());
    const fullName = parts.length === 2 ? `${parts[1]} ${parts[0]}` : m.name;

    const scores = roundData.scores || m.scores || [];
    const tee = m.tee || roundData.tee;

    // Generate real round objects (with course names, dates, diffs, and ★ flags)
    const realRounds =
      typeof getPlayerRealRounds === "function"
        ? getPlayerRealRounds(scores, tee)
        : [];

    // Calculate rolling handicap index or fallback to member.handicap
    const computedHcp =
      m.handicap ??
      roundData.currentHcp ??
      (scores.length > 0 && typeof calculateRollingHcp === "function"
        ? calculateRollingHcp(scores)
        : 0);

    return {
      ...roundData,
      ...m, // Ensures email, phone, and image from members.js are included
      fullName,
      displayHcp: computedHcp,
      rounds: realRounds,
      totalRounds: scores.length || realRounds.length || 0,
    };
  });

  // Filter members by Status, Flight, and Search text
  const filteredMembers = roster.filter((member) => {
    if (!member) return false;

    const matchesStatus =
      statusFilter === "All" ? true : member.status === statusFilter;

    const matchesFlight =
      flightFilter === "All" ? true : member.flight === flightFilter;

    const query = searchQuery.toLowerCase().trim();
    const matchesSearch =
      !query ||
      (member.name && member.name.toLowerCase().includes(query)) ||
      (member.fullName && member.fullName.toLowerCase().includes(query)) ||
      (member.nickname && member.nickname.toLowerCase().includes(query));

    return matchesStatus && matchesFlight && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 border-b border-gray-200 pb-6">
          <div>
            <h1 className="text-3xl font-black text-gray-900 tracking-tight">
              Member Directory
            </h1>
            <p className="text-sm text-gray-500 mt-1">
              Official Agave Shooters roster, handicaps, and flight assignments.
            </p>
          </div>

          {/* Quick Stats */}
          <div className="inline-flex items-center gap-3 bg-white px-4 py-2 rounded-2xl border border-gray-200 shadow-sm text-xs font-bold text-gray-700">
            <span>
              Total: <strong className="text-gray-900">{roster.length}</strong>
            </span>
            <span className="text-gray-300">|</span>
            <span className="text-emerald-700">
              Active: <strong>{roster.filter((m) => m?.status === "Active").length}</strong>
            </span>
            <span className="text-gray-300">|</span>
            <span className="text-gray-500">
              Non-Active: <strong>{roster.filter((m) => m?.status === "Non-Active").length}</strong>
            </span>
          </div>
        </div>

        {/* Filter Controls Bar */}
        <div className="bg-white p-4 rounded-2xl border border-gray-200 shadow-sm flex flex-col lg:flex-row gap-4 lg:items-center lg:justify-between">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold uppercase text-gray-400 mr-1">Status:</span>
            {["Active", "Non-Active", "All"].map((tab) => {
              const count =
                tab === "All"
                  ? roster.length
                  : roster.filter((m) => m?.status === tab).length;

              return (
                <button
                  key={tab}
                  type="button"
                  onClick={() => setStatusFilter(tab)}
                  className={`px-3 py-1.5 text-xs font-bold rounded-xl border transition-all cursor-pointer ${
                    statusFilter === tab
                      ? "bg-[#0f4d3a] text-white border-[#0f4d3a] shadow-sm"
                      : "bg-white text-gray-600 border-gray-200 hover:bg-gray-50"
                  }`}
                >
                  {tab} <span className="opacity-75 font-normal">({count})</span>
                </button>
              );
            })}
          </div>

          <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center">
            <select
              value={flightFilter}
              onChange={(e) => setFlightFilter(e.target.value)}
              className="text-xs font-bold bg-gray-50 border border-gray-200 text-gray-700 rounded-xl px-3 py-2 outline-none focus:ring-2 focus:ring-[#0f4d3a] cursor-pointer"
            >
              <option value="All">All Flights</option>
              <option value="A Flight">A Flight</option>
              <option value="B Flight">B Flight</option>
              <option value="C Flight">C Flight</option>
            </select>

            <input
              type="text"
              placeholder="Search by name, nickname..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="text-xs bg-gray-50 border border-gray-200 rounded-xl px-3.5 py-2 w-full sm:w-64 outline-none focus:ring-2 focus:ring-[#0f4d3a] placeholder:text-gray-400"
            />
          </div>
        </div>

        {/* Member Grid Using MemberCard */}
        {filteredMembers.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-3xl border border-dashed border-gray-300">
            <p className="text-gray-500 font-bold text-sm">
              No members found matching your filters.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {filteredMembers.map((member) => (
              <MemberCard
                key={member.id}
                {...member}
                handicap={member.displayHcp}
                rounds={member.rounds}
              />
            ))}
          </div>
        )}

      </div>
    </div>
  );
}
