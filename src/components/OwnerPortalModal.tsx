import React, { useState, useEffect } from 'react';
import {
  X,
  ShieldCheck,
  Lock,
  Unlock,
  Truck,
  Package,
  CheckCircle2,
  AlertCircle,
  Phone,
  MessageCircle,
  MapPin,
  Clock,
  Printer,
  ChevronDown,
  RefreshCw,
  Search,
  Filter,
  DollarSign,
  ArrowRight,
  Send,
  Check
} from 'lucide-react';
import { OrderRecord, RiderStatus } from '../types';
import {
  getStoredOrders,
  updateOrderStatusInStore,
  ORDER_UPDATE_EVENT
} from '../data/orderStore';

interface OwnerPortalModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const OwnerPortalModal: React.FC<OwnerPortalModalProps> = ({
  isOpen,
  onClose,
}) => {
  if (!isOpen) return null;

  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    return sessionStorage.getItem('suddais_owner_auth') === 'true';
  });
  const [pinInput, setPinInput] = useState('');
  const [pinError, setPinError] = useState(false);

  const [orders, setOrders] = useState<OrderRecord[]>([]);
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState<'orders' | 'dispatch'>('orders');

  // Modal for setting custom courier / tracking info on dispatch
  const [dispatchModalOrder, setDispatchModalOrder] = useState<OrderRecord | null>(null);
  const [courierName, setCourierName] = useState('TCS Express');
  const [trackingNumber, setTrackingNumber] = useState('');
  const [riderPhone, setRiderPhone] = useState('0318-2187575');

  const loadOrders = () => {
    setOrders(getStoredOrders());
  };

  useEffect(() => {
    loadOrders();
    const handleSync = () => loadOrders();
    window.addEventListener(ORDER_UPDATE_EVENT, handleSync);
    window.addEventListener('storage', handleSync);
    return () => {
      window.removeEventListener(ORDER_UPDATE_EVENT, handleSync);
      window.removeEventListener('storage', handleSync);
    };
  }, []);

  const handleLogin = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    // Default PIN: suddais786 or 786
    if (pinInput.trim() === 'suddais786' || pinInput.trim() === '786' || pinInput.trim() === 'admin') {
      setIsAuthenticated(true);
      sessionStorage.setItem('suddais_owner_auth', 'true');
      setPinError(false);
    } else {
      setPinError(true);
    }
  };

  const handleQuickUnlock = () => {
    setIsAuthenticated(true);
    sessionStorage.setItem('suddais_owner_auth', 'true');
    setPinError(false);
  };

  const handleStatusChange = (
    orderId: string,
    newStatus: RiderStatus['status'],
    details?: Partial<RiderStatus>
  ) => {
    const updated = updateOrderStatusInStore(orderId, newStatus, details);
    setOrders(updated);
  };

  const handleOpenDispatchDialog = (order: OrderRecord) => {
    setDispatchModalOrder(order);
    setCourierName(order.customer.city.includes('Karachi') ? 'Suddais Local Courier Rider' : 'TCS Express');
    setTrackingNumber(`SC-${Math.floor(10000000 + Math.random() * 90000000)}`);
  };

  const handleConfirmDispatch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!dispatchModalOrder) return;

    handleStatusChange(dispatchModalOrder.id, 'dispatched', {
      courier: courierName,
      trackingNo: trackingNumber,
      riderPhone: riderPhone,
      currentLocation: `Handed to ${courierName} / Dispatched via Vehicle`
    });

    setDispatchModalOrder(null);
  };

  // Metrics
  const totalRevenue = orders.reduce((acc, o) => acc + o.total, 0);
  const pendingOrders = orders.filter((o) => o.rider.status === 'confirmed');
  const packedOrders = orders.filter((o) => o.rider.status === 'packing');
  const dispatchedOrders = orders.filter((o) => o.rider.status === 'dispatched' || o.rider.status === 'out_for_delivery');
  const deliveredOrders = orders.filter((o) => o.rider.status === 'delivered');

  // Filtered orders list
  const filteredOrders = orders.filter((o) => {
    if (filterStatus !== 'all' && o.rider.status !== filterStatus) return false;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchName = o.customer.fullName.toLowerCase().includes(q);
      const matchPhone = o.customer.phone.includes(q);
      const matchId = o.id.toLowerCase().includes(q);
      const matchCity = o.customer.city.toLowerCase().includes(q);
      return matchName || matchPhone || matchId || matchCity;
    }
    return true;
  });

  const getStatusBadge = (status: RiderStatus['status']) => {
    switch (status) {
      case 'confirmed':
        return (
          <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-amber-100 text-amber-900 border border-amber-300">
            🟡 New Order (تصدیق شدہ)
          </span>
        );
      case 'packing':
        return (
          <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-purple-100 text-purple-900 border border-purple-300">
            🟣 Packed (پیکنگ مکمل)
          </span>
        );
      case 'dispatched':
        return (
          <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-blue-100 text-blue-900 border border-blue-300">
            🔵 Dispatched (گاڑی / کوریئر کے پاس)
          </span>
        );
      case 'out_for_delivery':
        return (
          <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-orange-100 text-orange-900 border border-orange-300">
            🟠 Out for Delivery (ڈور سٹیپ رائیڈر)
          </span>
        );
      case 'delivered':
        return (
          <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-emerald-100 text-emerald-900 border border-emerald-300">
            🟢 Delivered & Done (کوریئر ڈن - رقم وصول)
          </span>
        );
      default:
        return (
          <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-gray-100 text-gray-800">
            {status}
          </span>
        );
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/75 backdrop-blur-sm overflow-y-auto">
      <div
        className="relative w-full max-w-5xl bg-white border border-[#d4af37]/40 rounded-3xl shadow-2xl text-[#1a1612] overflow-hidden my-auto max-h-[92vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Header */}
        <div className="p-5 sm:p-6 bg-[#1a1612] text-white border-b border-[#d4af37]/30 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#d4af37] to-[#996515] flex items-center justify-center text-white font-bold shadow-sm">
              <ShieldCheck className="w-5 h-5 text-white" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-lg sm:text-xl font-bold font-display text-white">
                  Suddais Ahmed — Store Owner Portal
                </h3>
                <span className="text-[10px] bg-[#d4af37] text-[#1a1612] font-black uppercase px-2 py-0.5 rounded">
                  ADMIN ONLY
                </span>
              </div>
              <p className="text-xs text-[#dcd7cb]">
                Live Orders Dashboard, Dispatch Control & Logistics Tracking
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl text-white/70 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {!isAuthenticated ? (
          /* Authentication Screen */
          <div className="p-8 sm:p-14 text-center max-w-md mx-auto space-y-5 my-auto">
            <div className="w-16 h-16 rounded-3xl bg-[#faf2dd] border border-[#d4af37]/50 text-[#b8860b] mx-auto flex items-center justify-center shadow-md">
              <Lock className="w-8 h-8" />
            </div>
            <div className="space-y-1">
              <h4 className="text-xl font-bold text-[#1a1612] font-display">
                Owner Portal Access
              </h4>
              <p className="text-xs text-[#665e52]">
                Enter your Admin PIN to manage customer orders, dispatch status, and revenue.
              </p>
            </div>

            <form onSubmit={handleLogin} className="space-y-3">
              <div>
                <input
                  type="password"
                  value={pinInput}
                  onChange={(e) => {
                    setPinInput(e.target.value);
                    setPinError(false);
                  }}
                  placeholder="Enter PIN (Default: suddais786)"
                  className="w-full bg-[#faf7f2] border border-[#dcd2be] rounded-xl px-4 py-3 text-center text-sm font-mono tracking-widest text-[#1a1612] focus:outline-none focus:border-[#b8860b]"
                />
                {pinError && (
                  <p className="text-xs text-red-600 mt-1 font-medium">
                    Incorrect PIN. Try <strong>suddais786</strong> or click quick unlock below.
                  </p>
                )}
              </div>

              <button
                type="submit"
                className="w-full py-3 rounded-xl bg-gradient-to-r from-[#d4af37] via-[#e6c352] to-[#c59b27] text-[#1a1612] font-bold text-xs uppercase tracking-wider hover:brightness-105 transition-all shadow-md cursor-pointer"
              >
                Access Owner Dashboard
              </button>
            </form>

            <div className="pt-2 border-t border-[#f0e8d8]">
              <button
                type="button"
                onClick={handleQuickUnlock}
                className="text-xs font-semibold text-[#8b6508] hover:text-[#1a1612] underline cursor-pointer"
              >
                Owner 1-Click Quick Unlock (Dev Mode)
              </button>
            </div>
          </div>
        ) : (
          /* Main Dashboard */
          <div className="flex-1 overflow-y-auto p-5 sm:p-6 space-y-6">
            
            {/* Top Metric Cards */}
            <div className="grid grid-cols-2 lg:grid-cols-5 gap-3">
              <div className="p-4 rounded-2xl bg-[#faf7f2] border border-[#e8dec8] space-y-1">
                <span className="text-[11px] text-[#736a5c] block font-medium">Total Orders</span>
                <span className="text-2xl font-bold font-mono text-[#1a1612]">{orders.length}</span>
              </div>

              <div className="p-4 rounded-2xl bg-[#faf2dd] border border-[#d4af37]/40 space-y-1">
                <span className="text-[11px] text-[#8b6508] block font-medium">Total Gross Value</span>
                <span className="text-xl sm:text-2xl font-bold font-mono text-[#b8860b]">
                  Rs. {totalRevenue.toLocaleString()}
                </span>
              </div>

              <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 space-y-1">
                <span className="text-[11px] text-amber-800 block font-medium">New Pending (نئے آرڈرز)</span>
                <span className="text-2xl font-bold font-mono text-amber-900">{pendingOrders.length}</span>
              </div>

              <div className="p-4 rounded-2xl bg-blue-50 border border-blue-200 space-y-1">
                <span className="text-[11px] text-blue-800 block font-medium">In Transit / Vehicle (گاڑی میں)</span>
                <span className="text-2xl font-bold font-mono text-blue-900">{dispatchedOrders.length}</span>
              </div>

              <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 space-y-1 col-span-2 lg:col-span-1">
                <span className="text-[11px] text-emerald-800 block font-medium">Delivered (کوریئر ڈن)</span>
                <span className="text-2xl font-bold font-mono text-emerald-900">{deliveredOrders.length}</span>
              </div>
            </div>

            {/* Filter & Search Bar */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2">
              {/* Status Segmented Buttons */}
              <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto pb-1 text-xs">
                {[
                  { id: 'all', label: 'All Orders', count: orders.length },
                  { id: 'confirmed', label: 'New / Received', count: pendingOrders.length },
                  { id: 'packing', label: 'Packed', count: packedOrders.length },
                  { id: 'dispatched', label: 'Dispatched', count: dispatchedOrders.length },
                  { id: 'delivered', label: 'Delivered (Done)', count: deliveredOrders.length }
                ].map((st) => (
                  <button
                    key={st.id}
                    onClick={() => setFilterStatus(st.id)}
                    className={`px-3 py-1.5 rounded-xl font-bold transition-colors cursor-pointer shrink-0 ${
                      filterStatus === st.id
                        ? 'bg-[#1a1612] text-white shadow-xs'
                        : 'bg-[#faf7f2] border border-[#e8dec8] text-[#52493d] hover:border-[#1a1612]'
                    }`}
                  >
                    <span>{st.label}</span>
                    <span className="ml-1.5 text-[10px] opacity-75 font-mono">({st.count})</span>
                  </button>
                ))}
              </div>

              {/* Search Box */}
              <div className="relative w-full sm:w-64">
                <Search className="w-4 h-4 text-[#8c8273] absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Search by name, phone or ID..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-[#faf7f2] border border-[#dcd2be] rounded-xl pl-9 pr-3 py-1.5 text-xs text-[#1a1612] focus:outline-none focus:border-[#b8860b]"
                />
              </div>
            </div>

            {/* Orders List / Cards */}
            <div className="space-y-4">
              {filteredOrders.length === 0 ? (
                <div className="py-14 text-center text-[#8c8273] space-y-2">
                  <Package className="w-10 h-10 mx-auto opacity-40" />
                  <h4 className="text-base font-bold text-[#1a1612]">No Orders Found</h4>
                  <p className="text-xs">No orders match the current filter or search criteria.</p>
                </div>
              ) : (
                filteredOrders.map((order) => (
                  <div
                    key={order.id}
                    className="p-5 rounded-3xl bg-white border border-[#e8dec8] hover:border-[#c59b27] shadow-sm transition-all space-y-4"
                  >
                    {/* Order Header */}
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-[#f0ebd9]">
                      <div className="flex items-center gap-2.5">
                        <div className="px-3 py-1 rounded-lg bg-[#faf2dd] border border-[#d4af37]/30 text-xs font-mono font-bold text-[#996515]">
                          {order.id}
                        </div>
                        <span className="text-xs text-[#736a5c]">
                          {new Date(order.createdAt).toLocaleString('en-US', {
                            dateStyle: 'medium',
                            timeStyle: 'short'
                          })}
                        </span>
                      </div>

                      <div className="flex items-center gap-2">
                        {getStatusBadge(order.rider.status)}
                      </div>
                    </div>

                    {/* Customer & Destination Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs text-[#52493d]">
                      <div>
                        <span className="text-[#8c7853] block text-[11px] font-bold">CUSTOMER DETAILS:</span>
                        <strong className="text-sm text-[#1a1612] block">{order.customer.fullName}</strong>
                        <div className="flex items-center gap-2 mt-1">
                          <span className="font-mono">{order.customer.phone}</span>
                          <a
                            href={`https://wa.me/${order.customer.phone.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(
                              `Hello ${order.customer.fullName}! Thank you for ordering from Suddais Collection. Your order ID is ${order.id}.`
                            )}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-1 rounded-md bg-emerald-100 text-emerald-800 hover:bg-emerald-200 transition-colors"
                            title="Chat on WhatsApp"
                          >
                            <MessageCircle className="w-3.5 h-3.5" />
                          </a>
                        </div>
                      </div>

                      <div>
                        <span className="text-[#8c7853] block text-[11px] font-bold">DESTINATION & ADDRESS:</span>
                        <strong className="text-[#1a1612] block">{order.customer.city}</strong>
                        <p className="text-[11px] text-[#665e52] mt-0.5 line-clamp-2">
                          {order.customer.address}
                        </p>
                      </div>

                      <div>
                        <span className="text-[#8c7853] block text-[11px] font-bold">PAYMENT & COURIER:</span>
                        <div className="flex justify-between items-center text-[#1a1612] font-medium">
                          <span>Total Payable (COD):</span>
                          <strong className="font-mono text-sm text-[#b8860b]">
                            Rs. {order.total.toLocaleString()}
                          </strong>
                        </div>
                        <div className="text-[11px] text-[#736a5c] mt-0.5">
                          Courier: <strong>{order.rider.courier}</strong> (Slip: {order.rider.trackingNo})
                        </div>
                      </div>
                    </div>

                    {/* Items List */}
                    <div className="p-3 rounded-2xl bg-[#faf7f2] border border-[#eee5d3] text-xs space-y-1.5">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-[#8c7853] block">
                        Ordered Items ({order.items.length}):
                      </span>
                      {order.items.map((it) => (
                        <div key={it.id} className="flex justify-between items-center">
                          <span className="font-medium text-[#1a1612]">
                            • {it.nameEn} ({it.selectedSize}) x{it.quantity}
                          </span>
                          <span className="font-mono text-[#736a5c]">
                            Rs. {(it.unitPrice * it.quantity).toLocaleString()}
                          </span>
                        </div>
                      ))}
                    </div>

                    {/* Owner Action Buttons Toolbar (Order Lifecycle Management) */}
                    <div className="pt-2 border-t border-[#f0ebd9] flex flex-wrap items-center justify-between gap-2">
                      <div className="flex items-center gap-1.5 flex-wrap">
                        {/* Step 1: Mark Packed */}
                        {order.rider.status === 'confirmed' && (
                          <button
                            onClick={() =>
                              handleStatusChange(order.id, 'packing', {
                                currentLocation: 'Packed in Presentation Box & Quality Sealed'
                              })
                            }
                            className="px-3 py-1.5 rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-bold text-xs flex items-center gap-1.5 transition-colors cursor-pointer"
                          >
                            <Package className="w-3.5 h-3.5" />
                            <span>1. Mark Packed (پیکنگ مکمل)</span>
                          </button>
                        )}

                        {/* Step 2: Hand over to Vehicle / Courier */}
                        {(order.rider.status === 'confirmed' || order.rider.status === 'packing') && (
                          <button
                            onClick={() => handleOpenDispatchDialog(order)}
                            className="px-3 py-1.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs flex items-center gap-1.5 transition-colors cursor-pointer"
                          >
                            <Truck className="w-3.5 h-3.5" />
                            <span>2. Dispatch / Hand to Vehicle (گاڑی والوں کو دیں)</span>
                          </button>
                        )}

                        {/* Step 3: Out for Doorstep Delivery */}
                        {order.rider.status === 'dispatched' && (
                          <button
                            onClick={() =>
                              handleStatusChange(order.id, 'out_for_delivery', {
                                currentLocation: 'Local Courier Rider Out for Delivery to Doorstep'
                              })
                            }
                            className="px-3 py-1.5 rounded-xl bg-orange-600 hover:bg-orange-700 text-white font-bold text-xs flex items-center gap-1.5 transition-colors cursor-pointer"
                          >
                            <Truck className="w-3.5 h-3.5" />
                            <span>3. Out for Delivery (کسٹمر کے پاس روانہ)</span>
                          </button>
                        )}

                        {/* Step 4: Mark Delivered & Done */}
                        {order.rider.status !== 'delivered' && (
                          <button
                            onClick={() =>
                              handleStatusChange(order.id, 'delivered', {
                                currentLocation: 'Successfully Delivered to Customer & Cash Collected'
                              })
                            }
                            className="px-3 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs flex items-center gap-1.5 transition-colors cursor-pointer"
                          >
                            <CheckCircle2 className="w-3.5 h-3.5" />
                            <span>Mark Delivered & Done (کوریئر ڈن)</span>
                          </button>
                        )}
                      </div>

                      {/* Customer Communication & Slip Print */}
                      <div className="flex items-center gap-1.5">
                        <a
                          href={`https://wa.me/${order.customer.phone.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(
                            `Hello ${order.customer.fullName}! ✨\nUpdate regarding your Suddais Collection Order (${order.id}):\n- Status: ${
                              order.rider.statusUr
                            }\n- Courier: ${order.rider.courier}\n- Tracking No: ${
                              order.rider.trackingNo
                            }\n- COD Amount: Rs. ${order.total.toLocaleString()}\n\nThank you for choosing Suddais Collection!`
                          )}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="px-3 py-1.5 rounded-xl bg-emerald-50 text-emerald-800 border border-emerald-300 hover:bg-emerald-100 font-bold text-xs flex items-center gap-1.5 transition-colors"
                        >
                          <Send className="w-3.5 h-3.5" />
                          <span>WhatsApp Update</span>
                        </a>

                        <button
                          onClick={() => {
                            const slip = `SUDDAIS COLLECTION PACKING SLIP\nOrder ID: ${order.id}\nCustomer: ${order.customer.fullName}\nPhone: ${order.customer.phone}\nCity: ${order.customer.city}\nAddress: ${order.customer.address}\nCourier: ${order.rider.courier} (Tracking: ${order.rider.trackingNo})\nTotal Payable: Rs. ${order.total}\nItems:\n${order.items.map(i => `- ${i.nameEn} (${i.selectedSize}) x${i.quantity}`).join('\n')}`;
                            navigator.clipboard.writeText(slip);
                            alert('Packing slip copied to clipboard! You can paste or print it.');
                          }}
                          className="px-3 py-1.5 rounded-xl bg-[#faf7f2] border border-[#dcd2be] text-[#1a1612] hover:bg-white font-bold text-xs flex items-center gap-1.5 transition-colors cursor-pointer"
                        >
                          <Printer className="w-3.5 h-3.5" />
                          <span>Copy Slip</span>
                        </button>
                      </div>
                    </div>

                  </div>
                ))
              )}
            </div>

          </div>
        )}

        {/* Modal: Dispatch / Vehicle Assignment Dialog */}
        {dispatchModalOrder && (
          <div className="fixed inset-0 z-60 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
            <div className="w-full max-w-md bg-white rounded-3xl p-6 border border-[#e8dec8] shadow-2xl space-y-4">
              <div className="flex items-center justify-between pb-2 border-b border-[#e8dec8]">
                <h4 className="text-base font-bold text-[#1a1612] font-display flex items-center gap-2">
                  <Truck className="w-5 h-5 text-[#b8860b]" />
                  <span>Dispatch Order ({dispatchModalOrder.id})</span>
                </h4>
                <button
                  onClick={() => setDispatchModalOrder(null)}
                  className="p-1 rounded-lg text-gray-400 hover:text-gray-700"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <p className="text-xs text-[#665e52]">
                Assign courier partner and tracking consignment slip for customer: <strong>{dispatchModalOrder.customer.fullName}</strong> ({dispatchModalOrder.customer.city})
              </p>

              <form onSubmit={handleConfirmDispatch} className="space-y-3">
                <div>
                  <label className="block text-xs font-bold text-[#1a1612] mb-1">
                    Courier Partner / Vehicle Service:
                  </label>
                  <select
                    value={courierName}
                    onChange={(e) => setCourierName(e.target.value)}
                    className="w-full bg-[#faf7f2] border border-[#dcd2be] rounded-xl px-3 py-2 text-xs text-[#1a1612] font-medium"
                  >
                    <option value="Suddais Local Courier Rider (Karachi)">Suddais Local Courier Rider (Karachi)</option>
                    <option value="TCS Express Hub">TCS Express</option>
                    <option value="Leopards Courier Service">Leopards Courier</option>
                    <option value="Trax Logistics">Trax Logistics</option>
                    <option value="Call Courier Service">Call Courier</option>
                    <option value="Daewoo FastEx / Cargo">Daewoo FastEx / Cargo</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#1a1612] mb-1">
                    Consignment Tracking Slip # / Consignment Number:
                  </label>
                  <input
                    type="text"
                    required
                    value={trackingNumber}
                    onChange={(e) => setTrackingNumber(e.target.value)}
                    placeholder="e.g. TCS-8927163"
                    className="w-full bg-[#faf7f2] border border-[#dcd2be] rounded-xl px-3 py-2 text-xs font-mono text-[#1a1612]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#1a1612] mb-1">
                    Rider / Dispatch Contact Number:
                  </label>
                  <input
                    type="text"
                    value={riderPhone}
                    onChange={(e) => setRiderPhone(e.target.value)}
                    className="w-full bg-[#faf7f2] border border-[#dcd2be] rounded-xl px-3 py-2 text-xs text-[#1a1612]"
                  />
                </div>

                <div className="pt-2 flex gap-2">
                  <button
                    type="button"
                    onClick={() => setDispatchModalOrder(null)}
                    className="flex-1 py-2.5 rounded-xl border border-[#dcd2be] text-xs font-bold text-[#1a1612] hover:bg-gray-50"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="flex-1 py-2.5 rounded-xl bg-[#1a1612] hover:bg-[#c59b27] text-white text-xs font-bold transition-colors"
                  >
                    Confirm & Dispatch
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
