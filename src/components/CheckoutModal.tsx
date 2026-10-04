import { useState } from 'react';
import { CartItem, CustomerOrderForm } from '../types';
import { X, Mail, Check, Copy, ShieldCheck, ShoppingBag, ArrowLeft, Clock } from 'lucide-react';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  cart: CartItem[];
  onClearCart: () => void;
}

export function CheckoutModal({ isOpen, onClose, cart, onClearCart }: CheckoutModalProps) {
  const [formData, setFormData] = useState<CustomerOrderForm>({
    fullName: '',
    email: '',
    phone: '',
    shippingAddress: '',
    pyjamaSize: 'L (Standard Fit)',
    specialNotes: '',
  });

  const [orderSubmitted, setOrderSubmitted] = useState(false);
  const [orderReferenceId, setOrderReferenceId] = useState('');
  const [orderDate, setOrderDate] = useState('');
  const [copied, setCopied] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  if (!isOpen) return null;

  const totalAmount = cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);

  const generateOrderText = (orderId: string, timestamp: string) => {
    const itemsList = cart
      .map(
        (item, idx) =>
          `${idx + 1}. ${item.product.name} [${item.selectedVariant}] (Size: ${item.selectedSize}) x ${item.quantity} = $${(
            item.product.price * item.quantity
          ).toLocaleString()} USD`
      )
      .join('\n');

    return `THANE RIVERS OFFICIAL LUXURY STORE ORDER REQUEST
==================================================
ORDER REFERENCE ID: ${orderId}
DATE: ${timestamp}
STATUS: Pending Concierge Outreach & Final Transaction Confirmation
==================================================

CUSTOMER CONTACT INFORMATION:
--------------------------------------------------
Full Name: ${formData.fullName}
Email Address: ${formData.email}
Phone / WhatsApp Number: ${formData.phone}
Shipping & Delivery Address: ${formData.shippingAddress}
Pyjama Size Confirmation: ${formData.pyjamaSize}
Special Instructions / Concierge Notes: ${formData.specialNotes || 'None'}

ITEMIZED ORDER SUMMARY:
--------------------------------------------------
${itemsList}

--------------------------------------------------
SUBTOTAL: $${totalAmount.toLocaleString()} USD
INSURED WORLDWIDE DELIVERY: FREE (Complimentary DHL Express Priority)
TOTAL ORDER VALUE: $${totalAmount.toLocaleString()} USD
==================================================

CLIENT CONCIERGE ROUTING:
Official Dispatch Desk: order@thaneriver.shop
Customer Support Desk: support@thaneriver.shop
Thank you for shopping at Thane Rivers. Our concierge will be in touch shortly.`;
  };

  const handleSubmitOrder = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.fullName.trim() || !formData.email.trim() || !formData.phone.trim() || !formData.shippingAddress.trim()) {
      setErrorMessage('Please complete all required fields (Name, Email, Phone, Shipping Address).');
      return;
    }
    setErrorMessage('');

    const newOrderId = `TR-2026-${Math.floor(10000 + Math.random() * 90000)}`;
    const newTimestamp = new Date().toLocaleString('en-US', {
      timeZone: 'UTC',
      dateStyle: 'medium',
      timeStyle: 'short',
    }) + ' UTC';

    setOrderReferenceId(newOrderId);
    setOrderDate(newTimestamp);

    const orderText = generateOrderText(newOrderId, newTimestamp);
    const subject = encodeURIComponent(`Official Order Request: ${newOrderId} - ${formData.fullName}`);
    const body = encodeURIComponent(orderText);

    // Official order dispatch email routed directly to order@thaneriver.shop
    const mailtoUrl = `mailto:order@thaneriver.shop?subject=${subject}&body=${body}`;

    window.location.href = mailtoUrl;
    setOrderSubmitted(true);
  };

  const handleCopyOrderSummary = () => {
    const text = generateOrderText(orderReferenceId, orderDate);
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 3000);
  };

  const handleFinish = () => {
    onClearCart();
    setOrderSubmitted(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 overflow-y-auto animate-in fade-in duration-200">
      {/* Backdrop */}
      <div className="fixed inset-0 bg-black/65 backdrop-blur-xs" onClick={onClose} />

      {/* Modal Card */}
      <div className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl text-slate-900 overflow-hidden my-auto max-h-[92vh] flex flex-col z-10 border border-slate-200">
        
        {/* Header */}
        <div className="p-4 sm:p-5 bg-[#233EB6] text-white flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <ShieldCheck className="w-5 h-5 text-amber-300" />
            <h3 className="font-sans font-black text-sm sm:text-base tracking-wider uppercase">
              {orderSubmitted ? 'Official Order Confirmation' : 'Concierge Checkout & Delivery Form'}
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full text-white/80 hover:text-white hover:bg-white/10 transition-colors"
            aria-label="Close modal"
          >
            <X className="w-5 h-5 stroke-[2.5]" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="flex-1 overflow-y-auto p-5 sm:p-7">
          {orderSubmitted ? (
            /* Instant Order Confirmation Screen */
            <div className="space-y-6 text-center max-w-lg mx-auto py-2">
              <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-inner">
                <Check className="w-9 h-9 stroke-[3]" />
              </div>

              <div>
                <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#233EB6] block mb-1">
                  Thank You For Your Order
                </span>
                <h4 className="text-2xl sm:text-3xl font-black uppercase text-slate-950">
                  Order Dispatched Successfully
                </h4>
                <p className="text-xs sm:text-sm text-slate-600 mt-2 leading-relaxed">
                  Your official order email has been prepared and formatted for dispatch directly to{' '}
                  <strong className="text-slate-900 font-bold">order@thaneriver.shop</strong>.
                </p>
              </div>

              {/* Order Reference ID Pill */}
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-left space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">
                    Official Reference ID
                  </span>
                  <span className="text-[11px] text-slate-500 font-medium">{orderDate}</span>
                </div>
                <div className="text-xl font-black font-mono text-[#233EB6] tracking-wider">
                  {orderReferenceId}
                </div>
                <div className="pt-2 border-t border-slate-200/80 flex items-center justify-between text-xs font-semibold text-slate-700">
                  <span>Investment Total:</span>
                  <span className="text-slate-950 font-bold font-mono">${totalAmount.toLocaleString()} USD</span>
                </div>
              </div>

              {/* Delivery Expectations */}
              <div className="p-4 rounded-2xl bg-blue-50/70 border border-blue-100 text-left text-xs space-y-2">
                <h5 className="font-black text-[#233EB6] uppercase flex items-center gap-1.5 tracking-wider text-[11px]">
                  <Clock className="w-3.5 h-3.5" />
                  White-Glove Delivery Expectations
                </h5>
                <ul className="space-y-1.5 text-slate-600 text-[11px] pl-1">
                  <li>• A personal VIP concierge will contact you within 2 hours to confirm measurements and dispatch details.</li>
                  <li>• Insured international transport via DHL Express Priority with active GPS tracking.</li>
                  <li>• For immediate concierge assistance, reach us at <a href="mailto:support@thaneriver.shop" className="text-[#233EB6] font-bold hover:underline">support@thaneriver.shop</a>.</li>
                </ul>
              </div>

              {/* Actions */}
              <div className="pt-2 flex flex-col sm:flex-row gap-2.5 justify-center">
                <button
                  onClick={handleCopyOrderSummary}
                  className="px-5 py-3 rounded-full border border-slate-300 text-slate-800 font-bold text-xs uppercase hover:bg-slate-50 flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                >
                  {copied ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
                  <span>{copied ? 'Copied to Clipboard!' : 'Copy Order Summary'}</span>
                </button>

                <button
                  onClick={handleFinish}
                  className="px-6 py-3 rounded-full bg-[#233EB6] text-white font-black text-xs uppercase tracking-wider hover:bg-[#182B7A] transition-colors cursor-pointer shadow-md"
                >
                  Complete & Return to Store
                </button>
              </div>
            </div>
          ) : (
            /* Personal Information Form */
            <div>
              {/* Top Order Summary Recap */}
              <div className="mb-6 p-4 rounded-2xl bg-slate-50 border border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider block">
                    Order Summary ({cart.length} item{cart.length > 1 ? 's' : ''})
                  </span>
                  <div className="text-xs font-bold text-slate-800 mt-0.5">
                    {cart.map((c) => `${c.product.name} (x${c.quantity})`).join(', ')}
                  </div>
                </div>
                <div className="sm:text-right shrink-0">
                  <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider block">
                    Total Investment
                  </span>
                  <span className="text-lg font-black font-mono text-[#233EB6]">
                    ${totalAmount.toLocaleString()} USD
                  </span>
                </div>
              </div>

              {errorMessage && (
                <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-700 text-xs rounded-xl font-medium">
                  {errorMessage}
                </div>
              )}

              {/* Customer Information Form */}
              <form onSubmit={handleSubmitOrder} className="space-y-4">
                <div>
                  <label className="block text-[10px] uppercase font-bold tracking-wider text-slate-600 mb-1">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    placeholder="e.g. Lord Alexander Thorne"
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 focus:outline-none focus:border-[#233EB6] focus:bg-white"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[10px] uppercase font-bold tracking-wider text-slate-600 mb-1">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="alexander@domain.com"
                      className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 focus:outline-none focus:border-[#233EB6] focus:bg-white"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] uppercase font-bold tracking-wider text-slate-600 mb-1">
                      Phone / WhatsApp Number *
                    </label>
                    <input
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="+1 (555) 234-5678"
                      className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 focus:outline-none focus:border-[#233EB6] focus:bg-white"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[10px] uppercase font-bold tracking-wider text-slate-600 mb-1">
                    Shipping & Delivery Address *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.shippingAddress}
                    onChange={(e) => setFormData({ ...formData, shippingAddress: e.target.value })}
                    placeholder="Villa 14, Royal Palm Way, Oslo, Norway / New York, USA"
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 focus:outline-none focus:border-[#233EB6] focus:bg-white"
                  />
                </div>

                <div>
                  <label className="block text-[10px] uppercase font-bold tracking-wider text-slate-600 mb-1">
                    Pyjama Size Confirmation *
                  </label>
                  <select
                    value={formData.pyjamaSize}
                    onChange={(e) => setFormData({ ...formData, pyjamaSize: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 focus:outline-none focus:border-[#233EB6] focus:bg-white cursor-pointer"
                  >
                    <option value="S">S (Small - 36-38" Chest)</option>
                    <option value="M">M (Medium - 39-41" Chest)</option>
                    <option value="L (Standard Fit)">L (Standard Fit - 42-44" Chest)</option>
                    <option value="XL">XL (Extra Large - 45-47" Chest)</option>
                    <option value="XXL">XXL (Titan Fit - 48-52" Chest)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[10px] uppercase font-bold tracking-wider text-slate-600 mb-1">
                    Special Instructions / Concierge Notes (Optional)
                  </label>
                  <textarea
                    rows={2}
                    value={formData.specialNotes}
                    onChange={(e) => setFormData({ ...formData, specialNotes: e.target.value })}
                    placeholder="Private delivery instructions, custom ceramic engraving initials, or schedule notes..."
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2 text-xs text-slate-900 focus:outline-none focus:border-[#233EB6] focus:bg-white resize-none"
                  />
                </div>

                <div className="pt-3 space-y-2.5">
                  <button
                    type="submit"
                    className="w-full py-4 rounded-full bg-[#233EB6] hover:bg-[#182B7A] text-white font-black text-xs uppercase tracking-widest shadow-xl transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-98"
                  >
                    <Mail className="w-4 h-4" />
                    <span>DISPATCH ORDER TO ORDER@THANERIVER.SHOP</span>
                  </button>

                  <p className="text-[10px] text-center text-slate-500 font-medium">
                    All support and inquiries routed to:{' '}
                    <a href="mailto:support@thaneriver.shop" className="text-[#233EB6] font-bold hover:underline">
                      support@thaneriver.shop
                    </a>
                  </p>
                </div>
              </form>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
