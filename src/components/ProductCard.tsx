import React from 'react';
import { Eye, ShoppingBag, Star, Sparkles } from 'lucide-react';
import { Product } from '../types';

interface ProductCardProps {
  product: Product;
  onOpenDetails: (product: Product) => void;
  onAddToCart: (product: Product, size: string) => void;
  lang: 'ur' | 'en';
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onOpenDetails,
  onAddToCart,
  lang
}) => {
  const defaultVariant = product.variants[0];

  return (
    <div className="group relative bg-[#13161e] border border-[#232836] rounded-xl overflow-hidden hover:border-[#d4af37]/60 hover:shadow-xl hover:shadow-black/50 transition-all duration-300 flex flex-col justify-between">
      
      {/* Image Container with 4:3 / clean aspect ratio */}
      <div className="relative aspect-[4/3] bg-[#1a1e28] overflow-hidden">
        <img
          src={product.image}
          alt={product.nameEn}
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
        />

        {/* Badge */}
        {product.badgeUr && (
          <div className="absolute top-2.5 start-2.5 z-10">
            <span className="inline-flex items-center gap-1 text-[11px] font-semibold px-2.5 py-0.5 rounded-full bg-[#0f1115]/85 text-[#f5d77f] border border-[#d4af37]/40 backdrop-blur-xs">
              <Sparkles className="w-3 h-3 text-[#d4af37]" />
              {lang === 'ur' ? product.badgeUr : product.badgeEn}
            </span>
          </div>
        )}

        {/* Discount Tag */}
        {product.discountPercentage && (
          <div className="absolute top-2.5 end-2.5 z-10 bg-[#c82333] text-white text-[11px] font-bold px-2 py-0.5 rounded-md shadow-sm">
            {product.discountPercentage}% OFF
          </div>
        )}

        {/* Quick hover action overlay */}
        <div className="absolute inset-0 bg-[#0f1115]/60 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center gap-2 p-4">
          <button
            onClick={() => onOpenDetails(product)}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-[#f4efe6] text-[#0f1115] text-xs font-bold hover:bg-white transition-colors shadow-lg cursor-pointer"
          >
            <Eye className="w-3.5 h-3.5" />
            <span>{lang === 'ur' ? 'نوٹس و تفصیلات' : 'View Notes'}</span>
          </button>
        </div>
      </div>

      {/* Content Area */}
      <div className="p-4 flex-1 flex flex-col justify-between">
        <div>
          {/* Category & Rating */}
          <div className="flex items-center justify-between text-xs text-[#a69f91] mb-1.5">
            <span className="uppercase tracking-wider font-semibold text-[#d4af37]">
              {product.category === 'perfume' && (lang === 'ur' ? 'پرفیوم' : 'Perfume')}
              {product.category === 'attar' && (lang === 'ur' ? 'خالص عطر' : 'Pure Attar')}
              {product.category === 'topi' && (lang === 'ur' ? 'نماز ٹوپی' : 'Prayer Cap')}
              {product.category === 'deals' && (lang === 'ur' ? 'گفٹ بنڈل' : 'Bundle Deal')}
            </span>
            <div className="flex items-center gap-1 text-[#f5d77f]">
              <Star className="w-3 h-3 fill-[#d4af37] text-[#d4af37]" />
              <span className="tabular-nums font-semibold text-xs text-[#dcd7cb]">{product.rating}</span>
              <span className="text-[11px] text-[#7d776c]">({product.reviewsCount})</span>
            </div>
          </div>

          {/* Product Title */}
          <h3
            onClick={() => onOpenDetails(product)}
            className="text-base font-bold text-[#f4efe6] group-hover:text-[#d4af37] transition-colors cursor-pointer font-display mb-1 line-clamp-1"
          >
            {lang === 'ur' ? product.nameUr : product.nameEn}
          </h3>

          {/* Subtitle / Tagline */}
          <p className="text-xs text-[#a69f91] line-clamp-1 mb-3">
            {lang === 'ur' ? product.taglineUr : product.taglineEn}
          </p>

          {/* Key Fragrance Notes / Material Pill-free inline text */}
          {product.notes ? (
            <div className="mb-3.5 p-2 rounded-lg bg-[#181c25] border border-[#262c3b] text-xs">
              <div className="text-[11px] text-[#d4af37] font-medium mb-1">
                {lang === 'ur' ? 'خوشبو کے نوٹس:' : 'Key Fragrance Notes:'}
              </div>
              <div className="flex flex-wrap items-center gap-1.5 text-[11px] text-[#c5beb0]">
                <span>{lang === 'ur' ? product.notes.top[0]?.ur : product.notes.top[0]?.en}</span>
                <span className="text-[#555d71]">·</span>
                <span>{lang === 'ur' ? product.notes.heart[0]?.ur : product.notes.heart[0]?.en}</span>
                <span className="text-[#555d71]">·</span>
                <span>{lang === 'ur' ? product.notes.base[0]?.ur : product.notes.base[0]?.en}</span>
              </div>
            </div>
          ) : product.topiSpecs ? (
            <div className="mb-3.5 p-2 rounded-lg bg-[#181c25] border border-[#262c3b] text-xs">
              <div className="text-[11px] text-[#d4af37] font-medium mb-1">
                {lang === 'ur' ? 'مٹیریل اور دستکاری:' : 'Material & Craft:'}
              </div>
              <div className="text-[11px] text-[#c5beb0] line-clamp-1">
                {lang === 'ur' ? product.topiSpecs.materialUr : product.topiSpecs.materialEn}
              </div>
            </div>
          ) : null}
        </div>

        {/* Pricing and Action Strip */}
        <div className="pt-3 border-t border-[#232938] flex items-center justify-between gap-2">
          <div>
            {product.originalPrice && (
              <span className="text-xs text-[#7d776c] line-through block tabular-nums">
                PKR {product.originalPrice.toLocaleString()}
              </span>
            )}
            <span className="text-base font-bold text-[#f4efe6] tabular-nums">
              PKR {defaultVariant?.price.toLocaleString() || product.price.toLocaleString()}
            </span>
          </div>

          <div className="flex items-center gap-1.5">
            <button
              onClick={() => onAddToCart(product, defaultVariant.size)}
              className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-[#d4af37] hover:bg-[#e6c352] text-[#0f1115] text-xs font-bold transition-all cursor-pointer shadow-sm active:scale-95"
              title="Add to Cart"
            >
              <ShoppingBag className="w-3.5 h-3.5" />
              <span>{lang === 'ur' ? 'کارٹ' : 'Add'}</span>
            </button>
          </div>
        </div>

      </div>

    </div>
  );
};
