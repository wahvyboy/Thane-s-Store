import { CartItem } from '../types';
import { X, Trash2, Plus, Minus, ShoppingBag, ArrowRight, ShieldCheck, Check } from 'lucide-react';
import { PRODUCTS } from '../data/products';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cart: CartItem[];
  onUpdateQuantity: (productId: string, variant: string, size: string, delta: number) => void;
  onRemoveItem: (productId: string, variant: string, size: string) => void;
  onProceedToCheckout: () => void;
  onSelectProduct?: (productId: string) => void;
}

export function CartDrawer({
  isOpen,
  onClose,
  cart,
  onUpdateQuantity,
  onRemoveItem,
  onProceedToCheckout,
  onSelectProduct,
}: CartDrawerProps) {
  if (!isOpen) return null;

  const totalAmount = cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const totalItemsCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="fixed inset-0 z-50 overflow-hidden animate-in fade-in duration-200">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity"
        onClick={onClose}
      />

      {/* Slide-over Drawer Panel */}
      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white text-slate-900 shadow-2xl flex flex-col justify-between z-10 animate-in slide-in-from-right duration-300 border-l border-slate-200">
          
          {/* Header */}
          <div className="p-5 border-b border-slate-200 flex items-center justify-between bg-white">
            <div className="flex items-center gap-2.5">
              <ShoppingBag className="w-5 h-5 text-[#233EB6]" />
              <h2 className="text-base sm:text-lg font-black uppercase tracking-wider text-slate-950 font-sans">
                Your Shopping Bag
              </h2>
              <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-blue-50 text-[#233EB6]">
                {totalItemsCount}
              </span>
            </div>

            <button
              onClick={onClose}
              className="p-1.5 rounded-full text-slate-500 hover:text-slate-900 hover:bg-slate-100 transition-colors"
              aria-label="Close bag"
            >
              <X className="w-5 h-5 stroke-[2.5]" />
            </button>
          </div>

          {/* Insured Worldwide Delivery Bar */}
          <div className="bg-[#EEF2FF] border-b border-blue-100 px-5 py-2.5 flex items-center gap-2.5 text-xs text-[#233EB6] font-bold">
            <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
            <div className="flex-1">
              <div className="flex justify-between items-center text-[11px] mb-1">
                <span>Free Insured Worldwide Delivery</span>
                <span className="text-emerald-700 uppercase font-black">Unlocked</span>
              </div>
              <div className="w-full h-1.5 bg-blue-200/80 rounded-full overflow-hidden">
                <div className="w-full h-full bg-emerald-500 rounded-full" />
              </div>
            </div>
          </div>

          {/* Cart Items List */}
          <div className="flex-1 overflow-y-auto p-5 space-y-4">
            {cart.length === 0 ? (
              <div className="py-16 text-center space-y-4">
                <div className="w-16 h-16 rounded-full bg-slate-100 flex items-center justify-center mx-auto text-slate-400">
                  <ShoppingBag className="w-8 h-8" />
                </div>
                <h3 className="text-base font-bold text-slate-800">Your bag is currently empty</h3>
                <p className="text-xs text-slate-500 max-w-xs mx-auto">
                  Explore the Thane Rivers vault to discover our 3 signature releases.
                </p>

                <div className="pt-4 space-y-2 text-left">
                  <span className="text-[10px] font-black uppercase tracking-wider text-slate-400 block px-1">
                    Featured Releases
                  </span>
                  {PRODUCTS.map((prod) => (
                    <button
                      key={prod.id}
                      onClick={() => {
                        if (onSelectProduct) onSelectProduct(prod.id);
                        onClose();
                      }}
                      className="w-full p-2.5 rounded-xl border border-slate-200 hover:border-[#233EB6] hover:bg-blue-50/50 flex items-center justify-between text-left transition-colors cursor-pointer group"
                    >
                      <div className="flex items-center gap-2.5 min-w-0">
                        <img
                          src={prod.images[0] || prod.image}
                          alt={prod.name}
                          className="w-10 h-10 rounded-lg object-cover"
                          referrerPolicy="no-referrer"
                        />
                        <div className="truncate">
                          <p className="text-xs font-bold text-slate-900 truncate group-hover:text-[#233EB6]">
                            {prod.name}
                          </p>
                          <p className="text-[10px] text-slate-500 font-mono">${prod.price.toLocaleString()} USD</p>
                        </div>
                      </div>
                      <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-[#233EB6] shrink-0" />
                    </button>
                  ))}
                </div>
              </div>
            ) : (
              cart.map((item) => (
                <div
                  key={`${item.product.id}-${item.selectedVariant}-${item.selectedSize}`}
                  className="flex gap-3.5 p-3.5 rounded-2xl bg-slate-50 border border-slate-200/90 relative group"
                >
                  {/* Thumbnail Image */}
                  <img
                    src={item.product.images[0] || item.product.image}
                    alt={item.product.name}
                    className="w-20 h-24 rounded-xl object-cover border border-slate-200 shrink-0 bg-white"
                    referrerPolicy="no-referrer"
                  />

                  {/* Line Item Details */}
                  <div className="flex-1 min-w-0 flex flex-col justify-between">
                    <div>
                      <div className="flex items-start justify-between gap-1">
                        <h4 className="text-xs font-black text-slate-900 leading-tight truncate">
                          {item.product.name}
                        </h4>
                        <button
                          onClick={() => onRemoveItem(item.product.id, item.selectedVariant, item.selectedSize)}
                          className="text-slate-400 hover:text-red-600 transition-colors p-0.5"
                          title="Remove item"
                          aria-label="Remove item"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      {/* Variant and Size Tags */}
                      <div className="mt-1 flex flex-wrap gap-1 text-[10px]">
                        <span className="px-2 py-0.5 rounded-md bg-white border border-slate-200 text-slate-700 font-semibold">
                          Size: <strong className="text-slate-900">{item.selectedSize}</strong>
                        </span>
                        <span className="px-2 py-0.5 rounded-md bg-white border border-slate-200 text-slate-600 truncate max-w-[130px]">
                          {item.selectedVariant}
                        </span>
                      </div>
                    </div>

                    {/* Price and Quantity Controller */}
                    <div className="flex items-center justify-between mt-2 pt-2 border-t border-slate-200/60">
                      <span className="text-xs font-black text-slate-900 font-mono">
                        ${(item.product.price * item.quantity).toLocaleString()} USD
                      </span>

                      <div className="flex items-center border border-slate-300 rounded-lg bg-white">
                        <button
                          onClick={() => onUpdateQuantity(item.product.id, item.selectedVariant, item.selectedSize, -1)}
                          className="p-1 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-l transition-colors"
                          aria-label="Decrease quantity"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="px-2 text-xs font-bold font-mono">{item.quantity}</span>
                        <button
                          onClick={() => onUpdateQuantity(item.product.id, item.selectedVariant, item.selectedSize, 1)}
                          className="p-1 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-r transition-colors"
                          aria-label="Increase quantity"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Drawer Footer & Checkout CTA */}
          {cart.length > 0 && (
            <div className="p-5 border-t border-slate-200 bg-white space-y-3">
              <div className="space-y-1.5 text-xs">
                <div className="flex justify-between text-slate-600">
                  <span>Subtotal</span>
                  <span className="font-bold text-slate-900 font-mono">${totalAmount.toLocaleString()} USD</span>
                </div>
                <div className="flex justify-between text-slate-600">
                  <span>Insured Global Courier</span>
                  <span className="font-bold text-emerald-600 uppercase">FREE</span>
                </div>
                <div className="flex justify-between text-sm font-black text-slate-950 pt-2 border-t border-slate-200">
                  <span>Estimated Total</span>
                  <span className="text-base text-[#233EB6] font-mono">${totalAmount.toLocaleString()} USD</span>
                </div>
              </div>

              <button
                onClick={onProceedToCheckout}
                className="w-full py-4 rounded-full bg-[#233EB6] hover:bg-[#182B7A] text-white font-black text-xs uppercase tracking-widest shadow-xl transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-98"
              >
                <span>PROCEED TO CHECKOUT</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <p className="text-[10px] text-center text-slate-400 font-medium">
                Encrypted Concierge Dispatch • Support:{' '}
                <a href="mailto:support@thaneriver.shop" className="text-[#233EB6] hover:underline">
                  support@thaneriver.shop
                </a>
              </p>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
