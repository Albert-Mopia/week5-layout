// data/roundsData.js
// Agave Shooters GC - Master Tournament & Score Registry (All 61 Members)

// ⛳ 1. Master Golf Course Registry
export const courses = [
  {
    id: "admiral-baker-north",
    name: "Admiral Baker North",
    tees: {
      Blue: { rating: 73.0, slope: 127 },
      White: { rating: 70.8, slope: 122 },
      Red: { rating: 68.2, slope: 118 },
    },
  },
  {
    id: "admiral-baker-south",
    name: "Admiral Baker South",
    tees: {
      Blue: { rating: 71.0, slope: 123 },
      White: { rating: 69.0, slope: 119 },
    },
  },
  {
    id: "singing-hills-willow",
    name: "Singing Hills Willow Glen",
    tees: {
      Blue: { rating: 72.3, slope: 128 },
      White: { rating: 70.1, slope: 124 },
    },
  },
  {
    id: "miramar-memorial",
    name: "Miramar Memorial",
    tees: {
      Blue: { rating: 71.4, slope: 123 },
      White: { rating: 70.0, slope: 120 },
    },
  },
  {
    id: "coronado",
    name: "Coronado Golf Course",
    tees: {
      Blue: { rating: 72.5, slope: 124 },
      White: { rating: 71.5, slope: 121 },
    },
  },
  {
    id: "enagic-eastlake",
    name: "Enagic Golf Club",
    tees: {
      Blue: { rating: 72.4, slope: 137 },
      White: { rating: 70.2, slope: 131 },
    },
  },
  {
    id: "chula-vista",
    name: "Chula Vista Golf Course",
    tees: {
      Blue: { rating: 71.5, slope: 127 },
      White: { rating: 70.0, slope: 121 },
    },
  },
  {
    id: "mission-trails",
    name: "Mission Trails",
    tees: {
      Blue: { rating: 68.9, slope: 119 },
      White: { rating: 66.7, slope: 114 },
    },
  },
  {
    id: "bonita",
    name: "Bonita Golf Course",
    tees: {
      Blue: { rating: 69.3, slope: 118 },
      White: { rating: 67.3, slope: 114 },
    },
  },
    {
    id: "the-vineyard",
    name: "The Vineyard",
    tees: {
      Blue: { rating: 71.2, slope: 127 },
      White: { rating: 69.4, slope: 122 },
    },
  },
  {
    id: "boulder-oaks",
    name: "Boulder Oaks",
    tees: {
      Black: { rating: 68.3, slope: 118 },
      Blue: { rating: 65.5, slope: 112 },
      White: { rating: 62.7, slope: 105 },
    },
  },
  {
    id: "castle-creek",
    name: "Castle Creek",
    tees: {
      Blue: { rating: 70.6, slope: 129 },
      White: { rating: 68.6, slope: 123 },
    },
  },
  {
    id: "dos-osos",
    name: "Dos Osos",
    tees: {
      Blue: { rating: 71.7, slope: 133 },
      White: { rating: 69.6, slope: 125 },
    },
  },
    {
    id: "sea-n-air",
    name: "Sea 'N Air Golf Course",
    tees: {
      Blue: { rating: 70.6, slope: 126 },
      White: { rating: 69.2, slope: 122 },
      Red: { rating: 66.0, slope: 111 },
    },
  },
];

/**
 * Helper to get course rating and slope by course name and tee color
 */
export function getCourseSpecs(courseName, tee = "White") {
  const cleanTee = (tee || "").includes("White") ? "White" : (tee || "White");
  const course = courses.find(
    (c) => c.name.toLowerCase() === (courseName || "").toLowerCase()
  );

  if (course && course.tees && course.tees[cleanTee]) {
    return {
      course: course.name,
      rating: course.tees[cleanTee].rating,
      slope: course.tees[cleanTee].slope,
    };
  }

  return {
    course: courseName || "Standard Course",
    rating: 71.5,
    slope: 122,
  };
}

