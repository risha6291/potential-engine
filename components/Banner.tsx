import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, Info, Star, Clock, Monitor } from 'lucide-react';
import { Movie } from '../types';

interface BannerProps {
  movie: Movie;
  onClick: (movie: Movie) => void;
  onPlay: (movie: Movie) => void;
  currentIndex?: number;
  totalBanners?: number;
  onDotClick?: (index: number) => void;
}

const Banner: React.FC<BannerProps> = ({ 
  movie, 
  onClick, 
  currentIndex = 0, 
  totalBanners = 1,
  onDotClick 
}) => {
  return (
    <div
      onClick={() => onClick(movie)}
      className="relative w-full overflow-hidden mb-6 group select-none cursor-pointer"
      style={{ aspectRatio: '2/3', maxHeight: '88vh' }}
    >
      <AnimatePresence mode="wait">
        <motion.div
          key={movie.id}
          initial={{ opacity: 0, scale: 1.04 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.98 }}
          transition={{ duration: 0.65, ease: 'easeOut' }}
          className="absolute inset-0 w-full h-full"
        >
          {/* 2:3 Portrait Background Image — uses thumbnail for crisp poster quality */}
          <div className="absolute inset-0 w-full h-full">
            <img
              src={movie.thumbnail}
              alt={movie.title}
              className="w-full h-full object-cover pointer-events-none"
              style={{ objectPosition: 'center top', imageRendering: 'auto' }}
            />
            {/* Top dark fade */}
            <div className="absolute top-0 inset-x-0 h-28 bg-gradient-to-b from-black/70 via-black/20 to-transparent z-10" />
            {/* Bottom-to-top strong gradient (portrait-optimized) */}
            <div className="absolute bottom-0 inset-x-0 h-[65%] bg-gradient-to-t from-black via-black/95 to-transparent z-10" />
            {/* Side vignettes */}
            <div className="absolute inset-y-0 left-0 w-1/5 bg-gradient-to-r from-black/50 to-transparent z-10" />
            <div className="absolute inset-y-0 right-0 w-1/6 bg-gradient-to-l from-black/30 to-transparent z-10" />
          </div>
          
          {/* Content */}
          <div className="absolute bottom-0 left-0 right-0 p-5 pb-10 z-20">
            <div className="max-w-xl">
              
              {/* Premium Badges - Enhanced */}
              <motion.div
                initial={{ y: 15, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="flex items-center gap-2 mb-3 flex-wrap"
              >
                {/* Trending Badge - Animated Glow */}
                <motion.span 
                  className="relative bg-gradient-to-r from-gold via-yellow-400 to-gold text-black text-[9px] font-black px-3 py-1.5 rounded-lg uppercase tracking-widest overflow-hidden"
                  animate={{ 
                    boxShadow: [
                      '0 0 15px rgba(255,215,0,0.5)',
                      '0 0 25px rgba(255,215,0,0.8)',
                      '0 0 15px rgba(255,215,0,0.5)'
                    ]
                  }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <span className="relative z-10 flex items-center gap-1">
                    🔥 Trending
                  </span>
                  <motion.div 
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                    animate={{ x: ['-100%', '100%'] }}
                    transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
                  />
                </motion.span>

                {/* Category Badge */}
                <span className="text-[9px] font-bold text-white/90 uppercase bg-white/10 backdrop-blur-md px-3 py-1.5 rounded-lg border border-white/20">
                  {movie.category}
                </span>

                {/* Video Quality Badge - Enhanced */}
                {movie.videoQuality && (
                  <span className="text-[9px] font-black text-blue-300 uppercase bg-gradient-to-r from-blue-600/30 to-cyan-600/30 backdrop-blur-md px-3 py-1.5 rounded-lg border border-blue-400/40 shadow-[0_0_10px_rgba(59,130,246,0.3)]">
                    ⚡ {movie.videoQuality}
                  </span>
                )}

                {/* NEW Badge (if content is recent) */}
                {movie.year && parseInt(movie.year) >= 2024 && (
                  <span className="text-[9px] font-black text-green-300 uppercase bg-gradient-to-r from-green-600/30 to-emerald-600/30 backdrop-blur-md px-3 py-1.5 rounded-lg border border-green-400/40">
                    🆕 NEW
                  </span>
                )}
              </motion.div>
              
              {/* ULTIMATE Premium Title - TOP LEVEL */}
              <motion.div className="relative mb-3">
                {/* Animated Background Glow */}
                <motion.div
                  className="absolute -inset-1 bg-gradient-to-r from-gold/20 via-yellow-500/30 to-gold/20 rounded-lg blur-xl"
                  animate={{ 
                    opacity: [0.3, 0.6, 0.3],
                    scale: [0.98, 1.02, 0.98]
                  }}
                  transition={{ duration: 3, repeat: Infinity }}
                />
                
                {/* Main Title */}
                <motion.h1
                  initial={{ y: 20, opacity: 0, scale: 0.95 }}
                  animate={{ y: 0, opacity: 1, scale: 1 }}
                  transition={{ 
                    delay: 0.3, 
                    duration: 0.7,
                    ease: [0.6, 0.01, 0.05, 0.95]
                  }}
                  className="relative text-4xl md:text-5xl font-black leading-[0.9] tracking-tight"
                  style={{
                    fontFamily: "'Bebas Neue', 'Impact', 'Arial Black', sans-serif",
                    background: 'linear-gradient(135deg, #FFD700 0%, #FFF9E6 25%, #FFD700 50%, #FFED4E 75%, #FFA500 100%)',
                    backgroundSize: '200% 200%',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                    filter: 'drop-shadow(0 3px 12px rgba(0,0,0,0.95)) drop-shadow(0 0 25px rgba(255,215,0,0.5)) drop-shadow(0 0 40px rgba(255,215,0,0.3))',
                    letterSpacing: '0.03em',
                    textTransform: 'uppercase'
                  }}
                >
                  {movie.title}
                </motion.h1>

                {/* Animated Underline */}
                <motion.div
                  initial={{ width: 0, opacity: 0 }}
                  animate={{ width: '60%', opacity: 1 }}
                  transition={{ delay: 0.8, duration: 0.8, ease: 'easeOut' }}
                  className="h-1 bg-gradient-to-r from-gold via-yellow-400 to-transparent rounded-full mt-2"
                  style={{
                    boxShadow: '0 0 15px rgba(255,215,0,0.6)'
                  }}
                />
              </motion.div>
              
              {/* Metadata Row */}
              <motion.div
                initial={{ y: 15, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="flex items-center gap-3 mb-4 text-xs font-semibold text-gray-300 flex-wrap"
              >
                {movie.rating && (
                  <div className="flex items-center gap-1">
                    <Star size={12} fill="#FFD700" className="text-gold" />
                    <span className="text-white font-bold">{movie.rating}</span>
                  </div>
                )}
                {movie.year && (
                  <>
                    <span className="w-1 h-1 bg-gray-500 rounded-full" />
                    <span>{movie.year}</span>
                  </>
                )}
                {movie.duration && (
                  <>
                    <span className="w-1 h-1 bg-gray-500 rounded-full" />
                    <div className="flex items-center gap-1">
                      <Clock size={10} className="text-gray-400" />
                      <span>{movie.duration}</span>
                    </div>
                  </>
                )}
                {movie.audioLanguage && (
                  <>
                    <span className="w-1 h-1 bg-gray-500 rounded-full" />
                    <div className="flex items-center gap-1">
                      <Monitor size={10} className="text-blue-300" />
                      <span className="text-blue-300">{movie.audioLanguage}</span>
                    </div>
                  </>
                )}
              </motion.div>
              
              {/* Description */}
              {movie.description && (
                <motion.p
                  initial={{ y: 15, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.45 }}
                  className="text-gray-300 text-xs line-clamp-2 mb-5 font-medium max-w-sm leading-relaxed opacity-85"
                >
                  {movie.description}
                </motion.p>
              )}
              
              {/* Buttons */}
              <motion.div
                initial={{ y: 15, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="flex items-center gap-3"
              >
                <button 
                  className="relative overflow-hidden bg-white text-black px-6 py-2.5 rounded-lg font-black text-xs flex items-center gap-2 hover:scale-105 transition-all shadow-[0_0_25px_rgba(255,255,255,0.3)] active:scale-95 group/btn z-30"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent -translate-x-full group-hover/btn:translate-x-full transition-transform duration-700" />
                  <Play size={15} fill="black" className="relative z-10" />
                  <span className="relative z-10">PLAY NOW</span>
                </button>
                
                <button 
                  className="relative bg-white/10 backdrop-blur-md text-white px-5 py-2.5 rounded-lg font-bold text-xs flex items-center gap-2 border border-white/20 hover:bg-white/20 transition-all active:scale-95"
                >
                  <Info size={13} />
                  <span>More Info</span>
                </button>
              </motion.div>
              
            </div>
          </div>
          
          {/* Vignette */}
          <div className="absolute inset-0 pointer-events-none shadow-[inset_0_0_80px_rgba(0,0,0,0.5)] z-[5]" />
          
          {/* Navigation Dots - Only show if multiple banners */}
          {totalBanners > 1 && (
            <div className="absolute bottom-4 left-0 right-0 z-30 flex justify-center gap-2">
              {[...Array(totalBanners)].map((_, idx) => (
                <button
                  key={idx}
                  onClick={(e) => {
                    e.stopPropagation();
                    onDotClick?.(idx);
                  }}
                  className={`transition-all duration-300 rounded-full ${
                    idx === currentIndex 
                      ? 'bg-gold w-6 h-1.5 shadow-[0_0_10px_rgba(255,215,0,0.6)]' 
                      : 'bg-white/40 w-1.5 h-1.5 hover:bg-white/60'
                  }`}
                  aria-label={`Go to banner ${idx + 1}`}
                />
              ))}
            </div>
          )}
          
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default Banner;
