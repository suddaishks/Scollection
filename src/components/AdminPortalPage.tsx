import React, { useState, useEffect } from 'react';
import {
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
  ExternalLink,
  Store,
  LogOut,
  Send,
  Check,
  TrendingUp,
  BarChart3,
  Calendar,
  Sparkles,
  Tag,
  Edit3,
  Plus,
  Trash2,
  Image as ImageIcon,
  CheckSquare,
  XSquare,
  FileText,
  AlertTriangle,
  RotateCcw
} from 'lucide-react';
import { OrderRecord, Product, ProductCategory, RiderStatus } from '../types';
import {
  getStoredOrders,
  updateOrderStatusInStore,
  ORDER_UPDATE_EVENT
} from '../data/orderStore';
import {
  getStoredProducts,
  updateProductInStore,
  addProductToStore,
  deleteProductFromStore,
  resetProductsToDefault,
  PRODUCT_UPDATE_EVENT
} from '../data/productStore';
import {
  IMPERIAL_VALLEY_IMG,
  KHAMRAH_IMG,
  NINE_PM_IMG,
  ASAD_IMG,
  OUD_PERFUME_IMG,
  DEHN_ATTAR_IMG,
  EMBD_TOPI_IMG,
  BLUE_PERFUME_IMG,
  AMBER_PERFUME_IMG,
  WHITE_MUSK_IMG,
  CAPS_COLLECTION_IMG,
  BESPOKE_WORKSHOP_IMG
} from '../data/images';
import { BrandLogo } from './BrandLogo';

interface AdminPortalPageProps {
  onGoToStore: () => void;
}

