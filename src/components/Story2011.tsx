import React, { useRef, useMemo, useEffect } from 'react';
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
        transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
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

export const Story2011: React.FC = () => {
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

  // Dynamic 20-stage background mapping
  const totalSections = 20;
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
    { id: 1, url: "https://i.ytimg.com/vi/SIK_UTbNhMM/maxresdefault.jpg", alt: "Steve Jobs Legacy" },
    { id: 2, url: "https://picsum.photos/seed/apple-store-tribute/1920/1080", alt: "Apple Store Tribute" },
    { id: 3, url: "https://picsum.photos/seed/jobs-office/1920/1080", alt: "Steve Jobs Office" },
    { id: 4, url: "https://picsum.photos/seed/innovation-light/1920/1080", alt: "Innovation Light" },
    { id: 5, url: "https://picsum.photos/seed/design-simplicity/1920/1080", alt: "Design Simplicity" },
    { id: 6, url: "https://picsum.photos/seed/stanford-speech/1920/1080", alt: "Stanford Commencement Speech" },
    { id: 7, url: "https://picsum.photos/seed/stay-hungry/1920/1080", alt: "Stay Hungry Stay Foolish" },
    { id: 8, url: "https://picsum.photos/seed/apple-park-aerial/1920/1080", alt: "Apple Park Aerial" },
    { id: 9, url: "https://picsum.photos/seed/future-vision/1920/1080", alt: "Future Vision" },
    { id: 10, url: "https://picsum.photos/seed/digital-impact/1920/1080", alt: "Digital Impact" },
    { id: 11, url: "https://picsum.photos/seed/creative-spirit/1920/1080", alt: "Creative Spirit" },
    { id: 12, url: "https://picsum.photos/seed/technology-arts/1920/1080", alt: "Technology and Liberal Arts" },
    { id: 13, url: "https://picsum.photos/seed/zen-garden/1920/1080", alt: "Zen Influence" },
    { id: 14, url: "https://picsum.photos/seed/leadership-legacy/1920/1080", alt: "Leadership Legacy" },
    { id: 15, url: "https://picsum.photos/seed/global-tribute/1920/1080", alt: "Global Tribute" },
    { id: 16, url: "https://picsum.photos/seed/enduring-spirit/1920/1080", alt: "Enduring Spirit" },
    { id: 17, url: "https://picsum.photos/seed/next-generation/1920/1080", alt: "Next Generation" },
    { id: 18, url: "https://picsum.photos/seed/timeless-design/1920/1080", alt: "Timeless Design" },
    { id: 19, url: "https://picsum.photos/seed/infinite-loop/1920/1080", alt: "Infinite Loop" },
    { id: 20, url: "https://picsum.photos/seed/jobs-silhouette/1920/1080", alt: "Steve Jobs Silhouette" },
  ], []);

  const bgTransforms = backgrounds.map((_, i) => 
    useTransform(scrollYProgress, createRange(i), [0, 1, 1, 0])
  );

  // Preload images
  useEffect(() => {
    backgrounds.forEach(bg => {
      const img = new Image();
      img.src = bg.url;
    });
  }, [backgrounds]);

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
              y: parallax,
              willChange: 'opacity'
            }}
            className="absolute inset-0"
          >
            <img 
              src={bg.url} 
              alt={bg.alt}
              loading={i === 0 ? "eager" : "lazy"}
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
        <span className="text-xs font-mono uppercase tracking-[0.3em] opacity-40">Chapter 2011: The Legacy</span>
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
            October 2011
          </motion.span>
          <h1 className="text-5xl md:text-8xl font-light tracking-tighter leading-[0.9] mb-12">
            The <br />
            <motion.span 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.2, duration: 1 }}
              className="italic serif bg-gradient-to-r from-gray-400 to-gray-600 bg-clip-text text-transparent"
            >
              Infinite
            </motion.span> <br />
            Legacy
          </h1>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="text-xl md:text-2xl font-light leading-relaxed max-w-2xl mx-auto opacity-70"
          >
            On October 5, 2011, the world lost a visionary who didn't just build products, but fundamentally changed how we interact with technology and each other. Steve Jobs passed away at the age of 56, leaving behind a legacy that continues to ripple through every corner of our digital lives. His departure marked the end of an era, but his influence remains as vibrant and essential as ever.
          </motion.p>
        </Section>

        {/* Section 1: The Final Chapter */}
        <Section>
          <h2 className="text-4xl md:text-6xl font-light tracking-tight mb-8">The Final Chapter</h2>
          <p className="text-lg md:text-xl font-light leading-relaxed opacity-70 mb-6">
            In August 2011, Steve Jobs stepped down as CEO of Apple, a role he had held with unparalleled intensity since his return in 1997. His health had been a subject of global concern for years, yet his resignation still felt like a seismic shift. He passed the torch to Tim Cook, ensuring that the company he co-founded in a garage would continue to thrive on the principles he had so carefully established.
          </p>
        </Section>

        {/* Section 2: A World Transformed */}
        <Section>
          <div className="border-l-2 border-current pl-8 py-4">
            <h2 className="text-3xl md:text-5xl font-light italic serif mb-6">"A World Transformed"</h2>
            <p className="text-lg md:text-xl font-light leading-relaxed opacity-70">
              The reaction to his passing was immediate and global. From makeshift memorials at Apple Stores to tributes from world leaders and tech rivals, the message was clear: Steve Jobs was more than a businessman; he was a cultural icon. He had taken technology from the hands of hobbyists and put it into the pockets of billions, making it beautiful, intuitive, and deeply personal.
            </p>
          </div>
        </Section>

        {/* Section 3: Design Philosophy */}
        <Section>
          <h2 className="text-4xl md:text-6xl font-light tracking-tight mb-8">The Intersection of Arts and Tech</h2>
          <p className="text-lg md:text-xl font-light leading-relaxed opacity-70 mb-6">
            Jobs famously believed that Apple stood at the intersection of technology and the liberal arts. He brought a poet's sensibility to the world of silicon and software. For him, a computer wasn't just a machine; it was a "bicycle for the mind." He obsessed over the curve of a corner, the feel of a scroll, and the simplicity of an interface, believing that great design was not just how something looked, but how it worked.
          </p>
        </Section>

        {/* Section 4: Simplicity */}
        <Section>
          <h2 className="text-4xl md:text-6xl font-light tracking-tight mb-8">The Power of Focus</h2>
          <p className="text-lg md:text-xl font-light leading-relaxed opacity-70 mb-6">
            One of his greatest strengths was the ability to say "no." He ruthlessly simplified Apple's product line, focusing on a few things and doing them better than anyone else. This focus on excellence over quantity became the hallmark of the modern Apple. He taught us that simplicity is the ultimate sophistication, and that by removing the clutter, we can find the essence of what truly matters.
          </p>
        </Section>

        {/* Section 5: Stanford Speech */}
        <Section>
          <div className="border-l-2 border-current pl-8 py-4">
            <h2 className="text-3xl md:text-5xl font-light italic serif mb-6">"Stay Hungry, Stay Foolish"</h2>
            <p className="text-lg md:text-xl font-light leading-relaxed opacity-70">
              His 2005 Stanford commencement speech remains one of the most influential messages of our time. He spoke about connecting the dots, the importance of loving what you do, and the clarity that comes from remembering that we are all mortal. His final exhortation, "Stay Hungry, Stay Foolish," became a mantra for a new generation of creators, entrepreneurs, and dreamers.
            </p>
          </div>
        </Section>

        {/* Section 6: Death as a Tool */}
        <Section>
          <h2 className="text-4xl md:text-6xl font-light tracking-tight mb-8">Remembering You Are Going to Die</h2>
          <p className="text-lg md:text-xl font-light leading-relaxed opacity-70 mb-6">
            "Remembering that you are going to die is the best way I know to avoid the trap of thinking you have something to lose. You are already naked. There is no reason not to follow your heart." These words, spoken years before his passing, revealed the deep philosophical core that drove his relentless pursuit of innovation. He lived with an urgency that few could match, always pushing for the next breakthrough.
          </p>
        </Section>

        {/* Section 7: Apple Park */}
        <Section>
          <h2 className="text-4xl md:text-6xl font-light tracking-tight mb-8">The Last Project</h2>
          <p className="text-lg md:text-xl font-light leading-relaxed opacity-70 mb-6">
            One of his final major projects was the vision for Apple Park, the company's new headquarters. He envisioned a "spaceship" that would blend seamlessly with nature, a place where thousands of creative minds could collaborate in an environment designed for inspiration. It stands today as a physical testament to his belief in the power of architecture and environment to shape human creativity.
          </p>
        </Section>

        {/* Section 8: The Future of Apple */}
        <Section>
          <h2 className="text-4xl md:text-6xl font-light tracking-tight mb-8">A Foundation for the Future</h2>
          <p className="text-lg md:text-xl font-light leading-relaxed opacity-70 mb-6">
            Jobs didn't just leave behind products; he left behind a culture. He built a team and a system that could continue to innovate long after he was gone. He understood that for Apple to survive, it had to be more than just one man. He institutionalized his values, ensuring that the pursuit of perfection and the desire to "make a dent in the universe" would remain at the heart of the company.
          </p>
        </Section>

        {/* Section 9: Digital Revolution */}
        <Section>
          <div className="border-l-2 border-current pl-8 py-4">
            <h2 className="text-3xl md:text-5xl font-light italic serif mb-6">"The Architect of the Digital Age"</h2>
            <p className="text-lg md:text-xl font-light leading-relaxed opacity-70">
              From the personal computer to the smartphone, from digital music to animated films, Jobs was the architect of the world we live in today. He saw the potential for technology to empower individuals, to bridge distances, and to unleash creativity. He didn't just predict the future; he built it, one revolutionary product at a time.
            </p>
          </div>
        </Section>

        {/* Section 10: Creative Spirit */}
        <Section>
          <h2 className="text-4xl md:text-6xl font-light tracking-tight mb-8">The Creative Spirit</h2>
          <p className="text-lg md:text-xl font-light leading-relaxed opacity-70 mb-6">
            His spirit lives on in every person who uses a tool to create something new. Whether it's a student coding their first app, an artist designing on a tablet, or a musician recording in their bedroom, they are all part of the legacy of Steve Jobs. He gave us the tools to express our own creativity, believing that everyone has the potential to change the world.
          </p>
        </Section>

        {/* Section 11: Zen and Design */}
        <Section>
          <h2 className="text-4xl md:text-6xl font-light tracking-tight mb-8">Zen Influence</h2>
          <p className="text-lg md:text-xl font-light leading-relaxed opacity-70 mb-6">
            His lifelong interest in Zen Buddhism deeply influenced his approach to design and life. He sought the "emptiness" that allows for true clarity and focus. This spiritual grounding helped him navigate the highs and lows of his career, and it gave his products a sense of calm and purpose that set them apart from everything else.
          </p>
        </Section>

        {/* Section 12: Leadership Legacy */}
        <Section>
          <h2 className="text-4xl md:text-6xl font-light tracking-tight mb-8">The Leadership Legacy</h2>
          <p className="text-lg md:text-xl font-light leading-relaxed opacity-70 mb-6">
            Jobs was a demanding leader, often pushing his teams to their absolute limits. But he also inspired them to do the best work of their lives. He taught us that leadership is about having a clear vision and the courage to follow it, even when others doubt you. He showed us that by setting the bar high, we can achieve things we never thought possible.
          </p>
        </Section>

        {/* Section 13: Global Impact */}
        <Section>
          <div className="border-l-2 border-current pl-8 py-4">
            <h2 className="text-3xl md:text-5xl font-light italic serif mb-6">"A Global Inspiration"</h2>
            <p className="text-lg md:text-xl font-light leading-relaxed opacity-70">
              His story is one of the great American narratives, a journey of triumph, failure, and ultimate redemption. It's a story that inspires people all over the world to follow their passions and to never settle for the status quo. He proved that an individual with a vision and the determination to see it through can truly change the course of history.
            </p>
          </div>
        </Section>

        {/* Section 14: Enduring Spirit */}
        <Section>
          <h2 className="text-4xl md:text-6xl font-light tracking-tight mb-8">The Enduring Spirit</h2>
          <p className="text-lg md:text-xl font-light leading-relaxed opacity-70 mb-6">
            Even years after his passing, his presence is still felt in every Apple keynote, in every new product launch, and in the way we think about the future. He set a standard for excellence that remains the benchmark for the entire industry. His spirit is the "Think Different" campaign in action, a reminder that the people who are crazy enough to think they can change the world are the ones who do.
          </p>
        </Section>

        {/* Section 15: Next Generation */}
        <Section>
          <h2 className="text-4xl md:text-6xl font-light tracking-tight mb-8">The Next Generation</h2>
          <p className="text-lg md:text-xl font-light leading-relaxed opacity-70 mb-6">
            As we look to the future, the lessons of Steve Jobs are more relevant than ever. In a world of increasing complexity, his focus on simplicity and human-centered design is a guiding light. He challenge us to be more than just consumers; he challenges us to be creators, to be innovators, and to always stay hungry and stay foolish.
          </p>
        </Section>

        {/* Section 16: Timeless Design */}
        <Section>
          <h2 className="text-4xl md:text-6xl font-light tracking-tight mb-8">Timeless Design</h2>
          <p className="text-lg md:text-xl font-light leading-relaxed opacity-70 mb-6">
            The products he created have a timeless quality. They don't just age; they become classics. This is because they were built on a foundation of fundamental design principles that transcend trends. He understood that true beauty is found in the perfect balance of form and function, and that by striving for that balance, we can create things that last.
          </p>
        </Section>

        {/* Section 17: Infinite Loop */}
        <Section>
          <div className="border-l-2 border-current pl-8 py-4">
            <h2 className="text-3xl md:text-5xl font-light italic serif mb-6">"The Infinite Loop"</h2>
            <p className="text-lg md:text-xl font-light leading-relaxed opacity-70">
              The journey that began in a garage in Los Altos has come full circle, but the loop is infinite. The ideas he sparked continue to evolve, leading to new breakthroughs and new ways of seeing the world. He set in motion a cycle of innovation that shows no signs of slowing down, a testament to the power of a single, focused vision.
            </p>
          </div>
        </Section>

        {/* Section 18: Final Reflection */}
        <Section>
          <h2 className="text-4xl md:text-6xl font-light tracking-tight mb-8">A Final Reflection</h2>
          <p className="text-lg md:text-xl font-light leading-relaxed opacity-70 mb-6">
            Steve Jobs once said, "Being the richest man in the cemetery doesn't matter to me. Going to bed at night saying we've done something wonderful... that's what matters to me." He lived his life by that principle, and in doing so, he gave us all something wonderful. He showed us that technology can be a force for good, a tool for expression, and a source of wonder.
          </p>
        </Section>

        {/* Section 19: The Dent */}
        <Section>
          <h2 className="text-4xl md:text-6xl font-light tracking-tight mb-8">The Dent in the Universe</h2>
          <p className="text-lg md:text-xl font-light leading-relaxed opacity-70 mb-6">
            He famously wanted to "put a dent in the universe." Looking at the world today, it's clear that he did more than just put a dent in it; he reshaped it. He left the world better than he found it, and he gave us the inspiration to do the same. His legacy is not just in the devices we use, but in the belief that we can all make a difference.
          </p>
        </Section>

        {/* Section 20: Final Tribute */}
        <Section className="pb-48">
          <div ref={lastSectionRef} className="space-y-12">
            <p className="text-xl md:text-3xl font-light leading-relaxed opacity-90">
              Steve Jobs was a man who saw the world not as it was, but as it could be. He was a dreamer who did, a visionary who built, and a leader who inspired. His legacy is infinite, and his spirit will continue to guide us as we navigate the ever-changing landscape of the future.
            </p>
            <div className="space-y-4">
              <p className="text-lg md:text-xl font-mono uppercase tracking-widest opacity-60">Stay Hungry.</p>
              <p className="text-lg md:text-xl font-mono uppercase tracking-widest opacity-60">Stay Foolish.</p>
              <p className="text-lg md:text-xl font-mono uppercase tracking-widest opacity-60">Stay Inspired.</p>
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
