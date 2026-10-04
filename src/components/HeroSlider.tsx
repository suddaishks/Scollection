import React, { useState, useEffect } from 'react';
import { ChevronRight, ChevronLeft, ArrowRight, Sparkles, ShieldCheck, Flame, Tag, Sliders } from 'lucide-react';
import {
  HERO_BANNER_IMG,
  IMPERIAL_VALLEY_IMG,
  KHAMRAH_IMG,
  NINE_PM_IMG,
  DEHN_ATTAR_IMG,
  EMBD_TOPI_IMG,
  BESPOKE_WORKSHOP_IMG
} from '../data/images';
import { ProductCategory } from '../types';

interface HeroSliderProps {
  onExploreCategory: (category: ProductCategory) => void;
  onOpenDeals: () => void;
}

export const HeroSlider: React.FC<HeroSliderProps> = ({
  onExploreCategory,
  onOpenDeals,
}) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      id: 'slide-1',
      badge: 'OFFICIAL 2026 WHITE & GOLD COLLECTION',
      title: 'Imperial Valley, Khamrah & 9PM Rebel',
      subtitle: 'Original high-concentration French and Arabian fragrances with 24-hour longevity. Free delivery nationwide over Rs. 5,000.',
      image: HERO_BANNER_IMG,
      actionText: 'Shop All Fragrances',
      category: 'all' as ProductCategory,
      dealTag: 'BESTSELLERS IN STOCK'
    },
    {
      id: 'slide-impressions',
      badge: '1:1 BESPOKE IMPRESSIONS STUDIO',
      title: 'Custom Impressions of Any Perfume & Attar',
      subtitle: 'We craft identical 1:1 formulations of world-famous designer fragrances. Available in 15ml, 30ml, 50ml sprays or 3ml, 6ml, 12ml pure non-alcoholic attars.',
      image: BESPOKE_WORKSHOP_IMG,
      actionText: 'Order Custom Impression',
      category: 'deals' as ProductCategory,
      dealTag: 'CUSTOM SCENT BLENDING'
    },
    {
      id: 'slide-2',
      badge: 'VIRAL LUXURY PERFUMES',
      title: 'Gissah Imperial Valley & Lattafa Khamrah',
      subtitle: 'Crisp Italian bergamot, leather, ambergris, and warm spiced cinnamon dates housed in heavy crystal flacons.',
      image: IMPERIAL_VALLEY_IMG || KHAMRAH_IMG,
      actionText: 'Explore Perfumes',
      category: 'perfume' as ProductCategory,
      dealTag: '50 ML EAU DE PARFUM'
    },
    {
      id: 'slide-3',
      badge: '100% NON-ALCOHOLIC CONCENTRATED ATTAR',
      title: 'Aged Dehn Al Oud & Velvet White Musk',
      subtitle: 'Spiritual, dense and long-lasting artisanal perfume oils distilled traditionally for daily prayer, Jummah and weddings.',
      image: DEHN_ATTAR_IMG,
      actionText: 'Explore Pure Attars',
      category: 'attar' as ProductCategory,
      dealTag: 'PURE OIL EXTRACT'
    },
    {
      id: 'slide-4',
      badge: 'HERITAGE ARTISAN WORK',
      title: 'Royal Omani Embroidered & Afghan Caps',
      subtitle: 'Handmade velvet prayer caps with delicate gold zari threadwork and Afghan Astrakhan Qaraquli designs.',
      image: EMBD_TOPI_IMG,
      actionText: 'View Prayer Caps',
      category: 'topi' as ProductCategory,
      dealTag: 'HANDMADE CRAFT'
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [slides.length]);

  const slide = slides[currentSlide];

  return (
    <div className="relative bg-[#faf7f2] border-b border-[#e8dec8] overflow-hidden">
      
      {/* Background Graphic Accents */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#d4af37]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-[#b8860b]/8 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Left Content Column */}
          <div className="lg:col-span-7 space-y-6 z-10 text-left">
            
            {/* Top Badges */}
            <div className="flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-[#faf2dd] text-[#996515] border border-[#d4af37]/40 shadow-xs">
                <Sparkles className="w-3.5 h-3.5 text-[#b8860b]" />
                <span>{slide.badge}</span>
              </span>

              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-[#1a1612] text-[#f7e7ce]">
                <Tag className="w-3 h-3 text-[#d4af37]" />
                <span>{slide.dealTag}</span>
              </span>
            </div>

            {/* Main Headline */}
            <h2 className="text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-[#1a1612] font-display leading-[1.15]">
              {slide.title}
            </h2>

            {/* Subtitle / Description */}
            <p className="text-base sm:text-lg text-[#5a5246] max-w-2xl leading-relaxed">
              {slide.subtitle}
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button
                onClick={() => onExploreCategory(slide.category)}
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-gradient-to-r from-[#d4af37] via-[#e6c352] to-[#c59b27] text-[#1a1612] font-bold text-sm hover:brightness-105 transition-all shadow-md hover:shadow-lg active:scale-95 cursor-pointer"
              >
                <span>{slide.actionText}</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={() => {
                  const el = document.getElementById('custom-impressions');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                  else onOpenDeals();
                }}
                className="inline-flex items-center gap-2 px-5 py-3.5 rounded-xl bg-white text-[#1a1612] border border-[#dcd2be] font-bold text-sm hover:bg-[#fbf9f5] hover:border-[#b8860b] transition-all cursor-pointer shadow-xs"
              >
                <Sliders className="w-4 h-4 text-[#b8860b]" />
                <span>Custom Impressions Studio</span>
              </button>
            </div>

            {/* Trust Markers */}
            <div className="grid grid-cols-3 gap-2 pt-4 border-t border-[#e8dec8] max-w-lg">
              <div className="flex items-center gap-2 text-xs text-[#52493d]">
                <ShieldCheck className="w-4 h-4 text-[#b8860b] shrink-0" />
                <span>100% Authentic</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-[#52493d]">
                <Sparkles className="w-4 h-4 text-[#b8860b] shrink-0" />
                <span>24-Hour Longevity</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-[#52493d]">
                <Tag className="w-4 h-4 text-[#b8860b] shrink-0" />
                <span>Cash on Delivery</span>
              </div>
            </div>

          </div>

          {/* Right Image Showcase Column */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              
              {/* Decorative Frame */}
              <div className="absolute -inset-2 rounded-2xl bg-gradient-to-br from-[#d4af37]/40 via-amber-200/20 to-transparent blur-sm" />
              
              {/* Product Card Container */}
              <div className="relative rounded-2xl overflow-hidden bg-white border border-[#e8dec8] shadow-xl">
                <div className="aspect-[4/3] sm:aspect-square relative overflow-hidden bg-[#faf8f5]">
                  <img
                    src={slide.image}
                    alt={slide.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover object-center transform hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />
                  
                  {/* Floating badge over image */}
                  <div className="absolute bottom-3 left-3 bg-white/95 backdrop-blur-md px-3 py-1.5 rounded-lg border border-[#e8dec8] text-xs font-bold text-[#1a1612] shadow-sm flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                    <span>In Stock & Ready for Dispatch</span>
                  </div>
                </div>
              </div>

              {/* Slider Controls */}
              <div className="flex items-center justify-between mt-4">
                <div className="flex items-center gap-1.5">
                  {slides.map((_, idx) => (
                    <button
                      key={idx}
                      onClick={() => setCurrentSlide(idx)}
                      className={`h-2 rounded-full transition-all cursor-pointer ${
                        currentSlide === idx ? 'w-8 bg-[#c59b27]' : 'w-2 bg-[#dcd2be]'
                      }`}
                      aria-label={`Slide ${idx + 1}`}
                    />
                  ))}
                </div>

                <div className="flex items-center gap-1">
                  <button
                    onClick={() => setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1))}
                    className="p-2 rounded-lg bg-white border border-[#e8dec8] text-[#5a5246] hover:text-[#1a1612] hover:border-[#c59b27] transition-colors cursor-pointer"
                    aria-label="Previous slide"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => setCurrentSlide((prev) => (prev + 1) % slides.length)}
                    className="p-2 rounded-lg bg-white border border-[#e8dec8] text-[#5a5246] hover:text-[#1a1612] hover:border-[#c59b27] transition-colors cursor-pointer"
                    aria-label="Next slide"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </div>
  );
};
