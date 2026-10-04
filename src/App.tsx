/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { Product, CartItem } from './types';
import { PRODUCTS } from './data/products';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { ProductShowcase } from './components/ProductShowcase';
import { WireframeGrid } from './components/WireframeGrid';
import { LoversGifting } from './components/LoversGifting';
import { OurStorySection } from './components/OurStorySection';
import { SocialSection } from './components/SocialSection';
import { ReviewSlider } from './components/ReviewSlider';
import { BlogSection } from './components/BlogSection';
import { Footer } from './components/Footer';
import { ShopCatalog } from './components/ShopCatalog';
import { ProductDetailView } from './components/ProductDetailView';
import { CartDrawer } from './components/CartDrawer';
import { CheckoutModal } from './components/CheckoutModal';
import { CheckCircle2, ArrowRight } from 'lucide-react';

export default function App() {
  const [currentView, setCurrentView] = useState<'home' | 'shop' | 'product-detail'>('home');
  const [selectedProduct, setSelectedProduct] = useState<Product>(PRODUCTS[0]);

  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem('thane_rivers_cart_v2');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  useEffect(() => {
    try {
      localStorage.setItem('thane_rivers_cart_v2', JSON.stringify(cart));
    } catch {
      // Storage fallback
    }
  }, [cart]);

  const showToast = (message: string) => {
    setToastMessage(message);
    setTimeout(() => {
      setToastMessage(null);
    }, 3500);
  };

  const handleAddToCart = (
    product: Product,
    variant: string,
    size: string = 'L',
    quantity: number = 1,
    openDrawer: boolean = true
  ) => {
    setCart((prevCart) => {
      const existingIndex = prevCart.findIndex(
        (item) =>
          item.product.id === product.id &&
          item.selectedVariant === variant &&
          item.selectedSize === size
      );

      if (existingIndex > -1) {
        const updated = [...prevCart];
        updated[existingIndex].quantity += quantity;
        return updated;
      } else {
        return [
          ...prevCart,
          {
            product,
            quantity,
            selectedVariant: variant || product.variants[0],
            selectedSize: size || 'L',
          },
        ];
      }
    });

    showToast(`Added ${quantity}x "${product.name}" (${size}) to bag`);

    if (openDrawer) {
      setIsCartOpen(true);
    }
  };

  const handleUpdateQuantity = (
    productId: string,
    variant: string,
    size: string,
    delta: number
  ) => {
    setCart((prevCart) => {
      return prevCart
        .map((item) => {
          if (
            item.product.id === productId &&
            item.selectedVariant === variant &&
            item.selectedSize === size
          ) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean) as CartItem[];
    });
  };

  const handleRemoveItem = (productId: string, variant: string, size: string) => {
    setCart((prevCart) =>
      prevCart.filter(
        (item) =>
          !(
            item.product.id === productId &&
            item.selectedVariant === variant &&
            item.selectedSize === size
          )
      )
    );
  };

  const handleClearCart = () => {
    setCart([]);
  };

  const handleOpenProductDetail = (product: Product) => {
    setSelectedProduct(product);
    setCurrentView('product-detail');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOpenProductDetailById = (productId: string) => {
    const found = PRODUCTS.find((p) => p.id === productId) || PRODUCTS[0];
    handleOpenProductDetail(found);
  };

  const handleNavigation = (sectionOrView: string) => {
    if (sectionOrView === 'shop' || sectionOrView === 'store' || sectionOrView === 'products') {
      setCurrentView('shop');
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    if (sectionOrView === 'home' || sectionOrView === 'hero') {
      setCurrentView('home');
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    // If currently on shop or PDP, first return to home then scroll to section
    if (currentView !== 'home') {
      setCurrentView('home');
      setTimeout(() => {
        const el = document.getElementById(sectionOrView);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } else {
      const el = document.getElementById(sectionOrView);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const totalCartItemCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="min-h-screen bg-white text-slate-900 flex flex-col font-sans selection:bg-[#233EB6] selection:text-white">
      
      {/* 1. Official Navbar with Concentric Vortex Logo & Global Icons */}
      <Navbar
        cartCount={totalCartItemCount}
        onOpenCart={() => setIsCartOpen(true)}
        onNavigate={handleNavigation}
        onSelectProductById={handleOpenProductDetailById}
      />

      {/* Main View Switcher: Home View / Dedicated Shopify-Style Shop View / Product Detail View */}
      <main className="flex-1">
        {currentView === 'shop' ? (
          /* Dedicated Shopify-Style Shop Catalog View */
          <ShopCatalog
            onSelectProduct={handleOpenProductDetail}
            onAddToCart={(product, variant, size) => handleAddToCart(product, variant, size, 1, true)}
            onBackToHome={() => handleNavigation('home')}
          />
        ) : currentView === 'product-detail' ? (
          /* Dedicated Shopify-Style Product Detail View (PDP) */
          <ProductDetailView
            product={selectedProduct}
            onAddToCart={(product, variant, size, quantity) =>
              handleAddToCart(product, variant, size, quantity, true)
            }
            onBackToCatalog={() => setCurrentView('shop')}
            onSelectProduct={handleOpenProductDetail}
          />
        ) : (
          /* Main Brand Flagship Experience */
          <>
            {/* 2. Hero Section: Multi-Device HTML5 Video with Programmatic Muted Autoplay + Sound Toggle */}
            <HeroSection
              onExploreShop={() => handleNavigation('shop')}
            />

            {/* 3. Product Showcase: Royal Blue with auto-changing products */}
            <ProductShowcase
              onAddToCart={(product, variant, size) => handleAddToCart(product, variant, size, 1, true)}
              onSelectProduct={handleOpenProductDetail}
            />

            {/* Quick Catalog Discovery Banner */}
            <section className="w-full bg-[#182B7A] text-white py-6 px-4">
              <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
                <div>
                  <h3 className="text-base sm:text-lg font-black uppercase tracking-wider">
                    EXPLORE THE THANE RIVERS VAULT
                  </h3>
                  <p className="text-xs text-blue-200 mt-0.5">
                    Browse all 3 serialized signature releases with direct white-glove courier dispatch.
                  </p>
                </div>
                <button
                  onClick={() => handleNavigation('shop')}
                  className="px-6 py-2.5 rounded-full bg-white text-[#182B7A] hover:bg-slate-100 text-xs font-black uppercase tracking-widest transition-all shadow-md flex items-center gap-1.5 cursor-pointer shrink-0"
                >
                  <span>OPEN OFFICIAL VAULT (3)</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </section>

            {/* 4. 2-Column Wireframe Bento Grid */}
            <WireframeGrid
              onSelectProduct={handleOpenProductDetail}
              onOpenLoversGifting={() => handleNavigation('lovers-gifting')}
            />

            {/* 5. Lovers Gifting Suite */}
            <LoversGifting
              onSelectProduct={handleOpenProductDetail}
            />

            {/* 6. Our Story: YouTube Video Embed + Slow Marquee + Explore Merch Slideshow */}
            <OurStorySection
              onExploreVault={() => handleNavigation('shop')}
            />

            {/* 7. Instagram Verified Social Section */}
            <SocialSection />

            {/* 8. What Our Customers Think: Customer Reviews Carousel */}
            <ReviewSlider />

            {/* 9. The Thane Rivers Archives & Journal (50 Articles) */}
            <BlogSection
              onQuickOrder={(productId) => handleOpenProductDetailById(productId)}
            />
          </>
        )}
      </main>

      {/* Footer: Black background with spiral logo, direct links, and concierge contact */}
      <Footer
        onNavigate={handleNavigation}
        onOpenCart={() => setIsCartOpen(true)}
        onSelectProductById={handleOpenProductDetailById}
      />

      {/* Slide-over Cart Bag Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cart={cart}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onProceedToCheckout={() => {
          setIsCartOpen(false);
          setIsCheckoutOpen(true);
        }}
        onSelectProduct={handleOpenProductDetailById}
      />

      {/* Concierge Checkout Modal & Order Confirmation */}
      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        cart={cart}
        onClearCart={handleClearCart}
      />

      {/* Notification Toast */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#233EB6] text-white px-4 py-3 rounded-2xl shadow-2xl flex items-center gap-2.5 animate-in slide-in-from-bottom duration-300 border border-white/20">
          <CheckCircle2 className="w-5 h-5 text-white shrink-0" />
          <span className="text-xs font-bold">{toastMessage}</span>
          <button
            onClick={() => setIsCartOpen(true)}
            className="ml-2 text-xs bg-white text-[#233EB6] px-3 py-1 rounded-full font-bold uppercase hover:bg-slate-100 transition-colors cursor-pointer shadow-xs"
          >
            Bag ({totalCartItemCount})
          </button>
        </div>
      )}

    </div>
  );
}
