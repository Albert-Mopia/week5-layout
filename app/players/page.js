"use client";

import { useState } from "react";
import Image from "next/image";
import { members } from "@/data/members"; // Adjust path if your members.js is in /lib or /app

export default function PlayersPage() {
  const [statusFilter, setStatusFilter] = useState("Active"); // 'Active', 'Non-Active', or 'All'
  const [searchQuery, setSearchQuery] = useState("");
  const [flightFilter, setFlightFilter] = useState("All");

  // Filter members by Status, Flight, and Search
  const filteredMembers = members.filter((member) => {
    const matchesStatus =
      statusFilter === "All" ? true : member.status === statusFilter;

    const matchesFlight =
      flightFilter === "All" ? true : member.flight === flightFilter;

    const query = searchQuery.toLowerCase();
    const matchesSearch =
      member.name.toLowerCase().includes(query) ||
      (member.nickname && member.nickname.toLowerCase().includes(query)) ||
      (member.email && member.email.toLowerCase().includes(query));

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

          {/* Quick Stats Pill */}
          <div className="inline-flex items-center gap-3 bg-white px-4 py-2 rounded-2xl border border-gray-200 shadow-sm text-xs font-bold text-gray-700">
            <span>Total: <strong className="text-gray-900">{members.length}</strong></span>
            <span className="text-gray-300">|</span>
            <span className="text-emerald-700">Active: <strong>{members.filter((m) => m.status === "Active").length}</strong></span>
            <span className="text-gray-300">|</span>
            <span className="text-gray-500">Non-Active: <strong>{members.filter((m) => m.status === "Non-Active").length}</strong></span>
          </div>
        </div>

        {/* Filter Controls Bar */}
        <div className="bg-white p-4 rounded-2xl border border-gray-200 shadow-sm flex flex-col lg:flex-row gap-4 lg:items-center lg:justify-between">
          
          {/* Status Tabs */}
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold uppercase text-gray-400 mr-1">Status:</span>
            {["Active", "Non-Active", "All"].map((tab) => {
              const count =
                tab === "All"
                  ? members.length
                  : members.filter((m) => m.status === tab).length;

              return (
                <button
                  key={tab}
                  type="button"
                  onClick={() => setStatusFilter(tab)}
                  className={`px-3 py-1.5 text-xs font-bold rounded-xl border transition-all ${
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

          {/* Flight Tabs + Search Bar */}
          <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center">
            {/* Flight Dropdown */}
            <select
              value={flightFilter}
              onChange={(e) => setFlightFilter(e.target.value)}
              className="text-xs font-bold bg-gray-50 border border-gray-200 text-gray-700 rounded-xl px-3 py-2 outline-none focus:ring-2 focus:ring-[#0f4d3a]"
            >
              <option value="All">All Flights</option>
              <option value="A Flight">A Flight</option>
              <option value="B Flight">B Flight</option>
              <option value="C Flight">C Flight</option>
            </select>

            {/* Search Input */}
            <input
              type="text"
              placeholder="Search by name, nickname, or email..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="text-xs bg-gray-50 border border-gray-200 rounded-xl px-3.5 py-2 w-full sm:w-64 outline-none focus:ring-2 focus:ring-[#0f4d3a] placeholder:text-gray-400"
            />
          </div>
        </div>

        {/* Member Grid */}
        {filteredMembers.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-3xl border border-dashed border-gray-300">
            <p className="text-gray-500 font-bold text-sm">No members found matching your filters.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {filteredMembers.map((member) => (
              <div
                key={member.id}
                className="bg-white rounded-2xl p-5 border border-gray-200 shadow-sm hover:shadow-md transition space-y-4 flex flex-col justify-between"
              >
                {/* Top Row: Flight Badge & Status Badge */}
                <div className="flex items-center justify-between">
                  <span
                    className={`text-[11px] font-extrabold uppercase px-2.5 py-1 rounded-md tracking-wider ${
                      member.flight === "A Flight"
                        ? "bg-amber-50 text-amber-800 border border-amber-200"
                        : member.flight === "B Flight"
                        ? "bg-blue-50 text-blue-800 border border-blue-200"
                        : "bg-purple-50 text-purple-800 border border-purple-200"
                    }`}
                  >
                    {member.flight}
                  </span>

                  {/* Colored Status Badge */}
                  <span
                    className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-bold ${
                      member.status === "Active"
                        ? "bg-emerald-100 text-emerald-800 border border-emerald-300"
                        : "bg-gray-100 text-gray-600 border border-gray-300"
                    }`}
                  >
                    <span
                      className={`w-1.5 h-1.5 rounded-full mr-1.5 ${
                        member.status === "Active" ? "bg-emerald-600" : "bg-gray-400"
                      }`}
                    ></span>
                    {member.status}
                  </span>
                </div>

                {/* Profile Header: Avatar + Names */}
                <div className="flex items-center gap-3.5">
                  <div className="relative w-12 h-12 rounded-full overflow-hidden bg-gray-100 border border-gray-200 shrink-0 flex items-center justify-center font-black text-gray-500 text-sm">
                    {member.image ? (
                      <Image
                        src={member.image}
                        alt={member.name}
                        fill
                        className="object-cover"
                        sizes="48px"
                      />
                    ) : (
                      <span>{member.name.charAt(0)}</span>
                    )}
                  </div>

                  <div className="min-w-0 flex-1">
                    <h3 className="text-base font-black text-gray-900 truncate">
                      {member.name}
                      {member.nickname && (
                        <span className="text-xs text-emerald-700 italic ml-1.5 font-bold">
                          &ldquo;{member.nickname}&rdquo;
                        </span>
                      )}
                    </h3>
                    <p className="text-xs text-gray-500 font-medium truncate mt-0.5">
                      {member.email || "No email on file"}
                    </p>
                  </div>
                </div>

                {/* Bottom Row: Handicap & Tee Box */}
                <div className="pt-3 border-t border-gray-100 flex justify-between items-center text-xs">
                  <div>
                    <span className="text-gray-400 block text-[10px] uppercase font-bold tracking-wider">
                      Agave HCP
                    </span>
                    <span className="text-lg font-black text-[#0f4d3a]">
                      {member.handicap.toFixed(2)}
                    </span>
                  </div>

                  <div className="text-right">
                    <span className="text-gray-400 block text-[10px] uppercase font-bold tracking-wider">
                      Tee Box
                    </span>
                    <span className="font-bold text-gray-800">
                      ⛳ {member.tee}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

      </div>
    </div>
  );
}
