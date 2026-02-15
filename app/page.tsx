'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  IoMoonSharp, 
  IoFastFoodSharp, 
  IoWaterSharp, 
  IoSparklesSharp,
  IoCloudSharp,
  IoStarSharp,
  IoRocketSharp,
  IoCafeSharp
} from 'react-icons/io5';

const pages = [
  {
    id: 0,
    title: "Selamat Malam",
    subtitle: "Esha! 🌙",
    message: "Halo kamu yang baik hati~",
    icon: IoMoonSharp,
    bgColor: "bg-[#6B5B95]",
    buttonColor: "bg-cute-purple",
    buttonText: "Hehe, iya nih! 👉",
    decorIcons: ['⭐', '🌙', '✨', '💫', '🌟'],
  },
  {
    id: 1,
    title: "Jangan Lupa",
    subtitle: "Makan ya! 🍜",
    message: "Perut kenyang, hati senang, hidup tenang!",
    icon: IoFastFoodSharp,
    bgColor: "bg-[#FF6B9D]",
    buttonColor: "bg-cute-pink",
    buttonText: "Siap! 🍱",
    decorIcons: ['🍕', '🍔', '🍜', '🍰', '🥗'],
  },
  {
    id: 2,
    title: "Jangan Lupa",
    subtitle: "Mandi juga! 🛁",
    message: "Biar fresh, bersih, dan wangi sepanjang hari~",
    icon: IoWaterSharp,
    bgColor: "bg-[#4ECDC4]",
    buttonColor: "bg-cute-mint",
    buttonText: "Okee! 🚿",
    decorIcons: ['🛁', '🚿', '💧', '🧼', '🫧'],
  },
  {
    id: 3,
    title: "Jangan Lupa",
    subtitle: "Skincare-an! ✨",
    message: "Rawat kulitmu biar makin glowing kayak bulan!",
    icon: IoSparklesSharp,
    bgColor: "bg-[#FFE66D]",
    buttonColor: "bg-cute-yellow",
    buttonText: "Pasti! 🧴",
    decorIcons: ['✨', '💅', '🌸', '🧴', '💄'],
  },
  {
    id: 4,
    title: "Udah gtu aja",
    subtitle: "Selamat Bobo! 😴",
    message: "Mimpi indah ya Esha, sampai ketemu lagi besok~ 💕",
    icon: IoCloudSharp,
    bgColor: "bg-[#C06C84]",
    buttonColor: "bg-cute-peach",
    buttonText: "🥰",
    decorIcons: ['💤', '🌙', '💕', '🛌', '⭐'],
  },
];

