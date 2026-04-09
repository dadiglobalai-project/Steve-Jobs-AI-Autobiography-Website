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

export const Story1985: React.FC = () => {
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

  // Dynamic 25-stage background mapping
  const totalSections = 25;
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
    { id: 1, url: "https://picsum.photos/seed/office/1920/1080", alt: "Corporate Tension" },
    { id: 2, url: "https://picsum.photos/seed/suit/1920/1080", alt: "Leadership Clash" },
    { id: 3, url: "https://picsum.photos/seed/exit/1920/1080", alt: "Leaving Apple" },
    { id: 4, url: "https://picsum.photos/seed/sky/1920/1080", alt: "New Horizon" },
    { id: 5, url: "https://picsum.photos/seed/nature/1920/1080", alt: "Freeing Moment" },
    { id: 6, url: "https://picsum.photos/seed/modern/1920/1080", alt: "NeXT Founding" },
    { id: 7, url: "https://picsum.photos/seed/library/1920/1080", alt: "Education Vision" },
    { id: 8, url: "https://picsum.photos/seed/minimal/1920/1080", alt: "Elegant Design" },
    { id: 9, url: "https://picsum.photos/seed/abstract/1920/1080", alt: "Complex Systems" },
    { id: 10, url: "https://picsum.photos/seed/market/1920/1080", alt: "Market Challenges" },
    { id: 11, url: "https://picsum.photos/seed/code/1920/1080", alt: "Software Foundation" },
    { id: 12, url: "https://picsum.photos/seed/blueprint/1920/1080", alt: "Future Architecture" },
    { id: 13, url: "https://picsum.photos/seed/cinema/1920/1080", alt: "Lucasfilm Division" },
    { id: 14, url: "https://picsum.photos/seed/art/1920/1080", alt: "Digital Storytelling" },
    { id: 15, url: "https://picsum.photos/seed/studio/1920/1080", alt: "Pixar Founding" },
    { id: 16, url: "https://picsum.photos/seed/focus/1920/1080", alt: "Visionary Commitment" },
    { id: 17, url: "https://picsum.photos/seed/toys/1920/1080", alt: "Toy Story Success" },
    { id: 18, url: "https://picsum.photos/seed/emotion/1920/1080", alt: "Emotional Stories" },
    { id: 19, url: "https://picsum.photos/seed/team/1920/1080", alt: "Creative Leadership" },
    { id: 20, url: "https://picsum.photos/seed/mountain/1920/1080", alt: "Growth as a Leader" },
    { id: 21, url: "https://picsum.photos/seed/collaboration/1920/1080", alt: "Building Teams" },
    { id: 22, url: "https://picsum.photos/seed/reunion/1920/1080", alt: "Return to Apple" },
    { id: 23, url: "https://picsum.photos/seed/construction/1920/1080", alt: "Period of Rebuilding" },
    { id: 24, url: "https://picsum.photos/seed/growth/1920/1080", alt: "Persistence and Courage" },
    { id: 25, url: "https://picsum.photos/seed/horizon/1920/1080", alt: "Shaping the Future" },
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
        <span className="text-xs font-mono uppercase tracking-[0.3em] opacity-40">Chapter 1985: A New Path</span>
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
            September 1985
          </motion.span>
          <h1 className="text-5xl md:text-8xl font-light tracking-tighter leading-[0.9] mb-12">
            The <br />
            <motion.span 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.2, duration: 1 }}
              className="italic serif bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent"
            >
              Turning Point
            </motion.span>
          </h1>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="text-xl md:text-2xl font-light leading-relaxed max-w-2xl mx-auto opacity-70"
          >
            In the late summer of 1985, only a year after the Macintosh was born, Steve Jobs faced a difficult time. The company he had started and poured his soul into was moving forward into a new era. It was a time that no longer had a place for him as its leader.
          </motion.p>
        </Section>

        {/* Section 2: Tension */}
        <Section>
          <h2 className="text-4xl md:text-6xl font-light tracking-tight mb-8">Trouble at Apple</h2>
          <p className="text-lg md:text-xl font-light leading-relaxed opacity-70 mb-6">
            For months, there had been trouble in Apple's offices. Jobs had very high standards and radical ideas that often clashed with the more traditional styles of his colleagues. John Sculley, the man Jobs had hired to lead the company, was now on the opposite side of a bitter fight for control.
          </p>
        </Section>

        {/* Section 3: The Vote */}
        <Section>
          <div className="border-l-2 border-current pl-8 py-4">
            <h2 className="text-3xl md:text-5xl font-light italic serif mb-6">"The Board's Decision"</h2>
            <p className="text-lg md:text-xl font-light leading-relaxed opacity-70">
              In the end, the company’s board of directors chose to side with Sculley. In a move that shocked everyone, Jobs was stripped of his power. Feeling alone and betrayed, he made the hard choice to leave Apple shortly after.
            </p>
          </div>
        </Section>

        {/* Section 4: Turning Point */}
        <Section>
          <h2 className="text-4xl md:text-6xl font-light tracking-tight mb-8">A New Beginning</h2>
          <p className="text-lg md:text-xl font-light leading-relaxed opacity-70 mb-6">
            To most people, this looked like the end of a great career. But for Steve Jobs, leaving Apple was not an ending. It was a major turning point. He would later say that this time was very hard for his pride, but it also set his creative spirit free.
          </p>
        </Section>

        {/* Section 5: New Beginning */}
        <Section>
          <h2 className="text-4xl md:text-6xl font-light tracking-tight mb-8">Starting Over</h2>
          <p className="text-lg md:text-xl font-light leading-relaxed opacity-70 mb-6">
            Suddenly, he was free from the weight of running a huge company. He had a rare chance to start over with the light feeling of being a beginner again. Jobs did not hide away. Instead, he moved forward with the same passion he had in the early days in his garage.
          </p>
        </Section>

        {/* Section 6: Founding NeXT */}
        <Section>
          <h2 className="text-4xl md:text-6xl font-light tracking-tight mb-8">Starting NeXT</h2>
          <p className="text-lg md:text-xl font-light leading-relaxed opacity-70 mb-6">
            He refused to stay idle and put his energy into a bold new project. Later that same year, he started NeXT. This company was dedicated to building the next generation of powerful computers that would change what machines could do.
          </p>
        </Section>

        {/* Section 7: NeXT Vision */}
        <Section>
          <h2 className="text-4xl md:text-6xl font-light tracking-tight mb-8">Learning and Research</h2>
          <p className="text-lg md:text-xl font-light leading-relaxed opacity-70 mb-6">
            His goal for NeXT was clear. He wanted to create the best machines for schools and research. These powerful computers were designed to help students and scientists explore new ideas. Jobs believed that by giving people better tools, he could help them think in more creative ways.
          </p>
        </Section>

        {/* Section 8: NeXT Design */}
        <Section>
          <h2 className="text-4xl md:text-6xl font-light tracking-tight mb-8">Focus on Design</h2>
          <p className="text-lg md:text-xl font-light leading-relaxed opacity-70 mb-6">
            At NeXT, Jobs showed the same focus on every detail that he had with the Macintosh. He cared deeply about how the computers looked. He wanted the hardware to be powerful but also elegant and beautiful.
          </p>
        </Section>

        {/* Section 9: NeXT Complexity */}
        <Section>
          <h2 className="text-4xl md:text-6xl font-light tracking-tight mb-8">Simple but Powerful</h2>
          <p className="text-lg md:text-xl font-light leading-relaxed opacity-70 mb-6">
            He pushed his team to create software that was easy for anyone to use, even if the work behind it was very complex and new.
          </p>
        </Section>

        {/* Section 10: NeXT Challenges */}
        <Section>
          <h2 className="text-4xl md:text-6xl font-light tracking-tight mb-8">Hard Times in the Market</h2>
          <p className="text-lg md:text-xl font-light leading-relaxed opacity-70 mb-6">
            However, NeXT soon ran into trouble. While the computers were very advanced, they were also very expensive. Most schools and universities could not afford them. This led to low sales and a hard fight to stay in business.
          </p>
        </Section>

        {/* Section 11: Not a Failure */}
        <Section>
          <div className="border-l-2 border-current pl-8 py-4">
            <h2 className="text-3xl md:text-5xl font-light italic serif mb-6">"Not a Failure"</h2>
            <p className="text-lg md:text-xl font-light leading-relaxed opacity-70">
              Even with these money problems, NeXT was not a failure. The new ideas and software built during those years would one day save Apple itself.
            </p>
          </div>
        </Section>

        {/* Section 12: Foundation for OS */}
        <Section>
          <h2 className="text-4xl md:text-6xl font-light tracking-tight mb-8">A Strong Base</h2>
          <p className="text-lg md:text-xl font-light leading-relaxed opacity-70 mb-6">
            The advanced software created at NeXT would eventually become the base for the systems used in Macs and iPhones today. At the time, however, that future was still far away. Jobs just kept building and learning from his mistakes.
          </p>
        </Section>

        {/* Section 13: Lucasfilm */}
        <Section>
          <h2 className="text-4xl md:text-6xl font-light tracking-tight mb-8">A Big Choice</h2>
          <p className="text-lg md:text-xl font-light leading-relaxed opacity-70 mb-6">
            While working on NeXT, Jobs made another big choice. In 1986, he spent $10 million to buy a small group of computer experts from Lucasfilm, the company that made Star Wars.
          </p>
        </Section>

        {/* Section 14: Pixar Potential */}
        <Section>
          <h2 className="text-4xl md:text-6xl font-light tracking-tight mb-8">A New Way to Tell Stories</h2>
          <p className="text-lg md:text-xl font-light leading-relaxed opacity-70 mb-6">
            This small group was finding new ways to make pictures using computers. Jobs saw something special in their work. He began to believe that computers could be more than just tools for data. They could be a new way to tell amazing stories.
          </p>
        </Section>

        {/* Section 15: Founding Pixar */}
        <Section>
          <h2 className="text-4xl md:text-6xl font-light tracking-tight mb-8">Starting Pixar</h2>
          <p className="text-lg md:text-xl font-light leading-relaxed opacity-70 mb-6">
            Jobs used his own money to support the team and started a new company called Pixar. In the beginning, Pixar made high-end hardware and short films. It was very different from the famous studio it is today, and the company lost a lot of money for many years.
          </p>
        </Section>

        {/* Section 16: Commitment */}
        <Section>
          <h2 className="text-4xl md:text-6xl font-light tracking-tight mb-8">Staying the Course</h2>
          <p className="text-lg md:text-xl font-light leading-relaxed opacity-70 mb-6">
            Even as the company lost money, Jobs did not give up. He continued to fund Pixar through its hardest times, even when it wasn't clear if it would ever succeed. This showed a more patient side of his leadership. He was willing to take big risks and wait years for a vision he believed in.
          </p>
        </Section>

        {/* Section 17: 1995: Toy Story */}
        <Section>
          <h2 className="text-4xl md:text-6xl font-light tracking-tight mb-8">1995: Toy Story</h2>
          <p className="text-lg md:text-xl font-light leading-relaxed opacity-70 mb-6">
            In 1995, that long wait finally paid off. Pixar released Toy Story, the first full-length movie made entirely with computers. The movie was a huge hit. It was a technical marvel, but it was also a moving story that people all over the world loved.
          </p>
        </Section>

        {/* Section 18: Changing Animation */}
        <Section>
          <h2 className="text-4xl md:text-6xl font-light tracking-tight mb-8">A New World of Movies</h2>
          <p className="text-lg md:text-xl font-light leading-relaxed opacity-70 mb-6">
            Toy Story changed movies forever. It proved that computers could be used to create characters and stories that people really cared about. After this success, Pixar went on to make many more great films and became one of the most loved studios in the world.
          </p>
        </Section>

        {/* Section 19: Leadership at Pixar */}
        <Section>
          <h2 className="text-4xl md:text-6xl font-light tracking-tight mb-8">Leading with Heart</h2>
          <p className="text-lg md:text-xl font-light leading-relaxed opacity-70 mb-6">
            Jobs played a big part in Pixar's success. He gave the team guidance, protected their creative freedom, and made the deal with Disney. Under his care, Pixar grew from a struggling startup into a world leader in both art and business.
          </p>
        </Section>

        {/* Section 20: Contrast */}
        <Section>
          <h2 className="text-4xl md:text-6xl font-light tracking-tight mb-8">A Time of Change</h2>
          <p className="text-lg md:text-xl font-light leading-relaxed opacity-70 mb-6">
            Looking back, this decade of Jobs’ life was full of change. He had been pushed out of Apple, but in that time, he built two new companies that would change both technology and movies forever.
          </p>
        </Section>

        {/* Section 21: Growth as a Leader */}
        <Section>
          <h2 className="text-4xl md:text-6xl font-light tracking-tight mb-8">Growing as a Leader</h2>
          <p className="text-lg md:text-xl font-light leading-relaxed opacity-70 mb-6">
            This time showed how much he had grown. NeXT gave him the space to mature. He became more patient and more focused on building great teams. Pixar showed his ability to see potential in new areas and his support for human creativity.
          </p>
        </Section>

        {/* Section 22: Return */}
        <Section>
          <h2 className="text-4xl md:text-6xl font-light tracking-tight mb-8">The Return</h2>
          <p className="text-lg md:text-xl font-light leading-relaxed opacity-70 mb-6">
            Eventually, these disparate experiences would converge in a way no one could have predicted. In 1997, a struggling Apple acquired NeXT, bringing Jobs back to the company he had co-founded. The innovative software developed at NeXT became the bedrock for Apple’s future success. Simultaneously, Pixar’s meteoric rise continued, culminating in its acquisition by Disney in 2006, which made Jobs the largest individual shareholder of the Walt Disney Company.
          </p>
        </Section>

        {/* Section 23: Wilderness */}
        <Section>
          <h2 className="text-4xl md:text-6xl font-light tracking-tight mb-8">A Vital Time</h2>
          <p className="text-lg md:text-xl font-light leading-relaxed opacity-70 mb-6">
            The years away from Apple were not a setback. They were a vital time of rebuilding and discovery. This part of his life showed that even big failures can lead to growth, and that taking a new path can lead to lasting success.
          </p>
        </Section>

        {/* Section 24: Courage */}
        <Section>
          <h2 className="text-4xl md:text-6xl font-light tracking-tight mb-8">Courage to Start Over</h2>
          <p className="text-lg md:text-xl font-light leading-relaxed opacity-70 mb-6">
            For Steve Jobs, this long and hard chapter was not about what he lost. Instead, it was about the power of learning and the courage to start over from nothing to build something even better.
          </p>
        </Section>

        {/* Section 25: Conclusion */}
        <Section className="pb-48">
          <div ref={lastSectionRef} className="space-y-12">
            <p className="text-xl md:text-3xl font-light leading-relaxed opacity-90">
              In doing so, he did more than just change his own story. He helped shape the future of how we use technology and how we experience the magic of storytelling for years to come.
            </p>
            <div className="space-y-4">
              <p className="text-lg md:text-xl font-mono uppercase tracking-widest opacity-60">Persistence.</p>
              <p className="text-lg md:text-xl font-mono uppercase tracking-widest opacity-60">Vision.</p>
              <p className="text-lg md:text-xl font-mono uppercase tracking-widest opacity-60">Storytelling.</p>
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
