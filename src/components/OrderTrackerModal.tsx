import React, { useState, useEffect } from 'react';
import { X, Search, Truck, Phone, MapPin, CheckCircle, Clock, PackageCheck, AlertCircle } from 'lucide-react';
import { OrderRecord } from '../types';

interface OrderTrackerModalProps {
  isOpen: boolean;
  onClose: () => void;
  lang: 'ur' | 'en';
}

export const OrderTrackerModal: React.FC<OrderTrackerModalProps> = ({
  isOpen,
  onClose,
  lang
}) => {
  if (!isOpen) return null;

  const [searchQuery, setSearchQuery] = useState('');
  const [orders, setOrders] = useState<OrderRecord[]>([]);
  const [activeOrder, setActiveOrder] = useState<OrderRecord | null>(null);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    try {
      const stored = JSON.parse(localStorage.getItem('itr_rida_orders') || '[]');
      setOrders(stored);
      if (stored.length > 0) {
        setActiveOrder(stored[0]);
      }
    } catch (e) {
      console.error(e);
    }
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setNotFound(false);
    const q = searchQuery.trim().toLowerCase();
    if (!q) return;

    const found = orders.find(
      (o) =>
        o.id.toLowerCase().includes(q) ||
        o.customer.phone.includes(q) ||
        o.customer.fullName.toLowerCase().includes(q)
    );

    if (found) {
      setActiveOrder(found);
    } else {
      setNotFound(true);
    }
  };

  const steps = [
    { titleUr: 'آرڈر موصول ہوا', titleEn: 'Order Received', descUr: 'سسٹم میں اندراج مکمل', descEn: 'Logged in system' },
    { titleUr: 'پیکنگ و کوالٹی چیک', titleEn: 'Quality Inspection', descUr: 'خوشبو بوتل اور ٹوپی باکس تیار', descEn: 'Custom packed' },
    { titleUr: 'رائیڈر کو ترسیل', titleEn: 'Handed to Rider', descUr: 'رائیڈر پارسل لے کر روانہ', descEn: 'Courier dispatch' },
    { titleUr: 'آپ کے پتے پر ترسیل', titleEn: 'Out for Delivery', descUr: 'دروازے پر دستک متوقع', descEn: 'Arriving today' }
  ];

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-6">
      <div
        className="relative w-full max-w-2xl bg-[#12141c] border border-[#2b3142] rounded-2xl shadow-2xl text-[#f4efe6] overflow-hidden my-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-5 border-b border-[#252b3a] flex items-center justify-between bg-[#161922]">
          <div className="flex items-center gap-2">
            <Truck className="w-5 h-5 text-[#d4af37]" />
            <h3 className="font-bold text-lg font-display">
              {lang === 'ur' ? 'آرڈر اور رائیڈر لائیو ٹریکنگ' : 'Live Order & Rider Tracker'}
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg hover:bg-[#222736] text-[#a69f91] hover:text-white transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 space-y-6 max-h-[80vh] overflow-y-auto">
          
          {/* Search Box */}
          <form onSubmit={handleSearch} className="flex gap-2">
            <div className="relative flex-1">
              <Search className="w-4 h-4 absolute start-3 top-1/2 -translate-y-1/2 text-[#8e8778]" />
              <input
                type="text"
                placeholder={lang === 'ur' ? 'آرڈر نمبر (مثلاً IR-123456) یا موبائل نمبر لکھیں...' : 'Enter Order ID (e.g. IR-123456) or Phone...'}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-[#101218] border border-[#2b3142] rounded-xl ps-9 pe-3 py-2 text-xs text-[#f4efe6] focus:outline-none focus:border-[#d4af37]"
              />
            </div>
            <button
              type="submit"
              className="px-4 py-2 bg-[#d4af37] hover:bg-[#e6c352] text-[#0f1115] text-xs font-bold rounded-xl transition-colors cursor-pointer"
            >
              {lang === 'ur' ? 'تلاش کریں' : 'Track'}
            </button>
          </form>

          {notFound && (
            <div className="p-3 bg-amber-950/30 border border-amber-500/30 rounded-lg text-xs text-amber-300 flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>
                {lang === 'ur'
                  ? 'اس نمبر سے کوئی آرڈر نہیں ملا۔ اگر آپ نے ابھی آرڈر دیا ہے تو براہ کرم کچھ دیر بعد چیک کریں۔'
                  : 'No order found with this ID or phone number.'}
              </span>
            </div>
          )}

          {/* Active Order Details */}
          {activeOrder ? (
            <div className="space-y-6">
              
              {/* Order Status Ribbon */}
              <div className="bg-[#181d29] border border-[#2c3447] rounded-xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-sm font-bold text-[#d4af37]">#{activeOrder.id}</span>
                    <span className="text-[11px] bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 px-2 py-0.5 rounded-full font-semibold">
                      {lang === 'ur' ? activeOrder.rider.statusUr : 'Active in Transit'}
                    </span>
                  </div>
                  <div className="text-xs text-[#a69f91] mt-1">
                    {lang === 'ur' ? `تاریخ: ${activeOrder.createdAt}` : `Date: ${activeOrder.createdAt}`}
                  </div>
                </div>

                <div className="text-start sm:text-end">
                  <div className="text-xs text-[#8e8778]">{lang === 'ur' ? 'کل رقم:' : 'Total Amount:'}</div>
                  <div className="text-base font-bold font-mono text-[#f4efe6]">
                    PKR {activeOrder.total.toLocaleString()}
                  </div>
                </div>
              </div>

              {/* Progress Steps Timeline */}
              <div className="py-2">
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {steps.map((step, idx) => {
                    const isCompleted = idx <= 2; // Simulated: currently at Rider Dispatched stage
                    return (
                      <div
                        key={idx}
                        className={`p-3 rounded-xl border text-center transition-all ${
                          isCompleted
                            ? 'bg-[#151a24] border-[#d4af37]/40 text-[#f4efe6]'
                            : 'bg-[#101218] border-[#222736] text-[#6d7488]'
                        }`}
                      >
                        <div
                          className={`w-7 h-7 rounded-full flex items-center justify-center mx-auto mb-2 text-xs font-bold ${
                            isCompleted ? 'bg-[#d4af37] text-[#0f1115]' : 'bg-[#1f2432] text-[#6d7488]'
                          }`}
                        >
                          {isCompleted ? <CheckCircle className="w-4 h-4" /> : idx + 1}
                        </div>
                        <div className="text-xs font-bold mb-0.5">{lang === 'ur' ? step.titleUr : step.titleEn}</div>
                        <div className="text-[10px] text-[#8e8778]">{lang === 'ur' ? step.descUr : step.descEn}</div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Rider Information Panel */}
              <div className="bg-[#181d28] border border-[#2d3648] rounded-xl p-5 space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-[#293142]">
                  <div className="flex items-center gap-2">
                    <Truck className="w-5 h-5 text-[#d4af37]" />
                    <span className="font-bold text-sm text-[#f4efe6]">
                      {lang === 'ur' ? 'متعلقہ رائیڈر کی تفصیلات' : 'Rider Dispatch Details'}
                    </span>
                  </div>
                  <span className="text-xs text-emerald-400 font-semibold flex items-center gap-1">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                    {lang === 'ur' ? 'لائیو روٹ پر' : 'Live on route'}
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                  <div>
                    <span className="text-[#8e8778] block">{lang === 'ur' ? 'رائیڈر کا نام:' : 'Rider Name:'}</span>
                    <span className="text-[#f4efe6] font-semibold text-sm">{activeOrder.rider.riderName}</span>
                  </div>
                  <div>
                    <span className="text-[#8e8778] block">{lang === 'ur' ? 'رائیڈر موبائل نمبر:' : 'Rider Phone:'}</span>
                    <a
                      href={`tel:${activeOrder.rider.riderPhone}`}
                      className="text-[#d4af37] font-mono font-bold flex items-center gap-1 hover:underline"
                    >
                      <Phone className="w-3.5 h-3.5" />
                      <span>{activeOrder.rider.riderPhone}</span>
                    </a>
                  </div>
                  <div>
                    <span className="text-[#8e8778] block">{lang === 'ur' ? 'موٹر سائیکل / وہیکل:' : 'Motorbike:'}</span>
                    <span className="text-[#f4efe6] font-mono">{activeOrder.rider.vehicleNo}</span>
                  </div>
                  <div>
                    <span className="text-[#8e8778] block">{lang === 'ur' ? 'تخمینہ آمد:' : 'Estimated Delivery:'}</span>
                    <span className="text-emerald-400 font-semibold">{activeOrder.rider.estimatedDelivery}</span>
                  </div>
                  <div className="sm:col-span-2">
                    <span className="text-[#8e8778] block">{lang === 'ur' ? 'ترسیل کا پتہ:' : 'Shipping Address:'}</span>
                    <span className="text-[#cdc7b9] flex items-center gap-1.5 mt-0.5">
                      <MapPin className="w-3.5 h-3.5 text-[#d4af37] shrink-0" />
                      <span>{activeOrder.customer.address}, {activeOrder.customer.city}</span>
                    </span>
                  </div>
                </div>
              </div>

              {/* Items in this order */}
              <div className="bg-[#141620] border border-[#252b3a] rounded-xl p-4 space-y-2">
                <div className="text-xs font-semibold text-[#d4af37]">
                  {lang === 'ur' ? 'اس آرڈر میں شامل اشیاء:' : 'Products in this order:'}
                </div>
                {activeOrder.items.map((it, idx) => (
                  <div key={idx} className="flex justify-between items-center text-xs py-1 border-b border-[#222736] last:border-none">
                    <span className="text-[#cdc7b9]">
                      {lang === 'ur' ? it.nameUr : it.nameEn} ({it.selectedSize}) x {it.quantity}
                    </span>
                    <span className="font-mono text-[#f4efe6] tabular-nums">
                      PKR {(it.unitPrice * it.quantity).toLocaleString()}
                    </span>
                  </div>
                ))}
              </div>

            </div>
          ) : (
            <div className="text-center py-12 text-[#8e8778] space-y-2">
              <PackageCheck className="w-12 h-12 mx-auto stroke-1 opacity-40" />
              <p className="text-xs">
                {lang === 'ur'
                  ? 'ابھی تک کوئی آرڈر ریکارڈ محفوظ نہیں ہے۔ اپنا آرڈر تلاش کرنے کے لیے اوپر نمبر لکھیں۔'
                  : 'No saved orders in this browser. Enter an order number above to search.'}
              </p>
            </div>
          )}

        </div>

      </div>
    </div>
  );
};