export default function Home() {
  const [currentPage, setCurrentPage] = useState(0);
  const [direction, setDirection] = useState(1);

  const currentPageData = pages[currentPage];
  const IconComponent = currentPageData.icon;

  const nextPage = () => {
    if (currentPage < pages.length - 1) {
      setDirection(1);
      setCurrentPage(currentPage + 1);
    }
  };

  const variants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
      scale: 0.8,
      rotate: direction > 0 ? 10 : -10,
    }),
    center: {
      x: 0,
      opacity: 1,
      scale: 1,
      rotate: 0,
    },
    exit: (direction: number) => ({
      x: direction < 0 ? 1000 : -1000,
      opacity: 0,
      scale: 0.8,
      rotate: direction < 0 ? 10 : -10,
    }),
  };

  return (
    <div className="relative w-screen h-screen overflow-hidden">
      <AnimatePresence mode="wait" custom={direction}>
        <motion.div
          key={currentPage}
          custom={direction}
          variants={variants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{
            x: { type: 'spring', stiffness: 300, damping: 30 },
            opacity: { duration: 0.3 },
            scale: { duration: 0.3 },
            rotate: { duration: 0.3 },
          }}
          className={`absolute inset-0 ${currentPageData.bgColor} flex items-center justify-center`}
        >
          {/* Main Content Container */}
          <div className="relative z-10 flex flex-col items-center justify-center px-8 max-w-2xl">
            {/* Animated Icon */}
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{
                type: 'spring',
                stiffness: 260,
                damping: 20,
                delay: 0.2,
              }}
            >
              <motion.div
                animate={{
                  y: [0, -15, 0],
                  rotate: [0, 5, -5, 0],
                }}
                transition={{
                  duration: 2.5,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
                className="mb-8"
              >
                <IconComponent className="text-white text-6xl md:text-9xl drop-shadow-2xl" />
              </motion.div>
            </motion.div>

            {/* Title */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-3xl md:text-7xl font-black text-white text-center mb-3 text-shadow-cute"
            >
              {currentPageData.title}
            </motion.h1>

            {/* Subtitle */}
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-2xl md:text-6xl font-bold text-white text-center mb-4 text-shadow-cute"
            >
              {currentPageData.subtitle}
            </motion.h2>

            {/* Message */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="text-base md:text-2xl text-white text-center mb-8 font-semibold text-shadow-cute max-w-lg px-4"
            >
              {currentPageData.message}
            </motion.p>

            {/* Button */}
            {currentPage < pages.length - 1 && (
              <motion.button
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{
                  type: 'spring',
                  stiffness: 300,
                  damping: 20,
                  delay: 0.6,
                }}
                whileHover={{
                  scale: 1.1,
                  rotate: [0, -5, 5, -5, 0],
                  transition: { duration: 0.3 },
                }}
                whileTap={{ scale: 0.9 }}
                onClick={nextPage}
                className={`${currentPageData.buttonColor} text-gray-800 font-black text-lg md:text-2xl px-8 py-4 md:px-12 md:py-6 rounded-full shadow-2xl hover:shadow-3xl transition-all duration-300 border-4 border-white`}
              >
                <motion.span
                  animate={{
                    scale: [1, 1.05, 1],
                  }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    ease: 'easeInOut',
                  }}
                >
                  {currentPageData.buttonText}
                </motion.span>
              </motion.button>
            )}

            {/* Final Page Cloud Animation */}
            {currentPage === pages.length - 1 && (
              <motion.div
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.7 }}
                className="flex gap-4 items-center"
              >
                {[...Array(5)].map((_, i) => (
                  <motion.div
                    key={i}
                    animate={{
                      y: [0, -20, 0],
                      scale: [1, 1.2, 1],
                    }}
                    transition={{
                      duration: 1.5,
                      repeat: Infinity,
                      delay: i * 0.2,
                      ease: 'easeInOut',
                    }}
                  >
                    <IoCloudSharp className="text-white text-4xl md:text-5xl drop-shadow-lg" />
                  </motion.div>
                ))}
              </motion.div>
            )}
          </div>

          {/* Cute Floating Stars */}
          <div className="absolute inset-0 pointer-events-none">
            {[...Array(15)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute"
                initial={{
                  x: Math.random() * 1920,
                  y: Math.random() * 1080,
                  scale: 0,
                }}
                animate={{
                  scale: [0, 1, 0],
                  rotate: [0, 180, 360],
                }}
                transition={{
                  duration: 2 + Math.random() * 2,
                  repeat: Infinity,
                  delay: Math.random() * 2,
                }}
              >
                <IoStarSharp className="text-white opacity-30 text-2xl" />
              </motion.div>
            ))}
          </div>

          {/* Progress Indicator */}
          <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex gap-3">
            {pages.map((page, index) => (
              <motion.div
                key={page.id}
                initial={{ scale: 0 }}
                animate={{
                  scale: currentPage === index ? 1.3 : 1,
                  opacity: currentPage === index ? 1 : 0.5,
                }}
                transition={{ duration: 0.3 }}
                className={`w-3 h-3 rounded-full bg-white shadow-lg ${
                  currentPage === index ? 'ring-4 ring-white/50' : ''
                }`}
              />
            ))}
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
