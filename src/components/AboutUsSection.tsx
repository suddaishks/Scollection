import React from 'react';
import { Droplet, Sparkles, HeartHandshake, ShieldCheck } from 'lucide-react';

interface AboutUsSectionProps {
  lang: 'ur' | 'en';
}

export const AboutUsSection: React.FC<AboutUsSectionProps> = ({ lang }) => {
  return (
    <section id="about-section" className="py-16 sm:py-20 bg-[#0f1115] border-b border-[#222632]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Editorial Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Text narrative */}
          <div className="lg:col-span-7 space-y-6">
            <div className="flex items-center gap-2 text-[#d4af37] text-xs font-semibold uppercase tracking-wider">
              <Sparkles className="w-4 h-4" />
              <span>{lang === 'ur' ? 'ہمارے بارے میں - عطر و ردا کی کہانی' : 'About Us - The Heritage of Itr & Rida'}</span>
            </div>

            <h2 className="text-3xl sm:text-4xl font-bold text-[#f4efe6] font-display leading-tight">
              {lang === 'ur'
                ? 'سنّتِ نبویﷺ، روایتی عطر سازی اور دستکاری کا شاہکار'
                : 'Reviving the Sunnah of Fine Fragrance & Artisanal Craft'}
            </h2>

            <p className="text-sm sm:text-base text-[#c5beb0] leading-relaxed font-body">
              {lang === 'ur'
                ? 'عطر و ردا کا قیام اس جذبے کے تحت عمل میں آیا کہ پاکستان کے شائقینِ خوشبو کو اصلی، قدرتی اور الکحل سے پاک عطر، فرانسیسی و مشرقی پرفیومز، اور نفیس دستکاری ٹوپیاں ایک ہی معتبر جگہ پر میسر آسکیں۔'
                : 'Itr & Rida was founded to offer authentic, non-alcoholic artisanal attars, high-concentration oriental perfumes, and masterfully embroidered prayer caps without compromise.'}
            </p>

            <p className="text-sm text-[#a69f91] leading-relaxed">
              {lang === 'ur'
                ? 'ہمارا ہر پرفیوم اور عطر کمبوڈیا، آسام، اسپارٹا اور میسور کے قدیم خطوں سے لائے گئے قدرتی تیلوں سے کشید کیا جاتا ہے۔ ہم کسی بھی مصنوعی کیمیکل یا گھٹیا اسپرٹ کی آمیزش سے مکمل گریز کرتے ہیں تاکہ ہر بوند عبادت، جمعہ اور مجلس کے شایانِ شان ہو۔'
                : 'Each flacon is composed using genuine aged agarwood, Kashmiri saffron, and cold-pressed botanical essences, honoring traditional copper alembic distillation.'}
            </p>

            {/* 3 Pillars */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4">
              <div className="p-4 rounded-xl bg-[#151821] border border-[#262c3b]">
                <Droplet className="w-6 h-6 text-[#d4af37] mb-2" />
                <h4 className="text-sm font-bold text-[#f4efe6] mb-1">
                  {lang === 'ur' ? '100٪ الکحل سے پاک' : 'Zero Alcohol'}
                </h4>
                <p className="text-xs text-[#8e8778]">
                  {lang === 'ur' ? 'خالص سنتی روغنی عطر نماز و طہارت کے لیے محفوظ' : 'Pure concentrated oils, sacred and prayer-safe'}
                </p>
              </div>

              <div className="p-4 rounded-xl bg-[#151821] border border-[#262c3b]">
                <HeartHandshake className="w-6 h-6 text-emerald-400 mb-2" />
                <h4 className="text-sm font-bold text-[#f4efe6] mb-1">
                  {lang === 'ur' ? 'دستکاری و زری کام' : 'Artisanal Caps'}
                </h4>
                <p className="text-xs text-[#8e8778]">
                  {lang === 'ur' ? 'عمانی اور عثمانی طرز کی زری کڑھائی مخمل ٹوپیاں' : 'Hand-stitched velvet and wool felt caps'}
                </p>
              </div>

              <div className="p-4 rounded-xl bg-[#151821] border border-[#262c3b]">
                <ShieldCheck className="w-6 h-6 text-[#d4af37] mb-2" />
                <h4 className="text-sm font-bold text-[#f4efe6] mb-1">
                  {lang === 'ur' ? 'وارنٹی و واپسی' : 'Money Back'}
                </h4>
                <p className="text-xs text-[#8e8778]">
                  {lang === 'ur' ? 'خوشبو پسند نہ آنے پر 7 دن میں آسان واپسی' : '7 days no-questions-asked refund policy'}
                </p>
              </div>
            </div>

          </div>

          {/* Right column: Highlights and Trust Card */}
          <div className="lg:col-span-5">
            <div className="relative p-6 sm:p-8 rounded-2xl bg-gradient-to-br from-[#171b26] to-[#12141c] border border-[#2b3345] shadow-2xl">
              <div className="text-center pb-6 border-b border-[#252b3b]">
                <div className="font-display text-2xl font-bold text-[#d4af37] mb-1">
                  {lang === 'ur' ? 'عطر و ردا معیار' : 'The Itr & Rida Promise'}
                </div>
                <div className="text-xs text-[#a69f91]">
                  {lang === 'ur' ? 'پاکستان کا سب سے معتبر پرفیوم، عطر و ٹوپی اسٹور' : 'Pakistan’s Premier Fragrance & Cap Emporium'}
                </div>
              </div>

              <div className="py-6 space-y-4 text-xs">
                <div className="flex items-start gap-3">
                  <span className="w-2 h-2 rounded-full bg-[#d4af37] mt-1.5 shrink-0" />
                  <div>
                    <span className="font-bold text-[#f4efe6] block">{lang === 'ur' ? 'براہ راست درآمد:' : 'Direct Sourcing:'}</span>
                    <span className="text-[#a69f91]">{lang === 'ur' ? 'کمبوڈیا، ہندوستان اور دبئی کے مستند کشید کاروں سے براہ راست رسد۔' : 'Sourced directly from generational master distillers.'}</span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 mt-1.5 shrink-0" />
                  <div>
                    <span className="font-bold text-[#f4efe6] block">{lang === 'ur' ? 'روایتی دستکار یونین:' : 'Master Artisans:'}</span>
                    <span className="text-[#a69f91]">{lang === 'ur' ? 'ملتان اور کراچی کے دستکار صدیوں پرانی زری کڑھائی سے ٹوپیاں تیار کرتے ہیں۔' : 'Supporting local Pakistani embroiderers and craftsmen.'}</span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <span className="w-2 h-2 rounded-full bg-[#d4af37] mt-1.5 shrink-0" />
                  <div>
                    <span className="font-bold text-[#f4efe6] block">{lang === 'ur' ? 'محفوظ و تصدیق شدہ ڈیلیوری:' : 'Reliable Courier Logistics:'}</span>
                    <span className="text-[#a69f91]">{lang === 'ur' ? 'شہر میں اپنے رائیڈرز اور دیگر شہروں میں TCS و لیپرڈز کے ذریعے 2 سے 3 دن میں ترسیل۔' : 'Fast door-to-door delivery with live tracking.'}</span>
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-[#252b3b] text-center">
                <span className="text-[11px] text-[#7d776c]">
                  {lang === 'ur' ? 'حلال • سنّت کے مطابق • مستند کوالٹی' : 'Halal • Sunnah Compliant • Verified Quality'}
                </span>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
