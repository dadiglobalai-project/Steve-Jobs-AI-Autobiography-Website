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

export const Story2007: React.FC = () => {
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

  // Dynamic 26-stage background mapping
  const totalSections = 26;
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
    { id: 1, url: "https://www.macfilos.com/wp-content/uploads/2015/06/5c5324a6220a1_img.png", alt: "Clunky Mobile Phones" },
    { id: 2, url: "https://www.androidauthority.com/wp-content/uploads/2018/07/motorola-razr-v3-lineup-1280w-720h.jpg", alt: "Steve Jobs' Vision" },
    { id: 3, url: "https://i.pinimg.com/736x/81/a6/f3/81a6f3fdac7b2483b7e4c1a22692d969.jpg", alt: "Secret Project" },
    { id: 4, url: "https://photos5.appleinsider.com/gallery/19719-20680-fadell-top-l.jpg", alt: "Touch Screen Technology" },
    { id: 5, url: "https://wallpaper-house.com/data/out/21/wallpaper2you_8969.jpg", alt: "Simplification" },
    { id: 7, url: "https://www.cultofmac.com/wp-content/uploads/2013/06/Screen-Shot-2013-06-21-at-13.54.13.jpg", alt: "The iPhone Reveal" },
    { id: 8, url: "https://en.shiftdelete.net/wp-content/uploads/2025/10/apple-steve-jobs-tasarim.jpg", alt: "Touch Interaction" },
    { id: 9, url: "https://i.ytimg.com/vi/bXBdD4OKIlQ/maxresdefault.jpg", alt: "Mobile Web Browsing" },
    { id: 10, url: "https://imageio.forbes.com/specials-images/imageserve/67ffd56db3febfbd523cb1c9/0x0.jpg?format=jpg&height=900&width=1600&fit=bounds", alt: "The App Store" },
    { id: 11, url: "https://nypost.com/wp-content/uploads/sites/2/2023/01/GettyImages-1172367884.jpg", alt: "Modern Communication" },
    { id: 12, url: "https://cdn-images-1.medium.com/max/1600/1*fD57wSGcI_iECLKdSYdBMQ.jpeg", alt: "Media Consumption" },
    { id: 13, url: "https://cdn.vox-cdn.com/thumbor/z9OsJJVYAhKJSsUs85l45LJ8a_Y=/0x0:3504x2336/920x613/filters:focal(2245x904:2805x1464)/cdn.vox-cdn.com/uploads/chorus_image/image/52660947/175779245.0.jpg", alt: "Global Impact" },
    { id: 14, url: "https://media.cnn.com/api/v1/images/stellar/prod/230718105811-steve-jobs-iphone-2007.jpg?c=original", alt: "Industry Shift" },
    { id: 15, url: "https://tse3.mm.bing.net/th/id/OIP.ny_mlydQOSB-aC3s9b4GxAHaEK?rs=1&pid=ImgDetMain&o=7&rm=3", alt: "Apple's Success" },
    { id: 16, url: "https://tse3.mm.bing.net/th/id/OIP.zasMhAJUnqXzkto12PWIKQHaEK?w=780&h=438&rs=1&pid=ImgDetMain&o=7&rm=3", alt: "Design Philosophy" },
    { id: 17, url: "https://news.cgtn.com/news/3d497a4e7955444e/img/c0b4345d-77e3-4e1e-997f-30c8e8649b80.jpg", alt: "Focused Leadership" },
    { id: 18, url: "https://e3.365dm.com/17/01/1600x900/7a7e3cd7f0b58cdf6a56ca3176e8fae79ac20718c883924a06f65d36d2035773_3866933.jpg?20170109103418", alt: "The Future of Technology" },
    { id: 19, url: "https://www.cultofmac.com/wp-content/uploads/2010/07/iphone-south-korea.jpg", alt: "Human Connection" },
    { id: 20, url: "https://i.ytimg.com/vi/MnrJzXM7a6o/sddefault.jpg", alt: "True Innovation" },
    { id: 21, url: "https://i.dailymail.co.uk/i/pix/2015/07/10/16/2A6AC64800000578-0-image-a-75_1436543260791.jpg", alt: "Digital Life" },
    { id: 22, url: "https://static.independent.co.uk/s3fs-public/thumbnails/image/2015/09/01/16/apple-getty.jpg?width=1200&height=800&crop=1200:800", alt: "Handheld Computer" },
    { id: 23, url: "https://www.kopp-report.de/wp-content/uploads/2018/05/93911277.jpg", alt: "Design Studio" },
    { id: 24, url: "https://www.cultofmac.com/wp-content/uploads/2019/06/Steve-Jobs-WWDC-2007-780x520@2x.jpg", alt: "Global Reach" },
    { id: 25, url: "https://tse2.mm.bing.net/th/id/OIP.WQ9RDZHzPdWu9X5xtVamxQHaEA?w=740&h=400&rs=1&pid=ImgDetMain&o=7&rm=3", alt: "Modern Lifestyle" },
    { id: 26, url: "https://tse1.explicit.bing.net/th/id/OIP._yKBZ0YT7zbfWkVVZVkcYQHaFN?rs=1&pid=ImgDetMain&o=7&rm=3", alt: "The Legacy" },
    { id: 27, url: "https://picsum.photos/seed/jobs-iphone-tribute/1920/1080", alt: "Steve Jobs Tribute" },
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
              className="w-full h-full object-cover opacity-50"
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
            className="text-base md:text-2xl font-light leading-relaxed max-w-2xl mx-auto opacity-70 mb-6"
          >
            In the middle of the 2000s, almost everyone had a mobile phone, but they were not very good. Most people only used them for calls and short texts. The screens were small, and you had to use tiny buttons and confusing menus. Some phones tried to browse the web or play music, but it was slow and frustrating. Technology was helpful, but it was not yet simple.
          </motion.p>
      
        </Section>

        {/* Section 2: Jobs' Belief */}
        <Section image={backgrounds[1]?.url} alt={backgrounds[1]?.alt}>
          <h2 className="text-xl md:text-6xl font-light tracking-tight mb-4 md:mb-8">A Better Way</h2>
          <p className="text-base md:text-xl font-light leading-relaxed opacity-70 mb-4 md:mb-6">
            Steve Jobs was sure that mobile phones could be much better. He saw how hard it was for people to use tiny keyboards and stylus pens. He knew there was a more elegant way. He imagined a device that didn't just add more features, but completely changed how we use technology in our daily lives.
          </p>
          <p className="text-base md:text-xl font-light leading-relaxed opacity-70">
            He believed that the most important tool we have is our own hands. By removing the physical barriers of buttons, he wanted to create a direct connection between the user and the information. It was a vision of a device that could adapt to any situation, becoming whatever the user needed it to be at that exact moment.
          </p>
        </Section>

        {/* Section 3: Leading the Change */}
        <Section image={backgrounds[2]?.url} alt={backgrounds[2]?.alt}>
          <div className="border-l-2 border-current pl-6 md:pl-8 py-2 md:py-4">
            <h2 className="text-lg md:text-5xl font-light italic serif mb-4 md:mb-6">"Taking the Lead"</h2>
            <p className="text-base md:text-xl font-light leading-relaxed opacity-70 mb-4">
              After the success of the iPod, Jobs worried that mobile phones might one day replace music players. Instead of waiting for that to happen, he decided Apple should lead the way. His goal was bold. He wanted to create one beautiful device that could do everything: make calls, play music, and browse the internet easily.
            </p>
            <p className="text-base md:text-xl font-light leading-relaxed opacity-70">
              He saw that the future was not about carrying multiple gadgets, but about having one powerful companion. This required a complete rethink of what a phone could be. It wasn't just about making calls anymore; it was about creating a window into the entire world that you could carry in your pocket.
            </p>
          </div>
        </Section>

        {/* Section 4: Secret Project */}
        <Section image={backgrounds[3]?.url} alt={backgrounds[3]?.alt}>
          <h2 className="text-xl md:text-6xl font-light tracking-tight mb-4 md:mb-8">A Secret Project</h2>
          <p className="text-base md:text-xl font-light leading-relaxed opacity-70 mb-4 md:mb-6">
            Inside Apple, the project was a big secret. Jobs pushed his team to rethink what a phone should be. He didn't want any physical buttons because he felt they limited what a device could do. He wanted a screen that people could touch directly. This would allow the phone to change and adapt to whatever the user needed at that moment.
          </p>
          <p className="text-base md:text-xl font-light leading-relaxed opacity-70">
            The team worked in a locked room, exploring ideas that seemed impossible at the time. They experimented with glass, sensors, and software that could respond to the lightest touch. It was a journey of discovery, driven by the belief that technology should be as intuitive and responsive as a human conversation.
          </p>
        </Section>

        {/* Section 5: Touch Decision */}
        <Section image={backgrounds[4]?.url} alt={backgrounds[4]?.alt}>
          <h2 className="text-xl md:text-6xl font-light tracking-tight mb-4 md:mb-8">Focus on the Screen</h2>
          <p className="text-base md:text-xl font-light leading-relaxed opacity-70 mb-4 md:mb-6">
            The decision to remove the keyboard was a big risk. It meant Apple had to invent new touch technology. Jobs knew that if the screen was the main part of the product, it had to be perfect. It had to feel like a natural part of the user's hand, moving smoothly in a way that no other device had done before.
          </p>
          <p className="text-base md:text-xl font-light leading-relaxed opacity-70">
            He insisted that the screen be made of glass, not plastic, so it would feel premium and last a long time. This choice created many engineering challenges, but he refused to settle for anything less. He wanted the device to be a jewel, something that people would love to hold and use every single day.
          </p>
        </Section>

        {/* Section 6: Development */}
        <Section image={backgrounds[5]?.url} alt={backgrounds[5]?.alt}>
          <h2 className="text-2xl md:text-6xl font-light tracking-tight mb-4 md:mb-8">Making it Feel Natural</h2>
          <p className="text-base md:text-xl font-light leading-relaxed opacity-70 mb-4 md:mb-6">
            The team worked hard to make a touch screen that was smooth and quick to respond. Jobs tested everything himself. He wanted the movement to feel natural and human. If a transition didn't feel right, he sent it back to be fixed. He cared about how the device made people feel when they used it.
          </p>
          <p className="text-base md:text-xl font-light leading-relaxed opacity-70">
            They spent months perfecting the 'rubber band' effect when scrolling to the end of a list. These small details were what made the technology feel friendly and alive. It was about creating an emotional connection, making the user feel like they were interacting with something that truly understood them.
          </p>
        </Section>

        {/* Section 7: Standards */}
        <Section>
          <div className="border-l-2 border-current pl-6 md:pl-8 py-2 md:py-4">
            <h2 className="text-xl md:text-5xl font-light italic serif mb-4 md:mb-6">"The Beauty of Simple"</h2>
            <p className="text-base md:text-xl font-light leading-relaxed opacity-70 mb-4">
              Jobs was known for his high standards. He always pushed his team to make things simpler. He believed that real innovation was about making things easier to understand, not just adding more features. If something made the phone harder to use, he removed it. He wanted a device that felt like it wasn't even there, leaving only the user and their content.
            </p>
            <p className="text-base md:text-xl font-light leading-relaxed opacity-70">
              He often said that design is not just what it looks like, but how it works. This philosophy guided every decision, from the shape of the icons to the way the phone unlocked. By focusing on the essentials, he created a product that felt honest and pure, a reflection of his lifelong pursuit of perfection.
            </p>
          </div>
        </Section>

        {/* Section 8: Readiness */}
        <Section image={backgrounds[6]?.url} alt={backgrounds[6]?.alt}>
          <h2 className="text-2xl md:text-6xl font-light tracking-tight mb-4 md:mb-8">A Big Moment</h2>
          <p className="text-base md:text-xl font-light leading-relaxed opacity-70 mb-4 md:mb-6">
            After years of secret work and many challenges, the device was finally ready. Everyone in the tech world was excited, but no one knew exactly what Apple was building. The stage was set for a moment that would change the industry forever.
          </p>
          <p className="text-base md:text-xl font-light leading-relaxed opacity-70">
            The anticipation was unlike anything the company had experienced before. Jobs knew that he had something special, a product that would define a new era. He prepared his presentation with the same care and attention to detail that he gave to the product itself, ready to share his vision with the world.
          </p>
        </Section>

        {/* Section 9: Macworld Intro */}
        <Section image={backgrounds[7]?.url} alt={backgrounds[7]?.alt}>
          <h2 className="text-2xl md:text-6xl font-light tracking-tight mb-4 md:mb-8">The Big Reveal</h2>
          <p className="text-base md:text-xl font-light leading-relaxed opacity-70 mb-4 md:mb-6">
            In January 2007, Steve Jobs walked onto the stage in his usual black turtleneck and jeans. The room was full of excitement. Jobs started slowly, building the story and making everyone wait for the big news.
          </p>
          <p className="text-base md:text-xl font-light leading-relaxed opacity-70">
            He spoke about how Apple had reinvented the computer with the Macintosh and the music industry with the iPod. He teased the audience with the idea of three revolutionary products, creating a sense of wonder and curiosity. It was a masterclass in storytelling, leading up to a reveal that no one would ever forget.
          </p>
        </Section>

        {/* Section 10: The Hook */}
        <Section image={backgrounds[8]?.url} alt={backgrounds[8]?.alt}>
          <h2 className="text-2xl md:text-6xl font-light tracking-tight mb-4 md:mb-8">Three Products in One</h2>
          <p className="text-base md:text-xl font-light leading-relaxed opacity-70 mb-4 md:mb-6">
            He announced that Apple was launching three new products that day: a touch-screen iPod, a new kind of mobile phone, and a device for the internet. He said the list over and over. Then, with a smile, he told the truth. These were not three separate devices. They were all in one single product.
          </p>
          <p className="text-base md:text-xl font-light leading-relaxed opacity-70">
            The crowd erupted in cheers as they realized the magnitude of what he was saying. It was a moment of pure clarity, where the complexity of the past was replaced by the simplicity of the future. He had taken three of the most important tools of the modern age and combined them into one elegant solution.
          </p>
        </Section>

        {/* Section 11: The Reveal */}
        <Section image={backgrounds[9]?.url} alt={backgrounds[9]?.alt}>
          <div className="border-l-2 border-current pl-6 md:pl-8 py-2 md:py-4">
            <h2 className="text-xl md:text-5xl font-light italic serif mb-4 md:mb-6">"Introducing the iPhone"</h2>
            <p className="text-base md:text-xl font-light leading-relaxed opacity-70 mb-4">
              Jobs said, "And we are calling it... iPhone." The audience was amazed. It was a beautiful device made of glass and steel. It looked like nothing else anyone had ever seen. It was the perfect example of Jobs' belief that technology should be beautiful and simple.
            </p>
            <p className="text-base md:text-xl font-light leading-relaxed opacity-70">
              He held it up for everyone to see, a small object that contained a world of possibilities. It was a triumph of design and engineering, a physical manifestation of his vision for a more connected and intuitive world. The iPhone was not just a phone; it was a promise of a better way to live.
            </p>
          </div>
        </Section>

        {/* Section 12: Touch Interaction */}
        <Section image={backgrounds[10]?.url} alt={backgrounds[10]?.alt}>
          <h2 className="text-2xl md:text-6xl font-light tracking-tight mb-4 md:mb-8">A New Way to Touch</h2>
          <p className="text-base md:text-xl font-light leading-relaxed opacity-70 mb-4 md:mb-6">
            The audience soon saw that the iPhone was different. It had a large screen and almost no buttons. You could use your fingers to tap, swipe, and pinch to control it. It felt like science fiction. Moving through a list or zooming into a photo felt smooth and fun.
          </p>
          <p className="text-base md:text-xl font-light leading-relaxed opacity-70">
            This new way of interacting with technology was called multi-touch. It allowed for a level of precision and expression that was previously impossible on a mobile device. It was a reminder that the best interfaces are the ones that feel like an extension of our own bodies, responding to our intentions with grace and ease.
          </p>
        </Section>

        {/* Section 13: Feeling Alive */}
        <Section image={backgrounds[11]?.url} alt={backgrounds[11]?.alt}>
          <h2 className="text-2xl md:text-6xl font-light tracking-tight mb-4 md:mb-8">A Natural Connection</h2>
          <p className="text-base md:text-xl font-light leading-relaxed opacity-70 mb-4 md:mb-6">
            For many people, this was their first real experience with touch in such a sophisticated way. It made the device feel alive, as if it knew what you wanted to do. This connection was the 'magic' that Jobs had always sought to create. It was the point where technology becomes a part of the person using it.
          </p>
          <p className="text-base md:text-xl font-light leading-relaxed opacity-70">
            He believed that technology should be invisible, a silent partner that enhances our lives without getting in the way. The iPhone achieved this by making the interaction feel so natural that you forgot you were using a machine. It was a return to the simplicity of the human touch, powered by the most advanced technology of its time.
          </p>
        </Section>

        {/* Section 14: Full Web */}
        <Section image={backgrounds[12]?.url} alt={backgrounds[12]?.alt}>
          <h2 className="text-2xl md:text-6xl font-light tracking-tight mb-4 md:mb-8">The Internet Everywhere</h2>
          <p className="text-base md:text-xl font-light leading-relaxed opacity-70 mb-4 md:mb-6">
            The iPhone also made the internet easy to use on a phone for the first time. Instead of simple text pages, you could see full websites just like on a computer. You could check email, search for information, and explore the web freely. It put the power of a computer in the palm of your hand.
          </p>
          <p className="text-base md:text-xl font-light leading-relaxed opacity-70">
            This was a revolutionary step, as it meant that the entire world's knowledge was now accessible from anywhere. It changed how we found our way, how we stayed informed, and how we connected with others. The internet was no longer something you went to; it was something that was always with you, a constant companion in your daily life.
          </p>
        </Section>

        {/* Section 15: App Store */}
        <Section image={backgrounds[13]?.url} alt={backgrounds[13]?.alt}>
          <h2 className="text-2xl md:text-6xl font-light tracking-tight mb-4 md:mb-8">A World of Apps</h2>
          <p className="text-base md:text-xl font-light leading-relaxed opacity-70 mb-4 md:mb-6">
            As the iPhone grew, Apple added more features. In 2008, the App Store opened, allowing people to create new tools for the phone. Almost overnight, the iPhone could do almost anything. People could download apps for travel, games, and learning, making the phone more useful every day.
          </p>
          <p className="text-base md:text-xl font-light leading-relaxed opacity-70">
            This created a whole new ecosystem of creativity and innovation. Developers from around the world could share their ideas with millions of users, turning the iPhone into a platform for endless possibilities. It was a reminder that the true power of technology lies in how people use it to solve problems and express themselves.
          </p>
        </Section>

        {/* Section 16: Immediate Impact */}
        <Section image={backgrounds[14]?.url} alt={backgrounds[14]?.alt}>
          <div className="border-l-2 border-current pl-6 md:pl-8 py-2 md:py-4">
            <h2 className="text-xl md:text-5xl font-light italic serif mb-4 md:mb-6">"A Global Change"</h2>
            <p className="text-base md:text-xl font-light leading-relaxed opacity-70 mb-4">
              The impact of the iPhone was huge. It didn't just change phones; it changed the world. It changed how we talk to each other, how we work, and how we spend our free time. The glowing screens of the iPhone became a common sight everywhere.
            </p>
            <p className="text-base md:text-xl font-light leading-relaxed opacity-70">
              It was a cultural shift that touched every corner of the globe. From busy city streets to quiet rural villages, the iPhone became a symbol of a new era of connectivity. It brought people together in ways that were previously unimaginable, creating a shared experience that transcended borders and languages.
            </p>
          </div>
        </Section>

        {/* Section 17: Communication Shift */}
        <Section image={backgrounds[15]?.url} alt={backgrounds[15]?.alt}>
          <h2 className="text-2xl md:text-6xl font-light tracking-tight mb-4 md:mb-8">A New Way to Talk</h2>
          <p className="text-base md:text-xl font-light leading-relaxed opacity-70 mb-4 md:mb-6">
            It changed how people stayed in touch. Texting became the main way to talk, and new apps let people connect across the world at any time. The phone was no longer just for talking. It was for sharing photos, moments, and thoughts instantly.
          </p>
          <p className="text-base md:text-xl font-light leading-relaxed opacity-70">
            We began to document our lives in real-time, sharing our experiences with friends and family as they happened. This created a new kind of intimacy, a sense of being present in each other's lives even when we were far apart. The iPhone turned the world into a global community, where everyone had a voice and a way to be heard.
          </p>
        </Section>

        {/* Section 18: Media Experience */}
        <Section image={backgrounds[16]?.url} alt={backgrounds[16]?.alt}>
          <h2 className="text-2xl md:text-6xl font-light tracking-tight mb-4 md:mb-8">The Center of Daily Life</h2>
          <p className="text-base md:text-xl font-light leading-relaxed opacity-70 mb-4 md:mb-6">
            It also changed how we enjoyed music, videos, and news. Everything was in one place. The iPhone became a daily companion that helped people stay organized and entertained. It was often the first thing people looked at in the morning and the last thing at night.
          </p>
          <p className="text-base md:text-xl font-light leading-relaxed opacity-70">
            It became our alarm clock, our camera, our map, and our library. It was a tool that adapted to our needs, helping us navigate the complexities of modern life with ease. By bringing everything together into one device, it simplified our lives and gave us more time to focus on the things that truly mattered.
          </p>
        </Section>

        {/* Section 19: Industry Impact */}
        <Section image={backgrounds[17]?.url} alt={backgrounds[17]?.alt}>
          <h2 className="text-2xl md:text-6xl font-light tracking-tight mb-4 md:mb-8">A Huge Shift</h2>
          <p className="text-base md:text-xl font-light leading-relaxed opacity-70 mb-4 md:mb-6">
            The success of the iPhone changed every industry. Other phone companies had to change their designs to keep up with Apple. The way software was built also changed, as millions of people started making apps for phones, creating a whole new part of the economy.
          </p>
          <p className="text-base md:text-xl font-light leading-relaxed opacity-70">
            It forced businesses to rethink how they reached their customers and how they provided their services. The mobile revolution was underway, and the iPhone was at the center of it all. It was a reminder that one great idea can change the course of history, inspiring others to think differently and push the boundaries of what is possible.
          </p>
        </Section>

        {/* Section 20: Industry Redesign */}
        <Section image={backgrounds[18]?.url} alt={backgrounds[18]?.alt}>
          <h2 className="text-2xl md:text-6xl font-light tracking-tight mb-4 md:mb-8">Changing Every Industry</h2>
          <p className="text-base md:text-xl font-light leading-relaxed opacity-70 mb-4 md:mb-6">
            Even things like cameras and maps were changed by the iPhone. The camera in your pocket became the only one you needed. Paper maps were replaced by GPS on the phone. The iPhone didn't just compete; it changed what people expected from technology.
          </p>
          <p className="text-base md:text-xl font-light leading-relaxed opacity-70">
            We no longer had to carry separate devices for every task. The iPhone was a Swiss Army knife for the digital age, a tool that was always ready to help. It made our lives more convenient and efficient, allowing us to do more with less. It was a triumph of integration, a reflection of Jobs' belief that the best products are the ones that do many things exceptionally well.
          </p>
        </Section>

        {/* Section 21: Apple's Success */}
        <Section image={backgrounds[19]?.url} alt={backgrounds[19]?.alt}>
          <div className="border-l-2 border-current pl-6 md:pl-8 py-2 md:py-4">
            <h2 className="text-xl md:text-5xl font-light italic serif mb-4 md:mb-6">"Apple's Greatest Success"</h2>
            <p className="text-base md:text-xl font-light leading-relaxed opacity-70 mb-4">
              For Apple, the iPhone became its most successful product ever. It made the company one of the most important in the world. It was the ultimate proof that Jobs' ideas about combining hardware and software could change the lives of millions.
            </p>
            <p className="text-base md:text-xl font-light leading-relaxed opacity-70">
              The company's growth was unprecedented, as it became a leader in multiple industries. This success was built on a foundation of innovation and a commitment to excellence. It was a reminder that when you focus on creating products that people love, the rest will follow. The iPhone was the crowning achievement of a career dedicated to making a dent in the universe.
            </p>
          </div>
        </Section>

        {/* Section 22: Jobs' Philosophy */}
        <Section image={backgrounds[20]?.url} alt={backgrounds[20]?.alt}>
          <h2 className="text-2xl md:text-6xl font-light tracking-tight mb-4 md:mb-8">The Goal of Simplicity</h2>
          <p className="text-base md:text-xl font-light leading-relaxed opacity-70 mb-4 md:mb-6">
            For Steve Jobs, the iPhone was the result of years of thinking about design and people. He believed that tools should feel natural and easy to use. He wasn't interested in making things complicated. He wanted to create something that anyone could understand and love.
          </p>
          <p className="text-base md:text-xl font-light leading-relaxed opacity-70">
            He knew that simplicity is the ultimate sophistication. By removing everything that was unnecessary, he revealed the true essence of the product. It was a journey of subtraction, a process of finding the core of the experience and making it shine. He wanted to create a device that felt like a gift, something that brought joy and wonder to the person using it.
          </p>
        </Section>

        {/* Section 23: Leadership */}
        <Section image={backgrounds[21]?.url} alt={backgrounds[21]?.alt}>
          <h2 className="text-2xl md:text-6xl font-light tracking-tight mb-4 md:mb-8">Leading with a Vision</h2>
          <p className="text-base md:text-xl font-light leading-relaxed opacity-70 mb-4 md:mb-6">
            His leadership during this time was very focused. He pushed his team to solve hard problems and never settle for "good enough." His goal was always to make technology that fits into people’s lives and makes things better, not harder.
          </p>
          <p className="text-base md:text-xl font-light leading-relaxed opacity-70">
            He had a unique ability to see the future and inspire others to help him build it. He was a demanding leader, but he also cared deeply about the work and the people who did it. He believed that by working together, they could create something that would change the world, and with the iPhone, they did exactly that.
          </p>
        </Section>

        {/* Section 24: Conclusion Start */}
        <Section image={backgrounds[22]?.url} alt={backgrounds[22]?.alt}>
          <h2 className="text-2xl md:text-6xl font-light tracking-tight mb-4 md:mb-8">More Than Just a Phone</h2>
          <p className="text-base md:text-xl font-light leading-relaxed opacity-70 mb-4 md:mb-6">
            Looking back from the vantage point of today, it's clear that the iPhone was far more than just a new device. It was a cultural reset, a moment when the digital and physical worlds began to merge in a way that was both permanent and profound. It set a new direction for the future of technology, one that prioritized the individual and their connection to the world around them.
          </p>
          <p className="text-base md:text-xl font-light leading-relaxed opacity-70">
            It was the beginning of a new way of being, where we are always connected and always informed. This has brought many benefits, but it has also created new challenges. It is a reminder that technology is a powerful tool, and it is up to us to use it in ways that enhance our lives and our relationships with others.
          </p>
        </Section>

        {/* Section 25: Impact Summary */}
        <Section image={backgrounds[23]?.url} alt={backgrounds[23]?.alt}>
          <h2 className="text-2xl md:text-6xl font-light tracking-tight mb-4 md:mb-8">Changing Our Lives</h2>
          <p className="text-base md:text-xl font-light leading-relaxed opacity-70 mb-4 md:mb-6">
            It fundamentally changed how we live, work, and connect. It brought together communication, information, and media into one place, making the world feel both smaller and more accessible. It empowered individuals with tools that were previously reserved for large corporations, democratizing information and creativity on a global scale.
          </p>
          <p className="text-base md:text-xl font-light leading-relaxed opacity-70">
            We are now able to do things that were once thought impossible, from starting a business from our kitchen table to connecting with someone on the other side of the planet in an instant. The iPhone was the catalyst for this change, a device that opened up a world of possibilities for everyone. It was a reminder that when we empower people with great tools, they can do amazing things.
          </p>
        </Section>

        {/* Section 26: Final Tribute */}
        <Section image={backgrounds[25]?.url} alt={backgrounds[25]?.alt} className="pb-48">
          <div ref={lastSectionRef} className="space-y-8 md:space-y-12">
            <p className="text-base md:text-2xl font-light leading-relaxed opacity-90 mb-8">
              At the center of this change was Steve Jobs. He was a leader who believed that the best ideas are the simplest ones. He knew that real innovation comes from understanding what people need.
            </p>
            <p className="text-base md:text-2xl font-light leading-relaxed opacity-90">
              He left a legacy of beauty and innovation that continues to inspire us today. His vision for a more intuitive and connected world is still being realized, as we continue to build on the foundation that he laid. He was a reminder that one person with a clear vision and a relentless focus can change the world for the better.
            </p>
            <div className="space-y-4">
              <p className="text-base md:text-xl font-mono uppercase tracking-widest opacity-60">Simplicity.</p>
              <p className="text-base md:text-xl font-mono uppercase tracking-widest opacity-60">Innovation.</p>
              <p className="text-base md:text-xl font-mono uppercase tracking-widest opacity-60">Humanity.</p>
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
