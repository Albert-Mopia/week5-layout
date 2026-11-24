import HandicapInfoFooter from "@/components/HandicapInfoFooter";
import "./globals.css";
import Link from "next/link";
import { Imperial_Script } from "next/font/google";

const imperialScript = Imperial_Script({
  weight: "400",
  subsets: ["latin"],
});

export const metadata = {
  title: "Agave Shooters Golf Club | San Diego, CA",
  description: "Military Veterans Golf Association Tournament Management Platform",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="min-h-screen flex flex-col bg-[#f4f7f4] text-gray-900 antialiased">
        {/* Navigation Bar - Fixed to the top */}
        <header className="fixed top-0 left-0 right-0 z-50 bg-[#0f4d3a] text-white px-8 py-4 shadow-md">
          <div className="max-w-6xl mx-auto flex items-center justify-between">
            {/* Logo links back to home */}
            <Link
              href="/"
              className={`${imperialScript.className} text-4xl tracking-wider hover:opacity-90 transition-opacity`}
            >
              Agave Shooters
            </Link>

            {/* Working Navigation Links */}
            <nav className="flex items-center space-x-6 sm:space-x-8 text-sm font-light">
              <Link href="/" className="hover:text-emerald-200 transition-colors">
                Home
              </Link>
              <Link href="/players" className="hover:text-emerald-200 transition-colors">
                Players
              </Link>
              <Link href="/gallery" className="hover:text-emerald-200 transition-colors">
                Gallery
              </Link>
              <Link href="/about" className="hover:text-emerald-200 transition-colors">
                About
              </Link>
              <Link href="/contact" className="hover:text-emerald-200 transition-colors">
                Contact
              </Link>

              {/* Far Right Button Style */}
              <Link
                href="/calculator"
                className="bg-emerald-500 hover:bg-emerald-400 text-white font-bold text-xs px-4 py-2 rounded-full transition-all shadow-sm hover:shadow"
              >
                Calculator
              </Link>
            </nav>
          </div>
        </header>

        {/* Main Content Area */}
        <main className="flex-1 max-w-6xl w-full mx-auto px-6 pt-28 pb-10">
          {children}
        </main>

        {/* Enhanced Club Footer with Official Golf Resources */}
        <footer className="bg-[#0f4d3a] text-white pt-10 pb-6 px-8 mt-16 border-t-4 border-emerald-600">
          <div className="max-w-6xl mx-auto space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pb-6 border-b border-emerald-800/60">
              
              {/* 1. Club Identity */}
              <div className="flex flex-col items-start leading-tight space-y-2">
                <span className={`${imperialScript.className} text-4xl tracking-wide`}>
                  Agave Shooters
                </span>
                <span className="text-xs font-medium text-emerald-200 uppercase tracking-widest">
                  Veterans Golf Association • San Diego, CA
                </span>
                <p className="text-xs text-emerald-100/80 font-light leading-relaxed pt-1">
                  Dedicated to veteran brotherhood, competitive flight play, and the timeless integrity of the game.
                </p>
              </div>

              {/* 2. Official USGA & Handicap Links */}
              <div className="space-y-3">
                <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-300">
                  Official Golf Portals
                </h4>
                <ul className="space-y-2 text-xs font-light">
                  <li>
                    <a
                      href="https://www.ghin.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-emerald-300 text-emerald-50 flex items-center gap-1.5 transition-colors"
                    >
                      <span>📱</span> GHIN Portal (Post Score / Lookup) ↗
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://www.usga.org/rules-hub.html"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-emerald-300 text-emerald-50 flex items-center gap-1.5 transition-colors"
                    >
                      <span>📖</span> Official USGA Rules of Golf ↗
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://www.scga.org"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-emerald-300 text-emerald-50 flex items-center gap-1.5 transition-colors"
                    >
                      <span>🏆</span> SCGA (Southern California Golf Assoc.) ↗
                    </a>
                  </li>
                  {/* ⛳ Clickable Handicap Explainer Modal */}
                  <li>
                    <HandicapInfoFooter />
                  </li>
                </ul>
              </div>

              {/* 3. Club Quick Links */}
              <div className="space-y-3">
                <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-300">
                  Quick Navigation
                </h4>
                <div className="flex flex-col space-y-1.5 text-xs font-light text-emerald-50">
                  <Link href="/players" className="hover:text-emerald-300 transition-colors">
                    Flight Player Directory →
                  </Link>
                  <Link href="/gallery" className="hover:text-emerald-300 transition-colors">
                    Tournament Photo & Video Gallery →
                  </Link>
                  <Link href="/calculator" className="hover:text-emerald-300 transition-colors">
                    Course Handicap Calculator →
                  </Link>
                  <Link href="/contact" className="hover:text-emerald-300 transition-colors">
                    Confirm Tee Time & Contact Officers →
                  </Link>
                </div>
              </div>

            </div>

            {/* Bottom Copyright & Compliance Line */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-2 text-[11px] text-emerald-200/70 font-light">
              <p>&copy; 2026 Agave Shooters. All rights reserved.</p>
              <p>Handicap calculations comply with USGA / WHS guidelines.</p>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
