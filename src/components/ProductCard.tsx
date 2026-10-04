import React from 'react';
import { Eye, ShoppingBag, Star, Sparkles } from 'lucide-react';
import { Product } from '../types';

interface ProductCardProps {
  product: Product;
  onOpenDetails: (product: Product) => void;
  onAddToCart: (product: Product, size: string) => void;
  columnsMode?: '2' | '3' | '4';
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onOpenDetails,
  onAddToCart,
  columnsMode = '3'
}) => {
  const defaultVariant = product.variants[0];
  const isCompact = columnsMode === '3' || columnsMode === '4';
  const isUltraCompact = columnsMode === '4';

  const categoryName = {
    perfume: 'Perfume',
    attar: 'Pure Attar',
    topi: 'Prayer Cap',
    deals: 'Deal Set'
  }[product.category] || 'Fragrance';

  return (
    <div className={`group relative bg-white border border-[#e8dec8] hover:border-[#c59b27] hover:shadow-lg transition-all duration-300 flex flex-col justify-between overflow-hidden ${
      isUltraCompact ? 'rounded-xl shadow-xs' : 'rounded-2xl shadow-xs'
    }`}>
      
      {/* Image Container with 1:1 or 4:3 aspect ratio */}
      <div className="relative aspect-square bg-[#faf7f2] overflow-hidden">
        <img
          src={product.image}
          alt={product.nameEn}
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500 cursor-pointer"
          onClick={() => onOpenDetails(product)}
        />

        {/* Badge */}
        {product.badgeEn && !isUltraCompact && (
          <div className="absolute top-2 left-2 z-10">
            <span className={`inline-flex items-center gap-1 rounded-full bg-white/95 text-[#996515] border border-[#d4af37]/40 backdrop-blur-xs font-bold shadow-xs ${
              isCompact ? 'text-[9px] px-1.5 py-0.5' : 'text-[10px] sm:text-xs px-2.5 py-0.5'
            }`}>
              <Sparkles className="w-2.5 h-2.5 text-[#b8860b]" />
              <span className="truncate max-w-[80px] sm:max-w-none">
                {product.badgeEn}
              </span>
            </span>
          </div>
        )}

        {/* Discount Tag */}
        {product.discountPercentage && (
          <div className={`absolute top-2 right-2 z-10 bg-[#b8860b] text-white font-bold rounded shadow-xs ${
            isUltraCompact ? 'text-[8px] px-1 py-0.2' : isCompact ? 'text-[9px] px-1.5 py-0.5' : 'text-[10px] sm:text-xs px-2 py-0.5'
          }`}>
            {product.discountPercentage}% OFF
          </div>
        )}

        {/* Hover Eye Action */}
        <button
          onClick={() => onOpenDetails(product)}
          className="absolute inset-0 bg-black/25 opacity-0 group-hover:opacity-100 transition-opacity duration-200 hidden sm:flex items-center justify-center gap-1.5 text-xs font-bold text-[#1a1612] bg-white m-auto h-8 px-3.5 rounded-xl shadow-md cursor-pointer border border-[#e8dec8]"
        >
          <Eye className="w-3.5 h-3.5 text-[#b8860b]" />
          <span>Quick View</span>
        </button>
      </div>

      {/* Content Area */}
      <div className={`flex-1 flex flex-col justify-between ${
        isUltraCompact ? 'p-1.5 sm:p-2' : isCompact ? 'p-2.5 sm:p-3' : 'p-3 sm:p-4'
      }`}>
        <div>
          {/* Category & Rating */}
          <div className="flex items-center justify-between text-[10px] sm:text-xs text-[#8c8273] mb-1">
            <span className={`uppercase tracking-wider font-bold text-[#b8860b] truncate ${isUltraCompact ? 'text-[9px]' : ''}`}>
              {categoryName}
            </span>
            <div className="flex items-center gap-0.5 text-amber-500 shrink-0 font-bold">
              <Star className="w-2.5 h-2.5 sm:w-3 sm:h-3 fill-amber-400 text-amber-400" />
              <span className={`tabular-nums text-[#383025] ${isUltraCompact ? 'text-[9px]' : 'text-[10px] sm:text-xs'}`}>
                {product.rating}
              </span>
            </div>
          </div>

          {/* Product Title */}
          <h3
            onClick={() => onOpenDetails(product)}
            className={`font-bold text-[#1a1612] group-hover:text-[#b8860b] transition-colors cursor-pointer font-display mb-1 line-clamp-1 ${
              isUltraCompact ? 'text-xs' : isCompact ? 'text-xs sm:text-sm' : 'text-sm sm:text-base'
            }`}
            title={product.nameEn}
          >
            {product.nameEn}
          </h3>

          {/* Tagline / Subtitle */}
          {!isUltraCompact && (
            <p className="text-[11px] text-[#665e52] line-clamp-1 mb-2 leading-tight">
              {product.taglineEn}
            </p>
          )}

          {/* Fragrance Notes / Specs */}
          {!isUltraCompact && product.notes ? (
            <div className="mb-2 p-1.5 rounded-lg bg-[#faf7f2] border border-[#ece4d5] text-[10px] sm:text-xs">
              <div className="text-[9px] sm:text-[10px] text-[#996515] font-bold truncate">
                Key Notes:
              </div>
              <div className="text-[9px] sm:text-[10px] text-[#52493d] truncate">
                <span>{product.notes.top[0]?.en}</span>
                <span className="text-[#a69c8c] mx-0.5">·</span>
                <span>{product.notes.heart[0]?.en}</span>
                <span className="text-[#a69c8c] mx-0.5">·</span>
                <span>{product.notes.base[0]?.en}</span>
              </div>
            </div>
          ) : !isUltraCompact && product.topiSpecs ? (
            <div className="mb-2 p-1.5 rounded-lg bg-[#faf7f2] border border-[#ece4d5] text-[10px] sm:text-xs">
              <div className="text-[9px] sm:text-[10px] text-[#996515] font-bold truncate">
                Material & Craft:
              </div>
              <div className="text-[9px] sm:text-[10px] text-[#52493d] truncate">
                {product.topiSpecs.materialEn}
              </div>
            </div>
          ) : null}
        </div>

        {/* Pricing and Action Strip */}
        <div className={`pt-2 border-t border-[#f0ebd9] flex items-center justify-between gap-1 ${
          isUltraCompact ? 'pt-1' : 'pt-2'
        }`}>
          <div className="min-w-0">
            {product.originalPrice && !isUltraCompact && (
              <span className="text-[9px] sm:text-[11px] text-[#998f80] line-through block tabular-nums leading-none mb-0.5">
                Rs. {product.originalPrice.toLocaleString()}
              </span>
            )}
            <span className={`font-bold text-[#1a1612] tabular-nums block truncate font-mono ${
              isUltraCompact ? 'text-[11px] sm:text-xs' : isCompact ? 'text-xs sm:text-sm' : 'text-sm sm:text-base'
            }`}>
              Rs. {defaultVariant?.price.toLocaleString() || product.price.toLocaleString()}
            </span>
          </div>

          <div className="flex items-center gap-1 shrink-0">
            {/* Quick View Button for Mobile */}
            <button
              onClick={() => onOpenDetails(product)}
              className={`rounded-lg bg-[#faf7f2] text-[#52493d] hover:text-[#1a1612] sm:hidden border border-[#e2d7c3] ${
                isUltraCompact ? 'p-1' : 'p-1.5'
              }`}
              title="View Notes & Details"
            >
              <Eye className={isUltraCompact ? 'w-3 h-3' : 'w-3.5 h-3.5'} />
            </button>

            {/* Add to Cart Button */}
            <button
              onClick={() => onAddToCart(product, defaultVariant.size)}
              className={`flex items-center gap-1 rounded-xl bg-[#1a1612] hover:bg-[#c59b27] text-white font-bold transition-all cursor-pointer shadow-xs active:scale-95 ${
                isUltraCompact ? 'p-1 text-[10px]' : 'px-2.5 sm:px-3 py-1.5 text-[11px] sm:text-xs'
              }`}
              title="Add to Cart"
            >
              <ShoppingBag className={isUltraCompact ? 'w-3 h-3 text-[#d4af37]' : 'w-3 h-3 sm:w-3.5 sm:h-3.5 text-[#d4af37]'} />
              <span className="hidden sm:inline">Add</span>
            </button>
          </div>
        </div>

      </div>

    </div>
  );
};
