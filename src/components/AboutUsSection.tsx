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
              <span>{lang === 'ur' ? 'ہمارے بارے میں - سدیس کلیکشن کی کہانی' : 'About Us - Suddais Collection Story'}</span>
            </div>

            <h2 className="text-3xl sm:text-4xl font-bold text-[#f4efe6] font-display leading-tight">
              {lang === 'ur'
                ? 'خوشبو، خالص عطر اور نماز ٹوپیوں کا بااعتماد نام'
                : 'Welcome to Suddais Collection | Official Store'}
            </h2>

            <p className="text-sm sm:text-base text-[#c5beb0] leading-relaxed font-body">
              {lang === 'ur'
                ? 'سدیس کلیکشن (Suddais Collection) میں خوش آمدید! ہم الکحل سے پاک پریمیم عطر، دیرپا لگژری اسپرے پرفیومز، اور اعلیٰ معیار کی اسلامی نماز ٹوپیوں (Kufi) کے ماہر ہیں۔ ہماری تمام خوشبوئیں خالص اور اصلی کنسنٹریٹڈ پرفیوم آئلز سے تیار کی جاتی ہیں تاکہ آپ کو سارا دن تروتازہ اور معطر رکھیں۔'
                : 'Welcome to Suddais Collection! We specialize in premium non-alcoholic Attars, long-lasting luxury spray Perfumes, and high-quality Islamic Caps (Kufi). All our fragrances are carefully crafted using original concentrated perfume oils to ensure long-lasting freshness. Choose your favorite product and order directly via WhatsApp!'}
            </p>

            <p className="text-sm text-[#a69f91] leading-relaxed">
              {lang === 'ur'
                ? 'ہماری دکان شیرپاؤ ایف 2 اسٹریٹ، لیبر کالونی ڈبل کیبن اسٹریٹ، نزد ایم اے ڈیکوریشن، ملیر، کراچی میں واقع ہے۔ ہمارے ہاں 5000 روپے سے زائد کے ہر آرڈر پر پورے پاکستان میں مفت ڈیلیوری کی سہولت دستیاب ہے۔'
                : 'Located at Sherpao F2 Street, Labour Colony Double Kebin Street, Near M A Decoration, Malir, Karachi, Pakistan. Free delivery available on all orders over Rs. 5000.'}
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
