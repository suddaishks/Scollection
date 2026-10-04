import React, { useState } from 'react';
import { Phone, Mail, MapPin, Clock, MessageCircle, Send, CheckCircle2 } from 'lucide-react';

export const ContactUsSection: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.phone.trim()) return;
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setFormData({ name: '', phone: '', message: '' });
    }, 4000);
  };

  const handleOpenDirectWhatsApp = () => {
    const text = encodeURIComponent(
      'Hello! I would like to inquire about perfumes, attars, and caps from Suddais Collection.'
    );
    window.open(`https://wa.me/923182187575?text=${text}`, '_blank');
  };

  return (
    <section id="contact-section" className="py-16 sm:py-20 bg-[#faf7f2] border-b border-[#e8dec8]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 text-[#b8860b] text-xs font-bold uppercase tracking-wider mb-2">
            <Phone className="w-4 h-4" />
            <span>CUSTOMER SUPPORT & STORE INQUIRIES</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-[#1a1612] font-display mb-3">
            Get In Touch With Suddais Collection
          </h2>
          <p className="text-sm text-[#736a5c]">
            Need help selecting a scent or want to order in bulk? Contact us directly via WhatsApp, phone, or our fast message form.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Left: Contact Info Cards */}
          <div className="lg:col-span-5 space-y-4">
            
            {/* WhatsApp Big Action Card */}
            <div className="p-6 rounded-2xl bg-[#09291b] border border-emerald-500/40 text-white space-y-3 shadow-md">
              <div className="flex items-center gap-3">
                <div className="p-3 rounded-xl bg-emerald-500/20 text-emerald-400">
                  <MessageCircle className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-bold text-base font-display">Instant WhatsApp Order</h4>
                  <p className="text-xs text-emerald-200">Fastest response within minutes</p>
                </div>
              </div>
              <p className="text-xs text-emerald-100/90 leading-relaxed">
                Connect directly with our master perfumer on WhatsApp for product recommendations, custom gift sets, and fast orders.
              </p>
              <button
                onClick={handleOpenDirectWhatsApp}
                className="w-full py-3 px-4 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-[#09291b] font-bold text-xs sm:text-sm transition-all flex items-center justify-center gap-2 cursor-pointer shadow-sm"
              >
                <Phone className="w-4 h-4" />
                <span>Chat on WhatsApp (+92 318 2187575)</span>
              </button>
            </div>

            {/* Store Address & Hours */}
            <div className="p-6 rounded-2xl bg-white border border-[#e8dec8] space-y-4 shadow-xs">
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-[#b8860b] shrink-0 mt-0.5" />
                <div className="text-xs">
                  <h5 className="font-bold text-[#1a1612] mb-0.5">Physical Store Address:</h5>
                  <p className="text-[#52493d] leading-relaxed">
                    Sherpao F2 Street, Labour Colony Double Kebin Street, Near M A Decoration, Malir, Karachi, Pakistan.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Phone className="w-5 h-5 text-[#b8860b] shrink-0 mt-0.5" />
                <div className="text-xs">
                  <h5 className="font-bold text-[#1a1612] mb-0.5">Direct Helpline / Order Line:</h5>
                  <p className="text-[#52493d] font-mono font-bold">+92 318 2187575</p>
                  <p className="text-[#8c8273] text-[11px]">Available daily for calls & WhatsApp</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Clock className="w-5 h-5 text-[#b8860b] shrink-0 mt-0.5" />
                <div className="text-xs">
                  <h5 className="font-bold text-[#1a1612] mb-0.5">Store Opening Hours:</h5>
                  <p className="text-[#52493d]">Monday to Saturday: 11:00 AM – 11:00 PM</p>
                  <p className="text-[#52493d]">Friday: 3:00 PM – 11:30 PM (After Jummah Prayers)</p>
                </div>
              </div>
            </div>

          </div>

          {/* Right: Message Form */}
          <div className="lg:col-span-7">
            <div className="p-6 sm:p-8 rounded-3xl bg-white border border-[#e8dec8] shadow-xs">
              <h3 className="text-xl font-bold text-[#1a1612] font-display mb-1">
                Send Us a Quick Message
              </h3>
              <p className="text-xs text-[#736a5c] mb-6">
                Fill in your details below and our customer support team will get back to you promptly.
              </p>

              {submitted ? (
                <div className="p-8 rounded-2xl bg-[#f4fbf7] border border-emerald-500/30 text-center space-y-2">
                  <CheckCircle2 className="w-12 h-12 text-emerald-600 mx-auto" />
                  <h4 className="text-lg font-bold text-[#1a1612]">
                    Message Sent Successfully!
                  </h4>
                  <p className="text-xs text-[#52493d]">
                    Thank you! Our fragrance consultant will contact you at your phone number shortly.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-[#1a1612] mb-1">
                        Your Full Name *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Suddais Ahmed"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full bg-[#faf7f2] border border-[#dcd2be] rounded-xl px-3.5 py-2.5 text-xs text-[#1a1612] focus:outline-none focus:border-[#b8860b]"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-[#1a1612] mb-1">
                        Phone / WhatsApp Number *
                      </label>
                      <input
                        type="tel"
                        required
                        placeholder="0318-2187575"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="w-full bg-[#faf7f2] border border-[#dcd2be] rounded-xl px-3.5 py-2.5 text-xs text-[#1a1612] focus:outline-none focus:border-[#b8860b]"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-[#1a1612] mb-1">
                      Your Message or Order Details
                    </label>
                    <textarea
                      rows={4}
                      placeholder="Write your perfume preference, question about attar notes, or order details here..."
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="w-full bg-[#faf7f2] border border-[#dcd2be] rounded-xl px-3.5 py-2.5 text-xs text-[#1a1612] focus:outline-none focus:border-[#b8860b]"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3.5 px-6 rounded-xl bg-gradient-to-r from-[#d4af37] via-[#e6c352] to-[#c59b27] text-[#1a1612] font-bold text-xs sm:text-sm hover:brightness-105 transition-all shadow-md active:scale-95 cursor-pointer flex items-center justify-center gap-2"
                  >
                    <Send className="w-4 h-4" />
                    <span>Send Message to Support</span>
                  </button>
                </form>
              )}

            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
