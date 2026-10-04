import React, { useState } from 'react';
import { Phone, Mail, MapPin, Clock, MessageCircle, Send, CheckCircle2 } from 'lucide-react';

interface ContactUsSectionProps {
  lang: 'ur' | 'en';
}

export const ContactUsSection: React.FC<ContactUsSectionProps> = ({ lang }) => {
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
      'السلام علیکم! میں سدیس کلیکشن کے پرفیومز، عطر یا ٹوپیوں کے بارے میں معلومات اور آرڈر دینا چاہتا ہوں۔'
    );
    window.open(`https://wa.me/923182187575?text=${text}`, '_blank');
  };

  return (
    <section id="contact-section" className="py-16 sm:py-20 bg-[#12141c] border-b border-[#222632]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 text-[#d4af37] text-xs font-semibold uppercase tracking-wider mb-2">
            <Phone className="w-4 h-4" />
            <span>{lang === 'ur' ? 'ہم سے رابطہ کریں' : 'Contact Us & Customer Support'}</span>
          </div>
          <h2 className="text-3xl font-bold text-[#f4efe6] font-display mb-3">
            {lang === 'ur' ? 'خوشبو کے انتخاب میں رہنمائی یا فوری آرڈر' : 'We are here to assist with notes, orders & custom gifts'}
          </h2>
          <p className="text-sm text-[#a69f91]">
            {lang === 'ur'
              ? 'واٹس ایپ، فون یا فارم کے ذریعے رابطہ کریں۔ ہماری ٹیم آپ کی خدمت کے لیے ہمہ وقت تیار ہے۔'
              : 'Reach out via WhatsApp for immediate support, custom bulk orders, or fragrance guidance.'}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Left: Contact Info Cards */}
          <div className="lg:col-span-5 space-y-4">
            
            {/* WhatsApp Big Action Card */}
            <div className="p-6 rounded-2xl bg-[#0b241c] border border-emerald-500/30 text-white space-y-3">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-emerald-500/20 flex items-center justify-center text-emerald-400">
                  <MessageCircle className="w-6 h-6 fill-current" />
                </div>
                <div>
                  <h3 className="font-bold text-base font-display">
                    {lang === 'ur' ? 'فوری واٹس ایپ رابطہ' : 'Instant WhatsApp Help'}
                  </h3>
                  <p className="text-xs text-emerald-200">
                    {lang === 'ur' ? '24 گھنٹے میں سے کسی بھی وقت میسج کریں' : 'Direct line for inquiries & instant orders'}
                  </p>
                </div>
              </div>

              <div className="font-mono text-base font-bold text-white tabular-nums pt-1">
                +92 318 2187575
              </div>

              <button
                onClick={handleOpenDirectWhatsApp}
                className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-[#0f1115] font-bold text-xs transition-colors cursor-pointer"
              >
                <span>{lang === 'ur' ? 'ابھی واٹس ایپ چیٹ شروع کریں' : 'Chat on WhatsApp Now'}</span>
              </button>
            </div>

            {/* Physical Store & Timings */}
            <div className="p-6 rounded-2xl bg-[#171a24] border border-[#272d3e] space-y-4 text-xs">
              <div className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-[#d4af37] shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-bold text-[#f4efe6] text-sm mb-0.5">
                    {lang === 'ur' ? 'مرکزی شوروم و پتہ:' : 'Flagship Store & Address:'}
                  </h4>
                  <p className="text-[#a69f91] leading-relaxed">
                    {lang === 'ur'
                      ? 'شیرپاؤ ایف 2 اسٹریٹ، لیبر کالونی ڈبل کیبن اسٹریٹ، نزد ایم اے ڈیکوریشن، ملیر، کراچی، پاکستان۔'
                      : 'Sherpao F2 Street, labour colony double Kebin Street, Near M A Decoration, Malir, Karachi, Pakistan.'}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3 pt-3 border-t border-[#232838]">
                <Clock className="w-4 h-4 text-[#d4af37] shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-bold text-[#f4efe6] text-sm mb-0.5">
                    {lang === 'ur' ? 'اوقاتِ کار:' : 'Shop Timings:'}
                  </h4>
                  <p className="text-[#a69f91]">
                    {lang === 'ur' ? 'روزانہ صبح 10:00 بجے تا رات 11:00 بجے' : 'Daily from 10:00 AM to 11:00 PM'}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3 pt-3 border-t border-[#232838]">
                <Mail className="w-4 h-4 text-[#d4af37] shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-bold text-[#f4efe6] text-sm mb-0.5">
                    {lang === 'ur' ? 'ای میل:' : 'Email Support:'}
                  </h4>
                  <p className="text-[#a69f91] font-mono">support@itr-rida.pk</p>
                </div>
              </div>
            </div>

          </div>

          {/* Right: Message Form */}
          <div className="lg:col-span-7 bg-[#171a24] border border-[#272d3e] rounded-2xl p-6 sm:p-8">
            <h3 className="text-xl font-bold text-[#f4efe6] font-display mb-2">
              {lang === 'ur' ? 'پیغام یا استفسار ارسال کریں' : 'Send an Inquiry / Message'}
            </h3>
            <p className="text-xs text-[#a69f91] mb-6">
              {lang === 'ur'
                ? 'کسی مخصوص پرفیوم نوٹس، عطر یا ٹوپی کے سائز کے متعلق سوال ہو تو فارم پُر کریں۔'
                : 'Need guidance on perfume notes or custom bulk gifting? Leave a message below.'}
            </p>

            {submitted ? (
              <div className="p-8 text-center bg-[#13151e] rounded-xl border border-emerald-500/30 space-y-2">
                <CheckCircle2 className="w-12 h-12 text-emerald-400 mx-auto" />
                <h4 className="text-lg font-bold text-[#f4efe6]">
                  {lang === 'ur' ? 'آپ کا پیغام کامیابی سے موصول ہو گیا ہے!' : 'Message Received!'}
                </h4>
                <p className="text-xs text-[#a69f91]">
                  {lang === 'ur' ? 'ہماری ٹیم جلد آپ سے رابطہ کرے گی۔' : 'Our fragrance specialist will call you shortly.'}
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4 text-xs">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[#a69f91] mb-1">
                      {lang === 'ur' ? 'آپ کا نام *' : 'Your Name *'}
                    </label>
                    <input
                      type="text"
                      required
                      placeholder={lang === 'ur' ? 'مثلاً اسامہ خان' : 'e.g. Osama Khan'}
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full bg-[#101218] border border-[#2b3142] rounded-lg px-3 py-2.5 text-xs text-[#f4efe6] focus:outline-none focus:border-[#d4af37]"
                    />
                  </div>

                  <div>
                    <label className="block text-[#a69f91] mb-1">
                      {lang === 'ur' ? 'موبائل نمبر یا واٹس ایپ *' : 'Phone / WhatsApp *'}
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="03001234567"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full bg-[#101218] border border-[#2b3142] rounded-lg px-3 py-2.5 text-xs text-[#f4efe6] focus:outline-none focus:border-[#d4af37]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[#a69f91] mb-1">
                    {lang === 'ur' ? 'آپ کا پیغام / سوال' : 'Your Message / Inquiry'}
                  </label>
                  <textarea
                    rows={4}
                    placeholder={lang === 'ur' ? 'اپنا سوال یا مطلوبہ خوشبو کے بارے میں لکھیں...' : 'Tell us what you are looking for...'}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full bg-[#101218] border border-[#2b3142] rounded-lg px-3 py-2.5 text-xs text-[#f4efe6] focus:outline-none focus:border-[#d4af37]"
                  />
                </div>

                <button
                  type="submit"
                  className="flex items-center justify-center gap-2 py-3 px-6 bg-[#d4af37] hover:bg-[#e6c352] text-[#0f1115] font-bold rounded-xl transition-all cursor-pointer shadow-md active:scale-98"
                >
                  <Send className="w-4 h-4" />
                  <span>{lang === 'ur' ? 'پیغام ارسال کریں' : 'Send Message'}</span>
                </button>
              </form>
            )}

          </div>

        </div>

      </div>
    </section>
  );
};