// ⛳ 2. Recent Tournaments
export const tournaments = [
  { id: "t25", date: "2026-10-17", course: "Admiral Baker North", tee: "Blue", rating: 73.0, slope: 127 },
  { id: "t26", date: "2026-10-24", course: "Singing Hills Willow Glen", tee: "Blue", rating: 72.3, slope: 128 },
  { id: "t27", date: "2026-10-31", course: "Admiral Baker North", tee: "White", rating: 70.8, slope: 122 },
  { id: "t28", date: "2026-11-07", course: "Miramar Memorial", tee: "White", rating: 70.0, slope: 120 },
  { id: "t29", date: "2026-11-11", course: "Admiral Baker South", tee: "White", rating: 69.0, slope: 119 },
  { id: "t30", date: "2026-11-28", course: "Sea 'N Air Golf Course", tee: "Blue", rating: 70.6, slope: 126 },
];

// ⛳ 3. Differential & Handicap Calculations
export function calcDiff(gross, rating = 71.5, slope = 124) {
  return Number(((113 / slope) * (gross - rating)).toFixed(2));
}

export function calculateRollingHcp(scores = []) {
  if (!scores || scores.length === 0) return 0;
  const recent = scores.slice(-20);
  const diffs = recent.map((s) => (typeof s === "number" ? calcDiff(s) : s.diff)).sort((a, b) => a - b);

  let count = 8;
  if (diffs.length <= 5) count = 1;
  else if (diffs.length <= 8) count = 2;
  else if (diffs.length <= 11) count = 3;
  else if (diffs.length <= 14) count = 4;
  else if (diffs.length <= 19) count = 6;

  const counted = diffs.slice(0, count);
  const avg = counted.reduce((sum, val) => sum + val, 0) / counted.length;
  return Number(avg.toFixed(2));
}

/**
 * ⛳ 4. Rounds Builder for MemberCard & Last 20 Modal
 */
export function getPlayerRealRounds(scores = [], playerTee = "White") {
  if (!scores || scores.length === 0) return [];

  const recentScores = scores.slice(-20);
  const total = recentScores.length;

  const rounds = recentScores.map((gross, idx) => {
    const tourneyIdx = tournaments.length - (total - idx);
    let courseName = "Admiral Baker North";
    let rating = 70.8;
    let slope = 122;
    let dateStr = "2026-11-11";

    if (tourneyIdx >= 0 && tournaments[tourneyIdx]) {
      const t = tournaments[tourneyIdx];
      courseName = t.course;
      rating = t.rating;
      slope = t.slope;
      dateStr = t.date;
    } else {
      const courseObj = courses[idx % courses.length];
      const specs = getCourseSpecs(courseObj ? courseObj.name : "Admiral Baker North", playerTee);
      courseName = specs.course;
      rating = specs.rating;
      slope = specs.slope;

      const d = new Date(2026, 10, 11);
      d.setDate(d.getDate() - (total - 1 - idx) * 7);
      dateStr = d.toISOString().split("T")[0];
    }

    const diff = Number(((113 / slope) * (gross - rating)).toFixed(1));

    return {
      id: idx + 1,
      date: dateStr,
      roundDate: dateStr,
      course: courseName,
      courseName: courseName,
      tee: playerTee,
      score: gross,
      gross: gross,
      rating,
      slope,
      diff: diff,
      differential: diff,
      counted: false,
    };
  });

  // Flag lowest differentials as counted (★)
  let countToTake = 8;
  if (total <= 5) countToTake = 1;
  else if (total <= 8) countToTake = 2;
  else if (total <= 11) countToTake = 3;
  else if (total <= 14) countToTake = 4;
  else if (total <= 19) countToTake = 6;

  const sortedIndices = rounds
    .map((r, i) => ({ diff: r.diff, index: i }))
    .sort((a, b) => a.diff - b.diff)
    .slice(0, countToTake)
    .map((item) => item.index);

    sortedIndices.forEach((i) => {
    rounds[i].counted = true;
    rounds[i].isUsed = true; // <-- Needed for the "★ Used" pill in the UI!
  });

  return rounds;
}

