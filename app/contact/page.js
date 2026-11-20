export const metadata = {
  title: "Club Leadership & Contact | Agave Shooters Golf Club",
  description: "Executive board, tournament committee, and original 8 founding members.",
};

export default function ContactPage() {
  // Executive Board & Coordinators (Update with your real details as needed)
  const officers = [
    {
      title: "Club President",
      name: "Albert Mopia",
      role: "Executive Operations & Club Direction",
      phone: "(619) 555-0101",
      email: "president@agaveshooters.com",
      badge: "President",
    },
    {
      title: "Board Chairman",
      name: "Danny Cruz",
      role: "Governance, Constitution & By-Laws",
      phone: "(619) 555-0102",
      email: "chairman@agaveshooters.com",
      badge: "Chairman",
    },
    {
      title: "Tee Time Coordinator",
      name: "Ramon Villanueva",
      role: "Shotgun Rosters, Course Bookings & Pairings",
      phone: "(619) 555-0103",
      email: "teetimes@agaveshooters.com",
      badge: "Tee Times",
    },
    {
      title: "Treasurer / Secretary",
      name: "Edgar Santos",
      role: "Prize Pools, Flights & Financial Records",
      phone: "(619) 555-0104",
      email: "treasury@agaveshooters.com",
      badge: "Finance",
    },
  ];

  // The Original 8 Founding Members Honor Roll
  const originalEight = [
    { name: "Albert Mopia", title: "Founder / President" },
    { name: "Danny Cruz", title: "Founder / Chairman" },
    { name: "Ramon Villanueva", title: "Founder / Coordinator" },
    { name: "Edgar Santos", title: "Founder / Treasurer" },
    { name: "Noel Reyes", title: "Charter Member" },
    { name: "Jun Bautista", title: "Charter Member" },
    { name: "Rey Mendoza", title: "Charter Member" },
    { name: "Gerry Fernandez", title: "Charter Member" },
  ];

  return (
    <div className="space-y-12 max-w-5xl mx-auto">
      {/* Header Banner */}
      <section className="bg-white rounded-3xl border border-gray-200 p-8 sm:p-10 shadow-sm space-y-3">
        <span className="inline-block text-[11px] uppercase tracking-widest font-extrabold px-3 py-1 bg-emerald-100 text-[#0f4d3a] rounded-full">
          Agave Shooters Leadership • Est. 2020
        </span>
        <h1 className="text-3xl sm:text-4xl font-black text-gray-950 tracking-tight">
          Club Leadership & Contact
        </h1>
        <p className="text-xs sm:text-sm text-gray-600 max-w-2xl leading-relaxed">
          Reach out directly to our committee officers for tee times, membership inquiries, flight placements, or tournament sign-ups.
        </p>
      </section>

      {/* 1. Executive Board Officers */}
      <section className="space-y-6">
        <div>
          <h2 className="text-xl font-extrabold text-gray-950">Executive Officers</h2>
          <p className="text-xs text-gray-600 mt-1">
            Current elected officers overseeing tournament play and club management.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {officers.map((officer) => (
            <div
              key={officer.title}
              className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm hover:shadow-md transition flex flex-col justify-between space-y-4"
            >
              <div className="space-y-1">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-800 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
                    {officer.badge}
                  </span>
                  <span className="text-xs font-semibold text-gray-400">{officer.title}</span>
                </div>
                <h3 className="text-lg font-black text-gray-900 pt-2">{officer.name}</h3>
                <p className="text-xs text-gray-500">{officer.role}</p>
              </div>

              <div className="pt-3 border-t border-gray-100 flex flex-wrap gap-4 text-xs font-medium">
                <a
                  href={`tel:${officer.phone}`}
                  className="text-[#0f4d3a] hover:text-[#0c3d2e] flex items-center gap-1.5"
                >
                  <span>📞</span> {officer.phone}
                </a>
                <a
                  href={`mailto:${officer.email}`}
                  className="text-gray-600 hover:text-gray-900 flex items-center gap-1.5"
                >
                  <span>✉️</span> {officer.email}
                </a>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 2. The Original 8 Members Honor Roll */}
      <section className="bg-gradient-to-br from-[#0f4d3a] to-[#0c3d2e] rounded-3xl p-8 sm:p-10 text-white shadow-md space-y-6">
        <div className="max-w-2xl space-y-2">
          <div className="flex items-center gap-2">
            <span className="text-xl">🎖️</span>
            <span className="text-xs uppercase font-extrabold tracking-widest text-emerald-300">
              Honoring Our Foundation
            </span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black tracking-tight">
            The Original 8 Founding Members
          </h2>
          <p className="text-xs sm:text-sm text-emerald-100/90 leading-relaxed">
            In 2020, eight military veterans came together on the fairways of San Diego to establish the Agave Shooters. We recognize their leadership and vision in building this brotherhood.
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
          {originalEight.map((founder, idx) => (
            <div
              key={founder.name}
              className="bg-white/10 backdrop-blur-sm border border-emerald-400/20 rounded-xl p-4 text-center hover:bg-white/15 transition"
            >
              <div className="w-7 h-7 mx-auto rounded-full bg-emerald-400/20 text-emerald-200 font-bold text-xs flex items-center justify-center mb-2">
                0{idx + 1}
              </div>
              <p className="font-extrabold text-sm text-white">{founder.name}</p>
              <p className="text-[11px] text-emerald-200/80 mt-0.5">{founder.title}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 3. Direct Message / Tee Time Sign-up Form powered by Formspree */}
      <section className="bg-white rounded-3xl border border-gray-200 p-8 shadow-sm space-y-6">
        <div>
          <h2 className="text-xl font-extrabold text-gray-950">Send Leadership a Message</h2>
          <p className="text-xs text-gray-600 mt-1">
            Questions about upcoming tournaments, flights, or tee times? Submit below and leadership will get back to you.
          </p>
        </div>

        <form
          action="https://formspree.io/f/xzerejda"
          method="POST"
          className="space-y-4"
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">
                Your Full Name
              </label>
              <input
                type="text"
                name="name"
                required
                placeholder="e.g. John Doe"
                className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#0f4d3a]"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">
                Email Address
              </label>
              <input
                type="email"
                name="email"
                required
                placeholder="veteran@example.com"
                className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#0f4d3a]"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-700 mb-1">
              Topic / Reason for Contact
            </label>
            <select
              name="subject"
              className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#0f4d3a] bg-white text-gray-700"
            >
              <option value="Tee Time Confirmation">Confirm Tee Time for Next Round (Tee Time Coordinator)</option>
              <option value="Membership Application">New Membership Application</option>
              <option value="Handicap Question">Handicap Index / Flight Placement</option>
              <option value="General Question">General Inquiry for Officers</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-700 mb-1">
              Your Message
            </label>
            <textarea
              name="message"
              rows="4"
              required
              placeholder="Provide your handicap index, GHIN number, or specific question..."
              className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#0f4d3a]"
            ></textarea>
          </div>

          <button
            type="submit"
            className="w-full sm:w-auto px-8 py-3 bg-[#0f4d3a] hover:bg-[#0c3d2e] text-white text-xs font-bold rounded-xl transition shadow-sm"
          >
            Send Message to Leadership →
          </button>
        </form>
      </section>
    </div>
  );
}
