import React, { useRef, useMemo, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform, useInView, useReducedMotion, AnimatePresence } from 'motion/react';
import { ArrowLeft, ArrowUp } from 'lucide-react';
import { useTheme } from './ThemeProvider';

interface SectionProps {
  children: React.ReactNode;
  className?: string;
}

const Section: React.FC<SectionProps> = ({ children, className = "" }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { amount: 0.3 });
  const shouldReduceMotion = useReducedMotion();

  return (
    <section
      ref={ref}
      className={`min-h-screen flex items-center justify-center relative px-6 py-24 ${className}`}
    >
      <motion.div
        initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 40 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: shouldReduceMotion ? 0 : 40 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className="max-w-3xl w-full z-10"
      >
        {children}
      </motion.div>
    </section>
  );
};

const FloatingDust: React.FC = () => {
  const particles = useMemo(() => Array.from({ length: 20 }).map((_, i) => ({
    id: i,
    size: Math.random() * 3 + 1,
    x: Math.random() * 100,
    y: Math.random() * 100,
    duration: Math.random() * 20 + 10,
    delay: Math.random() * -20,
  })), []);

  return (
    <div className="absolute inset-0 z-[3] pointer-events-none overflow-hidden">
      {particles.map((p) => (
        <motion.div
          key={p.id}
          initial={{ x: `${p.x}%`, y: `${p.y}%`, opacity: 0 }}
          animate={{ 
            y: [`${p.y}%`, `${p.y - 10}%`, `${p.y}%`],
            opacity: [0, 0.15, 0]
          }}
          transition={{ 
            duration: p.duration, 
            repeat: Infinity, 
            delay: p.delay,
            ease: "easeInOut"
          }}
          className="absolute bg-white rounded-full blur-[1px]"
          style={{ width: p.size, height: p.size }}
        />
      ))}
    </div>
  );
};

