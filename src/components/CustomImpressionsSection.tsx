import React, { useState } from 'react';
import {
  Sparkles,
  ChevronLeft,
  ChevronRight,
  Flame,
  Droplet,
  Send,
  CheckCircle,
  HelpCircle,
  Sliders,
  Award,
  Zap,
  ShoppingBag
} from 'lucide-react';
import {
  BESPOKE_WORKSHOP_IMG,
  IMPERIAL_VALLEY_IMG,
  KHAMRAH_IMG,
  NINE_PM_IMG,
  ASAD_IMG,
  OUD_PERFUME_IMG,
  DEHN_ATTAR_IMG,
  WHITE_MUSK_IMG,
  BLUE_PERFUME_IMG
} from '../data/images';
import { Product } from '../types';

interface ImpressionItem {
  id: string;
  name: string;
  originalBrand: string;
  family: string;
  description: string;
  image: string;
  perfumePrice: string;
  attarPrice: string;
  badge?: string;
  keyNotes: string[];
}

const TOP_IMPRESSIONS: ImpressionItem[] = [
  {
    id: 'imp-imperial-valley',
    name: 'Imperial Valley (1:1 Luxury Impression)',
    originalBrand: 'Inspired by Gissah Imperial Valley',
    family: 'Leather, Fresh Spicy & Warm Amber',
    description: 'Our #1 best-selling impression. Crisp Italian bergamot, aromatic davana, and smoky leather with royal ambergris longevity.',
    image: IMPERIAL_VALLEY_IMG,
    perfumePrice: 'From Rs. 1,200 (15ml / 30ml / 50ml)',
    attarPrice: 'From Rs. 450 (3ml / 6ml / 12ml)',
    badge: 'MOST IN-DEMAND',
    keyNotes: ['Bergamot', 'White Leather', 'Ambergris']
  },
  {
    id: 'imp-khamrah',
    name: 'Khamrah Boozy Amber (1:1 Impression)',
    originalBrand: 'Inspired by Lattafa Khamrah / Angels Share',
    family: 'Sweet Cognac, Cinnamon & Tonka Vanilla',
    description: 'An irresistible warm gourmand blend of praline, nutmeg, and aged oak barrels. Enormous scent trail and 24+ hour longevity.',
    image: KHAMRAH_IMG,
    perfumePrice: 'From Rs. 1,200 (15ml / 30ml / 50ml)',
    attarPrice: 'From Rs. 450 (3ml / 6ml / 12ml)',
    badge: 'VIRAL MASTERPIECE',
    keyNotes: ['Cognac & Dates', 'Cinnamon Spice', 'Tonka Vanilla']
  },
  {
    id: 'imp-nine-pm',
    name: '9 PM Rebel (1:1 Impression)',
    originalBrand: 'Inspired by Afnan 9 PM / Ultra Male',
    family: 'Fresh Apple, Lavender & Sweet Vanilla',
    description: 'The king of evening compliments. Juicy green apple, wild lavender, and seductive amber vanilla with supreme projection.',
    image: NINE_PM_IMG,
    perfumePrice: 'From Rs. 1,200 (15ml / 30ml / 50ml)',
    attarPrice: 'From Rs. 450 (3ml / 6ml / 12ml)',
    badge: 'COMPLIMENT MAGNET',
    keyNotes: ['Wild Apple', 'French Lavender', 'Warm Amber']
  },
  {
    id: 'imp-lattafa-asad',
    name: 'Asad Black (1:1 Impression)',
    originalBrand: 'Inspired by Lattafa Asad / Sauvage Elixir',
    family: 'Black Pepper, Coffee & Rich Tobacco Wood',
    description: 'Deep, masculine, and sophisticated. Roasted espresso, cracked black pepper, dry amber, and rich vanilla wood.',
    image: ASAD_IMG,
    perfumePrice: 'From Rs. 1,200 (15ml / 30ml / 50ml)',
    attarPrice: 'From Rs. 450 (3ml / 6ml / 12ml)',
    badge: 'POWERHOUSE',
    keyNotes: ['Black Pepper', 'Dark Coffee', 'Tobacco Wood']
  },
  {
    id: 'imp-baccarat-rouge',
    name: 'Rouge 540 Crystal Impression',
    originalBrand: 'Inspired by Baccarat Rouge 540 (MFK)',
    family: 'Saffron, Jasmine & Golden Amberwood',
    description: 'Airy, radiant, and poetic. Sparkling jasmine, bitter saffron, freshly cut cedar, and crystalline warm ambergris.',
    image: OUD_PERFUME_IMG,
    perfumePrice: 'From Rs. 1,400 (15ml / 30ml / 50ml)',
    attarPrice: 'From Rs. 550 (3ml / 6ml / 12ml)',
    badge: 'PRESTIGE NICHE',
    keyNotes: ['Bitter Saffron', 'Egyptian Jasmine', 'Cedar Amber']
  },
  {
    id: 'imp-dehn-al-oud',
    name: 'Dehn Al Oud Cambodi Pure Impression',
    originalBrand: 'Royal Arabian Heritage Pure Extract',
    family: 'Deep Aged Agarwood & Leather Resins',
    description: 'Non-alcoholic pure distilled Cambodian oud with natural earthy honey and leather facets. Long revered for prayers and celebrations.',
    image: DEHN_ATTAR_IMG,
    perfumePrice: 'From Rs. 1,500 (15ml / 30ml / 50ml)',
    attarPrice: 'From Rs. 800 (3ml / 6ml / 12ml)',
    badge: 'ROYAL HERITAGE',
    keyNotes: ['Aged Agarwood', 'Natural Resins', 'Dark Honey']
  }
];

