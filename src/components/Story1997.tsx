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

export const Story1997: React.FC = () => {
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
    { id: 1, url: "https://www.beingguru.com/wp-content/uploads/2018/11/apple-times-magazine-758x426.png", alt: "Apple in Crisis" },
    { id: 2, url: "https://miro.medium.com/v2/resize:fit:1200/0*Gr4UiHXNdsW8d4HD.jpg", alt: "The Return" },
    { id: 3, url: "https://www.fayerwayer.com/resizer/qNUYfQk6imBJExUu6k251oSdDhQ=/1600x0/filters:format(jpg):quality(70)/cloudfront-us-east-1.images.arcpublishing.com/metroworldnews/XQGKUN6IHJABXHFIP47E4GXDNY.jpg", alt: "Lost Identity" },
    { id: 4, url: "https://waz.smartdraw.com/working-smarter/img/jobs_strategy_matrix.png?bn=15100111939", alt: "The Product Grid" },
    { id: 5, url: "https://static.wixstatic.com/media/47c240_b10eac11c9844d299bddd3c89939afb3~mv2.jpg/v1/fill/w_1000,h_667,al_c,q_85,usm_0.66_1.00_0.01/47c240_b10eac11c9844d299bddd3c89939afb3~mv2.jpg", alt: "Think Different" },
    { id: 6, url: "https://www.ispazio.net/wp-content/uploads/2025/02/jony-ive-ricorda-steve-jobs-ispazio-533x300.jpg", alt: "Design and Simplicity" },
    { id: 7, url: "https://static.beebom.com/wp-content/uploads/2018/05/First-Gen-iMac-1998-website.jpg", alt: "The iMac Launch" },
    { id: 8, url: "https://www.brandingmag.com/wp-content/uploads/2023/11/Apple-stock-price_JohnJames_Brandingmag.png", alt: "Greatest Turnaround" },
    { id: 10, url: "https://media.tech-latest.com/wp-content/uploads/2023/08/16102212/iMac-Launch.jpg", alt: "Apple Transformed" },
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
            className="absolute -top-10 -bottom-20 left-0 right-0"
          >
            <img 
              src={bg.url} 
              alt={bg.alt}
              loading={i === 0 ? "eager" : "lazy"}
              className="w-full h-full object-cover opacity-40"
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
              className="italic serif bg-gradient-to-r from-red-400 to-orange-400 bg-clip-text text-transparent"
            >
              Great Return
            </motion.span>
          </h1>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="text-base md:text-2xl font-light leading-relaxed max-w-3xl mx-auto opacity-70"
          >
            By the summer of 1997, Apple was in deep trouble and close to failing completely. The company that had once started the personal computer revolution was now lost, drifting without a clear vision or a reason to exist. It was losing hundreds of millions of dollars every few months and had no clear plan for the future. Its products were a confusing mess, with too many models that no one really wanted, and the world was beginning to write its obituary.
          </motion.p>
          
        </Section>

        {/* Section 2: The Return */}
        <Section image={backgrounds[1]?.url} alt={backgrounds[1]?.alt}>
          <h2 className="text-xl md:text-6xl font-light tracking-tight mb-4 md:mb-8">A Surprise Return</h2>
          <p className="text-sm md:text-xl font-light leading-relaxed opacity-70 mb-4 md:mb-6">
            At this desperate time, something amazing happened. Steve Jobs returned to the company he had started in a garage twenty years earlier. He came back because Apple bought NeXT, the company he had built while he was away, primarily to acquire its advanced operating system. At first, he was just an advisor, but he soon became the interim CEO, jokingly calling himself the 'iCEO.' Even though it was supposed to be temporary, his strong presence and quick decisions showed that he was ready to change Apple's future.
          </p>
          <p className="text-sm md:text-xl font-light leading-relaxed opacity-70">
            He walked back into the offices he had been forced to leave a decade before, carrying with him the lessons of his years in the wilderness. He wasn't the same impulsive young man who had left; he was now a leader who understood the value of patience and the importance of a great team. His return brought a sudden spark of hope to a company that had forgotten how to dream.
          </p>
        </Section>

        {/* Section 3: Lost Identity */}
        <Section image={backgrounds[2]?.url} alt={backgrounds[2]?.alt}>
          <div className="border-l-2 border-current pl-6 md:pl-8 py-2 md:py-4">
            <h2 className="text-lg md:text-5xl font-light italic serif mb-4 md:mb-6">"Finding Apple's Soul"</h2>
            <p className="text-base md:text-xl font-light leading-relaxed opacity-70 mb-4">
              From his first day back, Jobs saw exactly what was wrong. He saw that Apple had become boring and lost its way, trying to do too many things and failing at all of them. He believed that the company was drowning in its own rules and slow ways, producing products that lacked heart and purpose. Jobs knew that to save Apple, he had to cut away everything that wasn't needed and return to the simple values that made it great in the first place.
            </p>
            <p className="text-base md:text-xl font-light leading-relaxed opacity-70">
              He spent his time talking to the engineers and designers, trying to find the spark that was still left in the company. He realized that Apple’s soul wasn't in its spreadsheets or its market share, but in its ability to make tools that empowered people. He decided that every project that didn't contribute to this core mission had to go, no matter how much money had already been spent on it.
            </p>
          </div>
        </Section>

        {/* Section 4: The Grid */}
        <Section image={backgrounds[3]?.url} alt={backgrounds[3]?.alt}>
          <h2 className="text-xl md:text-6xl font-light tracking-tight mb-4 md:mb-8">Doing More with Less</h2>
          <p className="text-sm md:text-xl font-light leading-relaxed opacity-70 mb-4 md:mb-6">
            In one of his first big moves, Jobs cut most of Apple’s ongoing projects. He turned dozens of confusing models into a simple grid of four products: two for home use and two for professional use. His idea was simple. Instead of making many average products, Apple would focus all its energy on making just a few great ones that could change the world. He wanted the company to do less, but do it better than anyone else.
          </p>
          <p className="text-sm md:text-xl font-light leading-relaxed opacity-70">
            This sudden change shocked everyone at Apple. Projects were canceled, teams were changed, and the company's goals were reset almost overnight. Jobs was firm and focused on being the best, walking through the offices and asking one simple question over and over: "Is this product great?" If the answer was not a clear yes, the project was stopped right then and there, freeing up the company's best minds to focus on the future.
          </p>
        </Section>

        {/* Section 5: Think Different */}
        <Section image={backgrounds[4]?.url} alt={backgrounds[4]?.alt}>
          <h2 className="text-xl md:text-6xl font-light tracking-tight mb-4 md:mb-8">A New Way to Think</h2>
          <p className="text-sm md:text-xl font-light leading-relaxed opacity-70 mb-4 md:mb-6">
            While fixing the products, Jobs also worked to change how people felt about working at Apple. He wanted to bring back the excitement and the pride of being creative, encouraging people to think in new ways and take risks. This belief, that technology should help people be creative, became the heart of the company again. Later that year, Apple launched the famous "Think Different" ads to show the world that it was back to its roots.
          </p>
          <p className="text-sm md:text-xl font-light leading-relaxed opacity-70">
            The ads didn't talk about technical details or the products themselves. Instead, they celebrated the 'crazy ones,' the people who changed history with their big ideas. The message was clear: Apple was for the dreamers and the doers, for those who dared to be different and believed they could change the world. It was a reminder that Apple wasn't just a computer company, but a company that stood for something meaningful.
          </p>
        </Section>

        {/* Section 6: Design and Simplicity */}
        <Section image={backgrounds[5]?.url} alt={backgrounds[5]?.alt}>
          <h2 className="text-xl md:text-6xl font-light tracking-tight mb-4 md:mb-8">Focus on Beauty</h2>
          <p className="text-sm md:text-xl font-light leading-relaxed opacity-70 mb-4 md:mb-6">
            He focused on design and simplicity, believing these were the keys to making technology easy for everyone to use. He felt that products should be powerful but also beautiful objects that people would love to look at and touch. During this time, he started working closely with a young designer named Jony Ive, who shared his obsession with perfection. Together, they worked in a secret studio to create a new generation of devices that felt human and new.
          </p>
          <p className="text-sm md:text-xl font-light leading-relaxed opacity-70">
            Their partnership was built on a shared language of minimalism and a deep respect for materials. They didn't just want to make computers; they wanted to make icons. Jobs protected the design team from the rest of the company, giving them the freedom to experiment and fail until they found something truly revolutionary. This focus on beauty would soon become Apple's most recognizable trait.
          </p>
        </Section>

        {/* Section 7: The iMac */}
        <Section image={backgrounds[6]?.url} alt={backgrounds[6]?.alt}>
          <h2 className="text-xl md:text-6xl font-light tracking-tight mb-4 md:mb-8">1998: The iMac</h2>
          <p className="text-sm md:text-xl font-light leading-relaxed opacity-70 mb-4 md:mb-6">
            In 1998, their work led to the iMac, a machine that changed everything. It looked completely different from the boring beige boxes of the time, with a colorful, see-through case that looked friendly and inviting. It was simple to set up and use right away, with a handle that practically begged you to pick it up. For millions of people, the iMac made computers feel fun and easy to use, rather than cold and intimidating.
          </p>
          <p className="text-sm md:text-xl font-light leading-relaxed opacity-70">
            The iMac was a huge hit right away, showing that Apple was back and could lead the industry again. It brought new energy and money to the company, proving that Jobs’ focus on design and simplicity was exactly what the market wanted. It was the first step in a long line of products that would redefine how we interact with technology in our daily lives.
          </p>
        </Section>

        {/* Section 8: The Turnaround */}
        <Section image={backgrounds[7]?.url} alt={backgrounds[7]?.alt}>
          <h2 className="text-2xl md:text-6xl font-light tracking-tight mb-4 md:mb-8">Leading with Focus</h2>
          <p className="text-base md:text-xl font-light leading-relaxed opacity-70 mb-4 md:mb-6">
            Slowly, things began to get better. Sales went up, the stock price rose, and people felt excited again. Apple was no longer just trying to keep up; it was leading the way. The return of Steve Jobs and the saving of Apple is known as one of the greatest turnarounds in business history. He had taken a company on the brink of death and turned it into a symbol of innovation and success.
          </p>
          <p className="text-base md:text-xl font-light leading-relaxed opacity-70">
            His leadership style was still intense and demanding, but it was now tempered by a clearer sense of purpose. He had learned how to focus his energy on what really mattered, and he expected the same from everyone around him. The company was lean, fast, and ready to take on the world, driven by a leader who had finally found his true voice.
          </p>
        </Section>

        {/* Section 10: Conclusion */}
        <Section image={backgrounds[9]?.url} alt={backgrounds[9]?.alt} className="pb-48">
          <div ref={lastSectionRef} className="space-y-8 md:space-y-12">
            <p className="text-base md:text-2xl font-light leading-relaxed opacity-90">
              For Steve Jobs, this was a rare second chance to finish what he started. He came back to the place where he began as a young man, but he was now a different person. He was wiser, more focused, and had a clearer vision. This time, he didn't just save Apple; he turned it into one of the most loved and important companies in the world.
            </p>
            <p className="text-base md:text-2xl font-light leading-relaxed opacity-90">
              The turnaround was complete. Apple was no longer just a company trying to survive; it was a leader in innovation and a symbol of creativity. The journey that started in a garage had come full circle, leading to a future that was brighter than anyone expected.
            </p>
            <div className="space-y-4">
              <p className="text-base md:text-xl font-mono uppercase tracking-widest opacity-60">Simplicity.</p>
              <p className="text-base md:text-xl font-mono uppercase tracking-widest opacity-60">Focus.</p>
              <p className="text-base md:text-xl font-mono uppercase tracking-widest opacity-60">Innovation.</p>
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
