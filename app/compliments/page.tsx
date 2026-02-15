'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  IoSparklesSharp,
  IoHeartSharp,
  IoStarSharp,
  IoRocketSharp,
  IoFlowerSharp,
  IoSunnySharp,
  IoMoonSharp,
  IoGiftSharp,
  IoCafeSharp,
  IoColorPaletteSharp,
  IoVolumeHighSharp,
  IoVolumeMuteSharp,
} from 'react-icons/io5';

const compliments = [
  { text: "kadang hidup emang berat, tapi kamu kuat kok. pasti bisa lewatin semua ini", color: "bg-[#FFB6D9]", icon: IoRocketSharp },
  { text: "gapapa capek, gapapa lelah. istirahat dulu, besok semangat lagi", color: "bg-[#FFF4A3]", icon: IoSunnySharp },
  { text: "kamu udah sejauh ini, jangan menyerah ya. progress kamu keren banget", color: "bg-[#D5A5FF]", icon: IoStarSharp },
  { text: "it's okay to not be okay. take your time, healing itu butuh proses", color: "bg-[#B4F4D3]", icon: IoFlowerSharp },
  { text: "kamu gasendiri kok, banyak yang support kamu termasuk aku", color: "bg-[#FFB6D9]", icon: IoHeartSharp },
  { text: "besok pasti ada hari yang lebih baik, percaya deh", color: "bg-[#FFF4A3]", icon: IoSunnySharp },
  { text: "jangan compare diri kamu sama orang lain. you're doing great at your own pace", color: "bg-[#A8D5FF]", icon: IoRocketSharp },
  { text: "self care bukan egois kok, kamu boleh prioritasin diri sendiri", color: "bg-[#FFCBA4]", icon: IoCafeSharp },
  { text: "small steps tetep steps. proud of you for trying", color: "bg-[#D5A5FF]", icon: IoSparklesSharp },
  { text: "kamu deserve semua hal baik yang ada di dunia ini", color: "bg-[#FFB6D9]", icon: IoGiftSharp },
  { text: "bad days gabuat kamu jadi bad person. kamu tetep keren", color: "bg-[#B4F4D3]", icon: IoHeartSharp },
  { text: "jangan lupa, kamu udah survive 100% dari hari terburukmu sebelumnya", color: "bg-[#FFCBA4]", icon: IoRocketSharp },
  { text: "it's okay to rest. kamu bukan robot, butuh recharge juga", color: "bg-[#A8D5FF]", icon: IoSparklesSharp },
  { text: "percaya sama diri sendiri, kamu lebih capable dari yang kamu pikir", color: "bg-[#FFF4A3]", icon: IoStarSharp },
  { text: "kamu sudah cukup. you are enough just the way you are", color: "bg-[#FFB6D9]", icon: IoHeartSharp },
  // Final card
  { text: "udah ya, sekarang TIDUR! gausah main hp lagi, mata butuh istirahat. bobo sekarang juga!", color: "bg-[#6B5B95]", icon: IoMoonSharp },
];

const bgColors = [
  "bg-[#FF9ECD]",
  "bg-[#A8E6CF]", 
  "bg-[#FFD3B6]",
  "bg-[#C9A9E0]",
  "bg-[#B5E7FF]",
];

