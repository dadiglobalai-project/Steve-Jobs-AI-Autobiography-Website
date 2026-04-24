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

export const Story2011: React.FC = () => {
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

  // Dynamic 21-stage background mapping
  const totalSections = 21;
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
    { id: 1, url: "https://www.iitaly.org/sites/default/files/styles/article-slideshow-visual/public/slideshow_pro/apple3.jpg", alt: "Steve Jobs Legacy" },
    { id: 2, url: "https://media-cldnry.s-nbcnews.com/image/upload/t_social_share_1200x630_center,f_auto,q_auto:best/MSNBC/Components/Slideshows/_production/ss-111006-jobs-reaction/ss-111006-jobs-reaction-01.jpg", alt: "Steve Jobs Reaction" },
    { id: 3, url: "https://theoneliner.in/wp-content/uploads/2024/11/Tim-Cook-with-Steve-Jobs-1024x576.jpg", alt: "Apple Store Tribute" },
    { id: 4, url: "https://somoslibres.org/images/2025/02/27/steve_restored.webp", alt: "Technology and Liberal Arts" },
    { id: 5, url: "https://img-cdn.inc.com/image/upload/f_webp,c_fit,w_1920,q_auto/images/panoramic/GettyImages-96213580_474271_uya5ba.jpg", alt: "Design Simplicity" },
    { id: 6, url: "https://media.cnn.com/api/v1/images/stellar/prod/210511042513-steve-jobs-stanford-speech-2005.jpg?q=x_3,y_75,h_1320,w_2347,c_crop/w_1280", alt: "Stanford Commencement Speech" },
    { id: 7, url: "https://i0.wp.com/imp.news/wp-content/uploads/2021/02/Steve-Job.jpg?fit=1920%2C1080&ssl=1", alt: "Stay Hungry Stay Foolish" },
    { id: 8, url: "https://clickpetroleoegas.com.br/wp-content/uploads/2024/04/Apple-Park-conheca-a-obra-prima-final-de-Steve-Jobs-investimento-foi-de-5-bilhoes-de-dolares.jpg", alt: "Apple Park Aerial" },
    { id: 9, url: "https://media.licdn.com/dms/image/v2/C5112AQFOfCvIHdjbWg/article-cover_image-shrink_600_2000/article-cover_image-shrink_600_2000/0/1520097438773?e=2147483647&v=beta&t=_oTIaJ2PHpb98wnqdQeRW0D5ZkHyXD7kwPasOutZgqc", alt: "Future Vision" },
    { id: 10, url: "https://www.applemust.com/wp-content/uploads/2017/01/iphone7-release-nyc-1.jpg", alt: "Digital Impact" },
    { id: 11, url: "https://cdn.prod.website-files.com/657de0bae2fcd55519d3fe50/657de0bae2fcd55519d4010f_Gen-Z-guide-for-Influencer-Marketing.webp", alt: "Creative Spirit" },
    { id: 12, url: "https://tse3.mm.bing.net/th/id/OIP.XuIz6Tm0YGIaw5umYl0D-AHaEP?w=626&h=358&rs=1&pid=ImgDetMain&o=7&rm=3", alt: "Zen Influence" },
    { id: 13, url: "https://photos5.appleinsider.com/gallery/58273-118729-001-Mac-team-BW-xl.jpg", alt: "Leadership Legacy" },
    { id: 14, url: "https://media.cnn.com/api/v1/images/stellar/prod/111006123745-steve-jobs-offstage-wwd-conference.jpg?q=w_3000,h_2029,x_0,y_0,c_fill/w_1280", alt: "Global Tribute" },
    { id: 15, url: "https://cdn.geekwire.com/wp-content/uploads/2011/10/jobstribute.jpg", alt: "Enduring Spirit" },
    { id: 16, url: "https://www.apple.com/v/education/k12/home/aa/images/deploy-and-manage/hero__bdrr6j8wm23m_xlarge.jpg", alt: "Next Generation" },
    { id: 17, url: "https://www.cultofmac.com/wp-content/uploads/2017/01/MacIntosh_Plus_img_1317.jpg", alt: "Timeless Design" },
    { id: 18, url: "https://tse1.mm.bing.net/th/id/OIP.rafh9fdiGR1cSXzlEl7XCwHaGA?rs=1&pid=ImgDetMain&o=7&rm=3", alt: "Infinite Loop" },
    { id: 19, url: "https://book.stevejobsarchive.com/photos/photo-58~1500.jpg", alt: "Innovation Light" },
    { id: 20, url: "https://book.stevejobsarchive.com/photos/photo-27~1500.jpg", alt: "Final Reflection" },
    { id: 21, url: "https://tse4.mm.bing.net/th/id/OIP.-8-j1xbXhRp42Rt8k5OSbwHaDt?rs=1&pid=ImgDetMain&o=7&rm=3", alt: "Steve Jobs Silhouette" },
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
            className="text-base md:text-2xl font-light leading-relaxed max-w-2xl mx-auto opacity-70 mb-6"
          >
            On October 5, 2011, the world lost a visionary who didn't just build products, but fundamentally changed how we interact with technology and each other. Steve Jobs passed away at the age of 56, leaving behind a legacy that continues to ripple through every corner of our digital lives. His departure marked the end of an era, but his influence remains as vibrant and essential as ever.
          </motion.p>
          
        </Section>

        {/* Section 1: The Final Chapter */}
        <Section image={backgrounds[1]?.url} alt={backgrounds[1]?.alt}>
          <h2 className="text-xl md:text-6xl font-light tracking-tight mb-4 md:mb-8">The Final Chapter</h2>
          <p className="text-base md:text-xl font-light leading-relaxed opacity-70 mb-4 md:mb-6">
            In August 2011, Steve Jobs stepped down as CEO of Apple, a role he had held with unparalleled intensity since his return in 1997. His health had been a subject of global concern for years, yet his resignation still felt like a seismic shift. He passed the torch to Tim Cook, ensuring that the company he co-founded in a garage would continue to thrive on the principles he had so carefully established.
          </p>
          <p className="text-base md:text-xl font-light leading-relaxed opacity-70">
            Even in his final days, his commitment to Apple never wavered. He spent his remaining time ensuring a smooth transition, focusing on the future of the company he loved so dearly. He knew that his greatest creation wasn't a single product, but the organization itself—a place where innovation was the air everyone breathed.
          </p>
        </Section>

        {/* Section 2: A World Transformed */}
        <Section image={backgrounds[2]?.url} alt={backgrounds[2]?.alt}>
          <div className="border-l-2 border-current pl-6 md:pl-8 py-2 md:py-4">
            <h2 className="text-lg md:text-5xl font-light italic serif mb-4 md:mb-6">"A World Transformed"</h2>
            <p className="text-base md:text-xl font-light leading-relaxed opacity-70 mb-4">
              The reaction to his passing was immediate and global. From makeshift memorials at Apple Stores to tributes from world leaders and tech rivals, the message was clear: Steve Jobs was more than a businessman; he was a cultural icon. He had taken technology from the hands of hobbyists and put it into the pockets of billions, making it beautiful, intuitive, and deeply personal.
            </p>
            <p className="text-base md:text-xl font-light leading-relaxed opacity-70">
              Millions of people shared personal stories of how his products had touched their lives. For some, it was the computer that helped them start a business; for others, the phone that kept them connected to loved ones. He had created a bridge between the digital and the human, proving that machines could be elegant, friendly, and even inspiring.
            </p>
          </div>
        </Section>

        {/* Section 3: Design Philosophy */}
        <Section image={backgrounds[3]?.url} alt={backgrounds[3]?.alt}>
          <h2 className="text-xl md:text-6xl font-light tracking-tight mb-4 md:mb-8">The Intersection of Arts and Tech</h2>
          <p className="text-base md:text-xl font-light leading-relaxed opacity-70 mb-4 md:mb-6">
            Jobs famously believed that Apple stood at the intersection of technology and the liberal arts. He brought a poet's sensibility to the world of silicon and software. For him, a computer wasn't just a machine; it was a "bicycle for the mind." He obsessed over the curve of a corner, the feel of a scroll, and the simplicity of an interface, believing that great design was not just how something looked, but how it worked.
          </p>
          <p className="text-base md:text-xl font-light leading-relaxed opacity-70">
            He saw beauty in the unseen details, insisting that the inside of a computer should be as beautiful as the outside. This philosophy was rooted in a deep respect for the human spirit and a belief that technology should serve it, not the other way around. He taught us that when we combine engineering with empathy, we create something truly magical.
          </p>
        </Section>

        {/* Section 4: Simplicity */}
        <Section image={backgrounds[4]?.url} alt={backgrounds[4]?.alt}>
          <h2 className="text-xl md:text-6xl font-light tracking-tight mb-4 md:mb-8">The Power of Focus</h2>
          <p className="text-base md:text-xl font-light leading-relaxed opacity-70 mb-4 md:mb-6">
            One of his greatest strengths was the ability to say "no." He ruthlessly simplified Apple's product line, focusing on a few things and doing them better than anyone else. This focus on excellence over quantity became the hallmark of the modern Apple. He taught us that simplicity is the ultimate sophistication, and that by removing the clutter, we can find the essence of what truly matters.
          </p>
          <p className="text-base md:text-xl font-light leading-relaxed opacity-70">
            It takes immense courage to be simple, to strip away the unnecessary until only the truth remains. Jobs understood that clarity is a gift we give to our users, allowing them to focus on their own creativity instead of struggling with the tool. His legacy is a reminder that in a world of endless noise, the quietest and most focused voices are often the most powerful.
          </p>
        </Section>

        {/* Section 5: Stanford Speech */}
        <Section image={backgrounds[5]?.url} alt={backgrounds[5]?.alt}>
          <div className="border-l-2 border-current pl-6 md:pl-8 py-2 md:py-4">
            <h2 className="text-xl md:text-5xl font-light italic serif mb-4 md:mb-6">"Stay Hungry, Stay Foolish"</h2>
            <p className="text-base md:text-xl font-light leading-relaxed opacity-70 mb-4">
              His 2005 Stanford commencement speech remains one of the most influential messages of our time. He spoke about connecting the dots, the importance of loving what you do, and the clarity that comes from remembering that we are all mortal. His final exhortation, "Stay Hungry, Stay Foolish," became a mantra for a new generation of creators, entrepreneurs, and dreamers.
            </p>
            <p className="text-base md:text-xl font-light leading-relaxed opacity-70">
              These words continue to echo in the hearts of those who seek to make a difference. He reminded us that our time is limited, so we shouldn't waste it living someone else's life. His message was a call to arms for the spirit, an invitation to follow our intuition and have the courage to be ourselves, no matter the cost.
            </p>
          </div>
        </Section>

        {/* Section 6: Death as a Tool */}
        <Section image={backgrounds[6]?.url} alt={backgrounds[6]?.alt}>
          <h2 className="text-2xl md:text-6xl font-light tracking-tight mb-4 md:mb-8">Remembering You Are Going to Die</h2>
          <p className="text-base md:text-xl font-light leading-relaxed opacity-70 mb-4 md:mb-6">
            "Remembering that you are going to die is the best way I know to avoid the trap of thinking you have something to lose. You are already naked. There is no reason not to follow your heart." These words, spoken years before his passing, revealed the deep philosophical core that drove his relentless pursuit of innovation. He lived with an urgency that few could match, always pushing for the next breakthrough.
          </p>
          <p className="text-base md:text-xl font-light leading-relaxed opacity-70">
            This perspective gave him the freedom to take risks that others wouldn't dare. He saw death not as a tragedy, but as life's change agent, clearing out the old to make way for the new. It was this profound understanding of the temporary nature of things that allowed him to build products that felt timeless, capturing a sense of wonder that endures.
          </p>
        </Section>

        {/* Section 7: Apple Park */}
        <Section image={backgrounds[7]?.url} alt={backgrounds[7]?.alt}>
          <h2 className="text-2xl md:text-6xl font-light tracking-tight mb-4 md:mb-8">The Last Project</h2>
          <p className="text-base md:text-xl font-light leading-relaxed opacity-70 mb-4 md:mb-6">
            One of his final major projects was the vision for Apple Park, the company's new headquarters. He envisioned a "spaceship" that would blend seamlessly with nature, a place where thousands of creative minds could collaborate in an environment designed for inspiration. It stands today as a physical testament to his belief in the power of architecture and environment to shape human creativity.
          </p>
          <p className="text-base md:text-xl font-light leading-relaxed opacity-70">
            He obsessed over every detail of the campus, from the curve of the glass to the specific types of trees planted in the courtyard. He wanted to create a sanctuary where the boundaries between indoors and outdoors would disappear, fostering a sense of peace and possibility. It is a living monument to his belief that the places we inhabit should reflect the beauty and order we strive to create in our work.
          </p>
        </Section>

        {/* Section 8: The Future of Apple */}
        <Section image={backgrounds[8]?.url} alt={backgrounds[8]?.alt}>
          <h2 className="text-2xl md:text-6xl font-light tracking-tight mb-4 md:mb-8">A Foundation for the Future</h2>
          <p className="text-base md:text-xl font-light leading-relaxed opacity-70 mb-4 md:mb-6">
            Jobs didn't just leave behind products; he left behind a culture. He built a team and a system that could continue to innovate long after he was gone. He understood that for Apple to survive, it had to be more than just one man. He institutionalized his values, ensuring that the pursuit of perfection and the desire to "make a dent in the universe" would remain at the heart of the company.
          </p>
          <p className="text-base md:text-xl font-light leading-relaxed opacity-70">
            The foundation he built was strong enough to weather any storm. He taught his colleagues how to think, not just what to build, fostering a collective intelligence that continues to push the boundaries of technology. His legacy is the enduring spirit of a company that refuses to settle for anything less than excellence, always striving to create products that are worthy of the people who use them.
          </p>
        </Section>

        {/* Section 9: Digital Revolution */}
        <Section image={backgrounds[9]?.url} alt={backgrounds[9]?.alt}>
          <div className="border-l-2 border-current pl-6 md:pl-8 py-2 md:py-4">
            <h2 className="text-xl md:text-5xl font-light italic serif mb-4 md:mb-6">"The Architect of the Digital Age"</h2>
            <p className="text-base md:text-xl font-light leading-relaxed opacity-70 mb-4">
              From the personal computer to the smartphone, from digital music to animated films, Jobs was the architect of the world we live in today. He saw the potential for technology to empower individuals, to bridge distances, and to unleash creativity. He didn't just predict the future; he built it, one revolutionary product at a time.
            </p>
            <p className="text-base md:text-xl font-light leading-relaxed opacity-70">
              He democratized creativity, giving ordinary people the power to do extraordinary things. By making complex technology accessible and intuitive, he opened up new worlds of expression for millions. His impact is felt every time we capture a photo, share a song, or connect with someone across the globe, a testament to his vision of a world where technology enhances our humanity.
            </p>
          </div>
        </Section>

        {/* Section 10: Creative Spirit */}
        <Section image={backgrounds[10]?.url} alt={backgrounds[10]?.alt}>
          <h2 className="text-2xl md:text-6xl font-light tracking-tight mb-4 md:mb-8">The Creative Spirit</h2>
          <p className="text-base md:text-xl font-light leading-relaxed opacity-70 mb-4 md:mb-6">
            His spirit lives on in every person who uses a tool to create something new. Whether it's a student coding their first app, an artist designing on a tablet, or a musician recording in their bedroom, they are all part of the legacy of Steve Jobs. He gave us the tools to express our own creativity, believing that everyone has the potential to change the world.
          </p>
          <p className="text-base md:text-xl font-light leading-relaxed opacity-70">
            He ignited a spark of inspiration that continues to burn brightly in the hearts of makers everywhere. By providing us with powerful and intuitive tools, he removed the barriers to entry for countless creative pursuits. His legacy is the millions of stories being told, songs being composed, and problems being solved by people who were empowered by his vision.
          </p>
        </Section>

        {/* Section 11: Zen and Design */}
        <Section image={backgrounds[11]?.url} alt={backgrounds[11]?.alt}>
          <h2 className="text-2xl md:text-6xl font-light tracking-tight mb-4 md:mb-8">Zen Influence</h2>
          <p className="text-base md:text-xl font-light leading-relaxed opacity-70 mb-4 md:mb-6">
            His lifelong interest in Zen Buddhism deeply influenced his approach to design and life. He sought the "emptiness" that allows for true clarity and focus. This spiritual grounding helped him navigate the highs and lows of his career, and it gave his products a sense of calm and purpose that set them apart from everything else.
          </p>
          <p className="text-base md:text-xl font-light leading-relaxed opacity-70">
            He found beauty in minimalism and intentionality, believing that every element of a product should have a reason for being. This Zen influence is visible in the clean lines, the intuitive interfaces, and the overall sense of harmony that defines Apple's design language. He showed us that by embracing simplicity and mindfulness, we can create things that are not only functional but also deeply meaningful.
          </p>
        </Section>

        {/* Section 12: Leadership Legacy */}
        <Section image={backgrounds[12]?.url} alt={backgrounds[12]?.alt}>
          <h2 className="text-2xl md:text-6xl font-light tracking-tight mb-4 md:mb-8">The Leadership Legacy</h2>
          <p className="text-base md:text-xl font-light leading-relaxed opacity-70 mb-4 md:mb-6">
            Jobs was a demanding leader, often pushing his teams to their absolute limits. But he also inspired them to do the best work of their lives. He taught us that leadership is about having a clear vision and the courage to follow it, even when others doubt you. He showed us that by setting the bar high, we can achieve things we never thought possible.
          </p>
          <p className="text-base md:text-xl font-light leading-relaxed opacity-70">
            He inspired a level of loyalty and passion that is rare in the corporate world. His colleagues didn't just work for him; they believed in the mission he had set before them. He taught us that true leadership is not about control, but about inspiration, and that by believing in the potential of others, we can help them reach heights they never imagined.
          </p>
        </Section>

        {/* Section 13: Global Impact */}
        <Section image={backgrounds[13]?.url} alt={backgrounds[13]?.alt}>
          <div className="border-l-2 border-current pl-6 md:pl-8 py-2 md:py-4">
            <h2 className="text-xl md:text-5xl font-light italic serif mb-4 md:mb-6">"A Global Inspiration"</h2>
            <p className="text-base md:text-xl font-light leading-relaxed opacity-70 mb-4">
              His story is one of the great American narratives, a journey of triumph, failure, and ultimate redemption. It's a story that inspires people all over the world to follow their passions and to never settle for the status quo. He proved that an individual with a vision and the determination to see it through can truly change the course of history.
            </p>
            <p className="text-base md:text-xl font-light leading-relaxed opacity-70">
              The universal appeal of his journey lies in its humanity—the mistakes made, the lessons learned, and the unwavering belief in the power of ideas. He showed us that failure is not the end, but a necessary step on the path to greatness. His life is a testament to the fact that with enough passion and perseverance, anyone can make a meaningful impact on the world.
            </p>
          </div>
        </Section>

        {/* Section 14: Enduring Spirit */}
        <Section image={backgrounds[14]?.url} alt={backgrounds[14]?.alt}>
          <h2 className="text-2xl md:text-6xl font-light tracking-tight mb-4 md:mb-8">The Enduring Spirit</h2>
          <p className="text-base md:text-xl font-light leading-relaxed opacity-70 mb-4 md:mb-6">
            Even years after his passing, his presence is still felt in every Apple keynote, in every new product launch, and in the way we think about the future. He set a standard for excellence that remains the benchmark for the entire industry. His spirit is the "Think Different" campaign in action, a reminder that the people who are crazy enough to think they can change the world are the ones who do.
          </p>
          <p className="text-base md:text-xl font-light leading-relaxed opacity-70">
            He started an ongoing conversation about the role of technology in our lives, a dialogue that continues to evolve as we face new challenges and opportunities. His influence is not a static memory, but a living force that encourages us to keep questioning, keep exploring, and keep striving for something better. He taught us that the future is not something that happens to us, but something we create.
          </p>
        </Section>

        {/* Section 15: Next Generation */}
        <Section image={backgrounds[15]?.url} alt={backgrounds[15]?.alt}>
          <h2 className="text-2xl md:text-6xl font-light tracking-tight mb-4 md:mb-8">The Next Generation</h2>
          <p className="text-base md:text-xl font-light leading-relaxed opacity-70 mb-4 md:mb-6">
            As we look to the future, the lessons of Steve Jobs are more relevant than ever. In a world of increasing complexity, his focus on simplicity and human-centered design is a guiding light. He challenge us to be more than just consumers; he challenges us to be creators, to be innovators, and to always stay hungry and stay foolish.
          </p>
          <p className="text-base md:text-xl font-light leading-relaxed opacity-70">
            The next generation carries the responsibility of building on the foundation he laid, using the tools he provided to solve the problems of tomorrow. He showed us that the most important thing we can do is to follow our hearts and our intuition, trusting that they somehow already know what we truly want to become. His legacy is an invitation to dream big and to have the courage to make those dreams a reality.
          </p>
        </Section>

        {/* Section 16: Timeless Design */}
        <Section image={backgrounds[16]?.url} alt={backgrounds[16]?.alt}>
          <h2 className="text-2xl md:text-6xl font-light tracking-tight mb-4 md:mb-8">Timeless Design</h2>
          <p className="text-base md:text-xl font-light leading-relaxed opacity-70 mb-4 md:mb-6">
            The products he created have a timeless quality. They don't just age; they become classics. This is because they were built on a foundation of fundamental design principles that transcend trends. He understood that true beauty is found in the perfect balance of form and function, and that by striving for that balance, we can create things that last.
          </p>
          <p className="text-base md:text-xl font-light leading-relaxed opacity-70">
            The enduring appeal of his creations lies in their honesty and their elegance. They are not just gadgets, but expressions of a deep commitment to quality and craftsmanship. He taught us that by focusing on the essentials and refusing to compromise on excellence, we can create products that resonate with people on a profound level, becoming a part of their lives for years to come.
          </p>
        </Section>

        {/* Section 17: Infinite Loop */}
        <Section image={backgrounds[17]?.url} alt={backgrounds[17]?.alt}>
          <div className="border-l-2 border-current pl-6 md:pl-8 py-2 md:py-4">
            <h2 className="text-xl md:text-5xl font-light italic serif mb-4 md:mb-6">"The Infinite Loop"</h2>
            <p className="text-base md:text-xl font-light leading-relaxed opacity-70 mb-4">
              The journey that began in a garage in Los Altos has come full circle, but the loop is infinite. The ideas he sparked continue to evolve, leading to new breakthroughs and new ways of seeing the world. He set in motion a cycle of innovation that shows no signs of slowing down, a testament to the power of a single, focused vision.
            </p>
            <p className="text-base md:text-xl font-light leading-relaxed opacity-70">
              The momentum of his ideas is carried forward by every person who dares to think differently. He showed us that a single spark of inspiration can ignite a revolution, and that the impact of one life can be felt for generations. The infinite loop is a reminder that the pursuit of excellence is a journey without end, a constant striving to make the world a more beautiful and intuitive place.
            </p>
          </div>
        </Section>

        {/* Section 18: Final Reflection */}
        <Section image={backgrounds[18]?.url} alt={backgrounds[18]?.alt}>
          <h2 className="text-2xl md:text-6xl font-light tracking-tight mb-4 md:mb-8">A Final Reflection</h2>
          <p className="text-base md:text-xl font-light leading-relaxed opacity-70 mb-4 md:mb-6">
            Steve Jobs once said, "Being the richest man in the cemetery doesn't matter to me. Going to bed at night saying we've done something wonderful... that's what matters to me." He lived his life by that principle, and in doing so, he gave us all something wonderful. He showed us that technology can be a force for good, a tool for expression, and a source of wonder.
          </p>
          <p className="text-base md:text-xl font-light leading-relaxed opacity-70">
            His life was a masterclass in the meaning of a life well-lived—one dedicated to passion, purpose, and the pursuit of something greater than oneself. He taught us that the true measure of success is not found in wealth or fame, but in the positive impact we have on the lives of others. His legacy is a gift to all of us, a reminder that we each have the power to create something wonderful.
          </p>
        </Section>

        {/* Section 19: The Dent */}
        <Section image={backgrounds[19]?.url} alt={backgrounds[19]?.alt}>
          <h2 className="text-2xl md:text-6xl font-light tracking-tight mb-4 md:mb-8">The Dent in the Universe</h2>
          <p className="text-base md:text-xl font-light leading-relaxed opacity-70 mb-4 md:mb-6">
            He famously wanted to "put a dent in the universe." Looking at the world today, it's clear that he did more than just put a dent in it; he reshaped it. He left the world better than he found it, and he gave us the inspiration to do the same. His legacy is not just in the devices we use, but in the belief that we can all make a difference.
          </p>
          <p className="text-base md:text-xl font-light leading-relaxed opacity-70">
            The ripple effect of his life continues to expand, touching lives in ways he could never have imagined. He showed us that one person with a clear vision and a relentless focus can truly change the world. His story is a reminder that we are all capable of making our own dent in the universe, if we only have the courage to follow our hearts and our intuition.
          </p>
        </Section>

        {/* Section 20: Final Tribute */}
        <Section image={backgrounds[20]?.url} alt={backgrounds[20]?.alt} className="pb-48">
          <div ref={lastSectionRef} className="space-y-8 md:space-y-12">
            <p className="text-base md:text-2xl font-light leading-relaxed opacity-90 mb-8">
              Steve Jobs was a man who saw the world not as it was, but as it could be. He was a dreamer who did, a visionary who built, and a leader who inspired. His legacy is infinite, and his spirit will continue to guide us as we navigate the ever-changing landscape of the future.
            </p>
            <p className="text-base md:text-2xl font-light leading-relaxed opacity-90">
              The light he left behind continues to illuminate the path for all those who seek to create, to innovate, and to dream. He showed us that the most important thing we can do is to be true to ourselves and to follow our passions with everything we have. His spirit is a constant reminder that the journey is the reward, and that the best is yet to come.
            </p>
            <div className="space-y-4">
              <p className="text-base md:text-xl font-mono uppercase tracking-widest opacity-60">Stay Hungry.</p>
              <p className="text-base md:text-xl font-mono uppercase tracking-widest opacity-60">Stay Foolish.</p>
              <p className="text-base md:text-xl font-mono uppercase tracking-widest opacity-60">Stay Inspired.</p>
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
