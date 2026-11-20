"use client";

import { useState, useEffect } from "react";
import { members as defaultMembers } from "@/data/members";
import { calculateDifferential, calculateHandicapIndex } from "@/lib/handicap";

export default function HandicapCalculatorPage() {
  const [membersList, setMembersList] = useState([]);
  const [selectedMemberId, setSelectedMemberId] = useState("");
  
  // Score form state
  const [grossScore, setGrossScore] = useState("");
  const [courseName, setCourseName] = useState("Coronado Golf Course");
  const [courseRating, setCourseRating] = useState("71.5");
  const [slopeRating, setSlopeRating] = useState("121");
  const [roundDate, setRoundDate] = useState(new Date().toISOString().split("T")[0]);

  // Load members and saved score histories from localStorage
  useEffect(() => {
    const saved = localStorage.getItem("agave_roster_data");
    if (saved) {
      setMembersList(JSON.parse(saved));
    } else {
      // Seed initial history with a dummy differential matching their starting handicap
      const initialized = defaultMembers.map((m) => ({
        ...m,
        rounds: [
          {
            date: "Initial Baseline",
            course: "Club Placement",
            grossScore: Math.round(72 + m.handicap),
            courseRating: 72.0,
            slopeRating: 113,
            differential: m.handicap,
          },
        ],
      }));
      setMembersList(initialized);
      localStorage.setItem("agave_roster_data", JSON.stringify(initialized));
    }
  }, []);

  const selectedMember = membersList.find(
    (m) => m.id === Number(selectedMemberId)
  );

  // Recalculate 1/3 equal flight brackets dynamically
  const rebalanceFlights = (roster) => {
    const sorted = [...roster].sort((a, b) => a.handicap - b.handicap);
    const tierSize = Math.ceil(sorted.length / 3);

    return sorted.map((player, index) => {
      let flight = "C Flight";
      if (index < tierSize) flight = "A Flight";
      else if (index < tierSize * 2) flight = "B Flight";

      return { ...player, flight };
    });
  };

  // Submit and update score handler
  const handleAddRound = (e) => {
    e.preventDefault();
    if (!selectedMember || !grossScore) return;

    const score = parseFloat(grossScore);
    const rating = parseFloat(courseRating) || 72.0;
    const slope = parseFloat(slopeRating) || 113;

    // 1. Calculate the Differential for this round
    const newDiff = calculateDifferential(score, rating, slope);

    // 2. Create the round record
    const newRound = {
      date: roundDate,
      course: courseName,
      grossScore: score,
      courseRating: rating,
      slopeRating: slope,
      differential: newDiff,
    };

    // 3. Append round and calculate new handicap
    const updatedRounds = [...(selectedMember.rounds || []), newRound];
    const differentials = updatedRounds.map((r) => r.differential);
    const newHandicap = calculateHandicapIndex(differentials);

    // 4. Update the member in the list
    const updatedList = membersList.map((m) => {
      if (m.id === selectedMember.id) {
        return {
          ...m,
          handicap: newHandicap,
          rounds: updatedRounds,
        };
      }
      return m;
    });

    // 5. Rebalance flights across the entire club
    const finalized = rebalanceFlights(updatedList);

    setMembersList(finalized);
    localStorage.setItem("agave_roster_data", JSON.stringify(finalized));

    // Reset input
    setGrossScore("");
    alert(`Score posted for ${selectedMember.name}! New Handicap: ${newHandicap}`);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 pb-12">
      {/* Page Header */}
      <div className="bg-white p-6 sm:p-8 rounded-2xl border border-gray-200 shadow-sm">
        <span className="text-xs font-bold uppercase tracking-wider text-emerald-800 bg-emerald-100 px-2.5 py-1 rounded-full">
          Official WHS Engine
        </span>
        <h1 className="text-3xl font-extrabold text-gray-950 mt-2">
          In-House Handicap Calculator
        </h1>
        <p className="text-sm text-gray-600 mt-1">
          Post round scores. The system will automatically compute differentials, recalculate handicaps, and reassign flight tiers.
        </p>
      </div>

      {/* Main Grid: Form on Left, Player History on Right */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Post Score Form */}
        <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm space-y-5">
          <h2 className="text-lg font-bold text-gray-900 border-b pb-3">Post a Round</h2>

          <form onSubmit={handleAddRound} className="space-y-4">
            {/* Select Golfer */}
            <div>
              <label className="block text-xs font-bold text-gray-700 uppercase mb-1">
                Select Golfer
              </label>
              <select
                value={selectedMemberId}
                onChange={(e) => setSelectedMemberId(e.target.value)}
                required
                className="w-full border border-gray-300 rounded-lg p-2.5 text-sm focus:border-[#0f4d3a] outline-none"
              >
                <option value="">-- Choose Golfer --</option>
                {membersList.map((m) => (
                  <option key={m.id} value={m.id}>
                    {m.name} ({m.flight} • HCP {m.handicap})
                  </option>
                ))}
              </select>
            </div>

            {/* Course Name */}
            <div>
              <label className="block text-xs font-bold text-gray-700 uppercase mb-1">
                Course Name
              </label>
              <input
                type="text"
                value={courseName}
                onChange={(e) => setCourseName(e.target.value)}
                className="w-full border border-gray-300 rounded-lg p-2 text-sm"
                required
              />
            </div>

            {/* Date */}
            <div>
              <label className="block text-xs font-bold text-gray-700 uppercase mb-1">
                Date Played
              </label>
              <input
                type="date"
                value={roundDate}
                onChange={(e) => setRoundDate(e.target.value)}
                className="w-full border border-gray-300 rounded-lg p-2 text-sm"
                required
              />
            </div>

            {/* Gross Score */}
            <div>
              <label className="block text-xs font-bold text-gray-700 uppercase mb-1">
                Gross 18-Hole Score
              </label>
              <input
                type="number"
                placeholder="e.g. 82"
                value={grossScore}
                onChange={(e) => setGrossScore(e.target.value)}
                className="w-full border border-gray-300 rounded-lg p-2 text-sm font-bold text-emerald-800"
                min="50"
                max="150"
                required
              />
            </div>

            {/* Course Rating & Slope Rating */}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-[11px] font-bold text-gray-600 uppercase mb-1">
                  Course Rating
                </label>
                <input
                  type="number"
                  step="0.1"
                  value={courseRating}
                  onChange={(e) => setCourseRating(e.target.value)}
                  className="w-full border border-gray-300 rounded-lg p-2 text-sm"
                  required
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold text-gray-600 uppercase mb-1">
                  Slope Rating
                </label>
                <input
                  type="number"
                  value={slopeRating}
                  onChange={(e) => setSlopeRating(e.target.value)}
                  className="w-full border border-gray-300 rounded-lg p-2 text-sm"
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={!selectedMember}
              className="w-full mt-4 bg-[#0f4d3a] hover:bg-[#0c3d2e] disabled:opacity-50 text-white font-bold py-2.5 rounded-xl text-sm transition shadow-sm cursor-pointer"
            >
              Post Score & Recalculate
            </button>
          </form>
        </div>

        {/* Selected Golfer Status Card & Log */}
        <div className="space-y-6">
          {selectedMember ? (
            <>
              {/* Member Summary Box */}
              <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-xl font-black text-gray-950">{selectedMember.name}</h3>
                    <p className="text-xs text-gray-500">Agave Shooters Member #{1000 + selectedMember.id}</p>
                  </div>
                  <span
                    className={`text-xs font-bold px-3 py-1 rounded-full ${
                      selectedMember.flight === "A Flight"
                        ? "bg-emerald-100 text-emerald-800"
                        : selectedMember.flight === "B Flight"
                        ? "bg-blue-100 text-blue-800"
                        : "bg-amber-100 text-amber-800"
                    }`}
                  >
                    {selectedMember.flight}
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-4 mt-4 bg-gray-50 p-4 rounded-xl text-center">
                  <div>
                    <span className="text-[10px] font-bold uppercase text-gray-400">Current Index</span>
                    <p className="text-2xl font-black text-[#0f4d3a]">{selectedMember.handicap}</p>
                  </div>
                  <div>
                    <span className="text-[10px] font-bold uppercase text-gray-400">Rounds Logged</span>
                    <p className="text-2xl font-black text-gray-800">{selectedMember.rounds?.length || 0}</p>
                  </div>
                </div>
              </div>

              {/* Rounds History */}
              <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm space-y-3">
                <h4 className="text-sm font-bold text-gray-800">Recent Round Differentials</h4>
                <div className="max-h-60 overflow-y-auto space-y-2 pr-1 text-xs">
                  {selectedMember.rounds?.slice().reverse().map((round, idx) => (
                    <div key={idx} className="flex items-center justify-between p-2.5 bg-gray-50 rounded-lg border border-gray-100">
                      <div>
                        <p className="font-bold text-gray-800">{round.course}</p>
                        <p className="text-[10px] text-gray-500">{round.date} • Gross: {round.grossScore}</p>
                      </div>
                      <div className="text-right">
                        <span className="text-[10px] uppercase font-semibold text-gray-400 block">Diff</span>
                        <span className="font-extrabold text-[#0f4d3a]">{round.differential}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </>
          ) : (
            <div className="bg-white p-12 rounded-2xl border border-gray-200 shadow-sm text-center text-gray-400 text-sm">
              👈 Select a golfer from the dropdown to see their scorecard and post a new score.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
