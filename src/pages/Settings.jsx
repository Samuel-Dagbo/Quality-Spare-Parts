import Topbar from "../components/Topbar";
import Input from "../components/Input";
import Button from "../components/Button";

export default function Settings() {
  return (
    <div className="space-y-8">
      <Topbar title="Settings" subtitle="System configuration" />

      <div className="grid gap-6 lg:grid-cols-[2fr_1fr]">
        <div className="rounded-3xl border border-white/10 bg-white/5 p-6 space-y-4">
          <h2 className="text-xl font-semibold text-white">Business profile</h2>
          <Input label="Business name" placeholder="SpareParts Nexus" />
          <Input label="Support email" placeholder="support@spareparts.com" />
          <Input label="Primary phone" placeholder="+233 55 000 0000" />
          <Input label="Default warehouse" placeholder="Accra Central" />
          <Button label="Save changes" />
        </div>
        <div className="rounded-3xl border border-white/10 bg-white/5 p-6 space-y-4">
          <h2 className="text-xl font-semibold text-white">Commerce rules</h2>
          <Input label="Minimum stock alert" placeholder="10" />
          <Input label="Default shipping" placeholder="$25" />
          <Input label="Tax percentage" placeholder="0" />
          <Button label="Update rules" variant="ghost" />
        </div>
      </div>
    </div>
  );
}
