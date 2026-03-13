import { useEffect, useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar
} from "recharts";
import Topbar from "../components/Topbar";
import Badge from "../components/Badge";
import { api } from "../lib/api";
import { formatCedis } from "../lib/currency";

export default function Analytics() {
  const [data, setData] = useState(null);

  useEffect(() => {
    api
      .getAnalytics()
      .then((payload) => setData(payload.data))
      .catch(() => setData(null));
  }, []);

  return (
    <div className="space-y-8">
      <Topbar title="Analytics" subtitle="Business intelligence" />

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <div className="rounded-3xl border border-white/10 bg-white/5 p-5">
          <p className="text-xs text-ink-200/70">Revenue</p>
          <p className="text-2xl font-semibold text-white">{formatCedis(data?.revenue || 0)}</p>
        </div>
        <div className="rounded-3xl border border-white/10 bg-white/5 p-5">
          <p className="text-xs text-ink-200/70">Profit</p>
          <p className="text-2xl font-semibold text-white">{formatCedis(data?.profit || 0)}</p>
        </div>
        <div className="rounded-3xl border border-white/10 bg-white/5 p-5">
          <p className="text-xs text-ink-200/70">Inventory value</p>
          <p className="text-2xl font-semibold text-white">{formatCedis(data?.inventoryValue || 0)}</p>
        </div>
        <div className="rounded-3xl border border-white/10 bg-white/5 p-5">
          <p className="text-xs text-ink-200/70">Low stock</p>
          <p className="text-2xl font-semibold text-white">{data?.lowStock?.length || 0}</p>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-white">Daily sales</h2>
            <Badge text="Last 30 days" />
          </div>
          <div className="mt-4 h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={data?.dailySales || []}>
                <XAxis dataKey="date" stroke="#94a3b8" />
                <YAxis stroke="#94a3b8" />
                <Tooltip />
                <Line type="monotone" dataKey="total" stroke="#22d3ee" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-white">Monthly sales</h2>
            <Badge text="Year to date" />
          </div>
          <div className="mt-4 h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data?.monthlySales || []}>
                <XAxis dataKey="period" stroke="#94a3b8" />
                <YAxis stroke="#94a3b8" />
                <Tooltip />
                <Bar dataKey="total" fill="#f97316" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
          <h2 className="text-lg font-semibold text-white">Best selling products</h2>
          <div className="mt-4 space-y-3 text-sm text-ink-200/70">
            {(data?.bestSelling || []).map((item) => (
              <div key={item.productId} className="flex items-center justify-between">
                <span>{item.productId}</span>
                <span>{item.qty}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
          <h2 className="text-lg font-semibold text-white">Most active customers</h2>
          <div className="mt-4 space-y-3 text-sm text-ink-200/70">
            {(data?.mostActiveCustomers || []).map((item) => (
              <div key={item.customer} className="flex items-center justify-between">
                <span>{item.customer}</span>
                <span>{item.count}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
