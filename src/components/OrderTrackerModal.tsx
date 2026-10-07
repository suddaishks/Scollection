import React, { useState, useEffect } from 'react';
import {
  X,
  Search,
  Truck,
  Phone,
  MapPin,
  CheckCircle,
  Clock,
  PackageCheck,
  AlertCircle,
  MessageCircle,
  Sparkles,
  ExternalLink,
  Package
} from 'lucide-react';
import { OrderRecord } from '../types';
import { getStoredOrders, ORDER_UPDATE_EVENT } from '../data/orderStore';

interface OrderTrackerModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const OrderTrackerModal: React.FC<OrderTrackerModalProps> = ({
  isOpen,
  onClose,
}) => {
  if (!isOpen) return null;

  const [searchQuery, setSearchQuery] = useState('');
  const [orders, setOrders] = useState<OrderRecord[]>([]);
  const [activeOrder, setActiveOrder] = useState<OrderRecord | null>(null);
  const [notFound, setNotFound] = useState(false);

  const reloadOrders = () => {
    const list = getStoredOrders();
    setOrders(list);
    if (activeOrder) {
      const refreshed = list.find((o) => o.id === activeOrder.id);
      if (refreshed) {
        setActiveOrder(refreshed);
        return;
      }
    }
    // Only auto-load if the user in this session recently completed an order
    if (!activeOrder) {
      const lastPlacedId = sessionStorage.getItem('suddais_last_order_id');
      if (lastPlacedId) {
        const myOrder = list.find((o) => o.id === lastPlacedId);
        if (myOrder) {
          setActiveOrder(myOrder);
        }
      }
    }
  };

  useEffect(() => {
    reloadOrders();
    const handleSync = () => reloadOrders();
    window.addEventListener(ORDER_UPDATE_EVENT, handleSync);
    window.addEventListener('storage', handleSync);
    return () => {
      window.removeEventListener(ORDER_UPDATE_EVENT, handleSync);
      window.removeEventListener('storage', handleSync);
    };
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setNotFound(false);
    const q = searchQuery.trim().toLowerCase();
    if (!q) return;

    const currentList = getStoredOrders();
    const found = currentList.find(
      (o) =>
        o.id.toLowerCase().includes(q) ||
        o.customer.phone.includes(q) ||
        o.customer.fullName.toLowerCase().includes(q) ||
        (o.rider.trackingNo && o.rider.trackingNo.toLowerCase().includes(q))
    );

    if (found) {
      setActiveOrder(found);
    } else {
      setNotFound(true);
    }
  };

  const statusLevels: Record<string, number> = {
    confirmed: 1,
    packing: 2,
    dispatched: 3,
    out_for_delivery: 4,
    delivered: 5
  };

  const currentStatus = activeOrder?.rider.status || 'confirmed';
  const currentLevel = statusLevels[currentStatus] || 1;

  const steps = [
    {
      title: 'Order Confirmed & Logged',
      desc: 'Registered in Suddais Collection Central Dispatch Registry (Malir, Karachi)',
      level: 1
    },
    {
      title: 'Packaging & Quality Sealed',
      desc: 'Fragrance batch verified, atomiser tested, wrapped in bubble & presentation box',
      level: 2
    },
    {
      title: 'Handed Over to Courier / Vehicle (گاڑی والوں کے حوالے)',
      desc: `${activeOrder?.rider.courier || 'Courier partner'} assigned (Consignment: ${activeOrder?.rider.trackingNo || 'Pending'})`,
      level: 3
    },
    {
      title: 'Out for Doorstep Delivery (ڈور سٹیپ رائیڈر)',
      desc: 'Courier rider is on the way to your doorstep with COD parcel',
      level: 4
    },
    {
      title: 'Successfully Delivered & Payment Done (کوریئر ڈن)',
      desc: 'Parcel received by customer and Cash on Delivery collected',
      level: 5
    }
  ];

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
              <Truck className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg sm:text-xl font-bold text-[#1a1612] font-display">
                Real-Time Order & Delivery Tracker
              </h3>
              <p className="text-xs text-[#736a5c]">
                Live courier consignment tracking & parcel dispatch status
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

        {/* Content */}
        <div className="p-5 sm:p-6 space-y-6 max-h-[82vh] overflow-y-auto">
          
          {/* Search Box */}
          <form onSubmit={handleSearch} className="flex gap-2">
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-[#8c8273] absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Enter your Order ID (e.g. SC-010101) or Phone Number..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-[#faf7f2] border border-[#dcd2be] rounded-xl pl-10 pr-3 py-2.5 text-xs text-[#1a1612] focus:outline-none focus:border-[#b8860b]"
              />
            </div>
            <button
              type="submit"
              className="px-5 py-2.5 rounded-xl bg-[#1a1612] text-white font-bold text-xs hover:bg-[#c59b27] transition-all cursor-pointer shadow-xs shrink-0"
            >
              Track Order
            </button>
          </form>

          {/* Empty search state when no order entered yet */}
          {!activeOrder && !notFound && (
            <div className="py-10 px-4 text-center rounded-2xl bg-[#faf7f2] border border-[#e8dec8] space-y-2">
              <Package className="w-10 h-10 text-[#c59b27] mx-auto opacity-60" />
              <h4 className="text-sm font-bold text-[#1a1612]">Track Your Delivery</h4>
              <p className="text-xs text-[#736a5c] max-w-sm mx-auto">
                Please enter the Order ID (e.g. <strong>SC-010101</strong>) from your confirmation slip or your phone number to check live parcel status.
              </p>
            </div>
          )}

          {notFound && (
            <div className="p-4 rounded-xl bg-amber-50 border border-amber-200 text-amber-900 text-xs flex items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0 text-amber-600" />
                <span>
                  No local order matched this query. Placed order via WhatsApp or phone?
                </span>
              </div>
              <a
                href="https://wa.me/923182187575?text=Hello!%20I%20would%20like%20to%20track%20my%20order."
                target="_blank"
                rel="noopener noreferrer"
                className="px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shrink-0 transition-colors"
              >
                Inquire on WhatsApp
              </a>
            </div>
          )}

          {activeOrder ? (
            <div className="space-y-6">
              
              {/* Top Order Badge & Info */}
              <div className="p-4 rounded-2xl bg-[#faf7f2] border border-[#e8dec8] grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
                <div>
                  <span className="text-[#8c8273] block text-[11px]">Order Number:</span>
                  <strong className="font-mono text-sm text-[#1a1612]">{activeOrder.id}</strong>
                </div>
                <div>
                  <span className="text-[#8c8273] block text-[11px]">Customer:</span>
                  <strong className="text-[#1a1612] truncate block">{activeOrder.customer.fullName}</strong>
                </div>
                <div>
                  <span className="text-[#8c8273] block text-[11px]">Destination:</span>
                  <strong className="text-[#1a1612] truncate block">{activeOrder.customer.city}</strong>
                </div>
                <div>
                  <span className="text-[#8c8273] block text-[11px]">Total COD:</span>
                  <strong className="font-mono text-[#b8860b] text-sm block">
                    Rs. {activeOrder.total.toLocaleString()}
                  </strong>
                </div>
              </div>

              {/* Progress Milestones Timeline or Cancelled State */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h4 className="text-xs font-bold text-[#1a1612] uppercase tracking-wider">
                    Shipment Progress Timeline
                  </h4>
                  <span className={`text-xs font-bold px-3 py-1 rounded-full ${
                    activeOrder.rider.status === 'cancelled'
                      ? 'text-rose-900 bg-rose-100 border border-rose-300'
                      : 'text-emerald-800 bg-emerald-50 border border-emerald-300'
                  }`}>
                    {activeOrder.rider.statusUr || 'Active Shipment'}
                  </span>
                </div>

                {activeOrder.rider.status === 'cancelled' ? (
                  <div className="p-5 rounded-2xl bg-rose-50 border-2 border-rose-300 text-rose-950 space-y-2">
                    <div className="flex items-center gap-2 font-bold text-sm text-rose-900">
                      <AlertCircle className="w-5 h-5 text-rose-600" />
                      <span>آرڈر منسوخ ہو چکا ہے (Order Cancelled)</span>
                    </div>
                    <p className="text-xs text-rose-800">
                      {activeOrder.cancellationReason === 'customer'
                        ? 'یہ آرڈر کسٹمر کی درخواست پر ڈسپیچ سے پہلے منسوخ کیا گیا ہے۔'
                        : 'یہ آرڈر اسٹاک نہ ہونے یا کوالٹی جانچ کی وجہ سے اسٹور اونر کی طرف سے منسوخ کیا گیا ہے۔'}
                    </p>
                    {activeOrder.rider.currentLocation && (
                      <p className="text-[11px] font-mono text-rose-700 bg-white/80 p-2.5 rounded-xl border border-rose-200">
                        تفصیل: {activeOrder.rider.currentLocation}
                      </p>
                    )}
                  </div>
                ) : (
                  <div className="relative pl-6 space-y-6 before:content-[''] before:absolute before:left-2.5 before:top-2 before:bottom-2 before:w-0.5 before:bg-[#e8dec8]">
                    {steps.map((st, idx) => {
                      const isCompleted = currentLevel > st.level;
                      const isCurrent = currentLevel === st.level;

                      return (
                        <div key={idx} className="relative">
                          <span
                            className={`absolute -left-6 top-0.5 w-5 h-5 rounded-full border-2 flex items-center justify-center text-[10px] font-bold ${
                              isCompleted
                                ? 'bg-emerald-600 border-white text-white shadow-xs'
                                : isCurrent
                                ? 'bg-[#c59b27] border-white text-white shadow-xs ring-4 ring-[#d4af37]/20 animate-pulse'
                                : 'bg-white border-[#dcd2be] text-[#8c8273]'
                            }`}
                          >
                            {isCompleted ? (
                              <CheckCircle className="w-3 h-3" />
                            ) : (
                              st.level
                            )}
                          </span>
                          <div className="ml-2">
                            <h5
                              className={`text-xs font-bold ${
                                isCompleted
                                  ? 'text-emerald-800'
                                  : isCurrent
                                  ? 'text-[#1a1612] font-extrabold'
                                  : 'text-[#8c8273]'
                              }`}
                            >
                              {st.title} {isCurrent && <span className="text-[10px] text-[#b8860b] font-normal">(Current Stage)</span>}
                            </h5>
                            <p className="text-[11px] text-[#736a5c]">
                              {st.desc}
                            </p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>

              {/* Assigned Courier & Rider Card */}
              <div className="p-4 sm:p-5 rounded-2xl bg-[#faf2dd] border border-[#d4af37]/40 space-y-3">
                <div className="flex items-center justify-between pb-2 border-b border-[#e8dec8] text-xs">
                  <span className="font-bold text-[#996515]">Courier Partner & Consignment Slip</span>
                  <span className="font-mono font-bold text-[#1a1612]">{activeOrder.rider.trackingNo}</span>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs text-[#52493d]">
                  <div>
                    <span className="text-[10px] text-[#8c7853] block">Courier Service:</span>
                    <strong className="text-[#1a1612]">{activeOrder.rider.courier}</strong>
                  </div>
                  <div>
                    <span className="text-[10px] text-[#8c7853] block">Estimated Arrival:</span>
                    <strong className="text-emerald-700">{activeOrder.rider.estimatedDelivery}</strong>
                  </div>
                  <div className="col-span-2 sm:col-span-1">
                    <span className="text-[10px] text-[#8c7853] block">Location / Note:</span>
                    <strong className="text-[#1a1612] truncate block">
                      {activeOrder.rider.currentLocation || 'In Transit'}
                    </strong>
                  </div>
                </div>
              </div>

              {/* Items in this shipment */}
              <div className="space-y-2">
                <h4 className="text-xs font-bold text-[#1a1612] uppercase tracking-wider">
                  Parcel Contents ({activeOrder.items.length})
                </h4>
                <div className="space-y-1.5 max-h-32 overflow-y-auto pr-1 text-xs">
                  {activeOrder.items.map((it) => (
                    <div
                      key={it.id}
                      className="flex items-center justify-between p-2.5 rounded-xl bg-[#faf7f2] border border-[#e8dec8]"
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

              {/* Direct WhatsApp Inquiry for this Order */}
              <div className="pt-2">
                <a
                  href={`https://wa.me/923182187575?text=${encodeURIComponent(
                    `Hello Suddais Collection! I am tracking my order:\n- Order ID: ${activeOrder.id}\n- Name: ${activeOrder.customer.fullName}\n- Destination: ${activeOrder.customer.city}\n- Status: ${activeOrder.rider.statusUr}\n- Tracking No: ${activeOrder.rider.trackingNo}\n\nPlease share the latest dispatch update!`
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs transition-colors shadow-sm"
                >
                  <MessageCircle className="w-4 h-4 fill-white" />
                  <span>Inquire about this Order on WhatsApp (+92 318 2187575)</span>
                </a>
              </div>

            </div>
          ) : (
            <div className="py-12 text-center text-[#8c8273] space-y-3">
              <PackageCheck className="w-12 h-12 mx-auto text-[#dcd2be]" />
              <h4 className="text-base font-bold text-[#1a1612]">No Order Tracking Record</h4>
              <p className="text-xs text-[#736a5c] max-w-sm mx-auto">
                Enter your Order ID (from checkout confirmation) or your contact phone number to view live courier status.
              </p>
              <div className="pt-2">
                <a
                  href="https://wa.me/923182187575?text=Hello!%20I%20would%20like%20to%20track%20my%20parcel."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#1a1612] text-white text-xs font-bold hover:bg-[#c59b27] transition-colors"
                >
                  <Phone className="w-3.5 h-3.5" />
                  <span>Ask Dispatch on WhatsApp</span>
                </a>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};
