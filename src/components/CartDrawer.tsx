import React, { useState } from 'react';
import { X, ShoppingBag, Plus, Minus, Trash2, ArrowRight, Tag, Truck, ShieldCheck, Check } from 'lucide-react';
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
}) => {
  if (!isOpen) return null;

  const [couponInput, setCouponInput] = useState('');
  const [couponMsg, setCouponMsg] = useState<{ text: string; error: boolean } | null>(null);

  const subtotal = cartItems.reduce((acc, item) => acc + item.unitPrice * item.quantity, 0);
  const freeShippingThreshold = 5000;
  const isFreeShipping = subtotal >= freeShippingThreshold || appliedCoupon === 'FREESHIP';
  const deliveryFee = isFreeShipping ? 0 : 250;

  // Coupon discount calculation
  let discount = 0;
  if (appliedCoupon === 'WELCOME500' && subtotal >= 3000) {
    discount = 500;
  } else if (appliedCoupon === 'ROYAL1000' && subtotal >= 6000) {
    discount = 1000;
  } else if (appliedCoupon === 'JUMMAH10') {
    discount = Math.round(subtotal * 0.10);
  }

  const grandTotal = Math.max(0, subtotal - discount + deliveryFee);
  const remainingForFreeShipping = Math.max(0, freeShippingThreshold - subtotal);
  const freeShippingProgress = Math.min(100, (subtotal / freeShippingThreshold) * 100);

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    const code = couponInput.trim().toUpperCase();
    if (!code) return;

    if (code === 'WELCOME500' || code === 'ROYAL1000' || code === 'JUMMAH10' || code === 'FREESHIP') {
      onApplyCoupon(code);
      setCouponMsg({ text: `Coupon ${code} applied successfully!`, error: false });
    } else {
      setCouponMsg({ text: 'Invalid coupon. Try WELCOME500 or JUMMAH10', error: true });
    }
    setTimeout(() => setCouponMsg(null), 3500);
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/60 backdrop-blur-xs">
      <div
        className="w-full max-w-md bg-white border-l border-[#e8dec8] h-full flex flex-col justify-between shadow-2xl text-[#1a1612]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Drawer Header */}
        <div className="p-5 border-b border-[#e8dec8] flex items-center justify-between bg-[#faf7f2]">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-[#faf2dd] text-[#996515] border border-[#d4af37]/30">
              <ShoppingBag className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-base text-[#1a1612] font-display">Your Shopping Bag</h3>
              <p className="text-xs text-[#736a5c]">
                {cartItems.length} {cartItems.length === 1 ? 'item' : 'items'} selected
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl text-[#736a5c] hover:text-[#1a1612] hover:bg-[#ede6d8] transition-colors cursor-pointer"
            aria-label="Close cart"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Free Shipping Progress Indicator */}
        <div className="px-5 py-3 bg-[#fdfaf5] border-b border-[#eee5d3] text-xs">
          <div className="flex items-center justify-between text-[#52493d] mb-1.5 font-medium">
            <span className="flex items-center gap-1.5">
              <Truck className="w-3.5 h-3.5 text-[#b8860b]" />
              {isFreeShipping ? (
                <span className="font-bold text-emerald-700">🎉 Congratulations! You unlocked Free Delivery!</span>
              ) : (
                <span>Add <strong>Rs. {remainingForFreeShipping.toLocaleString()}</strong> more for Free Shipping</span>
              )}
            </span>
            <span className="font-bold text-[#b8860b]">{Math.round(freeShippingProgress)}%</span>
          </div>
          <div className="w-full h-1.5 bg-[#e8dec8] rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-[#d4af37] to-[#b8860b] transition-all duration-500 rounded-full"
              style={{ width: `${freeShippingProgress}%` }}
            />
          </div>
        </div>

        {/* Cart Items List */}
        <div className="flex-1 overflow-y-auto p-5 space-y-4">
          {cartItems.length === 0 ? (
            <div className="py-20 text-center text-[#8c8273] space-y-3">
              <ShoppingBag className="w-12 h-12 mx-auto text-[#dcd2be]" />
              <h4 className="text-base font-bold text-[#1a1612]">Your Bag is Empty</h4>
              <p className="text-xs text-[#736a5c]">
                Explore our luxury perfumes, concentrated attars, and handcrafted caps to add items.
              </p>
            </div>
          ) : (
            cartItems.map((item) => (
              <div
                key={item.id}
                className="flex items-center gap-3 p-3 rounded-2xl bg-[#faf7f2] border border-[#e8dec8] hover:border-[#c59b27] transition-all"
              >
                {/* Product thumbnail */}
                <div className="w-16 h-16 rounded-xl overflow-hidden bg-white border border-[#e8dec8] shrink-0">
                  <img
                    src={item.image}
                    alt={item.nameEn}
                    className="w-full h-full object-cover object-center"
                  />
                </div>

                {/* Details */}
                <div className="flex-1 min-w-0">
                  <h4 className="font-bold text-xs sm:text-sm text-[#1a1612] truncate font-display">
                    {item.nameEn}
                  </h4>
                  <div className="text-[11px] text-[#736a5c] mb-1.5 flex items-center gap-2">
                    <span>Size: {item.selectedSize}</span>
                    <span className="text-[#a69c8c]">•</span>
                    <span className="font-mono font-bold text-[#b8860b]">
                      Rs. {item.unitPrice.toLocaleString()}
                    </span>
                  </div>

                  {/* Quantity controls */}
                  <div className="flex items-center gap-2">
                    <div className="flex items-center border border-[#dcd2be] rounded-lg bg-white">
                      <button
                        onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
                        className="p-1 text-[#736a5c] hover:text-[#1a1612] cursor-pointer"
                        aria-label="Decrease quantity"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="px-2 text-xs font-bold text-[#1a1612] font-mono">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                        className="p-1 text-[#736a5c] hover:text-[#1a1612] cursor-pointer"
                        aria-label="Increase quantity"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>

                    <button
                      onClick={() => onRemoveItem(item.id)}
                      className="p-1 text-red-500 hover:text-red-700 ml-auto cursor-pointer"
                      title="Remove Item"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer Checkout Summary */}
        {cartItems.length > 0 && (
          <div className="p-5 border-t border-[#e8dec8] bg-[#faf7f2] space-y-3">
            
            {/* Promo Code Form */}
            <form onSubmit={handleApplyCoupon} className="flex gap-2">
              <div className="relative flex-1">
                <Tag className="w-3.5 h-3.5 text-[#b8860b] absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Enter Voucher Code..."
                  value={couponInput}
                  onChange={(e) => setCouponInput(e.target.value)}
                  className="w-full bg-white border border-[#dcd2be] rounded-xl pl-9 pr-3 py-2 text-xs text-[#1a1612] placeholder:text-[#8c8273] focus:outline-none focus:border-[#b8860b] font-mono"
                />
              </div>
              <button
                type="submit"
                className="px-4 py-2 rounded-xl bg-[#1a1612] text-white font-bold text-xs hover:bg-[#c59b27] transition-all cursor-pointer"
              >
                Apply
              </button>
            </form>

            {couponMsg && (
              <p className={`text-xs ${couponMsg.error ? 'text-red-600' : 'text-emerald-700 font-bold'}`}>
                {couponMsg.text}
              </p>
            )}

            {appliedCoupon && (
              <div className="flex items-center justify-between text-xs text-[#996515] bg-[#faf2dd] p-2 rounded-xl border border-[#d4af37]/30">
                <span className="flex items-center gap-1">
                  <Check className="w-3 h-3 text-emerald-600" />
                  <span>Promo <strong>{appliedCoupon}</strong> active</span>
                </span>
                <span className="font-bold">- Rs. {discount.toLocaleString()}</span>
              </div>
            )}

            {/* Calculations Breakdown */}
            <div className="space-y-1.5 text-xs text-[#52493d] pt-2">
              <div className="flex justify-between">
                <span>Subtotal:</span>
                <span className="font-mono text-[#1a1612]">Rs. {subtotal.toLocaleString()}</span>
              </div>

              {discount > 0 && (
                <div className="flex justify-between text-emerald-700 font-medium">
                  <span>Coupon Discount:</span>
                  <span className="font-mono">- Rs. {discount.toLocaleString()}</span>
                </div>
              )}

              <div className="flex justify-between items-center">
                <span>Estimated Delivery Fee:</span>
                <span className="font-mono">
                  {deliveryFee === 0 ? (
                    <strong className="text-emerald-700">FREE (Orders &gt; 5k)</strong>
                  ) : (
                    <span className="text-xs font-semibold text-[#8b6508]">
                      Rs. 150 (Khi) / Rs. 250 (Isb/Pjb) / Rs. 300 (KPK)
                    </span>
                  )}
                </span>
              </div>

              <div className="flex justify-between text-base font-bold text-[#1a1612] pt-2 border-t border-[#e8dec8]">
                <span>Total Amount:</span>
                <span className="font-mono text-lg text-[#b8860b]">
                  Rs. {grandTotal.toLocaleString()}
                </span>
              </div>
            </div>

            {/* Checkout Action Button */}
            <button
              onClick={() => {
                onClose();
                onProceedToCheckout();
              }}
              className="w-full flex items-center justify-center gap-2 py-3.5 rounded-xl bg-gradient-to-r from-[#d4af37] via-[#e6c352] to-[#c59b27] text-[#1a1612] font-bold text-sm hover:brightness-105 transition-all shadow-md active:scale-95 cursor-pointer"
            >
              <span>Proceed to Checkout</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <div className="flex items-center justify-center gap-2 text-[11px] text-[#736a5c]">
              <ShieldCheck className="w-3.5 h-3.5 text-[#b8860b]" />
              <span>Cash on Delivery & Easypaisa Accepted</span>
            </div>

          </div>
        )}

      </div>
    </div>
  );
};
