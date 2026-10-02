import React, { useState, useEffect } from 'react';
import { ChevronRight, ChevronLeft, ArrowRight, ArrowLeft, Sparkles, ShieldCheck, Flame } from 'lucide-react';
import { HERO_BANNER_IMG, OUD_PERFUME_IMG, DEHN_ATTAR_IMG, EMBD_TOPI_IMG } from '../data/products';
import { ProductCategory } from '../types';

interface HeroSliderProps {
  onExploreCategory: (category: ProductCategory) => void;
  onOpenDeals: () => void;
  lang: 'ur' | 'en';
}

export const HeroSlider: React.FC<HeroSliderProps> = ({
  onExploreCategory,
  onOpenDeals,
  lang
}) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      id: 'slide-1',
      badgeUr: 'خصوصی شاہی کلیکشن 2026',
      badgeEn: 'Royal Fragrance Collection 2026',
      titleUr: 'پرفیومز، خالص عطر اور شاہی دستکاری ٹوپیاں',
      titleEn: 'French Perfumes, Pure Attar & Handcrafted Caps',
      subtitleUr: 'اصلی کمبوڈین عود، کستوری اور الکحل سے پاک خالص سنتی عطر، زری والی مخمل ٹوپیوں کے ساتھ',
      subtitleEn: 'Authentic Cambodian Oud, musk oils, and gold-embroidered velvet caps delivered across Pakistan.',
      image: HERO_BANNER_IMG,
      actionTextUr: 'تمام کلیکشن دیکھیں',
      actionTextEn: 'Explore Collection',
      category: 'all' as ProductCategory,
      dealTagUr: '20٪ تک بچت',
      dealTagEn: 'Up to 20% OFF'
    },
    {
      id: 'slide-2',
      badgeUr: 'فلیگ شپ پرفیومز',
      badgeEn: 'French & Oriental Blends',
      titleUr: 'شاہی عود رائل - 24 گھنٹے دیرپا مہک',
      titleEn: 'Oud Royale EDP - 24hr Projection',
      subtitleUr: 'زعفران، دمشقی گلاب اور عنبر کی پرشکوہ آمیزش جو آپ کی شخصیت کو شاہانہ بنا دے',
      subtitleEn: 'Kashmiri saffron, aged Cambodian agarwood, and ambergris crafted for true connoisseurs.',
      image: OUD_PERFUME_IMG,
      actionTextUr: 'پرفیومز دیکھیں',
      actionTextEn: 'View Perfumes',
      category: 'perfume' as ProductCategory,
      dealTagUr: 'بیسٹ سیلر',
      dealTagEn: 'Bestseller'
    },
    {
      id: 'slide-3',
      badgeUr: '100٪ خالص و الکحل سے پاک',
      badgeEn: '100% Non-Alcoholic Oil',
      titleUr: 'خالص دہن العود اور کستوری عطر',
      titleEn: 'Aged Assamese Dehn Al Oud & Musk Attar',
      subtitleUr: 'عبادت، نماز اور جمعہ کے لیے روایتی طریقہ پر کشید کردہ پاکیزہ عطر',
      subtitleEn: 'Thick, spiritual, and long-lasting non-alcoholic artisanal perfume oils for prayer and reflection.',
      image: DEHN_ATTAR_IMG,
      actionTextUr: 'خالص عطر دیکھیں',
      actionTextEn: 'Explore Attar',
      category: 'attar' as ProductCategory,
      dealTagUr: 'سنّتِ نبویﷺ',
      dealTagEn: 'Sunnah Tradition'
    },
    {
      id: 'slide-4',
      badgeUr: 'دستکاری ٹوپیاں اور گفٹ بنڈل',
      badgeEn: 'Handmade Caps & Gift Sets',
      titleUr: 'شاہی عمانی کڑھائی اور ترک فیز ٹوپیاں',
      titleEn: 'Omani Embroidered Velvet & Turkish Fez',
      subtitleUr: 'خالص مخمل، باریک زری کڑھائی اور ہر سائز میں سر کے لیے بہترین و آرام دہ فٹنگ',
      subtitleEn: 'Premium velvet prayer caps with needlework zari embroidery and authentic Ottoman felt caps.',
      image: EMBD_TOPI_IMG,
      actionTextUr: 'ٹوپیاں دیکھیں',
      actionTextEn: 'Explore Caps',
      category: 'topi' as ProductCategory,
      dealTagUr: 'خصوصی ڈیل باکس',
      dealTagEn: 'Special Bundle Deal'
    }
  ];

  // Auto advance slides every 6 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [slides.length]);

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const slide = slides[currentSlide];

  return (
    <section className="relative overflow-hidden bg-[#0f1115] border-b border-[#222632]">
      {/* Background slide frame */}
      <div className="relative min-h-[480px] sm:min-h-[560px] lg:min-h-[620px] flex items-center">
        {/* Backdrop image with measured luxury contrast scrim */}
        <div className="absolute inset-0">
          <img
            src={slide.image}
            alt={slide.titleEn}
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover object-center transition-all duration-1000 scale-105"
          />
          {/* Multi-layer gradient scrim ensuring text legibility */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#0f1115] via-[#0f1115]/85 to-[#0f1115]/50" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0f1115] via-transparent to-[#0f1115]/30" />
        </div>

        {/* Content Container */}
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24 z-10 w-full">
          <div className="max-w-2xl">
            
            {/* Slide Badge / Tag */}
            <div className="flex items-center gap-2 mb-4">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-[#d4af37]/20 text-[#f5d77f] border border-[#d4af37]/35">
                <Sparkles className="w-3.5 h-3.5" />
                {lang === 'ur' ? slide.badgeUr : slide.badgeEn}
              </span>
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                <Flame className="w-3.5 h-3.5 text-emerald-400" />
                {lang === 'ur' ? slide.dealTagUr : slide.dealTagEn}
              </span>
            </div>

            {/* Main Headline */}
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[#f4efe6] font-display mb-4 leading-tight">
              {lang === 'ur' ? slide.titleUr : slide.titleEn}
            </h1>

            {/* Subtitle */}
            <p className="text-base sm:text-lg text-[#cdc7b9] mb-8 leading-relaxed font-body">
              {lang === 'ur' ? slide.subtitleUr : slide.subtitleEn}
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-3">
              <button
                onClick={() => {
                  onExploreCategory(slide.category);
                  const el = document.getElementById('catalog-section');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }}
                className="flex items-center gap-2 px-6 py-3 bg-[#d4af37] hover:bg-[#e6c352] text-[#0f1115] font-semibold rounded-lg shadow-lg hover:shadow-[#d4af37]/20 transition-all cursor-pointer group"
              >
                <span>{lang === 'ur' ? slide.actionTextUr : slide.actionTextEn}</span>
                {lang === 'ur' ? (
                  <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                ) : (
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                )}
              </button>

              <button
                onClick={onOpenDeals}
                className="flex items-center gap-2 px-5 py-3 bg-[#1c202a] hover:bg-[#282d3b] text-[#f4efe6] font-medium rounded-lg border border-[#333a4d] transition-colors cursor-pointer"
              >
                <span>{lang === 'ur' ? 'آفرز و ڈیلز دیکھیں' : 'View Deals & Offers'}</span>
              </button>
            </div>

            {/* Trust highlights */}
            <div className="mt-10 pt-6 border-t border-[#2a2f3d]/60 flex flex-wrap items-center gap-6 text-xs text-[#a8a192]">
              <div className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-[#d4af37]" />
                <span>{lang === 'ur' ? '100٪ خالص اور اصلی' : '100% Guaranteed Authentic'}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                <span>{lang === 'ur' ? 'کیش آن ڈیلیوری و ایزی پیسہ' : 'COD & Easypaisa Accepted'}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#d4af37]" />
                <span>{lang === 'ur' ? 'تیز ترسیل بذریعہ رائیڈر' : 'Rider Home Delivery'}</span>
              </div>
            </div>

          </div>
        </div>

        {/* Carousel Prev/Next Navigation Controls */}
        <button
          onClick={prevSlide}
          className="absolute left-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-[#0f1115]/70 hover:bg-[#1a1d24] text-[#f4efe6] border border-[#2b303d] backdrop-blur-sm transition-all z-20 cursor-pointer shadow-md"
          aria-label="Previous slide"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>

        <button
          onClick={nextSlide}
          className="absolute right-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-[#0f1115]/70 hover:bg-[#1a1d24] text-[#f4efe6] border border-[#2b303d] backdrop-blur-sm transition-all z-20 cursor-pointer shadow-md"
          aria-label="Next slide"
        >
          <ChevronRight className="w-5 h-5" />
        </button>

        {/* Slide Indicators */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-2 z-20">
          {slides.map((s, idx) => (
            <button
              key={s.id}
              onClick={() => setCurrentSlide(idx)}
              className={`h-2 rounded-full transition-all cursor-pointer ${
                idx === currentSlide ? 'w-8 bg-[#d4af37]' : 'w-2 bg-[#444a5b] hover:bg-[#6b7280]'
              }`}
              aria-label={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
