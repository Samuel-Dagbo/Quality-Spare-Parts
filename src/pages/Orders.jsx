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

      <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-ink-200/70">Order management</p>
            <h2 className="text-xl font-semibold text-white">All Orders</h2>
          </div>
          <Badge text="Live data" tone="success" />
        </div>

        {statusMsg && <p className="p-3 rounded-xl bg-ink-900/50 text-xs text-ink-200/70">{statusMsg}</p>}

        <div className="overflow-x-auto mt-6">
          <table className="min-w-full divide-y divide-white/10">
            <thead className="bg-white/5">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-bold text-ink-200 uppercase tracking-wider">ID / Date</th>
                <th className="px-6 py-4 text-left text-xs font-bold text-ink-200 uppercase tracking-wider">Customer</th>
                <th className="px-6 py-4 text-left text-xs font-bold text-ink-200 uppercase tracking-wider">Items</th>
                <th className="px-6 py-4 text-right text-xs font-bold text-ink-200 uppercase tracking-wider">Total</th>
                <th className="px-6 py-4 text-center text-xs font-bold text-ink-200 uppercase tracking-wider">Status</th>
                {isAdmin && <th className="px-6 py-4 text-center text-xs font-bold text-ink-200 uppercase tracking-wider">Action</th>}
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {orders.map((order) => (
                <tr key={order._id} className="hover:bg-white/5 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="font-mono text-sm font-bold text-white/90">{order._id?.slice(0, 8)}...</div>
                    <div className="text-xs text-ink-300 mt-1">{new Date(order.createdAt).toLocaleString()}</div>
                  </td>
                  <td className="px-6 py-4">
                    <div>
                      <div className="font-medium text-white">{order.user?.name || order.customerInfo?.name || 'Guest'}</div>
                      <div className="text-sm text-ink-300">{order.user?.email || order.customerInfo?.email}</div>
                      <div className="text-xs text-ink-400">{order.customerInfo?.phone}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="space-y-1">
                      {order.items?.slice(0, 2).map((item, i) => (
                        <div key={i} className="flex items-center gap-2 text-sm">
                          {item.product?.images?.[0] && (
                            <img 
                              src={item.product.images[0]} 
                              alt="" 
                              className="w-8 h-8 rounded object-cover bg-white/10 border border-white/20" 
                            />
                          )}
                          <span>{item.name} ({item.quantity}x)</span>
                        </div>
                      ))}
                      {order.items?.length > 2 && (
                        <div className="text-xs text-ink-400">+{order.items.length - 2} more items</div>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="text-2xl font-bold text-white">{formatCedis(order.grandTotal || 0)}</div>
                  </td>
                  <td className="px-6 py-4">
                    <Badge 
                      text={order.status || 'pending'} 
                      tone={order.status === 'completed' ? 'success' : order.status === 'shipped' ? 'info' : order.status === 'pending' ? 'warn' : 'gray'} 
                    />
                  </td>
                  {isAdmin && (
                    <td className="px-6 py-4 text-center">
                      <select
                        className="rounded-xl border border-white/20 bg-black/30 px-3 py-2 text-sm text-white backdrop-blur-sm hover:border-white/40 transition-all"
                        value={order.status || 'pending'}
                        onChange={(e) => handleStatusChange(order._id, e.target.value)}
                      >
                        {statusOptions.map((opt) => (
                          <option key={opt} value={opt}>{opt.toUpperCase()}</option>
                        ))}
                      </select>
                    </td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {orders.length === 0 && (
          <div className="text-center py-12 text-ink-400">
            No orders found.
          </div>
        )}
      </div>
    </div>
  );
}
