import { useState } from "react";
import Topbar from "../components/Topbar";
import Input from "../components/Input";
import Button from "../components/Button";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";
import { api } from "../lib/api";
import { formatCedis } from "../lib/currency";

export default function Checkout() {
  const { items, subtotal, clearCart } = useCart();
  const { user } = useAuth();
  const [customer, setCustomer] = useState({
    name: user?.name || "",
    email: user?.email || "",
    phone: "",
    address: ""
  });
  const [paymentMethod, setPaymentMethod] = useState("momo");
  const [status, setStatus] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    setStatus("");
    try {
      const orderItems = items.map((item) => ({
        productId: item.id,
        quantity: item.quantity
      }));
      await api.createOrder({
        customerInfo: customer,
        items: orderItems,
        paymentMethod
      });
      clearCart();
      setStatus("Order placed successfully");
    } catch (err) {
      setStatus(err.message || "Failed to place order");
    }
  };

  return (
    <div className="space-y-8">
      <Topbar title="Checkout" subtitle="Finalize order" />

      <div className="grid gap-6 lg:grid-cols-[2fr_1fr]">
        <form className="rounded-3xl border border-white/10 bg-white/5 p-6 space-y-4" onSubmit={handleSubmit}>
          <h2 className="text-xl font-semibold text-white">Customer info</h2>
          <Input label="Full name" value={customer.name} onChange={(e) => setCustomer({ ...customer, name: e.target.value })} />
          <Input label="Email" value={customer.email} onChange={(e) => setCustomer({ ...customer, email: e.target.value })} />
          <Input label="Phone" value={customer.phone} onChange={(e) => setCustomer({ ...customer, phone: e.target.value })} />
          <Input label="Delivery address" value={customer.address} onChange={(e) => setCustomer({ ...customer, address: e.target.value })} />

          <label className="flex flex-col gap-2 text-sm text-ink-200/80">
            Payment method
            <select
              className="rounded-2xl border border-white/10 bg-ink-900/80 px-4 py-2 text-white"
              value={paymentMethod}
              onChange={(e) => setPaymentMethod(e.target.value)}
            >
              <option value="momo">MoMo</option>
              <option value="cash">Cash</option>
              <option value="card">Card</option>
            </select>
          </label>

          {status ? <p className="text-xs text-ink-200/70">{status}</p> : null}
          <Button label="Place order" type="submit" />
        </form>

        <div className="rounded-3xl border border-white/10 bg-white/5 p-6 space-y-4">
          <h2 className="text-xl font-semibold text-white">Order summary</h2>
          <div className="space-y-3 text-sm text-ink-200/70">
            {items.map((item) => (
              <div key={item.id} className="flex items-center justify-between">
                <span>{item.name}</span>
                <span>{item.quantity}x</span>
              </div>
            ))}
          </div>
          <div className="border-t border-white/10 pt-4 flex items-center justify-between">
            <p className="text-sm text-ink-200/70">Subtotal</p>
            <p className="text-xl font-semibold text-white">{formatCedis(subtotal)}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
