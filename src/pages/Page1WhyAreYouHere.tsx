import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { VideoBackground } from '@/components/VideoBackground';
import { Button } from '@/components/ui/button';
import { useTimeWaster } from '@/contexts/TimeWasterContext';
import { AlertTriangle } from 'lucide-react';

export default function Page1WhyAreYouHere() {
  const navigate = useNavigate();
  const { startTimer, incrementClicks, setCurrentPage } = useTimeWaster();
  const [isButtonShaking, setIsButtonShaking] = useState(true);
  const [isScreenShaking, setIsScreenShaking] = useState(false);
  const [canClick, setCanClick] = useState(false);

  useEffect(() => {
    setCurrentPage(1);
    // Button shakes for 2 seconds before becoming clickable
    const shakeTimer = setTimeout(() => {
      setIsButtonShaking(false);
      setCanClick(true);
    }, 2000);

    return () => clearTimeout(shakeTimer);
  }, [setCurrentPage]);

  const handleOkClick = () => {
    if (!canClick) return;
    
    incrementClicks();
    startTimer();
    setIsScreenShaking(true);

    // Screen shakes for 3 seconds before navigating
    setTimeout(() => {
      navigate('/time-wasting');
    }, 3000);
  };

  return (
    <div className={`min-h-screen flex flex-col items-center justify-center p-4 ${isScreenShaking ? 'animate-screen-shake' : ''}`}>
      <VideoBackground 
        src="https://cdn.pixabay.com/video/2020/05/25/40130-424930925_large.mp4" 
        opacity={0.8} 
      />
      
      <div className="max-w-lg w-full animate-fade-in-up">
        {/* Warning Box */}
        <div className="bg-warning/90 border-4 border-neon-orange rounded-xl p-8 shadow-2xl backdrop-blur-sm">
          <div className="flex items-center gap-4 mb-6">
            <div className="bg-background/20 p-3 rounded-full">
              <AlertTriangle className="w-10 h-10 text-warning-foreground" />
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-warning-foreground">
              WARNING
            </h1>
          </div>
          
          <p className="text-xl md:text-2xl text-warning-foreground font-medium mb-2">
            Why Are You Here?
          </p>
          <p className="text-warning-foreground/90 text-lg">
            You are about to waste a significant portion of your precious time on absolutely nothing productive.
          </p>
        </div>

        {/* OK Button */}
        <div className="mt-8 flex justify-center">
          <Button
            onClick={handleOkClick}
            disabled={!canClick || isScreenShaking}
            className={`
              px-12 py-6 text-xl font-bold rounded-xl
              bg-primary text-primary-foreground
              hover:bg-primary/90
              transition-all duration-300
              ${isButtonShaking ? 'animate-button-shake' : ''}
              ${canClick && !isScreenShaking ? 'animate-pulse-glow' : ''}
              disabled:opacity-50 disabled:cursor-not-allowed
            `}
          >
            {isButtonShaking ? 'Wait...' : isScreenShaking ? 'Entering...' : 'OK, I Accept My Fate'}
          </Button>
        </div>

        {isButtonShaking && (
          <p className="text-center mt-4 text-foreground/70 text-sm animate-pulse">
            Button stabilizing in 2 seconds...
          </p>
        )}

        {isScreenShaking && (
          <p className="text-center mt-4 text-neon-cyan text-lg font-bold text-glow-cyan">
            Prepare yourself...
          </p>
        )}
      </div>
    </div>
  );
}
