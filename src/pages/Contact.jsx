import { useState } from "react";
import PublicNavbar from "../components/PublicNavbar";
import Input from "../components/Input";
import Button from "../components/Button";
import { MapPin, Phone, Mail, Clock } from "lucide-react";

export default function Contact() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-ink-950 text-ink-100 relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_rgba(34,211,238,0.1),_transparent_50%),radial-gradient(circle_at_bottom_left,_rgba(249,115,22,0.05),_transparent_50%)]"></div>
      
      <main className="relative z-10 px-6 py-12">
        <div className="mx-auto max-w-6xl space-y-12">
          <PublicNavbar />

          <section className="text-center space-y-4 pt-8">
            <h1 className="text-4xl font-bold text-white">Contact Us</h1>
            <p className="text-ink-200/70 max-w-2xl mx-auto">
              Have questions about a specific part? Need help with an order? 
              Our team of mechanics and parts specialists is here to help.
            </p>
          </section>

          <div className="grid lg:grid-cols-2 gap-12 items-start">
            {/* Contact Info */}
            <div className="space-y-6">
              <div className="rounded-3xl border border-white/10 bg-white/5 p-8 space-y-8">
                <div className="flex gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-ember-500/20 flex items-center justify-center text-ember-400 shrink-0">
                    <Phone size={24} />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-white">Phone Support</h3>
                    <p className="text-ink-200/70 mb-1">24/7 Hotline for urgent inquiries.</p>
                    <p className="text-white font-mono">+233 55 000 0000</p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-aqua-500/20 flex items-center justify-center text-aqua-400 shrink-0">
                    <Mail size={24} />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-white">Email</h3>
                    <p className="text-ink-200/70 mb-1">For quotes and general support.</p>
                    <p className="text-white font-mono">support@sparepartsnexus.com</p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-lime-500/20 flex items-center justify-center text-lime-400 shrink-0">
                    <MapPin size={24} />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-white">Headquarters</h3>
                    <p className="text-ink-200/70">12 Independence Ave, Accra, Ghana</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Form */}
            <div className="rounded-3xl border border-white/10 bg-white/5 p-8">
              <h2 className="text-xl font-semibold text-white mb-6">Send us a message</h2>
              {submitted ? (
                <div className="p-4 bg-lime-500/20 border border-lime-500/40 text-lime-200 rounded-2xl text-center">
                  Thanks for reaching out! We'll get back to you shortly.
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid md:grid-cols-2 gap-4">
                    <Input label="Name" placeholder="Your name" required />
                    <Input label="Phone" placeholder="Your phone number" />
                  </div>
                  <Input label="Email" type="email" placeholder="name@example.com" required />
                  <div>
                    <label className="block text-sm text-ink-200/80 mb-2">Message</label>
                    <textarea 
                      className="w-full rounded-2xl border border-white/10 bg-ink-900/80 px-4 py-3 text-white placeholder:text-ink-200/40 focus:outline-none focus:ring-2 focus:ring-steel-400/60 min-h-[120px]"
                      placeholder="How can we help you?"
                      required
                    ></textarea>
                  </div>
                  <Button label="Send Message" className="w-full justify-center" />
                </form>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}