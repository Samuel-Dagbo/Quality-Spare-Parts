import Topbar from "../components/Topbar";
import Button from "../components/Button";

const suppliers = [
  {
    name: "Atlas Auto Supply",
    contact: "sales@atlasauto.com",
    status: "Primary"
  },
  {
    name: "TorquePro Distribution",
    contact: "hello@torquepro.io",
    status: "Secondary"
  },
  {
    name: "RoadRunner Parts",
    contact: "support@roadrunnerparts.com",
    status: "Backorder"
  }
];

export default function Suppliers() {
  return (
    <div className="space-y-8">
      <Topbar title="Suppliers" subtitle="Partner network" />

      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-ink-200/70">Vendor health</p>
          <h2 className="text-xl font-semibold text-white">Supply chain view</h2>
        </div>
        <Button label="Add supplier" />
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {suppliers.map((supplier) => (
          <div key={supplier.name} className="rounded-3xl border border-white/10 bg-white/5 p-5">
            <p className="text-white font-semibold">{supplier.name}</p>
            <p className="text-xs text-ink-200/70">{supplier.contact}</p>
            <p className="mt-3 text-xs text-ember-400">{supplier.status}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
