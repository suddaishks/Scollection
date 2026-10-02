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
import { Search, SlidersHorizontal, MessageCircle, Sparkles } from 'lucide-react';

export default function App() {
  const [lang, setLang] = useState<'ur' | 'en'>('ur');
  const [activeCategory, setActiveCategory] = useState<ProductCategory>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<'featured' | 'price-asc' | 'price-desc' | 'rating'>('featured');
  
  // Modals & Drawers state
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isTrackerOpen, setIsTrackerOpen] = useState(false);

  // Cart & Coupon
  const [cartItems, setCartItems] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem('itr_rida_cart');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [appliedCoupon, setAppliedCoupon] = useState<string | null>(() => {
    try {
      return localStorage.getItem('itr_rida_coupon');
    } catch {
      return null;
    }
  });

  // Keep HTML lang & dir attribute in sync
  useEffect(() => {
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === 'ur' ? 'rtl' : 'ltr';
  }, [lang]);

  // Persist cart
  useEffect(() => {
    try {
      localStorage.setItem('itr_rida_cart', JSON.stringify(cartItems));
    } catch (e) {
      console.error(e);
    }
  }, [cartItems]);

  // Persist coupon
  useEffect(() => {
    try {
      if (appliedCoupon) {
        localStorage.setItem('itr_rida_coupon', appliedCoupon);
      } else {
        localStorage.removeItem('itr_rida_coupon');
      }
    } catch (e) {
      console.error(e);
    }
  }, [appliedCoupon]);

  const toggleLanguage = () => {
    setLang((prev) => (prev === 'ur' ? 'en' : 'ur'));
  };

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
    // Keep cart cleared upon completed order
    setCartItems([]);
  };

  // Filter products
  const filteredProducts = PRODUCTS.filter((p) => {
    if (activeCategory === 'deals') {
      return p.isDeal;
    }
    if (activeCategory !== 'all' && p.category !== activeCategory) {
      return false;
    }
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchName =
        p.nameUr.toLowerCase().includes(q) ||
        p.nameEn.toLowerCase().includes(q) ||
        p.descriptionUr.toLowerCase().includes(q) ||
        p.descriptionEn.toLowerCase().includes(q);
      const matchNotes = p.notes
        ? [...p.notes.top, ...p.notes.heart, ...p.notes.base].some(
            (n) => n.ur.toLowerCase().includes(q) || n.en.toLowerCase().includes(q)
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
    <div className={`min-h-screen bg-[#0f1115] text-[#f4efe6] ${lang === 'ur' ? 'font-urdu' : 'font-body'}`}>
      
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
        lang={lang}
        onToggleLang={toggleLanguage}
      />

      {/* Hero Slides Carousel */}
      <HeroSlider
        onExploreCategory={(cat) => {
          setActiveCategory(cat);
          setSearchQuery('');
        }}
        onOpenDeals={() => {
          const el = document.getElementById('deals-section');
          if (el) el.scrollIntoView({ behavior: 'smooth' });
        }}
        lang={lang}
      />

      {/* Deals & Promo Vouchers Section */}
      <DealsSection
        onApplyCoupon={(code) => setAppliedCoupon(code)}
        onSelectProduct={(prod) => setSelectedProduct(prod)}
        dealsProducts={dealsProducts}
        lang={lang}
      />

      {/* Main Catalog Section */}
      <section id="catalog-section" className="py-16 sm:py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Category Controls & Search Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8 pb-6 border-b border-[#232838]">
          <div>
            <div className="flex items-center gap-2 text-[#d4af37] text-xs font-semibold uppercase tracking-wider mb-1">
              <Sparkles className="w-4 h-4" />
              <span>{lang === 'ur' ? 'پریمیم انتخاب' : 'Curated Catalog'}</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-[#f4efe6] font-display">
              {activeCategory === 'all' && (lang === 'ur' ? 'تمام پرفیومز، عطر اور ٹوپیاں' : 'All Fragrances, Attars & Caps')}
              {activeCategory === 'perfume' && (lang === 'ur' ? 'فرانسیسی و مشرقی پرفیومز' : 'French & Oriental Perfumes')}
              {activeCategory === 'attar' && (lang === 'ur' ? 'خالص و سنتی عطر (100٪ الکحل سے پاک)' : 'Pure Non-Alcoholic Attar')}
              {activeCategory === 'topi' && (lang === 'ur' ? 'شاہی عمانی و ترک فیز نماز ٹوپیاں' : 'Handmade Prayer Caps')}
              {activeCategory === 'deals' && (lang === 'ur' ? 'شاہی ڈیلز و تحفہ بنڈلز' : 'Special Gift Presentation Sets')}
            </h2>
          </div>

          {/* Search Input */}
          <div className="relative w-full md:w-80">
            <Search className="w-4 h-4 absolute start-3 top-1/2 -translate-y-1/2 text-[#8e8778]" />
            <input
              type="text"
              placeholder={lang === 'ur' ? 'خوشبو یا نوٹس تلاش کریں (عود، گلاب، کستوری)...' : 'Search by name or note (oud, rose)...'}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-[#151821] border border-[#272e3f] rounded-xl ps-9 pe-3 py-2 text-xs text-[#f4efe6] placeholder:text-[#676f82] focus:outline-none focus:border-[#d4af37]"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute end-3 top-1/2 -translate-y-1/2 text-xs text-[#8e8778] hover:text-white"
              >
                ×
              </button>
            )}
          </div>
        </div>

        {/* Filter Segmented Control & Sorting */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          
          {/* Functional Button Segmented Control */}
          <div className="flex flex-wrap items-center gap-1.5 p-1.5 bg-[#141722] border border-[#242a3a] rounded-xl">
            {(
              [
                { cat: 'all', ur: 'سب اشیاء', en: 'All Items', count: PRODUCTS.length },
                { cat: 'perfume', ur: 'پرفیومز', en: 'Perfumes', count: PRODUCTS.filter(p => p.category === 'perfume').length },
                { cat: 'attar', ur: 'خالص عطر', en: 'Pure Attar', count: PRODUCTS.filter(p => p.category === 'attar').length },
                { cat: 'topi', ur: 'ٹوپیاں', en: 'Prayer Caps', count: PRODUCTS.filter(p => p.category === 'topi').length },
                { cat: 'deals', ur: 'ڈیلز و آفرز', en: 'Deals & Bundles', count: PRODUCTS.filter(p => p.isDeal).length }
              ] as const
            ).map((item) => (
              <button
                key={item.cat}
                onClick={() => setActiveCategory(item.cat)}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer flex items-center gap-1.5 ${
                  activeCategory === item.cat
                    ? 'bg-[#d4af37] text-[#0f1115] shadow-sm'
                    : 'text-[#a69f91] hover:text-[#f4efe6] hover:bg-[#1e2332]'
                }`}
              >
                <span>{lang === 'ur' ? item.ur : item.en}</span>
                <span className={`text-[11px] tabular-nums font-mono px-1.5 py-0.2 rounded-full ${
                  activeCategory === item.cat ? 'bg-[#0f1115]/20 text-[#0f1115]' : 'bg-[#222736] text-[#7d859a]'
                }`}>
                  {item.count}
                </span>
              </button>
            ))}
          </div>

          {/* Sort dropdown */}
          <div className="flex items-center gap-2 text-xs text-[#a69f91]">
            <SlidersHorizontal className="w-3.5 h-3.5 text-[#d4af37]" />
            <span>{lang === 'ur' ? 'ترتیب:' : 'Sort By:'}</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="bg-[#141722] border border-[#242a3a] rounded-lg px-2.5 py-1.5 text-xs text-[#f4efe6] focus:outline-none focus:border-[#d4af37] cursor-pointer"
            >
              <option value="featured">{lang === 'ur' ? 'مقبول ترین (Featured)' : 'Featured'}</option>
              <option value="price-asc">{lang === 'ur' ? 'قیمت: کم سے زیادہ' : 'Price: Low to High'}</option>
              <option value="price-desc">{lang === 'ur' ? 'قیمت: زیادہ سے کم' : 'Price: High to Low'}</option>
              <option value="rating">{lang === 'ur' ? 'اعلیٰ ترین ریٹنگ' : 'Highest Rated'}</option>
            </select>
          </div>

        </div>

        {/* Product Grid - 3 Column Desktop Baseline */}
        {filteredProducts.length === 0 ? (
          <div className="py-20 text-center text-[#8e8778] space-y-3">
            <Search className="w-10 h-10 mx-auto opacity-40" />
            <h3 className="text-base font-bold text-[#f4efe6]">
              {lang === 'ur' ? 'کوئی پروڈکٹ نہیں مل سکی' : 'No products matched your search'}
            </h3>
            <p className="text-xs">
              {lang === 'ur' ? 'براہ کرم کوئی دوسرا لفظ تلاش کریں یا کیٹیگری تبدیل کریں۔' : 'Try adjusting your search terms or filter.'}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {filteredProducts.map((prod) => (
              <ProductCard
                key={prod.id}
                product={prod}
                onOpenDetails={(p) => setSelectedProduct(p)}
                onAddToCart={(p, size) => handleAddToCart(p, size)}
                lang={lang}
              />
            ))}
          </div>
        )}

      </section>

      {/* About Us Section */}
      <AboutUsSection lang={lang} />

      {/* Contact Us Section */}
      <ContactUsSection lang={lang} />

      {/* Footer */}
      <Footer
        onSelectCategory={(cat) => {
          setActiveCategory(cat);
          setSearchQuery('');
          const el = document.getElementById('catalog-section');
          if (el) el.scrollIntoView({ behavior: 'smooth' });
        }}
        onOpenTracker={() => setIsTrackerOpen(true)}
        lang={lang}
      />

      {/* Modals & Slide-over Drawers */}
      <ProductDetailModal
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
        onAddToCart={(prod, size) => handleAddToCart(prod, size)}
        onBuyNow={(prod, size) => handleBuyNow(prod, size)}
        lang={lang}
      />

      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onProceedToCheckout={() => setIsCheckoutOpen(true)}
        appliedCoupon={appliedCoupon}
        onApplyCoupon={(code) => setAppliedCoupon(code)}
        lang={lang}
      />

      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        cartItems={cartItems}
        onOrderCompleted={handleOrderCompleted}
        appliedCoupon={appliedCoupon}
        lang={lang}
      />

      <OrderTrackerModal
        isOpen={isTrackerOpen}
        onClose={() => setIsTrackerOpen(false)}
        lang={lang}
      />

      {/* Floating Quick WhatsApp Chat & Order Button */}
      <a
        href="https://wa.me/923001234567?text=Assalam%20o%20Alaikum!%20I%20want%20to%20place%20an%20order"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 start-6 z-40 flex items-center gap-2 bg-[#25d366] hover:bg-[#20ba5a] text-white px-4 py-3 rounded-full shadow-2xl transition-all hover:scale-105 active:scale-95 cursor-pointer"
        aria-label="Direct WhatsApp Chat"
      >
        <MessageCircle className="w-5 h-5 fill-current" />
        <span className="text-xs font-bold whitespace-nowrap hidden sm:inline">
          {lang === 'ur' ? 'واٹس ایپ پر فوری آرڈر' : 'WhatsApp Order'}
        </span>
      </a>

    </div>
  );
}
