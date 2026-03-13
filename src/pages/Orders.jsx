import { useEffect, useState } from "react";
import Topbar from "../components/Topbar";
import Badge from "../components/Badge";
import { api } from "../lib/api";
import { sampleOrders } from "../data/mock";
import { useAuth } from "../context/AuthContext";
import { formatCedis } from "../lib/currency";

const statusOptions = ["pending", "confirmed", "shipped", "completed", "cancelled"];

export default function Orders() {
  const [orders, setOrders] = useState([]);
  const [statusMsg, setStatusMsg] = useState("");
  const { user } = useAuth();
  const isAdmin = user?.role === "admin" || user?.role === "staff";

  const loadData = async () => {
    try {
      const data = await api.getOrders();
      setOrders(data.data || []);
    } catch (err) {
      console.error(err);
      setOrders(sampleOrders);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleStatusChange = async (orderId, nextStatus) => {
    setStatusMsg("");
    try {
      await api.updateOrderStatus(orderId, { status: nextStatus });
      await loadData();
      setStatusMsg("Status updated successfully");
    } catch (err) {
      setStatusMsg(err.message || "Failed to update status");
    }
  };

  return (
    <div className="space-y-8">
      <Topbar title="Orders" subtitle="Manage orders" />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2 gap-6 max-w-7xl mx-auto">
        {orders.map((order) => (
          <div key={order._id} className="rounded-3xl border border-white/10 bg-white/5 p-6 hover:border-white/20 hover:shadow-2xl transition-all backdrop-blur-sm">
            {/* Header */}
            <div className="flex items-start justify-between mb-6">
              <div className="flex-1 min-w-0">
                <div className="font-mono text-sm font-bold text-white/90 mb-1">{order._id?.slice(0, 8)}...</div>
                <div className="text-xs text-ink-400">{new Date(order.createdAt).toLocaleString()}</div>
              </div>
              <Badge 
                text={order.status || 'pending'} 
                tone={order.status === 'completed' ? 'success' : order.status === 'shipped' ? 'info' : order.status === 'pending' ? 'warn' : 'gray'} 
              />
            </div>

            {/* Customer Info */}
            <div className="space-y-2 mb-6 p-4 rounded-2xl bg-white/5 border border-white/10">
              <h4 className="text-ink-300 text-sm font-semibold uppercase tracking-wide">Customer</h4>
              <div className="space-y-1">
                <div className="font-bold text-lg text-white truncate">{order.user?.name || order.customerInfo?.name || 'Guest'}</div>
                <div className="text-base text-ink-200">{order.user?.email || order.customerInfo?.email}</div>
                <div className="flex items-center gap-2 text-sm text-ink-300">
                  <span className="font-mono bg-ink-900/70 px-3 py-1.5 rounded-full">📞 {order.user?.phone || order.customerInfo?.phone}</span>
                </div>
              </div>
            </div>

            {/* Items Preview */}
            <div className="space-y-3 mb-6">
              <h4 className="text-ink-300 text-sm font-semibold uppercase tracking-wide flex items-center gap-2">
                Items ({order.items?.length || 0})
              </h4>
              <div className="grid grid-cols-2 gap-3 max-h-48 overflow-y-auto -mx-1 px-1">
                {order.items?.slice(0, 6).map((item, i) => (
                  <div key={i} className="group bg-white/5 rounded-xl p-3 border border-white/10 hover:border-white/20 transition">
                    {item.product?.images?.[0] && (
                      <img 
                        src={item.product.images[0]} 
                        alt={item.name} 
                        className="w-full h-20 md:h-24 object-cover rounded-lg mb-2 shadow-lg" 
                      />
                    )}
                    <div className="space-y-1">
                      <p className="font-semibold text-sm line-clamp-2 text-white">{item.name}</p>
                      <p className="text-xs text-ink-300">Qty: {item.quantity}</p>
                      <p className="font-bold text-ink-100">${item.price * item.quantity}</p>
                    </div>
                  </div>
                ))}
              </div>
              {order.items?.length > 6 && (
                <div className="text-center text-ink-400 text-sm py-3 bg-white/5 rounded-xl">
                  +{order.items.length - 6} more items
                </div>
              )}
            </div>

            {/* Footer */}
            <div className="flex items-center justify-between pt-6 border-t border-white/10">
              <div>
                <p className="text-sm text-ink-400">Grand Total</p>
                <p className="text-2xl font-bold text-white">{formatCedis(order.grandTotal || 0)}</p>
              </div>
              {isAdmin && (
                <select
                  className="rounded-2xl border border-white/20 bg-white px-4 py-2 font-semibold text-sm shadow-lg hover:shadow-xl transition-all"
                  value={order.status || 'pending'}
                  onChange={(e) => handleStatusChange(order._id, e.target.value)}
                >
                  {statusOptions.map((opt) => (
                    <option key={opt} value={opt}>{opt.charAt(0).toUpperCase() + opt.slice(1)}</option>
                  ))}
                </select>
              )}
            </div>
          </div>
        ))}
      </div>

      {statusMsg && (
        <div className="p-4 rounded-3xl bg-ink-900/50 border border-ink-700 text-center text-sm text-ink-200/80">
          {statusMsg}
        </div>
      )}
      
      {orders.length === 0 && (
        <div className="text-center py-20">
          <div className="text-ink-400 text-lg mb-4">No orders yet</div>
          <p className="text-ink-500 text-sm">Orders will appear here when customers place them.</p>
        </div>
      )}
    </div>
  );
}
