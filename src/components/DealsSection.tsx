import React, { useState } from 'react';
import { Tag, Copy, Check, Gift, Sparkles, Percent } from 'lucide-react';
import { SPECIAL_DEALS } from '../data/products';
import { Product } from '../types';

interface DealsSectionProps {
  onApplyCoupon: (code: string) => void;
  onSelectProduct: (product: Product) => void;
  dealsProducts: Product[];
  lang: 'ur' | 'en';
}

export const DealsSection: React.FC<DealsSectionProps> = ({
  onApplyCoupon,
  onSelectProduct,
  dealsProducts,
  lang
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
    <section id="deals-section" className="py-12 bg-[#12141a] border-b border-[#222632]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <div>
            <div className="flex items-center gap-2 text-[#d4af37] text-xs font-semibold uppercase tracking-wider mb-2">
              <Gift className="w-4 h-4" />
              <span>{lang === 'ur' ? 'خصوصی آفرز و پروموشنل ڈیلز' : 'Exclusive Offers & Promo Deals'}</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-[#f4efe6] font-display">
              {lang === 'ur' ? 'بچت اور گفٹ بنڈلز پر خصوصی رعایت' : 'Save Big with Curated Bundles & Vouchers'}
            </h2>
          </div>
          <p className="text-sm text-[#a8a192] max-w-md">
            {lang === 'ur'
              ? 'کوپن کوڈ استعمال کریں اور چیک آؤٹ پر فوری رعایت حاصل کریں، یا تیار شدہ شاہی بنڈل خریدیں۔'
              : 'Use promotional discount codes or choose from our royal fragrance presentation sets.'}
          </p>
        </div>

        {/* Voucher Coupons Strip */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10">
          {SPECIAL_DEALS.map((deal) => {
            const isCopied = copiedCode === deal.code;
            return (
              <div
                key={deal.id}
                className="relative bg-gradient-to-br from-[#1a1e28] to-[#151720] border border-[#2d3445] rounded-xl p-5 overflow-hidden group hover:border-[#d4af37]/50 transition-all shadow-sm"
              >
                {/* Visual coupon edge notches */}
                <div className="absolute -left-3 top-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-[#12141a] border border-[#2d3445]" />
                <div className="absolute -right-3 top-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-[#12141a] border border-[#2d3445]" />

                <div className="flex items-start justify-between gap-3 mb-2">
                  <span className="text-[11px] font-semibold px-2 py-0.5 rounded bg-[#d4af37]/20 text-[#f5d77f] border border-[#d4af37]/30">
                    {lang === 'ur' ? deal.tagUr : deal.tagEn}
                  </span>
                  <div className="flex items-center gap-1 text-[#d4af37]">
                    <Percent className="w-3.5 h-3.5" />
                    <span className="text-xs font-bold">{deal.discount > 0 ? `${deal.discount}% OFF` : 'FREE SHIP'}</span>
                  </div>
                </div>

                <h3 className="text-base font-bold text-[#f4efe6] mb-1">
                  {lang === 'ur' ? deal.titleUr : deal.titleEn}
                </h3>
                <p className="text-xs text-[#a8a192] mb-4 leading-relaxed">
                  {lang === 'ur' ? deal.descUr : deal.descEn}
                </p>

                <div className="flex items-center justify-between gap-2 pt-3 border-t border-[#292f3e]">
                  <div className="font-mono text-xs font-bold px-2.5 py-1 bg-[#0f1115] text-[#d4af37] border border-[#3b4356] rounded tracking-wider">
                    {deal.code}
                  </div>
                  <button
                    onClick={() => handleCopy(deal.code)}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#252b38] hover:bg-[#d4af37] hover:text-[#0f1115] text-[#dcd7cb] text-xs font-semibold transition-colors cursor-pointer"
                  >
                    {isCopied ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-400" />
                        <span>{lang === 'ur' ? 'کوڈ کاپی ہوگیا' : 'Applied!'}</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span>{lang === 'ur' ? 'کاپی اور لاگو کریں' : 'Copy & Apply'}</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Featured Deal Bundles Display */}
        {dealsProducts.length > 0 && (
          <div className="bg-[#171a22] border border-[#2b3140] rounded-2xl p-6 sm:p-8">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-[#d4af37]" />
                <h3 className="text-xl font-bold text-[#f4efe6] font-display">
                  {lang === 'ur' ? 'شاہی گفٹ پیک و بنڈل ڈیلز' : 'Featured Royal Presentation Bundles'}
                </h3>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {displayedDeals.map((dealProduct) => (
                <div
                  key={dealProduct.id}
                  className="flex flex-col sm:flex-row bg-[#111319] border border-[#282e3c] rounded-xl overflow-hidden hover:border-[#d4af37]/60 transition-all group"
                >
                  <div className="sm:w-2/5 relative h-52 sm:h-auto overflow-hidden bg-[#1a1d26]">
                    <img
                      src={dealProduct.image}
                      alt={dealProduct.nameEn}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-3 left-3 bg-[#c82333] text-white text-[11px] font-bold px-2 py-0.5 rounded shadow">
                      {dealProduct.discountPercentage}% OFF
                    </div>
                  </div>

                  <div className="sm:w-3/5 p-5 flex flex-col justify-between">
                    <div>
                      <div className="text-xs text-[#d4af37] font-medium mb-1">
                        {lang === 'ur' ? dealProduct.badgeUr : dealProduct.badgeEn}
                      </div>
                      <h4 className="text-lg font-bold text-[#f4efe6] mb-1 font-display group-hover:text-[#d4af37] transition-colors">
                        {lang === 'ur' ? dealProduct.nameUr : dealProduct.nameEn}
                      </h4>
                      <p className="text-xs text-[#a69f91] mb-3 line-clamp-2">
                        {lang === 'ur' ? dealProduct.descriptionUr : dealProduct.descriptionEn}
                      </p>

                      {/* Bundle items list */}
                      {dealProduct.bundleItemsUr && (
                        <div className="space-y-1 mb-4 text-xs text-[#c5beb0]">
                          {(lang === 'ur' ? dealProduct.bundleItemsUr : dealProduct.bundleItemsEn || []).slice(0, 3).map((item, idx) => (
                            <div key={idx} className="flex items-center gap-1.5 truncate">
                              <span className="w-1 h-1 rounded-full bg-[#d4af37]" />
                              <span>{item}</span>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>

                    <div className="pt-3 border-t border-[#252b38] flex items-center justify-between">
                      <div>
                        <div className="text-xs text-[#7d776c] line-through tabular-nums">
                          PKR {dealProduct.originalPrice?.toLocaleString()}
                        </div>
                        <div className="text-lg font-bold text-[#f4efe6] tabular-nums">
                          PKR {dealProduct.price.toLocaleString()}
                        </div>
                      </div>

                      <button
                        onClick={() => onSelectProduct(dealProduct)}
                        className="px-4 py-2 bg-[#d4af37] hover:bg-[#e6c352] text-[#0f1115] text-xs font-bold rounded-lg transition-colors cursor-pointer"
                      >
                        {lang === 'ur' ? 'تفصیل اور ڈیل خریدیں' : 'View & Buy Deal'}
                      </button>
                    </div>

                  </div>
                </div>
              ))}
            </div>

            {dealsProducts.length > 4 && (
              <div className="mt-8 text-center">
                <button
                  onClick={() => setShowAllDeals(!showAllDeals)}
                  className="px-6 py-2.5 bg-[#202534] hover:bg-[#2b3245] text-[#dcd7cb] hover:text-[#d4af37] border border-[#343b4f] text-xs font-semibold rounded-xl transition-all cursor-pointer"
                >
                  {showAllDeals
                    ? (lang === 'ur' ? 'کم ڈیلز دکھائیں' : 'Show Fewer Deals')
                    : (lang === 'ur' ? `تمام ${dealsProducts.length} شاہی ڈیلز دیکھیں` : `View All ${dealsProducts.length} Presentation Bundles`)}
                </button>
              </div>
            )}
          </div>
        )}

      </div>
    </section>
  );
};
