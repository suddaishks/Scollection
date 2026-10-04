import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { HeroSlider } from './components/HeroSlider';
import { DealsSection } from './components/DealsSection';
import { ProductCard } from './components/ProductCard';
import { ProductDetailModal } from './components/ProductDetailModal';
import { CartDrawer } from './components/CartDrawer';
import { CheckoutModal } from './components/CheckoutModal';
import { OrderTrackerModal } from './components/OrderTrackerModal';
import { AboutUsSection } from './components/AboutUsSection';
import { ContactUsSection } from './components/ContactUsSection';
import { Footer } from './components/Footer';
import { PRODUCTS } from './data/products';
import { CartItem, Product, ProductCategory, OrderRecord } from './types';
import { Search, SlidersHorizontal, MessageCircle, Sparkles, LayoutGrid, Grid2X2, Grid3X3 } from 'lucide-react';

export default function App() {
  const [activeCategory, setActiveCategory] = useState<ProductCategory>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<'featured' | 'price-asc' | 'price-desc' | 'rating'>('featured');
  const [mobileGridCols, setMobileGridCols] = useState<'2' | '3' | '4'>('3');
  
  // Modals & Drawers state
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isTrackerOpen, setIsTrackerOpen] = useState(false);

  // Cart & Coupon
  const [cartItems, setCartItems] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem('suddais_cart');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [appliedCoupon, setAppliedCoupon] = useState<string | null>(() => {
    try {
      return localStorage.getItem('suddais_coupon');
    } catch {
      return null;
    }
  });

  // Ensure HTML lang & dir attribute are English ltr
  useEffect(() => {
    document.documentElement.lang = 'en';
    document.documentElement.dir = 'ltr';
  }, []);

  // Persist cart
  useEffect(() => {
    try {
      localStorage.setItem('suddais_cart', JSON.stringify(cartItems));
    } catch (e) {
      console.error(e);
    }
  }, [cartItems]);

  // Persist coupon
  useEffect(() => {
    try {
      if (appliedCoupon) {
        localStorage.setItem('suddais_coupon', appliedCoupon);
      } else {
        localStorage.removeItem('suddais_coupon');
      }
    } catch (e) {
      console.error(e);
    }
  }, [appliedCoupon]);

  const handleAddToCart = (product: Product, size: string) => {
    const variant = product.variants.find((v) => v.size === size) || product.variants[0];
    const cartItemId = `${product.id}-${size}`;

    setCartItems((prev) => {
      const existing = prev.find((item) => item.id === cartItemId);
      if (existing) {
        return prev.map((item) =>
          item.id === cartItemId ? { ...item, quantity: item.quantity + 1 } : item
        );
      } else {
        return [
          ...prev,
          {
            id: cartItemId,
            productId: product.id,
            nameUr: product.nameUr,
            nameEn: product.nameEn,
            category: product.category,
            image: product.image,
            selectedSize: size,
            unitPrice: variant.price,
            quantity: 1
          }
        ];
      }
    });
  };

  const handleBuyNow = (product: Product, size: string) => {
    handleAddToCart(product, size);
    setIsCheckoutOpen(true);
  };

  const handleUpdateQuantity = (id: string, newQty: number) => {
    if (newQty <= 0) {
      handleRemoveItem(id);
    } else {
      setCartItems((prev) =>
        prev.map((item) => (item.id === id ? { ...item, quantity: newQty } : item))
      );
    }
  };

  const handleRemoveItem = (id: string) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };

  const handleOrderCompleted = (_order: OrderRecord) => {
    setCartItems([]);
  };

  // Filter products by Category, Search Query, and Sort
  const filteredProducts = PRODUCTS.filter((prod) => {
    if (activeCategory !== 'all') {
      if (activeCategory === 'deals') {
        if (!prod.isDeal) return false;
      } else if (prod.category !== activeCategory) {
        return false;
      }
    }
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchName =
        prod.nameEn.toLowerCase().includes(q) ||
        prod.descriptionEn.toLowerCase().includes(q) ||
        prod.taglineEn.toLowerCase().includes(q);
      const matchNotes = prod.notes
        ? [
            ...prod.notes.top,
            ...prod.notes.heart,
            ...prod.notes.base
          ].some(
            (n) => n.en.toLowerCase().includes(q)
          )
        : false;
      return matchName || matchNotes;
    }
    return true;
  }).sort((a, b) => {
    if (sortBy === 'price-asc') return a.price - b.price;
    if (sortBy === 'price-desc') return b.price - a.price;
    if (sortBy === 'rating') return b.rating - a.rating;
    return (b.featured ? 1 : 0) - (a.featured ? 1 : 0);
  });

  const dealsProducts = PRODUCTS.filter((p) => p.isDeal);
  const totalCartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <div className="min-h-screen bg-white text-[#1a1612] font-body">
      
      {/* Top Navbar */}
      <Navbar
        activeCategory={activeCategory}
        onSelectCategory={(cat) => {
          setActiveCategory(cat);
          setSearchQuery('');
        }}
        cartCount={totalCartCount}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenTracker={() => setIsTrackerOpen(true)}
      />

      {/* Hero Slides Carousel */}
      <HeroSlider
        onExploreCategory={(cat) => {
          setActiveCategory(cat);
          setSearchQuery('');
          const el = document.getElementById('catalog-section');
          if (el) el.scrollIntoView({ behavior: 'smooth' });
        }}
        onOpenDeals={() => {
          const el = document.getElementById('deals-section');
          if (el) el.scrollIntoView({ behavior: 'smooth' });
        }}
      />

      {/* Deals & Promo Vouchers Section */}
      <DealsSection
        onApplyCoupon={(code) => setAppliedCoupon(code)}
        onSelectProduct={(prod) => setSelectedProduct(prod)}
        dealsProducts={dealsProducts}
      />

      {/* Main Catalog Section */}
      <section id="catalog-section" className="py-14 sm:py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Category Controls & Search Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8 pb-6 border-b border-[#e8dec8]">
          <div>
            <div className="flex items-center gap-2 text-[#b8860b] text-xs font-bold uppercase tracking-wider mb-1">
              <Sparkles className="w-4 h-4" />
              <span>OFFICIAL LUXURY CATALOG</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-bold text-[#1a1612] font-display">
              {activeCategory === 'all' && 'All Fragrances, Attars & Caps'}
              {activeCategory === 'perfume' && 'Designer Perfumes (15ml, 30ml, 50ml)'}
              {activeCategory === 'attar' && 'Pure Concentrated Attar (3ml, 6ml, 12ml)'}
              {activeCategory === 'topi' && 'Handcrafted Omani & Turkish Prayer Caps'}
              {activeCategory === 'deals' && 'Special Gift Presentation Sets'}
            </h2>
          </div>

          {/* Search Input */}
          <div className="relative w-full md:w-80">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-[#8c8273]" />
            <input
              type="text"
              placeholder="Search by name or note (e.g. Imperial Valley, Khamrah, Oud)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-[#faf7f2] border border-[#dcd2be] rounded-xl pl-9 pr-8 py-2.5 text-xs text-[#1a1612] placeholder:text-[#8c8273] focus:outline-none focus:border-[#b8860b]"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-[#8c8273] hover:text-[#1a1612] cursor-pointer"
              >
                ×
              </button>
            )}
          </div>
        </div>

        {/* Filter Segmented Control & Sorting */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          
          {/* Functional Button Segmented Control */}
          <div className="flex flex-wrap items-center gap-1.5 p-1.5 bg-[#faf7f2] border border-[#e8dec8] rounded-2xl">
            {(
              [
                { id: 'all', label: 'All Items', count: PRODUCTS.length },
                { id: 'perfume', label: 'Perfumes (15/30/50ml)', count: PRODUCTS.filter((p) => p.category === 'perfume').length },
                { id: 'attar', label: 'Pure Attar (3/6/12ml)', count: PRODUCTS.filter((p) => p.category === 'attar').length },
                { id: 'topi', label: 'Prayer Caps', count: PRODUCTS.filter((p) => p.category === 'topi').length },
                { id: 'deals', label: 'Special Deals', count: dealsProducts.length },
              ] as { id: ProductCategory; label: string; count: number }[]
            ).map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  setActiveCategory(item.id);
                  setSearchQuery('');
                }}
                className={`px-3 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                  activeCategory === item.id
                    ? 'bg-white text-[#996515] border border-[#d4af37]/40 shadow-xs'
                    : 'text-[#665e52] hover:text-[#1a1612] hover:bg-white/60'
                }`}
              >
                <span>{item.label}</span>
                <span className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                  activeCategory === item.id ? 'bg-[#faf2dd] text-[#996515] font-bold' : 'bg-[#eee5d3] text-[#736a5c]'
                }`}>
                  {item.count}
                </span>
              </button>
            ))}
          </div>

          <div className="flex items-center gap-2 sm:gap-3 flex-wrap">
            {/* Mobile Grid Columns Switcher: 2x, 3x, or 4x per row */}
            <div className="flex items-center gap-1 bg-[#faf7f2] border border-[#e8dec8] rounded-xl p-1 text-xs">
              <span className="text-[11px] text-[#736a5c] px-1 font-medium hidden sm:inline">
                Display:
              </span>
              <button
                onClick={() => setMobileGridCols('2')}
                className={`px-2 py-1 rounded-lg transition-colors cursor-pointer flex items-center gap-1 ${
                  mobileGridCols === '2' ? 'bg-[#1a1612] text-white font-bold' : 'text-[#665e52] hover:text-[#1a1612]'
                }`}
                title="2 Columns per row"
              >
                <Grid2X2 className="w-3.5 h-3.5" />
                <span className="text-[11px] font-mono">2x</span>
              </button>
              <button
                onClick={() => setMobileGridCols('3')}
                className={`px-2 py-1 rounded-lg transition-colors cursor-pointer flex items-center gap-1 ${
                  mobileGridCols === '3' ? 'bg-[#1a1612] text-white font-bold' : 'text-[#665e52] hover:text-[#1a1612]'
                }`}
                title="3 Columns per row (Compact)"
              >
                <Grid3X3 className="w-3.5 h-3.5" />
                <span className="text-[11px] font-mono">3x</span>
              </button>
              <button
                onClick={() => setMobileGridCols('4')}
                className={`px-2 py-1 rounded-lg transition-colors cursor-pointer flex items-center gap-1 ${
                  mobileGridCols === '4' ? 'bg-[#1a1612] text-white font-bold' : 'text-[#665e52] hover:text-[#1a1612]'
                }`}
                title="4 Columns per row (Ultra Compact)"
              >
                <LayoutGrid className="w-3.5 h-3.5" />
                <span className="text-[11px] font-mono">4x</span>
              </button>
            </div>

            {/* Sort dropdown */}
            <div className="flex items-center gap-1.5 text-xs text-[#665e52]">
              <SlidersHorizontal className="w-3.5 h-3.5 text-[#b8860b]" />
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="bg-[#faf7f2] border border-[#dcd2be] rounded-xl px-2.5 py-2 text-xs text-[#1a1612] focus:outline-none focus:border-[#b8860b] cursor-pointer"
              >
                <option value="featured">Featured Picks</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="rating">Highest Rated</option>
              </select>
            </div>
          </div>

        </div>

        {/* Product Grid - 2, 3 or 4 Columns on Mobile, up to 5/6 on Desktop */}
        {filteredProducts.length === 0 ? (
          <div className="py-20 text-center text-[#8c8273] space-y-3">
            <Search className="w-10 h-10 mx-auto opacity-40" />
            <h3 className="text-base font-bold text-[#1a1612]">
              No products found
            </h3>
            <p className="text-xs">
              Try searching with another word or change your active category filter.
            </p>
          </div>
        ) : (
          <div className={
            mobileGridCols === '4'
              ? 'grid grid-cols-4 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-1.5 sm:gap-3.5'
              : mobileGridCols === '3'
              ? 'grid grid-cols-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2 sm:gap-4'
              : 'grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2.5 sm:gap-5'
          }>
            {filteredProducts.map((prod) => (
              <ProductCard
                key={prod.id}
                product={prod}
                onOpenDetails={(p) => setSelectedProduct(p)}
                onAddToCart={(p, size) => handleAddToCart(p, size)}
                columnsMode={mobileGridCols}
              />
            ))}
          </div>
        )}

      </section>

      {/* About Us Editorial Section */}
      <AboutUsSection />

      {/* Contact Us Section with Live WhatsApp & Location */}
      <ContactUsSection />

      {/* Footer */}
      <Footer
        onSelectCategory={(cat) => {
          setActiveCategory(cat);
          setSearchQuery('');
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        onOpenTracker={() => setIsTrackerOpen(true)}
      />

      {/* Modals & Slide-Overs */}
      <ProductDetailModal
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
        onAddToCart={handleAddToCart}
        onBuyNow={handleBuyNow}
      />

      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onProceedToCheckout={() => {
          setIsCartOpen(false);
          setIsCheckoutOpen(true);
        }}
        appliedCoupon={appliedCoupon}
        onApplyCoupon={(code) => setAppliedCoupon(code)}
      />

      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        cartItems={cartItems}
        onOrderCompleted={handleOrderCompleted}
        appliedCoupon={appliedCoupon}
      />

      <OrderTrackerModal
        isOpen={isTrackerOpen}
        onClose={() => setIsTrackerOpen(false)}
      />

      {/* Floating WhatsApp CTA */}
      <aside aria-label="WhatsApp Support" className="fixed bottom-6 right-6 z-40">
        <a
          href="https://wa.me/923182187575?text=Hello!%20I%20would%20like%20to%20order%20from%20Suddais%20Collection."
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2.5 px-4 py-3 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105 group border border-emerald-400/40"
          aria-label="Chat on WhatsApp"
        >
          <MessageCircle className="w-5 h-5 fill-white" />
          <span className="hidden sm:inline font-sans tracking-wide">
            Order on WhatsApp
          </span>
          <span className="w-2.5 h-2.5 rounded-full bg-white animate-pulse" />
        </a>
      </aside>

    </div>
  );
}
