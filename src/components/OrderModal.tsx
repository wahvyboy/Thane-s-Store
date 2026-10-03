import { useState } from 'react';
import { CartItem, CustomerOrderForm } from '../types';
import { PRODUCTS } from '../data/products';
import { X, Trash2, Plus, Minus, Mail, Copy, Check, ShoppingBag } from 'lucide-react';

interface OrderModalProps {
  isOpen: boolean;
  onClose: () => void;
  cart: CartItem[];
  onUpdateQuantity: (productId: string, variant: string, delta: number) => void;
  onRemoveItem: (productId: string, variant: string) => void;
  onAddToCart: (product: any, variant: string) => void;
  onClearCart: () => void;
}

export function OrderModal({
  isOpen,
  onClose,
  cart,
  onUpdateQuantity,
  onRemoveItem,
  onAddToCart,
  onClearCart,
}: OrderModalProps) {
  const [formData, setFormData] = useState<CustomerOrderForm>({
    fullName: '',
    email: '',
    phone: '',
    shippingAddress: '',
    pyjamaSize: 'L (Standard Fit)',
    preferredContact: 'email',
    specialNotes: '',
  });

  const [copied, setCopied] = useState(false);
  const [orderSubmitted, setOrderSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  if (!isOpen) return null;

  const totalAmount = cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);

  const generateOrderSummaryText = () => {
    const itemsList = cart
      .map(
        (item, idx) =>
          `${idx + 1}. ${item.product.name} [${item.selectedVariant}] x ${item.quantity} = $${(
            item.product.price * item.quantity
          ).toLocaleString()}`
      )
      .join('\n');

    return `THANE RIVERS CELEBRITY MERCHANDISE ORDER REQUEST
==================================================
CUSTOMER CONTACT INFORMATION:
Full Name: ${formData.fullName}
Email Address: ${formData.email}
Phone / WhatsApp: ${formData.phone}
Shipping Address: ${formData.shippingAddress}
Selected Size: ${formData.pyjamaSize}
Preferred Contact Method: ${formData.preferredContact.toUpperCase()}
Special Requests / Notes: ${formData.specialNotes || 'None'}

--------------------------------------------------
ITEMIZED ORDER SUMMARY:
${itemsList}

--------------------------------------------------
TOTAL ORDER AMOUNT: $${totalAmount.toLocaleString()} USD
STATUS: Pending Concierge Outreach & Final Transaction
==================================================
*Please contact me directly to finalize this order.*`;
  };

  const handleCopyClipboard = () => {
    const text = generateOrderSummaryText();
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 3000);
  };

  const handleSendEmail = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.fullName.trim() || !formData.email.trim() || !formData.phone.trim()) {
      setErrorMsg('Please complete your Name, Email, and Phone so we can reach out to you.');
      return;
    }
    setErrorMsg('');

    const subject = encodeURIComponent(`Thane Rivers Official Order Request - ${formData.fullName}`);
    const body = encodeURIComponent(generateOrderSummaryText());
    const mailtoUrl = `mailto:purchase@thanerivers.shop?cc=vibeswithmadu@gmail.com&subject=${subject}&body=${body}`;

    window.location.href = mailtoUrl;
    setOrderSubmitted(true);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 overflow-y-auto animate-in fade-in duration-200">
      {/* Backdrop */}
      <div className="fixed inset-0 bg-black/60 backdrop-blur-xs" onClick={onClose} />

      {/* Modal Dialog Content in clean white matching BlendJet look */}
      <div className="relative w-full max-w-3xl bg-white rounded-3xl shadow-2xl text-slate-900 overflow-hidden my-auto max-h-[92vh] flex flex-col z-10 border border-slate-200">
        
        {/* Top Header: Royal Blue */}
        <div className="p-4 sm:p-5 bg-[#264BD8] text-white flex items-center justify-between">
          <div className="flex items-center gap-2">
            <svg viewBox="0 0 24 24" className="w-6 h-6 fill-current">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/>
            </svg>
            <h3 className="font-sans font-black text-base sm:text-lg tracking-wide uppercase">
              ORDER SUMMARY & CONTACT DETAILS
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full text-white hover:bg-white/10"
            aria-label="Close"
          >
            <X className="w-6 h-6 stroke-[2.5]" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="flex-1 overflow-y-auto p-5 sm:p-6">
          {orderSubmitted ? (
            <div className="py-8 text-center max-w-md mx-auto space-y-4">
              <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
                <Check className="w-8 h-8 stroke-[3]" />
              </div>
              <h4 className="text-2xl font-black uppercase text-slate-900">
                EMAIL PRE-FILLED & READY!
              </h4>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Your pre-filled email client was opened with your order summary and contact details. We will reach out to you directly to finalize payment and confirm shipment!
              </p>

              <div className="pt-3 flex flex-col sm:flex-row gap-2 justify-center">
                <button
                  onClick={handleCopyClipboard}
                  className="px-5 py-3 rounded-full border border-slate-300 text-slate-800 font-bold text-xs uppercase hover:bg-slate-50 flex items-center justify-center gap-1.5"
                >
                  {copied ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
                  <span>{copied ? 'Copied!' : 'Copy Order Text'}</span>
                </button>
                <button
                  onClick={() => {
                    setOrderSubmitted(false);
                    onClearCart();
                    onClose();
                  }}
                  className="px-6 py-3 rounded-full bg-[#264BD8] text-white font-extrabold text-xs uppercase tracking-wider hover:bg-[#1E3EB8]"
                >
                  Close Window
                </button>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
              
              {/* Order Summary (5 cols) */}
              <div className="md:col-span-5 border-b md:border-b-0 md:border-r border-slate-200 pb-6 md:pb-0 md:pr-6 flex flex-col justify-between">
                <div>
                  <h4 className="text-xs font-black uppercase tracking-wider text-slate-700 mb-3">
                    Items Selected ({cart.length})
                  </h4>

                  {cart.length === 0 ? (
                    <div className="py-8 text-center text-slate-500 bg-slate-50 rounded-2xl p-4">
                      <ShoppingBag className="w-7 h-7 mx-auto text-slate-400 mb-2" />
                      <p className="text-xs font-semibold">Your cart is currently empty.</p>
                      <div className="mt-3 space-y-1.5 text-left">
                        {PRODUCTS.map((p) => (
                          <button
                            key={p.id}
                            onClick={() => onAddToCart(p, p.variants[0])}
                            className="w-full p-2 rounded-lg bg-white border border-slate-200 hover:border-blue-500 text-xs flex justify-between items-center"
                          >
                            <span className="font-bold text-slate-800 truncate max-w-[140px]">{p.name}</span>
                            <span className="text-[#264BD8] font-bold">${p.price.toLocaleString()}</span>
                          </button>
                        ))}
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-3 max-h-64 overflow-y-auto pr-1">
                      {cart.map((item) => (
                        <div
                          key={`${item.product.id}-${item.selectedVariant}`}
                          className="flex items-center justify-between gap-2 p-2.5 rounded-xl bg-slate-50 border border-slate-200"
                        >
                          <img
                            src={item.product.image}
                            alt={item.product.name}
                            className="w-12 h-12 rounded-lg object-cover border border-slate-200 shrink-0"
                            referrerPolicy="no-referrer"
                          />
                          <div className="flex-1 min-w-0">
                            <h5 className="text-xs font-bold text-slate-900 truncate">
                              {item.product.name}
                            </h5>
                            <p className="text-[10px] text-slate-500 truncate">
                              {item.selectedVariant}
                            </p>
                            <p className="text-xs font-extrabold text-[#264BD8]">
                              ${item.product.price.toLocaleString()}
                            </p>
                          </div>

                          <div className="flex items-center gap-1.5 shrink-0">
                            <div className="flex items-center rounded-md bg-white border border-slate-300">
                              <button
                                onClick={() => onUpdateQuantity(item.product.id, item.selectedVariant, -1)}
                                className="p-1 hover:text-blue-600 text-slate-600"
                              >
                                <Minus className="w-3 h-3" />
                              </button>
                              <span className="px-1.5 text-xs font-bold">{item.quantity}</span>
                              <button
                                onClick={() => onUpdateQuantity(item.product.id, item.selectedVariant, 1)}
                                className="p-1 hover:text-blue-600 text-slate-600"
                              >
                                <Plus className="w-3 h-3" />
                              </button>
                            </div>
                            <button
                              onClick={() => onRemoveItem(item.product.id, item.selectedVariant)}
                              className="p-1 text-slate-400 hover:text-red-600"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {cart.length > 0 && (
                  <div className="pt-4 border-t border-slate-200 mt-4 space-y-1.5 text-xs">
                    <div className="flex justify-between text-slate-600">
                      <span>Subtotal</span>
                      <span className="font-bold text-slate-900">${totalAmount.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between text-slate-600">
                      <span>Shipping</span>
                      <span className="font-bold text-emerald-600">FREE</span>
                    </div>
                    <div className="flex justify-between text-sm font-black text-slate-900 pt-2 border-t border-slate-200">
                      <span>TOTAL:</span>
                      <span className="text-[#264BD8] text-base">${totalAmount.toLocaleString()} USD</span>
                    </div>
                  </div>
                )}
              </div>

              {/* Customer Contact Details Form (7 cols) */}
              <div className="md:col-span-7">
                <h4 className="text-xs font-black uppercase tracking-wider text-slate-700 mb-1">
                  Customer Contact Information
                </h4>
                <p className="text-[11px] text-slate-500 mb-3">
                  Fill in your details below. Clicking the button will open a pre-filled email to our team so we can reach out directly to finalize the transaction.
                </p>

                {errorMsg && (
                  <div className="mb-3 p-2 bg-red-50 border border-red-200 text-red-700 text-xs rounded-lg">
                    {errorMsg}
                  </div>
                )}

                <form onSubmit={handleSendEmail} className="space-y-3">
                  <div>
                    <label className="block text-[10px] uppercase font-bold tracking-wider text-slate-600 mb-0.5">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.fullName}
                      onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                      placeholder="e.g. John Smith"
                      className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-xs text-slate-900 focus:outline-none focus:border-[#264BD8]"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="block text-[10px] uppercase font-bold tracking-wider text-slate-600 mb-0.5">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="john@example.com"
                        className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-xs text-slate-900 focus:outline-none focus:border-[#264BD8]"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] uppercase font-bold tracking-wider text-slate-600 mb-0.5">
                        Phone / WhatsApp *
                      </label>
                      <input
                        type="tel"
                        required
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        placeholder="+1 (555) 000-0000"
                        className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-xs text-slate-900 focus:outline-none focus:border-[#264BD8]"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[10px] uppercase font-bold tracking-wider text-slate-600 mb-0.5">
                      Shipping / Delivery Address *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.shippingAddress}
                      onChange={(e) => setFormData({ ...formData, shippingAddress: e.target.value })}
                      placeholder="Street, City, State/Province, Country, Zip Code"
                      className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-xs text-slate-900 focus:outline-none focus:border-[#264BD8]"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="block text-[10px] uppercase font-bold tracking-wider text-slate-600 mb-0.5">
                        Preferred Contact
                      </label>
                      <select
                        value={formData.preferredContact}
                        onChange={(e) => setFormData({ ...formData, preferredContact: e.target.value as any })}
                        className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-xs text-slate-900 focus:outline-none focus:border-[#264BD8]"
                      >
                        <option value="email">Email</option>
                        <option value="whatsapp">WhatsApp</option>
                        <option value="phone">Phone Call</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-[10px] uppercase font-bold tracking-wider text-slate-600 mb-0.5">
                        Pinjama Size
                      </label>
                      <select
                        value={formData.pyjamaSize}
                        onChange={(e) => setFormData({ ...formData, pyjamaSize: e.target.value })}
                        className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-xs text-slate-900 focus:outline-none focus:border-[#264BD8]"
                      >
                        <option value="S">S (Small)</option>
                        <option value="M">M (Medium)</option>
                        <option value="L (Standard Fit)">L (Standard Fit)</option>
                        <option value="XL">XL (Extra Large)</option>
                        <option value="XXL">XXL (Titan Fit)</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-[10px] uppercase font-bold tracking-wider text-slate-600 mb-0.5">
                      Special Requests / Notes (Optional)
                    </label>
                    <textarea
                      rows={2}
                      value={formData.specialNotes}
                      onChange={(e) => setFormData({ ...formData, specialNotes: e.target.value })}
                      placeholder="Notes on custom cup engraving or superstar schedule..."
                      className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-1.5 text-xs text-slate-900 focus:outline-none focus:border-[#264BD8] resize-none"
                    />
                  </div>

                  <div className="pt-2 space-y-2">
                    <button
                      type="submit"
                      disabled={cart.length === 0}
                      className="w-full py-3.5 rounded-full bg-[#264BD8] hover:bg-[#1E3EB8] text-white font-black text-xs uppercase tracking-widest shadow-md transition-all flex items-center justify-center gap-2 disabled:opacity-50"
                    >
                      <Mail className="w-4 h-4" />
                      <span>GENERATE PRE-FILLED ORDER EMAIL</span>
                    </button>

                    <button
                      type="button"
                      onClick={handleCopyClipboard}
                      disabled={cart.length === 0}
                      className="w-full py-2 rounded-full border border-slate-300 hover:bg-slate-50 text-slate-700 text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-1.5 transition-colors disabled:opacity-40"
                    >
                      {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                      <span>{copied ? 'Order Summary Copied!' : 'Copy Order Summary to Clipboard'}</span>
                    </button>
                  </div>
                </form>
              </div>

            </div>
          )}
        </div>

      </div>
    </div>
  );
}
