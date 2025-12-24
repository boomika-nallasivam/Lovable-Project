import { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { GifBackground } from '@/components/GifBackground';
import { Button } from '@/components/ui/button';
import { useTimeWaster } from '@/contexts/TimeWasterContext';
import { Clock, MousePointerClick } from 'lucide-react';

const TIME_GIFS = [
  'https://media.giphy.com/media/3o7TKTDn976rzVgky4/giphy.gif', // melting clock
  'https://media.giphy.com/media/l0HlBO7eyXzSZkJri/giphy.gif', // hourglass
  'https://media.giphy.com/media/3o7bu3XilJ5BOiSGic/giphy.gif', // spinning clock
  'https://media.giphy.com/media/xTiTnxpQ3ghPiB2Hp6/giphy.gif', // loading
  'https://media.giphy.com/media/tXL4FHPSnVJ0A/giphy.gif', // waiting
  'https://media.giphy.com/media/l3nWhI38IWDofyDrW/giphy.gif', // timer
];

const SARCASTIC_MESSAGES = [
  "Wow, you clicked. Revolutionary.",
  "Time is literally slipping away. Nice choice.",
  "Your productivity level just dropped. Congrats.",
  "That click accomplished absolutely nothing.",
  "Still here? Impressive dedication to nothing.",
  "Each click is a tiny victory... for procrastination.",
  "You could be doing anything else right now.",
  "Loading... just kidding, there's nothing to load.",
  "That was the most pointless click of your life. So far.",
  "Your future self is judging you. Hard.",
];

const BOX_COLORS = [
  'bg-neon-pink/80',
  'bg-neon-cyan/80',
  'bg-neon-purple/80',
  'bg-neon-orange/80',
  'bg-neon-green/80',
];

export default function Page2TimeWasting() {
  const navigate = useNavigate();
  const { timeSpent, totalClicks, incrementClicks, formatTime, setCurrentPage } = useTimeWaster();
  const [currentGifIndex, setCurrentGifIndex] = useState(0);
  const [pageClicks, setPageClicks] = useState(0);
  const [message, setMessage] = useState('');
  const [messageColorIndex, setMessageColorIndex] = useState(0);
  const [fakeProgress, setFakeProgress] = useState(0);

  useEffect(() => {
    setCurrentPage(2);
  }, [setCurrentPage]);

  useEffect(() => {
    // Fake progress that never reaches 100%
    const interval = setInterval(() => {
      setFakeProgress(prev => {
        if (prev >= 99) return 99;
        const increment = Math.random() * 3;
        return Math.min(prev + increment, 99);
      });
    }, 500);
    return () => clearInterval(interval);
  }, []);

  const handleWaitClick = useCallback(() => {
    incrementClicks();
    setPageClicks(prev => prev + 1);
    
    // Change background GIF
    setCurrentGifIndex(prev => (prev + 1) % TIME_GIFS.length);
    
    // Show random sarcastic message
    const randomMessage = SARCASTIC_MESSAGES[Math.floor(Math.random() * SARCASTIC_MESSAGES.length)];
    setMessage(randomMessage);
    
    // Change message box color
    setMessageColorIndex(prev => (prev + 1) % BOX_COLORS.length);
  }, [incrementClicks]);

  const canContinue = pageClicks >= 3;

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4">
      <GifBackground src={TIME_GIFS[currentGifIndex]} opacity={0.85} />
      
      <div className="max-w-2xl w-full space-y-6 animate-fade-in-up">
        {/* Stats Bar */}
        <div className="flex justify-center gap-8 text-foreground">
          <div className="flex items-center gap-2 bg-card/80 backdrop-blur-sm px-4 py-2 rounded-lg border border-border">
            <Clock className="w-5 h-5 text-neon-cyan" />
            <span className="text-xl font-mono text-glow-cyan">{formatTime(timeSpent)}</span>
          </div>
          <div className="flex items-center gap-2 bg-card/80 backdrop-blur-sm px-4 py-2 rounded-lg border border-border">
            <MousePointerClick className="w-5 h-5 text-neon-pink" />
            <span className="text-xl font-mono text-glow-pink">{totalClicks}</span>
          </div>
        </div>

        {/* Title */}
        <h1 className="text-4xl md:text-5xl font-bold text-center text-foreground text-glow-purple">
          Time Wasting
        </h1>

        {/* Fake Progress Bar */}
        <div className="bg-muted rounded-full h-6 overflow-hidden border border-border">
          <div 
            className="h-full bg-gradient-to-r from-neon-pink via-neon-purple to-neon-cyan transition-all duration-500"
            style={{ width: `${fakeProgress}%` }}
          />
        </div>
        <p className="text-center text-muted-foreground text-sm">
          Loading something important... {fakeProgress.toFixed(0)}%
        </p>

        {/* Sarcastic Message Box */}
        {message && (
          <div className={`${BOX_COLORS[messageColorIndex]} backdrop-blur-sm p-6 rounded-xl border-2 border-foreground/20 transition-all duration-300`}>
            <p className="text-xl text-center font-medium text-foreground">
              {message}
            </p>
          </div>
        )}

        {/* Wait Button */}
        <div className="flex justify-center">
          <Button
            onClick={handleWaitClick}
            className="px-10 py-6 text-xl font-bold bg-secondary text-secondary-foreground hover:bg-secondary/80 rounded-xl transition-all duration-300 hover:scale-105"
          >
            Wait
          </Button>
        </div>

        {/* Click Counter for this page */}
        <p className="text-center text-muted-foreground">
          Clicks on this page: {pageClicks} / 3
        </p>

        {/* Continue Button */}
        {canContinue && (
          <div className="flex justify-center animate-fade-in-up">
            <Button
              onClick={() => {
                incrementClicks();
                navigate('/pointless-actions');
              }}
              className="px-8 py-4 text-lg font-bold bg-primary text-primary-foreground hover:bg-primary/80 rounded-xl animate-pulse-glow"
            >
              Continue to More Pointlessness
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
