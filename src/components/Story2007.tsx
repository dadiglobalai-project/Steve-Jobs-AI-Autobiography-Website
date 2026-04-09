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

export const Story2007: React.FC = () => {
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

  // Dynamic 26-stage background mapping
  const totalSections = 26;
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
    { id: 1, url: "https://picsum.photos/seed/old-phones/1920/1080", alt: "Clunky Mobile Phones" },
    { id: 2, url: "https://picsum.photos/seed/jobs-vision/1920/1080", alt: "Steve Jobs' Vision" },
    { id: 3, url: "https://picsum.photos/seed/apple-hq/1920/1080", alt: "Secret Project" },
    { id: 4, url: "https://picsum.photos/seed/touch-screen/1920/1080", alt: "Touch Screen Technology" },
    { id: 5, url: "https://picsum.photos/seed/minimal-design/1920/1080", alt: "Simplification" },
    { id: 6, url: "https://picsum.photos/seed/macworld/1920/1080", alt: "Macworld Stage" },
    { id: 7, url: "https://picsum.photos/seed/iphone-reveal/1920/1080", alt: "The iPhone Reveal" },
    { id: 8, url: "https://picsum.photos/seed/touch-interaction/1920/1080", alt: "Touch Interaction" },
    { id: 9, url: "https://picsum.photos/seed/mobile-web/1920/1080", alt: "Mobile Web Browsing" },
    { id: 10, url: "https://picsum.photos/seed/app-store/1920/1080", alt: "The App Store" },
    { id: 11, url: "https://picsum.photos/seed/communication/1920/1080", alt: "Modern Communication" },
    { id: 12, url: "https://picsum.photos/seed/media-consumption/1920/1080", alt: "Media Consumption" },
    { id: 13, url: "https://picsum.photos/seed/global-impact/1920/1080", alt: "Global Impact" },
    { id: 14, url: "https://picsum.photos/seed/industry-shift/1920/1080", alt: "Industry Shift" },
    { id: 15, url: "https://picsum.photos/seed/apple-success/1920/1080", alt: "Apple's Success" },
    { id: 16, url: "https://picsum.photos/seed/simplicity/1920/1080", alt: "Design Philosophy" },
    { id: 17, url: "https://picsum.photos/seed/leadership/1920/1080", alt: "Focused Leadership" },
    { id: 18, url: "https://picsum.photos/seed/future-tech/1920/1080", alt: "The Future of Technology" },
    { id: 19, url: "https://picsum.photos/seed/connection/1920/1080", alt: "Human Connection" },
    { id: 20, url: "https://picsum.photos/seed/innovation/1920/1080", alt: "True Innovation" },
    { id: 21, url: "https://picsum.photos/seed/digital-life/1920/1080", alt: "Digital Life" },
    { id: 22, url: "https://picsum.photos/seed/handheld/1920/1080", alt: "Handheld Computer" },
    { id: 23, url: "https://picsum.photos/seed/design-studio/1920/1080", alt: "Design Studio" },
    { id: 24, url: "https://picsum.photos/seed/world-map/1920/1080", alt: "Global Reach" },
    { id: 25, url: "https://picsum.photos/seed/modern-lifestyle/1920/1080", alt: "Modern Lifestyle" },
    { id: 26, url: "https://picsum.photos/seed/legacy/1920/1080", alt: "The Legacy" },
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
        <span className="text-xs font-mono uppercase tracking-[0.3em] opacity-40">Chapter 2007: The iPhone</span>
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
            January 2007
          </motion.span>
          <h1 className="text-5xl md:text-8xl font-light tracking-tighter leading-[0.9] mb-12">
            The <br />
            <motion.span 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.2, duration: 1 }}
              className="italic serif bg-gradient-to-r from-slate-400 to-blue-400 bg-clip-text text-transparent"
            >
              Magic
            </motion.span> <br />
            of Touch
          </h1>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="text-xl md:text-2xl font-light leading-relaxed max-w-2xl mx-auto opacity-70"
          >
            In the middle of the 2000s, almost everyone had a mobile phone, but they were not very good. Most people only used them for calls and short texts. The screens were small, and you had to use tiny buttons and confusing menus. Some phones tried to browse the web or play music, but it was slow and frustrating. Technology was helpful, but it was not yet simple.
          </motion.p>
        </Section>

        {/* Section 2: Jobs' Belief */}
        <Section>
          <h2 className="text-4xl md:text-6xl font-light tracking-tight mb-8">A Better Way</h2>
          <p className="text-lg md:text-xl font-light leading-relaxed opacity-70 mb-6">
            Steve Jobs was sure that mobile phones could be much better. He saw how hard it was for people to use tiny keyboards and stylus pens. He knew there was a more elegant way. He imagined a device that didn't just add more features, but completely changed how we use technology in our daily lives.
          </p>
        </Section>

        {/* Section 3: Leading the Change */}
        <Section>
          <div className="border-l-2 border-current pl-8 py-4">
            <h2 className="text-3xl md:text-5xl font-light italic serif mb-6">"Taking the Lead"</h2>
            <p className="text-lg md:text-xl font-light leading-relaxed opacity-70">
              After the success of the iPod, Jobs worried that mobile phones might one day replace music players. Instead of waiting for that to happen, he decided Apple should lead the way. His goal was bold. He wanted to create one beautiful device that could do everything: make calls, play music, and browse the internet easily.
            </p>
          </div>
        </Section>

        {/* Section 4: Secret Project */}
        <Section>
          <h2 className="text-4xl md:text-6xl font-light tracking-tight mb-8">A Secret Project</h2>
          <p className="text-lg md:text-xl font-light leading-relaxed opacity-70 mb-6">
            Inside Apple, the project was a big secret. Jobs pushed his team to rethink what a phone should be. He didn't want any physical buttons because he felt they limited what a device could do. He wanted a screen that people could touch directly. This would allow the phone to change and adapt to whatever the user needed at that moment.
          </p>
        </Section>

        {/* Section 5: Touch Decision */}
        <Section>
          <h2 className="text-4xl md:text-6xl font-light tracking-tight mb-8">Focus on the Screen</h2>
          <p className="text-lg md:text-xl font-light leading-relaxed opacity-70 mb-6">
            The decision to remove the keyboard was a big risk. It meant Apple had to invent new touch technology. Jobs knew that if the screen was the main part of the product, it had to be perfect. It had to feel like a natural part of the user's hand, moving smoothly in a way that no other device had done before.
          </p>
        </Section>

        {/* Section 6: Development */}
        <Section>
          <h2 className="text-4xl md:text-6xl font-light tracking-tight mb-8">Making it Feel Natural</h2>
          <p className="text-lg md:text-xl font-light leading-relaxed opacity-70 mb-6">
            The team worked hard to make a touch screen that was smooth and quick to respond. Jobs tested everything himself. He wanted the movement to feel natural and human. If a transition didn't feel right, he sent it back to be fixed. He cared about how the device made people feel when they used it.
          </p>
        </Section>

        {/* Section 7: Standards */}
        <Section>
          <div className="border-l-2 border-current pl-8 py-4">
            <h2 className="text-3xl md:text-5xl font-light italic serif mb-6">"The Beauty of Simple"</h2>
            <p className="text-lg md:text-xl font-light leading-relaxed opacity-70">
              Jobs was known for his high standards. He always pushed his team to make things simpler. He believed that real innovation was about making things easier to understand, not just adding more features. If something made the phone harder to use, he removed it. He wanted a device that felt like it wasn't even there, leaving only the user and their content.
            </p>
          </div>
        </Section>

        {/* Section 8: Readiness */}
        <Section>
          <h2 className="text-4xl md:text-6xl font-light tracking-tight mb-8">A Big Moment</h2>
          <p className="text-lg md:text-xl font-light leading-relaxed opacity-70 mb-6">
            After years of secret work and many challenges, the device was finally ready. Everyone in the tech world was excited, but no one knew exactly what Apple was building. The stage was set for a moment that would change the industry forever.
          </p>
        </Section>

        {/* Section 9: Macworld Intro */}
        <Section>
          <h2 className="text-4xl md:text-6xl font-light tracking-tight mb-8">The Big Reveal</h2>
          <p className="text-lg md:text-xl font-light leading-relaxed opacity-70 mb-6">
            In January 2007, Steve Jobs walked onto the stage in his usual black turtleneck and jeans. The room was full of excitement. Jobs started slowly, building the story and making everyone wait for the big news.
          </p>
        </Section>

        {/* Section 10: The Hook */}
        <Section>
          <h2 className="text-4xl md:text-6xl font-light tracking-tight mb-8">Three Products in One</h2>
          <p className="text-lg md:text-xl font-light leading-relaxed opacity-70 mb-6">
            He announced that Apple was launching three new products that day: a touch-screen iPod, a new kind of mobile phone, and a device for the internet. He said the list over and over. Then, with a smile, he told the truth. These were not three separate devices. They were all in one single product.
          </p>
        </Section>

        {/* Section 11: The Reveal */}
        <Section>
          <div className="border-l-2 border-current pl-8 py-4">
            <h2 className="text-3xl md:text-5xl font-light italic serif mb-6">"Introducing the iPhone"</h2>
            <p className="text-lg md:text-xl font-light leading-relaxed opacity-70">
              Jobs said, "And we are calling it... iPhone." The audience was amazed. It was a beautiful device made of glass and steel. It looked like nothing else anyone had ever seen. It was the perfect example of Jobs' belief that technology should be beautiful and simple.
            </p>
          </div>
        </Section>

        {/* Section 12: Touch Interaction */}
        <Section>
          <h2 className="text-4xl md:text-6xl font-light tracking-tight mb-8">A New Way to Touch</h2>
          <p className="text-lg md:text-xl font-light leading-relaxed opacity-70 mb-6">
            The audience soon saw that the iPhone was different. It had a large screen and almost no buttons. You could use your fingers to tap, swipe, and pinch to control it. It felt like science fiction. Moving through a list or zooming into a photo felt smooth and fun.
          </p>
        </Section>

        {/* Section 13: Feeling Alive */}
        <Section>
          <h2 className="text-4xl md:text-6xl font-light tracking-tight mb-8">A Natural Connection</h2>
          <p className="text-lg md:text-xl font-light leading-relaxed opacity-70 mb-6">
            For many people, this was their first real experience with touch in such a sophisticated way. It made the device feel alive, as if it knew what you wanted to do. This connection was the 'magic' that Jobs had always sought to create. It was the point where technology becomes a part of the person using it.
          </p>
        </Section>

        {/* Section 14: Full Web */}
        <Section>
          <h2 className="text-4xl md:text-6xl font-light tracking-tight mb-8">The Internet Everywhere</h2>
          <p className="text-lg md:text-xl font-light leading-relaxed opacity-70 mb-6">
            The iPhone also made the internet easy to use on a phone for the first time. Instead of simple text pages, you could see full websites just like on a computer. You could check email, search for information, and explore the web freely. It put the power of a computer in the palm of your hand.
          </p>
        </Section>

        {/* Section 15: App Store */}
        <Section>
          <h2 className="text-4xl md:text-6xl font-light tracking-tight mb-8">A World of Apps</h2>
          <p className="text-lg md:text-xl font-light leading-relaxed opacity-70 mb-6">
            As the iPhone grew, Apple added more features. In 2008, the App Store opened, allowing people to create new tools for the phone. Almost overnight, the iPhone could do almost anything. People could download apps for travel, games, and learning, making the phone more useful every day.
          </p>
        </Section>

        {/* Section 16: Immediate Impact */}
        <Section>
          <div className="border-l-2 border-current pl-8 py-4">
            <h2 className="text-3xl md:text-5xl font-light italic serif mb-6">"A Global Change"</h2>
            <p className="text-lg md:text-xl font-light leading-relaxed opacity-70">
              The impact of the iPhone was huge. It didn't just change phones; it changed the world. it changed how we talk to each other, how we work, and how we spend our free time. The glowing screens of the iPhone became a common sight everywhere.
            </p>
          </div>
        </Section>

        {/* Section 17: Communication Shift */}
        <Section>
          <h2 className="text-4xl md:text-6xl font-light tracking-tight mb-8">A New Way to Talk</h2>
          <p className="text-lg md:text-xl font-light leading-relaxed opacity-70 mb-6">
            It changed how people stayed in touch. Texting became the main way to talk, and new apps let people connect across the world at any time. The phone was no longer just for talking. It was for sharing photos, moments, and thoughts instantly.
          </p>
        </Section>

        {/* Section 18: Media Experience */}
        <Section>
          <h2 className="text-4xl md:text-6xl font-light tracking-tight mb-8">The Center of Daily Life</h2>
          <p className="text-lg md:text-xl font-light leading-relaxed opacity-70 mb-6">
            It also changed how we enjoyed music, videos, and news. Everything was in one place. The iPhone became a daily companion that helped people stay organized and entertained. It was often the first thing people looked at in the morning and the last thing at night.
          </p>
        </Section>

        {/* Section 19: Industry Impact */}
        <Section>
          <h2 className="text-4xl md:text-6xl font-light tracking-tight mb-8">A Huge Shift</h2>
          <p className="text-lg md:text-xl font-light leading-relaxed opacity-70 mb-6">
            The success of the iPhone changed every industry. Other phone companies had to change their designs to keep up with Apple. The way software was built also changed, as millions of people started making apps for phones, creating a whole new part of the economy.
          </p>
        </Section>

        {/* Section 20: Industry Redesign */}
        <Section>
          <h2 className="text-4xl md:text-6xl font-light tracking-tight mb-8">Changing Every Industry</h2>
          <p className="text-lg md:text-xl font-light leading-relaxed opacity-70 mb-6">
            Even things like cameras and maps were changed by the iPhone. The camera in your pocket became the only one you needed. Paper maps were replaced by GPS on the phone. The iPhone didn't just compete; it changed what people expected from technology.
          </p>
        </Section>

        {/* Section 21: Apple's Success */}
        <Section>
          <div className="border-l-2 border-current pl-8 py-4">
            <h2 className="text-3xl md:text-5xl font-light italic serif mb-6">"Apple's Greatest Success"</h2>
            <p className="text-lg md:text-xl font-light leading-relaxed opacity-70">
              For Apple, the iPhone became its most successful product ever. It made the company one of the most important in the world. It was the ultimate proof that Jobs' ideas about combining hardware and software could change the lives of millions.
            </p>
          </div>
        </Section>

        {/* Section 22: Jobs' Philosophy */}
        <Section>
          <h2 className="text-4xl md:text-6xl font-light tracking-tight mb-8">The Goal of Simplicity</h2>
          <p className="text-lg md:text-xl font-light leading-relaxed opacity-70 mb-6">
            For Steve Jobs, the iPhone was the result of years of thinking about design and people. He believed that tools should feel natural and easy to use. He wasn't interested in making things complicated. He wanted to create something that anyone could understand and love.
          </p>
        </Section>

        {/* Section 23: Leadership */}
        <Section>
          <h2 className="text-4xl md:text-6xl font-light tracking-tight mb-8">Leading with a Vision</h2>
          <p className="text-lg md:text-xl font-light leading-relaxed opacity-70 mb-6">
            His leadership during this time was very focused. He pushed his team to solve hard problems and never settle for "good enough." His goal was always to make technology that fits into people’s lives and makes things better, not harder.
          </p>
        </Section>

        {/* Section 24: Conclusion Start */}
        <Section>
          <h2 className="text-4xl md:text-6xl font-light tracking-tight mb-8">More Than Just a Phone</h2>
          <p className="text-lg md:text-xl font-light leading-relaxed opacity-70 mb-6">
            Looking back from the vantage point of today, it's clear that the iPhone was far more than just a new device. It was a cultural reset, a moment when the digital and physical worlds began to merge in a way that was both permanent and profound. It set a new direction for the future of technology, one that prioritized the individual and their connection to the world around them.
          </p>
        </Section>

        {/* Section 25: Impact Summary */}
        <Section>
          <h2 className="text-4xl md:text-6xl font-light tracking-tight mb-8">Changing Our Lives</h2>
          <p className="text-lg md:text-xl font-light leading-relaxed opacity-70 mb-6">
            It fundamentally changed how we live, work, and connect. It brought together communication, information, and media into one place, making the world feel both smaller and more accessible. It empowered individuals with tools that were previously reserved for large corporations, democratizing information and creativity on a global scale.
          </p>
        </Section>

        {/* Section 26: Final Tribute */}
        <Section className="pb-48">
          <div ref={lastSectionRef} className="space-y-12">
            <p className="text-xl md:text-3xl font-light leading-relaxed opacity-90">
              At the center of this change was Steve Jobs. He was a leader who believed that the best ideas are the simplest ones. He knew that real innovation comes from understanding what people need.
            </p>
            <div className="space-y-4">
              <p className="text-lg md:text-xl font-mono uppercase tracking-widest opacity-60">Simplicity.</p>
              <p className="text-lg md:text-xl font-mono uppercase tracking-widest opacity-60">Innovation.</p>
              <p className="text-lg md:text-xl font-mono uppercase tracking-widest opacity-60">Humanity.</p>
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
