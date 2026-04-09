import React, { useRef, useMemo } from 'react';
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

export const Story1974: React.FC = () => {
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
      url: 'https://as1.ftcdn.net/jpg/02/59/42/36/1000_F_259423626_lVdwUWWpVynIV36I3AKYEDwLpjmaB2On.jpg', 
      alt: 'Foggy road representing uncertainty and search for direction' 
    },
    { 
      id: 'atari-search', 
      opacity: bgAtariSearch, 
      url: 'https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEg768aXXw2QIQvVLtV7oq27VCIneGTMkuYMogDry0ekshIEKYDGG1_l2RzrWkDAE7MzUkPiWF4jYXwA4bUHQw8d-4RGKYvTzjCohz6ACMc1JBhIVkXKbONgIf3pBy-uq5wO2KkP_QTVomm8Ghu9oaudpqyiu10QGB3fHKgs1GkzeUByjJ-Y5GuqxnAt/w1200-h630-p-k-no-nu/atari-heavy-box-small.jpg', 
      alt: 'Macro shot of a circuit board representing Atari technology', 
      grayscale: true 
    },
    { 
      id: 'atari-grid', 
      opacity: bgAtariGrid, 
      url: 'https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEg768aXXw2QIQvVLtV7oq27VCIneGTMkuYMogDry0ekshIEKYDGG1_l2RzrWkDAE7MzUkPiWF4jYXwA4bUHQw8d-4RGKYvTzjCohz6ACMc1JBhIVkXKbONgIf3pBy-uq5wO2KkP_QTVomm8Ghu9oaudpqyiu10QGB3fHKgs1GkzeUByjJ-Y5GuqxnAt/w1200-h630-p-k-no-nu/atari-heavy-box-small.jpg', 
      alt: 'Retro computer equipment and grid-like structures' 
    },
    { 
      id: 'atari-night', 
      opacity: bgAtariNight, 
      url: 'https://img.freepik.com/free-photo/high-angle-man-working-late-night_23-2150280982.jpg', 
      alt: 'Dark, focused workspace representing the night shift' 
    },
    { 
      id: 'philosophy', 
      opacity: bgPhilosophy, 
      url: 'https://static.vecteezy.com/system/resources/previews/001/817/001/non_2x/young-man-reading-books-in-home-garden-with-nature-free-photo.jpg', 
      alt: 'Zen-like meditation scene representing philosophical exploration' 
    },
    { 
      id: 'india-travel', 
      opacity: bgIndiaTravel, 
      url: 'https://static.toiimg.com/thumb/imgsize-23456,msid-43218008,width-600,resizemode-4/43218008.jpg', 
      alt: 'Wide horizon landscape in India' 
    },
    { 
      id: 'india-reality', 
      opacity: bgIndiaReality, 
      url: 'https://www.stewartinvestors.com/content/dam/stewartinvestors/images/article-headers/Chaos-India-Aug24.jpg', 
      alt: 'Textured Indian street scene representing reality' 
    },
    { 
      id: 'india-monk', 
      opacity: bgIndiaMonk, 
      url: 'https://images.unsplash.com/photo-1514222134-b57cbb8ce073?auto=format&fit=crop&w=1920&q=80', 
      alt: 'Spiritual temple textures and monk-like simplicity' 
    },
    { 
      id: 'intuition', 
      opacity: bgIntuition, 
      url: 'https://i.ytimg.com/vi/Iwl5f-2-PI4/maxresdefault.jpg', 
      alt: 'Abstract fluid motion representing intuition' 
    },
    { 
      id: 'synthesis', 
      opacity: bgSynthesis, 
      url: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1920&q=80', 
      alt: 'Minimalist architecture representing the synthesis of ideas', 
      grayscale: true 
    },
    { 
      id: 'apple-philosophy', 
      opacity: bgApplePhilosophy, 
      url: 'https://images.unsplash.com/photo-1491933382434-500287f9b54b?auto=format&fit=crop&w=1920&q=80', 
      alt: 'Clean, minimalist design representing Apple philosophy' 
    },
    { 
      id: 'conclusion', 
      opacity: bgConclusion, 
      url: 'https://www.brandbuffet.in.th/wp-content/uploads/2018/03/Jobs.jpeg', 
      alt: 'Bright, open workspace representing the future and legacy' 
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

        {backgrounds.map((bg) => (
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
          <span className="text-xs font-mono uppercase tracking-[0.5em] mb-6 block opacity-40">1970 to 1974</span>
          <h1 className="text-5xl md:text-8xl font-light tracking-tighter leading-[0.9] mb-12">
            The Search for <br />
            <motion.span 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.2, duration: 1 }}
              className="italic serif bg-gradient-to-r from-orange-400 to-rose-400 bg-clip-text text-transparent"
            >
              Meaning
            </motion.span>
          </h1>
          <p className="text-xl md:text-3xl font-light leading-relaxed opacity-80 max-w-2xl">
            In the early 1970s, long before the world knew his name, Steve Jobs was a young man looking for his place in the world. He was a dreamer, driven by a strong curiosity and a feeling that the normal paths of society were too narrow for the big questions in his mind.
          </p>
        </Section>

        {/* Atari */}
        <Section>
          <h2 className="text-4xl md:text-6xl font-light tracking-tight mb-8">The Atari Days</h2>
          <p className="text-lg md:text-xl font-light leading-relaxed opacity-70 mb-6">
            Looking for a way to fund his curiosity, Jobs found himself at the door of Atari, a new company that was then the center of the early video game world. Working as a technician, he was surrounded by basic electronics and simple logic. The environment was tough, fast, and focused on how players reacted to the games.
          </p>
          <p className="text-lg md:text-xl font-light leading-relaxed opacity-70">
            It was here, among the tools and circuit boards, that he first saw the power of simple design. Atari’s games, like Pong, were successful not because they were complex, but because they were easy to use. Anyone could understand them in seconds.
          </p>
        </Section>

        {/* Simplicity Lesson */}
        <Section>
          <div className="border-l-2 border-current pl-8 py-4">
            <h2 className="text-3xl md:text-5xl font-light italic serif mb-6">"The Power of Less"</h2>
            <p className="text-lg md:text-xl font-light leading-relaxed opacity-70">
              At Atari, simplicity was necessary because of technical limits. Engineers were challenged to build games with very few parts. This taught Jobs a big lesson: that true beauty is found not in what you add, but in what you have the courage to take away. He began to see that a design was finished not when there was nothing left to add, but when there was nothing left to remove.
            </p>
          </div>
        </Section>

        {/* Unusual Behavior */}
        <Section>
          <h2 className="text-4xl md:text-6xl font-light tracking-tight mb-8">The Quiet of the Night</h2>
          <p className="text-lg md:text-xl font-light leading-relaxed opacity-70 mb-6">
            Jobs was different even in the unusual halls of Atari. He asked to work the night shift, a move that allowed him to avoid the trouble of office life and focus on his work alone. In the quiet hours of the night, surrounded by parts of circuit boards, he learned how to see the heart of a problem.
          </p>
          <p className="text-lg md:text-xl font-light leading-relaxed opacity-70">
            While others saw him as difficult or different, Jobs was actually learning to think for himself. He was learning to trust his own eyes and his own judgment, even when it went against what everyone else thought.
          </p>
        </Section>

        {/* Looking Beyond */}
        <Section>
          <h2 className="text-4xl md:text-6xl font-light tracking-tight mb-8">The Pull of the East</h2>
          <p className="text-lg md:text-xl font-light leading-relaxed opacity-70 mb-6">
            Even with his success at Atari, the technical world felt like it was missing something. He began to spend his money on books that explored how people think and feel. He was interested in the teachings of Zen and the stories of India, which suggested that our inner thoughts shape the world around us.
          </p>
          <p className="text-lg md:text-xl font-light leading-relaxed opacity-70">
            The more he read, the more he felt drawn toward the East. He realized that to truly understand the world, he first had to understand himself. The restlessness of his youth was now turning into a clear and daring purpose.
          </p>
        </Section>

        {/* India Decision */}
        <Section>
          <div className="text-center">
            <span className="text-xs font-mono uppercase tracking-[0.5em] mb-6 block opacity-40">1974</span>
            <h2 className="text-5xl md:text-8xl font-light tracking-tighter mb-8">The Journey to <br /><span className="italic serif">India</span></h2>
            <p className="text-xl md:text-2xl font-light leading-relaxed opacity-70 max-w-2xl mx-auto">
              In 1974, Jobs walked away from his job at Atari, took his savings, and went to India. He wasn't looking for a vacation. He was looking for a teacher, a truth, and a way to connect his technical mind with his spiritual side.
            </p>
          </div>
        </Section>

        {/* Arrival & Reality */}
        <Section>
          <h2 className="text-4xl md:text-6xl font-light tracking-tight mb-8">The Shock of the Real</h2>
          <p className="text-lg md:text-xl font-light leading-relaxed opacity-70 mb-6">
            India was not the peaceful place he had imagined in his books. It was a busy, loud, and often tough place for the senses. He was met with intense heat and poverty. The teacher he had traveled so far to see had passed away before he arrived.
          </p>
          <p className="text-lg md:text-xl font-light leading-relaxed opacity-70">
            But instead of turning back, Jobs kept going. He realized that finding peace wasn't about finding a perfect place, but about finding a clear mind even when things are messy.
          </p>
        </Section>

        {/* Simpler Living */}
        <Section>
          <h2 className="text-4xl md:text-6xl font-light tracking-tight mb-8">Living Simply</h2>
          <p className="text-lg md:text-xl font-light leading-relaxed opacity-70 mb-6">
            He spent months traveling through the dusty plains and mountains of India. He shaved his head, wore simple clothes, and lived with only what he needed. By leaving behind the comforts of his life at home, he began to feel truly present.
          </p>
          <p className="text-lg md:text-xl font-light leading-relaxed opacity-70">
            He learned to sit in silence, to look at the world without judging it, and to appreciate the beauty of a single, well-made moment. The noise of wanting more was replaced by the quiet of being aware.
          </p>
        </Section>

        {/* Intuition */}
        <Section>
          <h2 className="text-4xl md:text-6xl font-light tracking-tight mb-8">The Power of Intuition</h2>
          <p className="text-lg md:text-xl font-light leading-relaxed opacity-70 mb-6">
            In India, Jobs had a very important realization: the power of intuition. He saw that while people in the West valued logical thinking, people in the East understood a more direct way of knowing. He began to see that logic could only take you so far. To create something truly new, you had to trust your gut.
          </p>
          <p className="text-lg md:text-xl font-light leading-relaxed opacity-70">
            He later said that the people in India used their intuition instead of just their intellect. This idea would guide every product he would ever build.
          </p>
        </Section>

        {/* The Return */}
        <Section>
          <h2 className="text-4xl md:text-6xl font-light tracking-tight mb-8">The Return</h2>
          <p className="text-lg md:text-xl font-light leading-relaxed opacity-70 mb-6">
            When Jobs finally returned to California, he was a changed man. He was thinner, his skin was dark from the sun, and his eyes showed a new kind of focus. He hadn't found a teacher, but he had found something even better: a sense of inner strength.
          </p>
          <p className="text-lg md:text-xl font-light leading-relaxed opacity-70">
            He went back to Atari for a short time, but he was no longer just a worker looking for a paycheck. He was a dreamer who had realized that his mission was to bring the clarity and beauty he had found in the East into the tools of the West.
          </p>
        </Section>

        {/* The Foundation */}
        <Section>
          <h2 className="text-4xl md:text-6xl font-light tracking-tight mb-8">A New Mix</h2>
          <p className="text-lg md:text-xl font-light leading-relaxed opacity-70 mb-6">
            The experiences of 1974 created a unique mix in Jobs' mind. He now had the skills of an engineer and the heart of a monk. He understood how to build a machine, but he also understood why a machine should be beautiful.
          </p>
          <p className="text-lg md:text-xl font-light leading-relaxed opacity-70">
            This mix of technology and art would define his life's work. He wasn't just interested in what a computer could do. He was interested in what a computer could be.
          </p>
        </Section>

        {/* Apple Philosophy */}
        <Section>
          <h2 className="text-4xl md:text-6xl font-light tracking-tight mb-8">The Birth of an Idea</h2>
          <p className="text-lg md:text-xl font-light leading-relaxed opacity-70 mb-6">
            The seeds of Apple's ideas were planted in these quiet years. He believed that design is not just what something looks like, but how it works. He was obsessed with the parts of a product that people don't see. He believed that technology should be a clean and easy part of the human spirit.
          </p>
          <p className="text-lg md:text-xl font-light leading-relaxed opacity-70">
            He began to imagine products that didn't just solve problems, but inspired people. He wanted to create tools that were as simple and deep as a Zen garden.
          </p>
        </Section>

        {/* Building Himself */}
        <Section>
          <h2 className="text-4xl md:text-6xl font-light tracking-tight mb-8">Building Himself</h2>
          <p className="text-lg md:text-xl font-light leading-relaxed opacity-70 mb-6">
            Looking back, 1974 was the year Steve Jobs built the most important thing of his life: himself. Before he could lead a company or change the world, he had to find his own voice. He had to be willing to be a wanderer and to fail in the eyes of others.
          </p>
          <p className="text-lg md:text-xl font-light leading-relaxed opacity-70">
            He learned that the most important work is the work you do on yourself. He built the discipline and the focus that would later allow him to stand alone against the giants of the industry.
          </p>
        </Section>

        {/* Conclusion */}
        <Section className="pb-48">
          <div ref={lastSectionRef} className="space-y-12">
            <p className="text-xl md:text-4xl font-light leading-relaxed opacity-90">
              The journey of 1974 showed the power of following your own heart, even when it leads into the unknown.
            </p>
            <div className="space-y-6">
              <p className="text-lg md:text-2xl font-mono uppercase tracking-[0.3em] opacity-60">A love for simplicity.</p>
              <p className="text-lg md:text-2xl font-mono uppercase tracking-[0.3em] opacity-60">A strong trust in intuition.</p>
              <p className="text-lg md:text-2xl font-mono uppercase tracking-[0.3em] opacity-60">A deep and endless curiosity.</p>
            </div>
            <p className="text-lg md:text-xl font-light leading-relaxed opacity-70 max-w-2xl">
              These were the ideas that the future of computers would be built on. The young man who returned from India was no longer just looking for a path; he was ready to create one.
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