// ⛳ 5. All 61 Registered Club Members (Synced with members.js)
export const membersRounds = [
  {
    id: 1,
    name: "Abad, Rolando",
    nickname: "Jojo",
    flight: "A Flight",
    tee: "Blue",
    status: "Active",
    currentHcp: 4.88,
    scores: [76, 76, 75, 76, 72, 77, 83, 76, 85, 72, 72, 81, 74, 78, 82, 81, 74, 69, 75, 74, 83, 84, 87, 75, 85]
  },
  {
    id: 2,
    name: "Abano, Rene",
    nickname: "Sham",
    flight: "A Flight",
    tee: "Blue",
    status: "Active",
    currentHcp: 6.50,
    scores: [83, 79, 78, 71, 75, 84, 77, 74, 82, 76, 74, 76, 80, 78, 82, 85, 73, 79, 82, 82, 81, 79, 89, 78, 76, 80]
  },
  {
    id: 3,
    name: "Agpaoa, Aggie",
    nickname: "Aggie",
    flight: "A Flight",
    tee: "White (65+)",
    status: "Active",
    currentHcp: 8.25,
    scores: [80, 84, 81, 76, 84, 86, 82, 80, 86, 85, 83, 80, 79, 87, 81, 83, 84, 86, 81, 79, 89, 79, 76, 79]
  },
  {
    id: 4,
    name: "Agpaoa, Max",
    nickname: "Max",
    flight: "A Flight",
    tee: "Blue",
    status: "Active",
    currentHcp: 5.00,
    scores: [80, 76, 78, 79, 74, 86, 82, 81, 87, 83, 79, 77, 75, 74, 85, 72, 77, 73, 75, 82, 81, 76, 72, 83, 78, 82, 78, 77, 72]
  },
  {
    id: 5,
    name: "Alfonso, Neil",
    nickname: "",
    flight: "A Flight",
    tee: "Blue",
    status: "Active",
    currentHcp: 8.13,
    scores: [71, 79, 81, 76, 79, 80, 84, 82, 89, 88, 75, 84]
  },
  {
    id: 6,
    name: "Apilado, Marty",
    nickname: "Boyet atbp",
    flight: "B Flight",
    tee: "Blue",
    status: "Active",
    currentHcp: 11.38,
    scores: [85, 74, 79, 87, 85, 92, 84, 81, 83, 92, 78, 84, 90, 80, 86, 90, 80, 81, 87, 81, 91, 88, 86, 85, 83, 95, 88, 77, 79]
  },
  {
    id: 7,
    name: "Camina, Lance",
    nickname: "",
    flight: "C Flight",
    tee: "White (65+)",
    status: "Active",
    currentHcp: 22.38,
    scores: [98, 100, 95, 91, 93, 94, 91, 100, 97, 101, 105, 91, 98]
  },
  {
    id: 8,
    name: "Caniban, Dendee",
    nickname: "",
    flight: "B Flight",
    tee: "Check DOB",
    status: "Active",
    currentHcp: 15.50,
    scores: [92, 91, 87, 87, 87, 86, 85, 89, 89, 90, 92]
  },
  {
    id: 9,
    name: "Castro, Rommel",
    nickname: "Kam",
    flight: "A Flight",
    tee: "Blue",
    status: "Active",
    currentHcp: 10.75,
    scores: [88, 87, 88, 91, 91, 90, 91, 88, 92, 84, 78, 86, 82, 82, 95, 84, 91, 75]
  },
  {
    id: 10,
    name: "Chamian, Primo",
    nickname: "Primetime",
    flight: "B Flight",
    tee: "Blue",
    status: "Active",
    currentHcp: 15.75,
    scores: [82, 80, 94, 89, 88, 84, 94, 88, 91, 84, 89, 110, 89]
  },
  {
    id: 11,
    name: "Chong, Hanes",
    nickname: "Hans",
    flight: "B Flight",
    tee: "Check DOB",
    status: "Active",
    currentHcp: 15.38,
    scores: [93, 93, 83, 87, 87, 90, 89, 97, 90, 80]
  },
  {
    id: 12,
    name: "Cura, Archie",
    nickname: "Archie",
    flight: "C Flight",
    tee: "White (65+)",
    status: "Active",
    currentHcp: 19.38,
    scores: [81, 90, 94, 85, 91, 85, 94, 78, 92, 91, 81, 88, 93, 84, 91, 99, 90, 87, 97, 95, 105, 94]
  },
  {
    id: 13,
    name: "Fababier, Joel",
    nickname: "Joel",
    flight: "C Flight",
    tee: "Blue",
    status: "Active",
    currentHcp: 18.88,
    scores: [93, 97, 91, 100, 94, 97, 89, 86, 92, 87, 96, 97, 103, 91, 99, 85, 93, 91, 101, 90, 93, 104, 89, 93, 93]
  },
  {
    id: 14,
    name: "Felicano, Ed",
    nickname: "Ka Edong",
    flight: "C Flight",
    tee: "White (65+)",
    status: "Active",
    currentHcp: 16.38,
    scores: [86, 87, 88, 84, 98, 92, 91, 83, 93, 90, 89, 90, 91, 90, 86, 88, 88]
  },
  {
    id: 15,
    name: "Fernandez, Alberto",
    nickname: "Al",
    flight: "A Flight",
    tee: "Blue",
    status: "Active",
    currentHcp: 6.38,
    scores: [83, 85, 78, 84, 84, 77, 82, 83, 74, 77, 81, 79, 75, 82, 83]
  },
  {
    id: 16,
    name: "Fernandez, Jay",
    nickname: "",
    flight: "C Flight",
    tee: "White (65+)",
    status: "Active",
    currentHcp: 18.75,
    scores: [94, 91, 90, 98, 88, 94, 96, 86, 99, 95, 90, 89, 95, 89, 89]
  },
  {
    id: 17,
    name: "Fontilea, Suny",
    nickname: "",
    flight: "A Flight",
    tee: "Check DOB",
    status: "Active",
    currentHcp: 5.88,
    scores: [85, 81, 78, 74, 82, 78, 77, 81, 77, 77]
  },
  {
    id: 18,
    name: "Formentera, Cloyd",
    nickname: "Yum Yum",
    flight: "B Flight",
    tee: "Blue",
    status: "Active",
    currentHcp: 15.63,
    scores: [88, 90, 76, 77, 87, 85, 85, 83, 88, 91, 80, 97, 98, 87, 89, 80, 83, 91, 93, 93, 96, 85, 99, 85, 83, 88]
  },
  {
    id: 19,
    name: "Geronimo, Rodel",
    nickname: "Gee",
    flight: "C Flight",
    tee: "Check DOB",
    status: "Active",
    currentHcp: 20.63,
    scores: [93, 100, 94, 84, 90, 96, 89, 88, 95, 95, 92, 90, 91, 89, 98, 97, 92, 102, 102]
  },
  {
    id: 20,
    name: "Gomez, Julius",
    nickname: "Julz",
    flight: "C Flight",
    tee: "Blue",
    status: "Active",
    currentHcp: 16.13,
    scores: [82, 89, 91, 83, 94, 82, 80, 88, 87, 94, 82, 99, 96, 86, 90, 88, 86, 82, 82, 85, 94, 87, 89, 91, 87, 88, 88, 93, 89, 89]
  },
  {
    id: 21,
    name: "Guzman, Carlos",
    nickname: "Caloy",
    flight: "B Flight",
    tee: "White (65+)",
    status: "Active",
    currentHcp: 12.50,
    scores: [97, 84, 88, 90, 84, 92, 87, 86, 83, 91, 87, 83, 90, 88, 83, 93, 80, 81, 96, 82, 89, 86, 87, 93]
  },
  {
    id: 22,
    name: "Herradura, Charlie",
    nickname: "Chuck",
    flight: "C Flight",
    tee: "Check DOB",
    status: "Active",
    currentHcp: 19.63,
    scores: [93, 93, 91, 89, 91, 97, 86, 95, 95, 102]
  },
  {
    id: 23,
    name: "Laforteza, Chris",
    nickname: "Chris",
    flight: "B Flight",
    tee: "Blue",
    status: "Active",
    currentHcp: 15.88,
    scores: [85, 89, 87, 81, 91, 89, 87, 92, 94, 85, 85, 86, 99, 87, 87, 87, 88, 87, 87, 87, 93, 88, 94, 90, 85, 91, 88, 84, 88]
  },
  {
    id: 24,
    name: "Laforteza, Dee",
    nickname: "Dee",
    flight: "B Flight",
    tee: "Blue",
    status: "Active",
    currentHcp: 12.00,
    scores: [80, 80, 85, 84, 89, 82, 79, 83, 97, 83, 84, 84, 82, 80, 81, 89, 82, 76, 86, 83, 87, 83, 88, 86, 98, 84, 84, 79]
  },
  {
    id: 25,
    name: "Lapuz, Teddy",
    nickname: "Ted",
    flight: "B Flight",
    tee: "Blue",
    status: "Active",
    currentHcp: 15.88,
    scores: [88, 88, 91, 86, 85, 91, 96, 87, 87, 105]
  },
  {
    id: 26,
    name: "Ledda, Fred",
    nickname: "Maki",
    flight: "A Flight",
    tee: "Blue",
    status: "Active",
    currentHcp: 10.75,
    scores: [77, 91, 80, 81, 79, 81, 89, 84, 92, 76, 76, 81, 83, 74, 83, 92, 78, 79, 80, 86, 90, 81, 95, 91, 85, 91, 82, 73]
  },
  {
    id: 27,
    name: "Maarat, Clyde",
    nickname: "Clyde",
    flight: "C Flight",
    tee: "Blue",
    status: "Active",
    currentHcp: 17.50,
    scores: [86, 97, 91, 88, 87, 84, 99, 87, 93, 88, 90, 99, 99]
  },
  {
    id: 28,
    name: "Macasinag, Renan",
    nickname: "Mac",
    flight: "B Flight",
    tee: "Blue",
    status: "Active",
    currentHcp: 13.25,
    scores: [85, 85, 91, 83, 82, 87, 87, 86, 91, 83, 78, 84, 88, 91, 81, 78, 87, 85, 87, 95, 96, 91, 86, 87, 86, 91, 86, 87]
  },
  {
    id: 29,
    name: "Malicdan, Jun",
    nickname: "Juju",
    flight: "B Flight",
    tee: "Blue",
    status: "Active",
    currentHcp: 11.00,
    scores: [81, 82, 81, 85, 83, 75, 78, 78, 91, 83, 92, 83, 88, 90, 81, 82, 75, 93, 84, 90, 84, 90, 81, 87, 84, 84, 81, 87, 84, 75, 79]
  },
  {
    id: 30,
    name: "Mansilla, Sherwin",
    nickname: "",
    flight: "B Flight",
    tee: "Check DOB",
    status: "Active",
    currentHcp: 15.25,
    scores: [81, 83, 89, 92, 86, 87, 88, 92, 99, 95]
  },
  {
    id: 31,
    name: "Maun, Jomar",
    nickname: "Jom",
    flight: "A Flight",
    tee: "Blue",
    status: "Active",
    currentHcp: 8.75,
    scores: [77, 81, 80, 76, 77, 81, 84, 78, 85, 82, 75, 81, 87, 81, 80, 79, 81, 88, 87, 87, 88, 87]
  },
  {
    id: 32,
    name: "Mopia, Albert",
    nickname: "Abet",
    flight: "B Flight",
    tee: "Blue",
    status: "Active",
    currentHcp: 12.75,
    scores: [87, 87, 92, 82, 87, 82, 80, 81, 86, 85, 84, 80, 82, 80, 86, 79, 81, 81, 96, 86, 84, 84, 89, 84, 93, 81, 87, 83, 84, 93, 81, 87, 83]
  },
  {
    id: 33,
    name: "Natividad, Nate",
    nickname: "Idol",
    flight: "C Flight",
    tee: "Blue",
    status: "Active",
    currentHcp: 17.63,
    scores: [87, 96, 88, 94, 100, 88, 88, 88, 95, 96, 93, 85, 93, 92, 86, 87, 84, 95, 85, 88, 99, 94, 93, 108, 93, 108, 92, 86]
  },
  {
    id: 34,
    name: "Ona, Jim",
    nickname: "Baste",
    flight: "A Flight",
    tee: "Blue",
    status: "Active",
    currentHcp: 6.63,
    scores: [79, 80, 85, 78, 81, 76, 74, 77, 85, 80, 83, 84, 75, 77, 74, 87, 79, 75, 78, 79, 78, 79, 84, 80, 78, 79, 84, 80, 81]
  },
  {
    id: 35,
    name: "Orcino, Arnel",
    nickname: "Carreon",
    flight: "B Flight",
    tee: "Blue",
    status: "Active",
    currentHcp: 14.63,
    scores: [84, 83, 80, 80, 89, 78, 87, 83, 94, 88, 86, 91, 91, 97, 81, 86, 91, 97, 81, 86]
  },
  {
    id: 36,
    name: "Pacleb, Jonathan",
    nickname: "Jack",
    flight: "C Flight",
    tee: "Check DOB",
    status: "Active",
    currentHcp: 16.25,
    scores: [92, 101, 89, 89, 88, 89, 85, 91, 88, 94, 87]
  },
  {
    id: 37,
    name: "Pangaldan, Lito",
    nickname: "Tolitz",
    flight: "A Flight",
    tee: "Blue",
    status: "Active",
    currentHcp: 10.50,
    scores: [77, 86, 81, 85, 82, 84, 86, 80, 85, 98]
  },
  {
    id: 38,
    name: "Pangilinan, Atoy",
    nickname: "Atoy",
    flight: "C Flight",
    tee: "Blue",
    status: "Active",
    currentHcp: 16.50,
    scores: [90, 97, 92, 95, 95, 96, 103, 93, 87, 103, 88, 97, 105, 88, 105, 90, 84, 98, 91, 88, 107, 80, 109, 92, 95, 92, 84, 86, 92, 95, 92, 84, 86]
  },
  {
    id: 39,
    name: "Puckett, Brian",
    nickname: "",
    flight: "B Flight",
    tee: "Blue",
    status: "Active",
    currentHcp: 14.88,
    scores: [88, 93, 93, 82, 87, 91, 88, 89, 86, 83, 89]
  },
  {
    id: 40,
    name: "Puckett, Douglas",
    nickname: "Doug",
    flight: "A Flight",
    tee: "Check DOB",
    status: "Active",
    currentHcp: 5.25,
    scores: [78, 80, 84, 80, 80, 81, 80, 81, 70, 73, 79, 76, 80, 80, 80, 85]
  },
  {
    id: 41,
    name: "Puckett, John Paul",
    nickname: "JP",
    flight: "A Flight",
    tee: "Blue",
    status: "Active",
    currentHcp: 10.63,
    scores: [85, 81, 81, 82, 85, 78, 80, 78, 90, 81, 81, 80, 89, 79, 83, 85, 85, 85, 84, 82, 79, 84, 85, 84, 82, 79, 84]
  },
  {
    id: 42,
    name: "Punzalan, Roland",
    nickname: "",
    flight: "A Flight",
    tee: "Blue",
    status: "Active",
    currentHcp: 4.88,
    scores: [81, 81, 77, 72, 78, 76, 74, 79, 83, 76, 83, 87, 88]
  },
  {
    id: 43,
    name: "Ramos, Raymond",
    nickname: "Lefty",
    flight: "B Flight",
    tee: "White (65+)",
    status: "Active",
    currentHcp: 15.38,
    scores: [88, 92, 83, 90, 88, 91, 89, 95, 86, 89, 86, 95, 92, 90, 93, 86, 79, 89, 87, 88, 87, 86, 92, 86, 86, 96, 97, 87, 86]
  },
  {
    id: 44,
    name: "Remot, Ariel",
    nickname: "Remote",
    flight: "B Flight",
    tee: "Check DOB",
    status: "Active",
    currentHcp: 13.50,
    scores: [96, 90, 90, 84, 84, 91, 89, 88, 101, 87, 86, 80, 84, 85, 85]
  },
  {
    id: 45,
    name: "Rivera, Del",
    nickname: "Del",
    flight: "C Flight",
    tee: "White (65+)",
    status: "Active",
    currentHcp: 21.13,
    scores: [93, 97, 86, 93, 97, 97, 92, 96, 91, 93, 98, 89, 88, 85, 87, 79, 96, 96, 99]
  },
  {
    id: 46,
    name: "Rivera, Ed",
    nickname: "Ed",
    flight: "B Flight",
    tee: "Blue",
    status: "Active",
    currentHcp: 15.13,
    scores: [86, 94, 79, 89, 86, 95, 88, 82, 86, 91, 82, 88, 79, 89, 89, 86, 82, 83, 81, 79, 96, 99]
  },
  {
    id: 47,
    name: "Rivera, Ferdie",
    nickname: "Ferd",
    flight: "A Flight",
    tee: "Blue",
    status: "Active",
    currentHcp: 9.88,
    scores: [81, 91, 83, 83, 79, 84, 83, 76, 83, 79, 81, 77, 80, 75, 84, 72, 85, 95, 92, 96, 82, 86, 83, 77, 78, 89, 89, 86]
  },
  {
    id: 48,
    name: "Rivera, Joe",
    nickname: "Joe",
    flight: "A Flight",
    tee: "Blue",
    status: "Active",
    currentHcp: 6.63,
    scores: [85, 72, 80, 81, 73, 77, 75, 77, 86, 89, 83, 87, 93, 94, 84, 93, 87, 71, 85, 86, 86, 87, 98, 96, 88, 86, 84, 83, 81, 79]
  },
  {
    id: 49,
    name: "Romero, Leo",
    nickname: "Leo",
    flight: "C Flight",
    tee: "Blue",
    status: "Active",
    currentHcp: 18.13,
    scores: [87, 96, 85, 94, 88, 84, 92, 104, 92, 87, 91, 78, 78, 76, 78, 72, 81, 80, 79, 90, 88, 97, 87, 87, 95, 92, 96]
  },
  {
    id: 50,
    name: "Saldua, Paolo",
    nickname: "Pao",
    flight: "A Flight",
    tee: "Blue",
    status: "Active",
    currentHcp: 6.63,
    scores: [80, 75, 78, 77, 71, 78, 76, 77, 75, 80, 72, 91, 89, 85, 87, 95, 76, 86, 82, 77, 78, 75, 78]
  },
  {
    id: 51,
    name: "Santa Maria, Ed",
    nickname: "Saint",
    flight: "B Flight",
    tee: "White (65+)",
    status: "Active",
    currentHcp: 12.50,
    scores: [93, 95, 80, 88, 86, 83, 91, 82, 98, 89, 96, 81, 90, 87, 86, 84, 82, 84, 86, 100, 93, 100, 91, 91, 89, 84, 98, 96, 88, 86, 84]
  },
  {
    id: 52,
    name: "Silva, Chris",
    nickname: "",
    flight: "B Flight",
    tee: "Blue",
    status: "Active",
    currentHcp: 13.25,
    scores: [85, 85, 81, 94, 86, 87, 90, 99, 87, 91, 88, 79, 85, 83, 89, 92, 90, 85, 84, 89, 86, 84, 95, 88, 85, 87]
  },
  {
    id: 53,
    name: "Tolentino, Noel",
    nickname: "Drunken Master",
    flight: "B Flight",
    tee: "Check DOB",
    status: "Active",
    currentHcp: 11.38,
    scores: [94, 96, 90, 86, 90, 89, 89, 79, 95, 80, 83, 78, 84, 89, 89, 86, 98, 92]
  },
  {
    id: 54,
    name: "Trinidad, Harry",
    nickname: "Hurry",
    flight: "B Flight",
    tee: "Blue",
    status: "Active",
    currentHcp: 12.88,
    scores: [83, 85, 82, 86, 77, 86, 84, 81, 83, 83, 94, 82, 95, 89, 87, 85, 80, 84, 86, 98, 84, 86]
  },
  {
    id: 55,
    name: "Valdez, Jean",
    nickname: "Jean",
    flight: "C Flight",
    tee: "Blue",
    status: "Active",
    currentHcp: 17.13,
    scores: [83, 84, 85, 84, 92, 88, 82, 85, 92, 90, 87, 90, 85, 89, 84, 81, 81, 87, 92, 91, 91, 89, 84, 90]
  },
  {
    id: 56,
    name: "Valenton, Glenn",
    nickname: "Glenn",
    flight: "B Flight",
    tee: "Blue",
    status: "Active",
    currentHcp: 14.88,
    scores: [86, 91, 87, 82, 98, 91, 85, 86, 96, 92, 83, 84, 95, 96, 88, 90, 86, 85]
  },
  // Non-Active Members
  {
    id: 57,
    name: "Asuncion",
    nickname: "Kiko",
    flight: "C Flight",
    tee: "Blue",
    status: "Non-Active",
    currentHcp: 19.00,
    scores: [95, 94, 94, 93, 95, 98, 85, 95, 86, 86]
  },
  {
    id: 58,
    name: "Brillo",
    nickname: "",
    flight: "C Flight",
    tee: "Check DOB",
    status: "Non-Active",
    currentHcp: 16.13,
    scores: [86, 86, 85, 84, 85, 93, 97, 94, 92, 96]
  },
  {
    id: 59,
    name: "Del Rosario",
    nickname: "OJ",
    flight: "B Flight",
    tee: "Check DOB",
    status: "Non-Active",
    currentHcp: 13.38,
    scores: [83, 89, 84, 89, 89, 87, 88, 86, 84, 82]
  },
  {
    id: 60,
    name: "Lejano, E.",
    nickname: "",
    flight: "A Flight",
    tee: "Check DOB",
    status: "Non-Active",
    currentHcp: 5.75,
    scores: [79, 81, 79, 85, 78, 82, 78, 78, 69, 80]
  },
  {
    id: 61,
    name: "Ortiguera",
    nickname: "",
    flight: "C Flight",
    tee: "Blue",
    status: "Non-Active",
    currentHcp: 16.29,
    scores: [90, 86, 86, 90, 90, 90, 88, 88, 94]
  }
];
// ⛳ 6. Export all members with their generated rounds attached
export const members = membersRounds.map((member) => {
  // Turn "Abad, Rolando" into "Rolando Abad"
  const nameParts = member.name.split(",").map((s) => s.trim());
  const fullName = nameParts.length === 2 ? `${nameParts[1]} ${nameParts[0]}` : member.name;

  return {
    ...member,
    fullName,
    // This generates the 20 round objects with courses, dates, gross, and diffs!
    rounds: getPlayerRealRounds(member.scores, member.tee),
  };
});
