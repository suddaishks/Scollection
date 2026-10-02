import React, { useState } from 'react';
import { X, ShoppingBag, Plus, Minus, Trash2, ArrowRight, ArrowLeft, Tag, Truck, ShieldCheck } from 'lucide-react';
import { CartItem } from '../types';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  onUpdateQuantity: (id: string, newQty: number) => void;
  onRemoveItem: (id: string) => void;
  onProceedToCheckout: () => void;
  appliedCoupon: string | null;
  onApplyCoupon: (code: string) => void;
  lang: 'ur' | 'en';
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  cartItems,
  onUpdateQuantity,
  onRemoveItem,
  onProceedToCheckout,
  appliedCoupon,
  onApplyCoupon,
  lang
}) => {
  if (!isOpen) return null;

  const [couponInput, setCouponInput] = useState('');
  const [couponMsg, setCouponMsg] = useState<{ text: string; error: boolean } | null>(null);

  const subtotal = cartItems.reduce((acc, item) => acc + item.unitPrice * item.quantity, 0);
  const freeShippingThreshold = 3000;
  const isFreeShipping = subtotal >= freeShippingThreshold || appliedCoupon === 'FREESHIP';
  const deliveryFee = isFreeShipping ? 0 : 250;

  // Coupon discount calculation
  let discount = 0;
  if (appliedCoupon === 'JUMMAH15') {
    discount = Math.round(subtotal * 0.15);
  } else if (appliedCoupon === 'BUY2GET1') {
    discount = Math.round(subtotal * 0.10);
  }

  const grandTotal = Math.max(0, subtotal - discount + deliveryFee);
  const remainingForFreeShipping = Math.max(0, freeShippingThreshold - subtotal);
  const freeShippingProgress = Math.min(100, (subtotal / freeShippingThreshold) * 100);

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    const code = couponInput.trim().toUpperCase();
    if (!code) return;

    if (code === 'JUMMAH15' || code === 'FREESHIP' || code === 'BUY2GET1') {
      onApplyCoupon(code);
      setCouponMsg({ text: lang === 'ur' ? 'کوپن کامیابی سے لاگو ہو گیا!' : 'Coupon applied successfully!', error: false });
    } else {
      setCouponMsg({ text: lang === 'ur' ? 'غلط کوپن کوڈ ہے، براہ کرم JUMMAH15 آزمائیں۔' : 'Invalid coupon code. Try JUMMAH15', error: true });
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/75 backdrop-blur-xs flex justify-end">
      <div
        className="w-full max-w-md bg-[#13151d] border-s border-[#252b3a] h-full flex flex-col justify-between text-[#f4efe6] shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-[#252b3a] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <ShoppingBag className="w-5 h-5 text-[#d4af37]" />
            <h3 className="font-bold text-lg font-display">
              {lang === 'ur' ? 'آپ کا شاپنگ کارٹ' : 'Your Shopping Bag'}
            </h3>
            <span className="text-xs bg-[#222838] px-2 py-0.5 rounded-full text-[#a69f91] tabular-nums">
              {cartItems.reduce((acc, i) => acc + i.quantity, 0)}
            </span>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg hover:bg-[#202534] text-[#a69f91] hover:text-white transition-colors cursor-pointer"
            aria-label="Close cart"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Free Shipping Progress Indicator */}
        <div className="px-5 py-3 bg-[#191d28] border-b border-[#252b3a]">
          <div className="flex items-center justify-between text-xs mb-1.5">
            <span className="flex items-center gap-1.5 text-[#dcd7cb]">
              <Truck className="w-3.5 h-3.5 text-[#d4af37]" />
              {isFreeShipping
                ? (lang === 'ur' ? 'مبارک ہو! آپ کو مفت ڈیلیوری مل گئی ہے' : 'Congratulations! You unlocked FREE Delivery')
                : (lang === 'ur'
                    ? `صرف PKR ${remainingForFreeShipping.toLocaleString()} مزید اور پائیں مفت ڈیلیوری!`
                    : `Add PKR ${remainingForFreeShipping.toLocaleString()} more for FREE Delivery!`)}
            </span>
            <span className="text-[11px] font-semibold text-[#d4af37] tabular-nums">
              {Math.round(freeShippingProgress)}%
            </span>
          </div>
          <div className="w-full h-1.5 bg-[#252b3a] rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-[#d4af37] to-emerald-400 transition-all duration-300"
              style={{ width: `${freeShippingProgress}%` }}
            />
          </div>
        </div>

        {/* Items List */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-4">
          {cartItems.length === 0 ? (
            <div className="text-center py-16 text-[#8e8778] space-y-3">
              <ShoppingBag className="w-12 h-12 mx-auto stroke-1 opacity-40" />
              <p className="text-sm">
                {lang === 'ur' ? 'آپ کا کارٹ ابھی خالی ہے۔' : 'Your shopping bag is empty.'}
              </p>
              <button
                onClick={onClose}
                className="mt-2 text-xs font-semibold text-[#d4af37] hover:underline"
              >
                {lang === 'ur' ? 'خوشبوئیں اور ٹوپیاں دیکھیں' : 'Browse Fragrances & Caps'}
              </button>
            </div>
          ) : (
            cartItems.map((item) => (
              <div
                key={item.id}
                className="flex gap-3 bg-[#171b25] border border-[#262c3c] rounded-xl p-3"
              >
                <img
                  src={item.image}
                  alt={item.nameEn}
                  referrerPolicy="no-referrer"
                  className="w-18 h-18 rounded-lg object-cover bg-[#222838] shrink-0"
                />

                <div className="flex-1 flex flex-col justify-between">
                  <div className="flex items-start justify-between gap-1">
                    <div>
                      <h4 className="text-sm font-bold text-[#f4efe6] line-clamp-1">
                        {lang === 'ur' ? item.nameUr : item.nameEn}
                      </h4>
                      <p className="text-xs text-[#d4af37] font-medium">
                        {item.selectedSize}
                      </p>
                    </div>

                    <button
                      onClick={() => onRemoveItem(item.id)}
                      className="text-[#6d7488] hover:text-[#c82333] transition-colors p-1 cursor-pointer"
                      title="Remove item"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  <div className="flex items-center justify-between pt-2">
                    <span className="text-xs font-bold text-[#f4efe6] tabular-nums">
                      PKR {(item.unitPrice * item.quantity).toLocaleString()}
                    </span>

                    {/* Quantity Selector */}
                    <div className="flex items-center gap-2 bg-[#101218] border border-[#2c3344] rounded-lg px-2 py-0.5">
                      <button
                        onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
                        className="text-[#a69f91] hover:text-white p-0.5 cursor-pointer"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="text-xs font-bold tabular-nums min-w-[16px] text-center">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                        className="text-[#a69f91] hover:text-white p-0.5 cursor-pointer"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>
                  </div>

                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer & Checkout Area */}
        {cartItems.length > 0 && (
          <div className="p-4 sm:p-5 bg-[#171a24] border-t border-[#252b3a] space-y-3">
            
            {/* Promo Code Form */}
            <form onSubmit={handleApplyCoupon} className="flex gap-2">
              <div className="relative flex-1">
                <Tag className="w-3.5 h-3.5 absolute start-3 top-1/2 -translate-y-1/2 text-[#8e8778]" />
                <input
                  type="text"
                  placeholder={lang === 'ur' ? 'کوپن کوڈ (مثلاً JUMMAH15)' : 'Promo Code (e.g. JUMMAH15)'}
                  value={couponInput}
                  onChange={(e) => setCouponInput(e.target.value)}
                  className="w-full bg-[#101218] border border-[#2d3446] rounded-lg ps-8 pe-3 py-1.5 text-xs text-[#f4efe6] uppercase placeholder:normal-case placeholder:text-[#676f82] focus:outline-none focus:border-[#d4af37]"
                />
              </div>
              <button
                type="submit"
                className="px-3 py-1.5 bg-[#252c3c] hover:bg-[#d4af37] hover:text-[#0f1115] text-[#dcd7cb] text-xs font-semibold rounded-lg transition-colors cursor-pointer"
              >
                {lang === 'ur' ? 'لاگو کریں' : 'Apply'}
              </button>
            </form>

            {couponMsg && (
              <p className={`text-[11px] ${couponMsg.error ? 'text-red-400' : 'text-emerald-400'}`}>
                {couponMsg.text}
              </p>
            )}

            {/* Calculations Breakdown */}
            <div className="space-y-1.5 text-xs pt-1">
              <div className="flex justify-between text-[#a69f91]">
                <span>{lang === 'ur' ? 'ذیلی کل (Subtotal):' : 'Subtotal:'}</span>
                <span className="font-mono tabular-nums text-[#dcd7cb]">PKR {subtotal.toLocaleString()}</span>
              </div>

              {discount > 0 && (
                <div className="flex justify-between text-emerald-400">
                  <span>{lang === 'ur' ? `کوپن رعایت (${appliedCoupon}):` : `Discount (${appliedCoupon}):`}</span>
                  <span className="font-mono tabular-nums">-PKR {discount.toLocaleString()}</span>
                </div>
              )}

              <div className="flex justify-between text-[#a69f91]">
                <span>{lang === 'ur' ? 'ڈیلیوری فیس (Courier):' : 'Delivery Fee:'}</span>
                <span className="font-mono tabular-nums text-[#dcd7cb]">
                  {deliveryFee === 0
                    ? (lang === 'ur' ? 'مفت (FREE)' : 'FREE')
                    : `PKR ${deliveryFee}`}
                </span>
              </div>

              <div className="flex justify-between text-sm font-bold text-[#f4efe6] pt-2 border-t border-[#262c3c]">
                <span>{lang === 'ur' ? 'کل قابلِ ادائیگی رقم:' : 'Total Amount:'}</span>
                <span className="text-base text-[#d4af37] font-mono tabular-nums">
                  PKR {grandTotal.toLocaleString()}
                </span>
              </div>
            </div>

            {/* Checkout Button */}
            <button
              onClick={() => {
                onClose();
                onProceedToCheckout();
              }}
              className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-[#d4af37] hover:bg-[#e6c352] text-[#0f1115] font-bold shadow-lg transition-all cursor-pointer active:scale-98"
            >
              <span>{lang === 'ur' ? 'چیک آؤٹ اور ترسیل فارم' : 'Proceed to Checkout'}</span>
              {lang === 'ur' ? <ArrowLeft className="w-4 h-4" /> : <ArrowRight className="w-4 h-4" />}
            </button>

            <div className="text-center text-[11px] text-[#7d776c] flex items-center justify-center gap-2">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
              <span>{lang === 'ur' ? 'کیش آن ڈیلیوری، ایزی پیسہ و جاز کیش' : 'COD, Easypaisa, JazzCash Supported'}</span>
            </div>

          </div>
        )}

      </div>
    </div>
  );
};
