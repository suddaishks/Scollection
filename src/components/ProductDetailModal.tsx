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
  Layers,
  ChevronRight,
  Droplet
} from 'lucide-react';
import { Product } from '../types';

interface ProductDetailModalProps {
  product: Product | null;
  onClose: () => void;
  onAddToCart: (product: Product, size: string) => void;
  onBuyNow: (product: Product, size: string) => void;
  lang: 'ur' | 'en';
}

export const ProductDetailModal: React.FC<ProductDetailModalProps> = ({
  product,
  onClose,
  onAddToCart,
  onBuyNow,
  lang
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

  const handleWhatsAppInquiry = () => {
    const text = encodeURIComponent(
      `السلام علیکم! میں عطر و ردا سے اس پروڈکٹ کا آرڈر دینا چاہتا ہوں:\n\n*پروڈکٹ:* ${product.nameUr} (${product.nameEn})\n*سائز:* ${selectedVariant.size}\n*قیمت:* PKR ${selectedVariant.price.toLocaleString()}\n\nبراہ کرم ڈیلیوری اور کنفرمیشن کے بارے میں بتائیں۔ شکریہ!`
    );
    window.open(`https://wa.me/923001234567?text=${text}`, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/80 backdrop-blur-md overflow-y-auto">
      <div
        className="relative w-full max-w-4xl bg-[#12141c] border border-[#2b3142] rounded-2xl shadow-2xl text-[#f4efe6] overflow-hidden my-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 end-4 z-20 p-2 rounded-full bg-[#1c202c]/80 hover:bg-[#2b3142] text-[#c5beb0] hover:text-white transition-colors cursor-pointer"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2">
          
          {/* Left Column: Product Gallery */}
          <div className="p-6 bg-[#161922] flex flex-col justify-between border-b md:border-b-0 md:border-e border-[#242938]">
            <div>
              {/* Main Image */}
              <div className="relative aspect-square rounded-xl overflow-hidden bg-[#1f2430] border border-[#2b3142] mb-4">
                <img
                  src={selectedImg}
                  alt={product.nameEn}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover object-center"
                />
                {product.discountPercentage && (
                  <span className="absolute top-3 start-3 bg-[#c82333] text-white text-xs font-bold px-2.5 py-1 rounded shadow">
                    {product.discountPercentage}% OFF
                  </span>
                )}
              </div>

              {/* Gallery Thumbnails */}
              {product.gallery && product.gallery.length > 1 && (
                <div className="flex items-center gap-3">
                  {product.gallery.map((img, idx) => (
                    <button
                      key={idx}
                      onClick={() => setSelectedImg(img)}
                      className={`w-16 h-16 rounded-lg overflow-hidden border-2 transition-all cursor-pointer ${
                        selectedImg === img ? 'border-[#d4af37]' : 'border-transparent opacity-60 hover:opacity-100'
                      }`}
                    >
                      <img src={img} alt="Thumbnail" className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Quick Sunnah & Trust Checklist */}
            <div className="mt-6 pt-6 border-t border-[#252b3b] space-y-2.5 text-xs text-[#a69f91]">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-[#d4af37]" />
                <span>{lang === 'ur' ? '100٪ خالص اور اصلی اجزاء کی ضمانت' : '100% Authentic Quality Guaranteed'}</span>
              </div>
              <div className="flex items-center gap-2">
                <Droplet className="w-4 h-4 text-emerald-400" />
                <span>{lang === 'ur' ? 'الکحل سے پاک خالص عطر (نماز و سنت کے موافق)' : 'Non-Alcoholic Pure Attar (Sunnah Compliant)'}</span>
              </div>
              <div className="flex items-center gap-2">
                <RotateCcw className="w-4 h-4 text-[#d4af37]" />
                <span>{lang === 'ur' ? '7 دن میں غیر مطمئن ہونے پر واپسی یا تبدیلی' : '7 Days Easy Exchange / Money Back Guarantee'}</span>
              </div>
            </div>

          </div>

          {/* Right Column: Details, Fragrance Notes & Actions */}
          <div className="p-6 md:p-8 flex flex-col justify-between max-h-[85vh] overflow-y-auto">
            <div>
              
              {/* Category & Rating */}
              <div className="flex items-center justify-between text-xs text-[#a69f91] mb-2">
                <span className="text-[#d4af37] font-semibold uppercase tracking-wider">
                  {product.category === 'perfume' && (lang === 'ur' ? 'پریمیم پرفیوم' : 'Extrait De Parfum')}
                  {product.category === 'attar' && (lang === 'ur' ? 'خالص روغنی عطر' : 'Pure Concentrated Attar')}
                  {product.category === 'topi' && (lang === 'ur' ? 'دستکاری نماز ٹوپی' : 'Handcrafted Prayer Cap')}
                  {product.category === 'deals' && (lang === 'ur' ? 'شاہی گفٹ باکس' : 'Gift Presentation Set')}
                </span>
                <div className="flex items-center gap-1.5">
                  <div className="flex text-[#d4af37]">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-[#d4af37]" />
                    ))}
                  </div>
                  <span className="font-semibold text-xs text-[#f4efe6] tabular-nums">{product.rating}</span>
                  <span className="text-[11px] text-[#7d776c]">({product.reviewsCount} reviews)</span>
                </div>
              </div>

              {/* Title */}
              <h2 className="text-2xl sm:text-3xl font-bold text-[#f4efe6] font-display mb-1">
                {lang === 'ur' ? product.nameUr : product.nameEn}
              </h2>

              {/* Tagline */}
              <p className="text-xs text-[#d4af37] font-medium mb-3">
                {lang === 'ur' ? product.taglineUr : product.taglineEn}
              </p>

              {/* Price & Discount */}
              <div className="flex items-baseline gap-3 mb-5">
                <span className="text-2xl font-bold text-[#f4efe6] tabular-nums">
                  PKR {selectedVariant.price.toLocaleString()}
                </span>
                {selectedVariant.originalPrice && (
                  <span className="text-sm text-[#7d776c] line-through tabular-nums">
                    PKR {selectedVariant.originalPrice.toLocaleString()}
                  </span>
                )}
                {product.discountPercentage && (
                  <span className="text-xs text-emerald-400 font-semibold">
                    {lang === 'ur' ? `${product.discountPercentage}٪ بچت` : `Save ${product.discountPercentage}%`}
                  </span>
                )}
              </div>

              {/* Description */}
              <p className="text-sm text-[#c5beb0] leading-relaxed mb-6 font-body">
                {lang === 'ur' ? product.descriptionUr : product.descriptionEn}
              </p>

              {/* FRAGRANCE NOTES PYRAMID (Special request by user!) */}
              {product.notes && (
                <div className="mb-6 p-4 rounded-xl bg-[#171a24] border border-[#293040]">
                  <div className="flex items-center gap-2 mb-3 text-[#d4af37]">
                    <Layers className="w-4 h-4" />
                    <h4 className="text-xs font-bold uppercase tracking-wider">
                      {lang === 'ur' ? 'خوشبو کے تمام نوٹس کی مکمل تفصیل (Fragrance Notes Pyramid)' : 'Fragrance Notes Breakdown'}
                    </h4>
                  </div>

                  <div className="space-y-3">
                    {/* Top Notes */}
                    <div className="p-2.5 rounded-lg bg-[#11131a] border border-[#232836]">
                      <div className="flex items-center justify-between text-[11px] font-semibold text-[#f5d77f] mb-1">
                        <span>{lang === 'ur' ? '🌿 ابتدائی نوٹس (Top Notes)' : 'Top Notes (First 15 mins)'}</span>
                        <span className="text-[10px] text-[#8e8778]">{lang === 'ur' ? 'فوری تازگی' : 'Opening Burst'}</span>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {product.notes.top.map((note, idx) => (
                          <span
                            key={idx}
                            className="text-xs text-[#e2ddd3] font-medium"
                          >
                            {lang === 'ur' ? note.ur : note.en}
                            {idx < product.notes!.top.length - 1 && <span className="text-[#52596c] ms-2">/</span>}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Heart Notes */}
                    <div className="p-2.5 rounded-lg bg-[#11131a] border border-[#232836]">
                      <div className="flex items-center justify-between text-[11px] font-semibold text-[#f5d77f] mb-1">
                        <span>{lang === 'ur' ? '🌸 درمیانی نوٹس (Heart / Middle Notes)' : 'Heart Notes (2 - 8 Hours)'}</span>
                        <span className="text-[10px] text-[#8e8778]">{lang === 'ur' ? 'خوشبو کی روح' : 'True Character'}</span>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {product.notes.heart.map((note, idx) => (
                          <span
                            key={idx}
                            className="text-xs text-[#e2ddd3] font-medium"
                          >
                            {lang === 'ur' ? note.ur : note.en}
                            {idx < product.notes!.heart.length - 1 && <span className="text-[#52596c] ms-2">/</span>}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Base Notes */}
                    <div className="p-2.5 rounded-lg bg-[#11131a] border border-[#232836]">
                      <div className="flex items-center justify-between text-[11px] font-semibold text-[#f5d77f] mb-1">
                        <span>{lang === 'ur' ? '🪵 بنیادی نوٹس (Base Notes)' : 'Base Notes (24+ Hours)'}</span>
                        <span className="text-[10px] text-[#8e8778]">{lang === 'ur' ? 'کپڑوں پر دیرپا قیام' : 'Long-Lasting Drydown'}</span>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {product.notes.base.map((note, idx) => (
                          <span
                            key={idx}
                            className="text-xs text-[#e2ddd3] font-medium"
                          >
                            {lang === 'ur' ? note.ur : note.en}
                            {idx < product.notes!.base.length - 1 && <span className="text-[#52596c] ms-2">/</span>}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Sillage & Longevity Meters */}
                  {product.specs && (
                    <div className="grid grid-cols-2 gap-3 mt-3 pt-3 border-t border-[#232836] text-xs">
                      <div className="flex items-center gap-2 text-[#c5beb0]">
                        <Clock className="w-3.5 h-3.5 text-[#d4af37]" />
                        <span>{lang === 'ur' ? `پائیداری: ${product.specs.longevityUr}` : `Longevity: ${product.specs.longevity}`}</span>
                      </div>
                      <div className="flex items-center gap-2 text-[#c5beb0]">
                        <Wind className="w-3.5 h-3.5 text-[#d4af37]" />
                        <span>{lang === 'ur' ? `پھیلاؤ: ${product.specs.sillageUr}` : `Sillage: ${product.specs.sillage}`}</span>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* TOPI SPECIFICATIONS (If category is Topi) */}
              {product.topiSpecs && (
                <div className="mb-6 p-4 rounded-xl bg-[#171a24] border border-[#293040] space-y-2 text-xs">
                  <div className="text-xs font-bold text-[#d4af37] uppercase tracking-wider mb-2">
                    {lang === 'ur' ? 'دستکاری و سائز کی تفصیلات' : 'Cap Craft & Sizing Details'}
                  </div>
                  <div className="flex justify-between py-1 border-b border-[#232836]">
                    <span className="text-[#8e8778]">{lang === 'ur' ? 'کپڑا / فیبرک:' : 'Material:'}</span>
                    <span className="text-[#f4efe6] font-medium">{lang === 'ur' ? product.topiSpecs.materialUr : product.topiSpecs.materialEn}</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-[#232836]">
                    <span className="text-[#8e8778]">{lang === 'ur' ? 'دستکاری کام:' : 'Embroidery:'}</span>
                    <span className="text-[#f4efe6] font-medium">{lang === 'ur' ? product.topiSpecs.craftUr : product.topiSpecs.craftEn}</span>
                  </div>
                  <div className="flex justify-between py-1">
                    <span className="text-[#8e8778]">{lang === 'ur' ? 'سائز کی پیمائش:' : 'Head Size Guide:'}</span>
                    <span className="text-[#f4efe6] font-medium">{lang === 'ur' ? 'ماتھے کے اوپر فیتے سے سر کا گھیراؤ ناپیں' : 'Measure circumference above forehead'}</span>
                  </div>
                </div>
              )}

              {/* Size / Variant Selector */}
              <div className="mb-6">
                <label className="block text-xs font-bold text-[#d4af37] uppercase tracking-wider mb-2.5">
                  {lang === 'ur' ? 'سائز یا بوتل کا انتخاب کریں:' : 'Select Size / Variant:'}
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {product.variants.map((v, i) => (
                    <button
                      key={i}
                      onClick={() => setSelectedVariant(v)}
                      className={`p-2.5 rounded-lg border text-xs text-start transition-all cursor-pointer ${
                        selectedVariant.size === v.size
                          ? 'border-[#d4af37] bg-[#d4af37]/15 text-[#f4efe6] font-bold'
                          : 'border-[#293040] bg-[#14161f] text-[#a69f91] hover:border-[#3b445a]'
                      }`}
                    >
                      <div className="font-semibold truncate">{v.size}</div>
                      <div className="text-[11px] text-[#d4af37] font-mono tabular-nums">
                        PKR {v.price.toLocaleString()}
                      </div>
                    </button>
                  ))}
                </div>
              </div>

            </div>

            {/* Sticky Action Buttons */}
            <div className="pt-4 border-t border-[#252b3b] space-y-3">
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {/* Buy Now Button */}
                <button
                  onClick={() => {
                    onBuyNow(product, selectedVariant.size);
                    onClose();
                  }}
                  className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-[#d4af37] hover:bg-[#e6c352] text-[#0f1115] font-bold shadow-lg shadow-[#d4af37]/20 transition-all cursor-pointer active:scale-98"
                >
                  <Zap className="w-4 h-4 fill-current" />
                  <span>{lang === 'ur' ? 'ابھی خریدیں (Buy Now)' : 'Buy Now'}</span>
                </button>

                {/* Add to Cart Button */}
                <button
                  onClick={handleAddToCart}
                  className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-[#202532] hover:bg-[#2b3244] text-[#f4efe6] font-semibold border border-[#3b4359] transition-all cursor-pointer active:scale-98"
                >
                  {addedToast ? (
                    <>
                      <Check className="w-4 h-4 text-emerald-400" />
                      <span className="text-emerald-300">{lang === 'ur' ? 'کارٹ میں شامل کر دیا گیا!' : 'Added to Cart!'}</span>
                    </>
                  ) : (
                    <>
                      <ShoppingBag className="w-4 h-4" />
                      <span>{lang === 'ur' ? 'کارٹ میں ڈالیں' : 'Add to Cart'}</span>
                    </>
                  )}
                </button>
              </div>

              {/* Direct WhatsApp Order Button */}
              <button
                onClick={handleWhatsAppInquiry}
                className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-[#075e54]/30 hover:bg-[#075e54]/50 text-emerald-300 border border-emerald-600/40 text-xs font-semibold transition-all cursor-pointer"
              >
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span>{lang === 'ur' ? 'واٹس ایپ پر فوری آرڈر دیں (0300-1234567)' : 'Quick Order via WhatsApp'}</span>
              </button>

            </div>

          </div>

        </div>

      </div>
    </div>
  );
};
