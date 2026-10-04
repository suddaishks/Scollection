import React, { useState } from 'react';
import {
  X,
  ShieldCheck,
  Banknote,
  Smartphone,
  CheckCircle2,
  Truck,
  Phone,
  Clock,
  ArrowRight,
  Copy,
  Check,
  MapPin
} from 'lucide-react';
import { CartItem, OrderCustomerInfo, OrderRecord, PaymentMethod, RiderStatus } from '../types';
import { PAKISTAN_CITIES } from '../data/products';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  onOrderCompleted: (order: OrderRecord) => void;
  appliedCoupon: string | null;
}

export const CheckoutModal: React.FC<CheckoutModalProps> = ({
  isOpen,
  onClose,
  cartItems,
  onOrderCompleted,
  appliedCoupon,
}) => {
  if (!isOpen) return null;

  const subtotal = cartItems.reduce((acc, item) => acc + item.unitPrice * item.quantity, 0);
  const isFreeShipping = subtotal >= 5000 || appliedCoupon === 'FREESHIP';
  const deliveryFee = isFreeShipping ? 0 : 250;

  let discount = 0;
  if (appliedCoupon === 'WELCOME500' && subtotal >= 3000) {
    discount = 500;
  } else if (appliedCoupon === 'ROYAL1000' && subtotal >= 6000) {
    discount = 1000;
  } else if (appliedCoupon === 'JUMMAH10') {
    discount = Math.round(subtotal * 0.10);
  }
  const grandTotal = Math.max(0, subtotal - discount + deliveryFee);

  const [formData, setFormData] = useState<OrderCustomerInfo>({
    fullName: '',
    phone: '',
    whatsappPhone: '',
    city: PAKISTAN_CITIES[0] || 'Karachi',
    address: '',
    notes: '',
    paymentMethod: 'cod',
    transactionId: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [completedOrder, setCompletedOrder] = useState<OrderRecord | null>(null);
  const [copiedAccount, setCopiedAccount] = useState<string | null>(null);

  const copyToClipboard = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopiedAccount(key);
    setTimeout(() => setCopiedAccount(null), 2500);
  };

  const handleSubmitOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.fullName.trim() || !formData.phone.trim() || !formData.address.trim()) {
      alert('Please fill in your name, phone number and delivery address.');
      return;
    }

    setIsSubmitting(true);

    const randomId = `SUD-${Math.floor(100000 + Math.random() * 900000)}`;
    const randomTracking = `TCS-${Math.floor(10000000 + Math.random() * 90000000)}`;

    const rider: RiderStatus = {
      status: 'confirmed',
      statusUr: 'آرڈر تصدیق شدہ',
      riderName: 'Muhammad Bilal',
      riderPhone: '0318-2187575',
      vehicleNo: 'KHI-7892',
      courier: 'TCS / Leopards Express',
      trackingNo: randomTracking,
      estimatedDelivery: '24-48 Hours (Standard Delivery)',
      currentLocation: `${formData.city} Hub Warehouse`
    };

    const newOrder: OrderRecord = {
      id: randomId,
      createdAt: new Date().toISOString(),
      customer: { ...formData },
      items: [...cartItems],
      subtotal,
      discount,
      deliveryFee,
      total: grandTotal,
      couponCode: appliedCoupon || undefined,
      rider
    };

    setTimeout(() => {
      setIsSubmitting(false);
      setCompletedOrder(newOrder);
      onOrderCompleted(newOrder);

      // Save order to history
      try {
        const historyStr = localStorage.getItem('suddais_order_history');
        const history: OrderRecord[] = historyStr ? JSON.parse(historyStr) : [];
        history.unshift(newOrder);
        localStorage.setItem('suddais_order_history', JSON.stringify(history));
      } catch (err) {
        console.error(err);
      }
    }, 1200);
  };

  const handleWhatsAppDirectCheckout = () => {
    const itemsList = cartItems
      .map((item, idx) => `${idx + 1}. ${item.nameEn} (${item.selectedSize}) x${item.quantity} - Rs. ${(item.unitPrice * item.quantity).toLocaleString()}`)
      .join('\n');

    const msg = encodeURIComponent(
      `Hello Suddais Collection! I would like to place an order:\n\n*Customer Details:*\nName: ${formData.fullName || 'Not specified'}\nPhone: ${formData.phone || 'Not specified'}\nCity: ${formData.city}\nAddress: ${formData.address || 'To be shared'}\nPayment: ${formData.paymentMethod.toUpperCase()}\n\n*Order Items:*\n${itemsList}\n\n*Subtotal:* Rs. ${subtotal.toLocaleString()}\n*Discount:* Rs. ${discount.toLocaleString()}\n*Delivery Fee:* ${deliveryFee === 0 ? 'FREE' : `Rs. ${deliveryFee}`}\n*Total Payable:* Rs. ${grandTotal.toLocaleString()}\n\nPlease confirm my order. Thank you!`
    );

    window.open(`https://wa.me/923182187575?text=${msg}`, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/60 backdrop-blur-sm overflow-y-auto">
      <div
        className="relative w-full max-w-2xl bg-white border border-[#e8dec8] rounded-3xl shadow-2xl text-[#1a1612] overflow-hidden my-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-5 sm:p-6 bg-[#faf7f2] border-b border-[#e8dec8] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-2xl bg-[#faf2dd] text-[#996515] border border-[#d4af37]/30">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg sm:text-xl font-bold text-[#1a1612] font-display">
                {completedOrder ? 'Order Confirmed!' : 'Secure Express Checkout'}
              </h3>
              <p className="text-xs text-[#736a5c]">
                {completedOrder
                  ? 'Your parcel is being packaged with utmost care.'
                  : 'Fast dispatch across Pakistan with Cash on Delivery & Easypaisa'}
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl text-[#736a5c] hover:text-[#1a1612] hover:bg-[#ede6d8] transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-5 sm:p-6 max-h-[80vh] overflow-y-auto">
          {completedOrder ? (
            /* Order Placed Success Screen */
            <div className="space-y-6">
              <div className="p-6 rounded-2xl bg-[#f4fbf7] border border-emerald-500/30 text-center space-y-2">
                <CheckCircle2 className="w-12 h-12 text-emerald-600 mx-auto" />
                <h4 className="text-xl font-bold text-[#1a1612] font-display">
                  Thank You for Your Order!
                </h4>
                <p className="text-xs text-[#52493d]">
                  Your order has been recorded successfully. Our team will verify and dispatch within 24 hours.
                </p>
                <div className="inline-block mt-2 px-4 py-1.5 rounded-full bg-white border border-emerald-400 text-xs font-mono font-bold text-emerald-800 shadow-xs">
                  Order ID: {completedOrder.id}
                </div>
              </div>

              {/* Courier & Rider Assignment Details */}
              <div className="p-5 rounded-2xl bg-[#faf7f2] border border-[#e8dec8] space-y-3">
                <div className="flex items-center justify-between pb-3 border-b border-[#e8dec8]">
                  <div className="flex items-center gap-2">
                    <Truck className="w-4 h-4 text-[#b8860b]" />
                    <span className="font-bold text-xs uppercase tracking-wider text-[#1a1612]">
                      Assigned Courier & Rider
                    </span>
                  </div>
                  <span className="text-xs font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-full">
                    Confirmed
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-3 text-xs text-[#52493d]">
                  <div>
                    <span className="text-[#8c8273] block text-[11px]">Courier Partner:</span>
                    <span className="font-bold text-[#1a1612]">{completedOrder.rider.courier}</span>
                  </div>
                  <div>
                    <span className="text-[#8c8273] block text-[11px]">Tracking Number:</span>
                    <span className="font-mono font-bold text-[#b8860b]">{completedOrder.rider.trackingNo}</span>
                  </div>
                  <div>
                    <span className="text-[#8c8273] block text-[11px]">Rider Contact:</span>
                    <span className="font-bold text-[#1a1612]">{completedOrder.rider.riderPhone}</span>
                  </div>
                  <div>
                    <span className="text-[#8c8273] block text-[11px]">Estimated Delivery:</span>
                    <span className="font-bold text-[#1a1612]">{completedOrder.rider.estimatedDelivery}</span>
                  </div>
                </div>
              </div>

              {/* Items Summary */}
              <div className="space-y-2">
                <h5 className="text-xs font-bold text-[#1a1612] uppercase tracking-wider">
                  Ordered Products ({completedOrder.items.length})
                </h5>
                <div className="space-y-2 max-h-40 overflow-y-auto pr-1">
                  {completedOrder.items.map((it) => (
                    <div
                      key={it.id}
                      className="flex items-center justify-between text-xs p-2.5 rounded-xl bg-[#faf7f2] border border-[#e8dec8]"
                    >
                      <span className="font-medium text-[#1a1612] truncate max-w-[280px]">
                        {it.nameEn} ({it.selectedSize}) x{it.quantity}
                      </span>
                      <span className="font-mono font-bold text-[#b8860b]">
                        Rs. {(it.unitPrice * it.quantity).toLocaleString()}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-2 flex flex-col sm:flex-row gap-3">
                <button
                  onClick={handleWhatsAppDirectCheckout}
                  className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs cursor-pointer shadow-xs"
                >
                  <Phone className="w-4 h-4" />
                  <span>Send Confirmation on WhatsApp</span>
                </button>

                <button
                  onClick={onClose}
                  className="px-6 py-3 rounded-xl bg-[#1a1612] hover:bg-[#c59b27] text-white font-bold text-xs cursor-pointer"
                >
                  Continue Shopping
                </button>
              </div>
            </div>
          ) : (
            /* Checkout Form */
            <form onSubmit={handleSubmitOrder} className="space-y-6">
              
              {/* Order Items Review */}
              <div className="p-4 rounded-2xl bg-[#faf7f2] border border-[#e8dec8] space-y-2">
                <div className="flex items-center justify-between pb-2 border-b border-[#e8dec8] text-xs font-bold text-[#1a1612]">
                  <span>Items in this Order ({cartItems.length}):</span>
                  <span className="font-mono text-[#b8860b]">Total: Rs. {grandTotal.toLocaleString()}</span>
                </div>
                <div className="space-y-1.5 max-h-32 overflow-y-auto pr-1 text-xs text-[#52493d]">
                  {cartItems.map((item) => (
                    <div key={item.id} className="flex justify-between items-center">
                      <span className="truncate max-w-[280px]">
                        {item.nameEn} ({item.selectedSize}) x{item.quantity}
                      </span>
                      <span className="font-mono text-[#1a1612]">
                        Rs. {(item.unitPrice * item.quantity).toLocaleString()}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Customer Contact Details */}
              <div className="space-y-3">
                <h4 className="text-xs font-bold text-[#1a1612] uppercase tracking-wider flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-[#b8860b]" />
                  <span>Shipping & Contact Information</span>
                </h4>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs text-[#52493d] mb-1 font-medium">Full Name *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Suddais Ahmed"
                      value={formData.fullName}
                      onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                      className="w-full bg-[#faf7f2] border border-[#dcd2be] rounded-xl px-3 py-2 text-xs text-[#1a1612] focus:outline-none focus:border-[#b8860b]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs text-[#52493d] mb-1 font-medium">Contact Phone Number *</label>
                    <input
                      type="tel"
                      required
                      placeholder="0318-2187575"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full bg-[#faf7f2] border border-[#dcd2be] rounded-xl px-3 py-2 text-xs text-[#1a1612] focus:outline-none focus:border-[#b8860b]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs text-[#52493d] mb-1 font-medium">Destination City *</label>
                    <select
                      value={formData.city}
                      onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                      className="w-full bg-[#faf7f2] border border-[#dcd2be] rounded-xl px-3 py-2 text-xs text-[#1a1612] focus:outline-none focus:border-[#b8860b]"
                    >
                      {PAKISTAN_CITIES.map((c) => (
                        <option key={c} value={c}>{c}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs text-[#52493d] mb-1 font-medium">WhatsApp Number (Optional)</label>
                    <input
                      type="tel"
                      placeholder="For real-time delivery status updates"
                      value={formData.whatsappPhone}
                      onChange={(e) => setFormData({ ...formData, whatsappPhone: e.target.value })}
                      className="w-full bg-[#faf7f2] border border-[#dcd2be] rounded-xl px-3 py-2 text-xs text-[#1a1612] focus:outline-none focus:border-[#b8860b]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs text-[#52493d] mb-1 font-medium">Complete Street Address / House / Office *</label>
                  <textarea
                    required
                    rows={2}
                    placeholder="House/Apartment #, Street, Sector/Area, Landmark..."
                    value={formData.address}
                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                    className="w-full bg-[#faf7f2] border border-[#dcd2be] rounded-xl px-3 py-2 text-xs text-[#1a1612] focus:outline-none focus:border-[#b8860b]"
                  />
                </div>
              </div>

              {/* Payment Method Selection */}
              <div className="space-y-3">
                <h4 className="text-xs font-bold text-[#1a1612] uppercase tracking-wider">
                  Payment Method
                </h4>

                <div className="grid grid-cols-3 gap-2">
                  {/* COD */}
                  <label
                    className={`flex flex-col items-center justify-center p-3 rounded-2xl border text-center cursor-pointer transition-all ${
                      formData.paymentMethod === 'cod'
                        ? 'bg-[#faf2dd] border-[#c59b27] text-[#1a1612] shadow-xs'
                        : 'bg-[#faf7f2] border-[#e8dec8] text-[#52493d] hover:border-[#c59b27]'
                    }`}
                  >
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="cod"
                      checked={formData.paymentMethod === 'cod'}
                      onChange={() => setFormData({ ...formData, paymentMethod: 'cod' })}
                      className="sr-only"
                    />
                    <Banknote className="w-5 h-5 text-[#b8860b] mb-1" />
                    <span className="font-bold text-xs">Cash on Delivery</span>
                    <span className="text-[10px] text-[#736a5c]">Pay on Arrival</span>
                  </label>

                  {/* Easypaisa */}
                  <label
                    className={`flex flex-col items-center justify-center p-3 rounded-2xl border text-center cursor-pointer transition-all ${
                      formData.paymentMethod === 'easypaisa'
                        ? 'bg-[#faf2dd] border-[#c59b27] text-[#1a1612] shadow-xs'
                        : 'bg-[#faf7f2] border-[#e8dec8] text-[#52493d] hover:border-[#c59b27]'
                    }`}
                  >
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="easypaisa"
                      checked={formData.paymentMethod === 'easypaisa'}
                      onChange={() => setFormData({ ...formData, paymentMethod: 'easypaisa' })}
                      className="sr-only"
                    />
                    <Smartphone className="w-5 h-5 text-emerald-600 mb-1" />
                    <span className="font-bold text-xs">Easypaisa</span>
                    <span className="text-[10px] text-[#736a5c]">Mobile Wallet</span>
                  </label>

                  {/* JazzCash */}
                  <label
                    className={`flex flex-col items-center justify-center p-3 rounded-2xl border text-center cursor-pointer transition-all ${
                      formData.paymentMethod === 'jazzcash'
                        ? 'bg-[#faf2dd] border-[#c59b27] text-[#1a1612] shadow-xs'
                        : 'bg-[#faf7f2] border-[#e8dec8] text-[#52493d] hover:border-[#c59b27]'
                    }`}
                  >
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="jazzcash"
                      checked={formData.paymentMethod === 'jazzcash'}
                      onChange={() => setFormData({ ...formData, paymentMethod: 'jazzcash' })}
                      className="sr-only"
                    />
                    <Smartphone className="w-5 h-5 text-red-600 mb-1" />
                    <span className="font-bold text-xs">JazzCash</span>
                    <span className="text-[10px] text-[#736a5c]">Instant Transfer</span>
                  </label>
                </div>

                {/* Easypaisa / JazzCash Account Details */}
                {(formData.paymentMethod === 'easypaisa' || formData.paymentMethod === 'jazzcash') && (
                  <div className="p-4 rounded-2xl bg-[#faf2dd] border border-[#d4af37]/40 space-y-3">
                    <div className="flex items-center justify-between text-xs">
                      <div>
                        <span className="text-[11px] text-[#8c7853] block">Account Title:</span>
                        <strong className="text-sm text-[#1a1612]">Suddais Ahmed</strong>
                      </div>
                      <div className="text-right">
                        <span className="text-[11px] text-[#8c7853] block">Account Number:</span>
                        <div className="flex items-center gap-1.5">
                          <strong className="font-mono text-sm text-[#1a1612]">0318-2187575</strong>
                          <button
                            type="button"
                            onClick={() => copyToClipboard('03182187575', 'acc')}
                            className="p-1 rounded bg-white text-[#996515] border border-[#d4af37]/40 text-[10px] hover:bg-[#faf6ee] cursor-pointer"
                          >
                            {copiedAccount === 'acc' ? <Check className="w-3 h-3 text-emerald-600" /> : <Copy className="w-3 h-3" />}
                          </button>
                        </div>
                      </div>
                    </div>

                    <div>
                      <label className="block text-[11px] text-[#52493d] mb-1 font-medium">
                        Transaction ID (TID / Reference) after sending:
                      </label>
                      <input
                        type="text"
                        placeholder="Enter TID (e.g. 10482910482)"
                        value={formData.transactionId || ''}
                        onChange={(e) => setFormData({ ...formData, transactionId: e.target.value })}
                        className="w-full bg-white border border-[#dcd2be] rounded-xl px-3 py-1.5 text-xs text-[#1a1612] font-mono focus:outline-none focus:border-[#b8860b]"
                      />
                    </div>
                  </div>
                )}
              </div>

              {/* Submit Buttons */}
              <div className="pt-2 space-y-2">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full flex items-center justify-center gap-2 py-4 rounded-xl bg-gradient-to-r from-[#d4af37] via-[#e6c352] to-[#c59b27] text-[#1a1612] font-bold text-sm hover:brightness-105 transition-all shadow-md active:scale-95 cursor-pointer disabled:opacity-50"
                >
                  {isSubmitting ? (
                    <span>Confirming Order...</span>
                  ) : (
                    <>
                      <span>Confirm Order (Rs. {grandTotal.toLocaleString()})</span>
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>

                {/* Instant WhatsApp Order Option */}
                <button
                  type="button"
                  onClick={handleWhatsAppDirectCheckout}
                  className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs transition-all cursor-pointer shadow-xs"
                >
                  <Phone className="w-4 h-4" />
                  <span>Send Order Directly on WhatsApp (+92 318 2187575)</span>
                </button>
              </div>

            </form>
          )}
        </div>

      </div>
    </div>
  );
};
