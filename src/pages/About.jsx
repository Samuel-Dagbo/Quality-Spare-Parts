import { Link } from "react-router-dom";
import Button from "../components/Button";
import PublicNavbar from "../components/PublicNavbar";
import { Menu } from "lucide-react";
import { Truck, ShieldCheck, Clock, MapPin, Phone, Users, Wrench } from "lucide-react";

const stats = [
  { number: "10K+", label: "Parts in Stock" },
  { number: "500+", label: "Happy Customers" },
  { number: "24h", label: "Avg Delivery" },
  { number: "50+", label: "Suppliers" }
];

const features = [
  { 
    icon: ShieldCheck, 
    title: "Genuine Parts", 
    desc: "OEM quality components tested for performance. Every part guaranteed authentic." 
  },
  { 
    icon: Truck, 
    title: "Fast Delivery", 
    desc: "Accra same-day, nationwide 24-48hrs. Track every step." 
  },
  { 
    icon: Clock, 
    title: "Live Stock", 
    desc: "Real-time inventory. What you see is what we have." 
  },
  { 
    icon: Wrench, 
    title: "Expert Support", 
    desc: "Mechanics on call. Part lookup by VIN/engine. Technical advice included." 
  }
];

export default function About() {
  return (
    <div className="min-h-screen bg-ink-950 text-ink-100 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-aqua-500/5 via-transparent to-ember-500/5" />
      <div className="relative z-10 px-4 sm:px-6 py-12 lg:py-16">
        <div className="max-w-6xl mx-auto space-y-20">
          <PublicNavbar />
          
          {/* Hero */}
          <section className="text-center">
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold bg-gradient-to-r from-white via-aqua-200 to-sun-300 bg-clip-text text-transparent mb-6 leading-tight">
              Your Trusted Car Parts Partner
            </h1>
            <p className="text-xl md:text-2xl text-ink-200/90 max-w-3xl mx-auto mb-12 leading-relaxed">
              10+ years serving workshops, fleets, and drivers across Ghana. Genuine parts, real-time stock, lightning delivery.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/customer/shop">
                <Button label="Shop Parts Now" size="lg" />
              </Link>
              <Link to="/login">
                <Button label="For Workshops" variant="ghost" size="lg" />
              </Link>
            </div>
          </section>

          {/* Stats */}
          <section className="grid grid-cols-2 md:grid-cols-4 gap-6 lg:gap-8 text-center p-8 rounded-3xl bg-white/3 backdrop-blur-xl border border-white/10">
            {stats.map((stat, i) => (
              <div key={i} className="space-y-2 group">
                <div className="text-3xl md:text-4xl lg:text-5xl font-black bg-gradient-to-r from-lime-400 to-emerald-400 bg-clip-text text-transparent drop-shadow-lg">
                  {stat.number}
                </div>
                <p className="text-sm md:text-base text-ink-300 uppercase tracking-wide group-hover:text-white transition">
                  {stat.label}
                </p>
              </div>
            ))}
          </section>

          {/* Features */}
          <section className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
            {features.map((feature, i) => {
              const Icon = feature.icon;
              return (
                <div key={i} className="group p-8 rounded-3xl border border-white/10 bg-gradient-to-b from-white/5 hover:from-white/10 backdrop-blur-xl hover:shadow-2xl transition-all hover:-translate-y-2 h-full">
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-aqua-500 rounded-2xl flex items-center justify-center mb-6 shadow-xl group-hover:scale-110 transition-transform">
                    <Icon className="w-8 h-8 text-white drop-shadow-md" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-4">{feature.title}</h3>
                  <p className="text-ink-300 leading-relaxed">{feature.desc}</p>
                </div>
              );
            })}
          </section>

          {/* Warehouse Image Section */}
          <section className="relative h-64 md:h-80 rounded-3xl overflow-hidden border border-white/10 shadow-2xl group">
            <img 
              src="https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?ixlib=rb-4.0.3&auto=format&fit=crop&w=2340&q=80" 
              alt="Spare parts warehouse" 
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-ink-950/90 via-ink-950/20 to-transparent flex items-end p-8">
              <div>
                <h3 className="text-2xl font-bold text-white">Accra Distribution Center</h3>
                <p className="text-ink-200">Stocking over 10,000 SKUs ready for immediate dispatch.</p>
              </div>
            </div>
          </section>

          {/* Story */}
          <section className="lg:grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <div className="order-2 lg:order-1 space-y-6">
              <h2 className="text-4xl lg:text-5xl font-bold bg-gradient-to-r from-white to-aqua-200 bg-clip-text text-transparent">
                Born in Accra workshops. Built for every driver.
              </h2>
              <div className="space-y-4 text-lg leading-relaxed">
                <p>
                  Started as a dusty warehouse in 2013. Now Ghana's fastest growing parts platform. 
                  We've delivered 500K+ parts, partnered with 50+ suppliers, served 20K+ mechanics.
                </p>
                <p className="font-semibold text-white">
                  From Toyota Corolla filters to Land Cruiser diffs - if your car needs it, we stock it.
                </p>
                <div className="flex flex-wrap gap-3 mt-6">
                  <div className="flex items-center gap-2 px-4 py-2 bg-emerald-500/20 border border-emerald-500/40 rounded-xl text-emerald-200">
                    <MapPin className="w-4 h-4" />
                    Nationwide Delivery
                  </div>
                  <div className="flex items-center gap-2 px-4 py-2 bg-blue-500/20 border border-blue-500/40 rounded-xl text-blue-200">
                    <Users className="w-4 h-4" />
                    B2B Workshop Accounts
                  </div>
                  <div className="flex items-center gap-2 px-4 py-2 bg-orange-500/20 border border-orange-500/40 rounded-xl text-orange-200">
                    <Phone className="w-4 h-4" />
                    24/7 Phone Support
                  </div>
                </div>
              </div>
            </div>
            <div className="order-1 lg:order-2 relative h-80 lg:h-96 rounded-3xl overflow-hidden shadow-2xl ring-1 ring-white/20">
              <img 
                src="https://images.unsplash.com/photo-1558618047-7f83bb9c399f?w=800&fit=crop&crop=entropy&auto=format" 
                alt="Workshop team servicing vehicles" 
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
            </div>
          </section>

          {/* CTA */}
          <section className="text-center py-20 px-8 rounded-3xl bg-gradient-to-r from-emerald-500/20 via-blue-500/10 to-aqua-500/20 border border-white/20 backdrop-blur-xl">
            <h2 className="text-3xl lg:text-5xl font-bold mb-6 bg-gradient-to-r from-emerald-400 via-white to-aqua-400 bg-clip-text text-transparent">
              Ready to keep your fleet moving?
            </h2>
            <p className="text-xl text-ink-200/90 mb-10 max-w-2xl mx-auto">
              Parts that arrive when you need them. Support that never sleeps.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/customer/shop">
                <Button label="Browse Catalog" size="lg" />
              </Link>
              <Link to="/login" className="block sm:inline">
                <Button label="Workshop Login" variant="ghost" size="lg" />
              </Link>
            </div>
          </section>

        </div>
      </div>
    </div>
  );
}
