import React, { useState } from 'react';
import { Tag, Copy, Check, Gift, Sparkles, Percent, ShoppingBag, Eye, ArrowRight } from 'lucide-react';
import { SPECIAL_DEALS } from '../data/products';
import { Product } from '../types';

interface DealsSectionProps {
  onApplyCoupon: (code: string) => void;
  onSelectProduct: (product: Product) => void;
  dealsProducts: Product[];
}

export const DealsSection: React.FC<DealsSectionProps> = ({
  onApplyCoupon,
  onSelectProduct,
  dealsProducts,
}) => {
  const [copiedCode, setCopiedCode] = useState<string | null>(null);
  const [showAllDeals, setShowAllDeals] = useState(false);

  const handleCopy = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(code);
    onApplyCoupon(code);
    setTimeout(() => setCopiedCode(null), 3000);
  };

  const displayedDeals = showAllDeals ? dealsProducts : dealsProducts.slice(0, 4);

  return (
    <section id="deals-section" className="py-14 bg-[#fbf9f5] border-b border-[#e8dec8]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <div>
            <div className="flex items-center gap-2 text-[#b8860b] text-xs font-bold uppercase tracking-wider mb-2">
              <Gift className="w-4 h-4" />
              <span>EXCLUSIVE OFFERS & SAVINGS</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-bold text-[#1a1612] font-display">
              Curated Gift Sets & Instant Promo Vouchers
            </h2>
          </div>
          <p className="text-sm text-[#665e52] max-w-md">
            Click to copy any coupon code to automatically apply your instant discount during checkout.
          </p>
        </div>

        {/* Voucher Coupons Strip */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-12">
          {SPECIAL_DEALS.map((deal) => {
            const isCopied = copiedCode === deal.code;
            return (
              <div
                key={deal.id}
                className="relative bg-white border border-[#e2d7c3] rounded-2xl p-5 overflow-hidden group hover:border-[#c59b27] hover:shadow-md transition-all"
              >
                {/* Gold Accent corner ribbon */}
                <div className="absolute top-0 right-0 w-16 h-16 overflow-hidden pointer-events-none">
                  <div className="bg-[#d4af37] text-[#1a1612] text-[10px] font-black uppercase text-center py-1 w-24 transform rotate-45 translate-x-4 -translate-y-1 shadow-xs">
                    SAVE
                  </div>
                </div>

                <div className="flex items-start justify-between mb-3 pr-8">
                  <div className="flex items-center gap-2">
                    <div className="p-2 rounded-xl bg-[#faf2dd] text-[#996515] border border-[#d4af37]/30">
                      <Percent className="w-4 h-4" />
                    </div>
                    <div>
                      <h4 className="font-bold text-sm text-[#1a1612]">
                        {deal.titleEn}
                      </h4>
                      <p className="text-xs text-[#736a5c]">
                        {deal.tagEn}
                      </p>
                    </div>
                  </div>
                </div>

                <p className="text-xs text-[#52493d] mb-4">
                  {deal.descEn}
                </p>

                {/* Promo Code Box */}
                <div className="flex items-center justify-between gap-2 p-2 bg-[#fcfaf7] border border-dashed border-[#c59b27] rounded-xl">
                  <span className="font-mono font-bold text-sm text-[#1a1612] tracking-wider px-2">
                    {deal.code}
                  </span>
                  <button
                    onClick={() => handleCopy(deal.code)}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                      isCopied
                        ? 'bg-emerald-600 text-white'
                        : 'bg-[#1a1612] text-white hover:bg-[#c59b27]'
                    }`}
                  >
                    {isCopied ? (
                      <>
                        <Check className="w-3.5 h-3.5" />
                        <span>Applied!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5 text-[#d4af37]" />
                        <span>Copy Code</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Featured Gift Bundles Section */}
        <div>
          <div className="flex items-center justify-between mb-6 pb-2 border-b border-[#e8dec8]">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-[#c59b27]" />
              <h3 className="text-lg sm:text-xl font-bold text-[#1a1612] font-display">
                Featured Presentation Bundles
              </h3>
            </div>
            {dealsProducts.length > 4 && (
              <button
                onClick={() => setShowAllDeals(!showAllDeals)}
                className="text-xs font-bold text-[#b8860b] hover:text-[#1a1612] flex items-center gap-1 cursor-pointer"
              >
                <span>{showAllDeals ? 'Show Less' : `View All (${dealsProducts.length})`}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {displayedDeals.map((prod) => (
              <div
                key={prod.id}
                className="bg-white border border-[#e2d7c3] rounded-2xl overflow-hidden hover:border-[#c59b27] hover:shadow-lg transition-all flex flex-col justify-between group"
              >
                <div className="relative aspect-[4/3] bg-[#faf8f5] overflow-hidden">
                  <img
                    src={prod.image}
                    alt={prod.nameEn}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                  />
                  {prod.discountPercentage && (
                    <div className="absolute top-2 left-2 bg-[#b8860b] text-white text-[11px] font-bold px-2 py-0.5 rounded shadow-sm">
                      {prod.discountPercentage}% OFF
                    </div>
                  )}
                </div>

                <div className="p-4 flex-1 flex flex-col justify-between">
                  <div>
                    <span className="text-[10px] font-bold text-[#b8860b] uppercase tracking-wider">
                      Presentation Set
                    </span>
                    <h4 className="font-bold text-sm sm:text-base text-[#1a1612] mt-1 mb-1 font-display line-clamp-1">
                      {prod.nameEn}
                    </h4>
                    <p className="text-xs text-[#665e52] line-clamp-2 mb-3">
                      {prod.descriptionEn}
                    </p>

                    {prod.bundleItemsEn && prod.bundleItemsEn.length > 0 && (
                      <div className="p-2 rounded-xl bg-[#faf7f0] border border-[#eee5d3] text-[11px] text-[#4a4237] space-y-1 mb-3">
                        <span className="font-bold text-[10px] text-[#996515] uppercase tracking-wider block">
                          Included In This Bundle:
                        </span>
                        {prod.bundleItemsEn.slice(0, 3).map((item, idx) => (
                          <div key={idx} className="flex items-center gap-1.5 truncate">
                            <span className="w-1 h-1 rounded-full bg-[#c59b27]" />
                            <span className="truncate">{item}</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  <div className="pt-3 border-t border-[#f0ebd9] flex items-center justify-between">
                    <div>
                      {prod.originalPrice && (
                        <span className="text-xs text-[#8c8273] line-through block leading-none mb-0.5">
                          Rs. {prod.originalPrice.toLocaleString()}
                        </span>
                      )}
                      <span className="text-base font-bold text-[#1a1612] font-mono">
                        Rs. {prod.price.toLocaleString()}
                      </span>
                    </div>

                    <button
                      onClick={() => onSelectProduct(prod)}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#1a1612] text-white text-xs font-bold hover:bg-[#c59b27] transition-all cursor-pointer shadow-xs"
                    >
                      <Eye className="w-3.5 h-3.5 text-[#d4af37]" />
                      <span>Details</span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};
