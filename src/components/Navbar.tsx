import React, { useState } from 'react';
import { ShoppingBag, Menu, X, Phone, Sparkles, ShieldCheck } from 'lucide-react';
import { ProductCategory } from '../types';
import { BrandLogo } from './BrandLogo';

interface NavbarProps {
  activeCategory: ProductCategory;
  onSelectCategory: (cat: ProductCategory) => void;
  cartCount: number;
  onOpenCart: () => void;
  onOpenTracker?: () => void;
  onOpenOwnerPortal?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeCategory,
  onSelectCategory,
  cartCount,
  onOpenCart,
  onOpenOwnerPortal,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks: { cat: ProductCategory; label: string; isAnchor?: string }[] = [
    { cat: 'all', label: 'All Collection' },
    { cat: 'perfume', label: 'Perfumes' },
    { cat: 'attar', label: 'Pure Attars' },
    { cat: 'deals', label: 'Custom Impressions', isAnchor: '#custom-impressions' },
    { cat: 'topi', label: 'Prayer Caps' },
  ];

  return (
    <>
      {/* Top Announcement Bar */}
      <div className="bg-[#1a1612] text-[#f7e7ce] text-xs py-2 px-3 sm:px-4 border-b border-[#c59b27]/30">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-2">
          <div className="flex items-center gap-2 truncate">
            <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#d4af37] animate-pulse shrink-0" />
            <span className="font-medium tracking-wide text-[11px] sm:text-xs truncate">
              ✨ FREE NATIONWIDE EXPRESS DELIVERY OVER RS. 5,000 • COD & EASYPAISA
            </span>
          </div>

          <div className="flex items-center gap-3 shrink-0 text-[#dcd7cb]">
            {onOpenOwnerPortal && (
              <button
                onClick={onOpenOwnerPortal}
                className="hidden sm:inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-[#d4af37]/20 border border-[#d4af37]/40 text-[#f7e7ce] hover:bg-[#d4af37] hover:text-[#1a1612] transition-colors cursor-pointer text-[10px] font-bold"
                title="Store Owner Admin Portal (سدیس احمد)"
              >
                <ShieldCheck className="w-3 h-3 text-[#d4af37]" />
                <span>Admin</span>
              </button>
            )}
            <a
              href="https://wa.me/923182187575?text=Assalam-o-Alaikum!%20I%20would%20like%20to%20order%20from%20Suddais%20Collection."
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-[#d4af37] hover:text-[#f3d274] transition-colors font-medium text-[11px] sm:text-xs"
            >
              <Phone className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
              <span className="font-sans font-semibold">WhatsApp: 0318-2187575</span>
            </a>
          </div>
        </div>
      </div>

      {/* Main Luxury White & Gold Navbar */}
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-[#e8dec8] shadow-xs">
        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 min-h-[64px] sm:h-20 py-2 sm:py-0 flex items-center justify-between gap-2 sm:gap-4">
          
          {/* Brand Wordmark & Logo (100% Mobile Responsive - Never Overflows or Wraps Awkwardly) */}
          <div className="flex items-center min-w-0 flex-1">
            <button
              onClick={() => {
                onSelectCategory('all');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="text-left focus:outline-none group cursor-pointer flex items-center gap-2 sm:gap-3 min-w-0"
              aria-label="Suddais Collection Home"
            >
              <BrandLogo size="md" className="w-9 h-9 sm:w-11 sm:h-11 shrink-0" />
              <div className="min-w-0 flex flex-col justify-center">
                <div className="flex items-center gap-1 sm:gap-1.5 leading-tight">
                  <span className="text-sm xs:text-base sm:text-xl lg:text-2xl font-black tracking-tight text-[#1a1612] font-display whitespace-nowrap">
                    SUDDAIS COLLECTION
                  </span>
                  <Sparkles className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#c59b27] shrink-0 hidden xs:inline" />
                </div>
                <p className="text-[9px] xs:text-[10px] sm:text-[11px] text-[#8c7853] font-medium tracking-wider uppercase truncate block mt-0.5 max-w-[190px] xs:max-w-[240px] sm:max-w-none">
                  Original Perfumes & Pure Attars
                </p>
              </div>
            </button>
          </div>

          {/* Navigation Links (Desktop) */}
          <nav className="hidden md:flex items-center gap-1 lg:gap-2">
            {navLinks.map((link) => {
              const isActive = activeCategory === link.cat;
              return (
                <button
                  key={link.cat}
                  onClick={() => {
                    if (link.isAnchor) {
                      const el = document.querySelector(link.isAnchor);
                      if (el) {
                        el.scrollIntoView({ behavior: 'smooth' });
                        return;
                      }
                    }
                    onSelectCategory(link.cat);
                  }}
                  className={`px-3 py-2 rounded-lg text-xs font-semibold tracking-wide transition-all cursor-pointer ${
                    isActive
                      ? 'bg-[#faf4e6] text-[#b38b1f] border border-[#e8dec8] shadow-xs'
                      : 'text-[#4a4237] hover:text-[#1a1612] hover:bg-[#fbf9f5]'
                  }`}
                >
                  {link.label}
                </button>
              );
            })}
          </nav>

          {/* Actions: Direct WhatsApp & Cart */}
          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            {/* WhatsApp Quick Order Button (Desktop) */}
            <a
              href="https://wa.me/923182187575?text=Hello!%20I%20want%20to%20order%20from%20Suddais%20Collection."
              target="_blank"
              rel="noopener noreferrer"
              className="hidden lg:flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold text-white bg-emerald-700 hover:bg-emerald-800 transition-colors shadow-xs"
            >
              <Phone className="w-3.5 h-3.5" />
              <span>WhatsApp Order</span>
            </a>

            {/* Cart Button */}
            <button
              onClick={onOpenCart}
              className="relative flex items-center gap-1.5 sm:gap-2 px-3 sm:px-3.5 py-2 sm:py-2.5 rounded-xl bg-[#1a1612] text-white hover:bg-[#2b241d] transition-all cursor-pointer shadow-sm group shrink-0"
              aria-label="View Shopping Cart"
            >
              <ShoppingBag className="w-4 h-4 text-[#d4af37] group-hover:scale-110 transition-transform" />
              <span className="hidden sm:inline text-xs font-bold text-[#faf6ee]">Cart</span>
              {cartCount > 0 && (
                <span className="inline-flex items-center justify-center min-w-[18px] sm:min-w-[20px] h-4.5 sm:h-5 px-1 sm:px-1.5 text-[10px] sm:text-[11px] font-black rounded-full bg-[#d4af37] text-[#1a1612]">
                  {cartCount}
                </span>
              )}
            </button>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-1.5 sm:p-2 rounded-xl text-[#4a4237] hover:text-[#1a1612] hover:bg-[#f5f1e8] md:hidden cursor-pointer shrink-0"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5 sm:w-6 sm:h-6" /> : <Menu className="w-5 h-5 sm:w-6 sm:h-6" />}
            </button>
          </div>

        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-[#e8dec8] bg-white px-4 py-4 space-y-3 shadow-lg">
            <div className="grid grid-cols-2 gap-2 pb-3 border-b border-[#f0ebd9]">
              {navLinks.map((link) => (
                <button
                  key={link.cat}
                  onClick={() => {
                    setMobileMenuOpen(false);
                    if (link.isAnchor) {
                      const el = document.querySelector(link.isAnchor);
                      if (el) {
                        el.scrollIntoView({ behavior: 'smooth' });
                        return;
                      }
                    }
                    onSelectCategory(link.cat);
                  }}
                  className={`px-3 py-2.5 rounded-xl text-xs font-semibold text-center transition-colors ${
                    activeCategory === link.cat
                      ? 'bg-[#faf4e6] text-[#b38b1f] border border-[#e8dec8] font-bold'
                      : 'bg-[#fbf9f5] text-[#4a4237]'
                  }`}
                >
                  {link.label}
                </button>
              ))}
            </div>

            <div className="pt-1 flex flex-col gap-2">
              <a
                href="https://wa.me/923182187575?text=Assalam-o-Alaikum!%20I%20would%20like%20to%20order%20from%20Suddais%20Collection."
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-center gap-2 py-3 text-xs font-bold text-white bg-emerald-700 hover:bg-emerald-800 rounded-xl shadow-xs"
              >
                <Phone className="w-4 h-4" />
                <span>Direct WhatsApp Order (0318-2187575)</span>
              </a>
            </div>
          </div>
        )}
      </header>
    </>
  );
};