export const AdminPortalPage: React.FC<AdminPortalPageProps> = ({ onGoToStore }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    return sessionStorage.getItem('suddais_owner_auth') === 'true';
  });
  const [pinInput, setPinInput] = useState('');
  const [pinError, setPinError] = useState(false);

  // Active Main Tab
  const [currentTab, setCurrentTab] = useState<'orders' | 'products'>('orders');

  // Orders State
  const [orders, setOrders] = useState<OrderRecord[]>([]);
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Products State
  const [products, setProducts] = useState<Product[]>([]);
  const [productSearch, setProductSearch] = useState('');
  const [productCategoryFilter, setProductCategoryFilter] = useState<'all' | ProductCategory>('all');
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [isAddingProduct, setIsAddingProduct] = useState(false);

  // Dispatch Dialog Modal
  const [dispatchModalOrder, setDispatchModalOrder] = useState<OrderRecord | null>(null);
  const [courierName, setCourierName] = useState('TCS Express');
  const [trackingNumber, setTrackingNumber] = useState('');
  const [riderPhone, setRiderPhone] = useState('0318-2187575');

  // Cancel Dialog Modal
  const [cancelModalOrder, setCancelModalOrder] = useState<OrderRecord | null>(null);
  const [cancelReasonType, setCancelReasonType] = useState<'customer' | 'owner'>('customer');
  const [cancelCustomNotes, setCancelCustomNotes] = useState('Customer called to cancel order before shipment');

  // Form for New / Edit Product
  const [productForm, setProductForm] = useState<{
    id: string;
    nameEn: string;
    nameUr: string;
    category: ProductCategory;
    price: number;
    originalPrice: number;
    inStock: boolean;
    isDeal: boolean;
    dealTag: string;
    image: string;
    volume: string;
    descriptionEn: string;
  }>({
    id: '',
    nameEn: '',
    nameUr: '',
    category: 'perfume',
    price: 3000,
    originalPrice: 3500,
    inStock: true,
    isDeal: false,
    dealTag: 'Special Edition',
    image: IMPERIAL_VALLEY_IMG,
    volume: '50ml',
    descriptionEn: 'Premium luxury impression fragrance with 12+ hours projection.'
  });

  const loadData = () => {
    setOrders(getStoredOrders());
    setProducts(getStoredProducts());
  };

  useEffect(() => {
    loadData();
    const handleSync = () => loadData();
    window.addEventListener(ORDER_UPDATE_EVENT, handleSync);
    window.addEventListener(PRODUCT_UPDATE_EVENT, handleSync);
    window.addEventListener('storage', handleSync);
    return () => {
      window.removeEventListener(ORDER_UPDATE_EVENT, handleSync);
      window.removeEventListener(PRODUCT_UPDATE_EVENT, handleSync);
      window.removeEventListener('storage', handleSync);
    };
  }, []);

  const handleLogin = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    const clean = pinInput.trim().toLowerCase();
    if (clean === 'suddais786' || clean === '786' || clean === 'admin') {
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

  const handleLogout = () => {
    setIsAuthenticated(false);
    sessionStorage.removeItem('suddais_owner_auth');
  };

  const handleStatusChange = (
    orderId: string,
    newStatus: RiderStatus['status'],
    details?: Partial<RiderStatus>,
    cancellationReason?: 'customer' | 'owner' | string
  ) => {
    const updated = updateOrderStatusInStore(orderId, newStatus, details, cancellationReason);
    setOrders(updated);
  };

  const handleOpenDispatchDialog = (order: OrderRecord) => {
    setDispatchModalOrder(order);
    setCourierName(order.customer.city.includes('Karachi') ? 'Suddais Local Courier Rider (Karachi)' : 'TCS Express');
    setTrackingNumber(order.rider.trackingNo || `TRK-010${Math.floor(100 + Math.random() * 900)}`);
  };

  const handleConfirmDispatch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!dispatchModalOrder) return;

    handleStatusChange(dispatchModalOrder.id, 'dispatched', {
      courier: courierName,
      trackingNo: trackingNumber,
      riderPhone: riderPhone,
      currentLocation: `Handed to ${courierName} / Dispatched on Delivery Vehicle`
    });

    setDispatchModalOrder(null);
  };

  const handleConfirmCancellation = (e: React.FormEvent) => {
    e.preventDefault();
    if (!cancelModalOrder) return;

    handleStatusChange(
      cancelModalOrder.id,
      'cancelled',
      {
        currentLocation: cancelCustomNotes || `Order Cancelled by ${cancelReasonType === 'customer' ? 'Customer' : 'Store Owner'}`
      },
      cancelReasonType
    );

    setCancelModalOrder(null);
  };

  // Printing Shipping Label (Requested by user)
  const handlePrintShippingLabel = (order: OrderRecord) => {
    const win = window.open('', '_blank');
    if (!win) return;

    win.document.write(`
      <!DOCTYPE html>
      <html>
      <head>
        <title>Shipping Label - ${order.id} - Suddais Collection</title>
        <style>
          @page { size: 4in 6in; margin: 0.2in; }
          body {
            font-family: Arial, sans-serif;
            color: #111;
            margin: 0;
            padding: 10px;
          }
          .label-box {
            border: 3px solid #000;
            padding: 12px;
            box-sizing: border-box;
            height: 100%;
          }
          .header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            border-bottom: 2px solid #000;
            padding-bottom: 8px;
          }
          .brand {
            font-size: 18px;
            font-weight: 900;
            letter-spacing: 1px;
          }
          .courier-badge {
            background: #000;
            color: #fff;
            padding: 4px 8px;
            font-weight: bold;
            font-size: 13px;
          }
          .barcode-box {
            text-align: center;
            padding: 12px 0;
            border-bottom: 2px dashed #444;
          }
          .barcode {
            font-family: 'Courier New', Courier, monospace;
            font-size: 30px;
            letter-spacing: 5px;
            font-weight: 900;
          }
          .trk-no {
            font-size: 13px;
            font-weight: bold;
            margin-top: 4px;
          }
          .consignee-box {
            padding: 10px 0;
            border-bottom: 2px solid #000;
          }
          .consignee-title {
            font-size: 11px;
            font-weight: bold;
            text-transform: uppercase;
            color: #555;
          }
          .customer-name {
            font-size: 18px;
            font-weight: bold;
            margin: 4px 0;
          }
          .customer-phone {
            font-size: 16px;
            font-weight: bold;
          }
          .customer-address {
            font-size: 13px;
            line-height: 1.4;
            margin-top: 4px;
          }
          .cod-strip {
            display: flex;
            justify-content: space-between;
            align-items: center;
            background: #eee;
            border: 2px solid #000;
            padding: 8px 12px;
            margin: 10px 0;
          }
          .cod-text {
            font-size: 13px;
            font-weight: bold;
          }
          .cod-amount {
            font-size: 24px;
            font-weight: 900;
          }
          .items-summary {
            font-size: 11px;
            border-bottom: 1px solid #ccc;
            padding-bottom: 8px;
            margin-bottom: 8px;
          }
          .footer-sender {
            font-size: 10px;
            color: #333;
            display: flex;
            justify-content: space-between;
          }
        </style>
      </head>
      <body>
        <div class="label-box">
          <div class="header">
            <div>
              <div class="brand">SUDDAIS COLLECTION</div>
              <div style="font-size: 10px;">EXPRESS FRAGRANCE LOGISTICS</div>
            </div>
            <div class="courier-badge">${order.rider.courier.toUpperCase()}</div>
          </div>

          <div class="barcode-box">
            <div class="barcode">||| | |||| || | |||| ||||</div>
            <div class="trk-no">CONSIGNMENT #: <strong>${order.rider.trackingNo}</strong></div>
            <div style="font-size: 11px; color: #555;">ORDER REF: ${order.id}</div>
          </div>

          <div class="consignee-box">
            <div class="consignee-title">DELIVER TO (CONSIGNEE):</div>
            <div class="customer-name">${order.customer.fullName}</div>
            <div class="customer-phone">📱 ${order.customer.phone}</div>
            <div class="customer-address">
              <strong>${order.customer.city}</strong><br/>
              ${order.customer.address}
            </div>
          </div>

          <div class="cod-strip">
            <div class="cod-text">CASH ON DELIVERY<br/>(COLLECT EXACT):</div>
            <div class="cod-amount">Rs. ${order.total.toLocaleString()}</div>
          </div>

          <div class="items-summary">
            <strong>PARCEL CONTENTS:</strong>
            ${order.items.map(it => `${it.nameEn} (${it.selectedSize}) x${it.quantity}`).join(', ')}
            <br/><strong style="color: #c00;">⚠️ FRAGILE / LIQUID PERFUME - HANDLE WITH CARE</strong>
          </div>

          <div class="footer-sender">
            <div>
              <strong>SHIP FROM:</strong><br/>
              SUDDAIS COLLECTION<br/>
              Malir, Karachi, Pakistan<br/>
              Helpline: +92 318 2187575
            </div>
            <div style="text-align: right;">
              Date: ${new Date(order.createdAt).toLocaleDateString()}<br/>
              Origin: KHI Central Hub
            </div>
          </div>
        </div>
        <script>
          window.onload = function() { window.print(); }
        </script>
      </body>
      </html>
    `);
    win.document.close();
  };

  // Open Edit Product
  const handleOpenEditProduct = (prod: Product) => {
    setEditingProduct(prod);
    setIsAddingProduct(false);
    setProductForm({
      id: prod.id,
      nameEn: prod.nameEn,
      nameUr: prod.nameUr,
      category: prod.category,
      price: prod.price,
      originalPrice: prod.originalPrice || Math.round(prod.price * 1.2),
      inStock: prod.inStock !== false,
      isDeal: !!prod.isDeal,
      dealTag: prod.badgeEn || 'Featured Special',
      image: prod.image,
      volume: prod.volume || '50ml',
      descriptionEn: prod.descriptionEn
    });
  };

  // Open Add Product
  const handleOpenAddProduct = () => {
    const newId = `product-custom-${Date.now()}`;
    setEditingProduct(null);
    setIsAddingProduct(true);
    setProductForm({
      id: newId,
      nameEn: 'New Designer Impression',
      nameUr: 'نیا لگژری پرفیوم',
      category: 'perfume',
      price: 3000,
      originalPrice: 3800,
      inStock: true,
      isDeal: false,
      dealTag: 'New Arrival',
      image: IMPERIAL_VALLEY_IMG,
      volume: '50ml',
      descriptionEn: 'High-concentration luxury designer fragrance with rich notes and strong sillage.'
    });
  };

  const handleSaveProductForm = (e: React.FormEvent) => {
    e.preventDefault();

    const variants = editingProduct?.variants || [
      {
        size: productForm.volume || '50ml',
        price: productForm.price,
        originalPrice: productForm.originalPrice,
        inStock: productForm.inStock
      }
    ];

    const safeCategory = (productForm.category === 'all' ? 'perfume' : productForm.category) as 'perfume' | 'attar' | 'topi' | 'deals';

    const updated: Product = {
      id: productForm.id,
      nameUr: productForm.nameUr,
      nameEn: productForm.nameEn,
      taglineUr: editingProduct?.taglineUr || 'خالص پریمیم پرفیوم',
      taglineEn: editingProduct?.taglineEn || 'High-Concentration Fragrance',
      descriptionUr: editingProduct?.descriptionUr || 'سدیس کلیکشن کا پریمیم پرفیوم۔',
      descriptionEn: productForm.descriptionEn,
      category: safeCategory,
      price: productForm.price,
      originalPrice: productForm.originalPrice,
      volume: productForm.volume,
      image: productForm.image,
      inStock: productForm.inStock,
      isDeal: productForm.isDeal,
      badgeEn: productForm.dealTag,
      rating: editingProduct?.rating || 4.9,
      reviewsCount: editingProduct?.reviewsCount || 42,
      concentration: editingProduct?.concentration || 'Extrait de Parfum (35%)',
      variants: variants
    };

    if (isAddingProduct) {
      addProductToStore(updated);
    } else {
      updateProductInStore(updated);
    }

    setProducts(getStoredProducts());
    setEditingProduct(null);
    setIsAddingProduct(false);
  };

  const handleDeleteProduct = (id: string) => {
    if (confirm('Are you sure you want to delete this product from the store catalog?')) {
      deleteProductFromStore(id);
      setProducts(getStoredProducts());
    }
  };

  const handleResetCatalog = () => {
    if (confirm('Reset entire catalog to original products? Any price edits will revert to default.')) {
      resetProductsToDefault();
      setProducts(getStoredProducts());
    }
  };

  // Metrics
  const totalRevenue = orders.filter(o => o.rider.status !== 'cancelled').reduce((acc, o) => acc + o.total, 0);
  const pendingOrders = orders.filter((o) => o.rider.status === 'confirmed');
  const packedOrders = orders.filter((o) => o.rider.status === 'packing');
  const dispatchedOrders = orders.filter((o) => o.rider.status === 'dispatched' || o.rider.status === 'out_for_delivery');
  const deliveredOrders = orders.filter((o) => o.rider.status === 'delivered');
  const cancelledOrders = orders.filter((o) => o.rider.status === 'cancelled');
  const cancelledByCustomer = cancelledOrders.filter((o) => o.cancellationReason === 'customer');
  const cancelledByStore = cancelledOrders.filter((o) => o.cancellationReason !== 'customer');

  // Filtered orders list
  const filteredOrders = orders.filter((o) => {
    if (filterStatus !== 'all' && o.rider.status !== filterStatus) return false;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchName = o.customer.fullName.toLowerCase().includes(q);
      const matchPhone = o.customer.phone.includes(q);
      const matchId = o.id.toLowerCase().includes(q);
      const matchTracking = o.rider.trackingNo?.toLowerCase().includes(q);
      const matchCity = o.customer.city.toLowerCase().includes(q);
      return matchName || matchPhone || matchId || matchCity || matchTracking;
    }
    return true;
  });

  // Filtered products list
  const filteredProducts = products.filter((p) => {
    if (productCategoryFilter !== 'all' && p.category !== productCategoryFilter) return false;
    if (productSearch.trim()) {
      const q = productSearch.toLowerCase();
      return p.nameEn.toLowerCase().includes(q) || p.nameUr.includes(q);
    }
    return true;
  });

  const getStatusBadge = (order: OrderRecord) => {
    const status = order.rider.status;
    switch (status) {
      case 'confirmed':
        return (
          <span className="px-3 py-1 rounded-full text-xs font-bold bg-amber-100 text-amber-900 border border-amber-300">
            🟡 New Order (نیا آرڈر موصول)
          </span>
        );
      case 'packing':
        return (
          <span className="px-3 py-1 rounded-full text-xs font-bold bg-purple-100 text-purple-900 border border-purple-300">
            🟣 Packed (پیکنگ مکمل)
          </span>
        );
      case 'dispatched':
        return (
          <span className="px-3 py-1 rounded-full text-xs font-bold bg-blue-100 text-blue-900 border border-blue-300">
            🔵 Dispatched (گاڑی / کوریئر کے پاس)
          </span>
        );
      case 'out_for_delivery':
        return (
          <span className="px-3 py-1 rounded-full text-xs font-bold bg-orange-100 text-orange-900 border border-orange-300">
            🟠 Out for Delivery (ڈور سٹیپ رائیڈر)
          </span>
        );
      case 'delivered':
        return (
          <span className="px-3 py-1 rounded-full text-xs font-bold bg-emerald-100 text-emerald-900 border border-emerald-300">
            🟢 Delivered & Done (کوریئر ڈن - رقم وصول)
          </span>
        );
      case 'cancelled':
        return (
          <span className="px-3 py-1 rounded-full text-xs font-bold bg-rose-100 text-rose-900 border border-rose-300">
            🔴 Cancelled: {order.cancellationReason === 'customer' ? 'By Customer (گاہک نے منسوخ کیا)' : 'By Store (اونر کی طرف سے منسوخ)'}
          </span>
        );
      default:
        return (
          <span className="px-3 py-1 rounded-full text-xs font-bold bg-gray-100 text-gray-800">
            {status}
          </span>
        );
    }
  };

  return (
    <div className="min-h-screen bg-[#f7f4ed] text-[#1a1612] flex flex-col font-sans">
      
      {/* Top Admin Brand & Nav Bar */}
      <header className="sticky top-0 z-50 bg-[#1a1612] text-white border-b border-[#c59b27]/30 shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-4">
          
          {/* Brand & Admin Badge */}
          <div className="flex items-center gap-3">
            <BrandLogo size="md" />
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-lg sm:text-xl font-bold font-display text-white tracking-wide">
                  SUDDAIS COLLECTION
                </h1>
                <span className="text-[10px] bg-gradient-to-r from-[#d4af37] to-[#b8860b] text-[#1a1612] font-black uppercase px-2 py-0.5 rounded shadow-xs">
                  ADMIN PORTAL
                </span>
              </div>
              <p className="text-[11px] text-[#c59b27] font-medium">
                Store Owner Dashboard & Logistics Management (سدیس احمد)
              </p>
            </div>
          </div>

          {/* Quick Actions & Store Switcher */}
          <div className="flex items-center gap-2 sm:gap-3">
            <button
              onClick={onGoToStore}
              className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-[#f7e7ce] text-xs font-semibold border border-[#d4af37]/30 transition-all cursor-pointer"
            >
              <Store className="w-4 h-4 text-[#d4af37]" />
              <span className="hidden sm:inline">View Customer Store</span>
              <span className="sm:hidden">Store</span>
            </button>

            {isAuthenticated && (
              <button
                onClick={handleLogout}
                className="p-2 rounded-xl text-white/70 hover:text-red-400 hover:bg-white/10 transition-colors cursor-pointer"
                title="Log Out"
              >
                <LogOut className="w-4 h-4" />
              </button>
            )}
          </div>

        </div>

        {/* Admin Navigation Tabs (Orders vs Products) */}
        {isAuthenticated && (
          <div className="bg-[#120f0c] border-t border-white/10 px-4 sm:px-8">
            <div className="max-w-7xl mx-auto flex items-center gap-3 py-2 text-xs font-bold">
              <button
                onClick={() => setCurrentTab('orders')}
                className={`px-4 py-2 rounded-xl flex items-center gap-2 transition-all cursor-pointer ${
                  currentTab === 'orders'
                    ? 'bg-[#d4af37] text-[#1a1612] shadow-sm'
                    : 'text-[#dcd7cb] hover:text-white hover:bg-white/10'
                }`}
              >
                <Package className="w-4 h-4" />
                <span>📦 Orders & Logistics Management (آرڈرز اور ڈسپیچ)</span>
                <span className="bg-[#1a1612] text-white px-2 py-0.5 rounded-full text-[10px] font-mono">
                  {orders.length}
                </span>
              </button>

              <button
                onClick={() => setCurrentTab('products')}
                className={`px-4 py-2 rounded-xl flex items-center gap-2 transition-all cursor-pointer ${
                  currentTab === 'products'
                    ? 'bg-[#d4af37] text-[#1a1612] shadow-sm'
                    : 'text-[#dcd7cb] hover:text-white hover:bg-white/10'
                }`}
              >
                <Tag className="w-4 h-4" />
                <span>🏷️ Products, Deals & Price Manager (پراڈکٹس، ڈیلز اور ریٹس)</span>
                <span className="bg-[#1a1612] text-white px-2 py-0.5 rounded-full text-[10px] font-mono">
                  {products.length}
                </span>
              </button>
            </div>
          </div>
        )}
      </header>

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {!isAuthenticated ? (
          /* Login PIN Screen */
          <div className="max-w-md mx-auto my-12 bg-white rounded-3xl border border-[#e8dec8] p-8 sm:p-10 shadow-xl text-center space-y-6">
            <div className="w-20 h-20 rounded-3xl bg-[#faf2dd] border-2 border-[#d4af37]/40 text-[#b8860b] mx-auto flex items-center justify-center shadow-md">
              <Lock className="w-10 h-10" />
            </div>

            <div className="space-y-2">
              <h2 className="text-2xl font-bold font-display text-[#1a1612]">
                Admin Portal Login
              </h2>
              <p className="text-xs text-[#736a5c] leading-relaxed">
                Welcome, Suddais Ahmed. Please enter your secret PIN to access the orders management dashboard, courier dispatch, and live product price control.
              </p>
            </div>

            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <input
                  type="password"
                  value={pinInput}
                  onChange={(e) => {
                    setPinInput(e.target.value);
                    setPinError(false);
                  }}
                  placeholder="Enter Secret PIN"
                  className="w-full bg-[#faf7f2] border-2 border-[#dcd2be] rounded-2xl px-4 py-3.5 text-center text-lg font-mono tracking-widest text-[#1a1612] focus:outline-none focus:border-[#b8860b]"
                  autoFocus
                />
                {pinError && (
                  <p className="text-xs text-red-600 mt-2 font-medium">
                    Incorrect PIN. Use <strong>suddais786</strong> or click quick unlock below.
                  </p>
                )}
              </div>

              <button
                type="submit"
                className="w-full py-3.5 rounded-xl bg-[#1a1612] hover:bg-[#2d251d] text-[#f7e7ce] font-bold text-sm transition-all shadow-md cursor-pointer"
              >
                Access Admin Portal
              </button>

              <button
                type="button"
                onClick={handleQuickUnlock}
                className="w-full py-2.5 rounded-xl bg-[#faf2dd] hover:bg-[#f3e5c0] text-[#996515] font-semibold text-xs border border-[#d4af37]/40 transition-colors cursor-pointer flex items-center justify-center gap-1.5"
              >
                <Unlock className="w-4 h-4" />
                <span>Quick Unlock (Owner Bypass)</span>
              </button>
            </form>

            <div className="pt-4 border-t border-[#eee5d3] text-[11px] text-[#8c8273]">
              Default Master PIN: <strong className="font-mono text-[#1a1612]">suddais786</strong>
            </div>
          </div>
        ) : currentTab === 'orders' ? (
          /* TAB 1: ORDERS & LOGISTICS DASHBOARD */
          <div className="space-y-8">
            
            {/* Top Bar with Live Refresh */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-3xl border border-[#e8dec8] shadow-xs">
              <div>
                <h2 className="text-xl sm:text-2xl font-bold font-display text-[#1a1612] flex items-center gap-2">
                  <span>Store Orders & Logistics Dashboard</span>
                  <Sparkles className="w-5 h-5 text-[#c59b27]" />
                </h2>
                <p className="text-xs text-[#736a5c] mt-1">
                  Complete registry of all customer orders (010101 series), dispatch controls, courier labels, and cancellation tracker.
                </p>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={loadData}
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#faf7f2] border border-[#dcd2be] text-[#52493d] hover:text-[#1a1612] hover:border-[#1a1612] text-xs font-bold transition-colors cursor-pointer"
                >
                  <RefreshCw className="w-4 h-4 text-[#c59b27]" />
                  <span>Refresh Orders</span>
                </button>
              </div>
            </div>

            {/* KPI Cards Strip (Total Revenue, Pending, Packed, In Transit, Delivered, Cancelled) */}
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
              <div className="p-4 sm:p-5 rounded-2xl bg-white border border-[#e8dec8] shadow-xs">
                <span className="text-[11px] text-[#8c7853] block font-bold uppercase tracking-wider">Total Sales</span>
                <span className="text-xl sm:text-2xl font-bold font-mono text-[#b8860b]">Rs. {totalRevenue.toLocaleString()}</span>
                <span className="text-[10px] text-[#736a5c] block mt-1">{orders.length} total orders</span>
              </div>

              <div className="p-4 sm:p-5 rounded-2xl bg-amber-50 border border-amber-200 shadow-xs">
                <span className="text-[11px] text-amber-800 block font-bold uppercase tracking-wider">New / Pending</span>
                <span className="text-xl sm:text-2xl font-bold font-mono text-amber-900">{pendingOrders.length}</span>
                <span className="text-[10px] text-amber-700 block mt-1">Awaiting packing</span>
              </div>

              <div className="p-4 sm:p-5 rounded-2xl bg-purple-50 border border-purple-200 shadow-xs">
                <span className="text-[11px] text-purple-800 block font-bold uppercase tracking-wider">Packed</span>
                <span className="text-xl sm:text-2xl font-bold font-mono text-purple-900">{packedOrders.length}</span>
                <span className="text-[10px] text-purple-700 block mt-1">Ready for courier</span>
              </div>

              <div className="p-4 sm:p-5 rounded-2xl bg-blue-50 border border-blue-200 shadow-xs">
                <span className="text-[11px] text-blue-800 block font-bold uppercase tracking-wider">In Transit</span>
                <span className="text-xl sm:text-2xl font-bold font-mono text-blue-900">{dispatchedOrders.length}</span>
                <span className="text-[10px] text-blue-700 block mt-1">With rider / vehicle</span>
              </div>

              <div className="p-4 sm:p-5 rounded-2xl bg-emerald-50 border border-emerald-200 shadow-xs">
                <span className="text-[11px] text-emerald-800 block font-bold uppercase tracking-wider">Delivered (Done)</span>
                <span className="text-xl sm:text-2xl font-bold font-mono text-emerald-900">{deliveredOrders.length}</span>
                <span className="text-[10px] text-emerald-700 block mt-1">Cash collected</span>
              </div>

              <div className="p-4 sm:p-5 rounded-2xl bg-rose-50 border border-rose-200 shadow-xs">
                <span className="text-[11px] text-rose-800 block font-bold uppercase tracking-wider">Cancelled</span>
                <span className="text-xl sm:text-2xl font-bold font-mono text-rose-900">{cancelledOrders.length}</span>
                <span className="text-[10px] text-rose-700 block mt-1">
                  {cancelledByCustomer.length} by Cust • {cancelledByStore.length} by Store
                </span>
              </div>
            </div>

            {/* Filter & Search Toolbar */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-white p-4 rounded-2xl border border-[#e8dec8] shadow-xs">
              
              {/* Segmented Filter Pills */}
              <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto pb-1 sm:pb-0 text-xs">
                {[
                  { id: 'all', label: 'All Orders', count: orders.length },
                  { id: 'confirmed', label: 'New / Received', count: pendingOrders.length },
                  { id: 'packing', label: 'Packed', count: packedOrders.length },
                  { id: 'dispatched', label: 'Dispatched', count: dispatchedOrders.length },
                  { id: 'delivered', label: 'Delivered (Done)', count: deliveredOrders.length },
                  { id: 'cancelled', label: 'Cancelled (منسوخ)', count: cancelledOrders.length }
                ].map((st) => (
                  <button
                    key={st.id}
                    onClick={() => setFilterStatus(st.id)}
                    className={`px-3 py-2 rounded-xl font-bold transition-all cursor-pointer shrink-0 ${
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
              <div className="relative w-full sm:w-80">
                <Search className="w-4 h-4 text-[#8c8273] absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Search by name, phone, tracking (e.g. TRK-010101)..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-[#faf7f2] border border-[#dcd2be] rounded-xl pl-10 pr-3 py-2 text-xs text-[#1a1612] focus:outline-none focus:border-[#b8860b]"
                />
              </div>

            </div>

            {/* Orders Cards List */}
            <div className="space-y-5">
              {filteredOrders.length === 0 ? (
                <div className="py-20 text-center text-[#8c8273] bg-white rounded-3xl border border-[#e8dec8] space-y-3">
                  <Package className="w-12 h-12 mx-auto opacity-30 text-[#8c8273]" />
                  <h3 className="text-lg font-bold text-[#1a1612]">No Orders Found</h3>
                  <p className="text-xs text-[#736a5c]">
                    There are no orders matching your current filter. When a customer places an order on the storefront, it will appear here in real time.
                  </p>
                </div>
              ) : (
                filteredOrders.map((order) => (
                  <div
                    key={order.id}
                    className="p-6 rounded-3xl bg-white border border-[#e8dec8] hover:border-[#c59b27] shadow-sm hover:shadow-md transition-all space-y-5"
                  >
                    {/* Order Card Header */}
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-[#f0ebd9]">
                      <div className="flex items-center gap-3">
                        <div className="px-3.5 py-1.5 rounded-xl bg-[#faf2dd] border border-[#d4af37]/40 text-sm font-mono font-bold text-[#996515]">
                          {order.id}
                        </div>
                        <span className="text-xs text-[#736a5c]">
                          Order Placed: {new Date(order.createdAt).toLocaleString('en-US', {
                            dateStyle: 'medium',
                            timeStyle: 'short'
                          })}
                        </span>
                      </div>

                      <div className="flex items-center gap-2">
                        {getStatusBadge(order)}
                      </div>
                    </div>

                    {/* Order Details 3-Col Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs text-[#52493d]">
                      
                      {/* Customer Info */}
                      <div className="space-y-1">
                        <span className="text-[#8c7853] block text-[11px] font-bold uppercase tracking-wider">
                          Customer Information:
                        </span>
                        <strong className="text-base text-[#1a1612] block">
                          {order.customer.fullName}
                        </strong>
                        <div className="flex items-center gap-2 pt-1">
                          <span className="font-mono text-sm font-semibold">{order.customer.phone}</span>
                          <a
                            href={`https://wa.me/${order.customer.phone.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(
                              `السلام علیکم ${order.customer.fullName} صاحب! Suddais Collection سے آپ کا آرڈر (${order.id}) تصدیق شدہ ہے۔ شکریہ!`
                            )}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-1.5 rounded-lg bg-emerald-100 text-emerald-800 hover:bg-emerald-200 transition-colors flex items-center gap-1 font-bold text-[11px]"
                            title="WhatsApp Customer"
                          >
                            <MessageCircle className="w-3.5 h-3.5 text-emerald-600" />
                            <span>WhatsApp</span>
                          </a>
                        </div>
                        {order.customer.whatsappPhone && order.customer.whatsappPhone !== order.customer.phone && (
                          <div className="text-[11px] text-[#736a5c]">WhatsApp: {order.customer.whatsappPhone}</div>
                        )}
                      </div>

                      {/* Shipping Address */}
                      <div className="space-y-1">
                        <span className="text-[#8c7853] block text-[11px] font-bold uppercase tracking-wider">
                          Destination Address:
                        </span>
                        <div className="inline-flex items-center gap-1 text-sm font-bold text-[#1a1612]">
                          <MapPin className="w-4 h-4 text-rose-600" />
                          <span>{order.customer.city}</span>
                        </div>
                        <p className="text-xs text-[#52493d] mt-1 bg-[#faf7f2] p-2 rounded-xl border border-[#eee5d3]">
                          {order.customer.address}
                        </p>
                      </div>

                      {/* Billing & Courier Status */}
                      <div className="space-y-1.5">
                        <span className="text-[#8c7853] block text-[11px] font-bold uppercase tracking-wider">
                          Billing & Courier:
                        </span>
                        <div className="flex justify-between items-center text-sm font-medium">
                          <span>Total Cash to Collect (COD):</span>
                          <strong className="font-mono text-base text-[#b8860b]">
                            Rs. {order.total.toLocaleString()}
                          </strong>
                        </div>
                        <div className="text-xs text-[#736a5c] flex justify-between">
                          <span>Courier Assigned:</span>
                          <strong className="text-[#1a1612]">{order.rider.courier}</strong>
                        </div>
                        <div className="text-[11px] text-[#736a5c] flex justify-between">
                          <span>Tracking Consignment #:</span>
                          <strong className="font-mono text-emerald-800 font-bold">{order.rider.trackingNo}</strong>
                        </div>
                        {order.rider.currentLocation && (
                          <div className="text-[11px] text-[#8c7853] bg-amber-50 p-1.5 rounded border border-amber-200">
                            Status: {order.rider.currentLocation}
                          </div>
                        )}
                      </div>

                    </div>

                    {/* Ordered Items Pill List */}
                    <div className="p-4 rounded-2xl bg-[#faf7f2] border border-[#eee5d3] text-xs space-y-2">
                      <div className="flex items-center justify-between font-bold text-[#8c7853] text-[11px] uppercase tracking-wider border-b border-[#eee5d3] pb-1.5">
                        <span>Ordered Items ({order.items.length})</span>
                        <span>Item Subtotal</span>
                      </div>
                      {order.items.map((it) => (
                        <div key={it.id} className="flex justify-between items-center py-0.5">
                          <span className="font-medium text-[#1a1612]">
                            • {it.nameEn} <span className="text-[#8c7853]">({it.selectedSize})</span> <strong className="text-[#996515]">×{it.quantity}</strong>
                          </span>
                          <span className="font-mono text-[#52493d] font-semibold">
                            Rs. {(it.unitPrice * it.quantity).toLocaleString()}
                          </span>
                        </div>
                      ))}
                    </div>

                    {/* Order Action Buttons Toolbar (Order Lifecycle Management) */}
                    <div className="pt-3 border-t border-[#f0ebd9] flex flex-wrap items-center justify-between gap-3">
                      
                      {/* Step-by-Step Dispatch Workflow */}
                      <div className="flex items-center gap-2 flex-wrap">
                        
                        {/* Step 1: Pack */}
                        {order.rider.status === 'confirmed' && (
                          <button
                            onClick={() =>
                              handleStatusChange(order.id, 'packing', {
                                currentLocation: 'Packed in Presentation Box & Quality Sealed'
                              })
                            }
                            className="px-4 py-2 rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-bold text-xs flex items-center gap-1.5 transition-colors cursor-pointer shadow-xs"
                          >
                            <Package className="w-4 h-4" />
                            <span>Mark as Packed (پیک کر لیا)</span>
                          </button>
                        )}

                        {/* Step 2: Dispatch to Vehicle / Courier */}
                        {(order.rider.status === 'confirmed' || order.rider.status === 'packing') && (
                          <button
                            onClick={() => handleOpenDispatchDialog(order)}
                            className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs flex items-center gap-1.5 transition-colors cursor-pointer shadow-xs"
                          >
                            <Truck className="w-4 h-4" />
                            <span>Dispatch / گاڑی کو دیں (Handover to Courier)</span>
                          </button>
                        )}

                        {/* Step 3: Out for Delivery */}
                        {order.rider.status === 'dispatched' && (
                          <button
                            onClick={() =>
                              handleStatusChange(order.id, 'out_for_delivery', {
                                currentLocation: 'Rider is arriving at Customer Doorstep with parcel'
                              })
                            }
                            className="px-4 py-2 rounded-xl bg-orange-600 hover:bg-orange-700 text-white font-bold text-xs flex items-center gap-1.5 transition-colors cursor-pointer shadow-xs"
                          >
                            <Truck className="w-4 h-4" />
                            <span>Out for Delivery (کسٹمر کے گھر روانہ)</span>
                          </button>
                        )}

                        {/* Step 4: Mark Delivered & Done */}
                        {(order.rider.status === 'dispatched' || order.rider.status === 'out_for_delivery') && (
                          <button
                            onClick={() =>
                              handleStatusChange(order.id, 'delivered', {
                                currentLocation: 'Parcel Delivered successfully. Payment received.',
                                estimatedDelivery: 'Delivered / Completed'
                              })
                            }
                            className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs flex items-center gap-1.5 transition-colors cursor-pointer shadow-xs"
                          >
                            <CheckCircle2 className="w-4 h-4" />
                            <span>Delivered & Done (کوریئر ڈن - رقم وصول)</span>
                          </button>
                        )}

                        {/* Cancel Button with Reason Selector */}
                        {order.rider.status !== 'delivered' && order.rider.status !== 'cancelled' && (
                          <button
                            onClick={() => {
                              setCancelModalOrder(order);
                              setCancelReasonType('customer');
                              setCancelCustomNotes('Customer requested cancellation before delivery');
                            }}
                            className="px-3 py-2 rounded-xl bg-[#faf7f2] hover:bg-red-50 text-red-600 border border-[#e8dec8] hover:border-red-300 font-medium text-xs transition-colors cursor-pointer flex items-center gap-1"
                          >
                            <XSquare className="w-3.5 h-3.5" />
                            <span>Cancel Order</span>
                          </button>
                        )}

                        {/* Reopen Cancelled Order */}
                        {order.rider.status === 'cancelled' && (
                          <button
                            onClick={() => {
                              handleStatusChange(order.id, 'confirmed', {
                                currentLocation: 'Order Re-opened by Store Owner'
                              });
                            }}
                            className="px-3 py-2 rounded-xl bg-amber-100 hover:bg-amber-200 text-amber-900 font-bold text-xs transition-colors cursor-pointer flex items-center gap-1"
                          >
                            <RotateCcw className="w-3.5 h-3.5" />
                            <span>Re-Open Order</span>
                          </button>
                        )}
                      </div>

                      {/* Printing Actions: Shipping Label & Invoice Slip */}
                      <div className="flex items-center gap-2">
                        {/* Print Courier Shipping Label (User Request) */}
                        <button
                          onClick={() => handlePrintShippingLabel(order)}
                          className="px-3.5 py-2 rounded-xl bg-[#1a1612] hover:bg-[#332b22] text-[#f7e7ce] text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer shadow-xs"
                          title="Print Courier Shipping Label Sticker"
                        >
                          <FileText className="w-3.5 h-3.5 text-[#d4af37]" />
                          <span>Print Label (شپنگ لیبل)</span>
                        </button>

                        {/* Print Invoice Slip */}
                        <button
                          onClick={() => {
                            const printWindow = window.open('', '_blank');
                            if (!printWindow) return;
                            printWindow.document.write(`
                              <html>
                                <head>
                                  <title>Invoice - ${order.id} - Suddais Collection</title>
                                  <style>
                                    body { font-family: sans-serif; padding: 24px; color: #1a1612; }
                                    .header { border-bottom: 2px solid #b8860b; padding-bottom: 12px; margin-bottom: 16px; }
                                    .title { font-size: 20px; font-weight: bold; }
                                    .meta { margin-top: 8px; font-size: 13px; color: #555; }
                                    table { width: 100%; border-collapse: collapse; margin-top: 16px; }
                                    th, td { border: 1px solid #ddd; padding: 8px; font-size: 13px; text-align: left; }
                                    th { background: #faf2dd; }
                                    .total { text-align: right; font-weight: bold; font-size: 15px; margin-top: 16px; }
                                  </style>
                                </head>
                                <body>
                                  <div class="header">
                                    <div class="title">SUDDAIS COLLECTION — DELIVERY INVOICE</div>
                                    <div class="meta">Order ID: <strong>${order.id}</strong> | Tracking: <strong>${order.rider.trackingNo}</strong></div>
                                    <div class="meta">Customer: <strong>${order.customer.fullName}</strong> (${order.customer.phone})</div>
                                    <div class="meta">Address: ${order.customer.address}, ${order.customer.city}</div>
                                  </div>
                                  <table>
                                    <thead><tr><th>Product</th><th>Size</th><th>Qty</th><th>Price</th></tr></thead>
                                    <tbody>
                                      ${order.items.map(it => `<tr><td>${it.nameEn}</td><td>${it.selectedSize}</td><td>${it.quantity}</td><td>Rs. ${it.unitPrice * it.quantity}</td></tr>`).join('')}
                                    </tbody>
                                  </table>
                                  <div class="total">Total Cash to Collect (COD): Rs. ${order.total}</div>
                                </body>
                              </html>
                            `);
                            printWindow.document.close();
                            printWindow.print();
                          }}
                          className="px-3 py-2 rounded-xl bg-[#faf7f2] hover:bg-[#f0ebd9] text-[#1a1612] border border-[#dcd2be] text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
                        >
                          <Printer className="w-3.5 h-3.5 text-[#8c8273]" />
                          <span>Print Slip</span>
                        </button>
                      </div>

                    </div>

                  </div>
                ))
              )}
            </div>

          </div>
        ) : (
          /* TAB 2: PRODUCTS, DEALS & PRICE MANAGER */
          <div className="space-y-6">
            
            {/* Top Toolbar */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-3xl border border-[#e8dec8] shadow-xs">
              <div>
                <h2 className="text-xl sm:text-2xl font-bold font-display text-[#1a1612] flex items-center gap-2">
                  <span>Catalog & Price Control Manager</span>
                  <Tag className="w-5 h-5 text-[#c59b27]" />
                </h2>
                <p className="text-xs text-[#736a5c] mt-1">
                  Change perfume and attar prices, edit pictures, toggle out of stock, and create special discount deals. Changes reflect on the customer website immediately!
                </p>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={handleOpenAddProduct}
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#1a1612] hover:bg-[#2e261f] text-[#f7e7ce] text-xs font-bold transition-all shadow-sm cursor-pointer"
                >
                  <Plus className="w-4 h-4 text-[#d4af37]" />
                  <span>Add New Product / Deal</span>
                </button>
                <button
                  onClick={handleResetCatalog}
                  className="p-2.5 rounded-xl bg-[#faf7f2] border border-[#dcd2be] text-[#736a5c] hover:text-red-600 hover:border-red-300 transition-colors cursor-pointer"
                  title="Reset Catalog to Defaults"
                >
                  <RotateCcw className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Filter & Search Toolbar */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-white p-4 rounded-2xl border border-[#e8dec8] shadow-xs">
              
              {/* Category Segmented Buttons */}
              <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto pb-1 sm:pb-0 text-xs">
                {[
                  { id: 'all', label: 'All Items', count: products.length },
                  { id: 'perfume', label: 'Perfumes', count: products.filter(p => p.category === 'perfume').length },
                  { id: 'attar', label: 'Pure Attars', count: products.filter(p => p.category === 'attar').length },
                  { id: 'topi', label: 'Prayer Caps', count: products.filter(p => p.category === 'topi').length },
                  { id: 'deals', label: 'Deals & Bundles', count: products.filter(p => p.isDeal).length }
                ].map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => setProductCategoryFilter(cat.id as any)}
                    className={`px-3.5 py-2 rounded-xl font-bold transition-all cursor-pointer shrink-0 ${
                      productCategoryFilter === cat.id
                        ? 'bg-[#1a1612] text-white shadow-xs'
                        : 'bg-[#faf7f2] border border-[#e8dec8] text-[#52493d] hover:border-[#1a1612]'
                    }`}
                  >
                    <span>{cat.label}</span>
                    <span className="ml-1.5 text-[10px] opacity-75 font-mono">({cat.count})</span>
                  </button>
                ))}
              </div>

              {/* Product Search */}
              <div className="relative w-full sm:w-80">
                <Search className="w-4 h-4 text-[#8c8273] absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Search products by title or note..."
                  value={productSearch}
                  onChange={(e) => setProductSearch(e.target.value)}
                  className="w-full bg-[#faf7f2] border border-[#dcd2be] rounded-xl pl-10 pr-3 py-2 text-xs text-[#1a1612] focus:outline-none focus:border-[#b8860b]"
                />
              </div>

            </div>

            {/* Products Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredProducts.map((prod) => (
                <div
                  key={prod.id}
                  className="bg-white rounded-2xl border border-[#e8dec8] hover:border-[#c59b27] p-4 flex flex-col justify-between space-y-3 shadow-xs hover:shadow-md transition-all"
                >
                  <div className="flex gap-3">
                    <img
                      src={prod.image}
                      alt={prod.nameEn}
                      className="w-20 h-20 rounded-xl object-cover border border-[#eee5d3] shrink-0"
                    />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-1.5">
                        <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-[#faf2dd] text-[#996515]">
                          {prod.category}
                        </span>
                        {prod.inStock === false && (
                          <span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded bg-red-100 text-red-800">
                            Out of Stock
                          </span>
                        )}
                        {prod.isDeal && (
                          <span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded bg-emerald-100 text-emerald-800">
                            Deal
                          </span>
                        )}
                      </div>
                      <h4 className="text-sm font-bold text-[#1a1612] truncate mt-1">
                        {prod.nameEn}
                      </h4>
                      <p className="text-xs text-[#8c7853] font-urdu truncate">
                        {prod.nameUr}
                      </p>
                      <div className="mt-1 flex items-baseline gap-2">
                        <span className="text-sm font-bold font-mono text-[#b8860b]">
                          Rs. {prod.price.toLocaleString()}
                        </span>
                        {prod.originalPrice && prod.originalPrice > prod.price && (
                          <span className="text-xs text-[#8c8273] line-through font-mono">
                            Rs. {prod.originalPrice.toLocaleString()}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="pt-2 border-t border-[#eee5d3] flex items-center justify-between gap-2">
                    <button
                      onClick={() => handleOpenEditProduct(prod)}
                      className="flex-1 py-1.5 px-3 rounded-xl bg-[#faf7f2] hover:bg-[#faf2dd] text-[#1a1612] hover:text-[#996515] border border-[#dcd2be] text-xs font-bold flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                    >
                      <Edit3 className="w-3.5 h-3.5" />
                      <span>Edit Rate / Image</span>
                    </button>

                    <button
                      onClick={() => handleDeleteProduct(prod.id)}
                      className="p-1.5 rounded-xl text-[#8c8273] hover:text-red-600 hover:bg-red-50 transition-colors cursor-pointer"
                      title="Delete Product"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>

          </div>
        )}

      </main>

      {/* Dispatch Modal Dialog */}
      {dispatchModalOrder && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="bg-white rounded-3xl border border-[#d4af37]/40 shadow-2xl max-w-md w-full p-6 space-y-4">
            <div className="flex items-center gap-2.5 pb-3 border-b border-[#f0ebd9]">
              <div className="p-2 rounded-xl bg-blue-100 text-blue-800">
                <Truck className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-base font-bold text-[#1a1612]">
                  Dispatch Order: {dispatchModalOrder.id}
                </h3>
                <p className="text-xs text-[#736a5c]">
                  Assign vehicle/courier and tracking consignment number.
                </p>
              </div>
            </div>

            <form onSubmit={handleConfirmDispatch} className="space-y-3 text-xs">
              <div>
                <label className="font-bold text-[#52493d] block mb-1">
                  Courier / Logistics Partner:
                </label>
                <select
                  value={courierName}
                  onChange={(e) => setCourierName(e.target.value)}
                  className="w-full bg-[#faf7f2] border border-[#dcd2be] rounded-xl px-3 py-2.5 text-xs text-[#1a1612] focus:outline-none focus:border-[#b8860b]"
                >
                  <option value="Suddais Local Courier Rider (Karachi)">Suddais Local Courier Rider (Karachi Same/Next Day)</option>
                  <option value="TCS Express">TCS Express (Nationwide)</option>
                  <option value="Trax Logistics">Trax Logistics (COD Nationwide)</option>
                  <option value="Leopards Courier">Leopards Courier (Nationwide)</option>
                  <option value="M&P Logistics">M&P Logistics</option>
                  <option value="Direct Vehicle Handover">Direct Delivery Van / Vehicle</option>
                </select>
              </div>

              <div>
                <label className="font-bold text-[#52493d] block mb-1">
                  Courier Tracking / Consignment Number:
                </label>
                <input
                  type="text"
                  value={trackingNumber}
                  onChange={(e) => setTrackingNumber(e.target.value)}
                  className="w-full bg-[#faf7f2] border border-[#dcd2be] rounded-xl px-3 py-2.5 text-xs font-mono text-[#1a1612] focus:outline-none focus:border-[#b8860b]"
                  placeholder="e.g. TRK-010104"
                  required
                />
              </div>

              <div>
                <label className="font-bold text-[#52493d] block mb-1">
                  Rider / Dispatch Helpline Phone:
                </label>
                <input
                  type="text"
                  value={riderPhone}
                  onChange={(e) => setRiderPhone(e.target.value)}
                  className="w-full bg-[#faf7f2] border border-[#dcd2be] rounded-xl px-3 py-2.5 text-xs font-mono text-[#1a1612] focus:outline-none focus:border-[#b8860b]"
                  placeholder="e.g. 0318-2187575"
                />
              </div>

              <div className="pt-2 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setDispatchModalOrder(null)}
                  className="px-4 py-2 rounded-xl bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold cursor-pointer flex items-center gap-1.5"
                >
                  <Truck className="w-4 h-4" />
                  <span>Confirm Dispatch</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Cancellation Modal Dialog */}
      {cancelModalOrder && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="bg-white rounded-3xl border border-red-300 shadow-2xl max-w-md w-full p-6 space-y-4">
            <div className="flex items-center gap-2.5 pb-3 border-b border-red-100">
              <div className="p-2 rounded-xl bg-red-100 text-red-800">
                <AlertTriangle className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-base font-bold text-[#1a1612]">
                  Cancel Order: {cancelModalOrder.id}
                </h3>
                <p className="text-xs text-[#736a5c]">
                  Customer: {cancelModalOrder.customer.fullName} ({cancelModalOrder.customer.city})
                </p>
              </div>
            </div>

            <form onSubmit={handleConfirmCancellation} className="space-y-3 text-xs">
              <div>
                <label className="font-bold text-[#52493d] block mb-1">
                  Cancellation Origin:
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => {
                      setCancelReasonType('customer');
                      setCancelCustomNotes('Cancelled upon customer WhatsApp / phone request');
                    }}
                    className={`p-3 rounded-xl border text-center font-bold transition-all cursor-pointer ${
                      cancelReasonType === 'customer'
                        ? 'border-red-600 bg-red-50 text-red-900'
                        : 'border-[#dcd2be] bg-[#faf7f2] text-[#52493d]'
                    }`}
                  >
                    👤 Customer Cancelled<br/>
                    <span className="text-[10px] font-normal">کسٹمر نے منسوخ کیا</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      setCancelReasonType('owner');
                      setCancelCustomNotes('Cancelled by store: Item out of stock / unable to deliver');
                    }}
                    className={`p-3 rounded-xl border text-center font-bold transition-all cursor-pointer ${
                      cancelReasonType === 'owner'
                        ? 'border-red-600 bg-red-50 text-red-900'
                        : 'border-[#dcd2be] bg-[#faf7f2] text-[#52493d]'
                    }`}
                  >
                    🏪 Store / Owner Cancelled<br/>
                    <span className="text-[10px] font-normal">اسٹاک نہ ہونے کی وجہ سے</span>
                  </button>
                </div>
              </div>

              <div>
                <label className="font-bold text-[#52493d] block mb-1">
                  Reason / Notes:
                </label>
                <textarea
                  value={cancelCustomNotes}
                  onChange={(e) => setCancelCustomNotes(e.target.value)}
                  rows={3}
                  className="w-full bg-[#faf7f2] border border-[#dcd2be] rounded-xl p-3 text-xs text-[#1a1612] focus:outline-none focus:border-red-600"
                />
              </div>

              <div className="pt-2 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setCancelModalOrder(null)}
                  className="px-4 py-2 rounded-xl bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold cursor-pointer"
                >
                  Go Back
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-red-600 hover:bg-red-700 text-white font-bold cursor-pointer"
                >
                  Confirm Cancellation
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Edit / Add Product Modal Dialog */}
      {(editingProduct || isAddingProduct) && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs overflow-y-auto">
          <div className="bg-white rounded-3xl border border-[#d4af37]/40 shadow-2xl max-w-lg w-full p-6 space-y-4 my-auto max-h-[90vh] overflow-y-auto">
            
            <div className="flex items-center justify-between pb-3 border-b border-[#f0ebd9]">
              <div className="flex items-center gap-2.5">
                <div className="p-2 rounded-xl bg-[#faf2dd] text-[#996515]">
                  <Tag className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-[#1a1612]">
                    {isAddingProduct ? 'Add New Product / Deal' : `Edit: ${productForm.nameEn}`}
                  </h3>
                  <p className="text-xs text-[#736a5c]">
                    Update prices, pictures, and stock status.
                  </p>
                </div>
              </div>

              <button
                onClick={() => {
                  setEditingProduct(null);
                  setIsAddingProduct(false);
                }}
                className="text-[#8c8273] hover:text-[#1a1612] cursor-pointer text-lg"
              >
                ×
              </button>
            </div>

            <form onSubmit={handleSaveProductForm} className="space-y-4 text-xs">
              
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-[#52493d] block mb-1">
                    English Name:
                  </label>
                  <input
                    type="text"
                    value={productForm.nameEn}
                    onChange={(e) => setProductForm({ ...productForm, nameEn: e.target.value })}
                    className="w-full bg-[#faf7f2] border border-[#dcd2be] rounded-xl px-3 py-2 text-xs font-semibold text-[#1a1612]"
                    required
                  />
                </div>

                <div>
                  <label className="font-bold text-[#52493d] block mb-1">
                    Urdu Name:
                  </label>
                  <input
                    type="text"
                    value={productForm.nameUr}
                    onChange={(e) => setProductForm({ ...productForm, nameUr: e.target.value })}
                    className="w-full bg-[#faf7f2] border border-[#dcd2be] rounded-xl px-3 py-2 text-xs font-urdu text-right"
                    required
                  />
                </div>
              </div>

              {/* Price and Original Price */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-[#52493d] block mb-1">
                    Selling Price (Rs.):
                  </label>
                  <input
                    type="number"
                    value={productForm.price}
                    onChange={(e) => setProductForm({ ...productForm, price: Number(e.target.value) })}
                    className="w-full bg-[#faf7f2] border border-[#dcd2be] rounded-xl px-3 py-2 text-xs font-mono font-bold text-[#b8860b]"
                    required
                  />
                </div>

                <div>
                  <label className="font-bold text-[#52493d] block mb-1">
                    Original Price (Rs.) (for Discount Strikethrough):
                  </label>
                  <input
                    type="number"
                    value={productForm.originalPrice}
                    onChange={(e) => setProductForm({ ...productForm, originalPrice: Number(e.target.value) })}
                    className="w-full bg-[#faf7f2] border border-[#dcd2be] rounded-xl px-3 py-2 text-xs font-mono text-[#736a5c]"
                  />
                </div>
              </div>

              {/* Category & Volume */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-[#52493d] block mb-1">
                    Category:
                  </label>
                  <select
                    value={productForm.category}
                    onChange={(e) => setProductForm({ ...productForm, category: e.target.value as ProductCategory })}
                    className="w-full bg-[#faf7f2] border border-[#dcd2be] rounded-xl px-3 py-2 text-xs text-[#1a1612]"
                  >
                    <option value="perfume">Designer Perfume</option>
                    <option value="attar">Pure Non-Alcoholic Attar</option>
                    <option value="topi">Artisan Prayer Cap</option>
                    <option value="deals">Gift Deal / Bundle</option>
                  </select>
                </div>

                <div>
                  <label className="font-bold text-[#52493d] block mb-1">
                    Bottle Size / Volume:
                  </label>
                  <input
                    type="text"
                    value={productForm.volume}
                    onChange={(e) => setProductForm({ ...productForm, volume: e.target.value })}
                    placeholder="e.g. 50ml, 12ml, 22.5 inches"
                    className="w-full bg-[#faf7f2] border border-[#dcd2be] rounded-xl px-3 py-2 text-xs text-[#1a1612]"
                  />
                </div>
              </div>

              {/* Image URL & Presets */}
              <div>
                <label className="font-bold text-[#52493d] block mb-1">
                  Product Image URL:
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={productForm.image}
                    onChange={(e) => setProductForm({ ...productForm, image: e.target.value })}
                    className="flex-1 bg-[#faf7f2] border border-[#dcd2be] rounded-xl px-3 py-2 text-xs font-mono text-[#1a1612]"
                    placeholder="Paste image URL here"
                  />
                  <img
                    src={productForm.image}
                    alt="Preview"
                    className="w-10 h-10 rounded-xl object-cover border border-[#d4af37]/40 shrink-0"
                  />
                </div>

                {/* Preset Image Quick Selector */}
                <div className="mt-2 space-y-1">
                  <span className="text-[10px] text-[#8c7853] font-bold uppercase">Or Choose a Luxury Preset Image:</span>
                  <div className="grid grid-cols-6 gap-1.5">
                    {[
                      { name: 'Imperial Valley', img: IMPERIAL_VALLEY_IMG },
                      { name: 'Khamrah Lattafa', img: KHAMRAH_IMG },
                      { name: '9 PM Rebel', img: NINE_PM_IMG },
                      { name: 'Lattafa Asad', img: ASAD_IMG },
                      { name: 'Dehn Al Oud', img: DEHN_ATTAR_IMG },
                      { name: 'Omani Topi', img: EMBD_TOPI_IMG },
                    ].map((pre) => (
                      <button
                        key={pre.name}
                        type="button"
                        onClick={() => setProductForm({ ...productForm, image: pre.img })}
                        className={`p-1 rounded-lg border text-center transition-all cursor-pointer ${
                          productForm.image === pre.img ? 'border-[#b8860b] bg-[#faf2dd]' : 'border-gray-200 hover:border-gray-400'
                        }`}
                        title={pre.name}
                      >
                        <img src={pre.img} alt={pre.name} className="w-full h-8 object-cover rounded" />
                        <span className="text-[9px] truncate block mt-0.5">{pre.name.split(' ')[0]}</span>
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* In Stock & Deal Toggles */}
              <div className="p-3 rounded-2xl bg-[#faf7f2] border border-[#eee5d3] grid grid-cols-2 gap-4">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={productForm.inStock}
                    onChange={(e) => setProductForm({ ...productForm, inStock: e.target.checked })}
                    className="w-4 h-4 rounded text-[#b8860b] focus:ring-[#b8860b]"
                  />
                  <div>
                    <span className="font-bold text-[#1a1612] block">In Stock (دستیاب ہے)</span>
                    <span className="text-[10px] text-[#736a5c]">Customers can order</span>
                  </div>
                </label>

                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={productForm.isDeal}
                    onChange={(e) => setProductForm({ ...productForm, isDeal: e.target.checked })}
                    className="w-4 h-4 rounded text-[#b8860b] focus:ring-[#b8860b]"
                  />
                  <div>
                    <span className="font-bold text-[#1a1612] block">Mark as Special Deal</span>
                    <span className="text-[10px] text-[#736a5c]">Highlighted in Deals section</span>
                  </div>
                </label>
              </div>

              {/* Deal Tag / Badge */}
              {productForm.isDeal && (
                <div>
                  <label className="font-bold text-[#52493d] block mb-1">
                    Special Deal Badge Text:
                  </label>
                  <input
                    type="text"
                    value={productForm.dealTag}
                    onChange={(e) => setProductForm({ ...productForm, dealTag: e.target.value })}
                    placeholder="e.g. 20% OFF Limited Offer, Buy 2 Get 1"
                    className="w-full bg-[#faf7f2] border border-[#dcd2be] rounded-xl px-3 py-2 text-xs text-[#1a1612]"
                  />
                </div>
              )}

              {/* Action Buttons */}
              <div className="pt-3 border-t border-[#f0ebd9] flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => {
                    setEditingProduct(null);
                    setIsAddingProduct(false);
                  }}
                  className="px-4 py-2 rounded-xl bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 rounded-xl bg-[#1a1612] hover:bg-[#332b22] text-[#f7e7ce] font-bold cursor-pointer shadow-md"
                >
                  Save & Publish Live
                </button>
              </div>

            </form>
          </div>
        </div>
      )}

    </div>
  );
};
