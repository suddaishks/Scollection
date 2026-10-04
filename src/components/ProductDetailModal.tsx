import React, { useState } from 'react';
import {
  X,
  Star,
  ShoppingBag,
  Zap,
  Clock,
  Wind,
  Sparkles,
  ShieldCheck,
  RotateCcw,
  Check,
  Phone,
  Droplet
} from 'lucide-react';
import { Product } from '../types';

interface ProductDetailModalProps {
  product: Product | null;
  onClose: () => void;
  onAddToCart: (product: Product, size: string) => void;
  onBuyNow: (product: Product, size: string) => void;
}

export const ProductDetailModal: React.FC<ProductDetailModalProps> = ({
  product,
  onClose,
  onAddToCart,
  onBuyNow,
}) => {
  if (!product) return null;

  const [selectedVariant, setSelectedVariant] = useState(product.variants[0]);
  const [selectedImg, setSelectedImg] = useState(product.image);
  const [addedToast, setAddedToast] = useState(false);

  const handleAddToCart = () => {
    onAddToCart(product, selectedVariant.size);
    setAddedToast(true);
    setTimeout(() => setAddedToast(false), 2500);
  };

  const handleWhatsAppOrder = () => {
    const text = encodeURIComponent(
      `Hello! I want to order from Suddais Collection:\n\n*Product:* ${product.nameEn}\n*Size:* ${selectedVariant.size}\n*Price:* Rs. ${selectedVariant.price.toLocaleString()}\n\nPlease confirm availability and delivery details. Thank you!`
    );
    window.open(`https://wa.me/923182187575?text=${text}`, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/60 backdrop-blur-sm overflow-y-auto">
      <div
        className="relative w-full max-w-4xl bg-white border border-[#e8dec8] rounded-3xl shadow-2xl text-[#1a1612] overflow-hidden my-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 p-2 rounded-full bg-white/90 hover:bg-[#faf4e6] text-[#52493d] hover:text-[#1a1612] border border-[#e8dec8] transition-colors cursor-pointer shadow-xs"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2">
          
          {/* Left Column: Product Gallery */}
          <div className="p-6 bg-[#faf7f2] flex flex-col justify-between border-b md:border-b-0 md:border-r border-[#e8dec8]">
            <div>
              {/* Main Image */}
              <div className="relative aspect-square rounded-2xl overflow-hidden bg-white border border-[#e8dec8] shadow-sm mb-4">
                <img
                  src={selectedImg}
                  alt={product.nameEn}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover object-center"
                />
                {product.badgeEn && (
                  <div className="absolute top-3 left-3 bg-[#d4af37] text-[#1a1612] text-xs font-black px-3 py-1 rounded-full shadow-sm flex items-center gap-1">
                    <Sparkles className="w-3.5 h-3.5 text-[#1a1612]" />
                    <span>{product.badgeEn}</span>
                  </div>
                )}
              </div>

              {/* Thumbnails if available */}
              {product.gallery && product.gallery.length > 0 && (
                <div className="flex items-center gap-2 overflow-x-auto pb-2">
                  <button
                    onClick={() => setSelectedImg(product.image)}
                    className={`w-14 h-14 rounded-xl overflow-hidden border-2 transition-all cursor-pointer ${
                      selectedImg === product.image ? 'border-[#c59b27] shadow-sm' : 'border-[#e8dec8] opacity-70'
                    }`}
                  >
                    <img src={product.image} alt="Main" className="w-full h-full object-cover" />
                  </button>
                  {product.gallery.map((img, idx) => (
                    <button
                      key={idx}
                      onClick={() => setSelectedImg(img)}
                      className={`w-14 h-14 rounded-xl overflow-hidden border-2 transition-all cursor-pointer ${
                        selectedImg === img ? 'border-[#c59b27] shadow-sm' : 'border-[#e8dec8] opacity-70'
                      }`}
                    >
                      <img src={img} alt={`Gallery ${idx}`} className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Trust Badges */}
            <div className="pt-4 border-t border-[#e8dec8] grid grid-cols-2 gap-3 text-xs text-[#52493d]">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-[#b8860b]" />
                <span>100% Authentic Quality</span>
              </div>
              <div className="flex items-center gap-2">
                <RotateCcw className="w-4 h-4 text-[#b8860b]" />
                <span>7-Day Easy Exchange</span>
              </div>
            </div>
          </div>

          {/* Right Column: Details & Order Controls */}
          <div className="p-6 sm:p-8 flex flex-col justify-between max-h-[85vh] overflow-y-auto">
            <div>
              {/* Category & Rating */}
              <div className="flex items-center justify-between gap-2 mb-2">
                <span className="text-xs font-bold text-[#b8860b] uppercase tracking-wider">
                  {product.category.toUpperCase()}
                </span>
                <div className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-[#faf2dd] border border-[#d4af37]/30 text-xs font-bold text-[#996515]">
                  <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
                  <span>{product.rating}</span>
                  <span className="text-[#8c7853] font-normal">({product.reviewsCount} reviews)</span>
                </div>
              </div>

              {/* Title & Tagline */}
              <h2 className="text-2xl sm:text-3xl font-bold text-[#1a1612] font-display mb-1">
                {product.nameEn}
              </h2>
              <p className="text-xs sm:text-sm text-[#736a5c] mb-4">
                {product.taglineEn}
              </p>

              {/* Price Row */}
              <div className="flex items-baseline gap-3 mb-6 p-3 bg-[#faf7f2] border border-[#e8dec8] rounded-2xl">
                <span className="text-2xl sm:text-3xl font-bold text-[#1a1612] font-mono">
                  Rs. {selectedVariant.price.toLocaleString()}
                </span>
                {selectedVariant.originalPrice && (
                  <span className="text-sm text-[#998f80] line-through font-mono">
                    Rs. {selectedVariant.originalPrice.toLocaleString()}
                  </span>
                )}
                {product.discountPercentage && (
                  <span className="text-xs font-bold text-white bg-[#b8860b] px-2 py-0.5 rounded-md">
                    Save {product.discountPercentage}%
                  </span>
                )}
              </div>

              {/* Size / Variant Selector */}
              {product.variants.length > 1 && (
                <div className="mb-6">
                  <label className="block text-xs font-bold text-[#1a1612] mb-2 uppercase tracking-wider">
                    Select Size / Bottle Volume:
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    {product.variants.map((v) => (
                      <button
                        key={v.size}
                        onClick={() => setSelectedVariant(v)}
                        className={`p-2.5 rounded-xl text-xs font-bold border transition-all text-left flex items-center justify-between cursor-pointer ${
                          selectedVariant.size === v.size
                            ? 'bg-[#faf2dd] border-[#c59b27] text-[#1a1612] shadow-xs'
                            : 'bg-white border-[#e8dec8] text-[#52493d] hover:border-[#c59b27]'
                        }`}
                      >
                        <span>{v.size}</span>
                        <span className="font-mono text-[#b8860b]">Rs. {v.price.toLocaleString()}</span>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Fragrance Notes Breakdown */}
              {product.notes && (
                <div className="mb-6 space-y-3">
                  <h4 className="text-xs font-bold text-[#1a1612] uppercase tracking-wider flex items-center gap-1.5">
                    <Droplet className="w-3.5 h-3.5 text-[#b8860b]" />
                    <span>Fragrance Notes Pyramid:</span>
                  </h4>
                  <div className="grid grid-cols-3 gap-2">
                    <div className="p-2.5 rounded-xl bg-[#faf7f2] border border-[#e8dec8] text-center">
                      <span className="text-[10px] font-bold text-[#996515] uppercase block mb-1">
                        Top Notes
                      </span>
                      <p className="text-xs text-[#1a1612] font-medium leading-tight">
                        {product.notes.top.map((n) => n.en).join(', ')}
                      </p>
                    </div>

                    <div className="p-2.5 rounded-xl bg-[#faf7f2] border border-[#e8dec8] text-center">
                      <span className="text-[10px] font-bold text-[#996515] uppercase block mb-1">
                        Heart Notes
                      </span>
                      <p className="text-xs text-[#1a1612] font-medium leading-tight">
                        {product.notes.heart.map((n) => n.en).join(', ')}
                      </p>
                    </div>

                    <div className="p-2.5 rounded-xl bg-[#faf7f2] border border-[#e8dec8] text-center">
                      <span className="text-[10px] font-bold text-[#996515] uppercase block mb-1">
                        Base Notes
                      </span>
                      <p className="text-xs text-[#1a1612] font-medium leading-tight">
                        {product.notes.base.map((n) => n.en).join(', ')}
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* Longevity & Sillage Meters */}
              {product.specs && (
                <div className="grid grid-cols-2 gap-3 mb-6 p-3 rounded-2xl bg-[#fcfaf7] border border-[#eee5d3] text-xs">
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-[#b8860b]" />
                    <div>
                      <span className="text-[10px] text-[#736a5c] block">Longevity</span>
                      <span className="font-bold text-[#1a1612]">{product.specs.longevity}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Wind className="w-4 h-4 text-[#b8860b]" />
                    <div>
                      <span className="text-[10px] text-[#736a5c] block">Sillage / Projection</span>
                      <span className="font-bold text-[#1a1612]">{product.specs.sillage}</span>
                    </div>
                  </div>
                </div>
              )}

              {/* Description */}
              <div className="mb-6">
                <p className="text-xs sm:text-sm text-[#52493d] leading-relaxed">
                  {product.descriptionEn}
                </p>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="pt-4 border-t border-[#e8dec8] space-y-2">
              <div className="grid grid-cols-2 gap-3">
                <button
                  onClick={handleAddToCart}
                  className="flex items-center justify-center gap-2 py-3.5 px-4 rounded-xl bg-[#faf6ee] border border-[#d4af37] text-[#1a1612] font-bold text-xs sm:text-sm hover:bg-[#faf2dd] transition-all cursor-pointer shadow-xs active:scale-95"
                >
                  <ShoppingBag className="w-4 h-4 text-[#b8860b]" />
                  <span>{addedToast ? 'Added to Cart!' : 'Add to Cart'}</span>
                </button>

                <button
                  onClick={() => onBuyNow(product, selectedVariant.size)}
                  className="flex items-center justify-center gap-2 py-3.5 px-4 rounded-xl bg-gradient-to-r from-[#d4af37] via-[#e6c352] to-[#c59b27] text-[#1a1612] font-bold text-xs sm:text-sm hover:brightness-105 transition-all cursor-pointer shadow-md active:scale-95"
                >
                  <Zap className="w-4 h-4 text-[#1a1612]" />
                  <span>Buy Now (Express)</span>
                </button>
              </div>

              {/* WhatsApp Quick Order Button */}
              <button
                onClick={handleWhatsAppOrder}
                className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs transition-all cursor-pointer shadow-xs"
              >
                <Phone className="w-4 h-4" />
                <span>Order via WhatsApp (+92 318 2187575)</span>
              </button>
            </div>

          </div>

        </div>
      </div>
    </div>
  );
};
