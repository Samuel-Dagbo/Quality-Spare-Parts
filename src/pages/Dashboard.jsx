import { useEffect, useState } from "react";
import { api } from "../lib/api";
import Topbar from "../components/Topbar";
import StatCard from "../components/StatCard";
import Badge from "../components/Badge";
import { highlights, sampleOrders } from "../data/mock";

export default function Dashboard() {
  const [stats, setStats] = useState(null);

  useEffect(() => {
    api
      .getDashboard()
      .then((data) => setStats(data.data))
      .catch(() => {
        setStats({
          productCount: 248,
          userCount: 62,
          orderCount: 318,
          pendingOrders: 12,
          lowStockCount: 9,
          revenue: 82340
        });
      });
  }, []);

  return (
    <div className="space-y-8">
      <Topbar title="Control Center" subtitle="Realtime snapshot" />

      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {highlights.map((item) => (
          <StatCard key={item.label} label={item.label} value={item.value} delta={item.delta} />
        ))}
      </section>

      <section className="grid gap-6 lg:grid-cols-[2fr_1fr]">
        <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-ink-200/70">KPIs</p>
              <h2 className="text-xl font-semibold text-white">Business Pulse</h2>
            </div>
            <Badge text="Last 24h" tone="neutral" />
          </div>
          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            <StatCard label="Products" value={stats?.productCount ?? "--"} delta="+8" />
            <StatCard label="Orders" value={stats?.orderCount ?? "--"} delta="+12" />
            <StatCard label="Revenue" value={`$${stats?.revenue ?? "--"}`} delta="+6.4%" />
            <StatCard label="Low Stock" value={stats?.lowStockCount ?? "--"} delta="Alert" />
          </div>
        </div>

        <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-ink-200/70">Operational</p>
              <h2 className="text-xl font-semibold text-white">Latest Orders</h2>
            </div>
            <Badge text={`${stats?.pendingOrders ?? 0} pending`} tone="warn" />
          </div>
          <div className="mt-5 space-y-4">
            {sampleOrders.map((order) => (
              <div key={order.id} className="rounded-2xl border border-white/10 bg-ink-900/60 p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-white font-semibold">{order.id}</p>
                    <p className="text-xs text-ink-200/70">{order.customer}</p>
                  </div>
                  <Badge text={order.status} tone="success" />
                </div>
                <div className="mt-3 flex items-center justify-between text-xs text-ink-200/70">
                  <span>{order.date}</span>
                  <span>{order.total}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
