import { useEffect, useState } from "react";
import Topbar from "../components/Topbar";
import Button from "../components/Button";
import Badge from "../components/Badge";
import { api } from "../lib/api";

export default function InventoryAdjustments() {
  const [adjustments, setAdjustments] = useState([]);
  const [products, setProducts] = useState([]);
  const [lowStock, setLowStock] = useState([]);
  const [form, setForm] = useState({ product: "", type: "in", quantity: "", reason: "" });
  const [status, setStatus] = useState("");

  const loadData = async () => {
    const [adjData, productData, lowStockData] = await Promise.all([
      api.getInventoryAdjustments(),
      api.getProducts("?limit=100"),
      api.getLowStock()
    ]);
    setAdjustments(adjData.data || []);
    setProducts(productData.data || []);
    setLowStock(lowStockData.data || []);
  };

  useEffect(() => {
    loadData().catch(() => setStatus("Failed to load inventory data"));
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setStatus("");
    try {
      await api.createInventoryAdjustment({
        product: form.product,
        type: form.type,
        quantity: Number(form.quantity),
        reason: form.reason
      });
      setForm({ product: "", type: "in", quantity: "", reason: "" });
      await loadData();
    } catch (err) {
      setStatus(err.message || "Failed to save adjustment");
    }
  };

  return (
    <div className="space-y-8">
      <Topbar title="Inventory Adjustments" subtitle="Admin control" />

      <div className="grid gap-6 lg:grid-cols-[2fr_1fr]">
        <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold text-white">Latest adjustments</h2>
            <Badge text={`${adjustments.length} records`} />
          </div>
          <div className="mt-4 space-y-3">
            {adjustments.map((item) => (
              <div
                key={item._id}
                className="flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-white/10 bg-ink-900/70 p-4"
              >
                <div>
                  <p className="text-white font-semibold">{item.product?.name || "Product"}</p>
                  <p className="text-xs text-ink-200/70">{new Date(item.createdAt).toDateString()}</p>
                </div>
                <div className="text-sm text-ink-200/70">
                  {item.type.toUpperCase()} · Qty {item.quantity}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-6">
          <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
            <h2 className="text-xl font-semibold text-white">New adjustment</h2>
            <form className="mt-4 space-y-4" onSubmit={handleSubmit}>
              <label className="flex flex-col gap-2 text-sm text-ink-200/80">
                Product
                <select
                  className="rounded-2xl border border-white/10 bg-ink-900/80 px-4 py-2 text-white"
                  value={form.product}
                  onChange={(e) => setForm({ ...form, product: e.target.value })}
                >
                  <option value="">Select product</option>
                  {products.map((product) => (
                    <option key={product._id} value={product._id}>
                      {product.name}
                    </option>
                  ))}
                </select>
              </label>
              <label className="flex flex-col gap-2 text-sm text-ink-200/80">
                Type
                <select
                  className="rounded-2xl border border-white/10 bg-ink-900/80 px-4 py-2 text-white"
                  value={form.type}
                  onChange={(e) => setForm({ ...form, type: e.target.value })}
                >
                  <option value="in">Stock in</option>
                  <option value="out">Stock out</option>
                  <option value="adjust">Set stock</option>
                </select>
              </label>
              <label className="flex flex-col gap-2 text-sm text-ink-200/80">
                Quantity
                <input
                  type="number"
                  className="rounded-2xl border border-white/10 bg-ink-900/80 px-4 py-2 text-white"
                  value={form.quantity}
                  onChange={(e) => setForm({ ...form, quantity: e.target.value })}
                />
              </label>
              <label className="flex flex-col gap-2 text-sm text-ink-200/80">
                Reason
                <input
                  className="rounded-2xl border border-white/10 bg-ink-900/80 px-4 py-2 text-white"
                  value={form.reason}
                  onChange={(e) => setForm({ ...form, reason: e.target.value })}
                />
              </label>
              {status ? <p className="text-xs text-ink-200/70">{status}</p> : null}
              <Button label="Save adjustment" type="submit" />
            </form>
          </div>

          <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold text-white">Low stock</h2>
              <Badge text={`${lowStock.length} alerts`} tone="warn" />
            </div>
            <div className="mt-4 space-y-3">
              {lowStock.map((item) => (
                <div key={item._id} className="flex items-center justify-between text-sm">
                  <span>{item.name}</span>
                  <span className="text-ember-400">{item.stockQty}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
