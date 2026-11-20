import { members } from "@/data/members";
import { mediaItems } from "@/data/media";
import MemberCard from "@/components/MemberCard";
import Link from "next/link";

export default function Home() {
  // Automatically finds the golfer with the lowest handicap in each flight
  const getFlightLeader = (flightName) => {
    return members
      .filter((m) => m.flight === flightName)
      .sort((a, b) => a.handicap - b.handicap)[0];
  };

  const aLeader = getFlightLeader("A Flight");
  const bLeader = getFlightLeader("B Flight");
  const cLeader = getFlightLeader("C Flight");

  const featuredLeaders = [aLeader, bLeader, cLeader].filter(Boolean);

  // Take the first 3 highlight items for the homepage
  const recentMedia = (mediaItems || []).slice(0, 3);

  return (
    <div className="space-y-12">
      {/* 1. Hero Crest Banner Showcase */}
      <section className="bg-white rounded-3xl border border-gray-200 shadow-sm overflow-hidden">
        <div className="relative w-full bg-slate-950 overflow-hidden">
          <img
            src="/hero-banner.png"
            alt="Agave Shooters Golf Club - San Diego California"
            className="w-full h-auto max-h-[460px] object-cover object-center mx-auto"
          />
        </div>

        {/* Hero Introduction & Quick Action Buttons */}
        <div className="p-6 sm:p-8 bg-gradient-to-b from-white to-gray-50 flex flex-col md:flex-row md:items-center justify-between gap-6 border-t border-gray-100">
          <div className="space-y-2 max-w-2xl">
            <span className="inline-block text-[11px] uppercase tracking-widest font-extrabold px-3 py-1 bg-emerald-100 text-[#0f4d3a] rounded-full">
              San Diego, California • Veteran Brotherhood
            </span>
            <h1 className="text-2xl sm:text-4xl font-black text-gray-950 tracking-tight">
              Fairways, Flight Play & Veteran Camaraderie.
            </h1>
            <p className="text-gray-600 text-xs sm:text-sm leading-relaxed">
              Welcome to the official portal for the Agave Shooters. Bringing military veterans and community golfers together for competitive flight championships across San Diego.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 self-start md:self-center shrink-0">
            <Link
              href="/players"
              className="px-5 py-2.5 bg-[#0f4d3a] hover:bg-[#0c3d2e] text-white text-xs font-bold rounded-xl transition-all shadow-sm text-center"
            >
              View Player Roster →
            </Link>
            <Link
              href="/calculator"
              className="px-5 py-2.5 bg-emerald-50 hover:bg-emerald-100 text-[#0f4d3a] border border-emerald-300 text-xs font-bold rounded-xl transition-all text-center"
            >
              Handicap Calculator
            </Link>
          </div>
        </div>
      </section>

      {/* 2. Next Scheduled Tournament Announcement */}
      <section className="bg-emerald-50 border border-emerald-200 rounded-2xl p-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-800">
              Next Official Round
            </span>
          </div>
          <h2 className="text-lg font-bold text-gray-900">
            Agave Shooters Monthly Flight Championship
          </h2>
          <p className="text-xs text-gray-600">
            📍 Admiral Baker Golf Course • San Diego, CA | 🗓️ Saturday 07:30 AM Shotgun Start
          </p>
        </div>
        <Link
          href="/contact"
          className="whitespace-nowrap px-4 py-2 bg-[#0f4d3a] text-white text-xs font-semibold rounded-lg hover:bg-[#0c3d2e] transition-colors"
        >
          Confirm Your Tee Time
        </Link>
      </section>

      {/* 3. Quick Club Stats */}
      <section className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-sm text-center">
          <p className="text-xs text-gray-500 font-medium uppercase tracking-wider">Active Roster</p>
          <p className="text-3xl font-extrabold text-[#0f4d3a] mt-1">{members.length}</p>
        </div>
        <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-sm text-center">
          <p className="text-xs text-gray-500 font-medium uppercase tracking-wider">Flight Brackets</p>
          <p className="text-3xl font-extrabold text-[#0f4d3a] mt-1">3</p>
        </div>
        <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-sm text-center">
          <p className="text-xs text-gray-500 font-medium uppercase tracking-wider">Tee Time</p>
          <p className="text-xl font-extrabold text-gray-900 mt-1">07:30 AM</p>
        </div>
        <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-sm text-center">
          <p className="text-xs text-gray-500 font-medium uppercase tracking-wider">Avg Index</p>
          <p className="text-3xl font-extrabold text-[#0f4d3a] mt-1">11.8</p>
        </div>
      </section>

      {/* 4. Flight Spotlight Preview */}
      <section className="space-y-6">
        <div className="flex items-center justify-between border-b border-gray-200 pb-4">
          <div>
            <h2 className="text-xl font-extrabold text-gray-950">
              Flight Leaders Spotlight
            </h2>
            <p className="text-xs text-gray-600 mt-1">
              Top seeded golfers heading into this weekend's round.
            </p>
          </div>
          <Link
            href="/players"
            className="text-xs font-bold text-[#0f4d3a] hover:text-[#0c3d2e] underline underline-offset-4"
          >
            See all {members.length} members →
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredLeaders.map((member) => (
            <MemberCard
              key={member.id}
              name={member.name}
              flight={member.flight}
              handicap={member.handicap}
              phone={member.phone}
              email={member.email}
              image={member.image}
            />
          ))}
        </div>
      </section>

      {/* 5. Tournament Gallery Highlights Section */}
      <section className="space-y-6">
        <div className="flex items-center justify-between border-b border-gray-200 pb-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-base">📸</span>
              <h2 className="text-xl font-extrabold text-gray-950">
                Tournament Highlights & Action
              </h2>
            </div>
            <p className="text-xs text-gray-600 mt-1">
              Recent trophies, swing clips, and course moments from our events.
            </p>
          </div>
          <Link
            href="/gallery"
            className="text-xs font-bold text-[#0f4d3a] hover:text-[#0c3d2e] underline underline-offset-4"
          >
            View Full Gallery →
          </Link>
        </div>

        {/* 3-Card Media Showcase Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {recentMedia.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-sm hover:shadow-md transition flex flex-col justify-between"
            >
              {item.type === "video" ? (
                <div className="aspect-video w-full bg-black">
                  <iframe
                    src={`https://www.youtube-nocookie.com/embed/${item.youtubeId}`}
                    title={item.title}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="w-full h-full border-0"
                  />
                </div>
              ) : (
                <div className="aspect-video w-full bg-gray-100 overflow-hidden">
                  <img
                    src={item.url}
                    alt={item.title}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                  />
                </div>
              )}

              <div className="p-4 space-y-1.5">
                <div className="flex items-center justify-between text-[10px] font-bold text-gray-500 uppercase tracking-wide">
                  <span className="text-[#0f4d3a]">{item.event}</span>
                  <span>{item.date}</span>
                </div>
                <h4 className="font-extrabold text-gray-900 text-sm">{item.title}</h4>
                <p className="text-xs text-gray-500 line-clamp-2">{item.caption}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 6. Join / Membership Callout */}
      <section className="bg-white rounded-2xl border border-gray-200 p-8 text-center space-y-3 shadow-sm">
        <h3 className="text-xl font-bold text-gray-900">
          Interested in joining Agave Shooters?
        </h3>
        <p className="text-xs text-gray-600 max-w-md mx-auto">
          We welcome veterans and community golfers of every handicap level. Come walk the fairways with us.
        </p>
        <div className="pt-2">
          <Link
            href="/contact"
            className="inline-block px-5 py-2.5 bg-[#0f4d3a] hover:bg-[#0c3d2e] text-white text-xs font-semibold rounded-lg transition-colors"
          >
            Contact Club Leadership
          </Link>
        </div>
      </section>
    </div>
  );
}
