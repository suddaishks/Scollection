import React, { useState } from 'react';
import { ShoppingBag, Truck, Globe, Menu, X, Phone } from 'lucide-react';
import { ProductCategory } from '../types';

interface NavbarProps {
  activeCategory: ProductCategory;
  onSelectCategory: (cat: ProductCategory) => void;
  cartCount: number;
  onOpenCart: () => void;
  onOpenTracker: () => void;
  lang: 'ur' | 'en';
  onToggleLang: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeCategory,
  onSelectCategory,
  cartCount,
  onOpenCart,
  onOpenTracker,
  lang,
  onToggleLang
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks: { cat: ProductCategory; ur: string; en: string; href?: string }[] = [
    { cat: 'all', ur: 'تمام مصنوعات', en: 'All Items' },
    { cat: 'perfume', ur: 'پرفیومز', en: 'Perfumes' },
    { cat: 'attar', ur: 'خالص عطر', en: 'Pure Attar' },
    { cat: 'topi', ur: 'دستکاری ٹوپیاں', en: 'Prayer Caps' },
    { cat: 'deals', ur: 'آفرز و ڈیلز', en: 'Offers & Deals' },
  ];

  return (
    <>
      {/* Top micro-announcement */}
      <div className="bg-[#181a20] border-b border-[#262a34] text-xs text-[#dcd7cb] py-1.5 px-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#d4af37]" />
            <span className="font-urdu font-semibold">
              {lang === 'ur'
                ? '🎉 پورے پاکستان میں 5000 روپے سے زائد کے آرڈر پر مفت ترسیل! • واٹس ایپ: 0318-2187575'
                : '🎉 FREE SHIPPING ON ALL ORDERS OVER RS. 5000! • WhatsApp: +92 318 2187575'}
            </span>
          </div>

          <div className="hidden sm:flex items-center gap-4 text-[#a69f91]">
            <button
              onClick={onOpenTracker}
              className="flex items-center gap-1.5 hover:text-[#d4af37] transition-colors cursor-pointer"
            >
              <Truck className="w-3.5 h-3.5 text-[#d4af37]" />
              <span>{lang === 'ur' ? 'آرڈر و رائیڈر ٹریکنگ' : 'Track Order / Rider'}</span>
            </button>
            <a
              href="https://wa.me/923182187575?text=Assalam%20o%20Alaikum!%20I%20want%20to%20inquire%20about%20Suddais%20Collection"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 hover:text-[#d4af37] transition-colors"
            >
              <Phone className="w-3 h-3 text-emerald-400" />
              <span className="tabular-nums">0318-2187575</span>
            </a>
          </div>
        </div>
      </div>

      {/* Main Top Bar adhering strictly to Top Bar Contract */}
      <header className="sticky top-0 z-40 bg-[#0f1115]/95 backdrop-blur-md border-b border-[#222632]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between gap-4">
          
          {/* Zone 1: Single text element wordmark */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => {
                onSelectCategory('all');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="text-start focus:outline-none group cursor-pointer"
            >
              <span className="text-xl sm:text-2xl font-extrabold tracking-tight text-[#f4efe6] font-display group-hover:text-[#d4af37] transition-colors">
                {lang === 'ur' ? 'سدیس کلیکشن' : 'SUDDAIS COLLECTION'}
              </span>
            </button>
          </div>

          {/* Zone 2: 4-6 clean text navigation links */}
          <nav className="hidden lg:flex items-center gap-8 text-sm font-medium">
            {navLinks.map((item) => (
              <button
                key={item.cat}
                onClick={() => {
                  onSelectCategory(item.cat);
                  const el = document.getElementById('catalog-section');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }}
                className={`whitespace-nowrap transition-colors relative py-1 cursor-pointer ${
                  activeCategory === item.cat
                    ? 'text-[#d4af37] font-semibold'
                    : 'text-[#cbc4b6] hover:text-[#f4efe6]'
                }`}
              >
                {lang === 'ur' ? item.ur : item.en}
                {activeCategory === item.cat && (
                  <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#d4af37] rounded-full" />
                )}
              </button>
            ))}

            <a
              href="#about-section"
              className="text-[#cbc4b6] hover:text-[#f4efe6] whitespace-nowrap transition-colors"
            >
              {lang === 'ur' ? 'ہمارے بارے میں' : 'About Us'}
            </a>

            <a
              href="#contact-section"
              className="text-[#cbc4b6] hover:text-[#f4efe6] whitespace-nowrap transition-colors"
            >
              {lang === 'ur' ? 'رابطہ' : 'Contact'}
            </a>
          </nav>

          {/* Zone 3: 1-2 primary actions */}
          <div className="flex items-center gap-3">
            {/* Language toggle */}
            <button
              onClick={onToggleLang}
              className="flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-medium text-[#c5beb0] bg-[#1a1d24] hover:bg-[#252934] rounded-lg border border-[#2b303d] transition-colors cursor-pointer"
              title="اردو / English Toggle"
            >
              <Globe className="w-3.5 h-3.5 text-[#d4af37]" />
              <span className="whitespace-nowrap font-sans">{lang === 'ur' ? 'English' : 'اردو'}</span>
            </button>

            {/* Shopping Bag Button */}
            <button
              onClick={onOpenCart}
              className="relative flex items-center justify-center p-2.5 rounded-lg bg-[#d4af37] text-[#0f1115] hover:bg-[#e6c352] active:scale-95 transition-all shadow-sm cursor-pointer"
              aria-label="Shopping Cart"
            >
              <ShoppingBag className="w-5 h-5" />
              {cartCount > 0 && (
                <span className="absolute -top-1.5 -right-1.5 bg-[#c82333] text-white text-[11px] font-bold w-5 h-5 rounded-full flex items-center justify-center shadow-md tabular-nums">
                  {cartCount}
                </span>
              )}
            </button>

            {/* Mobile menu hamburger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-lg bg-[#1a1d24] text-[#c5beb0] hover:text-white border border-[#2b303d] cursor-pointer"
              aria-label="Toggle Navigation"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-[#14161d] border-b border-[#262a34] px-4 py-4 space-y-3">
            <div className="grid grid-cols-2 gap-2">
              {navLinks.map((item) => (
                <button
                  key={item.cat}
                  onClick={() => {
                    onSelectCategory(item.cat);
                    setMobileMenuOpen(false);
                    const el = document.getElementById('catalog-section');
                    if (el) el.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className={`text-start px-3 py-2 rounded-md text-sm transition-colors ${
                    activeCategory === item.cat
                      ? 'bg-[#d4af37]/15 text-[#d4af37] font-semibold'
                      : 'text-[#c5beb0] hover:bg-[#1f232d]'
                  }`}
                >
                  {lang === 'ur' ? item.ur : item.en}
                </button>
              ))}
            </div>

            <div className="pt-2 border-t border-[#262a34] flex flex-col gap-2 text-sm text-[#a69f91]">
              <button
                onClick={() => {
                  onOpenTracker();
                  setMobileMenuOpen(false);
                }}
                className="flex items-center gap-2 px-3 py-2 text-start rounded-md hover:bg-[#1f232d] text-[#d4af37]"
              >
                <Truck className="w-4 h-4" />
                <span>{lang === 'ur' ? 'آرڈر و رائیڈر ٹریکنگ دیکھیں' : 'Track Order & Rider Status'}</span>
              </button>
              <a
                href="#about-section"
                onClick={() => setMobileMenuOpen(false)}
                className="px-3 py-1.5 hover:text-white"
              >
                {lang === 'ur' ? 'ہمارے بارے میں' : 'About Us'}
              </a>
              <a
                href="#contact-section"
                onClick={() => setMobileMenuOpen(false)}
                className="px-3 py-1.5 hover:text-white"
              >
                {lang === 'ur' ? 'رابطہ و واٹس ایپ' : 'Contact & WhatsApp'}
              </a>
            </div>
          </div>
        )}
      </header>
    </>
  );
};
