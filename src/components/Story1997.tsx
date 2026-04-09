import React, { useRef, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
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
    ease: "easeInOut"
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

export const Story1997: React.FC = () => {
  const { theme } = useTheme();
  const navigate = useNavigate();
  const containerRef = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();
  const lastSectionRef = useRef(null);
  const isLastSectionInView = useInView(lastSectionRef, { amount: 0.1 });
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  // Parallax and Scale effects
  const scale = useTransform(scrollYProgress, [0, 1], [1, shouldReduceMotion ? 1 : 1.15]);
  const parallax = useTransform(scrollYProgress, [0, 1], [0, shouldReduceMotion ? 0 : -50]);
  
  // Dynamic Light Leak effect
  const lightLeakX = useTransform(scrollYProgress, [0, 1], ["-20%", "20%"]);
  const lightLeakOpacity = useTransform(scrollYProgress, [0, 0.4, 0.6, 1], [0.1, 0.2, 0.15, 0.05]);
  const lightLeakRotate = useTransform(scrollYProgress, [0, 1], [0, 45]);

  // Dynamic 31-stage background mapping
  const totalSections = 31;
  const step = 1 / (totalSections - 1); 
  const fade = step * 0.4;

  const createRange = (startIdx: number, endIdx: number = startIdx) => {
    const start = startIdx * step;
    const end = (endIdx + 1) * step;
    
    const r1 = startIdx === 0 ? 0 : Math.max(0, start - fade);
    const r2 = startIdx === 0 ? 0 : start;
    const r3 = endIdx === totalSections - 1 ? 1 : Math.min(1, end - fade);
    const r4 = endIdx === totalSections - 1 ? 1 : Math.min(1, end);
    
    return [r1, r2, r3, r4];
  };

  const backgrounds = useMemo(() => [
    { id: 1, url: "https://picsum.photos/seed/dark-office/1920/1080", alt: "Apple in Crisis" },
    { id: 2, url: "https://picsum.photos/seed/confusion/1920/1080", alt: "Lost Direction" },
    { id: 3, url: "https://picsum.photos/seed/finance/1920/1080", alt: "Financial Decline" },
    { id: 4, url: "https://picsum.photos/seed/return/1920/1080", alt: "The Return" },
    { id: 5, url: "https://picsum.photos/seed/next/1920/1080", alt: "NeXT Acquisition" },
    { id: 6, url: "https://picsum.photos/seed/ceo/1920/1080", alt: "Interim CEO" },
    { id: 7, url: "https://picsum.photos/seed/identity/1920/1080", alt: "Lost Identity" },
    { id: 8, url: "https://picsum.photos/seed/simplify/1920/1080", alt: "Simplification" },
    { id: 9, url: "https://picsum.photos/seed/grid/1920/1080", alt: "The Product Grid" },
    { id: 10, url: "https://picsum.photos/seed/focus-product/1920/1080", alt: "Focus on Greatness" },
    { id: 11, url: "https://picsum.photos/seed/shock/1920/1080", alt: "Internal Shock" },
    { id: 12, url: "https://picsum.photos/seed/question/1920/1080", alt: "Is it Great?" },
    { id: 13, url: "https://picsum.photos/seed/culture/1920/1080", alt: "Rebuilding Culture" },
    { id: 14, url: "https://picsum.photos/seed/einstein/1920/1080", alt: "Think Different" },
    { id: 15, url: "https://picsum.photos/seed/gandhi/1920/1080", alt: "World Changers" },
    { id: 16, url: "https://picsum.photos/seed/meaning/1920/1080", alt: "Connecting with Meaning" },
    { id: 17, url: "https://picsum.photos/seed/image/1920/1080", alt: "Restored Image" },
    { id: 18, url: "https://picsum.photos/seed/personality/1920/1080", alt: "Jobs' Vision" },
    { id: 19, url: "https://picsum.photos/seed/design-studio/1920/1080", alt: "Design and Simplicity" },
    { id: 20, url: "https://picsum.photos/seed/jony-ive/1920/1080", alt: "Collaboration with Ive" },
    { id: 21, url: "https://picsum.photos/seed/imac/1920/1080", alt: "The iMac Launch" },
    { id: 22, url: "https://picsum.photos/seed/friendly/1920/1080", alt: "Friendly Design" },
    { id: 23, url: "https://picsum.photos/seed/success/1920/1080", alt: "iMac Success" },
    { id: 24, url: "https://picsum.photos/seed/software/1920/1080", alt: "Software Evolution" },
    { id: 25, url: "https://picsum.photos/seed/leadership/1920/1080", alt: "Intense Leadership" },
    { id: 26, url: "https://picsum.photos/seed/recovery/1920/1080", alt: "Apple Recovers" },
    { id: 27, url: "https://picsum.photos/seed/purpose/1920/1080", alt: "Sense of Purpose" },
    { id: 28, url: "https://picsum.photos/seed/turnaround/1920/1080", alt: "Greatest Turnaround" },
    { id: 29, url: "https://picsum.photos/seed/future/1920/1080", alt: "Foundation for Future" },
    { id: 30, url: "https://picsum.photos/seed/way-of-thinking/1920/1080", alt: "Restoring Thinking" },
    { id: 31, url: "https://picsum.photos/seed/transformation/1920/1080", alt: "Apple Transformed" },
  ], []);

  const bgTransforms = backgrounds.map((_, i) => 
    useTransform(scrollYProgress, createRange(i), [0, 1, 1, 0])
  );

  return (
    <div ref={containerRef} className={`relative ${theme === 'dark' ? 'bg-black text-white' : 'bg-white text-black'}`}>
      {/* Fixed Background Layers */}
      <div className="fixed inset-0 z-0 overflow-hidden">
        {backgrounds.map((bg, i) => (
          <motion.div
            key={bg.id}
            style={{ 
              opacity: bgTransforms[i],
              scale,
              y: parallax
            }}
            className="absolute inset-0"
          >
            <img 
              src={bg.url} 
              alt={bg.alt}
              className="w-full h-full object-cover grayscale opacity-40"
              referrerPolicy="no-referrer"
            />
            <div className={`absolute inset-0 ${theme === 'dark' ? 'bg-gradient-to-b from-black via-transparent to-black opacity-60' : 'bg-gradient-to-b from-white via-transparent to-white opacity-60'}`} />
          </motion.div>
        ))}
      </div>

      {/* Light Leak Overlay */}
      <motion.div 
        style={{ 
          x: lightLeakX,
          opacity: lightLeakOpacity,
          rotate: lightLeakRotate
        }}
        className="fixed inset-0 z-[2] pointer-events-none bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-blue-500/20 via-transparent to-transparent blur-3xl"
      />

      <FloatingDust />

      {/* Grain Overlay */}
      <div className="fixed inset-0 z-[5] pointer-events-none opacity-[0.03] mix-blend-overlay animate-noise bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />

      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 px-6 py-8 flex justify-between items-center mix-blend-difference">
        <button 
          onClick={() => navigate('/journey')}
          className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest opacity-60 hover:opacity-100 transition-opacity"
        >
          <ArrowLeft className="w-4 h-4" />
          Journey
        </button>
        <span className="text-xs font-mono uppercase tracking-[0.3em] opacity-40">Chapter 1997: The Return</span>
      </nav>

      {/* Content */}
      <div className="relative z-10">
        {/* Hero Section */}
        <Section className="items-center text-center">
          <motion.span 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xs font-mono uppercase tracking-[0.5em] mb-6 block opacity-40"
          >
            July 1997
          </motion.span>
          <h1 className="text-5xl md:text-8xl font-light tracking-tighter leading-[0.9] mb-12">
            The <br />
            <motion.span 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.2, duration: 1 }}
              className="italic serif bg-gradient-to-r from-red-400 to-orange-400 bg-clip-text text-transparent"
            >
              Great Return
            </motion.span>
          </h1>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="text-xl md:text-2xl font-light leading-relaxed max-w-2xl mx-auto opacity-70"
          >
            By the summer of 1997, Apple was in deep trouble and close to failing completely. The company that had once started the personal computer revolution was now lost. It was losing hundreds of millions of dollars every few months and had no clear plan for the future. Its products were a confusing mess, with too many models that no one really wanted. Many people thought Apple would not survive the year without a miracle.
          </motion.p>
        </Section>

        {/* Section 2: The Return */}
        <Section>
          <h2 className="text-4xl md:text-6xl font-light tracking-tight mb-8">A Surprise Return</h2>
          <p className="text-lg md:text-xl font-light leading-relaxed opacity-70 mb-6">
            At this desperate time, something amazing happened. Steve Jobs returned to the company he had started in a garage twenty years earlier. He came back because Apple bought NeXT, the company he had built while he was away. At first, he was just an advisor, but he soon became the interim CEO. He jokingly called himself the 'iCEO.' Even though it was supposed to be temporary, his strong presence and quick decisions showed that he was ready to change Apple's future.
          </p>
        </Section>

        {/* Section 3: Lost Identity */}
        <Section>
          <div className="border-l-2 border-current pl-8 py-4">
            <h2 className="text-3xl md:text-5xl font-light italic serif mb-6">"Finding Apple's Soul"</h2>
            <p className="text-lg md:text-xl font-light leading-relaxed opacity-70">
              From his first day back, Jobs saw exactly what was wrong. He saw that Apple had become boring and lost its way. It was trying to do too many things and failing at all of them. He believed that the company was drowning in its own rules and slow ways. Jobs knew that to save Apple, he had to cut away everything that wasn't needed and return to the simple values that made it great.
            </p>
          </div>
        </Section>

        {/* Section 4: The Grid */}
        <Section>
          <h2 className="text-4xl md:text-6xl font-light tracking-tight mb-8">Doing More with Less</h2>
          <p className="text-lg md:text-xl font-light leading-relaxed opacity-70 mb-6">
            In one of his first big moves, Jobs cut most of Apple’s ongoing projects. He turned dozens of confusing models into a simple grid of four products. There were two for home use and two for professional use. His idea was simple. Instead of making many average products, Apple would focus all its energy on making just a few great ones that could change the world.
          </p>
        </Section>

        {/* Section 5: Shock and Focus */}
        <Section>
          <h2 className="text-4xl md:text-6xl font-light tracking-tight mb-8">Changing the Culture</h2>
          <p className="text-lg md:text-xl font-light leading-relaxed opacity-70 mb-6">
            This sudden change shocked everyone at Apple. Projects were canceled, teams were changed, and the company's goals were reset almost overnight. Jobs was firm and focused on being the best. He walked through the offices and asked one simple question over and over: "Is this product great?" If the answer was not a clear yes, the project was stopped right then and there.
          </p>
        </Section>

        {/* Section 6: Rebuilding Culture */}
        <Section>
          <h2 className="text-4xl md:text-6xl font-light tracking-tight mb-8">A New Way to Think</h2>
          <p className="text-lg md:text-xl font-light leading-relaxed opacity-70 mb-6">
            While fixing the products, Jobs also worked to change how people felt about working at Apple. He wanted to bring back the excitement and the pride of being creative. He encouraged people to think in new ways and take risks. This belief, that technology should help people be creative, became the heart of the company again. Later that year, Apple launched the famous "Think Different" ads to show the world that it was back to its roots.
          </p>
        </Section>

        {/* Section 7: Celebrating Changers */}
        <Section>
          <h2 className="text-4xl md:text-6xl font-light tracking-tight mb-8">Honoring the Dreamers</h2>
          <p className="text-lg md:text-xl font-light leading-relaxed opacity-70 mb-6">
            The ads were different because they didn't talk about technical details or the products themselves. Instead, they celebrated the 'crazy ones,' the people who changed history with their big ideas. The message was clear. Apple was for the dreamers and the doers, for those who dared to be different and believed they could change the world.
          </p>
        </Section>

        {/* Section 8: Meaning Over Features */}
        <Section>
          <div className="border-l-2 border-current pl-8 py-4">
            <h2 className="text-3xl md:text-5xl font-light italic serif mb-6">"The Heart of the Message"</h2>
            <p className="text-lg md:text-xl font-light leading-relaxed opacity-70">
              This was Steve Jobs at his best. He knew that people don't just buy features. They connect with meaning and shared values. The ads did more than just sell computers. They helped fix Apple’s image and reminded everyone that Apple was about more than just machines. It was a company built on passion and bold thinking.
            </p>
          </div>
        </Section>

        {/* Section 9: Personal Vision */}
        <Section>
          <h2 className="text-4xl md:text-6xl font-light tracking-tight mb-8">A Shared Goal</h2>
          <p className="text-lg md:text-xl font-light leading-relaxed opacity-70 mb-6">
            In many ways, the "Think Different" ads reflected Jobs’ own life as someone who always challenged the rules. He believed in the power of a single great idea. By sharing this message, he got the whole company to follow his vision. But he also knew that good ads were not enough. Apple needed great products that lived up to the promise.
          </p>
        </Section>

        {/* Section 10: Design and Simplicity */}
        <Section>
          <h2 className="text-4xl md:text-6xl font-light tracking-tight mb-8">Focus on Beauty</h2>
          <p className="text-lg md:text-xl font-light leading-relaxed opacity-70 mb-6">
            He focused on design and simplicity. He believed these were the keys to making technology easy for everyone to use. He felt that products should be powerful but also beautiful objects that people would love to look at. During this time, he started working closely with a young designer named Jony Ive. Together, they worked in a secret studio to create a new generation of devices that felt human and new.
          </p>
        </Section>

        {/* Section 11: The iMac */}
        <Section>
          <h2 className="text-4xl md:text-6xl font-light tracking-tight mb-8">1998: The iMac</h2>
          <p className="text-lg md:text-xl font-light leading-relaxed opacity-70 mb-6">
            In 1998, their work led to the iMac, a machine that changed everything. It looked completely different from the boring beige boxes of the time. It had a colorful, see-through case that looked friendly. It was simple to set up and use right away. For millions of people, the iMac made computers feel fun and easy to use.
          </p>
        </Section>

        {/* Section 12: Success and Life */}
        <Section>
          <h2 className="text-4xl md:text-6xl font-light tracking-tight mb-8">A Fresh Start</h2>
          <p className="text-lg md:text-xl font-light leading-relaxed opacity-70 mb-6">
            The iMac was a huge hit right away. It showed that Apple was back and could lead the industry again. It brought new energy and money to the company. Jobs kept making bold choices. He fixed the software and focused on making sure every product worked perfectly. His rule was that everything had to feel like a complete and finished thought.
          </p>
        </Section>

        {/* Section 13: Leadership Style */}
        <Section>
          <h2 className="text-4xl md:text-6xl font-light tracking-tight mb-8">Leading with Focus</h2>
          <p className="text-lg md:text-xl font-light leading-relaxed opacity-70 mb-6">
            His style was still very intense and demanding. He expected perfection and moved the company fast. But he was also more focused and disciplined than before. The years he spent away from Apple had changed him. He had learned from his failures and knew how to focus his energy on what really mattered.
          </p>
        </Section>

        {/* Section 14: Recovery */}
        <Section>
          <h2 className="text-4xl md:text-6xl font-light tracking-tight mb-8">The Recovery</h2>
          <p className="text-lg md:text-xl font-light leading-relaxed opacity-70 mb-6">
            Slowly, things began to get better. Sales went up, the stock price rose, and people felt excited again. Apple was no longer just trying to keep up. It was leading the way. The return of Steve Jobs and the saving of Apple is known as one of the greatest turnarounds in business history.
          </p>
        </Section>

        {/* Section 15: The Foundation */}
        <Section>
          <h2 className="text-4xl md:text-6xl font-light tracking-tight mb-8">Building for the Future</h2>
          <p className="text-lg md:text-xl font-light leading-relaxed opacity-70 mb-6">
            The changes he made during this time built a strong base for Apple’s future. The values he brought back, such as a focus on design and simplicity, would guide the company for years. These ideas would later lead to the iPod, the iPhone, and the iPad, changing how we all live and communicate.
          </p>
        </Section>

        {/* Section 16: Restoring Thinking */}
        <Section>
          <div className="border-l-2 border-current pl-8 py-4">
            <h2 className="text-3xl md:text-5xl font-light italic serif mb-6">"A New Way of Creating"</h2>
            <p className="text-lg md:text-xl font-light leading-relaxed opacity-70">
              Looking back, Jobs’ return was about more than just saving a company. It was about bringing back a way of thinking that put people first. He reminded everyone that great products come from clear ideas and the courage to make bold choices.
            </p>
          </div>
        </Section>

        {/* Section 17: Second Chance */}
        <Section>
          <h2 className="text-4xl md:text-6xl font-light tracking-tight mb-8">A Second Chance</h2>
          <p className="text-lg md:text-xl font-light leading-relaxed opacity-70 mb-6">
            For Steve Jobs, this was a rare second chance to finish what he started. He came back to the place where he began as a young man, but he was now a different person. He was wiser and had a clearer vision. This time, he didn't just save Apple. He turned it into one of the most loved and important companies in the world.
          </p>
        </Section>

        {/* Section 18: Conclusion */}
        <Section className="pb-48">
          <div ref={lastSectionRef} className="space-y-12">
            <p className="text-xl md:text-3xl font-light leading-relaxed opacity-90">
              The turnaround was complete. Apple was no longer just a company trying to survive. It was a leader in innovation and a symbol of creativity. The journey that started in a garage had come full circle, leading to a future that was brighter than anyone expected.
            </p>
            <div className="space-y-4">
              <p className="text-lg md:text-xl font-mono uppercase tracking-widest opacity-60">Simplicity.</p>
              <p className="text-lg md:text-xl font-mono uppercase tracking-widest opacity-60">Focus.</p>
              <p className="text-lg md:text-xl font-mono uppercase tracking-widest opacity-60">Innovation.</p>
            </div>
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
          animation: noise 0.2s infinite steps(1);
        }
      `}} />
    </div>
  );
};
