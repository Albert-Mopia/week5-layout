import "./globals.css";
import Link from "next/link";
import { Imperial_Script } from "next/font/google";

const imperialScript = Imperial_Script({
  weight: "400",
  subsets: ["latin"],
});

export const metadata = {
  title: "Agave Golf Club Member Dashboard",
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
          <nav className="flex items-center space-x-8 text-sm font-light">
            <Link href="/" className="hover:text-emerald-200 transition-colors">
              Home
            </Link>
            <Link href="/players" className="hover:text-emerald-200 transition-colors">
              Players
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

        {/* Main Content Area - pt-28 prevents content from hiding behind the fixed header */}
        <main className="flex-1 max-w-6xl w-full mx-auto px-6 pt-28 pb-10">
          {children}
        </main>

        {/* Footer */}
        <footer className="bg-[#0f4d3a] text-white py-4 px-8 mt-16">
          <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
            <div className="flex flex-col items-center sm:items-start leading-tight">
              <span className={`${imperialScript.className} text-3xl tracking-wide`}>
                Agave Shooters
              </span>
              <span className="text-[11px] font-light text-emerald-100 tracking-wider -mt-1">
                Veterans Golf Association
              </span>
            </div>

            <p className="text-xs text-emerald-100/90 font-light">
              &copy; 2026 Agave Shooters. All rights reserved.
            </p>
          </div>
        </footer>
      </body>
    </html>
  );
}
