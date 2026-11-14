export default function MemberCard({ name, flight, handicap }) {
  // Flight badge colors matching the Figma prototype
  const flightBadgeStyles = {
    "A Flight": "bg-emerald-400 text-gray-900",
    "B Flight": "bg-blue-400 text-gray-900",
    "C Flight": "bg-amber-300 text-gray-900",
  };

  const badgeStyle = flightBadgeStyles[flight] || "bg-gray-200 text-gray-800";

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm flex flex-col justify-between items-start transition-transform hover:-translate-y-1 hover:shadow-md">
      <div>
        <span
          className={`inline-block text-xs font-semibold px-3 py-1 rounded-md mb-3 ${badgeStyle}`}
        >
          {flight}
        </span>
        <h3 className="text-base font-bold text-gray-900 leading-snug">
          {name}
        </h3>
        <p className="text-xs text-gray-600 mt-1">
          Handicap: <span className="font-medium text-gray-800">{handicap.toFixed(1)}</span>
        </p>
      </div>

      <button
        type="button"
        className="mt-5 px-4 py-1.5 text-xs font-medium text-white bg-[#0f4d3a] hover:bg-[#0c3d2e] rounded transition-colors"
      >
        View Detail
      </button>
    </div>
  );
}
