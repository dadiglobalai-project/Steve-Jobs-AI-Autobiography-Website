import React, { useRef } from 'react';
import { motion, useInView, useReducedMotion } from 'motion/react';

interface SectionProps {
  children: React.ReactNode;
  className?: string;
  image?: string;
  alt?: string;
  isHero?: boolean;
}

export const Section: React.FC<SectionProps> = ({ children, className = "", image, alt, isHero = false }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { amount: 0.3 });
  const shouldReduceMotion = useReducedMotion();

  return (
    <section
      ref={ref}
      className={`${isHero ? 'min-h-[100dvh]' : 'min-h-screen pt-28 pb-8 md:pt-36 md:pb-24'} flex flex-col items-center justify-center relative px-6 w-full ${className}`}
    >
      <motion.div
        initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 40 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: shouldReduceMotion ? 0 : 40 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className="max-w-3xl w-full z-10"
      >
        {image && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.95 }}
            className={`md:hidden mb-6 rounded-xl overflow-hidden shadow-xl aspect-video border border-white/10 ${isHero ? 'max-h-[25vh]' : 'max-h-[30vh]'}`}
          >
            <img 
              src={image} 
              alt={alt} 
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
          </motion.div>
        )}
        {children}
      </motion.div>
    </section>
  );
};
