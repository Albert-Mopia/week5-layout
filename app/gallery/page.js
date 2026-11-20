"use client";

import { useState } from "react";
import { mediaItems } from "@/data/media";

export default function GalleryPage() {
  const [filter, setFilter] = useState("all");
  const [activePhoto, setActivePhoto] = useState(null);

  const filteredMedia = mediaItems.filter((item) => {
    if (filter === "all") return true;
    return item.type === filter;
  });

  return (
    <div className="max-w-6xl mx-auto space-y-8 pb-12">
      {/* Header */}
      <div className="bg-white p-6 sm:p-8 rounded-2xl border border-gray-200 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-emerald-800 bg-emerald-100 px-2.5 py-1 rounded-full">
            Club Highlights
          </span>
          <h1 className="text-3xl font-extrabold text-gray-950 mt-2">
            Tournament Media Gallery
          </h1>
          <p className="text-sm text-gray-600 mt-1">
            Photos, swing clips, and championship memories from our tournament rounds.
          </p>
        </div>

        {/* Filter Pills */}
        <div className="flex bg-gray-100 p-1 rounded-xl self-start sm:self-center">
          {["all", "photo", "video"].map((type) => (
            <button
              key={type}
              onClick={() => setFilter(type)}
              className={`px-4 py-1.5 rounded-lg text-xs font-bold capitalize transition-all cursor-pointer ${
                filter === type
                  ? "bg-[#0f4d3a] text-white shadow-sm"
                  : "text-gray-600 hover:text-gray-900"
              }`}
            >
              {type === "all" ? "All Media" : `${type}s`}
            </button>
          ))}
        </div>
      </div>

      {/* Media Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredMedia.map((item) => (
          <div
            key={item.id}
            className="bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-sm hover:shadow-md transition-all flex flex-col justify-between"
          >
            {/* Visual Container */}
            {item.type === "video" ? (
              <div className="aspect-video w-full bg-black relative">
                <iframe
                  src={`https://www.youtube-nocookie.com/embed/${item.youtubeId}`}
                  title={item.title}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="w-full h-full border-0"
                />
              </div>
            ) : (
              <div
                onClick={() => setActivePhoto(item)}
                className="aspect-video w-full overflow-hidden relative cursor-pointer group bg-gray-100"
              >
                <img
                  src={item.url}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white text-xs font-bold">
                  🔍 Click to Enlarge
                </div>
              </div>
            )}

            {/* Content Details */}
            <div className="p-4 space-y-2">
              <div className="flex items-center justify-between text-[11px] text-gray-500 font-semibold">
                <span className="text-[#0f4d3a] uppercase tracking-wide">
                  {item.event}
                </span>
                <span>{item.date}</span>
              </div>
              <h3 className="font-extrabold text-gray-900 text-base">{item.title}</h3>
              <p className="text-xs text-gray-600 line-clamp-2">{item.caption}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Lightbox Modal for Full Screen Photos */}
      {activePhoto && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4"
          onClick={() => setActivePhoto(null)}
        >
          <div
            className="bg-white max-w-3xl w-full rounded-2xl overflow-hidden shadow-2xl relative"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setActivePhoto(null)}
              className="absolute top-4 right-4 z-10 w-9 h-9 rounded-full bg-black/60 text-white flex items-center justify-center text-xl font-bold hover:bg-black transition cursor-pointer"
            >
              ×
            </button>
            <img
              src={activePhoto.url}
              alt={activePhoto.title}
              className="w-full max-h-[70vh] object-contain bg-black"
            />
            <div className="p-5">
              <div className="flex justify-between items-center text-xs text-gray-500 font-semibold">
                <span className="text-[#0f4d3a] font-bold">{activePhoto.event}</span>
                <span>{activePhoto.date}</span>
              </div>
              <h2 className="text-xl font-extrabold text-gray-900 mt-1">
                {activePhoto.title}
              </h2>
              <p className="text-sm text-gray-600 mt-1">{activePhoto.caption}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
