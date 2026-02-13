import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Heart, BookmarkPlus, BookmarkCheck } from 'lucide-react';
import { Movie } from '../types';

interface MovieTileProps {
  movie: Movie;
  isFavorite: boolean;
  onToggleFavorite: (id: string) => void;
  onClick: (movie: Movie) => void;
}

const MovieTile: React.FC<MovieTileProps> = ({ movie, isFavorite, onToggleFavorite, onClick }) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [imgError, setImgError] = useState(false);

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.9 }}
      whileTap={{ scale: 0.97 }}
      className="relative rounded-2xl overflow-hidden bg-[#111] border border-white/5 cursor-pointer shadow-2xl group"
      style={{ aspectRatio: '2/3' }}
      onClick={() => onClick(movie)}
    >
      {/* Image */}
      <img
        src={imgError ? 'https://via.placeholder.com/300x450/111/555?text=No+Image' : movie.thumbnail}
        alt={movie.title}
        loading="lazy"
        onLoad={() => setIsLoaded(true)}
        onError={() => setImgError(true)}
        className={`w-full h-full object-cover transition-all duration-700 group-active:scale-105 ${
          isLoaded ? 'opacity-100' : 'opacity-0'
        }`}
      />

      {/* Skeleton while loading */}
      {!isLoaded && !imgError && (
        <div className="absolute inset-0 bg-gradient-to-br from-[#1a1a1a] to-[#111] animate-pulse" />
      )}
      
      {/* Bottom gradient */}
      <div className="absolute inset-x-0 bottom-0 h-[65%] bg-gradient-to-t from-black via-black/90 to-transparent z-10" />

      {/* TOP icons — minimal glass */}
      <div className="absolute top-2 left-2 right-2 z-20 flex justify-between items-center">
        {/* Favorite Heart */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onToggleFavorite(movie.id);
          }}
          className={`w-7 h-7 rounded-full flex items-center justify-center transition-all active:scale-90 shadow-md
            ${isFavorite 
              ? 'bg-red-500/80 backdrop-blur-md border border-red-400/40' 
              : 'bg-black/30 backdrop-blur-md border border-white/10'
            }`}
        >
          <Heart
            size={13}
            className={isFavorite ? 'fill-white text-white' : 'text-white/80'}
          />
        </button>

        {/* Bookmark icon */}
        <div className="w-7 h-7 rounded-full flex items-center justify-center shadow-md bg-black/30 backdrop-blur-md border border-white/10">
          {isFavorite
            ? <BookmarkCheck size={13} className="text-gold" />
            : <BookmarkPlus size={13} className="text-white/70" />
          }
        </div>
      </div>

      {/* EXCLUSIVE Badge */}
      {(movie.isExclusive || movie.category === 'Exclusive') && !movie.isUpcoming && (
        <div className="absolute bottom-[62px] left-0 z-20">
          <div className="flex items-center gap-1 bg-gradient-to-r from-amber-500 to-yellow-400 px-2.5 py-[3px] rounded-r-full shadow-lg shadow-amber-500/30">
            <span className="text-[9px] font-black text-black tracking-[0.15em] uppercase">✦ EXCL</span>
          </div>
        </div>
      )}

      {/* UPCOMING Badge */}
      {movie.isUpcoming && (
        <div className="absolute bottom-[62px] left-0 z-20">
          <div className="flex items-center gap-1 bg-gradient-to-r from-purple-600 to-violet-500 px-2.5 py-[3px] rounded-r-full shadow-lg shadow-purple-500/30 animate-pulse">
            <span className="text-[9px] font-black text-white tracking-[0.15em] uppercase">⏰ SOON</span>
          </div>
        </div>
      )}

      {/* Bottom info */}
      <div className="absolute bottom-0 inset-x-0 p-3 z-20">
        <h3 className="text-[13px] font-bold text-white leading-tight mb-1 line-clamp-2"
          style={{ textShadow: '0 1px 4px rgba(0,0,0,0.95)', fontFamily: 'system-ui, -apple-system, sans-serif' }}>
          {movie.title}
        </h3>
        <div className="flex items-center justify-between">
          <span className="text-[10px] text-gray-400 font-medium truncate max-w-[70%]">
            {movie.category === 'Korean Drama' ? 'K-Drama' : movie.category}
          </span>
          <div className="flex items-center gap-0.5 bg-black/40 rounded-md px-1.5 py-0.5">
            <span className="text-gold text-[10px]">★</span>
            <span className="text-[10px] text-white font-bold">{movie.rating}</span>
          </div>
        </div>
      </div>

      <div className="absolute inset-0 rounded-2xl border border-transparent group-active:border-gold/20 transition-colors pointer-events-none" />
    </motion.div>
  );
};

export default MovieTile;
