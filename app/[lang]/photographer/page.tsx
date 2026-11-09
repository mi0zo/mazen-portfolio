"use client";

import React, { useState } from "react";
import Link from "next/link";

interface PhotoItem {
  id: string;
  src: string;
  title: string;
  category: string;
}

export default function PhotographyPage() {
  const [selectedPhoto, setSelectedPhoto] = useState<PhotoItem | null>(null);

  const photos: PhotoItem[] = [
    { id: "01", src: "/photography/p/01.webp", title: "Geometric Ascent", category: "Architecture" },
    { id: "02", src: "/photography/p/02.webp", title: "Sonic Waves", category: "Concert" },
    { id: "03", src: "/photography/p/03.webp", title: "Forest Sanctuary", category: "Nature" },
    { id: "04", src: "/photography/p/04.webp", title: "Brutalist Shadow", category: "Architecture" },
    { id: "05", src: "/photography/p/05.webp", title: "Neon Horizon", category: "Concert" },
    { id: "06", src: "/photography/p/06.webp", title: "Solitude in Mist", category: "Nature" },
    { id: "07", src: "/photography/p/07.webp", title: "Monochrome Facade", category: "Architecture" },
    { id: "08", src: "/photography/p/08.webp", title: "Kinetic Motion", category: "Sports" },
  ];

  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-secondary selection:text-white">
      {/* Header */}
      <header className="sticky top-0 z-30 h-16 border-b border-line bg-surface/85 backdrop-blur-md px-6 md:px-12 flex items-center justify-between">
        <Link
          href="/#works"
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-line bg-surface text-xs font-semibold hover:bg-neutral transition-all"
        >
          <span>←</span>
          <span>Back to doors</span>
        </Link>
        <span className="font-bold text-sm tracking-tight text-foreground">
          Photography & Creative Tech
        </span>
        <div className="w-16" />
      </header>

      {/* Main Content */}
      <main className="max-w-[84rem] mx-auto px-6 md:px-12 py-16 md:py-24">
        {/* Intro */}
        <div className="max-w-2xl mb-16">
          <span className="text-xs font-bold uppercase tracking-widest text-secondary block mb-2">
            Visual Perspectives
          </span>
          <h1 className="text-3xl md:text-5xl font-bold tracking-tight text-foreground mb-4">
            Light, Balance & Geometry
          </h1>
          <p className="text-base md:text-lg text-muted font-normal leading-relaxed">
            Exploring the physical intersection of architectural silhouettes, organic nature, and visual balance that informs my digital design philosophy.
          </p>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {photos.map((p) => (
            <div
              key={p.id}
              onClick={() => setSelectedPhoto(p)}
              className="group relative rounded-2xl overflow-hidden border border-line bg-surface/60 aspect-[3/4] cursor-pointer shadow-md hover:shadow-2xl transition-all"
            >
              <img
                src={p.src}
                alt={p.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-5 text-white">
                <span className="text-[10px] font-mono tracking-widest uppercase text-amber-300">
                  {p.category}
                </span>
                <span className="font-semibold text-sm">{p.title}</span>
              </div>
            </div>
          ))}
        </div>
      </main>

      {/* Lightbox Modal */}
      {selectedPhoto && (
        <div
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-xl flex items-center justify-center p-6 animate-in fade-in"
          onClick={() => setSelectedPhoto(null)}
        >
          <div
            className="relative max-w-4xl max-h-[85vh] flex flex-col items-center"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setSelectedPhoto(null)}
              className="absolute -top-12 right-0 text-white font-semibold text-xs border border-white/20 px-3 py-1.5 rounded-full bg-black/60"
            >
              ✕ Close
            </button>
            <img
              src={selectedPhoto.src}
              alt={selectedPhoto.title}
              className="max-h-[75vh] w-auto rounded-xl shadow-2xl object-contain border border-white/10"
            />
            <div className="text-center mt-4 text-white">
              <span className="font-semibold text-sm block">{selectedPhoto.title}</span>
              <span className="text-xs text-white/60 font-mono uppercase tracking-widest">
                {selectedPhoto.category}
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

