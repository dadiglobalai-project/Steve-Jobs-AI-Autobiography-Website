import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { Link } from 'react-router-dom';
import { 
  Monitor, 
  Mouse, 
  Layout, 
  Terminal, 
  Hammer, 
  Sparkles, 
  ArrowDown, 
  ArrowLeft, 
  Users, 
  Cpu, 
  Rocket, 
  Globe,
  Zap,
  Layers,
  MessageSquare,
  Smile,
  Eye,
  ShieldCheck,
  Heart,
  History
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

export const Story1984: React.FC = () => {
  const { theme } = useTheme();
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const heroY = useTransform(scrollYProgress, [0, 0.2], [0, -100]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.15], [1, 0]);

  return (
    <div ref={containerRef} className={`w-full overflow-hidden ${theme === 'dark' ? 'bg-black text-white' : 'bg-white text-black'}`}>
      {/* Navigation */}
      <div className="fixed top-8 left-8 z-50">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5 }}
        >
          <Link 
            to="/journey#1984" 
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
            <span className={`text-[10px] md:text-[12px] font-mono uppercase tracking-[0.6em] mb-8 block transition-colors duration-500 ${theme === 'dark' ? 'text-white/40' : 'text-black/40'}`}>January 1984</span>
            <h1 className="text-4xl md:text-7xl lg:text-8xl font-light tracking-tighter leading-[0.9] mb-16">
              A Machine <br /> 
              <span className="relative inline-block">
                For The
                <motion.span 
                  initial={{ width: 0 }}
                  whileInView={{ width: '100%' }}
                  transition={{ duration: 1, delay: 0.5 }}
                  className={`absolute bottom-2 left-0 h-[1px] -z-10 ${theme === 'dark' ? 'bg-white/20' : 'bg-black/20'}`}
                />
              </span>
              <br />
              <span className="italic font-bold underline underline-offset-[12px] decoration-white/20">Rest of Us</span>
            </h1>
          </FadeIn>
          
          <div className={`max-w-2xl mx-auto space-y-6 text-lg md:text-xl font-light leading-relaxed transition-colors duration-500 ${theme === 'dark' ? 'text-white/40' : 'text-black/40'}`}>
            <FadeIn delay={0.4}><p>The birth of the Macintosh.</p></FadeIn>
            <FadeIn delay={0.6}><p>The democratization of computing.</p></FadeIn>
            <FadeIn delay={0.8}><p className={`transition-colors duration-500 ${theme === 'dark' ? 'text-white/80' : 'text-black/80'}`}>The moment technology became human.</p></FadeIn>
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

        {/* Background Decorative Elements */}
        <div className="absolute inset-0 -z-10 overflow-hidden pointer-events-none">
          <motion.div 
            style={{ rotate: 45, y: useTransform(scrollYProgress, [0, 1], [0, 200]) }}
            className={`absolute -top-1/4 -right-1/4 w-[800px] h-[800px] rounded-full blur-[120px] opacity-10 ${theme === 'dark' ? 'bg-white/5' : 'bg-black/5'}`}
          />
        </div>
      </section>

      {/* Section 1: The Intimidating Era */}
      <section className={`py-40 px-6 transition-colors duration-500 relative ${theme === 'dark' ? 'bg-black' : 'bg-white'}`}>
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
            <div className={`space-y-10 text-lg md:text-xl font-light leading-relaxed transition-colors duration-500 ${theme === 'dark' ? 'text-white/50' : 'text-black/50'}`}>
              <FadeIn direction="right">
                <p>In the late 1970s and early 1980s, personal computers were still unfamiliar, even intimidating, to most people.</p>
              </FadeIn>
              <FadeIn direction="right" delay={0.2}>
                <p>Machines like the Apple II and IBM PC were powerful for their time, but they required users to type commands into a blank screen. There were no icons, no mouse, and very little guidance.</p>
              </FadeIn>
              <FadeIn direction="right" delay={0.4}>
                <p className={`text-2xl md:text-4xl font-light tracking-tight leading-tight transition-colors duration-500 ${theme === 'dark' ? 'text-white' : 'text-black'}`}>
                  To many, computers felt like tools for <span className="italic font-bold">experts</span>, engineers, hobbyists, and businesses, not something an ordinary person could easily use at home.
                </p>
              </FadeIn>
              <FadeIn direction="right" delay={0.6}>
                <p className="text-blue-500 font-medium">Steve Jobs wanted to change that.</p>
              </FadeIn>
            </div>

            <FadeIn direction="left" className="relative aspect-square">
              <div className={`absolute inset-0 rounded-[3rem] border transition-colors duration-500 ${theme === 'dark' ? 'bg-zinc-900/30 border-white/5' : 'bg-zinc-100 border-black/5'}`} />
              <div className="absolute inset-12 flex items-center justify-center overflow-hidden rounded-[2rem] bg-black">
                <div className="font-mono text-green-500 text-xs md:text-sm p-8 leading-relaxed w-full h-full flex flex-col justify-center">
                  <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ duration: 0.5 }}
                  >
                    <p className="mb-2">C:\&gt; RUN SYSTEM_DIAGNOSTICS</p>
                    <p className="mb-2">ERROR: UNKNOWN COMMAND</p>
                    <p className="mb-2">C:\&gt; _</p>
                  </motion.div>
                  <div className="mt-12 opacity-10 text-[6px] md:text-[8px] select-none">
                    {Array.from({ length: 20 }).map((_, i) => (
                      <p key={i} className="whitespace-nowrap">01010111 01001000 01001111 00100000 01001001 01010011 00100000 01010100 01001000 01001001 01010011 00100000 01000110 01001111 01010010 00111111</p>
                    ))}
                  </div>
                </div>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Section 2: The Inspiration */}
      <section className="py-40 px-6 relative overflow-hidden">
        <div className="max-w-5xl mx-auto text-center relative z-10">
          <FadeIn>
            <div className={`inline-flex p-6 rounded-2xl mb-12 border backdrop-blur-xl transition-colors duration-500 ${theme === 'dark' ? 'bg-white/5 border-white/10 text-white/60' : 'bg-black/5 border-black/10 text-black/60'}`}>
              <Sparkles size={32} />
            </div>
            <h2 className="text-3xl md:text-5xl font-light tracking-tighter mb-12">The Inspiration.</h2>
          </FadeIn>

          <div className={`max-w-3xl mx-auto space-y-10 text-lg md:text-xl font-light leading-relaxed transition-colors duration-500 mb-24 ${theme === 'dark' ? 'text-white/50' : 'text-black/50'}`}>
            <FadeIn>
              <p>After visiting Xerox PARC in 1979, Jobs saw something that deeply inspired him: a computer interface that used windows, icons, and a pointing device called a mouse.</p>
            </FadeIn>
            <FadeIn delay={0.2}>
              <p>Instead of typing commands, users could simply point and click. Jobs immediately understood the potential. This was not just a new feature, it was a new way of interacting with technology.</p>
            </FadeIn>
            <FadeIn delay={0.4}>
              <p className={`text-2xl md:text-4xl font-light tracking-tight leading-tight transition-colors duration-500 ${theme === 'dark' ? 'text-white' : 'text-black'}`}>
                He returned to Apple determined to bring this idea to the <span className="italic font-bold">mass market.</span>
              </p>
            </FadeIn>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {[
              { title: "Windows", description: "Visual containers for work.", icon: <Layout className="w-6 h-6" /> },
              { title: "Icons", icon: <Layers className="w-6 h-6" />, description: "Intuitive symbols for files." },
              { title: "Mouse", icon: <Mouse className="w-6 h-6" />, description: "The bridge between human and machine." }
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

      {/* Section 3: The Vision */}
      <section className={`py-40 px-6 transition-colors duration-500 relative overflow-hidden ${theme === 'dark' ? 'bg-zinc-950' : 'bg-zinc-50'}`}>
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
            <FadeIn direction="right" className="order-2 lg:order-1 relative group">
              <div className="relative aspect-[4/5] rounded-[3rem] overflow-hidden shadow-2xl">
                <img 
                  src="https://picsum.photos/seed/macintosh-vision/800/1000?grayscale" 
                  alt="Macintosh Vision" 
                  className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                <div className="absolute bottom-12 left-12 right-12">
                  <p className="text-xl md:text-2xl font-light text-white leading-tight tracking-tight italic font-bold">"Technology should not make people feel stupid, it should make them feel empowered."</p>
                </div>
              </div>
            </FadeIn>

            <div className={`order-1 lg:order-2 space-y-10 text-lg md:text-xl font-light leading-relaxed transition-colors duration-500 ${theme === 'dark' ? 'text-white/50' : 'text-black/50'}`}>
              <FadeIn direction="left">
                <p>The Macintosh project began as a small, almost hidden effort inside Apple. Jobs soon took control of it and reshaped it with his own vision.</p>
              </FadeIn>
              <FadeIn direction="left" delay={0.2}>
                <p>He believed computers should be simple, friendly, and even enjoyable to use. More importantly, they should feel human.</p>
              </FadeIn>
              <FadeIn direction="left" delay={0.4}>
                <p className={`text-2xl md:text-4xl font-light tracking-tight leading-tight transition-colors duration-500 ${theme === 'dark' ? 'text-white' : 'text-black'}`}>
                  This belief guided every decision he made.
                </p>
              </FadeIn>
              <FadeIn direction="left" delay={0.6}>
                <div className={`p-8 rounded-2xl border border-dashed transition-colors duration-500 ${theme === 'dark' ? 'border-white/10' : 'border-black/10'}`}>
                  <p className="text-[9px] font-mono uppercase tracking-widest opacity-30 mb-4">Core Philosophy</p>
                  <p className={`text-xl font-light tracking-tight transition-colors duration-500 ${theme === 'dark' ? 'text-white' : 'text-black'}`}>
                    Simple. Friendly. Enjoyable. Human.
                  </p>
                </div>
              </FadeIn>
            </div>
          </div>
        </div>
      </section>

      {/* Section 4 & 5: The Craftsmanship & Leadership */}
      <section className="py-40 px-6 relative overflow-hidden">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-24">
            <FadeIn>
              <h2 className="text-3xl md:text-5xl font-light tracking-tighter mb-12">The Relentless Pursuit.</h2>
            </FadeIn>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-20">
            <div className={`space-y-8 text-lg md:text-xl font-light leading-relaxed transition-colors duration-500 ${theme === 'dark' ? 'text-white/50' : 'text-black/50'}`}>
              <FadeIn direction="right">
                <p>Jobs pushed his team relentlessly. He demanded that the Macintosh be small, quiet, and beautiful. He insisted that it should turn on instantly and be ready to use without complicated setup.</p>
              </FadeIn>
              <FadeIn direction="right" delay={0.2}>
                <p>He even cared about parts of the computer that users would never see, believing that true craftsmanship meant paying attention to every detail.</p>
              </FadeIn>
              <FadeIn direction="right" delay={0.4}>
                <div className={`p-6 rounded-2xl border transition-colors duration-500 ${theme === 'dark' ? 'bg-white/5 border-white/10' : 'bg-black/5 border-black/10'}`}>
                  <Smile className="w-6 h-6 mb-4 opacity-40" />
                  <p className="text-sm italic">"Good enough" was never enough.</p>
                </div>
              </FadeIn>
            </div>

            <div className={`space-y-8 text-lg md:text-xl font-light leading-relaxed transition-colors duration-500 ${theme === 'dark' ? 'text-white/50' : 'text-black/50'}`}>
              <FadeIn direction="left">
                <p>His leadership style was intense. He could be demanding, even difficult, but he also inspired those around him to do their best work.</p>
              </FadeIn>
              <FadeIn direction="left" delay={0.2}>
                <p>He challenged engineers, designers, and programmers to go beyond what they thought was possible. For Jobs, the Macintosh was not just a product, it was a work of art.</p>
              </FadeIn>
              <FadeIn direction="left" delay={0.4}>
                <div className={`p-6 rounded-2xl border transition-colors duration-500 ${theme === 'dark' ? 'bg-white/5 border-white/10' : 'bg-black/5 border-black/10'}`}>
                  <Zap className="w-6 h-6 mb-4 opacity-40" />
                  <p className="text-sm italic">Inspired to do the impossible.</p>
                </div>
              </FadeIn>
            </div>
          </div>
        </div>
      </section>

      {/* Section 6: The Interface */}
      <section className={`py-40 px-6 transition-colors duration-500 relative overflow-hidden ${theme === 'dark' ? 'bg-zinc-950' : 'bg-zinc-50'}`}>
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
            <div className={`space-y-10 text-lg md:text-xl font-light leading-relaxed transition-colors duration-500 ${theme === 'dark' ? 'text-white/50' : 'text-black/50'}`}>
              <FadeIn direction="right">
                <p>One of his most important decisions was to make the graphical user interface—the system of pictures, windows, and menus—the heart of the Macintosh.</p>
              </FadeIn>
              <FadeIn direction="right" delay={0.2}>
                <p>Instead of typing commands, users could click on icons, open files visually, and move things around the screen. This made the computer far easier to understand, especially for beginners.</p>
              </FadeIn>
              <FadeIn direction="right" delay={0.4}>
                <p>Jobs also insisted on including the mouse, even though many people had never seen one before. He believed that once users experienced it, they would never want to go back.</p>
              </FadeIn>
              <FadeIn direction="right" delay={0.6}>
                <p className={`text-2xl md:text-4xl font-light tracking-tight leading-tight transition-colors duration-500 ${theme === 'dark' ? 'text-white' : 'text-black'}`}>
                  It was another example of his confidence in <span className="italic font-bold">shaping</span> what people would come to expect from technology.
                </p>
              </FadeIn>
            </div>

            <FadeIn direction="left" className="relative aspect-square">
              <div className={`absolute inset-0 rounded-[3rem] border transition-colors duration-500 ${theme === 'dark' ? 'bg-zinc-900/30 border-white/5' : 'bg-zinc-100 border-black/5'}`} />
              <div className="absolute inset-12 flex items-center justify-center overflow-hidden rounded-[2rem] bg-white">
                <div className="relative w-full h-full p-8 flex flex-col">
                  <div className="flex items-center justify-between mb-8">
                    <div className="flex gap-2">
                      <div className="w-3 h-3 rounded-full bg-red-400" />
                      <div className="w-3 h-3 rounded-full bg-yellow-400" />
                      <div className="w-3 h-3 rounded-full bg-green-400" />
                    </div>
                    <div className="text-[10px] font-mono text-black/40">Macintosh Desktop</div>
                  </div>
                  <div className="grid grid-cols-4 gap-6">
                    {Array.from({ length: 8 }).map((_, i) => (
                      <motion.div 
                        key={i}
                        whileHover={{ scale: 1.1 }}
                        className="flex flex-col items-center gap-2"
                      >
                        <div className="w-12 h-12 rounded-lg bg-zinc-200 flex items-center justify-center">
                          <Monitor className="w-6 h-6 text-black/40" />
                        </div>
                        <div className="w-12 h-1 bg-zinc-100 rounded-full" />
                      </motion.div>
                    ))}
                  </div>
                  <motion.div 
                    animate={{ x: [0, 100, 50, 0], y: [0, 50, 100, 0] }}
                    transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute bottom-20 right-20"
                  >
                    <Mouse className="w-8 h-8 text-blue-500" />
                  </motion.div>
                </div>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Section 7: The Declaration (1984 Ad) */}
      <section className="relative py-60 px-6 bg-black text-white overflow-hidden">
        <motion.div 
          style={{ scale: useTransform(scrollYProgress, [0.5, 0.7], [1.1, 1]) }}
          className="absolute inset-0 opacity-20"
        >
          <img 
            src="https://picsum.photos/seed/1984-commercial/1920/1080?grayscale" 
            alt="1984 Commercial" 
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black via-transparent to-black" />
        </motion.div>
        
        <div className="max-w-5xl mx-auto relative z-10 text-center">
          <FadeIn>
            <span className="text-[10px] font-mono uppercase tracking-[0.6em] mb-8 block text-white/40">The Super Bowl Moment</span>
            <h2 className="text-4xl md:text-7xl font-light tracking-tighter mb-16 leading-none">1984 Won't Be Like <span className="italic font-bold text-red-600">'1984'</span>.</h2>
          </FadeIn>

          <div className="max-w-3xl mx-auto space-y-10 text-lg md:text-xl font-light text-white/50 leading-relaxed mb-24">
            <FadeIn>
              <p>But Jobs knew that building a great product was only part of the challenge. He also had to introduce it to the world in a way that people would remember.</p>
            </FadeIn>
            <FadeIn delay={0.2}>
              <p>This led to one of the most famous advertisements in history, the “1984” Super Bowl commercial. Directed by Ridley Scott, the ad showed a gray, controlled world where people sat silently watching a large screen.</p>
            </FadeIn>
            <FadeIn delay={0.4}>
              <p>A lone woman runs in and shatters the screen, symbolizing freedom and change. The message was clear: Apple, and the Macintosh, would break the control of big, impersonal technology companies.</p>
            </FadeIn>
          </div>

          <FadeIn delay={0.6}>
            <motion.div 
              whileHover={{ scale: 1.05 }}
              className="inline-flex flex-col items-center gap-10 p-12 rounded-[3rem] bg-white/5 border border-white/10 backdrop-blur-2xl shadow-2xl"
            >
              <div className="p-8 rounded-full bg-red-600/20 border border-red-600/30 animate-pulse">
                <Hammer className="w-16 h-16 text-red-600" />
              </div>
              <div>
                <p className="text-2xl md:text-4xl font-light tracking-tight mb-4">A Symbol of Freedom.</p>
                <p className="text-[10px] font-mono uppercase tracking-[0.3em] text-white/30">Directed by Ridley Scott</p>
              </div>
            </motion.div>
          </FadeIn>
        </div>
      </section>

      {/* Section 8: The Launch */}
      <section className="py-40 px-6 relative overflow-hidden">
        <div className="max-w-4xl mx-auto text-center">
          <FadeIn>
            <h2 className="text-3xl md:text-5xl font-light tracking-tighter mb-12">"Hello, I'm Macintosh."</h2>
          </FadeIn>

          <div className={`max-w-3xl mx-auto space-y-10 text-lg md:text-xl font-light leading-relaxed transition-colors duration-500 mb-24 ${theme === 'dark' ? 'text-white/50' : 'text-black/50'}`}>
            <FadeIn>
              <p>The commercial aired only once during the Super Bowl, but it had a lasting impact. It positioned Apple as bold, creative, and different. More importantly, it introduced the Macintosh not just as a product, but as a symbol of a new way of thinking.</p>
            </FadeIn>
            <FadeIn delay={0.2}>
              <p>When the Macintosh was officially launched in January 1984, Jobs took the stage and let the computer speak for itself. In a carefully planned moment, the Macintosh displayed text and used a synthesized voice to greet the audience.</p>
            </FadeIn>
            <FadeIn delay={0.4}>
              <p className={`text-2xl md:text-4xl font-light tracking-tight leading-tight transition-colors duration-500 ${theme === 'dark' ? 'text-white' : 'text-black'}`}>
                It was simple, surprising, and <span className="italic font-bold">unforgettable.</span>
              </p>
            </FadeIn>
          </div>
          
          <FadeIn direction="up">
            <div className={`p-12 rounded-[3rem] border transition-colors duration-500 ${theme === 'dark' ? 'bg-zinc-900/30 border-white/5' : 'bg-zinc-50 border-black/5'}`}>
              <MessageSquare className="w-12 h-12 mx-auto mb-8 opacity-40" />
              <p className="text-3xl md:text-5xl font-light tracking-tighter italic">"Hello. I'm Macintosh. It sure is great to get out of that bag."</p>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Section 9: The Impact */}
      <section className={`py-40 px-6 transition-colors duration-500 relative overflow-hidden ${theme === 'dark' ? 'bg-zinc-950' : 'bg-zinc-50'}`}>
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
            <div className={`space-y-10 text-lg md:text-xl font-light leading-relaxed transition-colors duration-500 ${theme === 'dark' ? 'text-white/50' : 'text-black/50'}`}>
              <FadeIn direction="right">
                <p>The Macintosh changed how people experienced computers. For the first time, many users could interact with a machine without needing technical knowledge.</p>
              </FadeIn>
              <FadeIn direction="right" delay={0.2}>
                <p>They could draw, write, and organize information using visual tools. The computer became less like a machine and more like a companion.</p>
              </FadeIn>
              <FadeIn direction="right" delay={0.4}>
                <p className={`text-2xl md:text-4xl font-light tracking-tight leading-tight transition-colors duration-500 ${theme === 'dark' ? 'text-white' : 'text-black'}`}>
                  This shift had a lasting effect. The ideas behind the Macintosh—simple design, visual interaction, and ease of use—became the <span className="italic font-bold">standard</span> for modern computing.
                </p>
              </FadeIn>
            </div>

            <div className="grid grid-cols-2 gap-6">
              {[
                { title: "Draw", icon: <Sparkles className="w-6 h-6" /> },
                { title: "Write", icon: <Layers className="w-6 h-6" /> },
                { title: "Organize", icon: <Layout className="w-6 h-6" /> },
                { title: "Create", icon: <Rocket className="w-6 h-6" /> }
              ].map((item, i) => (
                <FadeIn key={i} delay={i * 0.1} direction="left">
                  <div className={`p-8 rounded-[2rem] border transition-colors duration-500 ${theme === 'dark' ? 'bg-zinc-900/30 border-white/5' : 'bg-zinc-50 border-black/5'}`}>
                    <div className="mb-4 opacity-40">{item.icon}</div>
                    <p className="text-xl font-light tracking-tight">{item.title}</p>
                  </div>
                </FadeIn>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Section 10 & 11: The Legacy & Turning Point */}
      <section className="py-40 px-6 relative overflow-hidden">
        <div className="max-w-5xl mx-auto text-center">
          <FadeIn>
            <h2 className="text-3xl md:text-5xl font-light tracking-tighter mb-12">A Lasting Influence.</h2>
          </FadeIn>

          <div className={`max-w-3xl mx-auto space-y-10 text-lg md:text-xl font-light leading-relaxed transition-colors duration-500 mb-24 ${theme === 'dark' ? 'text-white/50' : 'text-black/50'}`}>
            <FadeIn>
              <p>Today, nearly every computer, smartphone, and tablet uses similar concepts. Although the Macintosh was not an immediate commercial success compared to some competitors, its influence was enormous.</p>
            </FadeIn>
            <FadeIn delay={0.2}>
              <p>For Steve Jobs, the Macintosh was deeply personal. It reflected his belief that technology and creativity should come together. It showed his obsession with simplicity, his attention to detail, and his desire to build products that people would love, not just use.</p>
            </FadeIn>
            <FadeIn delay={0.4}>
              <p>The Macintosh also marked a turning point in Jobs’ career. While it established him as a visionary leader, it also led to conflicts within Apple that would eventually push him out of the company in 1985.</p>
            </FadeIn>
            <FadeIn delay={0.6}>
              <p className={`text-2xl md:text-4xl font-light tracking-tight leading-tight transition-colors duration-500 ${theme === 'dark' ? 'text-white' : 'text-black'}`}>
                Yet even in that moment, the ideas he championed continued to <span className="italic font-bold">shape the future.</span>
              </p>
            </FadeIn>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {[
              { title: "Visionary", icon: <Eye className="w-6 h-6" /> },
              { title: "Simplicity", icon: <ShieldCheck className="w-6 h-6" /> },
              { title: "Love", icon: <Heart className="w-6 h-6" /> }
            ].map((item, i) => (
              <FadeIn key={i} delay={i * 0.2} direction="up">
                <div className={`p-10 rounded-[2rem] border transition-colors duration-500 ${theme === 'dark' ? 'bg-zinc-900/30 border-white/5' : 'bg-zinc-50 border-black/5'}`}>
                  <div className="mb-6 opacity-40 flex justify-center">{item.icon}</div>
                  <p className="text-xl font-light tracking-tight">{item.title}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Section 12: Conclusion */}
      <section className={`py-60 px-6 text-center relative overflow-hidden ${theme === 'dark' ? 'bg-zinc-950' : 'bg-zinc-50'}`}>
        <div className="max-w-5xl mx-auto relative z-10">
          <FadeIn>
            <div className={`inline-flex p-8 rounded-[2rem] mb-16 border backdrop-blur-xl transition-colors duration-500 ${theme === 'dark' ? 'bg-white/5 border-white/10 text-white/40' : 'bg-black/5 border-black/10 text-black/40'}`}>
              <Globe size={48} />
            </div>
          </FadeIn>

          <div className={`max-w-4xl mx-auto space-y-12 text-lg md:text-2xl font-light leading-relaxed mb-32 transition-colors duration-500 ${theme === 'dark' ? 'text-white/50' : 'text-black/50'}`}>
            <FadeIn>
              <p>Looking back, the Macintosh was more than just a computer. It was a bold step toward making technology accessible to everyone. It turned complex machines into tools that felt natural and approachable.</p>
            </FadeIn>
            <FadeIn delay={0.2}>
              <p className={`text-2xl md:text-5xl font-light tracking-tighter leading-tight transition-colors duration-500 ${theme === 'dark' ? 'text-white' : 'text-black'}`}>
                And at the center of it all was Steve Jobs, a leader who believed that the best technology is not the most complicated, but the <span className="italic font-bold underline underline-offset-8 decoration-current/20">most human.</span>
              </p>
            </FadeIn>
          </div>

          <FadeIn delay={0.4}>
            <div className="relative inline-block group">
              <p className={`text-5xl md:text-8xl lg:text-[10rem] font-light tracking-tighter uppercase leading-none transition-transform duration-700 group-hover:scale-105 ${theme === 'dark' ? 'text-white/80' : 'text-black/80'}`}>
                THE MOST HUMAN.
              </p>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* References */}
      <section className={`py-20 px-6 transition-colors duration-500 ${theme === 'dark' ? 'bg-black' : 'bg-white'}`}>
        <div className="max-w-4xl mx-auto">
          <FadeIn>
            <h3 className="text-xs font-mono uppercase tracking-[0.4em] mb-12 opacity-40">References</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {[
                "Isaacson, Walter. Steve Jobs. Simon & Schuster, 2011.",
                "Hertzfeld, Andy. Revolution in the Valley: The Insanely Great Story of How the Mac Was Made. O’Reilly Media, 2004.",
                "Apple Inc. (1984). “Introducing Macintosh.” Official Launch Materials.",
                "Computer History Museum. “The Story of the Macintosh.”",
                "The New York Times. “Apple’s ‘1984’ Commercial Still Resonates” (2004 retrospective).",
                "Smithsonian Magazine. “How the Apple Macintosh Changed the World”"
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
            <Rocket size={18} />
          </Link>
        </FadeIn>
      </section>
    </div>
  );
};
