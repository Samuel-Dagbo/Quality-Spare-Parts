import { useState, useEffect } from "react";
import { Search, User, Phone, CreditCard, ShoppingCart, Trash2, Plus } from "lucide-react";
import Topbar from "../components/Topbar";
import { useAuth } from "../context/AuthContext";
import { api } from "../lib/api";
import Badge from "../components/Badge";
import Button from "../components/Button";

export default function StaffQuickSale() {
  const [products, setProducts] = useState([]);
  const [saleItems, setSaleItems] = useState([]);
  const [customer, setCustomer] = useState({ name: "", phone: "", email: "" });
  const [payment, setPayment] = useState({ method: "cash", reference: "" });
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [status, setStatus] = useState("");
  const [availableProducts, setAvailableProducts] = useState([]);
  const { user } = useAuth();

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    try {
      const { data } = await api.getProducts();
      setProducts(data.data || []);
      setAvailableProducts(data.data || []);
    } catch {
      setAvailableProducts([
        { _id: "1", name: "Brake Pads", sku: "BP001", price: 45, stockQty: 23 },
        { _id: "2", name: "Oil Filter", sku: "OF001", price: 12, stockQty: 67 }
      ]);
    }
  };

  useEffect(() => {
    const filtered = products.filter(p => 
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.sku.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setAvailableProducts(filtered);
  }, [searchQuery, products]);

  const addItem = (product) => {
    const existing = saleItems.find(item => item.productId === product._id);
    if (existing) {
      if (existing.quantity >= product.stockQty) {
        setStatus("Maximum stock reached");
        return;
      }
      setSaleItems(saleItems.map(item => 
        item.productId === product._id 
          ? { ...item, quantity: item.quantity + 1 }
          : item
      ));
    } else {
      setSaleItems([...saleItems, { productId: product._id, quantity: 1, product }]);
    }
    setSearchQuery("");
    setStatus("");
  };

  const updateQuantity = (productId, delta) => {
    setSaleItems(saleItems.map(item => {
      if (item.productId === productId) {
        const newQty = Math.max(1, item.quantity + delta);
        const productStock = products.find(p => p._id === productId)?.stockQty || 0;
        if (newQty > productStock) {
          setStatus("Stock exceeded");
          return item;
        }
        return { ...item, quantity: newQty };
      }
      return item;
    }));
  };

  const removeItem = (productId) => {
    setSaleItems(saleItems.filter(item => item.productId !== productId));
  };

  const getSubTotal = () => {
    return saleItems.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);
  };

  const submitSale = async () => {
    if (!saleItems.length) {
      setStatus("Add at least one item");
      return;
    }
    if (!customer.name.trim()) {
      setStatus("Customer name required");
      return;
    }

    setSubmitting(true);
    try {
      const payload = {
        customerInfo: { ...customer, name: customer.name.trim() },
        items: saleItems.map(item => ({
          productId: item.productId,
          quantity: item.quantity
        })),
        payment
      };
      const { data } = await api.createQuickSale(payload);
      setStatus(`Sale #${data.data._id} completed! Total: $${data.data.grandTotal}`);
      // Reset form
      setSaleItems([]);
      setCustomer({ name: "", phone: "", email: "" });
      setPayment({ method: "cash", reference: "" });
    } catch (error) {
      setStatus(error.message || "Failed to process sale");
    }
    setSubmitting(false);
  };

  const paymentMethods = [
    { value: "cash", label: "Cash", icon: "💵" },
    { value: "mpesa", label: "M-Pesa", icon: "📱" },
    { value: "card", label: "Card", icon: "💳" },
    { value: "bank", label: "Bank Transfer", icon: "🏦" },
    { value: "transfer", label: "Mobile Transfer", icon: "📲" }
  ];

  return (
    <div className="space-y-8">
      <Topbar title="Quick Sale" subtitle="Counter POS - Fast checkout" />
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 space-y-6 lg:space-y-0">
        {/* Customer & Payment */}
        <div className="space-y-6">
          <div className="rounded-3xl border border-white/10 bg-white/5 p-8">
            <h3 className="text-xl font-semibold text-white mb-6 flex items-center gap-3">
              <User className="w-5 h-5" />
              Customer Details
            </h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm text-ink-200/70 mb-2">Name *</label>
                <input
                  className="w-full rounded-2xl border border-white/10 bg-ink-900/50 px-5 py-4 text-lg text-white placeholder-ink-400 focus:border-blue-500 focus:outline-none focus:ring-2 ring-blue-500/50 transition-all min-h-[52px]"
                  placeholder="Enter customer name"
                  value={customer.name}
                  onChange={(e) => setCustomer({...customer, name: e.target.value})}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm text-ink-200/70 mb-2">Phone</label>
                  <input
                    className="w-full rounded-2xl border border-white/10 bg-ink-900/50 px-4 py-3 text-white placeholder-ink-400 focus:border-blue-500 focus:outline-none"
                    placeholder="0800 123 456"
                    value={customer.phone}
                    onChange={(e) => setCustomer({...customer, phone: e.target.value})}
                  />
                </div>
                <div>
                  <label className="block text-sm text-ink-200/70 mb-2">Email</label>
                  <input
                    className="w-full rounded-2xl border border-white/10 bg-ink-900/50 px-4 py-3 text-white placeholder-ink-400 focus:border-blue-500 focus:outline-none"
                    placeholder="customer@example.com"
                    value={customer.email}
                    onChange={(e) => setCustomer({...customer, email: e.target.value})}
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="rounded-3xl border border-white/10 bg-gradient-to-r from-green-500/10 to-blue-500/10 p-8">
            <h3 className="text-xl font-semibold text-white mb-6 flex items-center gap-3">
              <CreditCard className="w-5 h-5" />
              Payment
            </h3>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-3">
                {paymentMethods.map((method) => (
                  <button
                    key={method.value}
                    className={`flex items-center gap-3 rounded-xl p-4 border-2 transition-all group ${
                      payment.method === method.value
                        ? "border-green-400 bg-green-500/20 text-green-300 shadow-lg shadow-green-500/25"
                        : "border-white/20 hover:border-white/40"
                    }`}
                    onClick={() => setPayment({...payment, method: method.value})}
                  >
                    <span className="text-2xl">{method.icon}</span>
                    <div>
                      <div className="font-semibold">{method.label}</div>
                      {payment.method === method.value && (
                        <input
                          className="mt-1 w-full bg-transparent text-xs text-ink-200/70 focus:outline-none"
                          placeholder="Reference #"
                          value={payment.reference}
                          onChange={(e) => setPayment({...payment, reference: e.target.value})}
                        />
                      )}
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Product Search & Sale Items */}
        <div className="space-y-6">
          {/* Search Products */}
          <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
            <div className="relative mb-4">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-ink-400" />
              <input
                className="w-full rounded-3xl border border-white/10 bg-ink-900/50 pl-12 pr-4 py-4 text-white placeholder-ink-400 focus:border-blue-500 focus:outline-none transition-all"
                placeholder="Search brake pads, oil filter, BP001..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div className="max-h-80 overflow-y-auto space-y-2">
              {availableProducts.slice(0, 5).map((product) => (
                <div
                  key={product._id}
                  className="flex cursor-pointer items-center gap-4 rounded-2xl p-4 hover:bg-white/10 transition-all"
                  onClick={() => addItem(product)}
                >
                  <div className="flex w-12 items-center justify-center rounded-xl bg-blue-500/20 text-blue-300">
                    <ShoppingCart className="w-5 h-5" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-white truncate">{product.name}</p>
                    <p className="text-xs text-ink-400">SKU: {product.sku}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-white">${product.price}</p>
                    <p className="text-xs text-green-400">Stock: {product.stockQty}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Sale Items & Total */}
          <div className="space-y-4">
            <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
              <h3 className="text-xl font-semibold text-white mb-4">Sale Items ({saleItems.length})</h3>
              <div className="max-h-96 overflow-y-auto space-y-3">
                {saleItems.map((item) => {
                  const product = item.product;
                  return (
                    <div key={item.productId} className="flex items-center justify-between rounded-2xl bg-ink-900/50 p-4">
                      <div className="flex items-center gap-4">
                        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-500/20">
                          <ShoppingCart className="w-6 h-6 text-blue-300" />
                        </div>
                        <div>
                          <p className="font-semibold text-white">{product.name}</p>
                          <p className="text-xs text-ink-400">{product.sku}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="flex items-center gap-2">
                          <button
                            className="flex h-10 w-10 items-center justify-center rounded-xl bg-ink-800 text-white hover:bg-ink-700"
                            onClick={() => updateQuantity(item.productId, -1)}
                          >
                            -
                          </button>
                          <span className="w-12 text-center font-semibold text-white">{item.quantity}</span>
                          <button
                            className="flex h-10 w-10 items-center justify-center rounded-xl bg-ink-800 text-white hover:bg-ink-700"
                            onClick={() => updateQuantity(item.productId, 1)}
                          >
                            +
                          </button>
                        </div>
                        <div className="text-right">
                          <p className="font-semibold text-white">
                            ${(product.price * item.quantity).toFixed(2)}
                          </p>
                        </div>
                        <button
                          className="flex h-10 w-10 items-center justify-center rounded-xl bg-red-500/20 text-red-400 hover:bg-red-500/40 transition-all"
                          onClick={() => removeItem(item.productId)}
                        >
                          <Trash2 className="w-5 h-5" />
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Total & Submit */}
            <div className="rounded-3xl border border-green-500/30 bg-gradient-to-r from-green-500/10 to-emerald-500/10 p-6">
              <div className="flex items-center justify-between">
                <span className="text-2xl font-semibold text-white">Total</span>
                <Badge text={`$${getSubTotal().toFixed(2)}`} tone="success" size="lg" />
              </div>
              {status && (
                <p className={`mt-4 p-3 rounded-2xl text-sm ${
                  status.includes("completed") || status.includes("Total") 
                    ? "bg-green-500/20 text-green-300 border border-green-500/30" 
                    : "bg-yellow-500/20 text-yellow-300 border border-yellow-500/30"
                }`}>
                  {status}
                </p>
              )}
              <Button 
                className="mt-6 w-full bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white font-semibold py-4 rounded-3xl shadow-xl hover:shadow-2xl transition-all h-14"
                onClick={submitSale}
                loading={submitting}
                size="lg"
              >
                {submitting ? "Processing..." : `Complete Sale - $${getSubTotal().toFixed(2)}`}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

