import { useEffect, useState } from "react";
import Topbar from "../components/Topbar";
import Badge from "../components/Badge";
import { api } from "../lib/api";
import { formatCedis } from "../lib/currency";

export default function Sales() {
  const [sales, setSales] = useState([]);

  useEffect(() => {
    api
      .getSales()
      .then((data) => setSales(data.data || []))
      .catch(() => setSales([]));
  }, []);

  return (
    <div className="space-y-8">
      <Topbar title="Sales" subtitle="Transactions" />

      <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold text-white">Recent sales</h2>
          <Badge text={`${sales.length} records`} />
        </div>
        <div className="mt-6 space-y-4">
          {sales.map((sale) => (
            <div key={sale._id} className="rounded-2xl border border-white/10 bg-ink-900/70 p-4">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div>
                  <p className="text-white font-semibold">{sale.customerName}</p>
                  <p className="text-xs text-ink-200/70">{sale.paymentMethod}</p>
                </div>
                <p className="text-sm text-white">{formatCedis(sale.totalAmount)}</p>
              </div>
              <p className="mt-2 text-xs text-ink-200/70">{new Date(sale.saleDate).toDateString()}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