export default function ComplimentsPage() {
  const [count, setCount] = useState(0);
  const [currentCompliment, setCurrentCompliment] = useState<typeof compliments[0] | null>(null);
  const [bgColor, setBgColor] = useState("bg-[#FF9ECD]");
  const [isFinished, setIsFinished] = useState(false);
  const [isMusicPlaying, setIsMusicPlaying] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  const startExperience = () => {
    if (audioRef.current) {
      audioRef.current.play()
        .then(() => {
          setIsMusicPlaying(true);
          setHasStarted(true);
        })
        .catch(() => {
          // If autoplay fails, still start the experience
          setHasStarted(true);
        });
    }
  };

  const toggleMusic = () => {
    if (audioRef.current) {
      if (isMusicPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsMusicPlaying(!isMusicPlaying);
    }
  };

  const generateCompliment = () => {
    const newCount = count + 1;
    setCount(newCount);
    
    // After 15 clicks, show final card
    if (newCount >= 15) {
      const finalCard = compliments[compliments.length - 1];
      setCurrentCompliment(finalCard);
      setBgColor("bg-[#6B5B95]");
      setIsFinished(true);
    } else {
      // Get sequential compliment based on count (index 0-14 for quotes 1-15)
      const currentIndex = newCount - 1;
      const currentQuote = compliments[currentIndex];
      const randomBg = bgColors[Math.floor(Math.random() * bgColors.length)];
      
      setCurrentCompliment(currentQuote);
      setBgColor(randomBg);
    }
  };

  const IconComponent = currentCompliment?.icon || IoHeartSharp;

  return (
    <div className={`relative w-screen h-screen overflow-hidden transition-colors duration-700 ${bgColor}`}>
      {/* Background Music */}
      <audio 
        ref={audioRef} 
        loop 
        onPlay={() => setIsMusicPlaying(true)}
        onPause={() => setIsMusicPlaying(false)}
      >
        <source src="/music.mp3" type="audio/mpeg" />
      </audio>

      {/* Splash Screen */}
      {!hasStarted && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="absolute inset-0 bg-gradient-to-br from-[#FF9ECD] via-[#D5A5FF] to-[#A8D5FF] flex items-center justify-center z-50"
        >
          <div className="text-center px-4">
            <motion.div
              animate={{
                scale: [1, 1.1, 1],
                rotate: [0, 5, -5, 0],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="mb-8"
            >
              <IoHeartSharp className="text-white text-9xl mx-auto drop-shadow-2xl" />
            </motion.div>
            <motion.h1
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="text-5xl md:text-7xl font-black text-white mb-6 text-shadow-cute"
            >
              Hai Esha!
            </motion.h1>
            <motion.p
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="text-xl md:text-2xl text-white font-semibold mb-12 opacity-90"
            >
              ada sesuatu buat kamu nih
            </motion.p>
            <motion.button
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.7, type: "spring", stiffness: 200 }}
              whileHover={{ scale: 1.1, rotate: [0, -5, 5, 0] }}
              whileTap={{ scale: 0.9 }}
              onClick={startExperience}
              className="bg-white text-gray-800 font-black text-2xl md:text-3xl px-16 py-8 rounded-full shadow-2xl border-4 border-white hover:shadow-3xl transition-all"
            >
              <motion.span
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 1, repeat: Infinity, ease: "easeInOut" }}
              >
                Mulai 🎁
              </motion.span>
            </motion.button>
          </div>
        </motion.div>
      )}

      {/* Music Control Button */}
      {hasStarted && (
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={toggleMusic}
          className="fixed top-6 right-6 z-50 bg-white/30 backdrop-blur-sm p-4 rounded-full border-2 border-white shadow-lg hover:bg-white/40 transition-all"
        >
          {isMusicPlaying ? (
            <IoVolumeHighSharp className="text-white text-2xl" />
          ) : (
            <IoVolumeMuteSharp className="text-white text-2xl" />
          )}
        </motion.button>
      )}

      {/* Main Content - Only show after started */}
      {hasStarted && (
        <>
          {/* Floating Hearts Background */}
          <div className="absolute inset-0 pointer-events-none">
        {[...Array(10)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute"
            initial={{
              x: Math.random() * 1920,
              y: Math.random() * 1080,
              scale: 0,
              opacity: 0,
            }}
            animate={{
              y: [null, -100],
              scale: [0.5, 1, 0.5],
              opacity: [0.2, 0.5, 0],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 3,
              ease: "easeInOut",
            }}
          >
            <IoHeartSharp className="text-white text-3xl" />
          </motion.div>
        ))}
      </div>

      {/* Main Content */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-8"
        >
          <motion.h1
            animate={{
              scale: [1, 1.05, 1],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="text-4xl md:text-6xl font-black text-white mb-4 text-shadow-cute"
          >
            buat Esha
          </motion.h1>
          <p className="text-lg md:text-xl text-white font-semibold opacity-90">
            semangat terus ya!
          </p>
        </motion.div>

        {/* Compliment Display Area */}
        <div className="relative w-full max-w-2xl h-64 md:h-80 mb-8 flex items-center justify-center">
          <AnimatePresence mode="wait">
            {currentCompliment ? (
              <motion.div
                key={count}
                initial={{ scale: 0, rotate: -90, opacity: 0 }}
                animate={{ scale: 1, rotate: 0, opacity: 1 }}
                exit={{ scale: 0, rotate: 90, opacity: 0 }}
                transition={{
                  type: "spring",
                  stiffness: 150,
                  damping: 20,
                }}
                className={`${currentCompliment.color} p-8 md:p-12 rounded-3xl shadow-2xl border-4 border-white max-w-lg mx-4`}
              >
                <motion.div
                  animate={{
                    rotate: [0, 10, -10, 0],
                  }}
                  transition={{
                    duration: 0.5,
                    repeat: Infinity,
                    repeatDelay: 1,
                  }}
                  className="flex justify-center mb-6"
                >
                  <IconComponent className="text-white text-6xl md:text-7xl drop-shadow-lg" />
                </motion.div>
                <p className="text-lg md:text-2xl font-bold text-white text-center text-shadow-cute leading-relaxed">
                  {currentCompliment.text}
                </p>
              </motion.div>
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center"
              >
                <motion.div
                  animate={{
                    y: [0, -10, 0],
                  }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                >
                  <IoSparklesSharp className="text-white text-7xl md:text-8xl mx-auto opacity-50" />
                </motion.div>
                <p className="text-white text-xl md:text-2xl font-semibold mt-4 opacity-70">
                  yuk mulai 👇
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Button */}
        {!isFinished && (
          <motion.button
            whileHover={{ scale: 1.1, rotate: [0, -5, 5, 0] }}
            whileTap={{ scale: 0.9 }}
            onClick={generateCompliment}
            className="bg-white text-gray-800 font-black text-xl md:text-2xl px-12 py-6 md:px-16 md:py-8 rounded-full shadow-2xl border-4 border-white hover:shadow-3xl transition-all duration-300"
          >
            <motion.span
              animate={{
                scale: [1, 1.1, 1],
              }}
              transition={{
                duration: 1,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              {count === 0 ? "klik dong 🎁" : "lagi! 🎉"}
            </motion.span>
          </motion.button>
        )}

        {/* Sparkles Animation */}
        {currentCompliment && !isFinished && (
          <div className="absolute inset-0 pointer-events-none">
            {[...Array(12)].map((_, i) => (
              <motion.div
                key={`sparkle-${i}`}
                className="absolute"
                initial={{
                  x: 960,
                  y: 540,
                  scale: 0,
                  opacity: 1,
                }}
                animate={{
                  x: 960 + (Math.random() - 0.5) * 400,
                  y: 540 + (Math.random() - 0.5) * 400,
                  scale: [0, 1, 0],
                  opacity: [0, 1, 0],
                }}
                transition={{
                  duration: 1,
                  delay: i * 0.02,
                  ease: "easeOut",
                }}
              >
                <IoSparklesSharp className="text-white text-2xl" />
              </motion.div>
            ))}
          </div>
        )}
      </div>
        </>
      )}
    </div>
  );
}
