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
import { OrderModal } from './components/OrderModal';
import { CheckCircle2 } from 'lucide-react';

export default function App() {
  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem('thane_rivers_cart');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [isOrderModalOpen, setIsOrderModalOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  useEffect(() => {
    try {
      localStorage.setItem('thane_rivers_cart', JSON.stringify(cart));
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

  const handleAddToCart = (product: Product, variant: string, openModal = true) => {
    setCart((prevCart) => {
      const existingIndex = prevCart.findIndex(
        (item) => item.product.id === product.id && item.selectedVariant === variant
      );

      if (existingIndex > -1) {
        const updated = [...prevCart];
        updated[existingIndex].quantity += 1;
        return updated;
      } else {
        return [...prevCart, { product, quantity: 1, selectedVariant: variant }];
      }
    });

    showToast(`Added "${product.name}" to cart`);

    if (openModal) {
      setIsOrderModalOpen(true);
    }
  };

  const handleUpdateQuantity = (productId: string, variant: string, delta: number) => {
    setCart((prevCart) => {
      return prevCart
        .map((item) => {
          if (item.product.id === productId && item.selectedVariant === variant) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean) as CartItem[];
    });
  };

  const handleRemoveItem = (productId: string, variant: string) => {
    setCart((prevCart) =>
      prevCart.filter(
        (item) => !(item.product.id === productId && item.selectedVariant === variant)
      )
    );
  };

  const handleClearCart = () => {
    setCart([]);
  };

  const scrollToSection = (sectionId: string) => {
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const totalCartItemCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="min-h-screen bg-white text-slate-900 flex flex-col font-sans selection:bg-[#264BD8] selection:text-white">
      
      {/* 1. White Navbar with Spiral Logo & Right Icons matching reference */}
      <Navbar
        cartCount={totalCartItemCount}
        onOpenCart={() => setIsOrderModalOpen(true)}
        onNavigate={scrollToSection}
      />

      {/* Main Page Flow matching user brief & screenshots word for word */}
      <main className="flex-1">
        
        {/* 2. Hero Section: Video + "SALE SALE SALE" ocean banner + "AS SEEN ON" */}
        <HeroSection
          onQuickOrder={() => {
            handleAddToCart(PRODUCTS[0], PRODUCTS[0].variants[0], true);
          }}
        />

        {/* 3. Body: Royal Blue Showcase with auto-changing products (no moving button) */}
        <ProductShowcase
          onAddToCart={(product, variant) => handleAddToCart(product, variant, true)}
        />

        {/* 4. 2-Column Wireframe Bento Grid showcasing other products on clean white */}
        <WireframeGrid
          onSelectProduct={(product) => handleAddToCart(product, product.variants[0], true)}
          onOpenLoversGifting={() => scrollToSection('lovers-gifting')}
        />

        {/* 5. Lovers Gifting (from corporate gifting) with products sliding up automatically */}
        <LoversGifting
          onSelectProduct={(product) => handleAddToCart(product, product.variants[0], true)}
        />

        {/* 6. Our Story: YouTube video + cyan slow auto-moving text + secondary video */}
        <OurStorySection
          onExploreVault={() => scrollToSection('products')}
        />

        {/* 7. Instagram Section with blue verified checkmark & follower count */}
        <SocialSection />

        {/* 8. What Our Customers Think: Moving side-to-side with circular slideshow buttons */}
        <ReviewSlider />

        {/* 9. The Thane Rivers Archives & Journal (50 SEO/AEO/GEO Articles) */}
        <BlogSection
          onQuickOrder={(productId) => {
            const product = PRODUCTS.find((p) => p.id === productId) || PRODUCTS[0];
            handleAddToCart(product, product.variants[0], true);
          }}
        />

      </main>

      {/* 9. Footer: Black background with spiral logo, stacked links (NO login/signin, NO store locations) */}
      <Footer
        onNavigate={scrollToSection}
        onOpenCart={() => setIsOrderModalOpen(true)}
      />

      {/* 10. Order Summary & Contact Details Form Modal */}
      <OrderModal
        isOpen={isOrderModalOpen}
        onClose={() => setIsOrderModalOpen(false)}
        cart={cart}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onAddToCart={(product, variant) => handleAddToCart(product, variant, false)}
        onClearCart={handleClearCart}
      />

      {/* Notification Toast */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#264BD8] text-white px-4 py-3 rounded-2xl shadow-xl flex items-center gap-2 animate-in slide-in-from-bottom duration-300">
          <CheckCircle2 className="w-5 h-5 text-white shrink-0" />
          <span className="text-xs font-bold">{toastMessage}</span>
          <button
            onClick={() => setIsOrderModalOpen(true)}
            className="ml-2 text-xs bg-white text-[#264BD8] px-2.5 py-0.5 rounded-full font-bold uppercase hover:bg-slate-100"
          >
            Cart
          </button>
        </div>
      )}

    </div>
  );
}
