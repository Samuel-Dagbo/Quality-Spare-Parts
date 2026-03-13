export default function SalesTable({ data, type = "staff" }) {
  return (
    <div className="rounded-3xl border border-white/10 bg-white/5 overflow-hidden">
      <div className="bg-white/5 px-6 py-4 border-b border-white/10">
        <h3 className="text-lg font-semibold text-white flex items-center gap-2">
          {type === "staff" ? "Sales by Staff" : "Top Products"}
        </h3>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-white/10">
              {type === "staff" ? (
                <>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-ink-200/70 uppercase tracking-wider">Staff</th>
                  <th className="px-6 py-4 text-right text-xs font-semibold text-ink-200/70 uppercase tracking-wider">Orders</th>
                  <th className="px-6 py-4 text-right text-xs font-semibold text-ink-200/70 uppercase tracking-wider">Revenue</th>
                </>
              ) : (
                <>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-ink-200/70 uppercase tracking-wider">Product</th>
                  <th className="px-6 py-4 text-right text-xs font-semibold text-ink-200/70 uppercase tracking-wider">Qty</th>
                  <th className="px-6 py-4 text-right text-xs font-semibold text-ink-200/70 uppercase tracking-wider">Revenue</th>
                </>
              )}
            </tr>
          </thead>
          <tbody className="divide-y divide-white/10">
            {data.map((row, index) => (
              <tr key={index} className="hover:bg-white/5 transition-colors">
                <td className="px-6 py-4">
                  <div className="font-medium text-white">{row._id || row.name}</div>
                </td>
                <td className="px-6 py-4 text-right text-ink-300">
                  {row.orders || row.quantity}
                </td>
                <td className="px-6 py-4 text-right">
                  <div className="font-semibold text-emerald-400">
                    ₵{typeof row.revenue === 'number' ? row.revenue.toFixed(0) : row.revenue?.toFixed(0) || '0'}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
