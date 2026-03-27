import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { Link } from 'react-router-dom';
import { 
  Music, 
  Disc, 
  ShoppingBag, 
  Layers, 
  Zap, 
  Globe, 
  ArrowDown, 
  ArrowLeft, 
  Smartphone, 
  RotateCw,
  Pocket,
  Volume2,
  Headphones,
  Radio
} from 'lucide-react';
import { useTheme } from './ThemeProvider';

const FadeIn: React.FC<{ children: React.ReactNode; delay?: number; className?: string; direction?: 'up' | 'down' | 'left' | 'right' }> = ({ children, delay = 0, className = "", direction = 'up' }) => {
  const directions = {
    up: { y: 40 },
    down: { y: -40 },
    left: { x: 40 },
    right: { x: -40 }
  };

  return (
    <motion.div
      initial={{ opacity: 0, ...directions[direction] }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 1.2, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

export const Story2001: React.FC = () => {
  const { theme } = useTheme();
  const { scrollYProgress } = useScroll();

  const heroY = useTransform(scrollYProgress, [0, 0.2], [0, -100]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.15], [1, 0]);

  return (
    <div className={`w-full overflow-hidden ${theme === 'dark' ? 'bg-black text-white' : 'bg-white text-black'}`}>
      {/* Navigation */}
      <div className="fixed top-8 left-8 z-50">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5 }}
        >
          <Link 
            to="/journey#2001" 
            className={`inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest transition-all p-2 rounded-full backdrop-blur-md border ${theme === 'dark' ? 'text-white/50 hover:text-white border-white/10 bg-black/20' : 'text-black/50 hover:text-black border-black/10 bg-white/20'}`}
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="hidden md:inline">Back to Journey</span>
          </Link>
        </motion.div>
      </div>

      {/* Hero Section */}
      <section className="relative min-h-screen flex flex-col items-center justify-center text-center px-6 overflow-hidden">
        <motion.div 
          style={{ y: heroY, opacity: heroOpacity }}
          className="max-w-5xl relative z-10"
        >
          <FadeIn>
            <span className={`text-[10px] md:text-[12px] font-mono uppercase tracking-[0.6em] mb-8 block transition-colors duration-500 ${theme === 'dark' ? 'text-white/40' : 'text-black/40'}`}>The Digital Music Revolution</span>
            <h1 className="text-4xl md:text-7xl lg:text-8xl font-light tracking-tighter leading-[0.9] mb-16">
              1,000 Songs <br /> 
              <span className="relative inline-block">
                In Your
                <motion.span 
                  initial={{ width: 0 }}
                  whileInView={{ width: '100%' }}
                  transition={{ duration: 1, delay: 0.5 }}
                  className={`absolute bottom-2 left-0 h-[1px] -z-10 ${theme === 'dark' ? 'bg-white/20' : 'bg-black/20'}`}
                />
              </span>
              <br />
              <span className="italic font-bold underline underline-offset-[12px] decoration-white/20">Pocket</span>
            </h1>
          </FadeIn>
          
          <div className={`max-w-2xl mx-auto space-y-6 text-lg md:text-xl font-light leading-relaxed transition-colors duration-500 ${theme === 'dark' ? 'text-white/40' : 'text-black/40'}`}>
            <FadeIn delay={0.4}><p>A turning point for a company.</p></FadeIn>
            <FadeIn delay={0.6}><p>A revolution for an industry.</p></FadeIn>
            <FadeIn delay={0.8}><p className={`transition-colors duration-500 ${theme === 'dark' ? 'text-white/80' : 'text-black/80'}`}>A new way to carry the soundtrack of your life.</p></FadeIn>
          </div>

          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5, duration: 1 }}
            className="mt-24"
          >
            <motion.div
              animate={{ y: [0, 12, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              className={`w-px h-24 mx-auto ${theme === 'dark' ? 'bg-gradient-to-b from-white/20 to-transparent' : 'bg-gradient-to-b from-black/20 to-transparent'}`}
            />
          </motion.div>
        </motion.div>

        {/* Background Decorative Elements - Simplified */}
        <div className="absolute inset-0 -z-10 overflow-hidden pointer-events-none">
          <motion.div 
            style={{ rotate: 45, y: useTransform(scrollYProgress, [0, 1], [0, 200]) }}
            className={`absolute -top-1/4 -right-1/4 w-[800px] h-[800px] rounded-full blur-[120px] opacity-10 ${theme === 'dark' ? 'bg-white/5' : 'bg-black/5'}`}
          />
        </div>
      </section>

      {/* Context — “Clarity in Chaos” */}
      <section className={`py-40 px-6 transition-colors duration-500 relative ${theme === 'dark' ? 'bg-black' : 'bg-white'}`}>
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
            <div className={`space-y-10 text-lg md:text-xl font-light leading-relaxed transition-colors duration-500 ${theme === 'dark' ? 'text-white/50' : 'text-black/50'}`}>
              <FadeIn direction="right">
                <p>In the early 2000s, Apple was still recovering from years of instability. Though revitalized by Steve Jobs’ return and the success of the iMac, it remained a niche player in the broader tech industry.</p>
              </FadeIn>
              <FadeIn direction="right" delay={0.2}>
                <p>At the same time, the music world was in turmoil. The rise of MP3 files and file-sharing platforms like Napster had disrupted traditional models, leaving record labels scrambling and consumers navigating a fragmented digital experience.</p>
              </FadeIn>
              <FadeIn direction="right" delay={0.4}>
                <p className={`text-2xl md:text-4xl font-light tracking-tight leading-tight transition-colors duration-500 ${theme === 'dark' ? 'text-white' : 'text-black'}`}>
                  Steve Jobs saw <span className={`italic font-bold font-medium underline underline-offset-8 ${theme === 'dark' ? 'decoration-white/20' : 'decoration-black/20'}`}>clarity</span> where others saw chaos.
                </p>
              </FadeIn>
            </div>

            <FadeIn direction="left" className="relative aspect-square">
              <div className={`absolute inset-0 rounded-[3rem] border transition-colors duration-500 ${theme === 'dark' ? 'bg-zinc-900/30 border-white/5' : 'bg-zinc-100 border-black/5'}`} />
              <div className="absolute inset-12 flex items-center justify-center overflow-hidden rounded-[2rem]">
                <div className="grid grid-cols-10 gap-2 w-full h-full opacity-10">
                  {Array.from({ length: 100 }).map((_, i) => (
                    <motion.div 
                      key={i} 
                      initial={{ opacity: 0.1 }}
                      animate={{ opacity: [0.1, 0.3, 0.1] }}
                      transition={{ duration: Math.random() * 3 + 2, repeat: Infinity, delay: Math.random() * 2 }}
                      className={`aspect-square rounded-sm ${theme === 'dark' ? 'bg-white/20' : 'bg-black/20'}`} 
                    />
                  ))}
                </div>
                <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-12 backdrop-blur-sm">
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                    className="relative mb-8"
                  >
                    <Disc className={`w-24 h-24 ${theme === 'dark' ? 'text-white/40' : 'text-black/40'}`} />
                  </motion.div>
                  <p className="font-mono text-[9px] uppercase tracking-[0.4em] opacity-30">Fragmented Digital Experience</p>
                </div>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* The Vision — “Radically Simpler” */}
      <section className="py-40 px-6 relative overflow-hidden">
        <div className="max-w-5xl mx-auto text-center relative z-10">
          <FadeIn>
            <div className={`inline-flex p-6 rounded-2xl mb-12 border backdrop-blur-xl transition-colors duration-500 ${theme === 'dark' ? 'bg-white/5 border-white/10 text-white/60' : 'bg-black/5 border-black/10 text-black/60'}`}>
              <Zap size={32} />
            </div>
            <h2 className="text-3xl md:text-5xl font-light tracking-tighter mb-12">Radically Simpler.</h2>
          </FadeIn>

          <div className={`max-w-3xl mx-auto space-y-10 text-lg md:text-xl font-light leading-relaxed transition-colors duration-500 mb-24 ${theme === 'dark' ? 'text-white/50' : 'text-black/50'}`}>
            <FadeIn>
              <p>Rather than building just another MP3 player, Jobs envisioned a complete, seamless music experience—one that combined elegant hardware, intuitive software, and easy access to content.</p>
            </FadeIn>
            <FadeIn delay={0.2}>
              <p>Existing players were clunky and limited. Jobs wanted something radically simpler: a device that made music feel personal, accessible, and effortless.</p>
            </FadeIn>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {[
              { title: "Personal", description: "Your entire collection, everywhere.", icon: <Music className="w-6 h-6" /> },
              { title: "Accessible", icon: <Globe className="w-6 h-6" />, description: "Music for everyone, simplified." },
              { title: "Effortless", icon: <Zap className="w-6 h-6" />, description: "Just plug in and play." }
            ].map((item, i) => (
              <FadeIn key={i} delay={i * 0.2} direction="up">
                <motion.div 
                  whileHover={{ y: -5 }}
                  className={`p-10 rounded-[2rem] border transition-all duration-500 group ${theme === 'dark' ? 'bg-zinc-900/30 border-white/5 hover:bg-zinc-900' : 'bg-zinc-50 border-black/5 hover:bg-zinc-100'}`}
                >
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-8 transition-colors duration-500 ${theme === 'dark' ? 'bg-white/5 group-hover:bg-white/10' : 'bg-black/5 group-hover:bg-black/10'}`}>
                    <div className={`transition-colors duration-500 ${theme === 'dark' ? 'text-white/40' : 'text-black/40'}`}>{item.icon}</div>
                  </div>
                  <h3 className="text-xl font-light tracking-tight mb-4">{item.title}</h3>
                  <p className="text-xs font-light opacity-40 leading-relaxed">{item.description}</p>
                </motion.div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Design & Innovation — “Invisible Design” */}
      <section className={`py-40 px-6 transition-colors duration-500 relative overflow-hidden ${theme === 'dark' ? 'bg-zinc-950' : 'bg-zinc-50'}`}>
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
            <FadeIn direction="right" className="order-2 lg:order-1 relative group">
              <div className="relative aspect-[4/5] rounded-[3rem] overflow-hidden shadow-2xl">
                <img 
                  src="https://picsum.photos/seed/ipod-design/800/1000?grayscale" 
                  alt="iPod Design Precision" 
                  className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                <div className="absolute bottom-12 left-12 right-12">
                  
                  <p className="text-xl md:text-2xl font-light text-white leading-tight tracking-tight italic font-bold">"Design should serve the user invisibly."</p>
                </div>
              </div>
            </FadeIn>

            <div className={`order-1 lg:order-2 space-y-10 text-lg md:text-xl font-light leading-relaxed transition-colors duration-500 ${theme === 'dark' ? 'text-white/50' : 'text-black/50'}`}>
              <FadeIn direction="left">
                <p>Working closely with Apple’s engineers and designers, Jobs pushed for precision and simplicity at every level. He obsessed over how the device would feel in the hand, how quickly it would respond, and how easily users could navigate their music.</p>
              </FadeIn>
              <FadeIn direction="left" delay={0.2}>
                <p>This led to innovations like the click wheel, which allowed users to scroll smoothly through large libraries—a small but transformative detail that reflected Jobs’ belief that design should serve the user invisibly.</p>
              </FadeIn>
              <FadeIn direction="left" delay={0.4}>
                <div className={`p-8 rounded-2xl border border-dashed transition-colors duration-500 ${theme === 'dark' ? 'border-white/10' : 'border-black/10'}`}>
                  <p className="text-[9px] font-mono uppercase tracking-widest opacity-30 mb-4">Core Philosophy</p>
                  <p className={`text-xl font-light tracking-tight transition-colors duration-500 ${theme === 'dark' ? 'text-white' : 'text-black'}`}>
                    Simplicity is the ultimate sophistication.
                  </p>
                </div>
              </FadeIn>
            </div>
          </div>
        </div>
      </section>

      {/* The Reveal — “1,000 Songs” */}
      <section className="relative py-60 px-6 bg-black text-white overflow-hidden">
        <motion.div 
          style={{ scale: useTransform(scrollYProgress, [0.5, 0.7], [1.1, 1]) }}
          className="absolute inset-0 opacity-20"
        >
          <img 
            src="https://picsum.photos/seed/ipod-launch/1920/1080?grayscale" 
            alt="iPod Launch 2001" 
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black via-transparent to-black" />
        </motion.div>
        
        <div className="max-w-5xl mx-auto relative z-10 text-center">
          <FadeIn>
            <span className="text-[10px] font-mono uppercase tracking-[0.6em] mb-8 block text-white/40">October 23, 2001</span>
            <h2 className="text-4xl md:text-7xl font-light tracking-tighter mb-16 leading-none">The Masterstroke.</h2>
          </FadeIn>

          <div className="max-w-3xl mx-auto space-y-10 text-lg md:text-xl font-light text-white/50 leading-relaxed mb-24">
            <FadeIn>
              <p>When the iPod was unveiled in October 2001, Jobs introduced it not with technical jargon, but with a phrase that would define its legacy.</p>
            </FadeIn>
            <FadeIn delay={0.2}>
              <p>It was a masterstroke of communication. Instead of focusing on storage capacity, Jobs translated the technology into a clear human benefit—<span className="text-white">freedom</span>. The freedom to carry your entire music collection anywhere, anytime.</p>
            </FadeIn>
          </div>

          <FadeIn delay={0.4}>
            <motion.div 
              whileHover={{ scale: 1.01 }}
              className="inline-flex flex-col md:flex-row items-center gap-10 p-10 rounded-[3rem] bg-white/5 border border-white/10 backdrop-blur-2xl shadow-2xl"
            >
              <div className="p-6 rounded-2xl bg-white/5 border border-white/10">
                <Pocket className="w-12 h-12 text-white/60" />
              </div>
              <div className="text-center md:text-left">
                <p className="text-4xl md:text-7xl font-medium tracking-tighter mb-2">Freedom.</p>
                <div className="flex flex-wrap justify-center md:justify-start gap-4">
                  <span className="text-[9px] font-mono uppercase tracking-[0.3em] text-white/30">Anywhere.</span>
                  <span className="text-[9px] font-mono uppercase tracking-[0.3em] text-white/30">Anytime.</span>
                </div>
              </div>
            </motion.div>
          </FadeIn>
        </div>
      </section>

      {/* Ecosystem — “Deeply Integrated” */}
      <section className="py-40 px-6 relative overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-32 items-center">
            <div className={`space-y-12 text-lg md:text-xl font-light leading-relaxed transition-colors duration-500 ${theme === 'dark' ? 'text-white/50' : 'text-black/50'}`}>
              <FadeIn direction="right">
                <p>But Jobs understood that the device alone was not enough. To truly change the industry, Apple needed to solve how people acquired and managed music. This led to the development of iTunes and, in 2003, the iTunes Store.</p>
              </FadeIn>
              <FadeIn direction="right" delay={0.2}>
                <p>Jobs negotiated directly with major record labels, convincing them to embrace digital distribution through a simple, legal model—songs priced at 99 cents.</p>
              </FadeIn>
              <FadeIn direction="right" delay={0.4}>
                <p>The result was a tightly integrated ecosystem: the iPod, iTunes software, and the iTunes Store working together seamlessly. Users could discover, purchase, organize, and sync music with unprecedented ease.</p>
              </FadeIn>
              <FadeIn direction="right" delay={0.6}>
                <p className={`text-2xl md:text-4xl font-light tracking-tight leading-tight transition-colors duration-500 ${theme === 'dark' ? 'text-white' : 'text-black'}`}>
                  Technology should be simple because it is <span className={`italic font-bold font-medium underline underline-offset-8 ${theme === 'dark' ? 'decoration-white/20' : 'decoration-black/20'}`}>deeply integrated.</span>
                </p>
              </FadeIn>
            </div>

            <div className="relative">
              <div className="grid grid-cols-1 gap-8 relative z-10">
                {[
                  { label: "Hardware", title: "iPod", icon: <Smartphone className="w-6 h-6" />, desc: "The perfect vessel." },
                  { label: "Software", title: "iTunes", icon: <Layers className="w-6 h-6" />, desc: "The digital hub." },
                  { label: "Content", title: "iTunes Store", icon: <ShoppingBag className="w-6 h-6" />, desc: "The library of the world." }
                ].map((item, i) => (
                  <FadeIn key={i} delay={i * 0.2} direction="left">
                    <motion.div 
                      whileHover={{ x: 10 }}
                      className={`p-8 rounded-[2.5rem] border flex items-center gap-8 transition-all duration-500 group ${theme === 'dark' ? 'bg-zinc-900/30 border-white/5 hover:bg-zinc-900' : 'bg-zinc-50 border-black/5 hover:bg-zinc-100'}`}
                    >
                      <div className={`w-16 h-16 rounded-2xl flex items-center justify-center transition-colors duration-500 ${theme === 'dark' ? 'bg-white/5 group-hover:bg-white/10' : 'bg-black/5 group-hover:bg-black/10'}`}>
                        <div className={`transition-colors duration-500 ${theme === 'dark' ? 'text-white/40' : 'text-black/40'}`}>{item.icon}</div>
                      </div>
                      <div>
                        <p className="text-[9px] font-mono uppercase tracking-[0.3em] opacity-30 mb-2">{item.label}</p>
                        <p className="text-2xl font-light tracking-tight mb-1">{item.title}</p>
                        <p className="text-[10px] font-light opacity-30">{item.desc}</p>
                      </div>
                    </motion.div>
                  </FadeIn>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Impact — “Reshaping Consumption” */}
      <section className={`py-40 px-6 transition-colors duration-500 relative overflow-hidden ${theme === 'dark' ? 'bg-zinc-950' : 'bg-zinc-50'}`}>
        <div className="max-w-5xl mx-auto text-center">
          <div className={`max-w-4xl mx-auto space-y-12 text-lg md:text-2xl font-light leading-relaxed transition-colors duration-500 mb-24 ${theme === 'dark' ? 'text-white/50' : 'text-black/50'}`}>
            <FadeIn>
              <p>The impact was profound. Music was no longer tied to CDs or radio schedules. People could curate their own libraries, explore new artists, and carry their personal soundtrack everywhere.</p>
            </FadeIn>
            <FadeIn delay={0.2}>
              <p className={`text-2xl md:text-5xl font-light tracking-tighter leading-tight transition-colors duration-500 ${theme === 'dark' ? 'text-white' : 'text-black'}`}>
                Apple didn’t just create a product—it <span className={`italic font-bold font-medium underline underline-offset-8 ${theme === 'dark' ? 'decoration-white/20' : 'decoration-black/20'}`}>reshaped</span> how music was consumed.
              </p>
            </FadeIn>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { label: "Curate.", icon: <Layers className={`w-5 h-5 mb-4 mx-auto ${theme === 'dark' ? 'text-white/40' : 'text-black/40'}`} /> },
              { label: "Explore.", icon: <Globe className={`w-5 h-5 mb-4 mx-auto ${theme === 'dark' ? 'text-white/40' : 'text-black/40'}`} /> },
              { label: "Carry.", icon: <Pocket className={`w-5 h-5 mb-4 mx-auto ${theme === 'dark' ? 'text-white/40' : 'text-black/40'}`} /> },
              { label: "Sync.", icon: <RotateCw className={`w-5 h-5 mb-4 mx-auto ${theme === 'dark' ? 'text-white/40' : 'text-black/40'}`} /> }
            ].map((item, i) => (
              <FadeIn key={i} delay={i * 0.1} direction="up">
                <motion.div 
                  whileHover={{ scale: 1.02 }}
                  className={`p-8 rounded-[2rem] border transition-all duration-500 ${theme === 'dark' ? 'bg-zinc-900/30 border-white/5 hover:bg-zinc-900' : 'bg-zinc-50 border-black/5 hover:bg-zinc-100'}`}
                >
                  {item.icon}
                  <span className="text-[9px] font-mono uppercase tracking-[0.5em] opacity-40">{item.label}</span>
                </motion.div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Legacy — “The Turning Point” */}
      <section className="py-60 px-6 text-center relative overflow-hidden">
        <div className="max-w-5xl mx-auto relative z-10">
          <FadeIn>
            <div className={`inline-flex p-8 rounded-[2rem] mb-16 border backdrop-blur-xl transition-colors duration-500 ${theme === 'dark' ? 'bg-white/5 border-white/10 text-white/40' : 'bg-black/5 border-black/10 text-black/40'}`}>
              <Globe size={48} />
            </div>
          </FadeIn>

          <div className={`max-w-4xl mx-auto space-y-12 text-lg md:text-2xl font-light leading-relaxed mb-32 transition-colors duration-500 ${theme === 'dark' ? 'text-white/50' : 'text-black/50'}`}>
            <FadeIn>
              <p>For Apple, the iPod marked a turning point. It expanded the company beyond computers and introduced millions to the Apple ecosystem.</p>
            </FadeIn>
            <FadeIn delay={0.2}>
              <p>More importantly, it laid the technological and strategic foundation for future innovations. The expertise gained in hardware design, software integration, and digital distribution would later converge in the iPhone—arguably Apple’s most transformative product.</p>
            </FadeIn>
            <FadeIn delay={0.4}>
              <p>The iPod was more than a device. It was a reflection of Steve Jobs’ core belief: that technology should be simple, meaningful, and human-centered.</p>
            </FadeIn>
            <FadeIn delay={0.6}>
              <p className={`text-2xl md:text-5xl font-light tracking-tighter leading-tight transition-colors duration-500 ${theme === 'dark' ? 'text-white' : 'text-black'}`}>
                By putting “1,000 songs in your pocket,” Jobs didn’t just revolutionize music—he <span className={`italic font-bold font-medium underline underline-offset-8 ${theme === 'dark' ? 'decoration-white/20' : 'decoration-black/20'}`}>redefined</span> the relationship between people and technology.
              </p>
            </FadeIn>
          </div>

          <FadeIn delay={0.8}>
            <div className="relative inline-block group">
              <p className={`text-5xl md:text-8xl lg:text-[10rem] font-light tracking-tighter uppercase leading-none transition-transform duration-700 group-hover:scale-105 ${theme === 'dark' ? 'text-white/80' : 'text-black/80'}`}>
                A NEW ERA.
              </p>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* References */}
      <section className={`py-20 px-6 transition-colors duration-500 ${theme === 'dark' ? 'bg-zinc-950' : 'bg-zinc-50'}`}>
        <div className="max-w-4xl mx-auto">
          <FadeIn>
            <h3 className="text-xs font-mono uppercase tracking-[0.4em] mb-12 opacity-40">References</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {[
                "Isaacson, Walter. Steve Jobs. Simon & Schuster, 2011.",
                "Apple Inc. (2001). “Apple Introduces iPod.” Official Press Release.",
                "Apple Inc. (2003). “Apple Launches the iTunes Music Store.” Official Press Release.",
                "Levy, Steven. The Perfect Thing: How the iPod Shuffles Commerce, Culture, and Coolness. Simon & Schuster, 2006.",
                "Kahney, Leander. Inside Steve’s Brain. Portfolio, 2008.",
                "The New York Times. “Apple’s iTunes Store Sells Music for 99 Cents” (2003)."
              ].map((ref, i) => (
                <div key={i} className="flex gap-4 items-start group">
                  <span className="text-[10px] font-mono opacity-20 mt-1">{i + 1}</span>
                  <p className="text-sm font-light leading-relaxed opacity-60 group-hover:opacity-100 transition-opacity">{ref}</p>
                </div>
              ))}
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Footer Navigation */}
      <section className="py-20 px-6 text-center border-t border-current/10">
        <FadeIn>
          <Link 
            to="/journey" 
            className={`inline-flex items-center gap-6 px-10 py-5 rounded-full text-xs md:text-sm font-medium uppercase tracking-[0.2em] transition-all duration-500 ${
              theme === 'dark' 
                ? 'bg-white text-black hover:shadow-[0_0_30px_rgba(255,255,255,0.15)]' 
                : 'bg-black text-white hover:shadow-[0_0_30px_rgba(0,0,0,0.15)]'
            }`}
          >
            Continue the Journey
            <Smartphone size={18} />
          </Link>
        </FadeIn>
      </section>
    </div>
  );
};
