import React from 'react';
import { Eye, ShoppingBag, Star, Sparkles } from 'lucide-react';
import { Product } from '../types';

interface ProductCardProps {
  product: Product;
  onOpenDetails: (product: Product) => void;
  onAddToCart: (product: Product, size: string) => void;
  lang: 'ur' | 'en';
  columnsMode?: '2' | '3' | '4';
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onOpenDetails,
  onAddToCart,
  lang,
  columnsMode = '2'
}) => {
  const defaultVariant = product.variants[0];
  const isCompact = columnsMode === '3';

  return (
    <div className="group relative bg-[#13161e] border border-[#232836] rounded-xl overflow-hidden hover:border-[#d4af37]/60 hover:shadow-xl hover:shadow-black/50 transition-all duration-300 flex flex-col justify-between">
      
      {/* Image Container with 1:1 or 4:3 aspect ratio */}
      <div className="relative aspect-square sm:aspect-[4/3] bg-[#1a1e28] overflow-hidden">
        <img
          src={product.image}
          alt={product.nameEn}
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500 cursor-pointer"
          onClick={() => onOpenDetails(product)}
        />

        {/* Badge */}
        {product.badgeUr && (
          <div className="absolute top-1.5 start-1.5 z-10">
            <span className={`inline-flex items-center gap-0.5 rounded-full bg-[#0f1115]/90 text-[#f5d77f] border border-[#d4af37]/40 backdrop-blur-xs font-semibold ${
              isCompact ? 'text-[9px] px-1.5 py-0.2' : 'text-[10px] sm:text-[11px] px-2 py-0.5'
            }`}>
              <Sparkles className="w-2.5 h-2.5 text-[#d4af37]" />
              <span className="truncate max-w-[80px] sm:max-w-none">
                {lang === 'ur' ? product.badgeUr : product.badgeEn}
              </span>
            </span>
          </div>
        )}

        {/* Discount Tag */}
        {product.discountPercentage && (
          <div className={`absolute top-1.5 end-1.5 z-10 bg-[#c82333] text-white font-bold rounded shadow-sm ${
            isCompact ? 'text-[9px] px-1 py-0.2' : 'text-[10px] sm:text-[11px] px-1.5 py-0.5'
          }`}>
            {product.discountPercentage}%
          </div>
        )}

        {/* Hover / Tap Eye Action */}
        <button
          onClick={() => onOpenDetails(product)}
          className="absolute inset-0 bg-[#0f1115]/50 opacity-0 group-hover:opacity-100 transition-opacity duration-200 hidden sm:flex items-center justify-center gap-1.5 text-xs font-bold text-[#0f1115] bg-[#f4efe6] m-auto h-8 px-3 rounded-lg shadow-lg cursor-pointer"
        >
          <Eye className="w-3.5 h-3.5" />
          <span>{lang === 'ur' ? 'تفصیل' : 'View'}</span>
        </button>
      </div>

      {/* Content Area */}
      <div className={`flex-1 flex flex-col justify-between ${
        isCompact ? 'p-2 sm:p-3' : 'p-2.5 sm:p-4'
      }`}>
        <div>
          {/* Category & Rating */}
          <div className="flex items-center justify-between text-[10px] sm:text-xs text-[#a69f91] mb-1">
            <span className="uppercase tracking-wider font-semibold text-[#d4af37] truncate">
              {product.category === 'perfume' && (lang === 'ur' ? 'پرفیوم' : 'Perfume')}
              {product.category === 'attar' && (lang === 'ur' ? 'عطر' : 'Attar')}
              {product.category === 'topi' && (lang === 'ur' ? 'ٹوپی' : 'Cap')}
              {product.category === 'deals' && (lang === 'ur' ? 'ڈیل' : 'Deal')}
            </span>
            <div className="flex items-center gap-0.5 text-[#f5d77f] shrink-0">
              <Star className="w-2.5 h-2.5 sm:w-3 sm:h-3 fill-[#d4af37] text-[#d4af37]" />
              <span className="tabular-nums font-semibold text-[10px] sm:text-xs text-[#dcd7cb]">
                {product.rating}
              </span>
            </div>
          </div>

          {/* Product Title */}
          <h3
            onClick={() => onOpenDetails(product)}
            className={`font-bold text-[#f4efe6] group-hover:text-[#d4af37] transition-colors cursor-pointer font-display mb-1 line-clamp-1 ${
              isCompact ? 'text-xs sm:text-sm' : 'text-xs sm:text-base'
            }`}
            title={lang === 'ur' ? product.nameUr : product.nameEn}
          >
            {lang === 'ur' ? product.nameUr : product.nameEn}
          </h3>

          {/* Tagline / Subtitle */}
          <p className="text-[10px] sm:text-xs text-[#8e8778] line-clamp-1 mb-2">
            {lang === 'ur' ? product.taglineUr : product.taglineEn}
          </p>

          {/* Fragrance Notes / Specs - Shown compactly */}
          {product.notes ? (
            <div className="mb-2 p-1.5 rounded-lg bg-[#181c25] border border-[#262c3b] text-[10px] sm:text-xs">
              <div className="text-[9px] sm:text-[10px] text-[#d4af37] font-medium truncate">
                {lang === 'ur' ? 'اہم نوٹس:' : 'Notes:'}
              </div>
              <div className="text-[9px] sm:text-[10px] text-[#c5beb0] truncate">
                <span>{lang === 'ur' ? product.notes.top[0]?.ur : product.notes.top[0]?.en}</span>
                <span className="text-[#555d71] mx-0.5">·</span>
                <span>{lang === 'ur' ? product.notes.heart[0]?.ur : product.notes.heart[0]?.en}</span>
                <span className="text-[#555d71] mx-0.5">·</span>
                <span>{lang === 'ur' ? product.notes.base[0]?.ur : product.notes.base[0]?.en}</span>
              </div>
            </div>
          ) : product.topiSpecs ? (
            <div className="mb-2 p-1.5 rounded-lg bg-[#181c25] border border-[#262c3b] text-[10px] sm:text-xs">
              <div className="text-[9px] sm:text-[10px] text-[#d4af37] font-medium truncate">
                {lang === 'ur' ? 'کپڑا و دستکاری:' : 'Material:'}
              </div>
              <div className="text-[9px] sm:text-[10px] text-[#c5beb0] truncate">
                {lang === 'ur' ? product.topiSpecs.materialUr : product.topiSpecs.materialEn}
              </div>
            </div>
          ) : null}
        </div>

        {/* Pricing and Action Strip */}
        <div className="pt-2 border-t border-[#232938] flex items-center justify-between gap-1">
          <div className="min-w-0">
            {product.originalPrice && (
              <span className="text-[9px] sm:text-[11px] text-[#7d776c] line-through block tabular-nums leading-none mb-0.5">
                PKR {product.originalPrice.toLocaleString()}
              </span>
            )}
            <span className={`font-bold text-[#f4efe6] tabular-nums block truncate ${
              isCompact ? 'text-xs sm:text-sm' : 'text-xs sm:text-base'
            }`}>
              PKR {defaultVariant?.price.toLocaleString() || product.price.toLocaleString()}
            </span>
          </div>

          <div className="flex items-center gap-1 shrink-0">
            {/* Quick View Button for Mobile */}
            <button
              onClick={() => onOpenDetails(product)}
              className="p-1.5 rounded-lg bg-[#1c212e] text-[#c5beb0] hover:text-white sm:hidden border border-[#2a3142]"
              title={lang === 'ur' ? 'نوٹس دیکھیں' : 'View Notes'}
            >
              <Eye className="w-3.5 h-3.5" />
            </button>

            {/* Add to Cart Button */}
            <button
              onClick={() => onAddToCart(product, defaultVariant.size)}
              className="flex items-center gap-1 px-2 sm:px-3 py-1.5 rounded-lg bg-[#d4af37] hover:bg-[#e6c352] text-[#0f1115] text-[11px] sm:text-xs font-bold transition-all cursor-pointer shadow-sm active:scale-95"
              title="Add to Cart"
            >
              <ShoppingBag className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
              <span className="hidden sm:inline">{lang === 'ur' ? 'کارٹ' : 'Add'}</span>
            </button>
          </div>
        </div>

      </div>

    </div>
  );
};
