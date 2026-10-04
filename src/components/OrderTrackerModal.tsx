import React, { useState, useEffect } from 'react';
import { X, Search, Truck, Phone, MapPin, CheckCircle, Clock, PackageCheck, AlertCircle } from 'lucide-react';
import { OrderRecord } from '../types';

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

  useEffect(() => {
    try {
      const stored = JSON.parse(localStorage.getItem('suddais_order_history') || '[]');
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
    { title: 'Order Received', desc: 'Verified and logged in dispatch system' },
    { title: 'Quality Inspection & Packing', desc: 'Secure protective presentation box prepared' },
    { title: 'Handed to Courier Partner', desc: 'Dispatched with tracking number assigned' },
    { title: 'Out for Delivery / Doorstep', desc: 'Rider is on the way to your address' }
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
                Real-Time Order & Rider Tracker
              </h3>
              <p className="text-xs text-[#736a5c]">
                Track courier dispatch, assigned delivery rider and parcel status
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
        <div className="p-5 sm:p-6 space-y-6 max-h-[80vh] overflow-y-auto">
          
          {/* Search Box */}
          <form onSubmit={handleSearch} className="flex gap-2">
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-[#8c8273] absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Enter Order ID (e.g. SUD-123456) or Phone Number..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-[#faf7f2] border border-[#dcd2be] rounded-xl pl-10 pr-3 py-2.5 text-xs text-[#1a1612] focus:outline-none focus:border-[#b8860b]"
              />
            </div>
            <button
              type="submit"
              className="px-5 py-2.5 rounded-xl bg-[#1a1612] text-white font-bold text-xs hover:bg-[#c59b27] transition-all cursor-pointer shadow-xs"
            >
              Track Order
            </button>
          </form>

          {notFound && (
            <div className="p-4 rounded-xl bg-amber-50 border border-amber-200 text-amber-900 text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0 text-amber-600" />
              <span>
                No active order found for this query. If you placed your order via WhatsApp, please contact support directly at <strong>0318-2187575</strong>.
              </span>
            </div>
          )}

          {activeOrder ? (
            <div className="space-y-6">
              
              {/* Top Order Badge & Info */}
              <div className="p-4 rounded-2xl bg-[#faf7f2] border border-[#e8dec8] flex flex-wrap items-center justify-between gap-3 text-xs">
                <div>
                  <span className="text-[#8c8273] block text-[11px]">Order Number:</span>
                  <strong className="font-mono text-sm text-[#1a1612]">{activeOrder.id}</strong>
                </div>
                <div>
                  <span className="text-[#8c8273] block text-[11px]">Customer:</span>
                  <strong className="text-[#1a1612]">{activeOrder.customer.fullName}</strong>
                </div>
                <div>
                  <span className="text-[#8c8273] block text-[11px]">Total Payable:</span>
                  <strong className="font-mono text-[#b8860b] text-sm">
                    Rs. {activeOrder.total.toLocaleString()}
                  </strong>
                </div>
              </div>

              {/* Progress Milestones */}
              <div className="space-y-4">
                <h4 className="text-xs font-bold text-[#1a1612] uppercase tracking-wider">
                  Shipment Progress Timeline
                </h4>

                <div className="relative pl-6 space-y-6 before:content-[''] before:absolute before:left-2.5 before:top-2 before:bottom-2 before:w-0.5 before:bg-[#e8dec8]">
                  {steps.map((st, idx) => {
                    const isCompleted = idx <= 2;
                    return (
                      <div key={idx} className="relative">
                        <span
                          className={`absolute -left-6 top-0.5 w-5 h-5 rounded-full border-2 flex items-center justify-center text-[10px] font-bold ${
                            isCompleted
                              ? 'bg-[#c59b27] border-white text-white'
                              : 'bg-white border-[#dcd2be] text-[#8c8273]'
                          }`}
                        >
                          {isCompleted ? <CheckCircle className="w-3 h-3" /> : idx + 1}
                        </span>
                        <div className="ml-2">
                          <h5 className={`text-xs font-bold ${isCompleted ? 'text-[#1a1612]' : 'text-[#8c8273]'}`}>
                            {st.title}
                          </h5>
                          <p className="text-[11px] text-[#736a5c]">
                            {st.desc}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Assigned Courier & Rider Card */}
              <div className="p-4 rounded-2xl bg-[#faf2dd] border border-[#d4af37]/40 space-y-2">
                <div className="flex items-center justify-between pb-2 border-b border-[#e8dec8] text-xs">
                  <span className="font-bold text-[#996515]">Courier Partner Details</span>
                  <span className="font-mono font-bold text-[#1a1612]">{activeOrder.rider.trackingNo}</span>
                </div>
                <div className="grid grid-cols-2 gap-2 text-xs text-[#52493d]">
                  <div>
                    <span className="text-[10px] text-[#8c7853] block">Courier:</span>
                    <strong className="text-[#1a1612]">{activeOrder.rider.courier}</strong>
                  </div>
                  <div>
                    <span className="text-[10px] text-[#8c7853] block">Status:</span>
                    <strong className="text-emerald-700">{activeOrder.rider.estimatedDelivery}</strong>
                  </div>
                </div>
              </div>

              {/* Items in this shipment */}
              <div className="space-y-2">
                <h4 className="text-xs font-bold text-[#1a1612] uppercase tracking-wider">
                  Parcel Contents ({activeOrder.items.length})
                </h4>
                <div className="space-y-1.5 max-h-36 overflow-y-auto pr-1 text-xs">
                  {activeOrder.items.map((it) => (
                    <div
                      key={it.id}
                      className="flex items-center justify-between p-2 rounded-xl bg-[#faf7f2] border border-[#e8dec8]"
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

            </div>
          ) : (
            <div className="py-12 text-center text-[#8c8273] space-y-3">
              <PackageCheck className="w-12 h-12 mx-auto text-[#dcd2be]" />
              <h4 className="text-base font-bold text-[#1a1612]">No Order Selected</h4>
              <p className="text-xs text-[#736a5c] max-w-sm mx-auto">
                Enter your Order ID (from checkout confirmation) or your contact phone number to view live courier status.
              </p>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};
