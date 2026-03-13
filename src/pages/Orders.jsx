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
  const [status, setStatus] = useState("");
  const { user } = useAuth();
  const isAdmin = user?.role === "admin" || user?.role === "staff";

  const loadData = async () => {
    const data = await api.getOrders();
    setOrders(data.data || []);
  };

  useEffect(() => {
    loadData().catch(() => setOrders(sampleOrders));
  }, []);

  const handleStatusChange = async (orderId, nextStatus) => {
    setStatus("");
    try {
      await api.updateOrderStatus(orderId, { status: nextStatus });
      await loadData();
    } catch (err) {
      setStatus(err.message || "Failed to update status");
    }
  };

  return (
    <div className="space-y-8">
      <Topbar title="Orders" subtitle="Commerce operations" />

      <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-ink-200/70">Order flow</p>
            <h2 className="text-xl font-semibold text-white">Recent activity</h2>
          </div>
          <Badge text="Synced" tone="success" />
        </div>

        {status ? <p className="mt-3 text-xs text-ink-200/70">{status}</p> : null}

        <div className="mt-6 space-y-4">
          {orders.map((order) => (
            <div key={order.id || order._id} className="rounded-2xl border border-white/10 bg-ink-900/70 p-4">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div>
                  <p className="text-white font-semibold">{order.id || order._id}</p>
                  <p className="text-xs text-ink-200/70">
                    {order.customer || order.customerInfo?.name || "Customer"}
                  </p>
                </div>
                <Badge text={order.status || "Pending"} tone="warn" />
              </div>
              <div className="mt-3 flex flex-wrap items-center justify-between gap-3 text-xs text-ink-200/70">
                <span>{order.date || new Date(order.createdAt || Date.now()).toDateString()}</span>
                <span>
                  {order.total
                    ? order.total
                    : formatCedis(order.grandTotal ?? 0)}
                </span>
                {isAdmin && order._id ? (
                  <select
                    className="rounded-2xl border border-white/10 bg-ink-900/80 px-3 py-2 text-xs text-white"
                    value={order.status}
                    onChange={(e) => handleStatusChange(order._id, e.target.value)}
                  >
                    {statusOptions.map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                ) : null}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
