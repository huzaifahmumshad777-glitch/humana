/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect, useRef, type FormEvent } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Dumbbell, 
  MapPin, 
  Phone, 
  Clock, 
  ChevronRight, 
  Instagram, 
  Facebook, 
  Menu, 
  X,
  Target,
  Zap,
  ShieldCheck,
  Calculator,
  User,
  Activity,
  Heart,
  MessageCircle,
  MessageSquare,
  Utensils,
  Send,
  Loader2
} from 'lucide-react';
import { GoogleGenAI, Type } from "@google/genai";

// Initialize Gemini
const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

// --- Types ---
interface MembershipOption {
  id: string;
  title: string;
  price: string;
  period: string;
  features: string[];
  isFeatured?: boolean;
  savings?: string;
  badge?: string;
}

interface ChatMessage {
  role: 'user' | 'model';
  text: string;
}

// --- Components ---

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Philosophy', href: '#philosophy' },
    { name: 'The Vault', href: '#vault' },
    { name: 'Memberships', href: '#memberships' },
    { name: 'BMR Tools', href: '#tools' },
  ];

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'mt-4 mx-6 py-4 glass shadow-[0_0_40px_rgba(0,0,0,0.5)] rounded-2xl' : 'py-6 bg-transparent'}`}>
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex items-center gap-3"
        >
          <div className="w-10 h-10 bg-gradient-to-br from-red-600 to-rose-500 rounded-lg flex items-center justify-center shadow-[0_0_15px_rgba(220,38,38,0.5)]">
            <span className="text-xl font-black text-white">8</span>
          </div>
          <span className="text-2xl font-black tracking-tighter text-white">PULSE8<span className="text-red-500">GYM</span></span>
        </motion.div>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a 
              key={link.name} 
              href={link.href}
              className="text-sm font-medium text-slate-300 hover:text-white transition-colors tracking-wide"
            >
              {link.name}
            </a>
          ))}
          <motion.button 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-6 py-2.5 bg-gradient-to-r from-pulse-red to-pulse-rose text-white text-sm font-bold rounded-full glow-red-hover transition-all"
          >
            Join the Elite
          </motion.button>
        </div>

        {/* Mobile Toggle */}
        <button className="md:hidden text-white" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
          {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden glass-dark border-t border-white/10 overflow-hidden"
          >
            <div className="flex flex-col p-6 gap-4">
              {navLinks.map((link) => (
                <a 
                  key={link.name} 
                  href={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-lg font-medium text-slate-300 hover:text-white"
                >
                  {link.name}
                </a>
              ))}
              <button className="w-full py-4 bg-gradient-to-r from-pulse-red to-pulse-rose text-white font-bold rounded-xl glow-red">
                Join Now
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

const Hero = () => {
  return (
    <section className="relative h-screen min-h-[700px] flex items-center justify-center overflow-hidden">
      {/* Background with Cinematic Overlay */}
      <div className="absolute inset-0">
        <img 
          src="https://lh3.googleusercontent.com/p/AF1QipO8V-V0xUzwZqTcRa-y2ClzEuU72C_v9ruiVOdg=s1600-k-no" 
          alt="PULSE8 GYM Interior" 
          className="w-full h-full object-cover scale-105"
        />
        <div className="absolute inset-0 bg-slate-950/80 backdrop-blur-[2px]" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-slate-950/20 to-slate-950" />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-red-500 font-bold uppercase tracking-[0.2em] text-sm mb-4">Evolve at Pulse8</h2>
          <h1 className="text-6xl md:text-8xl font-black tracking-tighter text-white mb-6 leading-[0.9]">
            PRECISION <br/>
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-white via-white to-red-500/40 font-black"> & POWER</span>
          </h1>
          <p className="text-lg md:text-xl text-slate-400 max-w-2xl mx-auto mb-10 leading-relaxed font-medium italic">
            Srinagar Colony's Premier Cardio & Strength Destination. Experience Elite Training Above Karachi Bakery.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="w-full sm:w-auto px-10 py-5 bg-red-600 text-white font-bold rounded-2xl flex items-center justify-center gap-2 shadow-[0_8px_30px_-4px_rgba(220,38,38,0.5)] text-lg"
            >
              START TRANSFORMATION <ChevronRight size={20} />
            </motion.button>
            <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="w-full sm:w-auto px-8 py-4 glass text-white font-bold rounded-xl hover:bg-white/10 transition-colors text-lg"
            >
              View Memberships
            </motion.button>
          </div>
        </motion.div>
      </div>

      {/* Hero Stats */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex items-center gap-8 md:gap-20 text-white/50 text-[10px] uppercase tracking-widest font-bold">
        <div className="flex flex-col items-center gap-2">
          <span className="text-2xl text-white">4th</span> Floor Location
        </div>
        <div className="flex flex-col items-center gap-2">
          <span className="text-2xl text-white">5AM</span> Morning Start
        </div>
        <div className="flex flex-col items-center gap-2">
          <span className="text-2xl text-white">24/7</span> Expert Coaching
        </div>
      </div>
    </section>
  );
};

const Vault = () => {
  const images = [
    { 
      src: "https://images.unsplash.com/photo-1540497077202-7c8a3999166f?q=80&w=2070&auto=format&fit=crop", 
      title: "Strength Floor", 
      size: "col-span-2 row-span-2",
      icon: <Dumbbell className="text-pulse-red" size={24} />
    },
    { 
      src: "https://images.unsplash.com/photo-1593079831268-3381b0db4a77?q=80&w=2069&auto=format&fit=crop", 
      title: "Cardio Zone", 
      size: "col-span-1 row-span-1",
      icon: <Activity className="text-pulse-red" size={24} />
    },
    { 
      src: "https://images.unsplash.com/photo-1434681944760-30619b8c210e?q=80&w=2074&auto=format&fit=crop", 
      title: "Elite Training", 
      size: "col-span-1 row-span-2",
      icon: <Target className="text-pulse-red" size={24} />
    },
    { 
      src: "https://images.unsplash.com/photo-1590239068512-320e895781a5?q=80&w=2069&auto=format&fit=crop", 
      title: "Recovery Studio", 
      size: "col-span-1 row-span-1",
      icon: <Heart className="text-pulse-red" size={24} />
    },
  ];

  return (
    <section id="vault" className="py-24 max-w-7xl mx-auto px-6">
      <div className="mb-16">
        <h2 className="text-4xl md:text-5xl font-black text-white mb-4">THE VAULT<span className="text-pulse-red">.</span></h2>
        <p className="text-slate-400 font-medium max-w-md">Our state-of-the-art facility captured in its true essence.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 grid-rows-2 gap-6 h-auto md:h-[600px]">
        {images.map((img, i) => (
          <motion.div 
            key={i}
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            whileHover={{ scale: 1.02 }}
            className={`relative rounded-3xl overflow-hidden glass group cursor-pointer ${img.size}`}
          >
            <img 
              src={img.src} 
              alt={img.title}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity" />
            <div className="absolute bottom-6 left-6 right-6 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2 glass rounded-lg">{img.icon}</div>
                <h3 className="text-xl font-bold text-white">{img.title}</h3>
              </div>
              <ChevronRight className="text-white/50 group-hover:text-pulse-red transition-colors" />
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

const Memberships = () => {
  const options: MembershipOption[] = [
    {
      id: 'monthly',
      title: 'Monthly Base',
      price: '3,500',
      period: 'Monthly',
      features: ['Access to All Equipment', 'Locker Facility', 'Personalized Workout Plan', 'Open GYM Access'],
    },
    {
      id: 'annual',
      title: 'Annual Special',
      price: '17,999',
      period: '15 Months',
      isFeatured: true,
      badge: '12 + 3 Months Free!',
      savings: 'Regular Price ₹25,000',
      features: ['1 Month Freeze Option', 'Elite Personal Training Session', 'Premium Locker Access', 'Advance Goal Monitoring', 'Merchandise Kit Included'],
    },
    {
      id: 'quarterly',
      title: 'Quarterly Pro',
      price: '9,000',
      period: '3 Months',
      features: ['Access to High-Performance Areas', 'Nutritional Guidance', 'Locker Facility', 'Monthly Fitness Review'],
    },
  ];

  return (
    <section id="memberships" className="py-24 bg-slate-950 relative overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-pulse-red/5 blur-[120px] rounded-full" />
      
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-6xl font-black text-white mb-6">INVEST IN YOURSELF<span className="text-pulse-red">.</span></h2>
          <p className="text-slate-400 max-w-xl mx-auto text-lg">Elite membership tiers designed for those who demand precision and power.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
          {options.map((opt) => (
            <motion.div 
              key={opt.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className={`relative flex flex-col p-8 rounded-[2rem] transition-all duration-500 ${
                opt.isFeatured 
                ? 'glass-dark border-pulse-red/50 scale-105 shadow-[0_0_50px_rgba(220,38,38,0.15)] z-10 -translate-y-4' 
                : 'glass border-white/5'
              }`}
            >
              {opt.badge && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1.5 bg-pulse-red text-white text-[10px] font-black uppercase tracking-tighter rounded-full">
                  {opt.badge}
                </div>
              )}

              <div className="mb-8">
                <h3 className="text-slate-400 text-sm font-bold uppercase tracking-widest mb-1">{opt.title}</h3>
                <div className="flex items-baseline gap-1">
                  <span className="text-4xl md:text-5xl font-black text-white">₹{opt.price}</span>
                  <span className="text-slate-500 text-sm font-medium">/ {opt.period}</span>
                </div>
                {opt.savings && <p className="text-pulse-red text-xs font-bold mt-2 line-through opacity-70">{opt.savings}</p>}
              </div>

              <div className="flex-grow space-y-4 mb-8">
                {opt.features.map((feature, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <ShieldCheck className={`shrink-0 ${opt.isFeatured ? 'text-pulse-red' : 'text-slate-600'}`} size={18} />
                    <span className="text-slate-300 text-sm font-medium">{feature}</span>
                  </div>
                ))}
              </div>

              <motion.button 
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className={`w-full py-4 rounded-xl font-bold transition-all ${
                  opt.isFeatured 
                  ? 'bg-pulse-red text-white glow-red hover:bg-pulse-rose shadow-xl' 
                  : 'bg-white/10 text-white hover:bg-white/20'
                }`}
              >
                Choose This Plan
              </motion.button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const CalculatorAndForm = () => {
  // BMR State
  const [bmr, setBmr] = useState<number | null>(null);
  const [age, setAge] = useState('');
  const [gender, setGender] = useState<'male' | 'female'>('male');
  const [height, setHeight] = useState('');
  const [weight, setWeight] = useState('');

  // Inquiry Form State
  const [inquiry, setInquiry] = useState({ name: '', phone: '', goal: 'muscle' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const calculateBMR = (e: FormEvent) => {
    e.preventDefault();
    const h = parseFloat(height);
    const w = parseFloat(weight);
    const a = parseFloat(age);

    if (h && w && a) {
      let result = 0;
      if (gender === 'male') {
        result = 10 * w + 6.25 * h - 5 * a + 5;
      } else {
        result = 10 * w + 6.25 * h - 5 * a - 161;
      }
      setBmr(Math.round(result));
    }
  };

  const handleFormSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const phoneRegex = /^[0-9]{10}$/;
    if (!phoneRegex.test(inquiry.phone)) {
      alert('Please enter a valid 10-digit phone number.');
      return;
    }

    setIsSubmitting(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    setIsSubmitting(false);
    setIsSuccess(true);
    setTimeout(() => setIsSuccess(false), 5000);
  };

  return (
    <section id="tools" className="py-24 max-w-7xl mx-auto px-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* BMR Calculator */}
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="glass rounded-[2.5rem] p-8 md:p-12 relative overflow-hidden"
        >
          <div className="relative z-10">
            <div className="flex items-center gap-3 mb-8">
              <div className="p-3 bg-pulse-red/10 rounded-2xl">
                <Calculator className="text-pulse-red" size={32} />
              </div>
              <div>
                <h2 className="text-3xl font-black text-white">BMR CALCULATOR<span className="text-pulse-red">.</span></h2>
                <p className="text-slate-400 text-sm font-medium italic">Mifflin-St Jeor Research Foundation</p>
              </div>
            </div>

            <form onSubmit={calculateBMR} className="space-y-6">
              <div className="flex p-1 bg-black/40 rounded-xl border border-white/10">
                <button 
                  type="button"
                  onClick={() => setGender('male')}
                  className={`flex-1 py-3 rounded-lg text-sm font-bold transition-all ${gender === 'male' ? 'bg-red-600 text-white shadow-lg' : 'text-slate-500 hover:text-white'}`}
                >
                  Male
                </button>
                <button 
                  type="button"
                  onClick={() => setGender('female')}
                  className={`flex-1 py-3 rounded-lg text-sm font-bold transition-all ${gender === 'female' ? 'bg-red-600 text-white shadow-lg' : 'text-slate-500 hover:text-white'}`}
                >
                  Female
                </button>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-widest px-1">Age (Years)</label>
                  <input 
                    type="number" 
                    value={age} 
                    onChange={(e) => setAge(e.target.value)}
                    placeholder="25"
                    className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-4 text-white focus:outline-none focus:border-red-500 transition-colors"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-widest px-1">Height (CM)</label>
                  <input 
                    type="number" 
                    value={height} 
                    onChange={(e) => setHeight(e.target.value)}
                    placeholder="175"
                    className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-4 text-white focus:outline-none focus:border-red-500 transition-colors"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-500 uppercase tracking-widest px-1">Weight (KG)</label>
                <input 
                  type="number" 
                  value={weight} 
                  onChange={(e) => setWeight(e.target.value)}
                  placeholder="70"
                  className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-4 text-white focus:outline-none focus:border-red-500 transition-colors"
                />
              </div>

              <button className="w-full py-5 bg-red-600 text-white font-black rounded-2xl hover:bg-rose-500 shadow-[0_4px_20px_rgba(220,38,38,0.4)] transition-all uppercase tracking-widest mt-4">
                Analyze Stats
              </button>
            </form>

            <AnimatePresence>
              {bmr && (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.9, y: 20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  className="mt-8 p-8 glass-dark border-pulse-red relative bg-gradient-to-br from-pulse-red/10 to-transparent"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-slate-400 text-xs font-bold uppercase tracking-widest mb-1">Your Daily BMR</p>
                      <h4 className="text-5xl font-black text-white">{bmr}<span className="text-lg text-slate-400 ml-2">Kcal</span></h4>
                    </div>
                    <div className="w-16 h-16 bg-pulse-red rounded-full flex items-center justify-center glow-red">
                      <Zap className="text-white fill-white" />
                    </div>
                  </div>
                  <p className="text-slate-500 text-[10px] mt-4 leading-relaxed font-medium">
                    Basal Metabolic Rate is the amount of energy expended while at rest in a neutrally temperate environment.
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>

        {/* Lead Gen Form */}
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="flex flex-col justify-center"
        >
          <div className="mb-12">
            <span className="text-pulse-red font-bold text-sm tracking-widest uppercase mb-4 block">Take Action</span>
            <h2 className="text-4xl md:text-6xl font-black text-white mb-6">CLAIM YOUR <br/>PASS<span className="text-pulse-red">.</span></h2>
            <p className="text-slate-400 text-lg">Leave your details and our growth coaches will contact you within 2 hours for a facility tour.</p>
          </div>

          <form onSubmit={handleFormSubmit} className="space-y-6">
            <div className="relative group">
              <input 
                type="text" 
                required
                value={inquiry.name}
                onChange={(e) => setInquiry({...inquiry, name: e.target.value})}
                className="w-full bg-transparent border-b-2 border-white/10 py-4 text-white focus:outline-none focus:border-pulse-red transition-all peer placeholder-transparent"
                id="name"
                placeholder="Name"
              />
              <label htmlFor="name" className="absolute left-0 -top-2 text-xs font-bold text-slate-500 uppercase tracking-widest transition-all peer-placeholder-shown:text-base peer-placeholder-shown:top-4 peer-placeholder-shown:font-medium peer-focus:-top-2 peer-focus:text-xs peer-focus:text-pulse-red">Full Name</label>
            </div>

            <div className="relative group">
              <input 
                type="tel" 
                required
                value={inquiry.phone}
                onChange={(e) => setInquiry({...inquiry, phone: e.target.value})}
                className="w-full bg-transparent border-b-2 border-white/10 py-4 text-white focus:outline-none focus:border-pulse-red transition-all peer placeholder-transparent"
                id="phone"
                placeholder="Phone"
              />
              <label htmlFor="phone" className="absolute left-0 -top-2 text-xs font-bold text-slate-500 uppercase tracking-widest transition-all peer-placeholder-shown:text-base peer-placeholder-shown:top-4 peer-placeholder-shown:font-medium peer-focus:-top-2 peer-focus:text-xs peer-focus:text-pulse-red">Phone Number</label>
            </div>

            <div className="relative">
              <select 
                value={inquiry.goal}
                onChange={(e) => setInquiry({...inquiry, goal: e.target.value})}
                className="w-full bg-white/5 border border-white/10 rounded-xl px-6 py-4 text-white appearance-none focus:outline-none focus:border-pulse-red/50 cursor-pointer"
              >
                <option value="muscle">Muscle Hypertrophy</option>
                <option value="weight">Weight Management</option>
                <option value="cardio">Cardiovascular Health</option>
                <option value="power">Powerlifting</option>
              </select>
            </div>

            <button 
              disabled={isSubmitting}
              className="relative group w-full"
            >
              <div className="absolute inset-0 bg-pulse-red rounded-xl blur-lg group-hover:blur-xl transition-all opacity-40 animate-pulse" />
              <div className="relative flex items-center justify-center gap-3 py-5 bg-gradient-to-r from-pulse-red to-pulse-rose text-white font-black rounded-xl tracking-widest uppercase transition-transform active:scale-[0.98]">
                {isSubmitting ? (
                  <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin" />
                ) : (
                  <>Initiate Request <ChevronRight size={18} /></>
                )}
              </div>
            </button>

            {isSuccess && (
              <motion.p 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center text-green-400 font-bold text-sm"
              >
                Request sent! We will call you shortly.
              </motion.p>
            )}
          </form>
        </motion.div>
      </div>
    </section>
  );
};

const Footer = () => {
  return (
    <footer className="bg-slate-950 border-t border-white/5 pt-20 pb-10">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-20">
        <div className="space-y-6">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-pulse-red rounded-lg flex items-center justify-center">
              <Zap className="text-white fill-white" size={18} />
            </div>
            <span className="text-xl font-black text-white">PULSE8<span className="text-pulse-red">.</span></span>
          </div>
          <p className="text-slate-500 text-sm leading-relaxed font-medium">
            Srinagar Colony's premium fitness destination. Precision in every movement, power in every pulse.
          </p>
          <div className="flex items-center gap-4">
            <a href="#" className="p-2 glass rounded-lg text-slate-400 hover:text-white hover:bg-pulse-red/20 transition-all"><Instagram size={20} /></a>
            <a href="#" className="p-2 glass rounded-lg text-slate-400 hover:text-white hover:bg-pulse-red/20 transition-all"><Facebook size={20} /></a>
          </div>
        </div>

        <div className="lg:col-span-1">
          <h4 className="text-white font-black mb-6 tracking-widest text-sm uppercase">Find Us</h4>
          <div className="rounded-2xl overflow-hidden glass border border-white/10 h-40 w-full group relative">
            <iframe 
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3807.039600103764!2d78.43363847585!3d17.43043628346399!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bcb90d3e530f4e7%3A0x6960fc7291ae1cf6!2sPulse8%20Gym%20-%20Top%20Gym%20Centre%20in%20Srinagar%20Colony!5e0!3m2!1sen!2sin!4v1713967300000!5m2!1sen!2sin" 
              width="100%" 
              height="100%" 
              style={{ border: 0, filter: 'grayscale(1) invert(0.9) contrast(1.2)' }} 
              allowFullScreen={true} 
              loading="lazy" 
              referrerPolicy="no-referrer-when-downgrade"
              title="Pulse8 Gym Location"
            ></iframe>
            <div className="absolute inset-0 pointer-events-none border border-white/5 rounded-2xl shadow-inner"></div>
          </div>
        </div>

        <div>
          <h4 className="text-white font-black mb-6 tracking-widest text-sm uppercase">Operation Hours</h4>
          <ul className="space-y-4">
            <li className="flex items-start gap-3">
              <Clock className="text-pulse-red shrink-0" size={18} />
              <div>
                <p className="text-white text-sm font-bold">Morning Shifts</p>
                <p className="text-slate-500 text-sm">5:00 AM - 12:00 PM</p>
              </div>
            </li>
            <li className="flex items-start gap-3">
              <Clock className="text-pulse-red shrink-0" size={18} />
              <div>
                <p className="text-white text-sm font-bold">Evening Shifts</p>
                <p className="text-slate-500 text-sm">4:00 PM - 10:00 PM</p>
              </div>
            </li>
          </ul>
        </div>

        <div>
          <h4 className="text-white font-black mb-6 tracking-widest text-sm uppercase">Connect</h4>
          <ul className="space-y-4">
            <li className="flex items-start gap-3">
              <MapPin className="text-pulse-red shrink-0" size={18} />
              <a 
                href="https://maps.app.goo.gl/Crq8DDAkb2UivLca8" 
                target="_blank" 
                className="text-slate-500 hover:text-white text-sm leading-relaxed"
              >
                4th Floor above Karachi Bakery, Srinagar Colony Main Road.
              </a>
            </li>
            <li className="flex items-start gap-3">
              <Phone className="text-pulse-red shrink-0" size={18} />
              <div className="space-y-1">
                <a href="tel:04040202888" className="block text-white text-sm font-bold">040-40202888</a>
                <a href="tel:8247346192" className="block text-slate-500 text-sm hover:text-white">8247346192</a>
              </div>
            </li>
          </ul>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 pt-10 border-t border-white/5 flex flex-col md:row items-center justify-between gap-6">
        <p className="text-slate-600 text-xs font-bold uppercase tracking-widest">© 2026 PULSE8 GYM. ALL RIGHTS RESERVED.</p>
        <div className="flex gap-8">
          <a href="#" className="text-slate-600 text-xs hover:text-white tracking-widest uppercase font-bold">Privacy</a>
          <a href="#" className="text-slate-600 text-xs hover:text-white tracking-widest uppercase font-bold">Terms</a>
        </div>
      </div>
    </footer>
  );
};

export default function App() {
  return (
    <div className="bg-slate-950 min-h-screen selection:bg-pulse-red/30">
      <Navbar />
      <main>
        <Hero />
        
        {/* Philosophy Intro */}
        <section id="philosophy" className="py-24 max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="space-y-4"
            >
              <div className="w-12 h-12 glass rounded-2xl flex items-center justify-center text-pulse-red shadow-lg">
                <Target size={24} />
              </div>
              <h3 className="text-xl font-bold text-white uppercase tracking-tight">Precision Focused</h3>
              <p className="text-slate-400 text-sm leading-relaxed">
                Biomechanical accuracy is at our core. Every machine and program is selected to maximize muscle activation and minimize injury risk.
              </p>
            </motion.div>
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="space-y-4"
            >
              <div className="w-12 h-12 glass rounded-2xl flex items-center justify-center text-pulse-red shadow-lg">
                <Zap size={24} />
              </div>
              <h3 className="text-xl font-bold text-white uppercase tracking-tight">High Energy</h3>
              <p className="text-slate-400 text-sm leading-relaxed">
                A high-octane environment curated with elite acoustics and lighting to keep your dopamine and adrenaline at peak performance.
              </p>
            </motion.div>
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="space-y-4"
            >
              <div className="w-12 h-12 glass rounded-2xl flex items-center justify-center text-pulse-red shadow-lg">
                <ShieldCheck size={24} />
              </div>
              <h3 className="text-xl font-bold text-white uppercase tracking-tight">Certified Elite</h3>
              <p className="text-slate-400 text-sm leading-relaxed">
                Our coaches aren't just trainers; they are movement specialists certified by global bodies, ready to push you beyond your perceived limits.
              </p>
            </motion.div>
          </div>
        </section>

        <Vault />
        <Memberships />
        <CalculatorAndForm />
      </main>
      <Footer />
    </div>
  );
}
