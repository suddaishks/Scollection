import React from 'react';
import { Droplet, Sparkles, HeartHandshake, ShieldCheck, MapPin, Phone } from 'lucide-react';
import { HERO_WHITE_GOLD_IMG } from '../data/images';

export const AboutUsSection: React.FC = () => {
  return (
    <section id="about-section" className="py-16 sm:py-20 bg-white border-b border-[#e8dec8]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Editorial Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Text Narrative */}
          <div className="lg:col-span-7 space-y-6">
            <div className="flex items-center gap-2 text-[#b8860b] text-xs font-bold uppercase tracking-wider">
              <Sparkles className="w-4 h-4" />
              <span>ABOUT SUDDAIS COLLECTION</span>
            </div>

            <h2 className="text-3xl sm:text-5xl font-bold text-[#1a1612] font-display leading-tight">
              Crafting Timeless Fragrances & Sacred Artisan Tradition
            </h2>

            <p className="text-base text-[#52493d] leading-relaxed">
              Welcome to <strong>Suddais Collection</strong>! We specialize in long-lasting designer spray perfumes (including viral masterpieces like <em>Gissah Imperial Valley</em>, <em>Afnan 9 PM Rebel</em>, <em>Lattafa Khamrah</em>, and <em>Lattafa Asad</em>), 100% non-alcoholic concentrated perfume oils (Attars), and intricately handcrafted Islamic prayer caps (Kufi).
            </p>

            <p className="text-sm text-[#736a5c] leading-relaxed">
              Every drop is distilled and blended with the highest percentage of original perfume concentrates to guarantee exceptional 24-hour sillage and longevity. Whether for Friday prayers, weddings, or daily professional wear, our collection brings you pure luxury.
            </p>

            {/* Address Banner */}
            <div className="p-4 rounded-2xl bg-[#faf7f2] border border-[#e8dec8] flex items-start gap-3 text-xs text-[#52493d]">
              <MapPin className="w-5 h-5 text-[#b8860b] shrink-0 mt-0.5" />
              <div>
                <strong className="text-[#1a1612] block mb-0.5">Physical Store Location:</strong>
                <span>Sherpao F2 Street, Labour Colony Double Kebin Street, Near M A Decoration, Malir, Karachi, Pakistan.</span>
                <span className="block mt-1 font-semibold text-[#b8860b]">Free Express Delivery on all orders over Rs. 5,000 nationwide.</span>
              </div>
            </div>

            {/* 3 Pillars */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
              <div className="p-4 rounded-2xl bg-[#faf7f2] border border-[#e8dec8]">
                <Droplet className="w-6 h-6 text-[#b8860b] mb-2" />
                <h4 className="text-sm font-bold text-[#1a1612] mb-1">
                  Pure & Concentrated
                </h4>
                <p className="text-xs text-[#736a5c]">
                  100% non-alcoholic attar oils and high-concentration Eau de Parfum sprays.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-[#faf7f2] border border-[#e8dec8]">
                <HeartHandshake className="w-6 h-6 text-emerald-600 mb-2" />
                <h4 className="text-sm font-bold text-[#1a1612] mb-1">
                  Artisan Caps
                </h4>
                <p className="text-xs text-[#736a5c]">
                  Traditional Omani gold zari embroidery, Turkish Fez, and Afghan Qaraquli caps.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-[#faf7f2] border border-[#e8dec8]">
                <ShieldCheck className="w-6 h-6 text-[#b8860b] mb-2" />
                <h4 className="text-sm font-bold text-[#1a1612] mb-1">
                  Direct WhatsApp Order
                </h4>
                <p className="text-xs text-[#736a5c]">
                  1-Click fast ordering and direct customer support at +92 318 2187575.
                </p>
              </div>
            </div>

          </div>

          {/* Right Image Showcase */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-3xl overflow-hidden bg-[#faf7f2] border border-[#e8dec8] shadow-xl">
              <img
                src={HERO_WHITE_GOLD_IMG}
                alt="Suddais Collection Craft"
                className="w-full h-full object-cover object-center"
              />
              <div className="p-6 bg-white border-t border-[#e8dec8] text-center">
                <span className="text-xs font-bold text-[#b8860b] uppercase tracking-wider block mb-1">
                  Quality Guaranteed
                </span>
                <h4 className="text-lg font-bold text-[#1a1612] font-display">
                  SUDDAIS COLLECTION
                </h4>
                <p className="text-xs text-[#736a5c] mt-1">
                  Malir, Karachi • WhatsApp: 0318-2187575
                </p>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