interface CustomImpressionsSectionProps {
  onSelectProduct?: (product: Product) => void;
}

export const CustomImpressionsSection: React.FC<CustomImpressionsSectionProps> = () => {
  const [activeSlide, setActiveSlide] = useState(0);
  const [selectedFormat, setSelectedFormat] = useState<'perfume' | 'attar'>('perfume');
  const [customScentInput, setCustomScentInput] = useState('');
  const [customSize, setCustomSize] = useState('50ml');
  const [isCopied, setIsCopied] = useState(false);

  // Auto handle slide controls
  const handlePrev = () => {
    setActiveSlide((prev) => (prev === 0 ? TOP_IMPRESSIONS.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setActiveSlide((prev) => (prev === TOP_IMPRESSIONS.length - 1 ? 0 : prev + 1));
  };

  // Generate WhatsApp order message for custom impressions
  const currentImpression = TOP_IMPRESSIONS[activeSlide];
  const requestedScent = customScentInput.trim() || currentImpression.name;

  const whatsappMessage = encodeURIComponent(
    `Hello Suddais Collection! ✨\n\nI want to order a Custom Impression / Bespoke Fragrance:\n- Scent Name: ${requestedScent}\n- Type: ${
      selectedFormat === 'perfume' ? 'Designer Spray Perfume' : 'Pure Concentrated Attar Oil'
    }\n- Size: ${customSize}\n- Delivery: Pakistan (Cash on Delivery)\n\nPlease share availability and price quote!`
  );

  return (
    <section id="custom-impressions" className="py-14 sm:py-20 bg-[#faf8f5] border-y border-[#e8dec8] relative overflow-hidden">
      
      {/* Background Decorative Accents */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#d4af37]/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#b8860b]/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#f4ebd0] border border-[#d4af37]/40 text-[#8b6508] text-xs font-bold uppercase tracking-wider mb-3">
            <Sparkles className="w-3.5 h-3.5 text-[#b8860b]" />
            <span>BESPOKE IMPRESSIONS & CUSTOM PERFUMES</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-bold text-[#1a1612] font-display tracking-tight mb-4">
            We Craft 1:1 Impressions of Any Perfume & Attar
          </h2>
          <p className="text-sm sm:text-base text-[#665e52] leading-relaxed">
            Have a favorite high-end designer or niche scent? At <span className="text-[#1a1612] font-semibold">Suddais Collection</span>, our master blenders formulate identical 1:1 impressions using pure imported French and Arabian perfume oils. Available as luxury spray perfumes (15ml, 30ml, 50ml) or 100% pure alcohol-free attar oils (3ml, 6ml, 12ml).
          </p>
        </div>

        {/* 3 Pillar Value Badges */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-12">
          <div className="bg-white border border-[#e8dec8] rounded-2xl p-5 shadow-xs flex items-start gap-3.5">
            <div className="w-10 h-10 rounded-xl bg-[#faf2dd] border border-[#d4af37]/30 flex items-center justify-center text-[#996515] shrink-0">
              <Award className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-[#1a1612] mb-1">
                98% Scent Accuracy
              </h4>
              <p className="text-xs text-[#736a5c] leading-relaxed">
                Hand-blended with high oil concentration (35% to 45% Extrait) for maximum resemblance to the world’s most expensive fragrances.
              </p>
            </div>
          </div>

          <div className="bg-white border border-[#e8dec8] rounded-2xl p-5 shadow-xs flex items-start gap-3.5">
            <div className="w-10 h-10 rounded-xl bg-[#faf2dd] border border-[#d4af37]/30 flex items-center justify-center text-[#996515] shrink-0">
              <Droplet className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-[#1a1612] mb-1">
                Perfume Spray OR Pure Attar
              </h4>
              <p className="text-xs text-[#736a5c] leading-relaxed">
                Choose spray perfumes in 15ml, 30ml, 50ml, or non-alcoholic pure oil attars in 3ml, 6ml, 12ml pocket crystal bottles.
              </p>
            </div>
          </div>

          <div className="bg-white border border-[#e8dec8] rounded-2xl p-5 shadow-xs flex items-start gap-3.5">
            <div className="w-10 h-10 rounded-xl bg-[#faf2dd] border border-[#d4af37]/30 flex items-center justify-center text-[#996515] shrink-0">
              <Flame className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-[#1a1612] mb-1">
                Custom Blends On-Demand
              </h4>
              <p className="text-xs text-[#736a5c] leading-relaxed">
                Want a specific rare fragrance not in our list? Send us the name on WhatsApp and we will custom blend it for you.
              </p>
            </div>
          </div>
        </div>

        {/* Interactive Showcase & Slider of Famous Impressions */}
        <div className="bg-white border border-[#e8dec8] rounded-3xl p-6 sm:p-10 shadow-sm mb-12">
          
          <div className="flex flex-col lg:flex-row items-center justify-between gap-6 mb-8 pb-6 border-b border-[#f0e8d8]">
            <div>
              <div className="flex items-center gap-2 text-xs font-bold text-[#b8860b] uppercase tracking-wider mb-1">
                <Sliders className="w-3.5 h-3.5" />
                <span>Featured Impressions Showcase</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-[#1a1612] font-display">
                Explore Iconic Impressions ({activeSlide + 1} of {TOP_IMPRESSIONS.length})
              </h3>
            </div>

            {/* Carousel Buttons */}
            <div className="flex items-center gap-2">
              <button
                onClick={handlePrev}
                className="w-10 h-10 rounded-full border border-[#dcd2be] bg-[#faf8f5] hover:bg-[#1a1612] hover:text-white hover:border-[#1a1612] flex items-center justify-center transition-colors cursor-pointer text-[#1a1612]"
                aria-label="Previous impression"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={handleNext}
                className="w-10 h-10 rounded-full border border-[#dcd2be] bg-[#faf8f5] hover:bg-[#1a1612] hover:text-white hover:border-[#1a1612] flex items-center justify-center transition-colors cursor-pointer text-[#1a1612]"
                aria-label="Next impression"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Active Impression Showcase Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Left: Product Image with Gold Frame */}
            <div className="lg:col-span-5 relative">
              <div className="relative aspect-4/3 rounded-2xl overflow-hidden bg-[#faf8f5] border border-[#e8dec8] shadow-md group">
                <img
                  src={currentImpression.image}
                  alt={currentImpression.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                {currentImpression.badge && (
                  <div className="absolute top-3 left-3 bg-[#d4af37] text-[#1a1612] text-[10px] font-black uppercase px-2.5 py-1 rounded-md shadow-xs">
                    {currentImpression.badge}
                  </div>
                )}
                <div className="absolute bottom-3 right-3 bg-white/95 backdrop-blur-xs px-3 py-1.5 rounded-lg border border-[#e8dec8] text-[11px] font-bold text-[#8b6508]">
                  1:1 Oil Concentration
                </div>
              </div>

              {/* Thumbnail Strip */}
              <div className="flex items-center gap-2 mt-3 overflow-x-auto pb-1">
                {TOP_IMPRESSIONS.map((item, idx) => (
                  <button
                    key={item.id}
                    onClick={() => setActiveSlide(idx)}
                    className={`relative w-14 h-14 rounded-lg overflow-hidden shrink-0 border-2 transition-all cursor-pointer ${
                      activeSlide === idx ? 'border-[#d4af37] ring-2 ring-[#d4af37]/30 scale-105' : 'border-[#e8dec8] opacity-60 hover:opacity-100'
                    }`}
                  >
                    <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            </div>

            {/* Right: Impression Details & Quick Order Customizer */}
            <div className="lg:col-span-7 space-y-4">
              
              <div className="space-y-1">
                <span className="text-xs font-semibold text-[#8b6508] tracking-wider uppercase">
                  {currentImpression.originalBrand}
                </span>
                <h4 className="text-2xl sm:text-3xl font-bold text-[#1a1612] font-display">
                  {currentImpression.name}
                </h4>
                <p className="text-xs text-[#736a5c] font-medium">
                  Fragrance Olfactory Family: <strong className="text-[#1a1612]">{currentImpression.family}</strong>
                </p>
              </div>

              <p className="text-xs sm:text-sm text-[#52493d] leading-relaxed">
                {currentImpression.description}
              </p>

              {/* Key Accord Notes Badges */}
              <div className="flex items-center gap-2 flex-wrap pt-1">
                <span className="text-xs font-bold text-[#1a1612]">Prominent Notes:</span>
                {currentImpression.keyNotes.map((note) => (
                  <span
                    key={note}
                    className="text-xs px-2.5 py-1 rounded-md bg-[#faf2dd] border border-[#d4af37]/30 text-[#8b6508] font-medium"
                  >
                    {note}
                  </span>
                ))}
              </div>

              {/* Price & Format Choice */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                <div
                  onClick={() => {
                    setSelectedFormat('perfume');
                    setCustomSize('50ml');
                  }}
                  className={`p-3.5 rounded-xl border cursor-pointer transition-all ${
                    selectedFormat === 'perfume'
                      ? 'border-[#d4af37] bg-[#fdfbf7] shadow-xs ring-1 ring-[#d4af37]'
                      : 'border-[#e8dec8] bg-white hover:border-[#d4af37]/50'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs font-bold text-[#1a1612] flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5 text-[#b8860b]" />
                      Spray Perfume
                    </span>
                    <span className="text-[10px] text-[#8b6508] font-bold">15ml / 30ml / 50ml</span>
                  </div>
                  <div className="text-xs text-[#665e52]">
                    High-projection fine atomiser bottle
                  </div>
                  <div className="text-xs font-bold text-[#b8860b] mt-1.5">
                    {currentImpression.perfumePrice}
                  </div>
                </div>

                <div
                  onClick={() => {
                    setSelectedFormat('attar');
                    setCustomSize('12ml');
                  }}
                  className={`p-3.5 rounded-xl border cursor-pointer transition-all ${
                    selectedFormat === 'attar'
                      ? 'border-[#d4af37] bg-[#fdfbf7] shadow-xs ring-1 ring-[#d4af37]'
                      : 'border-[#e8dec8] bg-white hover:border-[#d4af37]/50'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs font-bold text-[#1a1612] flex items-center gap-1.5">
                      <Droplet className="w-3.5 h-3.5 text-emerald-600" />
                      Pure Concentrated Attar
                    </span>
                    <span className="text-[10px] text-[#8b6508] font-bold">3ml / 6ml / 12ml</span>
                  </div>
                  <div className="text-xs text-[#665e52]">
                    100% Non-Alcoholic, prayer-safe oil
                  </div>
                  <div className="text-xs font-bold text-[#b8860b] mt-1.5">
                    {currentImpression.attarPrice}
                  </div>
                </div>
              </div>

              {/* Sizes Available */}
              <div className="flex items-center gap-2 pt-1 flex-wrap">
                <span className="text-xs font-bold text-[#1a1612]">Select Desired Size:</span>
                {selectedFormat === 'perfume' ? (
                  <>
                    {['15ml (Pocket)', '30ml (Standard)', '50ml (Full Luxury)', '100ml (Jumbo)'].map((sz) => (
                      <button
                        key={sz}
                        onClick={() => setCustomSize(sz)}
                        className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                          customSize === sz
                            ? 'bg-[#1a1612] text-white shadow-xs'
                            : 'bg-[#faf8f5] text-[#665e52] border border-[#e8dec8] hover:border-[#1a1612]'
                        }`}
                      >
                        {sz}
                      </button>
                    ))}
                  </>
                ) : (
                  <>
                    {['3ml (Pocket Roll-on)', '6ml (Half Tola)', '12ml (Full Tola Crystal)'].map((sz) => (
                      <button
                        key={sz}
                        onClick={() => setCustomSize(sz)}
                        className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                          customSize === sz
                            ? 'bg-[#1a1612] text-white shadow-xs'
                            : 'bg-[#faf8f5] text-[#665e52] border border-[#e8dec8] hover:border-[#1a1612]'
                        }`}
                      >
                        {sz}
                      </button>
                    ))}
                  </>
                )}
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row items-center gap-3 pt-3">
                <a
                  href={`https://wa.me/923182187575?text=${whatsappMessage}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto flex-1 flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-gradient-to-r from-[#d4af37] via-[#b8860b] to-[#996515] hover:brightness-105 text-white font-bold text-xs shadow-md transition-all cursor-pointer"
                >
                  <Send className="w-4 h-4" />
                  <span>Order This Impression on WhatsApp</span>
                </a>

                <button
                  onClick={() => {
                    const text = `Impression: ${currentImpression.name} (${selectedFormat === 'perfume' ? 'Spray' : 'Attar'} - ${customSize})`;
                    navigator.clipboard.writeText(text);
                    setIsCopied(true);
                    setTimeout(() => setIsCopied(false), 2500);
                  }}
                  className="w-full sm:w-auto px-4 py-3.5 rounded-xl border border-[#dcd2be] bg-[#faf8f5] hover:bg-white text-xs font-bold text-[#1a1612] transition-colors cursor-pointer flex items-center justify-center gap-1.5"
                >
                  {isCopied ? (
                    <>
                      <CheckCircle className="w-4 h-4 text-emerald-600" />
                      <span>Copied details!</span>
                    </>
                  ) : (
                    <span>Copy Scent Details</span>
                  )}
                </button>
              </div>

            </div>

          </div>

        </div>

        {/* Custom Fragrance Request Box (Any Scent) */}
        <div className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-[#1a1612] via-[#2d251d] to-[#1a1612] text-white p-6 sm:p-10 border border-[#d4af37]/40 shadow-xl">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            <div className="lg:col-span-7 space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#d4af37]/20 border border-[#d4af37]/40 text-[#f7e7ce] text-xs font-bold uppercase tracking-wider">
                <Zap className="w-3.5 h-3.5 text-[#d4af37]" />
                <span>CAN'T FIND YOUR DESIRED PERFUME?</span>
              </div>
              <h3 className="text-2xl sm:text-4xl font-bold font-display text-white">
                Request Any Custom Perfume or Attar Impression
              </h3>
              <p className="text-xs sm:text-sm text-[#dcd7cb] leading-relaxed">
                Tell us which perfume or attar you love (e.g., Creed Aventus, Sauvage, Tom Ford Tobacco Vanille, Rasasi Hawas, Baccarat Rouge, etc.). We formulate bespoke blends with matching top, heart, and base notes.
              </p>

              {/* Direct Input & WhatsApp Action */}
              <div className="space-y-3 pt-2">
                <div className="flex flex-col sm:flex-row gap-2">
                  <input
                    type="text"
                    value={customScentInput}
                    onChange={(e) => setCustomScentInput(e.target.value)}
                    placeholder="Type the perfume name you want (e.g. Creed Aventus)..."
                    className="flex-1 bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-xs sm:text-sm text-white placeholder:text-white/50 focus:outline-none focus:border-[#d4af37] focus:bg-white/15"
                  />
                  <a
                    href={`https://wa.me/923182187575?text=${whatsappMessage}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-[#d4af37] hover:bg-[#e6c45e] text-[#1a1612] font-bold text-xs uppercase tracking-wider transition-all shadow-md shrink-0"
                  >
                    <Send className="w-4 h-4" />
                    <span>Get Custom Blend Quote</span>
                  </a>
                </div>
                <div className="flex items-center gap-4 text-[11px] text-[#b8a994]">
                  <span className="flex items-center gap-1">
                    <CheckCircle className="w-3 h-3 text-emerald-400" /> Guaranteed Scent Match
                  </span>
                  <span className="flex items-center gap-1">
                    <CheckCircle className="w-3 h-3 text-emerald-400" /> Free Fragrance Consultation
                  </span>
                  <span className="flex items-center gap-1">
                    <CheckCircle className="w-3 h-3 text-emerald-400" /> Cash on Delivery Nationwide
                  </span>
                </div>
              </div>

            </div>

            {/* Right: Atelier Workshop Image */}
            <div className="lg:col-span-5 relative hidden sm:block">
              <div className="relative aspect-16/10 rounded-2xl overflow-hidden border border-[#d4af37]/30 shadow-lg">
                <img
                  src={BESPOKE_WORKSHOP_IMG}
                  alt="Suddais Collection Bespoke Workshop"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#1a1612]/80 via-transparent to-transparent flex items-end p-4">
                  <div className="text-xs text-[#f7e7ce]">
                    <strong className="text-white block font-serif">Suddais Atelier</strong>
                    Crafting personalized perfume formulas since 2021
                  </div>
                </div>
              </div>
            </div>

          </div>

        </div>

      </div>

    </section>
  );
};
