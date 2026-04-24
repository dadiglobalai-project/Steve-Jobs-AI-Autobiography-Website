import React, { useRef, useMemo, useEffect } from 'react';
import { motion, useScroll, useTransform, useInView, useReducedMotion, AnimatePresence } from 'motion/react';
import { ArrowUp } from 'lucide-react';
import { useTheme } from './ThemeProvider';
import { Section } from './Section';

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
  const containerRef = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();
  const lastSectionRef = useRef(null);
  const isLastSectionInView = useInView(lastSectionRef, { amount: 0.1 });
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  // Parallax and Scale effects
  const baseScale = useTransform(scrollYProgress, [0, 1], [1, shouldReduceMotion ? 1 : 1.15]);
  const subtleScale = useTransform(scrollYProgress, [0, 1], [1, shouldReduceMotion ? 1 : 1.06]);
  const parallax = useTransform(scrollYProgress, [0, 1], [0, shouldReduceMotion ? 0 : -50]);
  
  // Dynamic Light Leak effect
  const lightLeakX = useTransform(scrollYProgress, [0, 1], ["-20%", "20%"]);
  const lightLeakOpacity = useTransform(scrollYProgress, [0, 0.4, 0.6, 1], [0.1, 0.2, 0.15, 0.05]);
  const lightLeakRotate = useTransform(scrollYProgress, [0, 1], [0, 45]);

  // Dynamic 9-stage background mapping
  const totalSections = 9;
  const step = 1 / (totalSections - 1); 
  const fade = step * 0.4;

  const createRange = (idx: number) => {
    const start = idx * step;
    
    // Improved range for better timing: reaches 100% early and stays longer
    const r1 = idx === 0 ? 0 : Math.max(0, start - step * 0.8);
    const r2 = idx === 0 ? 0 : Math.max(0, start - step * 0.2);
    const r3 = idx === totalSections - 1 ? 1 : Math.min(1, start + step * 0.2);
    const r4 = idx === totalSections - 1 ? 1 : Math.min(1, start + step * 0.8);
    
    return [r1, r2, r3, r4];
  };

  const backgrounds = useMemo(() => [
    { id: 1, url: "https://tse4.mm.bing.net/th/id/OIP.lPDGIm3qvvwO9kmVTOjarAHaEl?rs=1&pid=ImgDetMain&o=7&rm=3", alt: "Corporate Tension" },
    { id: 2, url: "https://images.inc.com/uploaded_files/image/1920x1080/AP633526460256_sculley_jobs_pano_small_44598.jpg", alt: "Leadership Clash" },
    { id: 3, url: "https://applescoop.org/image/story/john-sculley-smiles-infront-of-a-vintage-apple-computer-and-apple-logo-applescoop-2024-12-04-22-27-31.webp", alt: "Leaving Apple" },
    { id: 4, url: "https://iconicimages.net/app/uploads/2017/01/TZ_SJ001.jpg", alt: "NeXT Founding" },
    { id: 5, url: "https://static0.howtogeekimages.com/wordpress/wp-content/uploads/2020/10/nextcube_monitor.jpg?q=50&fit=crop&w=650&dpr=1.5", alt: "Education Vision" },
    { id: 6, url: "https://d.ibtimes.com/en/full/1981964/next.jpg", alt: "Future Architecture" },
    { id: 7, url: "https://www.freefonts.io/wp-content/uploads/2022/03/Pixar-Font.jpg", alt: "Pixar Founding" },
    { id: 8, url: "https://wallpapercave.com/wp/wp4501392.jpg", alt: "Toy Story Success" },
    { id: 9, url: "https://s.wsj.net/public/resources/images/NY-BF891_GARDNE_G_20111009180955.jpg", alt: "Shaping the Future" },
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
              scale: (i === 2 || i === 3) ? subtleScale : baseScale,
              y: parallax,
              willChange: 'opacity'
            }}
            className="absolute -top-10 -bottom-20 left-0 right-0"
          >
            <img 
              src={bg.url} 
              alt={bg.alt}
              loading={i === 0 ? "eager" : "lazy"}
              className={`w-full h-full object-cover opacity-40 ${
                (i === 2 || i === 3) ? 'object-top lg:object-[center_15%]' : 'object-center'
              }`}
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

      {/* Content */}
      <div className="relative z-10">
        {/* Hero Section */}
        <Section image={backgrounds[0]?.url} alt={backgrounds[0]?.alt} className="items-center text-center" isHero>
         
          <h1 className="text-5xl md:text-8xl font-light tracking-tighter leading-[0.9] mb-6 md:mb-12">
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
            className="text-base md:text-2xl font-light leading-relaxed max-w-3xl mx-auto opacity-70"
          >
            In the late summer of 1985, only a year after the Macintosh was born, Steve Jobs faced a difficult time. The company he had started and poured his soul into was moving forward into a new era. It was a time that no longer had a place for him as its leader. 
          </motion.p>
          
        </Section>

        {/* Section 2: Tension */}
        <Section image={backgrounds[1]?.url} alt={backgrounds[1]?.alt}>
          <h2 className="text-xl md:text-6xl font-light tracking-tight mb-4 md:mb-8">Trouble at Apple</h2>
          <p className="text-sm md:text-xl font-light leading-relaxed opacity-70 mb-4 md:mb-6">
            For months, the halls of Apple had been filled with a growing tension. Jobs’ high standards and radical ideas, which had once been the company's greatest strength, were now seen as a source of trouble. He believed in perfection at any cost, but the board of directors wanted a more traditional way of doing business.
          </p>
          <p className="text-sm md:text-xl font-light leading-relaxed opacity-70">
            John Sculley, the man Jobs had personally chosen to lead the company, was now on the other side of a bitter fight for control. It was a clash of two different worlds, one focused on the bottom line and the other on a vision that refused to compromise. The partnership that was supposed to change the world had finally reached its breaking point.
          </p>
        </Section>

        {/* Section 3: The Departure */}
        <Section image={backgrounds[2]?.url} alt={backgrounds[2]?.alt}>
          <div className="border-l-2 border-current pl-6 md:pl-8 py-2 md:py-4">
            <h2 className="text-lg md:text-5xl font-light italic serif mb-4 md:mb-6">"The Board's Decision"</h2>
            <p className="text-base md:text-xl font-light leading-relaxed opacity-70 mb-4">
              In the end, the company’s board of directors chose to side with Sculley’s safe path over Jobs’ unpredictable fire. Jobs was stripped of his power and his projects, leaving him feeling alone and betrayed. He was thirty years old, and the only life he had ever known was suddenly gone.
            </p>
            <p className="text-base md:text-xl font-light leading-relaxed opacity-70">
              With a heavy heart but a clear mind, he made the difficult choice to leave Apple. He walked away from the very thing he had created, carrying with him the lessons of failure and the quiet determination to start again. It was a moment of deep sadness, but also the first step toward a new kind of freedom.
            </p>
          </div>
        </Section>

        {/* Section 4: Founding NeXT */}
        <Section image={backgrounds[3]?.url} alt={backgrounds[3]?.alt}>
          <h2 className="text-xl md:text-6xl font-light tracking-tight mb-4 md:mb-8">Starting NeXT</h2>
          <p className="text-sm md:text-xl font-light leading-relaxed opacity-70 mb-4 md:mb-6">
            Refusing to stay idle, Jobs poured his restless energy into a bold new project. Later that same year, he started NeXT to build the next generation of powerful computers. He gathered a small team of talented engineers who still believed in his vision, and together they began to work in a small office that felt like the early days at Apple.
          </p>
          <p className="text-sm md:text-xl font-light leading-relaxed opacity-70">
            For Jobs, it wasn't just about starting over. It was about proving that his vision for the future was as strong as ever, even without the company he had co-founded. He traded the heavy burden of success for the light feeling of being a beginner again, ready to build something even better.
          </p>
        </Section>

        {/* Section 5: NeXT Vision */}
        <Section image={backgrounds[4]?.url} alt={backgrounds[4]?.alt}>
          <h2 className="text-xl md:text-6xl font-light tracking-tight mb-4 md:mb-8">Learning and Research</h2>
          <p className="text-sm md:text-xl font-light leading-relaxed opacity-70 mb-4 md:mb-6">
            His goal for NeXT was to create the ultimate machines for schools and research. He believed that by giving people better tools, he could help them think in more creative ways. He wanted to build a computer that was not just a machine, but a partner in the search for knowledge.
          </p>
          <p className="text-sm md:text-xl font-light leading-relaxed opacity-70">
            It was a return to his core belief that technology should be a bicycle for the mind. He wanted to amplify human potential and help people explore the world in ways they never thought possible. Even in these difficult years, his focus on the user never wavered.
          </p>
        </Section>

        {/* Section 6: NeXT Legacy */}
        <Section image={backgrounds[5]?.url} alt={backgrounds[5]?.alt}>
          <h2 className="text-xl md:text-6xl font-light tracking-tight mb-4 md:mb-8">A Strong Base</h2>
          <p className="text-sm md:text-xl font-light leading-relaxed opacity-70 mb-4 md:mb-6">
            While NeXT struggled in the market, it was not a failure. The advanced software built during those years was far ahead of its time. It was designed to be powerful yet elegant, a reflection of Jobs’ refusal to settle for anything less than excellence.
          </p>
          <p className="text-sm md:text-xl font-light leading-relaxed opacity-70">
            The work done at NeXT became the base for the systems used in Macs and iPhones today. Jobs just kept building and learning from his mistakes, unaware that the tools he was creating would one day save the company he had been forced to leave.
          </p>
        </Section>

        {/* Section 7: Pixar Founding */}
        <Section image={backgrounds[6]?.url} alt={backgrounds[6]?.alt}>
          <h2 className="text-xl md:text-6xl font-light tracking-tight mb-4 md:mb-8">Starting Pixar</h2>
          <p className="text-sm md:text-xl font-light leading-relaxed opacity-70 mb-4 md:mb-6">
            In 1986, Jobs bought a small group of computer experts from Lucasfilm. He saw that computers could be more than just tools for data, they could be a new way to tell amazing stories. He believed that technology and art could come together to create something truly magical.
          </p>
          <p className="text-sm md:text-xl font-light leading-relaxed opacity-70">
            He started a new company called Pixar. He continued to fund the team through its hardest times, even when the company was losing money. This showed a more patient side of his leadership, as he was willing to wait years for a vision he believed in.
          </p>
        </Section>

        {/* Section 8: Pixar Success */}
        <Section image={backgrounds[7]?.url} alt={backgrounds[7]?.alt}>
          <h2 className="text-xl md:text-6xl font-light tracking-tight mb-4 md:mb-8">Toy Story</h2>
          <p className="text-sm md:text-xl font-light leading-relaxed opacity-70 mb-4 md:mb-6">
            In 1995, the long wait finally paid off with the release of Toy Story. It was the first full-length movie made entirely with computers and became a huge hit. The world was amazed by the technology, but it was the heart of the story that truly captured people’s imaginations.
          </p>
          <p className="text-sm md:text-xl font-light leading-relaxed opacity-70">
            Toy Story changed movies forever. It proved that computers could be used to create characters and stories that people really cared about. Jobs had found a way to combine his love for technology with the timeless power of storytelling.
          </p>
        </Section>

        {/* Section 9: Conclusion */}
        <Section image={backgrounds[8]?.url} alt={backgrounds[8]?.alt} className="pb-48">
          <div ref={lastSectionRef} className="space-y-8 md:space-y-12">
            <p className="text-base md:text-2xl font-light leading-relaxed opacity-90">
              For Steve Jobs, this chapter was defined by what he found, not what he lost. He learned that the most important work often happens in the quiet moments of rebuilding, when the spotlight is gone and all that remains is the vision.
            </p>
            <p className="text-base md:text-2xl font-light leading-relaxed opacity-90">
              In the end, he did more than just change his own story. He helped shape the future of how we use technology and how we experience the magic of storytelling. His journey through the wilderness had made him the leader the world would soon come to know.
            </p>
            <div className="space-y-4">
              <p className="text-base md:text-xl font-mono uppercase tracking-widest opacity-60">Persistence.</p>
              <p className="text-base md:text-xl font-mono uppercase tracking-widest opacity-60">Vision.</p>
              <p className="text-base md:text-xl font-mono uppercase tracking-widest opacity-60">Storytelling.</p>
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
