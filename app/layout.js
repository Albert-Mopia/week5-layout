import "./globals.css";
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
        {/* Navigation Bar */}
        <header className="bg-[#0f4d3a] text-white px-8 py-4 shadow-sm">
          <div className="max-w-6xl mx-auto flex items-center justify-between">
            <span className={`${imperialScript.className} text-4xl tracking-wider`}>
              Agave Shooters
            </span>
            <nav className="flex space-x-8 text-sm font-light">
              <a href="#" className="hover:text-emerald-200 transition-colors">Home</a>
              <a href="#" className="hover:text-emerald-200 transition-colors">Players</a>
              <a href="#" className="hover:text-emerald-200 transition-colors">About</a>
              <a href="#" className="hover:text-emerald-200 transition-colors">Contact</a>
            </nav>
          </div>
        </header>

        {/* Main Content Area */}
        <main className="flex-1 max-w-6xl w-full mx-auto px-6 py-10">
          {children}
        </main>

        {/* Footer Matching Your Figma Design */}
        <footer className="bg-[#0f4d3a] text-white py-4 px-8 mt-16">
          <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
            {/* Left: Script Logo + Subtitle */}
            <div className="flex flex-col items-center sm:items-start leading-tight">
              <span className={`${imperialScript.className} text-3xl tracking-wide`}>
                Agave Shooters
              </span>
              <span className="text-[11px] font-light text-emerald-100 tracking-wider -mt-1">
                Veterans Golf Association
              </span>
            </div>

            {/* Right: Copyright */}
            <p className="text-xs text-emerald-100/90 font-light">
              &copy; 2026 Agave Shooters. All rights reserved.
            </p>
          </div>
        </footer>
      </body>
    </html>
  );
}
