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
  { text: "kadang hidup emang berat, tapi kamu kuat kok. pasti bisa lewatin semua ini", color: "bg-[#FFB6D9]", icon: IoRocketSharp, shadow: "shadow-pink-500/50" },
  { text: "it's okay to not be okay. take your time, healing itu butuh proses", color: "bg-[#A0E7E5]", icon: IoFlowerSharp, shadow: "shadow-teal-400/50" },
  { text: "kamu gasendiri kok, banyak yang support kamu termasuk aku", color: "bg-[#FFA6BF]", icon: IoHeartSharp, shadow: "shadow-pink-400/50" },
  { text: "besok pasti ada hari yang lebih baik, percaya deh", color: "bg-[#FFE799]", icon: IoSunnySharp, shadow: "shadow-yellow-400/50" },
  { text: "jangan compare diri kamu sama orang lain. you're doing great at your own pace", color: "bg-[#A8DDFF]", icon: IoRocketSharp, shadow: "shadow-blue-400/50" },
  { text: "self care bukan egois kok, kamu boleh prioritasin diri sendiri", color: "bg-[#FFC5A1]", icon: IoCafeSharp, shadow: "shadow-orange-400/50" },
  { text: "small steps tetep steps. proud of you for trying", color: "bg-[#E0CFFC]", icon: IoSparklesSharp, shadow: "shadow-purple-400/50" },
  { text: "jangan lupa, kamu udah survive 100% dari hari terburukmu sebelumnya", color: "bg-[#FFD4B2]", icon: IoRocketSharp, shadow: "shadow-orange-300/50" },
  { text: "it's okay to rest. kamu bukan robot, butuh recharge juga", color: "bg-[#C7EBFF]", icon: IoSparklesSharp, shadow: "shadow-blue-300/50" },
  { text: "kamu sudah cukup. you are enough just the way you are", color: "bg-[#FFAAC7]", icon: IoHeartSharp, shadow: "shadow-pink-400/50" },
];

// Final card - separate from compliments
const finalCard = { 
  text: "udah ya, sekarang semangat jalanin harinya! kamu pasti bisa, have a great day!", 
  color: "bg-gradient-to-br from-[#FFB6D9] to-[#D9A5FF]", 
  icon: IoSunnySharp,
  shadow: "shadow-pink-500/60"
};

const bgColors = [
  "#FFB6D9",
  "#A0E7E5", 
  "#FFC5A1",
  "#D9A5FF",
  "#A8DDFF",
  "#FFE799",
  "#FFD4E5",
  "#E0CFFC",
  "#B4F4E7",
  "#FFD4B2",
];

