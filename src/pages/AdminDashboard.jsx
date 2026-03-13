import { useEffect, useState } from "react";
import Topbar from "../components/Topbar";
import StatCard from "../components/StatCard";
import Badge from "../components/Badge";
import DbStatus from "../components/DbStatus";
import Chart from "../components/Chart";
import SalesTable from "../components/SalesTable";
import { api } from "../lib/api";

export default function AdminDashboard() {
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
      <div className="flex flex-wrap items-center justify-between gap-3">
        <Topbar title="Admin Dashboard" subtitle="Executive overview" />
        <DbStatus />
      </div>

      <section className="grid gap-6 md:grid-cols-2 lg:grid-cols-5">
        <StatCard label="Products" value={stats?.productCount ?? 0} delta="+8%" />
        <StatCard label="Revenue" value={`$${stats?.revenue?.toLocaleString() ?? 0}`} delta="+6.4%" />
        <StatCard label="Orders" value={stats?.orderCount ?? 0} delta="+12" />
        <StatCard label="Users" value={stats?.userCount ?? 0} delta="+3" />
        <StatCard label="Pending" value={stats?.pendingOrders ?? 0} delta="Review" />
      </section>

      <section className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div>
          <h3 className="text-xl font-semibold text-white mb-6">Revenue Breakdown</h3>
          <Chart type="pie" data={[
            { name: 'Paid', value: 85 },
            { name: 'Pending', value: 15 }
          ]} />
        </div>
        <div>
          <h3 className="text-xl font-semibold text-white mb-6">Staff Performance</h3>
          <SalesTable data={[
            { _id: "John", orders: 45, revenue: 23450 },
            { _id: "Sarah", orders: 38, revenue: 18920 },
            { _id: "Mike", orders: 32, revenue: 15680 }
          ]} type="staff" />
        </div>
      </section>
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        <div className="xl:col-span-2">
          <SalesTable data={[
            { name: "Oil Filter", quantity: 125, revenue: 1500 },
            { name: "Brake Pads", quantity: 89, revenue: 3560 },
            { name: "Spark Plugs", quantity: 67, revenue: 1340 }
          ]} />
        </div>
        <div className="space-y-6">
          <div className="rounded-3xl border border-yellow-500/30 bg-yellow-500/10 p-6">
            <h3 className="text-lg font-semibold text-white mb-2">Alerts</h3>
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-sm text-yellow-300">
                <div className="w-2 h-2 bg-yellow-400 rounded-full" />
                {stats?.pendingOrders ?? 0} Pending Orders
              </div>
              <div className="flex items-center gap-2 text-sm text-yellow-300">
                <div className="w-2 h-2 bg-yellow-400 rounded-full" />
                {stats?.lowStockCount ?? 0} Low Stock Items
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
