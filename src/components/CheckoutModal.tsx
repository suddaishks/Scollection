import React, { useState } from 'react';
import {
  X,
  ShieldCheck,
  CreditCard,
  Banknote,
  Smartphone,
  CheckCircle2,
  Truck,
  Phone,
  MessageCircle,
  Clock,
  ArrowRight,
  ArrowLeft,
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
  lang: 'ur' | 'en';
}

export const CheckoutModal: React.FC<CheckoutModalProps> = ({
  isOpen,
  onClose,
  cartItems,
  onOrderCompleted,
  appliedCoupon,
  lang
}) => {
  if (!isOpen) return null;

  const subtotal = cartItems.reduce((acc, item) => acc + item.unitPrice * item.quantity, 0);
  const isFreeShipping = subtotal >= 3000 || appliedCoupon === 'FREESHIP';
  const deliveryFee = isFreeShipping ? 0 : 250;

  let discount = 0;
  if (appliedCoupon === 'JUMMAH15') {
    discount = Math.round(subtotal * 0.15);
  } else if (appliedCoupon === 'BUY2GET1') {
    discount = Math.round(subtotal * 0.10);
  }
  const grandTotal = Math.max(0, subtotal - discount + deliveryFee);

  const [formData, setFormData] = useState<OrderCustomerInfo>({
    fullName: '',
    phone: '',
    whatsappPhone: '',
    city: PAKISTAN_CITIES[0],
    address: '',
    notes: '',
    paymentMethod: 'cod',
    transactionId: ''
  });

  const [confirmedOrder, setConfirmedOrder] = useState<OrderRecord | null>(null);
  const [copiedAccount, setCopiedAccount] = useState<string | null>(null);
  const [formError, setFormError] = useState('');

  const handleCopyAccount = (acc: string) => {
    navigator.clipboard.writeText(acc);
    setCopiedAccount(acc);
    setTimeout(() => setCopiedAccount(null), 2500);
  };

  const handlePlaceOrder = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.fullName.trim() || !formData.phone.trim() || !formData.address.trim()) {
      setFormError(lang === 'ur' ? 'براہ کرم اپنا نام، موبائل نمبر اور مکمل پتہ درج کریں۔' : 'Please provide Name, Phone and Street Address.');
      return;
    }

    if ((formData.paymentMethod === 'easypaisa' || formData.paymentMethod === 'jazzcash') && !formData.transactionId?.trim()) {
      setFormError(
        lang === 'ur'
          ? 'براہ کرم ایزی پیسہ یا جاز کیش ادائیگی کے بعد ٹرانزیکشن آئی ڈی (TRX ID) درج کریں۔'
          : 'Please enter your Easypaisa/JazzCash Transaction ID (TRX ID).'
      );
      return;
    }

    const orderId = `IR-${Math.floor(100000 + Math.random() * 900000)}`;

    const riderDetails: RiderStatus = {
      status: 'confirmed',
      statusUr: 'آرڈر موصول ہو گیا ہے اور رائیڈر تیاری میں ہے',
      riderName: 'طارق رحمان (Tariq Rehman)',
      riderPhone: '0321-9876543',
      vehicleNo: 'KHI-4921 (Honda 125)',
      courier: 'Itr & Rida Express Delivery / TCS Courier',
      trackingNo: `TRK-${Math.floor(1000000 + Math.random() * 9000000)}`,
      estimatedDelivery: '24 سے 48 گھنٹے کے اندر',
      currentLocation: 'سنٹرل ڈسپیچ ویئرہاؤس، طارق روڈ، کراچی'
    };

    const newOrder: OrderRecord = {
      id: orderId,
      createdAt: new Date().toLocaleDateString('ur-PK', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      }),
      customer: formData,
      items: cartItems,
      subtotal,
      discount,
      deliveryFee,
      total: grandTotal,
      couponCode: appliedCoupon || undefined,
      rider: riderDetails
    };

    // Save order in localStorage
    try {
      const existing = JSON.parse(localStorage.getItem('itr_rida_orders') || '[]');
      existing.unshift(newOrder);
      localStorage.setItem('itr_rida_orders', JSON.stringify(existing));
    } catch (err) {
      console.error(err);
    }

    setConfirmedOrder(newOrder);
    onOrderCompleted(newOrder);
  };

  const handleOpenWhatsAppOrder = () => {
    if (!confirmedOrder) return;
    const itemsSummary = confirmedOrder.items
      .map((i) => `• ${i.nameUr} (${i.selectedSize}) x ${i.quantity} = PKR ${(i.unitPrice * i.quantity).toLocaleString()}`)
      .join('\n');

    const msg = encodeURIComponent(
      `*السلام علیکم! عطر و ردا نیا آرڈر*\n\n` +
      `*آرڈر نمبر:* #${confirmedOrder.id}\n` +
      `*کسٹمر نام:* ${confirmedOrder.customer.fullName}\n` +
      `*فون نمبر:* ${confirmedOrder.customer.phone}\n` +
      `*شہر:* ${confirmedOrder.customer.city}\n` +
      `*پتہ:* ${confirmedOrder.customer.address}\n\n` +
      `*آرڈر کی تفصیل:*\n${itemsSummary}\n\n` +
      `*کل قابل ادائیگی:* PKR ${confirmedOrder.total.toLocaleString()}\n` +
      `*ادائیگی طریقہ:* ${confirmedOrder.customer.paymentMethod.toUpperCase()}` +
      (confirmedOrder.customer.transactionId ? ` (TID: ${confirmedOrder.customer.transactionId})` : '') +
      `\n\nبراہ کرم تصدیق کریں اور رائیڈر کو روانہ فرمائیں۔ جزاک اللہ!`
    );

    window.open(`https://wa.me/923001234567?text=${msg}`, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-6">
      <div
        className="relative w-full max-w-2xl bg-[#12141c] border border-[#2b3142] rounded-2xl shadow-2xl text-[#f4efe6] overflow-hidden my-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-5 border-b border-[#252b3a] flex items-center justify-between bg-[#161922]">
          <div className="flex items-center gap-2.5">
            <ShieldCheck className="w-5 h-5 text-[#d4af37]" />
            <h3 className="font-bold text-lg font-display">
              {confirmedOrder
                ? (lang === 'ur' ? 'آرڈر کنفرمیشن و رائیڈر اسٹیٹس' : 'Order Confirmed & Rider Dispatch')
                : (lang === 'ur' ? 'چیک آؤٹ اور محفوظ ترسیل' : 'Secure Checkout & Delivery')}
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg hover:bg-[#222736] text-[#a69f91] hover:text-white transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* BODY: ORDER CONFIRMED VIEW (WITH RIDER DISPATCH) */}
        {confirmedOrder ? (
          <div className="p-6 sm:p-8 space-y-6">
            
            {/* Success Box */}
            <div className="text-center py-2 space-y-2">
              <div className="w-16 h-16 rounded-full bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center mx-auto text-emerald-400">
                <CheckCircle2 className="w-10 h-10" />
              </div>
              <h2 className="text-2xl font-bold font-display text-[#f4efe6]">
                {lang === 'ur' ? 'مبارک ہو! آپ کا آرڈر کامیابی سے موصول ہو گیا ہے' : 'Order Placed Successfully!'}
              </h2>
              <p className="text-sm text-[#d4af37] font-mono font-bold">
                {lang === 'ur' ? `آرڈر آئی ڈی: #${confirmedOrder.id}` : `Order ID: #${confirmedOrder.id}`}
              </p>
            </div>

            {/* RIDER ASSIGNMENT CARD (Requested by user: "اور رائیڈ ائے") */}
            <div className="bg-[#181d28] border border-[#2d3648] rounded-xl p-5 space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-[#293142]">
                <div className="flex items-center gap-2">
                  <Truck className="w-5 h-5 text-[#d4af37]" />
                  <span className="font-bold text-sm text-[#f4efe6]">
                    {lang === 'ur' ? 'رائیڈر کی معلومات اور لائیو ترسیل' : 'Assigned Rider & Delivery Status'}
                  </span>
                </div>
                <span className="text-xs bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 px-2.5 py-0.5 rounded-full font-semibold">
                  {lang === 'ur' ? 'رائیڈر روانہ / الرٹ جاری' : 'Rider Dispatched'}
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div>
                  <span className="text-[#8e8778] block">{lang === 'ur' ? 'رائیڈر کا نام:' : 'Rider Name:'}</span>
                  <span className="text-[#f4efe6] font-semibold text-sm">{confirmedOrder.rider.riderName}</span>
                </div>
                <div>
                  <span className="text-[#8e8778] block">{lang === 'ur' ? 'رائیڈر کا رابطہ فون:' : 'Rider Contact:'}</span>
                  <a href={`tel:${confirmedOrder.rider.riderPhone}`} className="text-[#d4af37] font-mono font-bold flex items-center gap-1">
                    <Phone className="w-3.5 h-3.5" />
                    <span>{confirmedOrder.rider.riderPhone}</span>
                  </a>
                </div>
                <div>
                  <span className="text-[#8e8778] block">{lang === 'ur' ? 'موٹر سائیکل / گاڑی نمبر:' : 'Vehicle No:'}</span>
                  <span className="text-[#f4efe6] font-mono">{confirmedOrder.rider.vehicleNo}</span>
                </div>
                <div>
                  <span className="text-[#8e8778] block">{lang === 'ur' ? 'تخمینہ وقتِ ترسیل:' : 'Estimated Arrival:'}</span>
                  <span className="text-emerald-400 font-semibold">{confirmedOrder.rider.estimatedDelivery}</span>
                </div>
                <div className="sm:col-span-2">
                  <span className="text-[#8e8778] block">{lang === 'ur' ? 'موجودہ مقام:' : 'Current Status & Depot:'}</span>
                  <span className="text-[#cdc7b9] flex items-center gap-1.5 mt-0.5">
                    <MapPin className="w-3.5 h-3.5 text-[#d4af37] shrink-0" />
                    <span>{confirmedOrder.rider.currentLocation}</span>
                  </span>
                </div>
              </div>

              <div className="p-3 bg-[#11131a] rounded-lg border border-[#232938] text-[11px] text-[#a69f91] flex items-center gap-2">
                <Clock className="w-4 h-4 text-[#d4af37] shrink-0" />
                <span>
                  {lang === 'ur'
                    ? 'ڈیلیوری سے قبل رائیڈر آپ کے فون پر کال کرے گا۔ براہ کرم اپنا فون آن رکھیں۔'
                    : 'The courier rider will call your phone before arriving at your doorstep.'}
                </span>
              </div>
            </div>

            {/* Total Paid & Delivery Summary */}
            <div className="bg-[#141620] border border-[#252b3a] rounded-xl p-4 flex items-center justify-between text-xs">
              <div>
                <span className="text-[#8e8778] block">{lang === 'ur' ? 'ادائیگی کا طریقہ:' : 'Payment Mode:'}</span>
                <span className="text-[#f4efe6] font-bold uppercase">{confirmedOrder.customer.paymentMethod}</span>
              </div>
              <div className="text-end">
                <span className="text-[#8e8778] block">{lang === 'ur' ? 'کل رقم:' : 'Total Amount:'}</span>
                <span className="text-base text-[#d4af37] font-bold font-mono tabular-nums">
                  PKR {confirmedOrder.total.toLocaleString()}
                </span>
              </div>
            </div>

            {/* Action Buttons: WhatsApp direct order + Done */}
            <div className="space-y-3 pt-2">
              <button
                onClick={handleOpenWhatsAppOrder}
                className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold transition-all shadow-lg cursor-pointer"
              >
                <MessageCircle className="w-5 h-5 fill-current" />
                <span>{lang === 'ur' ? 'واٹس ایپ پر آرڈر کی فوری تصدیق بھیجیں' : 'Send Instant Order Confirmation to WhatsApp'}</span>
              </button>

              <button
                onClick={onClose}
                className="w-full py-2.5 px-4 rounded-xl bg-[#232734] hover:bg-[#2d3242] text-[#f4efe6] font-semibold text-xs transition-colors cursor-pointer"
              >
                {lang === 'ur' ? 'شاپنگ جاری رکھیں' : 'Continue Shopping'}
              </button>
            </div>

          </div>
        ) : (
          /* CHECKOUT FORM VIEW */
          <form onSubmit={handlePlaceOrder} className="p-6 sm:p-8 space-y-6 max-h-[82vh] overflow-y-auto">
            
            {/* Order Items Preview */}
            <div className="bg-[#171b26] border border-[#262c3c] rounded-xl p-3 space-y-2">
              <div className="text-xs font-semibold text-[#d4af37] mb-1">
                {lang === 'ur' ? 'آرڈر کا خلاصہ (Items Summary):' : 'Order Items Summary:'}
              </div>
              <div className="space-y-1.5 max-h-36 overflow-y-auto pe-1">
                {cartItems.map((item) => (
                  <div key={item.id} className="flex justify-between text-xs text-[#cdc7b9]">
                    <span className="truncate max-w-[240px]">
                      {lang === 'ur' ? item.nameUr : item.nameEn} ({item.selectedSize}) x {item.quantity}
                    </span>
                    <span className="font-mono tabular-nums text-[#f4efe6] shrink-0">
                      PKR {(item.unitPrice * item.quantity).toLocaleString()}
                    </span>
                  </div>
                ))}
              </div>
              <div className="pt-2 border-t border-[#252b3a] flex justify-between text-xs font-bold text-[#f4efe6]">
                <span>{lang === 'ur' ? 'کل قابل ادائیگی:' : 'Total Payable:'}</span>
                <span className="text-[#d4af37] font-mono text-sm">PKR {grandTotal.toLocaleString()}</span>
              </div>
            </div>

            {/* Error Message */}
            {formError && (
              <div className="p-3 bg-red-900/30 border border-red-500/40 rounded-lg text-xs text-red-300">
                {formError}
              </div>
            )}

            {/* Customer Details Form */}
            <div className="space-y-4">
              <h4 className="text-xs font-bold uppercase tracking-wider text-[#d4af37]">
                {lang === 'ur' ? '1. ترسیل کی معلومات (Customer & Address)' : '1. Delivery Information'}
              </h4>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs text-[#a69f91] mb-1">
                    {lang === 'ur' ? 'آپ کا مکمل نام *' : 'Full Name *'}
                  </label>
                  <input
                    type="text"
                    required
                    placeholder={lang === 'ur' ? 'مثلاً محمد احمد' : 'e.g. Muhammad Ahmad'}
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    className="w-full bg-[#101218] border border-[#2b3142] rounded-lg px-3 py-2 text-xs text-[#f4efe6] focus:outline-none focus:border-[#d4af37]"
                  />
                </div>

                <div>
                  <label className="block text-xs text-[#a69f91] mb-1">
                    {lang === 'ur' ? 'موبائل نمبر (کال اور ایس ایم ایس) *' : 'Mobile Phone (03xx-xxxxxxx) *'}
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="03001234567"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full bg-[#101218] border border-[#2b3142] rounded-lg px-3 py-2 text-xs text-[#f4efe6] focus:outline-none focus:border-[#d4af37]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs text-[#a69f91] mb-1">
                    {lang === 'ur' ? 'واٹس ایپ نمبر (آرڈر اپڈیٹس کے لیے)' : 'WhatsApp Number'}
                  </label>
                  <input
                    type="tel"
                    placeholder="03001234567"
                    value={formData.whatsappPhone}
                    onChange={(e) => setFormData({ ...formData, whatsappPhone: e.target.value })}
                    className="w-full bg-[#101218] border border-[#2b3142] rounded-lg px-3 py-2 text-xs text-[#f4efe6] focus:outline-none focus:border-[#d4af37]"
                  />
                </div>

                <div>
                  <label className="block text-xs text-[#a69f91] mb-1">
                    {lang === 'ur' ? 'شہر منتخب کریں *' : 'Select City *'}
                  </label>
                  <select
                    value={formData.city}
                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                    className="w-full bg-[#101218] border border-[#2b3142] rounded-lg px-3 py-2 text-xs text-[#f4efe6] focus:outline-none focus:border-[#d4af37]"
                  >
                    {PAKISTAN_CITIES.map((c, i) => (
                      <option key={i} value={c}>{c}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs text-[#a69f91] mb-1">
                  {lang === 'ur' ? 'مکمل گلی، محلہ، مکان / فلیٹ نمبر کا پتہ *' : 'Street Address, House/Flat No *'}
                </label>
                <textarea
                  required
                  rows={2}
                  placeholder={lang === 'ur' ? 'مکان نمبر، گلی، قریبی مشہور جگہ یا مسجد...' : 'Complete address with landmarks...'}
                  value={formData.address}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  className="w-full bg-[#101218] border border-[#2b3142] rounded-lg px-3 py-2 text-xs text-[#f4efe6] focus:outline-none focus:border-[#d4af37]"
                />
              </div>
            </div>

            {/* PAYMENT METHOD SELECTOR (Cash, Easypaisa, JazzCash) */}
            <div className="space-y-4 pt-2 border-t border-[#252b3a]">
              <h4 className="text-xs font-bold uppercase tracking-wider text-[#d4af37]">
                {lang === 'ur' ? '2. ادائیگی کا طریقہ (Payment Method)' : '2. Payment Method'}
              </h4>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {/* Cash on Delivery */}
                <button
                  type="button"
                  onClick={() => setFormData({ ...formData, paymentMethod: 'cod' })}
                  className={`p-3 rounded-xl border text-start transition-all cursor-pointer ${
                    formData.paymentMethod === 'cod'
                      ? 'border-[#d4af37] bg-[#d4af37]/15 text-[#f4efe6]'
                      : 'border-[#262c3c] bg-[#141620] text-[#a69f91] hover:border-[#384157]'
                  }`}
                >
                  <Banknote className="w-5 h-5 text-emerald-400 mb-2" />
                  <div className="text-xs font-bold">{lang === 'ur' ? 'کیش آن ڈیلیوری' : 'Cash on Delivery'}</div>
                  <div className="text-[10px] text-[#8e8778] mt-0.5">{lang === 'ur' ? 'وصولی کے وقت نقد' : 'Pay when you receive'}</div>
                </button>

                {/* Easypaisa */}
                <button
                  type="button"
                  onClick={() => setFormData({ ...formData, paymentMethod: 'easypaisa' })}
                  className={`p-3 rounded-xl border text-start transition-all cursor-pointer ${
                    formData.paymentMethod === 'easypaisa'
                      ? 'border-emerald-400 bg-emerald-500/15 text-[#f4efe6]'
                      : 'border-[#262c3c] bg-[#141620] text-[#a69f91] hover:border-[#384157]'
                  }`}
                >
                  <Smartphone className="w-5 h-5 text-emerald-400 mb-2" />
                  <div className="text-xs font-bold">{lang === 'ur' ? 'ایزی پیسہ (Easypaisa)' : 'Easypaisa'}</div>
                  <div className="text-[10px] text-[#8e8778] mt-0.5">{lang === 'ur' ? 'اکاؤنٹ ٹرانسفر' : 'Instant mobile transfer'}</div>
                </button>

                {/* JazzCash */}
                <button
                  type="button"
                  onClick={() => setFormData({ ...formData, paymentMethod: 'jazzcash' })}
                  className={`p-3 rounded-xl border text-start transition-all cursor-pointer ${
                    formData.paymentMethod === 'jazzcash'
                      ? 'border-[#d4af37] bg-[#d4af37]/15 text-[#f4efe6]'
                      : 'border-[#262c3c] bg-[#141620] text-[#a69f91] hover:border-[#384157]'
                  }`}
                >
                  <CreditCard className="w-5 h-5 text-[#d4af37] mb-2" />
                  <div className="text-xs font-bold">{lang === 'ur' ? 'جاز کیش (JazzCash)' : 'JazzCash'}</div>
                  <div className="text-[10px] text-[#8e8778] mt-0.5">{lang === 'ur' ? 'اکاؤنٹ ٹرانسفر' : 'Instant mobile transfer'}</div>
                </button>
              </div>

              {/* Easypaisa Details Box */}
              {formData.paymentMethod === 'easypaisa' && (
                <div className="p-4 rounded-xl bg-emerald-950/20 border border-emerald-500/30 space-y-3 text-xs">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-emerald-400 font-bold">{lang === 'ur' ? 'ایزی پیسہ اکاؤنٹ نمبر:' : 'Easypaisa Account:'}</div>
                      <div className="font-mono text-sm font-bold text-white tracking-wider">0312-9876543</div>
                      <div className="text-[11px] text-[#a69f91]">{lang === 'ur' ? 'عنوان: محمد احمد (عطر و ردا)' : 'Title: Muhammad Ahmad'}</div>
                    </div>
                    <button
                      type="button"
                      onClick={() => handleCopyAccount('03129876543')}
                      className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-emerald-800/40 text-emerald-300 text-xs font-medium cursor-pointer"
                    >
                      {copiedAccount === '03129876543' ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                      <span>{copiedAccount === '03129876543' ? 'کاپی ہو گیا' : 'کاپی نمبر'}</span>
                    </button>
                  </div>
                  <div>
                    <label className="block text-[#a69f91] mb-1">
                      {lang === 'ur' ? 'رقم بھیجنے کے بعد ٹرانزیکشن آئی ڈی (TRX ID) لکھیں *:' : 'Enter Easypaisa Transaction ID (TRX ID) *:'}
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. 1982736452"
                      value={formData.transactionId}
                      onChange={(e) => setFormData({ ...formData, transactionId: e.target.value })}
                      className="w-full bg-[#101218] border border-emerald-500/40 rounded-lg px-3 py-2 text-xs text-white focus:outline-none"
                    />
                  </div>
                </div>
              )}

              {/* JazzCash Details Box */}
              {formData.paymentMethod === 'jazzcash' && (
                <div className="p-4 rounded-xl bg-[#231a10] border border-[#d4af37]/40 space-y-3 text-xs">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-[#d4af37] font-bold">{lang === 'ur' ? 'جاز کیش اکاؤنٹ نمبر:' : 'JazzCash Account:'}</div>
                      <div className="font-mono text-sm font-bold text-white tracking-wider">0300-1234567</div>
                      <div className="text-[11px] text-[#a69f91]">{lang === 'ur' ? 'عنوان: محمد احمد (عطر و ردا)' : 'Title: Muhammad Ahmad'}</div>
                    </div>
                    <button
                      type="button"
                      onClick={() => handleCopyAccount('03001234567')}
                      className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-[#3d2f16] text-[#d4af37] text-xs font-medium cursor-pointer"
                    >
                      {copiedAccount === '03001234567' ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                      <span>{copiedAccount === '03001234567' ? 'کاپی ہو گیا' : 'کاپی نمبر'}</span>
                    </button>
                  </div>
                  <div>
                    <label className="block text-[#a69f91] mb-1">
                      {lang === 'ur' ? 'رقم بھیجنے کے بعد ٹرانزیکشن آئی ڈی (TID) لکھیں *:' : 'Enter JazzCash Transaction ID (TID) *:'}
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. 0982736412"
                      value={formData.transactionId}
                      onChange={(e) => setFormData({ ...formData, transactionId: e.target.value })}
                      className="w-full bg-[#101218] border border-[#d4af37]/40 rounded-lg px-3 py-2 text-xs text-white focus:outline-none"
                    />
                  </div>
                </div>
              )}

            </div>

            {/* Submit Button */}
            <div className="pt-4 border-t border-[#252b3a] space-y-3">
              <button
                type="submit"
                className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-[#d4af37] hover:bg-[#e6c352] text-[#0f1115] font-bold shadow-xl transition-all cursor-pointer active:scale-98"
              >
                <span>{lang === 'ur' ? 'آرڈر مکمل کریں اور رائیڈر بک کریں' : 'Confirm Order & Book Rider'}</span>
                {lang === 'ur' ? <ArrowLeft className="w-4 h-4" /> : <ArrowRight className="w-4 h-4" />}
              </button>

              <p className="text-center text-[11px] text-[#7d776c]">
                {lang === 'ur'
                  ? 'آرڈر کنفرم کرنے پر آپ کو واٹس ایپ اور ایس ایم ایس پر رائیڈر کی لائیو ٹریکنگ مل جائے گی۔'
                  : 'You will receive immediate SMS & WhatsApp updates along with live courier rider details.'}
              </p>
            </div>

          </form>
        )}

      </div>
    </div>
  );
};