export const Story1976: React.FC = () => {
  const { theme } = useTheme();
  const containerRef = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();
  const lastSectionRef = useRef(null);
  const isLastSectionInView = useInView(lastSectionRef, { amount: 0.1 });
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  // Preload images
  useEffect(() => {
    backgrounds.forEach(bg => {
      const img = new Image();
      img.src = bg.url;
    });
  }, [backgrounds]);

  // Parallax and Scale effects
  const scale = useTransform(scrollYProgress, [0, 1], [1, shouldReduceMotion ? 1 : 1.15]);
  const parallax = useTransform(scrollYProgress, [0, 1], [0, shouldReduceMotion ? 0 : -50]);
  
  // Dynamic Light Leak effect
  const lightLeakX = useTransform(scrollYProgress, [0, 1], ["-20%", "20%"]);
  const lightLeakOpacity = useTransform(scrollYProgress, [0, 0.4, 0.6, 1], [0.1, 0.2, 0.15, 0.05]);
  const lightLeakRotate = useTransform(scrollYProgress, [0, 1], [0, 45]);

  // Dynamic 14-stage background mapping for exact synchronization
  // We have 14 sections, so the scroll range is divided into 13 intervals (0 to 13)
  const totalSections = 14;
  const step = 1 / (totalSections - 1); 
  const fade = step * 0.4; // 40% of section height for crossfade

  // Helper to create range: [startFade, fullStart, fullEnd, endFade]
  const createRange = (startIdx: number, endIdx: number = startIdx) => {
    const start = startIdx * step;
    const end = (endIdx + 1) * step;
    
    const r1 = startIdx === 0 ? 0 : Math.max(0, start - fade);
    const r2 = startIdx === 0 ? 0 : start;
    const r3 = endIdx === totalSections - 1 ? 1 : Math.min(1, end - fade);
    const r4 = endIdx === totalSections - 1 ? 1 : Math.min(1, end);
    
    return [r1, r2, r3, r4];
  };

  const bgIntro = useTransform(scrollYProgress, createRange(0), [0, 1, 1, 0]);
  const bgAtariSearch = useTransform(scrollYProgress, createRange(1), [0, 1, 1, 0]);
  const bgAtariGrid = useTransform(scrollYProgress, createRange(2), [0, 1, 1, 0]);
  const bgAtariNight = useTransform(scrollYProgress, createRange(3), [0, 1, 1, 0]);
  const bgPhilosophy = useTransform(scrollYProgress, createRange(4), [0, 1, 1, 0]);
  const bgIndiaTravel = useTransform(scrollYProgress, createRange(5), [0, 1, 1, 0]);
  const bgIndiaReality = useTransform(scrollYProgress, createRange(6), [0, 1, 1, 0]);
  const bgIndiaMonk = useTransform(scrollYProgress, createRange(7), [0, 1, 1, 0]);
  const bgIntuition = useTransform(scrollYProgress, createRange(8), [0, 1, 1, 0]);
  const bgSynthesis = useTransform(scrollYProgress, createRange(9), [0, 1, 1, 0]);
  const bgApplePhilosophy = useTransform(scrollYProgress, createRange(10, 11), [0, 1, 1, 0]);
  const bgConclusion = useTransform(scrollYProgress, createRange(12, 13), [0, 1, 1, 0]);

  const backgrounds = useMemo(() => [
    { 
      id: 'intro', 
      opacity: bgIntro, 
      url: 'https://cdn.britannica.com/02/24402-050-2C2345B1/Steven-Jobs-Apple-I-Stephen-Wozniak-circuit-1976.jpg', 
      alt: 'Steve Jobs and Steve Wozniak with the Apple I' 
    },
    { 
      id: 'partnership', 
      opacity: bgAtariSearch, 
      url: 'https://i.pinimg.com/originals/4a/4d/e4/4a4de44d99cf8bf6dc40804aedeb4ef8.jpg', 
      alt: 'Macro shot of a circuit board representing the technical foundation', 
      grayscale: true 
    },
    { 
      id: 'apple-i', 
      opacity: bgAtariGrid, 
      url: 'https://www.cnet.com/a/img/resize/aff640d4af3437cca6adb207baf0727bdf62f44d/hub/2018/06/06/f3ff78d1-2369-4bc6-8529-2434aba685c7/apple1.jpg?auto=webp&fit=crop&height=675&width=1200', 
      alt: 'The original Apple I computer' 
    },
    { 
      id: 'garage-work', 
      opacity: bgAtariNight, 
      url: 'https://tse2.mm.bing.net/th/id/OIP.4OmHbss9Gn9Dn2hZwfHs2QHaEK?rs=1&pid=ImgDetMain&o=7&rm=3', 
      alt: 'Dark, focused workspace representing the garage days' 
    },
    { 
      id: 'founding', 
      opacity: bgPhilosophy, 
      url: 'https://tse4.mm.bing.net/th/id/OIP.gvGH3Pq2fQ2Q3bueJ3c7EgHaFB?w=768&h=521&rs=1&pid=ImgDetMain&o=7&rm=3', 
      alt: 'Minimalist architecture representing the foundation of a company', 
      grayscale: true 
    },
    { 
      id: 'apple-ii-launch', 
      opacity: bgIndiaTravel, 
      url: '', 
      alt: 'Clean, minimalist design representing the Apple II' 
    },
    { 
      id: 'vision-personal', 
      opacity: bgIndiaReality, 
      url: 'https://i.pinimg.com/736x/3b/c2/fd/3bc2fd5cc704c98339316a4d95048327.jpg', 
      alt: 'A person using a computer in a home setting' 
    },
    { 
      id: 'revolution-start', 
      opacity: bgIndiaMonk, 
      url: 'https://www.thegeekpub.com/wp-content/uploads/2016/07/Transferring-files-to-an-Apple-IIe-0001.jpg', 
      alt: 'Abstract digital grid representing the start of a revolution' 
    },
    { 
      id: 'intuition-design', 
      opacity: bgIntuition, 
      url: 'https://blaz-project.com/wp-content/uploads/2023/05/apple_2_kitchen_hero_1-1024x574.jpg', 
      alt: 'Abstract fluid motion representing design intuition' 
    },
    { 
      id: 'legacy-beginnings', 
      opacity: bgSynthesis, 
      url: 'https://i.pinimg.com/originals/17/e8/b1/17e8b1d43a48b4eef195da2e9a23f067.jpg', 
      alt: 'Steve Jobs in his early years' 
    },
    { 
      id: 'future-vision', 
      opacity: bgApplePhilosophy, 
      url: 'https://s3.amazonaws.com/s3.timetoast.com/public/uploads/photos/12034923/apple-hq-1981.jpg', 
      alt: 'Global connectivity and the future of tech' 
    },
    { 
      id: 'conclusion-1976', 
      opacity: bgConclusion, 
      url: 'https://e00-expansion.uecdn.es/assets/multimedia/imagenes/2016/10/05/14756486337723.jpg', 
      alt: 'Bright, open office representing the future' 
    },
  ], [bgIntro, bgAtariSearch, bgAtariGrid, bgAtariNight, bgPhilosophy, bgIndiaTravel, bgIndiaReality, bgIndiaMonk, bgIntuition, bgSynthesis, bgApplePhilosophy, bgConclusion]);

  return (
    <div ref={containerRef} className="relative w-full">
      {/* Sticky Background Layer */}
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
        {/* Global Grain Overlay */}
        <div className="absolute inset-0 z-[5] opacity-[0.03] mix-blend-overlay pointer-events-none animate-noise bg-[url('https://www.transparenttextures.com/patterns/stardust.png')]" />
        
        {/* Dynamic Light Leak */}
        <motion.div 
          style={{ x: lightLeakX, opacity: lightLeakOpacity, rotate: lightLeakRotate }}
          className="absolute -inset-[50%] z-[4] pointer-events-none bg-gradient-to-tr from-orange-500/20 via-transparent to-blue-500/20 blur-[120px]"
        />

        {/* Floating Dust Particles */}
        {!shouldReduceMotion && <FloatingDust />}

        {backgrounds.map((bg, index) => (
          <motion.div 
            key={bg.id}
            style={{ opacity: bg.opacity, scale, y: parallax, willChange: 'opacity' }}
            className="absolute inset-0 bg-cover bg-center"
          >
            {/* Contextual Overlay for Readability */}
            <div className={`absolute inset-0 z-10 ${theme === 'dark' 
              ? 'bg-gradient-to-b from-black/90 via-black/60 to-black/90' 
              : 'bg-gradient-to-b from-white/90 via-white/60 to-white/90'}`} 
            />
            
            <img 
              src={bg.url} 
              alt={bg.alt} 
              loading={index === 0 ? "eager" : "lazy"}
              className={`w-full h-full object-cover ${bg.grayscale ? 'grayscale' : ''}`}
              style={{ 
                imageRendering: 'auto', 
                backfaceVisibility: 'hidden',
                filter: bg.grayscale ? 'grayscale(100%) contrast(1.1)' : 'none'
              }}
              referrerPolicy="no-referrer"
            />

            {/* Atari Specific Overlay: Carbon Fiber + Scanlines */}
            {(bg.id.includes('atari')) && (
              <>
                <div className="absolute inset-0 opacity-[0.05] z-20 pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]" />
                <div className="absolute inset-0 z-20 pointer-events-none atari-flicker bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.15)_50%),linear-gradient(90deg,rgba(255,0,0,0.03),rgba(0,255,0,0.02),rgba(0,0,255,0.03))] bg-[length:100%_2px,3px_100%]" />
              </>
            )}
          </motion.div>
        ))}
      </div>

      {/* Narrative Content */}
      <div className="relative z-10">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.8 }}
          className="absolute top-8 left-6 z-50"
        >
          <Link 
            to="/journey#1974" 
            className={`inline-flex items-center gap-2 text-[11px] font-mono uppercase tracking-[0.2em] transition-all px-5 py-2.5 rounded-full backdrop-blur-md border ${theme === 'dark' ? 'text-white/80 hover:text-white border-white/20 bg-white/10 hover:bg-white/20' : 'text-black/80 hover:text-black border-black/20 bg-black/10 hover:bg-black/20'}`}
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Journey
          </Link>
        </motion.div>

        {/* Intro */}
        <Section>
          <span className="text-xs font-mono uppercase tracking-[0.5em] mb-6 block opacity-40">1975 to 1976</span>
          <h1 className="text-5xl md:text-8xl font-light tracking-tighter leading-[0.9] mb-12">
            The Birth of a <br />
            <motion.span 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.2, duration: 1 }}
              className="italic serif bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent"
            >
              Revolution
            </motion.span>
          </h1>
          <p className="text-xl md:text-3xl font-light leading-relaxed opacity-80 max-w-2xl">
            By 1976, Steve had returned with a new kind of focus. His journey to India and his time at Atari had come together into one bold idea: to take the power of computers away from big companies and put it into the hands of everyday people.
          </p>
        </Section>

        {/* The Partnership */}
        <Section>
          <h2 className="text-4xl md:text-6xl font-light tracking-tight mb-8">A Meeting of Minds</h2>
          <p className="text-lg md:text-xl font-light leading-relaxed opacity-70 mb-6">
            The start of this change was the friendship between Steve Jobs and Steve Wozniak. Wozniak was a true genius with electronics. He could build complex things in a simple and efficient way that few others could. Jobs, on the other hand, was the dreamer who saw how these machines could change people's lives.
          </p>
          <p className="text-lg md:text-xl font-light leading-relaxed opacity-70">
            They were an unlikely pair. One was a quiet, brilliant engineer, and the other was a bold and exciting dreamer. But together, they had the perfect skills to change the world. Wozniak built the technology, and Jobs gave it a heart.
          </p>
        </Section>

        {/* The Apple I */}
        <Section>
          <h2 className="text-4xl md:text-6xl font-light tracking-tight mb-8">The First Machine</h2>
          <p className="text-lg md:text-xl font-light leading-relaxed opacity-70 mb-6">
            In 1975, Wozniak built a small computer that could connect to a screen and show text. This was a new and big idea at a time when most computers were huge and used paper. When Jobs saw it, he didn't just see a hobby project. He saw the first step toward a new world.
          </p>
          <p className="text-lg md:text-xl font-light leading-relaxed opacity-70">
            He talked Wozniak into selling the machine. They called it the Apple I. It was just a simple circuit board without a case or keyboard, but it was the first computer that anyone could actually own and use.
          </p>
        </Section>

        {/* The Garage */}
        <Section>
          <h2 className="text-4xl md:text-6xl font-light tracking-tight mb-8">The Garage</h2>
          <p className="text-lg md:text-xl font-light leading-relaxed opacity-70 mb-6">
            Since they didn't have money for an office, the two Steves started their work in the Jobs family garage. It was a simple start for a company that would one day change the world. The garage was full of the smell of tools and the energy of two young men who believed they were doing something special.
          </p>
          <p className="text-lg md:text-xl font-light leading-relaxed opacity-70">
            They worked late into the night, building circuit boards by hand and dreaming of a future where everyone had a computer on their desk. The garage was more than just a workspace. It was a place where new ideas could grow.
          </p>
        </Section>

        {/* Founding Apple */}
        <Section>
          <div className="text-center">
            <span className="text-xs font-mono uppercase tracking-[0.5em] mb-6 block opacity-40">April 1, 1976</span>
            <h2 className="text-5xl md:text-8xl font-light tracking-tighter mb-8">Apple Computer <br /><span className="italic serif">is Born</span></h2>
            <p className="text-xl md:text-2xl font-light leading-relaxed opacity-70 max-w-2xl mx-auto">
              On April Fools' Day in 1976, Steve Jobs, Steve Wozniak, and Ronald Wayne signed the papers that officially started Apple Computer. It was a bold name for a tech company. It was simple, friendly, and full of life.
            </p>
          </div>
        </Section>

        {/* The Byte Shop */}
        <Section>
          <h2 className="text-4xl md:text-6xl font-light tracking-tight mb-8">The First Big Order</h2>
          <p className="text-lg md:text-xl font-light leading-relaxed opacity-70 mb-6">
            Their first major break came when a local shop owner ordered fifty Apple I computers. But he wanted them fully built. Jobs, who never gave up, got the parts he needed by promising to pay for them after the computers were sold.
          </p>
          <p className="text-lg md:text-xl font-light leading-relaxed opacity-70">
            They spent the next month working day and night in the garage, building and testing every part. It was a hard start in the business world, but it proved they could do what they promised.
          </p>
        </Section>

        {/* The Apple II */}
        <Section>
          <h2 className="text-4xl md:text-6xl font-light tracking-tight mb-8">The Breakthrough: Apple II</h2>
          <p className="text-lg md:text-xl font-light leading-relaxed opacity-70 mb-6">
            While the Apple I was for people who loved electronics, the Apple II was for everyone. Launched in 1977, it was the first computer to come in a nice plastic case with a keyboard. It could even show colors. It was a finished product, not just a machine.
          </p>
          <p className="text-lg md:text-xl font-light leading-relaxed opacity-70">
            Jobs cared about every detail, from the color of the case to how quiet it was. He wanted the Apple II to feel right in a living room, not just a lab. This was the moment the personal computer truly arrived.
          </p>
        </Section>

        {/* The Vision */}
        <Section>
          <h2 className="text-4xl md:text-6xl font-light tracking-tight mb-8">A Computer for Everyone</h2>
          <p className="text-lg md:text-xl font-light leading-relaxed opacity-70 mb-6">
            The success of the Apple II came from a simple belief: that technology should help people be more creative. Jobs saw the computer as a tool that could help people do more than they ever thought possible.
          </p>
          <p className="text-lg md:text-xl font-light leading-relaxed opacity-70">
            He wanted to create tools that were so easy to use they felt natural. This vision became the heart of Apple.
          </p>
        </Section>

        {/* Design Intuition */}
        <Section>
          <h2 className="text-4xl md:text-6xl font-light tracking-tight mb-8">The Beauty of Simplicity</h2>
          <p className="text-lg md:text-xl font-light leading-relaxed opacity-70 mb-6">
            Even in these early days, Jobs' love for design was clear. He believed that the back of a cabinet should be as beautiful as the front, even if no one ever saw it. He brought the lessons of Zen and the simple style of Atari into everything Apple made.
          </p>
          <p className="text-lg md:text-xl font-light leading-relaxed opacity-70">
            He understood that simplicity isn't just about having less. It's about making things clear. Every curve and every line was carefully chosen to create a sense of balance.
          </p>
        </Section>

        {/* The Start of the Revolution */}
        <Section>
          <h2 className="text-4xl md:text-6xl font-light tracking-tight mb-8">The Spark That Grew</h2>
          <p className="text-lg md:text-xl font-light leading-relaxed opacity-70 mb-6">
            By the end of 1976, Apple was no longer just a garage project. It was a company that was growing fast. They had moved into their first real office, and the world was starting to notice the two young men from Los Altos.
          </p>
          <p className="text-lg md:text-xl font-light leading-relaxed opacity-70">
            The revolution had begun. It wasn't just about parts and software. It was about a new way of thinking about how we use technology.
          </p>
        </Section>

        {/* Building the Future */}
        <Section>
          <h2 className="text-4xl md:text-6xl font-light tracking-tight mb-8">Building the Future</h2>
          <p className="text-lg md:text-xl font-light leading-relaxed opacity-70 mb-6">
            Jobs was no longer just a dreamer. He was a builder. He had found his purpose in combining technology with art. He was ready to lead a team and build the future he imagined.
          </p>
          <p className="text-lg md:text-xl font-light leading-relaxed opacity-70">
            The lessons of the past, including the simple style of Atari and the ideas from India, were now the foundation of a new kind of company.
          </p>
        </Section>

        {/* Conclusion */}
        <Section className="pb-48">
          <div ref={lastSectionRef} className="space-y-12">
            <p className="text-xl md:text-4xl font-light leading-relaxed opacity-90">
              The start of Apple in 1976 was the moment the dreamer became a builder, and the world was never the same again.
            </p>
            <div className="space-y-6">
              <p className="text-lg md:text-2xl font-mono uppercase tracking-[0.3em] opacity-60">A focus on the individual.</p>
              <p className="text-lg md:text-2xl font-mono uppercase tracking-[0.3em] opacity-60">A love for great design.</p>
              <p className="text-lg md:text-2xl font-mono uppercase tracking-[0.3em] opacity-60">A belief in what seems impossible.</p>
            </div>
            <p className="text-lg md:text-xl font-light leading-relaxed opacity-70 max-w-2xl">
              These were the values that would guide Apple for years to come. The revolution was just getting started.
            </p>
          </div>
        </Section>
      </div>

      {/* Fixed Scroll to Top Arrow */}
      <AnimatePresence>
        {isLastSectionInView && (
          <motion.button
            initial={{ opacity: 0, y: 20, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.8 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className={`fixed bottom-12 right-8 z-50 w-12 h-12 rounded-full border flex items-center justify-center transition-colors backdrop-blur-md ${theme === 'dark' ? 'border-white/20 bg-black/40 text-white hover:border-white/40' : 'border-black/20 bg-white/40 text-black hover:border-black/40'}`}
            aria-label="Scroll to top"
          >
            <ArrowUp className="w-5 h-5" />
          </motion.button>
        )}
      </AnimatePresence>

      {/* Progress Indicator */}
      <div className="fixed right-8 top-1/2 -translate-y-1/2 z-50 hidden md:flex flex-col gap-4 items-center">
        <div className={`h-32 w-px ${theme === 'dark' ? 'bg-white/10' : 'bg-black/10'} relative overflow-hidden`}>
          <motion.div 
            style={{ scaleY: scrollYProgress, originY: 0 }}
            className={`absolute inset-0 ${theme === 'dark' ? 'bg-white' : 'bg-black'}`}
          />
        </div>
        <span className="text-[10px] font-mono uppercase tracking-widest vertical-text opacity-40">Scroll</span>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        .serif { font-family: 'Georgia', serif; }
        .vertical-text { writing-mode: vertical-rl; }
        
        @keyframes noise {
          0%, 100% { transform: translate(0, 0); }
          10% { transform: translate(-1%, -1%); }
          20% { transform: translate(1%, 1%); }
          30% { transform: translate(-2%, -2%); }
          40% { transform: translate(2%, 2%); }
          50% { transform: translate(-1%, 1%); }
          60% { transform: translate(1%, -1%); }
          70% { transform: translate(2%, -2%); }
          80% { transform: translate(-2%, 2%); }
          90% { transform: translate(1%, 1%); }
        }
        
        .animate-noise {
          animation: noise 0.5s steps(10) infinite;
        }

        @keyframes flicker {
          0% { opacity: 0.03; }
          5% { opacity: 0.05; }
          10% { opacity: 0.03; }
          15% { opacity: 0.04; }
          25% { opacity: 0.03; }
          30% { opacity: 0.06; }
          35% { opacity: 0.03; }
          40% { opacity: 0.04; }
          45% { opacity: 0.03; }
          60% { opacity: 0.05; }
          70% { opacity: 0.03; }
          80% { opacity: 0.04; }
          90% { opacity: 0.03; }
          100% { opacity: 0.05; }
        }
        
        .atari-flicker {
          animation: flicker 0.15s infinite;
        }
      `}} />
    </div>
  );
};
