import { useState, useEffect } from "react";
import Topbar from "../components/Topbar";
import StatCard from "../components/StatCard";
import Badge from "../components/Badge";
import DbStatus from "../components/DbStatus";
import Chart from "../components/Chart";
import SalesTable from "../components/SalesTable";
import { api } from "../lib/api";
import { useAuth } from "../context/AuthContext";

export default function StaffDashboard() {
  const { user } = useAuth();
  const [stats, setStats] = useState(null);
  const [reports, setReports] = useState(null);
  const [period, setPeriod] = useState("today");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadData();
  }, [period]);

  const loadData = async () => {
    setLoading(true);
    try {
      const [statsRes, reportsRes] = await Promise.all([
        api.getDashboard(),
        api.getDashboardReports({ period })
      ]);
      setStats(statsRes.data);
      setReports(reportsRes.data);
    } catch {
      setStats({
        pendingOrders: 3,
        lowStockCount: 2
      });
      setReports({
        period,
        totalRevenue: 2345,
        orderCount: 12,
        avgOrderValue: 195,
        topProducts: [
          { name: "Brake Pads", quantity: 8, revenue: 360 },
          { name: "Oil Filter", quantity: 12, revenue: 144 }
        ],
        salesByStaff: [
          { _id: "John", orders: 5, revenue: 1200 },
          { _id: "Sarah", orders: 4, revenue: 890 },
          { _id: "Mike", orders: 3, revenue: 255 }
        ]
      });
    }
    setLoading(false);
  };

  if (loading) {
    return (
      <div className="space-y-8">
        <Topbar title="Staff Dashboard" subtitle="Loading..." />
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="rounded-3xl bg-ink-900/50 animate-pulse h-24" />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <Topbar title="Staff Dashboard" subtitle={`Performance - ${period}`} />
        <DbStatus />
      </div>

      <div className="flex gap-3 p-2 bg-ink-900/50 rounded-2xl">
        {["today", "week", "month"].map((p) => (
          <button
            key={p}
            onClick={() => setPeriod(p)}
            className={`px-6 py-3 rounded-xl text-sm font-medium transition-all ${
              period === p
                ? "bg-blue-500 text-white shadow-lg"
                : "text-ink-300 hover:text-white hover:bg-white/10"
            }`}
          >
            {p === "today" ? "Today" : p === "week" ? "This Week" : "This Month"}
          </button>
        ))}
      </div>

      <section className="grid gap-6 md:grid-cols-2 lg:grid-cols-5">
        <StatCard label="Revenue" value={`$${reports?.totalRevenue?.toLocaleString() ?? 0}`} delta="+12%" />
        <StatCard label="Orders" value={reports?.orderCount ?? 0} delta={`Avg $${reports?.avgOrderValue?.toFixed(0) ?? 0}`} />
        <StatCard label="Pending" value={stats?.pendingOrders ?? 0} delta="Review" />
        <StatCard label="Low Stock" value={stats?.lowStockCount ?? 0} delta="Alert" />
        <StatCard label="Avg Order" value={`$${(reports?.avgOrderValue ?? 0).toFixed(0)}`} />
      </section>

      <section className="grid gap-8 lg:grid-cols-2">
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-semibold text-white">Sales Trend</h3>
            <Badge text={period.toUpperCase()} />
          </div>
          <Chart
            type="bar"
            data={[
              { name: "Mon", revenue: 400, orders: 3 },
              { name: "Tue", revenue: 300, orders: 2 },
              { name: "Wed", revenue: 600, orders: 5 },
              { name: "Thu", revenue: 500, orders: 4 },
              { name: "Fri", revenue: 700, orders: 6 },
              { name: period === "today" ? "Today" : "Latest", revenue: reports?.totalRevenue || 450, orders: reports?.orderCount || 4 }
            ]}
          />
        </div>
        <div>
          <h3 className="text-xl font-semibold text-white mb-6">Top Products</h3>
          <SalesTable data={reports?.topProducts || []} />
        </div>
      </section>

      <section>
        <SalesTable data={reports?.salesByStaff || []} type="staff" />
      </section>

      <section className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 rounded-3xl border border-white/10 bg-white/5 p-6">
          <h3 className="text-xl font-semibold mb-4 text-white">Payment Methods</h3>
          <Chart
            type="pie"
            data={[
              { name: "Cash", value: 45 },
              { name: "M-Pesa", value: 30 },
              { name: "Card", value: 20 },
              { name: "Bank", value: 5 }
            ]}
            height={200}
          />
        </div>
        <div className="rounded-3xl border border-white/10 bg-gradient-to-br from-emerald-500/15 via-ink-900 to-ink-900 p-6">
          <h3 className="text-lg font-semibold text-white mb-2">Your Stats</h3>
          <p className="text-3xl font-bold text-emerald-400">{user?.name || "Staff"}</p>
          <p className="text-sm text-ink-300 mt-2">
            Revenue: ${reports?.totalRevenue?.toLocaleString() || 0}
          </p>
          <p className="text-sm text-ink-300 mt-1">Orders: {reports?.orderCount || 0}</p>
        </div>
      </section>
    </div>
  );
}
