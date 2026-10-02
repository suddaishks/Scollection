import React from 'react';
import { ShieldCheck, Truck, RotateCcw, Droplet, Phone, MessageCircle } from 'lucide-react';
import { ProductCategory } from '../types';

interface FooterProps {
  onSelectCategory: (cat: ProductCategory) => void;
  onOpenTracker: () => void;
  lang: 'ur' | 'en';
}

export const Footer: React.FC<FooterProps> = ({
  onSelectCategory,
  onOpenTracker,
  lang
}) => {
  return (
    <footer className="bg-[#0b0c10] border-t border-[#1d222e] text-[#a69f91] text-xs">
      
      {/* 4 Guarantees Strip */}
      <div className="border-b border-[#1d222e] py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-2 md:grid-cols-4 gap-6">
          <div className="flex items-center gap-3">
            <ShieldCheck className="w-6 h-6 text-[#d4af37] shrink-0" />
            <div>
              <div className="text-sm font-bold text-[#f4efe6]">{lang === 'ur' ? '100٪ اصلی اجزاء' : '100% Authentic'}</div>
              <div className="text-[11px] text-[#7d776c]">{lang === 'ur' ? 'اصلی کمبوڈین و اسامی عود' : 'Pure natural notes'}</div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Truck className="w-6 h-6 text-emerald-400 shrink-0" />
            <div>
              <div className="text-sm font-bold text-[#f4efe6]">{lang === 'ur' ? 'تیز ترین ترسیل' : 'Fast Courier & Rider'}</div>
              <div className="text-[11px] text-[#7d776c]">{lang === 'ur' ? 'پورے پاکستان میں ہوم ڈیلیوری' : 'Nationwide 2-3 Days'}</div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Droplet className="w-6 h-6 text-[#d4af37] shrink-0" />
            <div>
              <div className="text-sm font-bold text-[#f4efe6]">{lang === 'ur' ? 'الکحل سے پاک سنّت عطر' : 'Halal Sunnah Attar'}</div>
              <div className="text-[11px] text-[#7d776c]">{lang === 'ur' ? 'خالص اور نماز کے لیے موزوں' : 'Prayer & Jummah Safe'}</div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <RotateCcw className="w-6 h-6 text-[#d4af37] shrink-0" />
            <div>
              <div className="text-sm font-bold text-[#f4efe6]">{lang === 'ur' ? '7 دن میں واپسی ضمانت' : '7 Days Returns'}</div>
              <div className="text-[11px] text-[#7d776c]">{lang === 'ur' ? 'تسلی بخش خریداری کی گارنٹی' : 'Easy Exchange'}</div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 grid grid-cols-1 md:grid-cols-4 gap-8">
        
        {/* Brand Col */}
        <div className="space-y-3">
          <div className="text-2xl font-bold text-[#f4efe6] font-display">
            عطر و ردا
          </div>
          <p className="text-xs text-[#8e8778] leading-relaxed">
            {lang === 'ur'
              ? 'پاکستان کا معروف اسٹور برائے لگژری پرفیومز، نایاب عطر اور نفیس دستکاری ٹوپیاں۔ ہم اعلیٰ معیار اور دیانت داری کو اولیت دیتے ہیں۔'
              : 'Pakistan’s premier boutique for oriental perfumes, pure artisanal attars, and handcrafted embroidered caps.'}
          </p>
          <div className="pt-2 flex items-center gap-2">
            <span className="text-[11px] text-[#7d776c]">{lang === 'ur' ? 'ادائیگی کے ذرائع:' : 'Payments:'}</span>
            <span className="font-mono text-[10px] px-2 py-0.5 rounded bg-[#181b24] text-[#dcd7cb] border border-[#2b3040]">کیش</span>
            <span className="font-mono text-[10px] px-2 py-0.5 rounded bg-[#181b24] text-emerald-400 border border-[#2b3040]">ایزی پیسہ</span>
            <span className="font-mono text-[10px] px-2 py-0.5 rounded bg-[#181b24] text-[#d4af37] border border-[#2b3040]">جاز کیش</span>
          </div>
        </div>

        {/* Quick Collections */}
        <div className="space-y-3">
          <h4 className="text-sm font-bold text-[#f4efe6] font-display">
            {lang === 'ur' ? 'کلیکشنز' : 'Collections'}
          </h4>
          <ul className="space-y-2 text-xs">
            <li>
              <button
                onClick={() => onSelectCategory('perfume')}
                className="hover:text-[#d4af37] transition-colors cursor-pointer"
              >
                {lang === 'ur' ? 'فرانسیسی و مشرقی پرفیومز' : 'French & Oriental Perfumes'}
              </button>
            </li>
            <li>
              <button
                onClick={() => onSelectCategory('attar')}
                className="hover:text-[#d4af37] transition-colors cursor-pointer"
              >
                {lang === 'ur' ? 'خالص دہن العود و کستوری عطر' : 'Pure Dehn Al Oud & Musk Attar'}
              </button>
            </li>
            <li>
              <button
                onClick={() => onSelectCategory('topi')}
                className="hover:text-[#d4af37] transition-colors cursor-pointer"
              >
                {lang === 'ur' ? 'شاہی عمانی و ترک فیز ٹوپیاں' : 'Omani Embroidered & Fez Caps'}
              </button>
            </li>
            <li>
              <button
                onClick={() => onSelectCategory('deals')}
                className="hover:text-[#d4af37] transition-colors cursor-pointer"
              >
                {lang === 'ur' ? 'خصوصی آفرز و گفٹ بنڈلز' : 'Special Gift Presentation Sets'}
              </button>
            </li>
          </ul>
        </div>

        {/* Customer Care */}
        <div className="space-y-3">
          <h4 className="text-sm font-bold text-[#f4efe6] font-display">
            {lang === 'ur' ? 'کسٹمر سپورٹ' : 'Customer Service'}
          </h4>
          <ul className="space-y-2 text-xs">
            <li>
              <button onClick={onOpenTracker} className="hover:text-[#d4af37] transition-colors cursor-pointer">
                {lang === 'ur' ? 'آرڈر و رائیڈر ٹریکنگ' : 'Live Order & Rider Status'}
              </button>
            </li>
            <li>
              <a href="#contact-section" className="hover:text-[#d4af37] transition-colors">
                {lang === 'ur' ? 'ہم سے رابطہ کریں' : 'Contact Support'}
              </a>
            </li>
            <li>
              <a href="#about-section" className="hover:text-[#d4af37] transition-colors">
                {lang === 'ur' ? 'ہمارے بارے میں' : 'About Itr & Rida'}
              </a>
            </li>
            <li>
              <a
                href="https://wa.me/923001234567"
                target="_blank"
                rel="noopener noreferrer"
                className="text-emerald-400 hover:underline flex items-center gap-1"
              >
                <MessageCircle className="w-3 h-3" />
                <span>{lang === 'ur' ? 'واٹس ایپ ہیلپ لائن' : 'WhatsApp Helpline'}</span>
              </a>
            </li>
          </ul>
        </div>

        {/* Contact info */}
        <div className="space-y-3">
          <h4 className="text-sm font-bold text-[#f4efe6] font-display">
            {lang === 'ur' ? 'رابطہ و ہیڈ کوارٹر' : 'Headquarters'}
          </h4>
          <p className="text-xs text-[#8e8778]">
            {lang === 'ur' ? 'طارق روڈ، کراچی، پاکستان' : 'Tariq Road, Karachi, Pakistan'}
          </p>
          <div className="text-xs text-[#f4efe6] font-mono tabular-nums">
            +92 300 1234567
          </div>
          <p className="text-[11px] text-[#7d776c]">
            {lang === 'ur' ? 'صبح 11 بجے تا رات 11:30 بجے' : '11:00 AM - 11:30 PM'}
          </p>
        </div>

      </div>

      {/* Copyright */}
      <div className="border-t border-[#1a1e28] py-6 text-center text-[#6e685d] text-[11px]">
        <div>
          © {new Date().getFullYear()} عطر و ردا (Itr & Rida). {lang === 'ur' ? 'جملہ حقوق محفوظ ہیں۔' : 'All rights reserved.'}
        </div>
      </div>

    </footer>
  );
};
