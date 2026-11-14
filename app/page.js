import { members } from "@/data/members";
import MemberCard from "@/components/MemberCard";

export default function DashboardPage() {
  return (
    <section className="flex flex-col items-center">
      {/* Title & Subheadings */}
      <div className="text-center mb-10 max-w-2xl">
        <h1 className="text-3xl font-extrabold text-gray-950 tracking-tight sm:text-4xl">
          Agave Golf Club Member Dashboard
        </h1>
        <p className="mt-3 text-xs sm:text-sm text-gray-700 font-medium">
          Military Veterans Golf Association Tournament Management Platform
        </p>
        <p className="mt-4 text-base font-bold text-gray-900 tracking-wide">
          Track, Complete, Connect
        </p>
      </div>

      {/* 3-Column Responsive Grid with .map() */}
      <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {members.map((member) => (
          <MemberCard
            key={member.id}
            name={member.name}
            flight={member.flight}
            handicap={member.handicap}
          />
        ))}
      </div>
    </section>
  );
}
