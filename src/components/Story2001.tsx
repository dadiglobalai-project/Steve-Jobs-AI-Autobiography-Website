import React, { useRef, useMemo } from 'react';
import { Link, useNavigate } from 'react-router-dom';
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

export const Story2001: React.FC = () => {
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
    { id: 1, url: "https://picsum.photos/seed/cd-collection/1920/1080", alt: "CDs and Cassettes" },
    { id: 2, url: "https://picsum.photos/seed/internet-music/1920/1080", alt: "Digital Downloads" },
    { id: 3, url: "https://picsum.photos/seed/jobs-vision/1920/1080", alt: "Jobs' Opportunity" },
    { id: 4, url: "https://picsum.photos/seed/easy-music/1920/1080", alt: "Enjoying Music" },
    { id: 5, url: "https://picsum.photos/seed/system/1920/1080", alt: "Complete System" },
    { id: 6, url: "https://picsum.photos/seed/apple-team/1920/1080", alt: "The Challenge" },
    { id: 7, url: "https://picsum.photos/seed/ipod-reveal/1920/1080", alt: "The iPod" },
    { id: 8, url: "https://picsum.photos/seed/pocket-music/1920/1080", alt: "1,000 Songs" },
    { id: 9, url: "https://picsum.photos/seed/turning-point/1920/1080", alt: "Turning Point" },
    { id: 10, url: "https://picsum.photos/seed/ipod-design/1920/1080", alt: "Clean Design" },
    { id: 11, url: "https://picsum.photos/seed/beyond-device/1920/1080", alt: "Beyond the Device" },
    { id: 12, url: "https://picsum.photos/seed/itunes-logo/1920/1080", alt: "iTunes Creation" },
    { id: 13, url: "https://picsum.photos/seed/itunes-store/1920/1080", alt: "iTunes Store" },
    { id: 14, url: "https://picsum.photos/seed/negotiation/1920/1080", alt: "Music Industry" },
    { id: 15, url: "https://picsum.photos/seed/ecosystem/1920/1080", alt: "Complete Experience" },
    { id: 16, url: "https://picsum.photos/seed/discovery/1920/1080", alt: "Discover and Buy" },
    { id: 17, url: "https://picsum.photos/seed/global-impact/1920/1080", alt: "Immediate Impact" },
    { id: 18, url: "https://picsum.photos/seed/playlists/1920/1080", alt: "Personal Playlists" },
    { id: 19, url: "https://picsum.photos/seed/lifestyle/1920/1080", alt: "Music Everywhere" },
    { id: 20, url: "https://picsum.photos/seed/industry-shift/1920/1080", alt: "Industry Change" },
    { id: 21, url: "https://picsum.photos/seed/apple-growth/1920/1080", alt: "Major Step Forward" },
    { id: 22, url: "https://picsum.photos/seed/new-users/1920/1080", alt: "Millions of Users" },
    { id: 23, url: "https://picsum.photos/seed/iphone-foundation/1920/1080", alt: "iPhone Foundation" },
    { id: 24, url: "https://picsum.photos/seed/simplicity-focus/1920/1080", alt: "Simplicity Focus" },
    { id: 25, url: "https://picsum.photos/seed/meaningful-tech/1920/1080", alt: "Meaningful Tech" },
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
              y: parallax,
              willChange: 'opacity'
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
        <span className="text-xs font-mono uppercase tracking-[0.3em] opacity-40">Chapter 2001: The iPod</span>
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
            October 2001
          </motion.span>
          <h1 className="text-5xl md:text-8xl font-light tracking-tighter leading-[0.9] mb-12">
            1,000 <br />
            <motion.span 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.2, duration: 1 }}
              className="italic serif bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent"
            >
              Songs
            </motion.span> <br />
            in Your Pocket
          </h1>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="text-xl md:text-2xl font-light leading-relaxed max-w-2xl mx-auto opacity-70"
          >
            As the new millennium began, the way we listened to music was changing, but it was often frustrating. For a long time, our music collections were physical. We had stacks of CDs, cassette tapes, or just the radio. While portable CD players let us take music with us, they were big, they skipped easily, and you could only carry a few albums. Early digital music players were even worse. They were slow, hard to use, and could only hold a few songs at a time.
          </motion.p>
        </Section>

        {/* Section 2: Internet Change */}
        <Section>
          <h2 className="text-4xl md:text-6xl font-light tracking-tight mb-8">The Early Digital Days</h2>
          <p className="text-lg md:text-xl font-light leading-relaxed opacity-70 mb-6">
            At the same time, the internet was changing how people found music, but it was a mess. Millions of people were downloading songs, but the files were often poorly labeled and the sound quality was bad. There was no easy way to manage a large music library. For most people, the dream of having all their music on a computer was hard to achieve because it was too technical and complicated.
          </p>
        </Section>

        {/* Section 3: Jobs' Opportunity */}
        <Section>
          <div className="border-l-2 border-current pl-8 py-4">
            <h2 className="text-3xl md:text-5xl font-light italic serif mb-6">"A New Way to Listen"</h2>
            <p className="text-lg md:text-xl font-light leading-relaxed opacity-70">
              Steve Jobs saw this as a chance to change everything. He believed that music was a huge part of life and that listening to it should be easy and fun. He thought people shouldn't have to worry about technical details or how many songs they could fit. They should be able to carry their whole music collection anywhere and listen without any trouble. He imagined a future where technology made it simple to enjoy art.
            </p>
          </div>
        </Section>

        {/* Section 4: Complete System */}
        <Section>
          <h2 className="text-4xl md:text-6xl font-light tracking-tight mb-8">A Complete System</h2>
          <p className="text-lg md:text-xl font-light leading-relaxed opacity-70 mb-6">
            Jobs wanted to do more than just make another music player. He wanted to build a whole system where the device and the software worked perfectly together. At Apple, he challenged his team with one goal. They had to build a device that could hold a huge library of songs, work very fast, and be so simple that anyone could use it right away without reading a manual.
          </p>
        </Section>

        {/* Section 5: The Challenge */}
        <Section>
          <h2 className="text-4xl md:text-6xl font-light tracking-tight mb-8">Pure and Simple</h2>
          <p className="text-lg md:text-xl font-light leading-relaxed opacity-70 mb-6">
            He pushed for a design that felt simple from the very first time you touched it. This led to the iPod, a beautiful, small device made of white plastic and steel. It felt more like a piece of jewelry than a computer. When Apple launched the iPod in October 2001, Jobs used a simple phrase that everyone remembered: "1,000 songs in your pocket." It was a promise of freedom in a device that fit in your hand.
          </p>
        </Section>

        {/* Section 6: Powerful Message */}
        <Section>
          <h2 className="text-4xl md:text-6xl font-light tracking-tight mb-8">A Message for Everyone</h2>
          <p className="text-lg md:text-xl font-light leading-relaxed opacity-70 mb-6">
            This message was powerful because it talked about how the device would help people, not just how it worked. Instead of talking about technical details like megabytes or battery power, Jobs focused on the feeling of having all your music with you. It wasn't about the technology. It was about being able to take your favorite songs and memories wherever you went.
          </p>
        </Section>

        {/* Section 7: Turning Point */}
        <Section>
          <div className="border-l-2 border-current pl-8 py-4">
            <h2 className="text-3xl md:text-5xl font-light italic serif mb-6">"A Big Change"</h2>
            <p className="text-lg md:text-xl font-light leading-relaxed opacity-70">
              The launch of the iPod was a big change for technology. The device was small, clean, and very easy to use. Its best feature was the scroll wheel, which let you find any song quickly with just your thumb. It made finding music feel like magic instead of a chore.
            </p>
          </div>
        </Section>

        {/* Section 8: Natural Feel */}
        <Section>
          <h2 className="text-4xl md:text-6xl font-light tracking-tight mb-8">Easy to Use</h2>
          <p className="text-lg md:text-xl font-light leading-relaxed opacity-70 mb-6">
            The iPod felt natural to use, even for people who were afraid of new technology. But Jobs knew that a great device was only half of the story. To really fix the music problem, people needed an easy way to buy and manage their music. This led to the growth of iTunes, which became the center of the digital music world.
          </p>
        </Section>

        {/* Section 9: iTunes Creation */}
        <Section>
          <h2 className="text-4xl md:text-6xl font-light tracking-tight mb-8">Bringing Order to Music</h2>
          <p className="text-lg md:text-xl font-light leading-relaxed opacity-70 mb-6">
            At first, iTunes was a simple program that helped people organize the music on their computers. It let them take music from their CDs and put it into folders or playlists. It brought order to the mess of digital files. Then, in 2003, Apple opened the iTunes Music Store, which changed the whole music industry.
          </p>
        </Section>

        {/* Section 10: iTunes Store */}
        <Section>
          <h2 className="text-4xl md:text-6xl font-light tracking-tight mb-8">99 Cents</h2>
          <p className="text-lg md:text-xl font-light leading-relaxed opacity-70 mb-6">
            The store offered something new. You could buy one song at a time, legally and safely, for just 99 cents. Jobs spent a lot of time talking to record companies to get them to agree to this. He built a system that was easy for customers and fair for the artists. It gave people a better choice than downloading music for free.
          </p>
        </Section>

        {/* Section 11: Industry Negotiation */}
        <Section>
          <h2 className="text-4xl md:text-6xl font-light tracking-tight mb-8">Making it All Work Together</h2>
          <p className="text-lg md:text-xl font-light leading-relaxed opacity-70 mb-6">
            Getting everyone to agree was not easy because many people in the music business were afraid of the digital future. But Jobs made it work. Together, the iPod and iTunes offered a complete experience. You could find new music, buy it with one click, and put it on your iPod with almost no effort.
          </p>
        </Section>

        {/* Section 12: Ecosystem */}
        <Section>
          <div className="border-l-2 border-current pl-8 py-4">
            <h2 className="text-3xl md:text-5xl font-light italic serif mb-6">"Everything Working Together"</h2>
            <p className="text-lg md:text-xl font-light leading-relaxed opacity-70">
              Every part of this new system worked together perfectly. This was one of Jobs’ most important ideas. He believed that products should not just be separate gadgets. Instead, they should be part of a larger system that makes life easier and makes complicated things feel simple.
            </p>
          </div>
        </Section>

        {/* Section 13: Immediate Impact */}
        <Section>
          <h2 className="text-4xl md:text-6xl font-light tracking-tight mb-8">A Global Success</h2>
          <p className="text-lg md:text-xl font-light leading-relaxed opacity-70 mb-6">
            The iPod was a huge success right away. Soon, the white earbuds were seen everywhere. People no longer had to carry heavy cases of CDs or listen to whatever the radio played. They could have their own music with them all the time, creating the perfect background for every part of their day.
          </p>
        </Section>

        {/* Section 14: Personal Connection */}
        <Section>
          <h2 className="text-4xl md:text-6xl font-light tracking-tight mb-8">Your Own Music</h2>
          <p className="text-lg md:text-xl font-light leading-relaxed opacity-70 mb-6">
            Music became more personal and a bigger part of daily life. Students listened on their way to school, office workers used it to focus, and runners used it for energy. Music was no longer something you only listened to at home. It was a constant companion that went wherever you went.
          </p>
        </Section>

        {/* Section 15: Moving with People */}
        <Section>
          <h2 className="text-4xl md:text-6xl font-light tracking-tight mb-8">Music on the Move</h2>
          <p className="text-lg md:text-xl font-light leading-relaxed opacity-70 mb-6">
            The iPod changed music into something that moved with you. It also changed the music industry. It proved that people would pay for digital music if the process was simple and fair. This paved the way for the music streaming services we use today.
          </p>
        </Section>

        {/* Section 16: Industry Shift */}
        <Section>
          <h2 className="text-4xl md:text-6xl font-light tracking-tight mb-8">The New Digital Era</h2>
          <p className="text-lg md:text-xl font-light leading-relaxed opacity-70 mb-6">
            The iTunes Store quickly became one of the most popular ways to buy music. It led the whole industry into the digital age. For Apple, the success of the iPod was more than just a new product. it changed how people saw the company. Apple was no longer just a computer maker. It was now a leader in entertainment and lifestyle.
          </p>
        </Section>

        {/* Section 17: Major Step Forward */}
        <Section>
          <div className="border-l-2 border-current pl-8 py-4">
            <h2 className="text-3xl md:text-5xl font-light italic serif mb-6">"A New Audience"</h2>
            <p className="text-lg md:text-xl font-light leading-relaxed opacity-70">
              The iPod brought millions of new people to Apple who had never owned a Mac before. People who loved their iPod soon became curious about other Apple products. This created a lot of loyal customers and opened the door for even bigger ideas that Apple was working on in secret.
            </p>
          </div>
        </Section>

        {/* Section 18: Foundation for iPhone */}
        <Section>
          <h2 className="text-4xl md:text-6xl font-light tracking-tight mb-8">Building the Future</h2>
          <p className="text-lg md:text-xl font-light leading-relaxed opacity-70 mb-6">
            The ideas and technology from the iPod became the base for everything Apple did next. Through the iPod, Apple learned how to build small, powerful devices with long battery life and great screens. The company learned how to make hardware and software work together in a way that people could trust every day.
          </p>
        </Section>

        {/* Section 19: Smooth Experience */}
        <Section>
          <h2 className="text-4xl md:text-6xl font-light tracking-tight mb-8">Lessons from the iPod</h2>
          <p className="text-lg md:text-xl font-light leading-relaxed opacity-70 mb-6">
            The lessons Apple learned from the iPod helped them create the iPhone, which would change the world again. During this time, Steve Jobs’ leadership was seen in every detail. He was obsessed with simplicity. He always pushed his team to remove anything that wasn't needed until only the best part of the product was left.
          </p>
        </Section>

        {/* Section 20: Simplicity Focus */}
        <Section>
          <h2 className="text-4xl md:text-6xl font-light tracking-tight mb-8">Focus on Simplicity</h2>
          <p className="text-lg md:text-xl font-light leading-relaxed opacity-70 mb-6">
            He wanted products that were easy to use, even if they were hard to build. He cared about how Apple’s products felt in your hand and how they responded when you touched them. He also had a special talent for explaining these ideas to the public in a way that felt personal and important.
          </p>
        </Section>

        {/* Section 21: Meaningful Tech */}
        <Section>
          <div className="border-l-2 border-current pl-8 py-4">
            <h2 className="text-3xl md:text-5xl font-light italic serif mb-6">"Technology for People"</h2>
            <p className="text-lg md:text-xl font-light leading-relaxed opacity-70">
              The simple phrase "1,000 songs in your pocket" was a perfect example of how he could make complex technology feel meaningful. Looking back, the iPod was much more than just a music player. it was a cultural change that showed that design and the user experience were just as important as the technology inside.
            </p>
          </div>
        </Section>

        {/* Section 22: Changing Listening */}
        <Section>
          <h2 className="text-4xl md:text-6xl font-light tracking-tight mb-8">Changing How We Live</h2>
          <p className="text-lg md:text-xl font-light leading-relaxed opacity-70 mb-6">
            It changed how we listen to music and how we connect with the artists we love. It moved the world away from physical CDs and toward the digital world we live in today. It was the device that put the internet in our pockets and changed the rhythm of our lives.
          </p>
        </Section>

        {/* Section 23: Natural Part of Life */}
        <Section>
          <h2 className="text-4xl md:text-6xl font-light tracking-tight mb-8">Part of Daily Life</h2>
          <p className="text-lg md:text-xl font-light leading-relaxed opacity-70 mb-6">
            The iPod showed that technology can become a natural part of daily life when it is designed with people in mind. It wasn't just a tool. It was an extension of your personality. At the center of this change was Steve Jobs, who believed that technology and art should work together.
          </p>
        </Section>

        {/* Section 24: Simple Idea */}
        <Section>
          <h2 className="text-4xl md:text-6xl font-light tracking-tight mb-8">A Simple Idea</h2>
          <p className="text-lg md:text-xl font-light leading-relaxed opacity-70 mb-6">
            He was a leader who knew that great products start with a simple, powerful idea. He understood what people wanted even before they knew it themselves. He pushed the limits of what was possible and refused to settle for anything less than a product that could change the world.
          </p>
        </Section>

        {/* Section 25: Conclusion */}
        <Section className="pb-48">
          <div ref={lastSectionRef} className="space-y-12">
            <p className="text-xl md:text-3xl font-light leading-relaxed opacity-90">
              The iPod was more than just a successful product. It was the start of a new era for Apple and for the world. It was the moment when technology became personal and easy to take with you. It set us on a path to a future where our digital lives are just as important as our physical ones.
            </p>
            <div className="space-y-4">
              <p className="text-lg md:text-xl font-mono uppercase tracking-widest opacity-60">Simplicity.</p>
              <p className="text-lg md:text-xl font-mono uppercase tracking-widest opacity-60">Ecosystem.</p>
              <p className="text-lg md:text-xl font-mono uppercase tracking-widest opacity-60">Revolution.</p>
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
