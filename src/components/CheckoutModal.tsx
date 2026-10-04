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
  MapPin,
  Sparkles,
  MessageCircle,
  HelpCircle
} from 'lucide-react';
import { CartItem, OrderCustomerInfo, OrderRecord, PaymentMethod, RiderStatus } from '../types';
import {
  DELIVERY_ZONES,
  getCityDeliveryInfo,
  calculateDeliveryFee,
  FREE_DELIVERY_THRESHOLD
} from '../data/deliveryRates';
import { saveOrderToStore } from '../data/orderStore';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  onOrderCompleted: (order: OrderRecord) => void;
  appliedCoupon: string | null;
  onOpenTracker?: () => void;
}

export const CheckoutModal: React.FC<CheckoutModalProps> = ({
  isOpen,
  onClose,
  cartItems,
  onOrderCompleted,
  appliedCoupon,
  onOpenTracker,
}) => {
  if (!isOpen) return null;

  const [formData, setFormData] = useState<OrderCustomerInfo>({
    fullName: '',
    phone: '',
    whatsappPhone: '',
    city: DELIVERY_ZONES[0].name,
    address: '',
    notes: '',
    paymentMethod: 'cod',
    transactionId: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [completedOrder, setCompletedOrder] = useState<OrderRecord | null>(null);
  const [copiedAccount, setCopiedAccount] = useState<string | null>(null);

  const subtotal = cartItems.reduce((acc, item) => acc + item.unitPrice * item.quantity, 0);
  const cityInfo = getCityDeliveryInfo(formData.city);
  const deliveryFee = calculateDeliveryFee(formData.city, subtotal, appliedCoupon);

  let discount = 0;
  if (appliedCoupon === 'WELCOME500' && subtotal >= 3000) {
    discount = 500;
  } else if (appliedCoupon === 'ROYAL1000' && subtotal >= 6000) {
    discount = 1000;
  } else if (appliedCoupon === 'JUMMAH10') {
    discount = Math.round(subtotal * 0.10);
  }
  const grandTotal = Math.max(0, subtotal - discount + deliveryFee);

  const copyToClipboard = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopiedAccount(key);
    setTimeout(() => setCopiedAccount(null), 2500);
  };

  const handleSubmitOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.fullName.trim() || !formData.phone.trim() || !formData.address.trim()) {
      alert('Please fill in your Full Name, Phone Number, and Delivery Address.');
      return;
    }

    setIsSubmitting(true);

    const randomId = `SUD-${Math.floor(100000 + Math.random() * 900000)}`;
    const randomTracking = `SC-${Math.floor(10000000 + Math.random() * 90000000)}`;

    const rider: RiderStatus = {
      status: 'confirmed',
      statusUr: 'آرڈر تصدیق شدہ',
      riderName: 'Muhammad Bilal (Dispatch)',
      riderPhone: '0318-2187575',
      vehicleNo: 'KHI-7892',
      courier: cityInfo.courier,
      trackingNo: randomTracking,
      estimatedDelivery: cityInfo.estimatedDelivery,
      currentLocation: `Malir Hub / ${cityInfo.region} Gateway`
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

      // Save order to store and broadcast sync event
      saveOrderToStore(newOrder);
    }, 1000);
  };

  const handleWhatsAppDirectCheckout = () => {
    const itemsList = cartItems
      .map(
        (item, idx) =>
          `${idx + 1}. *${item.nameEn}* (${item.selectedSize}) x${item.quantity} = Rs. ${(
            item.unitPrice * item.quantity
          ).toLocaleString()}`
      )
      .join('\n');

    const msg = encodeURIComponent(
      `Hello Suddais Collection! 🛍️\nI would like to place an order directly:\n\n*CUSTOMER DETAILS:*\n• Name: ${
        formData.fullName || 'Customer'
      }\n• Phone: ${formData.phone || 'Provided via chat'}\n• City: ${formData.city}\n• Address: ${
        formData.address || 'Shared here'
      }\n• Payment: ${formData.paymentMethod.toUpperCase()}\n\n*ITEMS:*\n${itemsList}\n\n*Subtotal:* Rs. ${subtotal.toLocaleString()}\n*Discount:* Rs. ${discount.toLocaleString()}\n*Delivery Charges (${
        cityInfo.region
      }):* ${deliveryFee === 0 ? 'FREE' : `Rs. ${deliveryFee}`}\n*Total Payable:* Rs. ${grandTotal.toLocaleString()}\n\nPlease confirm my order. Thank you!`
    );

    window.open(`https://wa.me/923182187575?text=${msg}`, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/60 backdrop-blur-sm overflow-y-auto">
      <div
        className="relative w-full max-w-2xl bg-white border border-[#e8dec8] rounded-3xl shadow-2xl text-[#1a1612] overflow-hidden my-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
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
                  : 'Cash on Delivery nationwide with city-specific express courier rates'}
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
        <div className="p-5 sm:p-6 max-h-[82vh] overflow-y-auto">
          {completedOrder ? (
            /* Order Placed Success Screen */
            <div className="space-y-6">
              <div className="p-6 rounded-2xl bg-[#f4fbf7] border border-emerald-500/30 text-center space-y-2">
                <CheckCircle2 className="w-12 h-12 text-emerald-600 mx-auto" />
                <h4 className="text-xl font-bold text-[#1a1612] font-display">
                  Order Successfully Placed!
                </h4>
                <p className="text-xs text-[#52493d]">
                  Thank you, <strong>{completedOrder.customer.fullName}</strong>! Your order is logged in our dispatch registry.
                </p>
                <div className="inline-flex items-center gap-2 mt-2 px-4 py-2 rounded-full bg-white border border-emerald-400 text-xs font-mono font-bold text-emerald-800 shadow-xs">
                  <span>Order ID: <strong>{completedOrder.id}</strong></span>
                  <button
                    onClick={() => copyToClipboard(completedOrder.id, 'order-id')}
                    className="p-1 hover:text-[#b8860b] cursor-pointer"
                    title="Copy Order ID"
                  >
                    {copiedAccount === 'order-id' ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                  </button>
                </div>
              </div>

              {/* Courier & Rider Assignment Details */}
              <div className="p-5 rounded-2xl bg-[#faf7f2] border border-[#e8dec8] space-y-3">
                <div className="flex items-center justify-between pb-3 border-b border-[#e8dec8]">
                  <div className="flex items-center gap-2">
                    <Truck className="w-4 h-4 text-[#b8860b]" />
                    <span className="font-bold text-xs uppercase tracking-wider text-[#1a1612]">
                      Assigned Courier & Tracking
                    </span>
                  </div>
                  <span className="text-xs font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-full">
                    Confirmed Dispatch
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
                    <span className="text-[#8c8273] block text-[11px]">Destination & Delivery:</span>
                    <span className="font-bold text-[#1a1612]">{completedOrder.customer.city}</span>
                  </div>
                  <div>
                    <span className="text-[#8c8273] block text-[11px]">Est. Arrival:</span>
                    <span className="font-bold text-emerald-700">{completedOrder.rider.estimatedDelivery}</span>
                  </div>
                </div>
              </div>

              {/* Items Summary */}
              <div className="space-y-2">
                <h5 className="text-xs font-bold text-[#1a1612] uppercase tracking-wider">
                  Ordered Products ({completedOrder.items.length})
                </h5>
                <div className="space-y-2 max-h-36 overflow-y-auto pr-1">
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
                <div className="flex justify-between text-xs pt-1 font-bold">
                  <span>Total Payable on Delivery:</span>
                  <span className="font-mono text-sm text-[#b8860b]">
                    Rs. {completedOrder.total.toLocaleString()}
                  </span>
                </div>
              </div>

              {/* Action Buttons: Live Tracking & WhatsApp */}
              <div className="pt-2 flex flex-col sm:flex-row gap-3">
                {onOpenTracker && (
                  <button
                    onClick={() => {
                      onClose();
                      onOpenTracker();
                    }}
                    className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl bg-[#1a1612] hover:bg-[#c59b27] text-white font-bold text-xs cursor-pointer shadow-md transition-all"
                  >
                    <Truck className="w-4 h-4 text-[#d4af37]" />
                    <span>Track Live Delivery Status</span>
                  </button>
                )}

                <button
                  onClick={handleWhatsAppDirectCheckout}
                  className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs cursor-pointer shadow-md transition-all"
                >
                  <MessageCircle className="w-4 h-4 fill-white" />
                  <span>Send Copy on WhatsApp</span>
                </button>
              </div>

              <div className="text-center pt-2">
                <button
                  onClick={onClose}
                  className="text-xs text-[#736a5c] hover:text-[#1a1612] underline cursor-pointer"
                >
                  Close & Continue Browsing
                </button>
              </div>
            </div>
          ) : (
            /* Checkout Form */
            <form onSubmit={handleSubmitOrder} className="space-y-6">
              
              {/* Separate WhatsApp Direct Order Banner */}
              <div className="p-3.5 rounded-2xl bg-[#f0faf4] border border-emerald-300 flex items-center justify-between gap-3">
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-xl bg-emerald-600 text-white flex items-center justify-center shrink-0 shadow-xs">
                    <MessageCircle className="w-5 h-5 fill-white" />
                  </div>
                  <div>
                    <h5 className="text-xs font-bold text-emerald-950">
                      Prefer to order directly via WhatsApp?
                    </h5>
                    <p className="text-[11px] text-emerald-800">
                      Skip the form and chat with our perfume specialist (+92 318 2187575)
                    </p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={handleWhatsAppDirectCheckout}
                  className="px-3.5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold shrink-0 transition-colors shadow-xs"
                >
                  Order on WhatsApp
                </button>
              </div>

              {/* Order Items Review */}
              <div className="p-4 rounded-2xl bg-[#faf7f2] border border-[#e8dec8] space-y-2">
                <div className="flex items-center justify-between pb-2 border-b border-[#e8dec8] text-xs font-bold text-[#1a1612]">
                  <span>Order Items ({cartItems.length}):</span>
                  <span className="font-mono text-[#b8860b]">Subtotal: Rs. {subtotal.toLocaleString()}</span>
                </div>
                <div className="space-y-1.5 max-h-28 overflow-y-auto pr-1 text-xs text-[#52493d]">
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

              {/* Customer Contact & Address Details */}
              <div className="space-y-3">
                <h4 className="text-xs font-bold text-[#1a1612] uppercase tracking-wider flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-[#b8860b]" />
                  <span>Delivery Address & Destination City</span>
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
                      className="w-full bg-[#faf7f2] border border-[#dcd2be] rounded-xl px-3 py-2.5 text-xs text-[#1a1612] focus:outline-none focus:border-[#b8860b]"
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
                      className="w-full bg-[#faf7f2] border border-[#dcd2be] rounded-xl px-3 py-2.5 text-xs text-[#1a1612] focus:outline-none focus:border-[#b8860b]"
                    />
                  </div>
                </div>

                {/* City Selection with Automatic Delivery Fee Calculation */}
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <label className="block text-xs text-[#52493d] font-medium">
                      Destination City & Delivery Zone *
                    </label>
                    <span className="text-[11px] text-[#8b6508] font-bold">
                      {subtotal >= FREE_DELIVERY_THRESHOLD ? 'Free Shipping Active!' : `DC: Rs. ${deliveryFee}`}
                    </span>
                  </div>

                  <select
                    value={formData.city}
                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                    className="w-full bg-[#faf7f2] border border-[#dcd2be] rounded-xl px-3 py-2.5 text-xs text-[#1a1612] font-medium focus:outline-none focus:border-[#b8860b] cursor-pointer"
                  >
                    {DELIVERY_ZONES.map((zone) => (
                      <option key={zone.name} value={zone.name}>
                        {zone.name} — DC: Rs. {subtotal >= FREE_DELIVERY_THRESHOLD ? 0 : zone.fee} ({zone.estimatedDelivery})
                      </option>
                    ))}
                  </select>

                  {/* Delivery Charges Notice */}
                  <div className="mt-2 p-2.5 rounded-xl bg-[#fdfbf7] border border-[#e8dec8] text-[11px] flex items-center justify-between">
                    <div className="flex items-center gap-1.5 text-[#52493d]">
                      <Truck className="w-3.5 h-3.5 text-[#b8860b]" />
                      <span>
                        <strong>{cityInfo.region}:</strong> {cityInfo.estimatedDelivery} via {cityInfo.courier}
                      </span>
                    </div>
                    <span className="font-bold font-mono">
                      {deliveryFee === 0 ? (
                        <span className="text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-md">FREE</span>
                      ) : (
                        <span className="text-[#b8860b]">Rs. {deliveryFee}</span>
                      )}
                    </span>
                  </div>
                </div>

                <div>
                  <label className="block text-xs text-[#52493d] mb-1 font-medium">
                    Complete Street Address (House/Shop #, Street, Area) *
                  </label>
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
                    <span className="text-xs font-bold block">Cash on Delivery</span>
                    <span className="text-[10px] text-[#736a5c]">Pay to Rider</span>
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
                    <span className="text-xs font-bold block">Easypaisa</span>
                    <span className="text-[10px] text-[#736a5c]">0318-2187575</span>
                  </label>

                  {/* Bank Transfer */}
                  <label
                    className={`flex flex-col items-center justify-center p-3 rounded-2xl border text-center cursor-pointer transition-all ${
                      formData.paymentMethod === 'bank'
                        ? 'bg-[#faf2dd] border-[#c59b27] text-[#1a1612] shadow-xs'
                        : 'bg-[#faf7f2] border-[#e8dec8] text-[#52493d] hover:border-[#c59b27]'
                    }`}
                  >
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="bank"
                      checked={formData.paymentMethod === 'bank'}
                      onChange={() => setFormData({ ...formData, paymentMethod: 'bank' })}
                      className="sr-only"
                    />
                    <ShieldCheck className="w-5 h-5 text-[#b8860b] mb-1" />
                    <span className="text-xs font-bold block">Meezan Bank</span>
                    <span className="text-[10px] text-[#736a5c]">Online Banking</span>
                  </label>
                </div>

                {/* Prepayment Account Info Box */}
                {formData.paymentMethod !== 'cod' && (
                  <div className="p-3.5 rounded-xl bg-[#faf2dd] border border-[#d4af37]/40 text-xs space-y-2">
                    <div className="flex justify-between items-center">
                      <div>
                        <strong className="block text-[#1a1612]">
                          {formData.paymentMethod === 'easypaisa'
                            ? 'Easypaisa Account: 0318-2187575'
                            : 'Meezan Bank: 0108-0105872938'}
                        </strong>
                        <span className="text-[11px] text-[#736a5c]">Title: Suddais Ahmed</span>
                      </div>
                      <button
                        type="button"
                        onClick={() =>
                          copyToClipboard(
                            formData.paymentMethod === 'easypaisa' ? '03182187575' : '01080105872938',
                            'acc'
                          )
                        }
                        className="px-2.5 py-1 rounded bg-[#1a1612] text-white text-[10px] font-bold flex items-center gap-1 cursor-pointer"
                      >
                        {copiedAccount === 'acc' ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                        <span>{copiedAccount === 'acc' ? 'Copied' : 'Copy'}</span>
                      </button>
                    </div>

                    <div>
                      <label className="block text-[11px] text-[#52493d] mb-1">
                        Transaction ID / Reference # (after payment):
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. TRX982736182"
                        value={formData.transactionId}
                        onChange={(e) => setFormData({ ...formData, transactionId: e.target.value })}
                        className="w-full bg-white border border-[#dcd2be] rounded-lg px-2.5 py-1.5 text-xs text-[#1a1612]"
                      />
                    </div>
                  </div>
                )}
              </div>

              {/* Order Calculations Breakdown */}
              <div className="p-4 rounded-2xl bg-[#faf7f2] border border-[#e8dec8] space-y-2 text-xs">
                <div className="flex justify-between text-[#52493d]">
                  <span>Cart Items Subtotal:</span>
                  <span className="font-mono text-[#1a1612]">Rs. {subtotal.toLocaleString()}</span>
                </div>

                {discount > 0 && (
                  <div className="flex justify-between text-emerald-700 font-medium">
                    <span>Coupon Discount:</span>
                    <span className="font-mono">- Rs. {discount.toLocaleString()}</span>
                  </div>
                )}

                <div className="flex justify-between text-[#52493d]">
                  <span>Delivery Charges ({cityInfo.region}):</span>
                  <span className="font-mono">
                    {deliveryFee === 0 ? (
                      <strong className="text-emerald-700">FREE (Orders &gt; 5,000)</strong>
                    ) : (
                      `Rs. ${deliveryFee}`
                    )}
                  </span>
                </div>

                <div className="flex justify-between items-center pt-2 border-t border-[#e8dec8] font-bold text-sm text-[#1a1612]">
                  <span>Grand Total Payable:</span>
                  <span className="font-mono text-base text-[#b8860b]">
                    Rs. {grandTotal.toLocaleString()}
                  </span>
                </div>
              </div>

              {/* Submit Button */}
              <div className="space-y-2">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full flex items-center justify-center gap-2 py-3.5 rounded-xl bg-gradient-to-r from-[#d4af37] via-[#e6c352] to-[#c59b27] text-[#1a1612] font-bold text-sm hover:brightness-105 transition-all shadow-md active:scale-95 cursor-pointer disabled:opacity-50"
                >
                  {isSubmitting ? (
                    <span>Registering Order...</span>
                  ) : (
                    <>
                      <span>Confirm & Place Order (Rs. {grandTotal.toLocaleString()})</span>
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>

                <div className="flex items-center justify-center gap-2 text-[11px] text-[#736a5c]">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#b8860b]" />
                  <span>100% Genuine Fragrances • 7-Day Exchange Guarantee</span>
                </div>
              </div>

            </form>
          )}
        </div>
      </div>
    </div>
  );
};
