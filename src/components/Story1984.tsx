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

const VideoBackground: React.FC<{ src: string; opacity: any }> = ({ src, opacity }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  
  React.useEffect(() => {
    const unsubscribe = opacity.on("change", (latest: number) => {
      if (videoRef.current) {
        if (latest > 0 && videoRef.current.paused) {
          videoRef.current.play().catch(() => {});
        } else if (latest === 0 && !videoRef.current.paused) {
          videoRef.current.pause();
        }
      }
    });
    return () => unsubscribe();
  }, [opacity]);

  return (
    <video 
      ref={videoRef}
      src={src} 
      muted 
      loop 
      playsInline
      className="w-full h-full object-cover"
      style={{ backfaceVisibility: 'hidden' }}
    />
  );
};

export const Story1984: React.FC = () => {
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

  // Dynamic 18-stage background mapping for exact synchronization
  const totalSections = 18;
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

  const bg0 = useTransform(scrollYProgress, createRange(0), [0, 1, 1, 0]);
  const bg1 = useTransform(scrollYProgress, createRange(1), [0, 1, 1, 0]);
  const bg2 = useTransform(scrollYProgress, createRange(2), [0, 1, 1, 0]);
  const bg3 = useTransform(scrollYProgress, createRange(3), [0, 1, 1, 0]);
  const bg4 = useTransform(scrollYProgress, createRange(4), [0, 1, 1, 0]);
  const bg5 = useTransform(scrollYProgress, createRange(5), [0, 1, 1, 0]);
  const bg6 = useTransform(scrollYProgress, createRange(6), [0, 1, 1, 0]);
  const bg7 = useTransform(scrollYProgress, createRange(7), [0, 1, 1, 0]);
  const bg8 = useTransform(scrollYProgress, createRange(8), [0, 1, 1, 0]);
  const bg9 = useTransform(scrollYProgress, createRange(9), [0, 1, 1, 0]);
  const bg10 = useTransform(scrollYProgress, createRange(10), [0, 1, 1, 0]);
  const bg11 = useTransform(scrollYProgress, createRange(11), [0, 1, 1, 0]);
  const bg12 = useTransform(scrollYProgress, createRange(12), [0, 1, 1, 0]);
  const bg13 = useTransform(scrollYProgress, createRange(13), [0, 1, 1, 0]);
  const bg14 = useTransform(scrollYProgress, createRange(14), [0, 1, 1, 0]);
  const bg15 = useTransform(scrollYProgress, createRange(15), [0, 1, 1, 0]);
  const bg16 = useTransform(scrollYProgress, createRange(16), [0, 1, 1, 0]);
  const bg17 = useTransform(scrollYProgress, createRange(17), [0, 1, 1, 0]);

  const backgrounds = useMemo(() => [
    { id: 'intro', opacity: bg0, url: 'https://cdn.mos.cms.futurecdn.net/kh8WYzPXhKWS7DgdWUxcgS.jpg', alt: 'The 1984 Super Bowl Ad' },
    { id: 'unfamiliar', opacity: bg1, url: 'https://cdn.neowin.com/news/images/uploaded/2023/06/1685614924_ibm-pc_story.jpg', alt: 'Early Computing' },
    { id: 'xerox', opacity: bg2, url: 'https://genk.mediacdn.vn/139269124445442048/2020/9/11/photo-1-15997954165431632816953.png', alt: 'Xerox PARC' },
    { id: 'mass-market', opacity: bg3, url: 'https://api.time.com/wp-content/uploads/2011/10/1110171300211.jpg', alt: 'Mass Market Vision' },
    { id: 'project', opacity: bg4, url: 'https://www.ped30.com/wp-content/uploads/2018/07/4._not_for_commercial_2f_print_use_-_the_macintosh_team_-_h_2018.jpg', alt: 'The Macintosh Team' },
    { id: 'craftsmanship', opacity: bg5, url: 'https://www.ped30.com/wp-content/uploads/2018/07/4._not_for_commercial_2f_print_use_-_the_macintosh_team_-_h_2018.jpg', alt: 'True Craftsmanship' },
    { id: 'leadership', opacity: bg6, url: 'https://media.techeblog.com/images/steve-jobs-1984.jpg', alt: 'Intense Leadership' },
    { id: 'gui', opacity: bg7, url: 'https://techcetera.co/wp-content/uploads/2024/01/Macintosh-GUI.001.jpeg', alt: 'The Graphical Interface' },
    { id: 'mouse', opacity: bg8, url: 'https://www.cultofmac.com/wp-content/uploads/2022/10/Macintosh-Mouse-780x585.jpg', alt: 'The Mouse' },
    { id: 'ad-set', opacity: bg9, url: 'https://1.bp.blogspot.com/-rj88qyMsnVM/WKLSOFkyoCI/AAAAAAACkic/T5bhGM9v5N4mcjTsry7xANkSBOmMmX5pQCLcB/s640/steve-jobs-photos-by-norman-seeff-5.jpg', alt: 'Ridley Scott Set' },
    { id: 'ad-impact', opacity: bg10, url: '/images/1984-ad.mp4', alt: 'The 1984 Ad', isVideo: true },
    { id: 'launch', opacity: bg11, url: 'https://estaticos-cdn.prensaiberica.es/clip/d98db89d-8a1c-44fa-a8d8-b10db4757b65_alta-libre-aspect-ratio_default_0.jpg', alt: 'The Launch' },
    { id: 'hello', opacity: bg12, url: 'https://cdn.mos.cms.futurecdn.net/FL4spgiKsQ3wBQZM8Mr7WX-1200-80.jpg', alt: 'Hello, I am Macintosh' },
    { id: 'companion', opacity: bg13, url: 'https://tse1.mm.bing.net/th/id/OIP.CZ-HItFxudgYMFWK21MfDgHaFW?rs=1&pid=ImgDetMain&o=7&rm=3', alt: 'A New Companion' },
    { id: 'standard', opacity: bg14, url: 'https://fortune.com/img-assets/wp-content/uploads/2016/09/gettyimages-177454317.jpg?w=1440&q=75', alt: 'Modern Computing' },
    { id: 'obsession', opacity: bg15, url: 'https://fortune.com/img-assets/wp-content/uploads/2016/09/gettyimages-177454317.jpg?w=1440&q=75', alt: 'Obsession with Detail' },
    { id: 'exit', opacity: bg16, url: 'https://photos5.appleinsider.com/gallery/58273-118731-000-lede-Steve-Jobs-1984-xl.jpg', alt: 'Turning Point' },
    { id: 'human', opacity: bg17, url: 'https://cdn.ipadizate.com/2024/06/el-macintosh-de-1984-un-gran-producto-en-la-historia-de-apple.jpg', alt: 'The Most Human Technology' },
  ], [bg0, bg1, bg2, bg3, bg4, bg5, bg6, bg7, bg8, bg9, bg10, bg11, bg12, bg13, bg14, bg15, bg16, bg17]);

  // Preload images
  useEffect(() => {
    backgrounds.forEach(bg => {
      if (!bg.isVideo) {
        const img = new Image();
        img.src = bg.url;
      }
    });
  }, [backgrounds]);

  return (
    <div ref={containerRef} className="relative w-full">
      {/* Sticky Background Layer */}
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
        {/* Global Grain Overlay */}
        <div className="absolute inset-0 z-[5] opacity-[0.03] mix-blend-overlay pointer-events-none animate-noise bg-[url('https://www.transparenttextures.com/patterns/stardust.png')]" />
        
        {/* Dynamic Light Leak */}
        <motion.div 
          style={{ x: lightLeakX, opacity: lightLeakOpacity, rotate: lightLeakRotate }}
          className="absolute -inset-[50%] z-[4] pointer-events-none bg-gradient-to-tr from-blue-500/20 via-transparent to-purple-500/20 blur-[120px]"
        />

        {/* Floating Dust Particles */}
        {!shouldReduceMotion && <FloatingDust />}

        {backgrounds.map((bg, index) => (
          <motion.div 
            key={bg.id}
            style={{ opacity: bg.opacity, scale, y: parallax, willChange: 'opacity' }}
            className="absolute inset-0 bg-cover bg-center"
          >
            <div className={`absolute inset-0 z-10 ${theme === 'dark' 
              ? 'bg-gradient-to-b from-black/90 via-black/60 to-black/90' 
              : 'bg-gradient-to-b from-white/90 via-white/60 to-white/90'}`} 
            />
            {bg.isVideo ? (
              <VideoBackground src={bg.url} opacity={bg.opacity} />
            ) : (
              <img 
                src={bg.url} 
                alt={bg.alt} 
                loading={index === 0 ? "eager" : "lazy"}
                className="w-full h-full object-cover"
                style={{ imageRendering: 'auto', backfaceVisibility: 'hidden' }}
                referrerPolicy="no-referrer"
              />
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
            to="/journey#1984" 
            className={`inline-flex items-center gap-2 text-[11px] font-mono uppercase tracking-[0.2em] transition-all px-5 py-2.5 rounded-full backdrop-blur-md border ${theme === 'dark' ? 'text-white/80 hover:text-white border-white/20 bg-white/10 hover:bg-white/20' : 'text-black/80 hover:text-black border-black/20 bg-black/10 hover:bg-black/20'}`}
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Journey
          </Link>
        </motion.div>

        {/* Intro */}
        <Section>
          <span className="text-xs font-mono uppercase tracking-[0.5em] mb-6 block opacity-40">January 24, 1984</span>
          <h1 className="text-5xl md:text-8xl font-light tracking-tighter leading-[0.9] mb-12">
            The Computer <br />
            <motion.span 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.2, duration: 1 }}
              className="italic serif bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent"
            >
              for Everyone
            </motion.span>
          </h1>
          <p className="text-xl md:text-2xl font-light leading-relaxed opacity-70">
            In the cold winter of 1984, Apple introduced the Macintosh to a world that didn't yet know how much it needed a change. It wasn't just another computer. It was a new and poetic way of thinking about how people use machines. It was a bold statement that technology should help people, not be something to fear.
          </p>
        </Section>

        {/* Section 2: Unfamiliar Era */}
        <Section>
          <h2 className="text-4xl md:text-6xl font-light tracking-tight mb-8">A Scary Time for Tech</h2>
          <p className="text-lg md:text-xl font-light leading-relaxed opacity-70 mb-6">
            In the late 1970s and early 1980s, computers were a mystery to most people. They were cold and scary. Machines like the Apple II and the IBM PC were powerful, but they required users to learn and type strange commands into a blank screen. There were no friendly icons to help, no easy mouse to use, and very little care for the beginner.
          </p>
          <p className="text-lg md:text-xl font-light leading-relaxed opacity-70 italic serif">
            Steve Jobs looked at this wall of complexity and wanted to tear it down.
          </p>
        </Section>

        {/* Section 3: Xerox PARC */}
        <Section>
          <h2 className="text-4xl md:text-6xl font-light tracking-tight mb-8">A New Idea at Xerox</h2>
          <p className="text-lg md:text-xl font-light leading-relaxed opacity-70 mb-6">
            After visiting Xerox in 1979, Jobs saw something that changed his mind forever. He saw a computer screen with windows, icons, and a small device called a mouse. Instead of typing hard commands, users could just point at what they wanted and click. It was easy and smooth.
          </p>
          <p className="text-lg md:text-xl font-light leading-relaxed opacity-70">
            Jobs saw the potential right away. This was not just a cool new feature. It was a completely new way of using technology that felt natural and human.
          </p>
        </Section>

        {/* Section 4: Mass Market */}
        <Section>
          <div className="border-l-2 border-current pl-8 py-4">
            <h2 className="text-3xl md:text-5xl font-light italic serif mb-6">"A Vision for Everyone"</h2>
            <p className="text-lg md:text-xl font-light leading-relaxed opacity-70">
              He went back to Apple full of energy, ready to bring this new idea to everyone. He knew that for computers to truly change the world, they had to be easy for everyone to use. They couldn't just be for experts and engineers anymore.
            </p>
          </div>
        </Section>

        {/* Section 5: The Macintosh Project */}
        <Section>
          <h2 className="text-4xl md:text-6xl font-light tracking-tight mb-8">A Secret Project</h2>
          <p className="text-lg md:text-xl font-light leading-relaxed opacity-70 mb-6">
            The Macintosh project started as a small, secret effort at Apple. Jobs soon took over the team and used his own vision to shape it. He believed that computers should be simple, friendly, and even fun to use in daily life.
          </p>
          <p className="text-lg md:text-xl font-light leading-relaxed opacity-70">
            Most importantly, they should feel human. Jobs often said that technology should not make people feel confused. It should make them feel powerful and creative.
          </p>
        </Section>

        {/* Section 6: Relentless Craftsmanship */}
        <Section>
          <h2 className="text-4xl md:text-6xl font-light tracking-tight mb-8">Great Work</h2>
          <p className="text-lg md:text-xl font-light leading-relaxed opacity-70 mb-6">
            Jobs pushed his team hard, often working late into the night to get every detail right. He wanted the Macintosh to be small enough for a desk, quiet enough to not be annoying, and beautiful enough to look like a piece of art. He wanted it to turn on fast and be ready to use right away.
          </p>
          <p className="text-lg md:text-xl font-light leading-relaxed opacity-70">
            He even cared about the parts inside the computer that people would never see. He believed that doing great work meant caring about every single detail, inside and out.
          </p>
        </Section>

        {/* Section 7: Intense Leadership */}
        <Section>
          <h2 className="text-4xl md:text-6xl font-light tracking-tight mb-8">Doing the Impossible</h2>
          <p className="text-lg md:text-xl font-light leading-relaxed opacity-70 mb-6">
            His style of leading was very intense. He could be hard to work with, but he also knew how to inspire people to do their best work. He challenged his team to do things they never thought were possible.
          </p>
          <p className="text-lg md:text-xl font-light leading-relaxed opacity-70 italic serif">
            For Jobs, "good enough" was never enough; he was chasing perfection.
          </p>
        </Section>

        {/* Section 8: The Heart of Macintosh */}
        <Section>
          <h2 className="text-4xl md:text-6xl font-light tracking-tight mb-8">A New Way to See</h2>
          <p className="text-lg md:text-xl font-light leading-relaxed opacity-70 mb-6">
            One of his most important ideas was to use pictures, windows, and menus as the heart of the Macintosh. Instead of typing code, users could click on icons and move things around the screen as if they were real objects.
          </p>
          <p className="text-lg md:text-xl font-light leading-relaxed opacity-70">
            This made the computer much easier to understand, especially for people who had never used one before.
          </p>
        </Section>

        {/* Section 9: The Mouse */}
        <Section>
          <h2 className="text-4xl md:text-6xl font-light tracking-tight mb-8">The Mouse</h2>
          <p className="text-lg md:text-xl font-light leading-relaxed opacity-70 mb-6">
            Jobs also insisted on including the mouse, even though many people at the time didn't know what it was. He believed that once people tried pointing and clicking, they would never want to go back to just using a keyboard.
          </p>
          <p className="text-lg md:text-xl font-light leading-relaxed opacity-70">
            It was another example of how he knew what people would want before they even knew it themselves.
          </p>
        </Section>

        {/* Section 10: The Challenge */}
        <Section>
          <h2 className="text-4xl md:text-6xl font-light tracking-tight mb-8">The Big Reveal</h2>
          <p className="text-lg md:text-xl font-light leading-relaxed opacity-70 mb-6">
            Jobs knew that building a great product was only half the battle. He also had to show it to the world in a way they would never forget.
          </p>
          <p className="text-lg md:text-xl font-light leading-relaxed opacity-70 italic serif">
            He knew that to capture the public's imagination, he couldn't just list specifications; he had to tell a story.
          </p>
        </Section>

        {/* Section 11: The "1984" Ad */}
        <Section>
          <h2 className="text-4xl md:text-6xl font-light tracking-tight mb-8">A Famous Ad</h2>
          <p className="text-lg md:text-xl font-light leading-relaxed opacity-70 mb-6">
            This led to the famous '1984' Super Bowl ad. It was a short film that changed advertising forever. Directed by Ridley Scott, the ad showed a gray and boring world being broken by a runner in bright clothes. The message was clear: Apple would break the power of big, cold companies that tried to control people.
          </p>
          <p className="text-lg md:text-xl font-light leading-relaxed opacity-70">
            The Macintosh would make sure that the future was free and open for everyone.
          </p>
        </Section>

        {/* Section 12: The Symbol */}
        <Section>
          <h2 className="text-4xl md:text-6xl font-light tracking-tight mb-8">Standing Out</h2>
          <p className="text-lg md:text-xl font-light leading-relaxed opacity-70 mb-6">
            The ad only ran once, but everyone talked about it. It showed that Apple was a bold and creative company that cared about the individual.
          </p>
          <p className="text-lg md:text-xl font-light leading-relaxed opacity-70">
            More importantly, it showed that the Macintosh was more than just a machine. It was a symbol of a new way of thinking.
          </p>
        </Section>

        {/* Section 13: The Launch */}
        <Section>
          <h2 className="text-4xl md:text-6xl font-light tracking-tight mb-8">"Hello, I'm Macintosh"</h2>
          <p className="text-lg md:text-xl font-light leading-relaxed opacity-70 mb-6">
            When the Macintosh was launched in January 1984, Jobs let the computer speak for itself. In front of a quiet and excited crowd, the Macintosh showed text and used a computer voice to say hello. It was a moment of pure magic.
          </p>
          <p className="text-lg md:text-xl font-light leading-relaxed opacity-70 italic serif">
            It was simple, surprising, and something no one would ever forget. It was the start of a new era.
          </p>
        </Section>

        {/* Section 14: A New Companion */}
        <Section>
          <h2 className="text-4xl md:text-6xl font-light tracking-tight mb-8">A Creative Partner</h2>
          <p className="text-lg md:text-xl font-light leading-relaxed opacity-70 mb-6">
            The Macintosh changed how people felt about computers. They were no longer just cold machines, but creative partners. For the first time, people could use a computer without any special training. They could draw, write, and organize their work in a way that felt natural.
          </p>
          <p className="text-lg md:text-xl font-light leading-relaxed opacity-70">
            The computer became a friend that helped people do their best work.
          </p>
        </Section>

        {/* Section 15: Modern Standard */}
        <Section>
          <h2 className="text-4xl md:text-6xl font-light tracking-tight mb-8">Setting the Standard</h2>
          <p className="text-lg md:text-xl font-light leading-relaxed opacity-70 mb-6">
            This change had a huge effect on the world. The ideas behind the Macintosh, such as simple design and easy use, became the standard for all computers.
          </p>
          <p className="text-lg md:text-xl font-light leading-relaxed opacity-70">
            Today, almost every computer and phone we use works in the same way as that first small box from many years ago.
          </p>
        </Section>

        {/* Section 16: Deeply Personal */}
        <Section>
          <h2 className="text-4xl md:text-6xl font-light tracking-tight mb-8">Tech and Art</h2>
          <p className="text-lg md:text-xl font-light leading-relaxed opacity-70 mb-6">
            For Steve Jobs, the Macintosh was very personal. It showed his belief that technology and art should come together to make life better. It showed his love for simplicity and his focus on every detail.
          </p>
          <p className="text-lg md:text-xl font-light leading-relaxed opacity-70 italic serif">
            He wanted to build products that people would truly love, not just use as tools.
          </p>
        </Section>

        {/* Section 17: Turning Point */}
        <Section>
          <h2 className="text-4xl md:text-6xl font-light tracking-tight mb-8">The Turning Point</h2>
          <p className="text-lg md:text-xl font-light leading-relaxed opacity-70 mb-6">
            The Macintosh also marked a significant turning point in Jobs' career and life. While it established him as a visionary leader on the world stage, it also led to internal conflicts and power struggles within Apple that would eventually push him out of the company he co-founded in 1985.
          </p>
          <p className="text-lg md:text-xl font-light leading-relaxed opacity-70">
            Yet even in that difficult moment, the ideas he championed continued to shape the future of the industry he helped create.
          </p>
        </Section>

        {/* Section 18: Conclusion */}
        <Section className="pb-48">
          <div ref={lastSectionRef} className="space-y-12">
            <p className="text-xl md:text-3xl font-light leading-relaxed opacity-90">
              Looking back, the Macintosh was much more than just a computer. It was a bold and successful step toward making technology easy and meaningful for everyone.
            </p>
            <div className="space-y-4">
              <p className="text-lg md:text-xl font-mono uppercase tracking-widest opacity-60">Simple design.</p>
              <p className="text-lg md:text-xl font-mono uppercase tracking-widest opacity-60">Easy to use.</p>
              <p className="text-lg md:text-xl font-mono uppercase tracking-widest opacity-60">Human technology.</p>
            </div>
            <p className="text-lg md:text-xl font-light leading-relaxed opacity-70">
              At the heart of it all was Steve Jobs. He believed that the best technology is not the most complex, but the one that feels most human.
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
      `}} />
    </div>
  );
};
