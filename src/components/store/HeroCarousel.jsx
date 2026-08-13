import React, { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, Sparkles, ArrowRight, ShieldAlert } from "lucide-react";

export default function HeroCarousel({ banners = [] }) {
  const activeBanners = banners
    .filter((b) => b.active)
    .sort((a, b) => (a.displayOrder || 0) - (b.displayOrder || 0));

  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (activeBanners.length <= 1) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % activeBanners.length);
    }, 6000);
    return () => clearInterval(interval);
  }, [activeBanners.length]);

  if (!activeBanners || activeBanners.length === 0) {
    return (
      <div className="relative w-full h-[400px] bg-zinc-900 flex items-center justify-center text-zinc-500 text-sm">
        Nenhum banner ativo cadastrado no painel admin.
      </div>
    );
  }

  const currentBanner = activeBanners[currentIndex] || activeBanners[0];

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % activeBanners.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + activeBanners.length) % activeBanners.length);
  };

  return (
    <div className="relative w-full overflow-hidden bg-zinc-950 border-b border-zinc-800/80">
      
      {/* Banner Container */}
      <div className="relative min-h-[480px] sm:min-h-[560px] lg:min-h-[620px] flex items-center">
        
        {/* Background Image with Dark Vignette Gradient */}
        <div className="absolute inset-0 z-0">
          <img
            src={currentBanner.imageUrl}
            alt={currentBanner.title}
            className="w-full h-full object-cover object-center filter brightness-[0.45] contrast-125 transition-all duration-700 ease-out transform scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/60 to-transparent"></div>
          <div className="absolute inset-0 bg-gradient-to-r from-zinc-950 via-zinc-950/70 to-transparent"></div>
        </div>

        {/* Content Box */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full py-16 sm:py-24">
          <div className="max-w-2xl space-y-5 animate-in fade-in slide-in-from-left duration-500">
            
            {/* Dynamic Badge */}
            {currentBanner.badge && (
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/20 border border-amber-500/40 text-amber-400 text-xs font-black tracking-widest uppercase backdrop-blur-md shadow-lg shadow-amber-500/10">
                <Sparkles className="w-3.5 h-3.5 fill-current" />
                <span>{currentBanner.badge}</span>
              </div>
            )}

            {/* Title */}
            <h1 className="font-heading text-4xl sm:text-6xl lg:text-7xl font-extrabold text-white tracking-tight leading-[1.05]">
              {currentBanner.title.split(" ").map((word, idx) => {
                if (word.toUpperCase() === "GOLD" || word.toUpperCase() === "MS" || word.toUpperCase() === "DROP" || word.toUpperCase() === "15%" || word.toUpperCase() === "OVERSIZED") {
                  return (
                    <span key={idx} className="text-gold-gradient">
                      {word}{" "}
                    </span>
                  );
                }
                return word + " ";
              })}
            </h1>

            {/* Subtitle */}
            <p className="text-sm sm:text-base text-zinc-300 font-medium leading-relaxed max-w-xl">
              {currentBanner.subtitle}
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-wrap items-center gap-4 pt-4">
              <a
                href={currentBanner.ctaLink || "#produtos"}
                className="px-7 py-3.5 rounded-xl bg-gold-gradient hover:opacity-95 text-zinc-950 font-black text-sm uppercase tracking-wider flex items-center gap-2.5 shadow-xl shadow-amber-500/20 transition-all transform hover:-translate-y-0.5"
              >
                <span>{currentBanner.ctaText || "GARANTIR MEU LOOK"}</span>
                <ArrowRight className="w-4 h-4" />
              </a>

              <a
                href="#produtos"
                className="px-6 py-3.5 rounded-xl bg-zinc-900/80 hover:bg-zinc-800 border border-zinc-700 text-zinc-200 font-bold text-sm transition-all"
              >
                Ver Lançamentos
              </a>
            </div>

          </div>
        </div>

      </div>

      {/* Navigation Arrows */}
      {activeBanners.length > 1 && (
        <>
          <button
            onClick={handlePrev}
            className="absolute left-4 top-1/2 -translate-y-1/2 z-20 p-3 rounded-full bg-zinc-900/80 border border-zinc-800 text-zinc-300 hover:text-amber-400 hover:border-amber-500/50 transition-all focus:outline-none backdrop-blur-md"
            aria-label="Banner anterior"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          <button
            onClick={handleNext}
            className="absolute right-4 top-1/2 -translate-y-1/2 z-20 p-3 rounded-full bg-zinc-900/80 border border-zinc-800 text-zinc-300 hover:text-amber-400 hover:border-amber-500/50 transition-all focus:outline-none backdrop-blur-md"
            aria-label="Próximo banner"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          {/* Dots Indicator */}
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex items-center gap-2">
            {activeBanners.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentIndex(idx)}
                className={`h-2 rounded-full transition-all ${
                  idx === currentIndex
                    ? "w-8 bg-amber-400 shadow-md shadow-amber-400/50"
                    : "w-2 bg-zinc-700 hover:bg-zinc-500"
                }`}
              />
            ))}
          </div>
        </>
      )}

    </div>
  );
}
