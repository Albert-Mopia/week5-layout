"use client";

import { useState } from "react";
import { members } from "@/data/members";

export default function HandicapCalculatorPage() {
  const [selectedMemberId, setSelectedMemberId] = useState("");
  const [scoreInput, setScoreInput] = useState("");
  
  // Store all member scores in state
  const [memberScores, setMemberScores] = useState({
    // Example: [memberId]: [score1, score2, ...]
    32: [87, 87, 92, 82, 87, 82, 80, 81], // Mopia, A
  });

  const selectedMember = members.find((m) => m.id === Number(selectedMemberId));
  const currentRounds = selectedMember ? (memberScores[selectedMember.id] || []) : [];

  // Agave Handicap formula: lowest 8 of last 20 - Par 72
  const calculateHcp = (rounds) => {
    if (!rounds || rounds.length === 0) return 0;
    const last20 = rounds.slice(0, 20);
    const sorted = [...last20].sort((a, b) => a - b);
    const best8 = sorted.slice(0, Math.min(8, sorted.length));
    const avg = best8.reduce((a, b) => a + b, 0) / best8.length;
    return Math.max(0, avg - 72).toFixed(2);
  };

  // Handle posting a new score
  const handlePostScore = (e) => {
    e.preventDefault();
    const score = parseInt(scoreInput, 10);
    if (!score || score < 50 || score > 150) {
      alert("Please enter a valid score");
      return;
    }

    setMemberScores((prev) => ({
      ...prev,
      [selectedMember.id]: [score, ...(prev[selectedMember.id] || [])],
    }));

    setScoreInput("");
    alert(`Added score ${score} for ${selectedMember.name}!`);
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      {/* 1. Golfer Dropdown */}
      <div className="mb-6 bg-white p-4 rounded-xl border border-gray-200">
        <label className="block text-sm font-bold text-gray-700 mb-2">Select Golfer:</label>
        <select
          value={selectedMemberId}
          onChange={(e) => setSelectedMemberId(e.target.value)}
          className="w-full p-2 border rounded-lg"
        >
          <option value="">-- Choose a Golfer --</option>
          {members.map((m) => (
            <option key={m.id} value={m.id}>
              {m.name} {!m.isMember ? "(Guest)" : ""}
            </option>
          ))}
        </select>
      </div>

      {/* 2. Show Post Form + Scores only if a member is selected */}
      {selectedMember ? (
        <div>
          {/* Post Score Form */}
          <form onSubmit={handlePostScore} className="flex gap-4 items-end mb-6 bg-white p-4 rounded-xl border">
            <div>
              <label className="block text-xs font-semibold mb-1">Gross Score</label>
              <input
                type="number"
                value={scoreInput}
                onChange={(e) => setScoreInput(e.target.value)}
                placeholder="e.g. 78"
                className="p-2 border rounded-lg w-32"
              />
            </div>
            <button type="submit" className="bg-emerald-800 text-white px-5 py-2 rounded-lg font-bold">
              Post Score
            </button>
            <div className="ml-auto text-right">
              <span className="text-xs text-gray-500 block">Current HCP</span>
              <span className="text-2xl font-black text-emerald-800">{calculateHcp(currentRounds)}</span>
            </div>
          </form>

          {/* Score History */}
          <div className="bg-white p-6 rounded-xl border">
            <h3 className="font-bold text-lg mb-4">{selectedMember.name}'s Recent Rounds</h3>
            <div className="grid grid-cols-4 sm:grid-cols-8 gap-2">
              {currentRounds.map((round, idx) => (
                <div key={idx} className="p-2 border rounded text-center">
                  <div className="text-xs text-gray-400">R{idx + 1}</div>
                  <div className="text-lg font-bold">{round}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : (
        <div className="bg-white p-12 rounded-2xl border border-gray-200 text-center text-gray-400">
          Select a golfer from the dropdown to see their scorecard and post a new score.
        </div>
      )}
    </div>
  );
}