export default function ComplimentsPage() {
  const [count, setCount] = useState(0);
  const [currentCompliment, setCurrentCompliment] = useState<typeof compliments[0] | null>(null);
  const [bgColor, setBgColor] = useState("#FFB6D9");
  const [isFinished, setIsFinished] = useState(false);
  const [isMusicPlaying, setIsMusicPlaying] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  const startExperience = () => {
    // Show first compliment immediately
    setCurrentCompliment(compliments[0]);
    setCount(1);
    const randomBg = bgColors[Math.floor(Math.random() * bgColors.length)];
    setBgColor(randomBg);
    
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
    
    // After showing all 14 compliments, show final card
    if (newCount > compliments.length) {
      setCurrentCompliment(finalCard);
      setBgColor("linear-gradient(135deg, #FFB6D9 0%, #D9A5FF 100%)");
      setIsFinished(true);
    } else {
      // Get sequential compliment based on count (index 0-14)
      const currentIndex = newCount - 1;
      const currentQuote = compliments[currentIndex];
      const randomBg = bgColors[Math.floor(Math.random() * bgColors.length)];
      
      setCurrentCompliment(currentQuote);
      setBgColor(randomBg);
    }
  };

  const IconComponent = currentCompliment?.icon || IoHeartSharp;

  return (
    <motion.div 
      className="relative w-screen h-screen overflow-hidden"
      animate={{ background: bgColor }}
      transition={{ duration: 0.8, ease: "easeInOut" }}
    >
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
          className="absolute inset-0 bg-[#FFB6D9] flex items-center justify-center z-50"
        >
          <div className="relative z-10 text-center px-4 sm:px-6">
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
              className="mb-6 sm:mb-8 relative"
            >
              <IoHeartSharp className="text-white text-7xl sm:text-8xl md:text-9xl mx-auto drop-shadow-2xl" />
              {/* Cute sparkles around heart */}
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                className="absolute inset-0"
              >
                {[0, 60, 120, 180, 240, 300].map((angle, i) => (
                  <motion.div
                    key={i}
                    animate={{
                      scale: [1, 1.3, 1],
                      opacity: [0.5, 1, 0.5],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      delay: i * 0.3,
                    }}
                    style={{
                      position: 'absolute',
                      left: '50%',
                      top: '50%',
                      transform: `rotate(${angle}deg) translateY(-80px)`,
                    }}
                  >
                    <IoSparklesSharp className="text-white text-2xl" />
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>
            <motion.h1
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="text-4xl sm:text-5xl md:text-7xl font-black text-white mb-4 sm:mb-6 text-shadow-cute"
            >
              Hai Esha!
            </motion.h1>
            <motion.p
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="text-lg sm:text-xl md:text-2xl text-white font-semibold mb-8 sm:mb-12 opacity-90"
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
              className="bg-white text-gray-800 font-black text-xl sm:text-2xl md:text-3xl px-10 py-5 sm:px-14 sm:py-7 md:px-16 md:py-8 rounded-full shadow-2xl border-4 border-white hover:shadow-pink-500/50 transition-all"
            >
              <motion.span
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 1, repeat: Infinity, ease: "easeInOut" }}
                className="flex items-center gap-2 sm:gap-3"
              >
                <IoGiftSharp className="text-2xl sm:text-3xl" />
                <span>Mulai</span>
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
          className="fixed top-4 right-4 sm:top-6 sm:right-6 z-50 bg-white/30 backdrop-blur-sm p-3 sm:p-4 rounded-full border-2 border-white shadow-lg hover:bg-white/40 transition-all"
        >
          {isMusicPlaying ? (
            <IoVolumeHighSharp className="text-white text-xl sm:text-2xl" />
          ) : (
            <IoVolumeMuteSharp className="text-white text-xl sm:text-2xl" />
          )}
        </motion.button>
      )}

      {/* Main Content - Only show after started */}
      {hasStarted && (
        <>
          {/* Floating Hearts Background */}
          <div className="absolute inset-0 pointer-events-none">
        {[...Array(15)].map((_, i) => {
          const icons = [IoHeartSharp, IoStarSharp, IoSparklesSharp, IoSunnySharp];
          const RandomIcon = icons[Math.floor(Math.random() * icons.length)];
          
          return (
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
                rotate: [0, 360],
              }}
              transition={{
                duration: 4 + Math.random() * 2,
                repeat: Infinity,
                delay: Math.random() * 3,
                ease: "easeInOut",
              }}
            >
              <RandomIcon className="text-white text-3xl" />
            </motion.div>
          );
        })}
      </div>

      {/* Main Content */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full px-4 sm:px-6 md:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-6 sm:mb-8"
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
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-white mb-3 sm:mb-4 text-shadow-cute"
          >
            buat Esha
          </motion.h1>
          <p className="text-base sm:text-lg md:text-xl text-white font-semibold opacity-90">
            semangat terus ya!
          </p>
          
          {/* Progress Counter */}
          {count > 0 && !isFinished && (
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="mt-3 sm:mt-4"
            >
              <motion.div 
                animate={{
                  boxShadow: [
                    '0 0 20px rgba(255,255,255,0.3)',
                    '0 0 30px rgba(255,107,169,0.4)',
                    '0 0 20px rgba(255,255,255,0.3)',
                  ]
                }}
                transition={{ duration: 2, repeat: Infinity }}
                className="inline-flex items-center gap-2 bg-white/30 backdrop-blur-sm px-4 sm:px-6 py-2 sm:py-3 rounded-full border-2 border-white"
              >
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                >
                  <IoSparklesSharp className="text-white text-lg sm:text-xl" />
                </motion.div>
                <span className="text-white font-black text-base sm:text-lg">
                  {count} / {compliments.length}
                </span>
              </motion.div>
              
              {/* Progress Bar */}
              <div className="w-40 sm:w-48 h-2 bg-white/30 rounded-full mx-auto mt-2 sm:mt-3 overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${(count / compliments.length) * 100}%` }}
                  transition={{ duration: 0.5, ease: "easeOut" }}
                  className="h-full bg-white rounded-full shadow-lg"
                />
              </div>
            </motion.div>
          )}
        </motion.div>

        {/* Compliment Display Area */}
        <div className="relative w-full max-w-2xl h-56 sm:h-64 md:h-80 mb-6 sm:mb-8 flex items-center justify-center px-2">
          <AnimatePresence mode="wait">
            {currentCompliment && (
              <motion.div
                key={count}
                initial={{ scale: 0, rotate: -90, opacity: 0 }}
                animate={{ 
                  scale: 1, 
                  rotate: 0, 
                  opacity: 1,
                  ...(isFinished && {
                    scale: [1, 1.05, 1],
                  })
                }}
                exit={{ scale: 0, rotate: 90, opacity: 0 }}
                transition={{
                  type: "spring",
                  stiffness: 150,
                  damping: 20,
                  ...(isFinished && {
                    scale: {
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }
                  })
                }}
                className={`${currentCompliment.color} p-6 sm:p-8 md:p-12 rounded-3xl shadow-2xl ${currentCompliment.shadow || ''} border-4 border-white max-w-lg w-full ${isFinished ? 'border-8 shadow-3xl' : ''} relative overflow-hidden`}
              >
                {/* Animated shine effect */}
                <motion.div
                  animate={{
                    x: ['-100%', '100%'],
                    opacity: [0, 0.3, 0],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut",
                    repeatDelay: 2,
                  }}
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent"
                  style={{ width: '50%' }}
                />
                <motion.div
                  animate={{
                    rotate: isFinished ? [0, 10, -10, 10, -10, 0] : [0, 10, -10, 0],
                    scale: isFinished ? [1, 1.2, 1] : 1,
                  }}
                  transition={{
                    duration: isFinished ? 2 : 0.5,
                    repeat: Infinity,
                    repeatDelay: isFinished ? 0 : 1,
                  }}
                  className="flex justify-center mb-4 sm:mb-6 relative z-10"
                >
                  <IconComponent className={`text-white drop-shadow-2xl ${isFinished ? 'text-6xl sm:text-7xl md:text-9xl' : 'text-5xl sm:text-6xl md:text-7xl'}`} />
                  {/* Icon glow effect */}
                  <motion.div
                    animate={{
                      scale: [1, 1.2, 1],
                      opacity: [0.3, 0.6, 0.3],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                    className="absolute inset-0 flex items-center justify-center"
                  >
                    <div className="w-20 h-20 sm:w-24 sm:h-24 md:w-32 md:h-32 bg-white rounded-full blur-2xl" />
                  </motion.div>
                </motion.div>
                <p className={`font-bold text-white text-center text-shadow-cute leading-relaxed relative z-10 ${isFinished ? 'text-xl sm:text-2xl md:text-3xl' : 'text-base sm:text-lg md:text-2xl'}`}>
                  {currentCompliment.text}
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
            animate={{
              boxShadow: [
                '0 20px 60px rgba(255,255,255,0.3)',
                '0 20px 60px rgba(255,182,217,0.4)',
                '0 20px 60px rgba(255,255,255,0.3)',
              ]
            }}
            transition={{ duration: 3, repeat: Infinity }}
            className="bg-white text-gray-800 font-black text-base sm:text-xl md:text-2xl px-8 py-4 sm:px-10 sm:py-5 md:px-12 md:py-6 rounded-full border-4 border-white hover:shadow-3xl transition-all duration-300 relative"
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
              className="relative z-10"
            >
              {count === compliments.length ? "klik untuk pesan terakhir" : "lagi"}
            </motion.span>
          </motion.button>
        )}

        {/* Completion Celebration */}
        {isFinished && (
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.5, type: "spring", stiffness: 200 }}
            className="text-center mt-6 sm:mt-8"
          >
            <motion.div
              animate={{
                scale: [1, 1.2, 1],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="flex justify-center mb-3 sm:mb-4 relative"
            >
              <IoHeartSharp className="text-white text-5xl sm:text-6xl drop-shadow-2xl" />
              {/* Multiple hearts floating */}
              {[...Array(8)].map((_, i) => (
                <motion.div
                  key={i}
                  animate={{
                    y: [0, -30, 0],
                    x: [0, (i % 2 === 0 ? 20 : -20), 0],
                    opacity: [0, 1, 0],
                    scale: [0.5, 1, 0.5],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    delay: i * 0.3,
                  }}
                  className="absolute"
                  style={{
                    left: '50%',
                    top: '50%',
                    marginLeft: '-12px',
                    marginTop: '-12px',
                  }}
                >
                  <IoHeartSharp className="text-pink-200 text-2xl" />
                </motion.div>
              ))}
            </motion.div>
            <motion.p 
              animate={{
                textShadow: [
                  '0 0 20px rgba(255,255,255,0.5)',
                  '0 0 30px rgba(255,107,169,0.6)',
                  '0 0 20px rgba(255,255,255,0.5)',
                ]
              }}
              transition={{ duration: 2, repeat: Infinity }}
              className="text-white text-xl sm:text-2xl font-bold px-4"
            >
              :P hehe!
            </motion.p>
          </motion.div>
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

        {/* Confetti Animation for Final Card */}
        {isFinished && (
          <div className="absolute inset-0 pointer-events-none">
            {[...Array(50)].map((_, i) => {
              const iconComponents = [IoStarSharp, IoHeartSharp, IoSparklesSharp, IoSunnySharp, IoGiftSharp, IoFlowerSharp];
              const RandomIconComponent = iconComponents[Math.floor(Math.random() * iconComponents.length)];
              const randomX = Math.random() * 100;
              const randomDelay = Math.random() * 2;
              const randomDuration = 3 + Math.random() * 2;
              const colors = ['text-pink-200', 'text-yellow-200', 'text-purple-200', 'text-blue-200', 'text-green-200'];
              const randomColor = colors[Math.floor(Math.random() * colors.length)];
              
              return (
                <motion.div
                  key={`confetti-${i}`}
                  className="absolute"
                  initial={{
                    x: `${randomX}vw`,
                    y: '-10vh',
                    rotate: 0,
                    opacity: 1,
                  }}
                  animate={{
                    y: '110vh',
                    rotate: 360,
                    opacity: [1, 1, 0],
                  }}
                  transition={{
                    duration: randomDuration,
                    delay: randomDelay,
                    repeat: Infinity,
                    ease: "easeIn",
                  }}
                >
                  <RandomIconComponent className={`${randomColor} text-3xl`} />
                </motion.div>
              );
            })}
          </div>
        )}
      </div>
        </>
      )}
    </motion.div>
  );
}
