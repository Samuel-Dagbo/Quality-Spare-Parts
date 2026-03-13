import Topbar from "../components/Topbar";
import Badge from "../components/Badge";

const customers = [
  { name: "Kwame Mensah", tier: "Wholesale", orders: 18 },
  { name: "Aisha K.", tier: "Retail", orders: 4 },
  { name: "Johnson Parts", tier: "Fleet", orders: 12 }
];

export default function Customers() {
  return (
    <div className="space-y-8">
      <Topbar title="Customers" subtitle="Relationship management" />

      <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-ink-200/70">Customer segments</p>
            <h2 className="text-xl font-semibold text-white">Top accounts</h2>
          </div>
          <Badge text="Engaged" tone="success" />
        </div>
        <div className="mt-6 space-y-4">
          {customers.map((customer) => (
            <div key={customer.name} className="flex items-center justify-between rounded-2xl border border-white/10 bg-ink-900/70 p-4">
              <div>
                <p className="text-white font-semibold">{customer.name}</p>
                <p className="text-xs text-ink-200/70">Orders: {customer.orders}</p>
              </div>
              <Badge text={customer.tier} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
