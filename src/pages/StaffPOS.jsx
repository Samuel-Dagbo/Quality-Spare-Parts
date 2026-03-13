import { useEffect, useState } from "react";
import Topbar from "../components/Topbar";
import Button from "../components/Button";
import Input from "../components/Input";
import { api } from "../lib/api";
import { formatCedis } from "../lib/currency";

export default function StaffPOS() {
  const [products, setProducts] = useState([]);
  const [items, setItems] = useState([{ productId: "", quantity: 1 }]);
  const [customerName, setCustomerName] = useState("");
  const [customerContact, setCustomerContact] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("cash");
  const [status, setStatus] = useState("");

  useEffect(() => {
    api
      .getProducts("?limit=100")
      .then((data) => setProducts(data.data || []))
      .catch(() => setProducts([]));
  }, []);

  const addRow = () => setItems((prev) => [...prev, { productId: "", quantity: 1 }]);

  const updateItem = (index, key, value) => {
    setItems((prev) => prev.map((item, i) => (i === index ? { ...item, [key]: value } : item)));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setStatus("");
    try {
      await api.createSale({ customerName, customerContact, paymentMethod, items });
      setItems([{ productId: "", quantity: 1 }]);
      setCustomerName("");
      setCustomerContact("");
      setPaymentMethod("cash");
      setStatus("Sale recorded successfully");
    } catch (err) {
      setStatus(err.message || "Failed to record sale");
    }
  };

  const totalAmount = items.reduce((sum, item) => {
    const product = products.find((p) => p._id === item.productId);
    if (!product) return sum;
    return sum + (product.price || 0) * Number(item.quantity || 0);
  }, 0);

  return (
    <div className="space-y-8">
      <Topbar title="Point of Sale" subtitle="Record in-store sales" />

      <form className="rounded-3xl border border-white/10 bg-white/5 p-6 space-y-4" onSubmit={handleSubmit}>
        <div className="grid gap-4 md:grid-cols-2">
          <Input label="Customer name" value={customerName} onChange={(e) => setCustomerName(e.target.value)} />
          <Input
            label="Customer contact"
            value={customerContact}
            onChange={(e) => setCustomerContact(e.target.value)}
          />
        </div>

        <label className="flex flex-col gap-2 text-sm text-ink-200/80">
          Payment method
          <select
            className="rounded-2xl border border-white/10 bg-ink-900/80 px-4 py-2 text-white"
            value={paymentMethod}
            onChange={(e) => setPaymentMethod(e.target.value)}
          >
            <option value="cash">Cash</option>
            <option value="momo">MoMo</option>
            <option value="card">Card</option>
          </select>
        </label>

        <div className="space-y-3">
          {items.map((item, index) => (
            <div key={index} className="grid gap-3 md:grid-cols-[2fr_1fr]">
              <select
                className="rounded-2xl border border-white/10 bg-ink-900/80 px-4 py-2 text-white"
                value={item.productId}
                onChange={(e) => updateItem(index, "productId", e.target.value)}
              >
                <option value="">Select product</option>
                {products.map((product) => (
                  <option key={product._id} value={product._id}>
                    {product.name}
                  </option>
                ))}
              </select>
              <input
                type="number"
                min={1}
                className="rounded-2xl border border-white/10 bg-ink-900/80 px-4 py-2 text-white"
                value={item.quantity}
                onChange={(e) => updateItem(index, "quantity", e.target.value)}
              />
            </div>
          ))}
          <button
            type="button"
            className="rounded-2xl border border-white/10 px-3 py-2 text-xs text-ink-200/70"
            onClick={addRow}
          >
            Add item
          </button>
        </div>

        <div className="flex items-center justify-between border-t border-white/10 pt-4">
          <p className="text-sm text-ink-200/70">Total</p>
          <p className="text-xl font-semibold text-white">{formatCedis(totalAmount)}</p>
        </div>

        {status ? <p className="text-xs text-ink-200/70">{status}</p> : null}
        <Button label="Record sale" type="submit" />
      </form>
    </div>
  );
}
