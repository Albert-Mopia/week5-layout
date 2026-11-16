import { members } from "@/data/members";
import MemberCard from "@/components/MemberCard";
import Link from "next/link";

export default function Home() {
  // Grab the top 3 members as featured flight leaders
  const featuredLeaders = members.slice(0, 3);

  return (
    <div className="space-y-12">
      {/* 1. Hero Section */}
      <section className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-[#0f4d3a] to-[#18684f] text-white p-8 sm:p-12 shadow-md">
        <div className="max-w-2xl space-y-4">
          <span className="inline-block text-xs uppercase tracking-widest font-semibold px-3 py-1 bg-emerald-500/20 text-emerald-200 rounded-full border border-emerald-400/30">
            Veterans Golf Association • Branch 12
          </span>
          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight leading-tight">
            Fairways, Flight Play & Veteran Camaraderie.
          </h1>
          <p className="text-emerald-100/90 text-sm sm:text-base leading-relaxed">
            Welcome to the official portal for the Agave Shooters. We bring military veterans together for competitive weekend rounds, flight championships, and community.
          </p>
          <div className="pt-2 flex flex-wrap gap-3">
            <Link
              href="/players"
              className="px-5 py-2.5 bg-white text-[#0f4d3a] hover:bg-emerald-50 text-xs font-bold rounded-lg transition-colors shadow-sm"
            >
              View Full Player Directory →
            </Link>
            <Link
              href="/contact"
              className="px-5 py-2.5 bg-emerald-700/60 hover:bg-emerald-700/90 text-white text-xs font-semibold rounded-lg border border-emerald-400/30 transition-colors"
            >
              Sign Up for Next Match
            </Link>
          </div>
        </div>
      </section>

      {/* 2. Next Scheduled Tournament Announcement */}
      <section className="bg-emerald-50 border border-emerald-200 rounded-xl p-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
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
          className="whitespace-nowrap px-4 py-2 bg-[#0f4d3a] text-white text-xs font-semibold rounded-md hover:bg-[#0c3d2e] transition-colors"
        >
          Confirm Your Tee Time
        </Link>
      </section>

      {/* 3. Quick Club Stats */}
      <section className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm text-center">
          <p className="text-xs text-gray-500 font-medium uppercase tracking-wider">Active Roster</p>
          <p className="text-3xl font-extrabold text-[#0f4d3a] mt-1">{members.length}</p>
        </div>
        <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm text-center">
          <p className="text-xs text-gray-500 font-medium uppercase tracking-wider">Flight Brackets</p>
          <p className="text-3xl font-extrabold text-[#0f4d3a] mt-1">3</p>
        </div>
        <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm text-center">
          <p className="text-xs text-gray-500 font-medium uppercase tracking-wider">Tee Time</p>
          <p className="text-xl font-extrabold text-gray-900 mt-1">07:30 AM</p>
        </div>
        <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm text-center">
          <p className="text-xs text-gray-500 font-medium uppercase tracking-wider">Avg Index</p>
          <p className="text-3xl font-extrabold text-[#0f4d3a] mt-1">11.8</p>
        </div>
      </section>

      {/* 4. Flight Spotlight Preview (Just 3 cards) */}
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
            />
          ))}
        </div>
      </section>

      {/* 5. Join / Membership Callout */}
      <section className="bg-white rounded-xl border border-gray-200 p-8 text-center space-y-3">
        <h3 className="text-xl font-bold text-gray-900">
          Interested in joining Agave Shooters?
        </h3>
        <p className="text-xs text-gray-600 max-w-md mx-auto">
          We welcome veterans and community golfers of every handicap level. Come walk the fairways with us.
        </p>
        <div className="pt-2">
          <Link
            href="/contact"
            className="inline-block px-5 py-2.5 bg-[#0f4d3a] hover:bg-[#0c3d2e] text-white text-xs font-semibold rounded-md transition-colors"
          >
            Contact Club Leadership
          </Link>
        </div>
      </section>
    </div>
  );
}
