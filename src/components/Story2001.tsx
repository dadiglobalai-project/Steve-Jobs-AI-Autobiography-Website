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
    { id: 1, url: "https://images.gizbot.com/img/2023/08/apple-ipod-from-2001-1691143595.jpg", alt: "CDs and Cassettes" },
    { id: 2, url: "https://tse2.mm.bing.net/th/id/OIP.CmrZ8nxl_0iXnmMQjok1KgHaDt?w=1200&h=600&rs=1&pid=ImgDetMain&o=7&rm=3", alt: "Digital Downloads" },
    { id: 3, url: "https://forevertwentysomethings.com/wp-content/uploads/2015/11/Untitled-design-82.jpg", alt: "Jobs' Opportunity" },
    { id: 4, url: "https://allaboutstevejobs.com/resources/img/pics/1999-01-01_08547.jpg", alt: "Enjoying Music" },
    { id: 5, url: "https://standfirst-designweek-production.imgix.net/uploads/2019/07/02161401/ipod-2001-launch-resized.jpg?fit=crop&crop=faces&q=80&auto=compress,format&w=750&h=500", alt: "Complete System" },
    { id: 6, url: "https://nbxsoluciones.com/wp-content/uploads/2024/10/steve_jobs.jpg", alt: "The Challenge" },
    { id: 7, url: "https://assets.shortpedia.com/uploads/2021/10/16/1634367828.webp?tr=w-1200,h-600,cm-pad_resize,bg-F3F3F3", alt: "The iPod" },
    { id: 8, url: "https://applescoop.org/image/story/steve-jobs-announcing-itunes-in-2001-applescoop-2024-11-04-22-29-10.jpeg", alt: "1,000 Songs" },
    { id: 9, url: "https://applescoop.org/image/story/steve-jobs-announcing-itunes-in-2001-applescoop-2024-11-04-22-29-10.jpeg", alt: "Turning Point" },
    { id: 10, url: "https://www.europeanceo.com/wp-content/uploads/2019/08/iTunes-music-store.jpg", alt: "Clean Design" },
    { id: 11, url: "https://luxurylaunches.com/wp-content/uploads/2025/02/stevejobs-bono.jpg", alt: "Beyond the Device" },
    { id: 12, url: "https://news.artnet.com/app/news-upload/2022/05/GettyImages-2038318-1920x1276.jpg", alt: "iTunes Creation" },
    { id: 13, url: "https://img.buzzfeed.com/buzzfeed-static/static/2022-05/11/15/asset/82ea240a9e12/sub-buzz-3015-1652281845-1.jpg?downsize=700:*&output-quality=auto&output-format=auto", alt: "iTunes Store" },
    { id: 14, url: "https://fm.cnbc.com/applications/cnbc.com/resources/img/editorial/2015/08/12/102914547-20140511--1520-11.1910x1000.jpg", alt: "Music Industry" },
    { id: 15, url: "https://tse1.mm.bing.net/th/id/OIP.R9YN3PpgLYJO4KM-Yk5tqgHaDS?w=2560&h=1138&rs=1&pid=ImgDetMain&o=7&rm=3", alt: "Complete Experience" },
    { id: 16, url: "https://tse4.mm.bing.net/th/id/OIP.Rl_5jtm1qo7_wX4fCeTKcQHaEk?rs=1&pid=ImgDetMain&o=7&rm=3", alt: "Discover and Buy" },
    { id: 17, url: "https://tse1.mm.bing.net/th/id/OIP.jQnBQ6MEgYDU1gqH3khpLAHaE7?w=810&h=539&rs=1&pid=ImgDetMain&o=7&rm=3", alt: "Immediate Impact" },
    { id: 18, url: "https://tse1.mm.bing.net/th/id/OIP.jQnBQ6MEgYDU1gqH3khpLAHaE7?w=810&h=539&rs=1&pid=ImgDetMain&o=7&rm=3", alt: "Personal Playlists" },
    { id: 19, url: "https://pmamagazine.org/wp-content/uploads/2024/07/the-ipods-1024x576.png", alt: "Music Everywhere" },
    { id: 20, url: "https://www.highsnobiety.com/static-assets/thumbor/C17Z-KW-jcAz8XC8QtKfc1ie8sQ=/960x640/www.highsnobiety.com/static-assets/wp-content/uploads/2018/08/02191304/apple-one-trillion-dollar-company-001.jpg", alt: "Industry Change" },
    { id: 21, url: "https://img.buzzfeed.com/buzzfeed-static/static/2022-05/11/15/asset/82ea240a9e12/sub-buzz-3001-1652281922-12.jpg?resize=990:647", alt: "Major Step Forward" },
    { id: 22, url: "https://c.files.bbci.co.uk/B803/production/_124670174_gettyimages-76523903.jpg", alt: "Millions of Users" },
    { id: 23, url: "https://pyxis.nymag.com/v1/imgs/d2e/8ba/16d97175a9c8874c36fafafb97686e3bc8-GettyImages-55739040.1x.rsocial.w1200.jpg", alt: "iPhone Foundation" },
    { id: 24, url: "https://laughingsquid.com/wp-content/uploads/2006/01/jobs_keynote.jpg?is-pending-load=1", alt: "Simplicity Focus" },
    { id: 25, url: "https://cdn.vox-cdn.com/thumbor/14AkQe4enGLW9P3wnvpsT-dk0ZE=/0x0:3504x2336/1820x1213/filters:focal(372x1165:932x1725)/cdn.vox-cdn.com/uploads/chorus_image/image/55929377/55313310.0.jpg", alt: "Meaningful Tech" },
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
            className="text-base md:text-2xl font-light leading-relaxed max-w-2xl mx-auto opacity-70 mb-6"
          >
            By the start of 2001, the world was changing, but the way we carried our music felt stuck in the past. For decades, our favorite songs were tied to physical objects. We lived with stacks of CDs that scratched, cassette tapes that tangled, and the simple hope of catching a good song on the radio.
          </motion.p>
        </Section>

        {/* Section 2: Internet Change */}
        <Section image={backgrounds[1]?.url} alt={backgrounds[1]?.alt}>
          <h2 className="text-xl md:text-6xl font-light tracking-tight mb-4 md:mb-8">The Early Digital Days</h2>
          <p className="text-base md:text-xl font-light leading-relaxed opacity-70 mb-4 md:mb-6">
            At the same time, the internet was beginning to change how we found music, but it was a chaotic and messy experience. Millions of people were discovering the ability to download songs, but the files were often poor quality and incorrectly labeled.
          </p>
          <p className="text-base md:text-xl font-light leading-relaxed opacity-70">
            There was no easy way to organize a large collection or keep track of what we owned. For most people, the dream of having a whole library of music on a computer felt out of reach. It was a technical puzzle that required too much time and effort, leaving the average person behind in a world of complicated software and broken connections.
          </p>
        </Section>

        {/* Section 3: Jobs' Opportunity */}
        <Section image={backgrounds[2]?.url} alt={backgrounds[2]?.alt}>
          <div className="border-l-2 border-current pl-6 md:pl-8 py-2 md:py-4">
            <h2 className="text-lg md:text-5xl font-light italic serif mb-4 md:mb-6">"A New Way to Listen"</h2>
            <p className="text-base md:text-xl font-light leading-relaxed opacity-70 mb-4">
              Steve Jobs watched this confusion and saw a beautiful opportunity to change how we lived. He believed that music was a fundamental part of the human experience, something that should be easy to enjoy and share. He felt that technology should get out of the way, allowing the art to speak for itself.
            </p>
            <p className="text-base md:text-xl font-light leading-relaxed opacity-70">
              To him, it wasn't just about bits and bytes; it was about the way a song could change your mood or bring back a memory. He imagined a future where anyone could carry their entire life's soundtrack in their pocket, turning a complicated technical problem into a simple, joyful experience.
            </p>
          </div>
        </Section>

        {/* Section 4: Complete System */}
        <Section image={backgrounds[4]?.url} alt={backgrounds[4]?.alt}>
          <h2 className="text-xl md:text-6xl font-light tracking-tight mb-4 md:mb-8">A Complete System</h2>
          <p className="text-base md:text-xl font-light leading-relaxed opacity-70 mb-4 md:mb-6">
            Jobs knew that to truly fix the problem, he couldn't just build another gadget. He wanted to create a complete system where the hardware and the software worked together in perfect harmony. At Apple, he pushed his team to think beyond the limits of what already existed.
          </p>
          <p className="text-base md:text-xl font-light leading-relaxed opacity-70">
            He challenged them to build a device that was incredibly fast, held a massive amount of music, and was so intuitive that a child could use it. He wanted to remove the friction from digital music, making the process of finding and playing a song feel as natural as breathing.
          </p>
        </Section>

        {/* Section 5: The Challenge */}
        <Section image={backgrounds[6]?.url} alt={backgrounds[6]?.alt}>
          <h2 className="text-xl md:text-6xl font-light tracking-tight mb-4 md:mb-8">Pure and Simple</h2>
          <p className="text-base md:text-xl font-light leading-relaxed opacity-70 mb-4 md:mb-6">
            He insisted on a design that felt pure and honest from the very first moment you held it. This relentless focus led to the creation of the iPod, a small and elegant device made of polished steel and white plastic. It didn't look like a computer; it looked like a piece of art.
          </p>
          <p className="text-base md:text-xl font-light leading-relaxed opacity-70">
            When Apple launched the iPod in October 2001, Jobs used a simple phrase that everyone remembered: "1,000 songs in your pocket." It was a promise of freedom in a device that fit in your hand.
          </p>
        </Section>

        {/* Section 6: Powerful Message */}
        <Section image={backgrounds[7]?.url} alt={backgrounds[7]?.alt}>
          <h2 className="text-xl md:text-6xl font-light tracking-tight mb-4 md:mb-8">A Message for Everyone</h2>
          <p className="text-base md:text-xl font-light leading-relaxed opacity-70 mb-4 md:mb-6">
            This message was powerful because it focused on the human benefit rather than the technology itself. Jobs understood that people didn't care about megabytes or disk speeds; they cared about their favorite albums and the songs that defined their lives.
          </p>
          <p className="text-base md:text-xl font-light leading-relaxed opacity-70">
            By framing the iPod as a way to carry your memories with you, he made the technology feel personal and accessible. It wasn't just a tool for tech enthusiasts anymore. It was a companion for everyone, a way to bring a little bit of magic into the ordinary moments of every day.
          </p>
        </Section>

        {/* Section 7: Turning Point */}
        <Section>
          <div className="border-l-2 border-current pl-6 md:pl-8 py-2 md:py-4">
            <h2 className="text-xl md:text-5xl font-light italic serif mb-4 md:mb-6">"A Big Change"</h2>
            <p className="text-base md:text-xl font-light leading-relaxed opacity-70 mb-4">
              The launch of the iPod marked a profound turning point in the history of technology. The device was remarkably clean, stripped of any unnecessary buttons or complicated menus. Its most innovative feature was the scroll wheel, a simple interface that allowed you to navigate through thousands of songs with just a gentle movement of your thumb.
            </p>
            <p className="text-base md:text-xl font-light leading-relaxed opacity-70">
              It turned the act of searching for music into something that felt like magic. For the first time, technology didn't feel like a barrier between you and your music; it felt like a bridge.
            </p>
          </div>
        </Section>

        {/* Section 8: Natural Feel */}
        <Section image={backgrounds[10]?.url} alt={backgrounds[10]?.alt}>
          <h2 className="text-2xl md:text-6xl font-light tracking-tight mb-4 md:mb-8">Easy to Use</h2>
          <p className="text-base md:text-xl font-light leading-relaxed opacity-70 mb-4 md:mb-6">
            The iPod was designed to feel natural and inviting, even for those who were intimidated by new gadgets. But Jobs realized that a beautiful device was only half of the solution.
          </p>
          <p className="text-base md:text-xl font-light leading-relaxed opacity-70">
            To truly revolutionize the industry, people needed a way to manage their growing digital libraries without the frustration of the past. This realization led to the evolution of iTunes, which would soon become the heart of the digital music revolution. It was the beginning of a new way of thinking about how we interact with our media and each other.
          </p>
        </Section>

        {/* Section 9: iTunes Creation */}
        <Section image={backgrounds[11]?.url} alt={backgrounds[11]?.alt}>
          <h2 className="text-2xl md:text-6xl font-light tracking-tight mb-4 md:mb-8">Bringing Order to Music</h2>
          <p className="text-base md:text-xl font-light leading-relaxed opacity-70 mb-4 md:mb-6">
            In its early days, iTunes was a simple but powerful tool designed to help people bring order to the chaos of their digital files. It allowed users to easily take music from their physical CDs and organize it into digital folders and personal playlists.
          </p>
          <p className="text-base md:text-xl font-light leading-relaxed opacity-70">
            It was the first step in making the computer the center of our creative lives. By providing a clean and reliable way to manage music, Apple gave people the confidence to embrace the digital world. It turned the computer from a cold machine into a personal library of everything we loved.
          </p>
        </Section>

        {/* Section 10: iTunes Store */}
        <Section image={backgrounds[12]?.url} alt={backgrounds[12]?.alt}>
          <h2 className="text-2xl md:text-6xl font-light tracking-tight mb-4 md:mb-8">99 Cents</h2>
          <p className="text-base md:text-xl font-light leading-relaxed opacity-70 mb-4 md:mb-6">
            Then, in 2003, Apple took another massive step by opening the iTunes Music Store. It was a move that would forever change the landscape of the music industry. The store offered a revolutionary new model: you could buy any song you wanted, legally and safely, for just 99 cents.
          </p>
          <p className="text-base md:text-xl font-light leading-relaxed opacity-70">
            It was a simple and fair price that respected both the customer and the artist. Jobs had spent months in difficult negotiations with record companies, convincing them that a digital future was not something to fear, but something to embrace.
          </p>
        </Section>

        {/* Section 11: Industry Negotiation */}
        <Section image={backgrounds[13]?.url} alt={backgrounds[13]?.alt}>
          <h2 className="text-2xl md:text-6xl font-light tracking-tight mb-4 md:mb-8">Making it All Work Together</h2>
          <p className="text-base md:text-xl font-light leading-relaxed opacity-70 mb-4 md:mb-6">
            Winning over the music industry was one of the most difficult challenges Jobs ever faced. Many executives were terrified that digital music would destroy their business, but Jobs showed them a better way.
          </p>
          <p className="text-base md:text-xl font-light leading-relaxed opacity-70">
            He built a system that was so easy and convenient that people would choose to pay for music rather than download it for free. Together, the iPod and iTunes created a seamless experience that had never existed before. You could discover a new artist, buy a song with a single click, and have it on your device in seconds, all without ever leaving your chair.
          </p>
        </Section>

        {/* Section 12: Ecosystem */}
        <Section image={backgrounds[14]?.url} alt={backgrounds[14]?.alt}>
          <div className="border-l-2 border-current pl-6 md:pl-8 py-2 md:py-4">
            <h2 className="text-xl md:text-5xl font-light italic serif mb-4 md:mb-6">"Everything Working Together"</h2>
            <p className="text-base md:text-xl font-light leading-relaxed opacity-70 mb-4">
              The true genius of the iPod was how every part of the system worked together in perfect sync. This was a core belief for Jobs: that products should not be isolated objects, but part of a larger ecosystem that makes life simpler.
            </p>
            <p className="text-base md:text-xl font-light leading-relaxed opacity-70">
              He wanted the transition from the store to the software to the device to be invisible. By controlling every step of the process, Apple was able to ensure a level of quality and ease that no other company could match. It was a reminder that when technology is designed with a single vision, it can feel like a natural extension of ourselves.
            </p>
          </div>
        </Section>

        {/* Section 13: Immediate Impact */}
        <Section image={backgrounds[16]?.url} alt={backgrounds[16]?.alt}>
          <h2 className="text-2xl md:text-6xl font-light tracking-tight mb-4 md:mb-8">A Global Success</h2>
          <p className="text-base md:text-xl font-light leading-relaxed opacity-70 mb-4 md:mb-6">
            The impact of the iPod was immediate and global. Almost overnight, the iconic white earbuds became a common sight on city streets and in quiet parks. It was a silent signal that you were part of a new era.
          </p>
          <p className="text-base md:text-xl font-light leading-relaxed opacity-70">
            People were no longer tethered to their home stereos or limited by the weight of their CD collections. They were free to move through the world with their own personal soundtrack, creating a sense of privacy and connection even in the middle of a crowded city. The iPod had turned music into a constant, living part of our environment.
          </p>
        </Section>

        {/* Section 14: Personal Connection */}
        <Section image={backgrounds[17]?.url} alt={backgrounds[17]?.alt}>
          <h2 className="text-2xl md:text-6xl font-light tracking-tight mb-4 md:mb-8">Your Own Music</h2>
          <p className="text-base md:text-xl font-light leading-relaxed opacity-70 mb-4 md:mb-6">
            Music became more personal than it had ever been before. It was no longer just something we listened to; it was something we lived with. Students used it to find focus during long study sessions, office workers used it to create a sense of space in busy rooms, and athletes used it to find the rhythm for their training.
          </p>
          <p className="text-base md:text-xl font-light leading-relaxed opacity-70">
            The iPod was a companion that understood your mood and followed your lead. It allowed us to curate our own experiences, turning the background noise of life into a series of meaningful and intentional moments.
          </p>
        </Section>

        {/* Section 15: Moving with People */}
        <Section image={backgrounds[18]?.url} alt={backgrounds[18]?.alt}>
          <h2 className="text-2xl md:text-6xl font-light tracking-tight mb-4 md:mb-8">Music on the Move</h2>
          <p className="text-base md:text-xl font-light leading-relaxed opacity-70 mb-4 md:mb-6">
            The iPod transformed music into something that moved with us, changing the very rhythm of our daily lives. It also forced the music industry to finally confront the digital age.
          </p>
          <p className="text-base md:text-xl font-light leading-relaxed opacity-70">
            By proving that people were willing to pay for a great experience, Apple paved the way for the streaming services that define how we listen today. It was the first step in a long journey toward a world where all the music ever recorded is available to everyone, everywhere. The iPod didn't just change how we listened; it changed what we expected from the world.
          </p>
        </Section>

        {/* Section 16: Industry Shift */}
        <Section image={backgrounds[20]?.url} alt={backgrounds[20]?.alt}>
          <h2 className="text-2xl md:text-6xl font-light tracking-tight mb-4 md:mb-8">The New Digital Era</h2>
          <p className="text-base md:text-xl font-light leading-relaxed opacity-70 mb-4 md:mb-6">
            The success of the iTunes Store was a clear sign that the digital era had truly arrived. It quickly became the most popular way to buy music, leading the entire industry into a new chapter.
          </p>
          <p className="text-base md:text-xl font-light leading-relaxed opacity-70">
            For Apple, the iPod was more than just a successful product; it was a fundamental shift in the company's identity. They were no longer just a computer company for a small group of enthusiasts. They were now a leader in culture, entertainment, and lifestyle, proving that their vision of simplicity and design could resonate with everyone.
          </p>
        </Section>

        {/* Section 17: Major Step Forward */}
        <Section image={backgrounds[21]?.url} alt={backgrounds[21]?.alt}>
          <div className="border-l-2 border-current pl-6 md:pl-8 py-2 md:py-4">
            <h2 className="text-xl md:text-5xl font-light italic serif mb-4 md:mb-6">"A New Audience"</h2>
            <p className="text-base md:text-xl font-light leading-relaxed opacity-70 mb-4">
              The iPod brought millions of new people into the Apple family, many of whom had never considered owning a Mac before. This became known as the 'halo effect,' as people who fell in love with their music player began to trust the company with the rest of their digital lives.
            </p>
            <p className="text-base md:text-xl font-light leading-relaxed opacity-70">
              It created a deep sense of loyalty and excitement that would fuel Apple's growth for years to come. The iPod opened a door that would never be closed, inviting the world to see technology not as a chore, but as a way to enhance the things they already loved.
            </p>
          </div>
        </Section>

        {/* Section 18: Foundation for iPhone */}
        <Section image={backgrounds[22]?.url} alt={backgrounds[22]?.alt}>
          <h2 className="text-2xl md:text-6xl font-light tracking-tight mb-4 md:mb-8">Building the Future</h2>
          <p className="text-base md:text-xl font-light leading-relaxed opacity-70 mb-4 md:mb-6">
            The technology and design lessons learned from the iPod became the foundation for everything Apple would build next. It was through the iPod that the company mastered the art of building small, powerful devices with incredible battery life and beautiful screens.
          </p>
          <p className="text-base md:text-xl font-light leading-relaxed opacity-70">
            They learned how to manage complex supply chains and how to create software that felt alive under your touch. The iPod was the laboratory where the future was being built, one small detail at a time, preparing the way for a revolution that was still years away.
          </p>
        </Section>

        {/* Section 19: Smooth Experience */}
        <Section image={backgrounds[23]?.url} alt={backgrounds[23]?.alt}>
          <h2 className="text-2xl md:text-6xl font-light tracking-tight mb-4 md:mb-8">Lessons from the iPod</h2>
          <p className="text-base md:text-xl font-light leading-relaxed opacity-70 mb-4 md:mb-6">
            These lessons would eventually lead to the creation of the iPhone, a device that would change the world even more profoundly than the iPod. Throughout this time, Steve Jobs' influence was visible in every single detail.
          </p>
          <p className="text-base md:text-xl font-light leading-relaxed opacity-70">
            He remained obsessed with the idea of simplicity, constantly pushing his team to remove anything that wasn't absolutely necessary. He believed that the best design was the one that felt like it had always been there, a product so refined that it felt like it couldn't have been made any other way.
          </p>
        </Section>

        {/* Section 20: Simplicity Focus */}
        <Section image={backgrounds[24]?.url} alt={backgrounds[24]?.alt}>
          <h2 className="text-2xl md:text-6xl font-light tracking-tight mb-4 md:mb-8">Focus on Simplicity</h2>
          <p className="text-base md:text-xl font-light leading-relaxed opacity-70 mb-4 md:mb-6">
            Jobs wanted products that felt human and responsive, even if they were incredibly difficult to engineer. He cared deeply about the way a device felt in your hand, the weight of the materials, and the way the interface responded to your touch.
          </p>
          <p className="text-base md:text-xl font-light leading-relaxed opacity-70">
            He had a rare talent for taking these complex ideas and explaining them to the public in a way that felt personal and deeply important. He didn't just sell products; he shared a vision of how life could be better, more beautiful, and more connected through the power of great design.
          </p>
        </Section>

        {/* Section 21: Meaningful Tech */}
        <Section image={backgrounds[22]?.url} alt={backgrounds[22]?.alt}>
          <div className="border-l-2 border-current pl-6 md:pl-8 py-2 md:py-4">
            <h2 className="text-xl md:text-5xl font-light italic serif mb-4 md:mb-6">"Technology for People"</h2>
            <p className="text-base md:text-xl font-light leading-relaxed opacity-70 mb-4">
              The simple phrase '1,000 songs in your pocket' remains one of the most perfect examples of his ability to make technology feel meaningful. It stripped away the jargon and the complexity, leaving only the human promise.
            </p>
            <p className="text-base md:text-xl font-light leading-relaxed opacity-70">
              Looking back, we can see that the iPod was much more than just a music player. It was a cultural shift that proved that the experience of using a product was just as important as the technology inside it. It was a reminder that when we design for people, we can create something that truly lasts.
            </p>
          </div>
        </Section>

        {/* Section 22: Changing Listening */}
        <Section image={backgrounds[21]?.url} alt={backgrounds[21]?.alt}>
          <h2 className="text-2xl md:text-6xl font-light tracking-tight mb-4 md:mb-8">Changing How We Live</h2>
          <p className="text-base md:text-xl font-light leading-relaxed opacity-70 mb-4 md:mb-6">
            The iPod changed the way we listen to music and how we connect with the artists who move us. It moved the world away from the limitations of physical media and toward the infinite possibilities of the digital world.
          </p>
          <p className="text-base md:text-xl font-light leading-relaxed opacity-70">
            It was the device that first put the power of the internet in our pockets, changing the way we interact with information and each other. It was a quiet revolution that started with a single song and ended by changing the rhythm of the entire world, one person at a time.
          </p>
        </Section>

        {/* Section 23: Natural Part of Life */}
        <Section image={backgrounds[19]?.url} alt={backgrounds[19]?.alt}>
          <h2 className="text-2xl md:text-6xl font-light tracking-tight mb-4 md:mb-8">Part of Daily Life</h2>
          <p className="text-base md:text-xl font-light leading-relaxed opacity-70 mb-4 md:mb-6">
            It showed us that technology can become a natural and beautiful part of our daily lives when it is designed with empathy and care. The iPod wasn't just a tool; it was an extension of our personalities and a reflection of our tastes.
          </p>
          <p className="text-base md:text-xl font-light leading-relaxed opacity-70">
            It allowed us to carry our inner worlds with us wherever we went. At the heart of this transformation was Steve Jobs, a man who believed that the intersection of technology and the liberal arts was where the most important work happened. He saw the beauty in the machine.
          </p>
        </Section>

        {/* Section 24: Simple Idea */}
        <Section image={backgrounds[15]?.url} alt={backgrounds[15]?.alt}>
          <h2 className="text-2xl md:text-6xl font-light tracking-tight mb-4 md:mb-8">A Simple Idea</h2>
          <p className="text-base md:text-xl font-light leading-relaxed opacity-70 mb-4 md:mb-6">
            He was a leader who understood that every great product begins with a simple and powerful idea. He had a unique ability to see what people wanted long before they realized it themselves.
          </p>
          <p className="text-base md:text-xl font-light leading-relaxed opacity-70">
            He refused to settle for anything less than perfection, pushing the boundaries of what was possible and challenging his team to do the best work of their lives. He knew that by focusing on the things that truly mattered, he could create something that would change the world for the better, leaving a legacy of beauty and innovation.
          </p>
        </Section>

        {/* Section 25: Conclusion */}
        <Section image={backgrounds[24]?.url} alt={backgrounds[24]?.alt} className="pb-48">
          <div ref={lastSectionRef} className="space-y-8 md:space-y-12">
            <p className="text-base md:text-2xl font-light leading-relaxed opacity-90 mb-8">
              The iPod was more than just a successful product; it was the beginning of a new era for Apple and for the entire world. It was the moment when technology became truly personal, portable, and easy to love.
            </p>
            <p className="text-base md:text-2xl font-light leading-relaxed opacity-90">
              It set us on a path toward a future where our digital lives are seamlessly integrated with our physical ones, a world where the power of information and art is always within reach. It was a journey that started with a simple wheel and led us to a future that is brighter and more connected than we ever imagined.
            </p>
            <div className="space-y-4">
              <p className="text-base md:text-xl font-mono uppercase tracking-widest opacity-60">Simplicity.</p>
              <p className="text-base md:text-xl font-mono uppercase tracking-widest opacity-60">Ecosystem.</p>
              <p className="text-base md:text-xl font-mono uppercase tracking-widest opacity-60">Revolution.</p>
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
