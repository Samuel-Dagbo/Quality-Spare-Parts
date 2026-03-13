import { useEffect, useState } from "react";
import Topbar from "../components/Topbar";
import Button from "../components/Button";
import { api } from "../lib/api";
import { formatCedis } from "../lib/currency";

const mockCart = {
  items: [
    { product: { name: "Ceramic Brake Pads" }, quantity: 2, priceSnapshot: 68 },
    { product: { name: "Premium Oil Filter" }, quantity: 4, priceSnapshot: 18 }
  ],
  subTotal: 208
};

export default function Cart() {
  const [cart, setCart] = useState(mockCart);

  useEffect(() => {
    api
      .getCart()
      .then((data) => setCart(data.data))
      .catch(() => setCart(mockCart));
  }, []);

  return (
    <div className="space-y-8">
      <Topbar title="Cart" subtitle="Customer checkout" />

      <div className="rounded-3xl border border-white/10 bg-white/5 p-6 space-y-4">
        {cart.items.map((item, index) => (
          <div key={`${item.product?.name}-${index}`} className="flex items-center justify-between">
            <div>
              <p className="text-white font-semibold">{item.product?.name}</p>
              <p className="text-xs text-ink-200/70">Qty: {item.quantity}</p>
            </div>
            <p className="text-white">{formatCedis(item.priceSnapshot * item.quantity)}</p>
          </div>
        ))}

        <div className="border-t border-white/10 pt-4 flex items-center justify-between">
          <p className="text-sm text-ink-200/70">Subtotal</p>
          <p className="text-xl font-semibold text-white">{formatCedis(cart.subTotal)}</p>
        </div>

        <Button label="Proceed to checkout" />
      </div>
    </div>
  );
}
