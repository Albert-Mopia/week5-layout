// data/roundsData.js
// Agave Shooters GC - Master Tournament & Score Registry (All 61 Members)

export const tournaments = [
  { id: "t25", date: "2026-10-17", course: "Admiral Baker North", tee: "Blue", rating: 73.0, slope: 127 },
  { id: "t26", date: "2026-10-24", course: "Singing Hills Willow Glen", tee: "Blue", rating: 72.3, slope: 128 },
  { id: "t27", date: "2026-10-31", course: "Admiral Baker North", tee: "White", rating: 70.8, slope: 122 },
  { id: "t28", date: "2026-11-07", course: "Miramar Memorial", tee: "White", rating: 70.0, slope: 120 },
  { id: "t29", date: "2026-11-11", course: "Admiral Baker South", tee: "White", rating: 69.0, slope: 119 },
];

export function calcDiff(gross, rating = 71.5, slope = 124) {
  return Number(((113 / slope) * (gross - rating)).toFixed(2));
}

export function calculateRollingHcp(scores) {
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

export const membersRounds = [
  {
    id: 1,
    code: "ABAD, R",
    name: "Abad, Rolando",
    nickname: "Jojo",
    status: "Active",
    flight: "A Flight",
    tee: "White",
    currentHcp: 4.88,
    scores: [76, 76, 75, 76, 72, 77, 83, 76, 85, 72, 72, 81, 74, 78, 82, 81, 74, 69, 75, 74, 83, 84, 87, 75, 85]
  },
  {
    id: 2,
    code: "ABANO, R",
    name: "Abano, Rene",
    nickname: "Rene",
    status: "Active",
    flight: "A Flight",
    tee: "White",
    currentHcp: 6.50,
    scores: [83, 79, 78, 71, 75, 84, 77, 74, 82, 76, 74, 76, 80, 78, 82, 85, 73, 79, 82, 82, 81, 79, 89, 78, 76, 80]
  },
  {
    id: 3,
    code: "AGPAOA, A",
    name: "Agpaoa, Aggie",
    nickname: "Aggie",
    status: "Active",
    flight: "A Flight",
    tee: "White",
    currentHcp: 8.25,
    scores: [80, 84, 81, 76, 84, 86, 82, 80, 86, 85, 83, 80, 79, 87, 81, 83, 84, 86, 81, 79, 89, 79, 76, 79]
  },
  {
    id: 4,
    code: "AGPAOA, M",
    name: "Agpaoa, Max",
    nickname: "Max",
    status: "Active",
    flight: "A Flight",
    tee: "Blue",
    currentHcp: 5.00,
    scores: [80, 76, 78, 79, 74, 86, 82, 81, 87, 83, 79, 77, 75, 74, 85, 72, 77, 73, 75, 82, 81, 76, 72, 83, 78, 82, 78, 77, 72]
  },
  {
    id: 5,
    code: "ALFONSO, N",
    name: "Alfonso, Neil",
    nickname: "Neil",
    status: "Active",
    flight: "A Flight",
    tee: "Blue",
    currentHcp: 8.13,
    scores: [71, 79, 81, 76, 79, 80, 84, 82, 89, 88, 75, 84]
  },
  {
    id: 6,
    code: "APILADO, M",
    name: "Apilado, Manny",
    nickname: "Manny",
    status: "Active",
    flight: "B Flight",
    tee: "White",
    currentHcp: 11.38,
    scores: [85, 74, 79, 87, 85, 92, 84, 81, 83, 92, 78, 84, 90, 80, 86, 90, 80, 81, 87, 81, 91, 88, 86, 85, 83, 95, 88, 77, 79]
  },
  {
    id: 7,
    code: "CAMINA, L",
    name: "Camina, Leo",
    nickname: "Leo",
    status: "Active",
    flight: "C Flight",
    tee: "White",
    currentHcp: 22.38,
    scores: [98, 100, 95, 91, 93, 94, 91, 100, 97, 101, 105, 91, 98]
  },
  {
    id: 8,
    code: "CANIBAN, D",
    name: "Caniban, Danny",
    nickname: "Danny",
    status: "Active",
    flight: "B Flight",
    tee: "White",
    currentHcp: 15.50,
    scores: [92, 91, 87, 87, 87, 86, 85, 89, 89, 90, 92]
  },
  {
    id: 9,
    code: "CASTRO, R",
    name: "Castro, Rolly",
    nickname: "Rolly",
    status: "Active",
    flight: "B Flight",
    tee: "White",
    currentHcp: 10.75,
    scores: [88, 87, 88, 91, 91, 90, 91, 88, 92, 84, 78, 86, 82, 82, 95, 84, 91, 75]
  },
  {
    id: 10,
    code: "CHAMIAN, P",
    name: "Chamian, Perry",
    nickname: "Perry",
    status: "Active",
    flight: "B Flight",
    tee: "White",
    currentHcp: 15.75,
    scores: [82, 80, 94, 89, 88, 84, 94, 88, 91, 84, 89, 110, 89]
  },
  {
    id: 11,
    code: "CHONG, H",
    name: "Chong, Henry",
    nickname: "Henry",
    status: "Active",
    flight: "B Flight",
    tee: "White",
    currentHcp: 15.38,
    scores: [93, 93, 83, 87, 87, 90, 89, 97, 90, 80]
  },
  {
    id: 12,
    code: "CURA, A",
    name: "Cura, Art",
    nickname: "Art",
    status: "Active",
    flight: "C Flight",
    tee: "White",
    currentHcp: 19.38,
    scores: [81, 90, 94, 85, 91, 85, 94, 78, 92, 91, 81, 88, 93, 84, 91, 99, 90, 87, 97, 95, 105, 94]
  },
  {
    id: 13,
    code: "FABABIER, J",
    name: "Fababier, Jun",
    nickname: "Jun",
    status: "Active",
    flight: "C Flight",
    tee: "White",
    currentHcp: 18.88,
    scores: [93, 97, 91, 100, 94, 97, 89, 86, 92, 87, 96, 97, 103, 91, 99, 85, 93, 91, 101, 90, 93, 104, 89, 93, 93]
  },
  {
    id: 14,
    code: "FELICANO, E",
    name: "Felicano, Edgar",
    nickname: "Edgar",
    status: "Active",
    flight: "B Flight",
    tee: "White",
    currentHcp: 16.38,
    scores: [86, 87, 88, 84, 98, 92, 91, 83, 93, 90, 89, 90, 91, 90, 86, 88, 88]
  },
  {
    id: 15,
    code: "FERNANDEZ, A",
    name: "Fernandez, Alex",
    nickname: "Alex",
    status: "Active",
    flight: "A Flight",
    tee: "Blue",
    currentHcp: 6.38,
    scores: [83, 85, 78, 84, 84, 77, 82, 83, 74, 77, 81, 79, 75, 82, 83]
  },
  {
    id: 16,
    code: "FERNANDEZ, J",
    name: "Fernandez, Jun",
    nickname: "Jun",
    status: "Active",
    flight: "C Flight",
    tee: "White",
    currentHcp: 18.75,
    scores: [94, 91, 90, 98, 88, 94, 96, 86, 99, 95, 90, 89, 95, 89, 89]
  },
  {
    id: 17,
    code: "FONTILEA, S",
    name: "Fontilea, Sonny",
    nickname: "Sonny",
    status: "Active",
    flight: "A Flight",
    tee: "White",
    currentHcp: 5.88,
    scores: [85, 81, 78, 74, 82, 78, 77, 81, 77, 77]
  },
  {
    id: 18,
    code: "FORMENTERA, C",
    name: "Formentera, Cesar",
    nickname: "Cesar",
    status: "Active",
    flight: "B Flight",
    tee: "White",
    currentHcp: 15.63,
    scores: [88, 90, 76, 77, 87, 85, 85, 83, 88, 91, 80, 97, 98, 87, 89, 80, 83, 91, 93, 93, 96, 85, 99, 85, 83, 88]
  },
  {
    id: 19,
    code: "GERONIMO, R",
    name: "Geronimo, Rod",
    nickname: "Rod",
    status: "Active",
    flight: "C Flight",
    tee: "White",
    currentHcp: 20.63,
    scores: [93, 100, 94, 84, 90, 96, 89, 88, 95, 95, 92, 90, 91, 89, 98, 97, 92, 102, 102]
  },
  {
    id: 20,
    code: "GOMEZ, J",
    name: "Gomez, Joe",
    nickname: "Joe",
    status: "Active",
    flight: "B Flight",
    tee: "White",
    currentHcp: 16.13,
    scores: [82, 89, 91, 83, 94, 82, 80, 88, 87, 94, 82, 99, 96, 86, 90, 88, 86, 82, 82, 85, 94, 87, 89, 91, 87, 88, 88, 93, 89, 89]
  },
  {
    id: 21,
    code: "GUZMAN, C",
    name: "Guzman, Cesar",
    nickname: "Cesar",
    status: "Active",
    flight: "B Flight",
    tee: "White",
    currentHcp: 12.50,
    scores: [97, 84, 88, 90, 84, 92, 87, 86, 83, 91, 87, 83, 90, 88, 83, 93, 80, 81, 96, 82, 89, 86, 87, 93]
  },
  {
    id: 22,
    code: "HERRADURA, C",
    name: "Herradura, Charlie",
    nickname: "Charlie",
    status: "Active",
    flight: "C Flight",
    tee: "White",
    currentHcp: 19.63,
    scores: [93, 93, 91, 89, 91, 97, 86, 95, 95, 102]
  },
  {
    id: 23,
    code: "LAFORTEZA, C",
    name: "Laforteza, Charlie",
    nickname: "Charlie",
    status: "Active",
    flight: "B Flight",
    tee: "White",
    currentHcp: 15.88,
    scores: [85, 89, 87, 81, 91, 89, 87, 92, 94, 85, 85, 86, 99, 87, 87, 87, 88, 87, 87, 87, 93, 88, 94, 90, 85, 91, 88, 84, 88]
  },
  {
    id: 24,
    code: "LAFORTEZA, D",
    name: "Laforteza, Dave",
    nickname: "Dave",
    status: "Active",
    flight: "B Flight",
    tee: "Blue",
    currentHcp: 12.00,
    scores: [80, 80, 85, 84, 89, 82, 79, 83, 97, 83, 84, 84, 82, 80, 81, 89, 82, 76, 86, 83, 87, 83, 88, 86, 98, 84, 84, 79]
  },
  {
    id: 25,
    code: "LAPUZ, T",
    name: "Lapuz, Tony",
    nickname: "Tony",
    status: "Active",
    flight: "B Flight",
    tee: "White",
    currentHcp: 15.88,
    scores: [88, 88, 91, 86, 85, 91, 96, 87, 87, 105]
  },
  {
    id: 26,
    code: "LEDDA, F",
    name: "Ledda, Frank",
    nickname: "Frank",
    status: "Active",
    flight: "B Flight",
    tee: "White",
    currentHcp: 10.75,
    scores: [77, 91, 80, 81, 79, 81, 89, 84, 92, 76, 76, 81, 83, 74, 83, 92, 78, 79, 80, 86, 90, 81, 95, 91, 85, 91, 82, 73]
  },
  {
    id: 27,
    code: "MAARAT, C",
    name: "Maarat, Chris",
    nickname: "Chris",
    status: "Active",
    flight: "B Flight",
    tee: "White",
    currentHcp: 17.50,
    scores: [86, 97, 91, 88, 87, 84, 99, 87, 93, 88, 90, 99, 99]
  },
  {
    id: 28,
    code: "MACASINAG, R",
    name: "Macasinag, Rene",
    nickname: "Rene",
    status: "Active",
    flight: "B Flight",
    tee: "White",
    currentHcp: 13.25,
    scores: [85, 85, 91, 83, 82, 87, 87, 86, 91, 83, 78, 84, 88, 91, 81, 78, 87, 85, 87, 95, 96, 91, 86, 87, 86, 91, 86, 87]
  },
  {
    id: 29,
    code: "MALICDAN, J",
    name: "Malicdan, Jerry",
    nickname: "Jerry",
    status: "Active",
    flight: "B Flight",
    tee: "White",
    currentHcp: 11.00,
    scores: [81, 82, 81, 85, 83, 75, 78, 78, 91, 83, 92, 83, 88, 90, 81, 82, 75, 93, 84, 90, 84, 90, 81, 87, 84, 84, 81, 87, 84, 75, 79]
  },
  {
    id: 30,
    code: "MANSILLA, S",
    name: "Mansilla, Sonny",
    nickname: "Sonny",
    status: "Active",
    flight: "B Flight",
    tee: "White",
    currentHcp: 15.25,
    scores: [81, 83, 89, 92, 86, 87, 88, 92, 99, 95]
  },
  {
    id: 31,
    code: "MAUN, J",
    name: "Maun, Jun",
    nickname: "Jun",
    status: "Active",
    flight: "A Flight",
    tee: "White",
    currentHcp: 8.75,
    scores: [77, 81, 80, 76, 77, 81, 84, 78, 85, 82, 75, 81, 87, 81, 80, 79, 81, 88, 87, 87, 88, 87]
  },
  {
    id: 32,
    code: "MOPIA, A",
    name: "Mopia, Allan",
    nickname: "Allan",
    status: "Active",
    flight: "B Flight",
    tee: "White",
    currentHcp: 12.75,
    scores: [87, 87, 92, 82, 87, 82, 80, 81, 86, 85, 84, 80, 82, 80, 86, 79, 81, 81, 96, 86, 84, 84, 89, 84, 93, 81, 87, 83, 84, 93, 81, 87, 83]
  },
  {
    id: 33,
    code: "NATIVIDAD, N",
    name: "Natividad, Nolie",
    nickname: "Nolie",
    status: "Active",
    flight: "C Flight",
    tee: "White",
    currentHcp: 17.63,
    scores: [87, 96, 88, 94, 100, 88, 88, 88, 95, 96, 93, 85, 93, 92, 86, 87, 84, 95, 85, 88, 99, 94, 93, 108, 93, 108, 92, 86]
  },
  {
    id: 34,
    code: "ONA, J",
    name: "Ona, Jojo",
    nickname: "Jojo",
    status: "Active",
    flight: "A Flight",
    tee: "Blue",
    currentHcp: 6.63,
    scores: [79, 80, 85, 78, 81, 76, 74, 77, 85, 80, 83, 84, 75, 77, 74, 87, 79, 75, 78, 79, 78, 79, 84, 80, 78, 79, 84, 80, 81]
  },
  {
    id: 35,
    code: "ORCINO, A",
    name: "Orcino, Art",
    nickname: "Art",
    status: "Active",
    flight: "B Flight",
    tee: "White",
    currentHcp: 14.63,
    scores: [84, 83, 80, 80, 89, 78, 87, 83, 94, 88, 86, 91, 91, 97, 81, 86, 91, 97, 81, 86]
  },
  {
    id: 36,
    code: "PACLEB, J",
    name: "Pacleb, John",
    nickname: "John",
    status: "Active",
    flight: "B Flight",
    tee: "White",
    currentHcp: 16.25,
    scores: [92, 101, 89, 89, 88, 89, 85, 91, 88, 94, 87]
  },
  {
    id: 37,
    code: "PANGALDAN, L",
    name: "Pangaldan, Larry",
    nickname: "Larry",
    status: "Active",
    flight: "B Flight",
    tee: "White",
    currentHcp: 10.50,
    scores: [77, 86, 81, 85, 82, 84, 86, 80, 85, 98]
  },
  {
    id: 38,
    code: "PANGILINAN, A",
    name: "Pangilinan, Art",
    nickname: "Art",
    status: "Active",
    flight: "B Flight",
    tee: "White",
    currentHcp: 16.50,
    scores: [90, 97, 92, 95, 95, 96, 103, 93, 87, 103, 88, 97, 105, 88, 105, 90, 84, 98, 91, 88, 107, 80, 109, 92, 95, 92, 84, 86, 92, 95, 92, 84, 86]
  },
  {
    id: 39,
    code: "PUCKETT, B",
    name: "Puckett, Bob",
    nickname: "Bob",
    status: "Active",
    flight: "B Flight",
    tee: "White",
    currentHcp: 14.88,
    scores: [88, 93, 93, 82, 87, 91, 88, 89, 86, 83, 89]
  },
  {
    id: 40,
    code: "PUCKETT, D",
    name: "Puckett, Danny",
    nickname: "Danny",
    status: "Active",
    flight: "A Flight",
    tee: "White",
    currentHcp: 5.25,
    scores: [78, 80, 84, 80, 80, 81, 80, 81, 70, 73, 79, 76, 80, 80, 80, 85]
  },
  {
    id: 41,
    code: "PUCKETT, J",
    name: "Puckett, Joey",
    nickname: "Joey",
    status: "Active",
    flight: "B Flight",
    tee: "Blue",
    currentHcp: 10.63,
    scores: [85, 81, 81, 82, 85, 78, 80, 78, 90, 81, 81, 80, 89, 79, 83, 85, 85, 85, 84, 82, 79, 84, 85, 84, 82, 79, 84]
  },
  {
    id: 42,
    code: "PUNZALAN, R",
    name: "Punzalan, Roy",
    nickname: "Roy",
    status: "Active",
    flight: "A Flight",
    tee: "Blue",
    currentHcp: 4.88,
    scores: [81, 81, 77, 72, 78, 76, 74, 79, 83, 76, 83, 87, 88]
  },
  {
    id: 43,
    code: "RAMOS, R",
    name: "Ramos, Ruben",
    nickname: "Ruben",
    status: "Active",
    flight: "B Flight",
    tee: "White",
    currentHcp: 15.38,
    scores: [88, 92, 83, 90, 88, 91, 89, 95, 86, 89, 86, 95, 92, 90, 93, 86, 79, 89, 87, 88, 87, 86, 92, 86, 86, 96, 97, 87, 86]
  },
  {
    id: 44,
    code: "REMOT, A",
    name: "Remot, Andy",
    nickname: "Andy",
    status: "Active",
    flight: "B Flight",
    tee: "White",
    currentHcp: 13.50,
    scores: [96, 90, 90, 84, 84, 91, 89, 88, 101, 87, 86, 80, 84, 85, 85]
  },
  {
    id: 45,
    code: "RIVERA, D",
    name: "Rivera, Danny",
    nickname: "Danny",
    status: "Active",
    flight: "C Flight",
    tee: "White",
    currentHcp: 21.13,
    scores: [93, 97, 86, 93, 97, 97, 92, 96, 91, 93, 98, 89, 88, 85, 87, 79, 96, 96, 99]
  },
  {
    id: 46,
    code: "RIVERA, E",
    name: "Rivera, Eddie",
    nickname: "Eddie",
    status: "Active",
    flight: "B Flight",
    tee: "White",
    currentHcp: 15.13,
    scores: [86, 94, 79, 89, 86, 95, 88, 82, 86, 91, 82, 88, 79, 89, 89, 86, 82, 83, 81, 79, 96, 99]
  },
  {
    id: 47,
    code: "RIVERA, F",
    name: "Rivera, Frank",
    nickname: "Frank",
    status: "Active",
    flight: "A Flight",
    tee: "White",
    currentHcp: 9.88,
    scores: [81, 91, 83, 83, 79, 84, 83, 76, 83, 79, 81, 77, 80, 75, 84, 72, 85, 95, 92, 96, 82, 86, 83, 77, 78, 89, 89, 86]
  },
  {
    id: 48,
    code: "RIVERA, J",
    name: "Rivera, Joe",
    nickname: "Joe",
    status: "Active",
    flight: "A Flight",
    tee: "White",
    currentHcp: 6.63,
    scores: [85, 72, 80, 81, 73, 77, 75, 77, 86, 89, 83, 87, 93, 94, 84, 93, 87, 71, 85, 86, 86, 87, 98, 96, 88, 86, 84, 83, 81, 79]
  },
  {
    id: 49,
    code: "ROMERO, L",
    name: "Romero, Louie",
    nickname: "Louie",
    status: "Active",
    flight: "C Flight",
    tee: "White",
    currentHcp: 18.13,
    scores: [87, 96, 85, 94, 88, 84, 92, 104, 92, 87, 91, 78, 78, 76, 78, 72, 81, 80, 79, 90, 88, 97, 87, 87, 95, 92, 96]
  },
  {
    id: 50,
    code: "SALDUA, P",
    name: "Saldua, Pete",
    nickname: "Pete",
    status: "Active",
    flight: "A Flight",
    tee: "White",
    currentHcp: 6.63,
    scores: [80, 75, 78, 77, 71, 78, 76, 77, 75, 80, 72, 91, 89, 85, 87, 95, 76, 86, 82, 77, 78, 75, 78]
  },
  {
    id: 51,
    code: "SANTA MARIA, E",
    name: "Santa Maria, Eric",
    nickname: "Eric",
    status: "Active",
    flight: "B Flight",
    tee: "White",
    currentHcp: 12.50,
    scores: [93, 95, 80, 88, 86, 83, 91, 82, 98, 89, 96, 81, 90, 87, 86, 84, 82, 84, 86, 100, 93, 100, 91, 91, 89, 84, 98, 96, 88, 86, 84]
  },
  {
    id: 52,
    code: "SILVA, C",
    name: "Silva, Chris",
    nickname: "Chris",
    status: "Active",
    flight: "B Flight",
    tee: "White",
    currentHcp: 13.25,
    scores: [85, 85, 81, 94, 86, 87, 90, 99, 87, 91, 88, 79, 85, 83, 89, 92, 90, 85, 84, 89, 86, 84, 95, 88, 85, 87]
  },
  {
    id: 53,
    code: "TOLENTINO, N",
    name: "Tolentino, Nick",
    nickname: "Nick",
    status: "Active",
    flight: "B Flight",
    tee: "White",
    currentHcp: 11.38,
    scores: [94, 96, 90, 86, 90, 89, 89, 79, 95, 80, 83, 78, 84, 89, 89, 86, 98, 92]
  },
  {
    id: 54,
    code: "TRINIDAD, H",
    name: "Trinidad, Homer",
    nickname: "Homer",
    status: "Active",
    flight: "B Flight",
    tee: "White",
    currentHcp: 12.88,
    scores: [83, 85, 82, 86, 77, 86, 84, 81, 83, 83, 94, 82, 95, 89, 87, 85, 80, 84, 86, 98, 84, 86]
  },
  {
    id: 55,
    code: "VALDEZ, J",
    name: "Valdez, Jun",
    nickname: "Jun",
    status: "Active",
    flight: "C Flight",
    tee: "White",
    currentHcp: 17.13,
    scores: [83, 84, 85, 84, 92, 88, 82, 85, 92, 90, 87, 90, 85, 89, 84, 81, 81, 87, 92, 91, 91, 89, 84, 90]
  },
  {
    id: 56,
    code: "VALENTON, G",
    name: "Valenton, George",
    nickname: "George",
    status: "Active",
    flight: "B Flight",
    tee: "White",
    currentHcp: 14.88,
    scores: [86, 91, 87, 82, 98, 91, 85, 86, 96, 92, 83, 84, 95, 96, 88, 90, 86, 85]
  },
  {
    id: 57,
    code: "ASUNCION",
    name: "Asuncion, Guest",
    nickname: "Guest",
    status: "Non-Active",
    flight: "C Flight",
    tee: "White",
    currentHcp: 19.00,
    scores: [95, 94, 94, 93, 95, 98, 85, 95, 86, 86]
  },
  {
    id: 58,
    code: "BRILLO",
    name: "Brillo, Guest",
    nickname: "Guest",
    status: "Non-Active",
    flight: "B Flight",
    tee: "White",
    currentHcp: 16.13,
    scores: [86, 86, 85, 84, 85, 93, 97, 94, 92, 96]
  },
  {
    id: 59,
    code: "DELROSARIO",
    name: "Del Rosario, Guest",
    nickname: "Guest",
    status: "Non-Active",
    flight: "B Flight",
    tee: "White",
    currentHcp: 13.38,
    scores: [83, 89, 84, 89, 89, 87, 88, 86, 84, 82]
  },
  {
    id: 60,
    code: "LEJANO E",
    name: "Lejano, Eric",
    nickname: "Guest",
    status: "Non-Active",
    flight: "A Flight",
    tee: "Blue",
    currentHcp: 5.75,
    scores: [79, 81, 79, 85, 78, 82, 78, 78, 69, 80]
  },
  {
    id: 61,
    code: "ORTIGUERA",
    name: "Ortiguera, Guest",
    nickname: "Guest",
    status: "Non-Active",
    flight: "B Flight",
    tee: "White",
    currentHcp: 16.29,
    scores: [90, 86, 86, 90, 90, 90, 88, 88, 94]
  }
];
