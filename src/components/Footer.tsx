import React from 'react';
import { ShieldCheck, Truck, RotateCcw, Droplet, Phone, MessageCircle, Sparkles } from 'lucide-react';
import { ProductCategory } from '../types';
import { BrandLogo } from './BrandLogo';

interface FooterProps {
  onSelectCategory: (cat: ProductCategory) => void;
  onOpenTracker: () => void;
  onOpenOwnerPortal?: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  onSelectCategory,
  onOpenTracker,
  onOpenOwnerPortal,
}) => {
  return (
    <footer className="bg-[#1a1612] text-[#dcd7cb] text-xs border-t border-[#c59b27]/30">
      
      {/* 4 Guarantees Strip */}
      <div className="border-b border-[#2d251d] py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-2 md:grid-cols-4 gap-6">
          <div className="flex items-center gap-3">
            <ShieldCheck className="w-6 h-6 text-[#d4af37] shrink-0" />
            <div>
              <div className="text-sm font-bold text-white">100% Authentic Quality</div>
              <div className="text-[11px] text-[#998f80]">Original concentrated perfume oils</div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Truck className="w-6 h-6 text-emerald-400 shrink-0" />
            <div>
              <div className="text-sm font-bold text-white">Express Nationwide Dispatch</div>
              <div className="text-[11px] text-[#998f80]">Free on orders over Rs. 5,000</div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Droplet className="w-6 h-6 text-[#d4af37] shrink-0" />
            <div>
              <div className="text-sm font-bold text-white">Zero Alcohol Attars</div>
              <div className="text-[11px] text-[#998f80]">Pure, concentrated and prayer safe</div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <RotateCcw className="w-6 h-6 text-[#d4af37] shrink-0" />
            <div>
              <div className="text-sm font-bold text-white">7-Day Easy Exchange</div>
              <div className="text-[11px] text-[#998f80]">Complete customer satisfaction</div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 grid grid-cols-1 md:grid-cols-4 gap-8">
        
        {/* Brand Col */}
        <div className="space-y-3">
          <div className="flex items-center gap-2.5">
            <BrandLogo size="sm" />
            <h4 className="text-base font-bold text-white font-display">
              SUDDAIS COLLECTION
            </h4>
          </div>
          <p className="text-xs text-[#998f80] leading-relaxed">
            Pakistan’s premier destination for high-concentration spray perfumes (Imperial Valley, 9PM Rebel, Khamrah, Asad), pure artisan attars, and handcrafted Islamic prayer caps.
          </p>
          <div className="pt-2 text-[11px] text-[#8c7853]">
            Store: Malir, Karachi, Pakistan.
          </div>
        </div>

        {/* Categories */}
        <div className="space-y-2.5">
          <h5 className="font-bold text-sm text-[#f7e7ce] uppercase tracking-wider mb-3">
            Product Categories
          </h5>
          <ul className="space-y-2">
            <li>
              <button
                onClick={() => onSelectCategory('perfume')}
                className="hover:text-[#d4af37] transition-colors cursor-pointer"
              >
                Designer Perfumes (15ml, 30ml, 50ml)
              </button>
            </li>
            <li>
              <button
                onClick={() => onSelectCategory('attar')}
                className="hover:text-[#d4af37] transition-colors cursor-pointer"
              >
                Pure Non-Alcoholic Attar (3ml, 6ml, 12ml)
              </button>
            </li>
            <li>
              <button
                onClick={() => onSelectCategory('topi')}
                className="hover:text-[#d4af37] transition-colors cursor-pointer"
              >
                Artisan Prayer Caps (Omani, Turkish, Afghan)
              </button>
            </li>
            <li>
              <button
                onClick={() => onSelectCategory('deals')}
                className="hover:text-[#d4af37] transition-colors cursor-pointer"
              >
                Special Gift Bundles & Vouchers
              </button>
            </li>
          </ul>
        </div>

        {/* Quick Help & Tracking */}
        <div className="space-y-2.5">
          <h5 className="font-bold text-sm text-[#f7e7ce] uppercase tracking-wider mb-3">
            Customer Care
          </h5>
          <ul className="space-y-2">
            <li>
              <button
                onClick={onOpenTracker}
                className="hover:text-[#d4af37] transition-colors cursor-pointer flex items-center gap-1.5"
              >
                <Truck className="w-3.5 h-3.5 text-[#d4af37]" />
                <span>Track My Parcel & Rider</span>
              </button>
            </li>
            <li>
              <a
                href="#about-section"
                className="hover:text-[#d4af37] transition-colors"
              >
                About Our Heritage & Quality
              </a>
            </li>
            <li>
              <a
                href="#contact-section"
                className="hover:text-[#d4af37] transition-colors"
              >
                Store Location & Inquiries
              </a>
            </li>
            <li>
              <a
                href="https://wa.me/923182187575"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-[#d4af37] transition-colors text-emerald-400 font-bold"
              >
                Direct WhatsApp Helpline
              </a>
            </li>
          </ul>
        </div>

        {/* WhatsApp & Payment */}
        <div className="space-y-3">
          <h5 className="font-bold text-sm text-[#f7e7ce] uppercase tracking-wider mb-3">
            Instant Orders & Payments
          </h5>
          <p className="text-xs text-[#998f80]">
            We accept Cash on Delivery (COD), Easypaisa, and JazzCash across all Pakistan cities.
          </p>

          <a
            href="https://wa.me/923182187575?text=Hello!%20I%20want%20to%20place%20an%20order."
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-700 hover:bg-emerald-600 text-white font-bold text-xs transition-colors shadow-xs"
          >
            <MessageCircle className="w-4 h-4" />
            <span>WhatsApp: 0318-2187575</span>
          </a>
        </div>

      </div>

      {/* Copyright Strip */}
      <div className="border-t border-[#262019] py-5 bg-[#120f0c] text-center text-[#807567] text-[11px]">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <span>© {new Date().getFullYear()} SUDDAIS COLLECTION. All Rights Reserved.</span>
            {onOpenOwnerPortal && (
              <button
                onClick={onOpenOwnerPortal}
                className="text-[#3a3227] hover:text-[#c59b27] transition-colors p-1 cursor-pointer"
                title="Management Access"
              >
                <ShieldCheck className="w-3.5 h-3.5 opacity-60 hover:opacity-100" />
              </button>
            )}
          </div>
          <div className="flex items-center gap-3">
            <span>Cash on Delivery</span>
            <span>•</span>
            <span>Easypaisa</span>
            <span>•</span>
            <span>JazzCash</span>
          </div>
        </div>
      </div>

    </footer>
  );
};
