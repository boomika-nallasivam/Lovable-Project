import { useState, useEffect } from 'react';

type EffectType = 'explosion' | 'crack' | 'split' | 'glitch' | 'invert' | 'tilt' | null;

interface ScreenEffectsProps {
  effect: EffectType;
  onComplete: () => void;
}

export function ScreenEffects({ effect, onComplete }: ScreenEffectsProps) {
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    if (effect) {
      setIsActive(true);
      const duration = effect === 'split' ? 1000 : effect === 'explosion' ? 800 : 600;
      const timer = setTimeout(() => {
        setIsActive(false);
        onComplete();
      }, duration);
      return () => clearTimeout(timer);
    }
  }, [effect, onComplete]);

  if (!effect || !isActive) return null;

  if (effect === 'explosion') {
    return (
      <div className="fixed inset-0 z-50 pointer-events-none flex items-center justify-center">
        <div className="animate-explosion w-full h-full bg-gradient-radial from-neon-orange via-neon-pink to-transparent" />
        <img 
          src="https://media.giphy.com/media/oe33xf3B50fsc/giphy.gif" 
          alt="" 
          className="absolute w-96 h-96 object-contain animate-explosion"
        />
      </div>
    );
  }

  if (effect === 'crack') {
    return (
      <div className="fixed inset-0 z-50 pointer-events-none">
        <svg className="w-full h-full animate-crack" viewBox="0 0 100 100" preserveAspectRatio="none">
          <defs>
            <linearGradient id="crackGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="hsl(180 100% 50%)" />
              <stop offset="100%" stopColor="hsl(330 100% 60%)" />
            </linearGradient>
          </defs>
          <path 
            d="M50 0 L48 20 L52 25 L47 40 L55 45 L45 60 L53 65 L48 80 L50 100 M48 20 L30 35 M52 25 L70 30 M47 40 L25 50 M55 45 L75 55 M45 60 L20 70 M53 65 L80 75" 
            stroke="url(#crackGradient)" 
            strokeWidth="0.5" 
            fill="none"
          />
        </svg>
      </div>
    );
  }

  if (effect === 'split') {
    return (
      <div className="fixed inset-0 z-50 pointer-events-none overflow-hidden">
        <div className="absolute inset-0 w-1/2 bg-gradient-to-r from-neon-cyan/30 to-transparent animate-split-left" />
        <div className="absolute inset-0 left-1/2 w-1/2 bg-gradient-to-l from-neon-pink/30 to-transparent animate-split-right" />
        <div className="absolute left-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-neon-cyan via-neon-purple to-neon-pink animate-pulse" />
      </div>
    );
  }

  if (effect === 'glitch') {
    return (
      <div className="fixed inset-0 z-50 pointer-events-none animate-glitch bg-gradient-to-br from-neon-pink/20 via-transparent to-neon-cyan/20" />
    );
  }

  if (effect === 'invert') {
    return (
      <div className="fixed inset-0 z-50 pointer-events-none animate-color-invert bg-foreground mix-blend-difference" />
    );
  }

  if (effect === 'tilt') {
    return (
      <div className="fixed inset-0 z-50 pointer-events-none animate-tilt border-8 border-neon-purple" />
    );
  }

  return null;
}

export type { EffectType };
