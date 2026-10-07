import React, { useState } from 'react';
import { ShoppingBag, Truck, Menu, X, Phone, Sparkles, ShieldCheck } from 'lucide-react';
import { ProductCategory } from '../types';
import { BrandLogo } from './BrandLogo';

interface NavbarProps {
  activeCategory: ProductCategory;
  onSelectCategory: (cat: ProductCategory) => void;
  cartCount: number;
  onOpenCart: () => void;
  onOpenTracker: () => void;
  onOpenOwnerPortal?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeCategory,
  onSelectCategory,
  cartCount,
  onOpenCart,
  onOpenTracker,
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
      <div className="bg-[#1a1612] text-[#f7e7ce] text-xs py-2 px-4 border-b border-[#c59b27]/30">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#d4af37] animate-pulse" />
            <span className="font-medium tracking-wide">
              ✨ FREE NATIONWIDE EXPRESS DELIVERY ON ORDERS OVER RS. 5,000 • COD & EASYPAISA
            </span>
          </div>

          <div className="hidden sm:flex items-center gap-5 text-[#dcd7cb]">
            <button
              onClick={onOpenTracker}
              className="flex items-center gap-1.5 hover:text-[#d4af37] transition-colors cursor-pointer text-xs"
            >
              <Truck className="w-3.5 h-3.5 text-[#d4af37]" />
              <span>Track Order</span>
            </button>
            <a
              href="https://wa.me/923182187575?text=Hello!%20I%20would%20like%20to%20order%20from%20Suddais%20Collection."
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-[#d4af37] hover:text-[#f3d274] transition-colors font-medium text-xs"
            >
              <Phone className="w-3.5 h-3.5 text-emerald-400" />
              <span>WhatsApp: +92 318 2187575</span>
            </a>
          </div>
        </div>
      </div>

      {/* Main Luxury White & Gold Navbar */}
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-[#e8dec8] shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-4">
          
          {/* Brand Wordmark & Logo */}
          {/* NOTE FOR GITHUB: To change your logo, replace 'public/assets/logo.png' or 'public/logo.png' with your logo file! */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => {
                onSelectCategory('all');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="text-left focus:outline-none group cursor-pointer flex items-center gap-2.5"
            >
              <BrandLogo size="md" />
              <div>
                <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-[#1a1612] font-display flex items-center gap-1.5">
                  <span>SUDDAIS COLLECTION</span>
                  <Sparkles className="w-4 h-4 text-[#c59b27]" />
                </h1>
                <p className="text-[11px] text-[#8c7853] font-medium tracking-widest uppercase">
                  Haute Parfumerie & Artisan Attars
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

          {/* Actions: Tracking, Cart & WhatsApp */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Order Tracker Button (Desktop) */}
            <button
              onClick={onOpenTracker}
              className="hidden lg:flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold text-[#5a4e3c] bg-[#faf6ee] border border-[#e8dec8] hover:border-[#c59b27] hover:text-[#1a1612] transition-colors cursor-pointer"
            >
              <Truck className="w-3.5 h-3.5 text-[#c59b27]" />
              <span>Live Order Tracker</span>
            </button>

            {/* Cart Button */}
            <button
              onClick={onOpenCart}
              className="relative flex items-center gap-2 px-3.5 py-2.5 rounded-xl bg-[#1a1612] text-white hover:bg-[#2b241d] transition-all cursor-pointer shadow-sm group"
              aria-label="View Shopping Cart"
            >
              <ShoppingBag className="w-4 h-4 text-[#d4af37] group-hover:scale-110 transition-transform" />
              <span className="hidden sm:inline text-xs font-bold text-[#faf6ee]">Cart</span>
              {cartCount > 0 && (
                <span className="inline-flex items-center justify-center min-w-[20px] h-5 px-1.5 text-[11px] font-bold rounded-full bg-[#d4af37] text-[#1a1612]">
                  {cartCount}
                </span>
              )}
            </button>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-xl text-[#4a4237] hover:text-[#1a1612] hover:bg-[#f5f1e8] md:hidden cursor-pointer"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-[#e8dec8] bg-white px-4 py-4 space-y-2 shadow-lg">
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

            <div className="pt-2 flex flex-col gap-2">
              <button
                onClick={() => {
                  onOpenTracker();
                  setMobileMenuOpen(false);
                }}
                className="w-full flex items-center justify-center gap-2 py-2.5 text-xs font-semibold text-[#1a1612] bg-[#faf6ee] border border-[#e8dec8] rounded-xl"
              >
                <Truck className="w-4 h-4 text-[#c59b27]" />
                <span>Track Rider / Order Status</span>
              </button>

              <a
                href="https://wa.me/923182187575?text=Hello!%20I%20would%20like%20to%20order%20from%20Suddais%20Collection."
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-center gap-2 py-2.5 text-xs font-bold text-white bg-emerald-700 hover:bg-emerald-800 rounded-xl"
              >
                <Phone className="w-4 h-4" />
                <span>WhatsApp Order (+92 318 2187575)</span>
              </a>
            </div>
          </div>
        )}
      </header>
    </>
  );
};
