"use client";

import { useState } from "react";
import { courses } from "@/data/roundsData";

export default function CourseHandicapCalculator() {
  const [handicapIndex, setHandicapIndex] = useState("12.4");
  const [selectedCourseId, setSelectedCourseId] = useState(courses[0]?.id || "");
  const [selectedTee, setSelectedTee] = useState("Blue");

  // Find the selected course data
  const currentCourse = courses.find((c) => c.id === selectedCourseId) || courses[0];
  const availableTees = currentCourse ? Object.keys(currentCourse.tees) : [];
  const teeData = currentCourse?.tees[selectedTee] || currentCourse?.tees[availableTees[0]];

  // Official USGA / WHS Course Handicap Formula:
  // Course Handicap = Index × (Slope / 113) + (Course Rating - Par 72)
  const calculateCourseHandicap = () => {
    const index = parseFloat(handicapIndex);
    if (isNaN(index) || !teeData) return 0;

    const slope = teeData.slope || 113;
    const rating = teeData.rating || 72.0;
    const par = 72; // Standard regulation par

    const courseHcp = index * (slope / 113) + (rating - par);
    return Math.round(courseHcp);
  };

  const courseHcp = calculateCourseHandicap();

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      {/* Title Header */}
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-black text-[#0f4d3a] tracking-tight">
          Course Handicap Calculator
        </h1>
        <p className="text-xs text-gray-500">
          Official USGA / WHS playing handicap calculator for Agave Shooters tournament flights.
        </p>
      </div>

      <div className="bg-white p-6 sm:p-8 rounded-2xl shadow-sm border border-gray-200 space-y-6">
        {/* 1. Enter Handicap Index */}
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-2">
            1. Your Handicap Index
          </label>
          <input
            type="number"
            step="0.1"
            value={handicapIndex}
            onChange={(e) => setHandicapIndex(e.target.value)}
            placeholder="e.g. 14.2"
            className="w-full p-3 border border-gray-300 rounded-xl font-bold text-lg text-gray-800 focus:outline-none focus:border-[#0f4d3a]"
          />
          <span className="text-[11px] text-gray-400 mt-1 block">
            Check your current index on the Players Directory page.
          </span>
        </div>

        {/* 2. Choose Course */}
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-2">
            2. Select Tournament Course
          </label>
          <select
            value={selectedCourseId}
            onChange={(e) => {
              setSelectedCourseId(e.target.value);
              // Reset tee selection to first tee available for the new course
              const newCourse = courses.find((c) => c.id === e.target.value);
              if (newCourse) setSelectedTee(Object.keys(newCourse.tees)[0]);
            }}
            className="w-full p-3 border border-gray-300 rounded-xl font-medium text-gray-800 focus:outline-none focus:border-[#0f4d3a] cursor-pointer"
          >
            {courses.map((course) => (
              <option key={course.id} value={course.id}>
                {course.name}
              </option>
            ))}
          </select>
        </div>

        {/* 3. Choose Tee Box */}
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-2">
            3. Select Tee Box
          </label>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
            {availableTees.map((teeName) => (
              <button
                key={teeName}
                type="button"
                onClick={() => setSelectedTee(teeName)}
                className={`py-2.5 px-4 rounded-xl font-bold text-xs border transition-all cursor-pointer ${
                  selectedTee === teeName
                    ? "bg-[#0f4d3a] text-white border-[#0f4d3a] shadow-sm"
                    : "bg-gray-50 text-gray-700 border-gray-200 hover:bg-gray-100"
                }`}
              >
                {teeName} Tees
              </button>
            ))}
          </div>

          {/* Tee Specs Badge */}
          {teeData && (
            <div className="mt-3 flex items-center gap-4 text-xs text-gray-500 bg-gray-50 p-2.5 rounded-lg border border-gray-100">
              <span>Rating: <strong className="text-gray-800">{teeData.rating}</strong></span>
              <span>•</span>
              <span>Slope: <strong className="text-gray-800">{teeData.slope}</strong></span>
              <span>•</span>
              <span>Par: <strong className="text-gray-800">72</strong></span>
            </div>
          )}
        </div>

        {/* Result Display Box */}
        <div className="bg-emerald-50 border-2 border-emerald-500/30 rounded-2xl p-6 text-center space-y-1">
          <span className="text-xs uppercase tracking-widest text-emerald-800 font-bold block">
            Playing Strokes Allowed Today
          </span>
          <div className="text-5xl font-black text-emerald-950 py-1">
            {courseHcp}
          </div>
          <p className="text-xs text-emerald-800 font-medium">
            Course Handicap for {currentCourse.name} ({selectedTee} Tees)
          </p>
        </div>
      </div>
    </div>
  );
}
