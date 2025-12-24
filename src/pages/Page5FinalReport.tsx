import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { GifBackground } from '@/components/GifBackground';
import { Button } from '@/components/ui/button';
import { useTimeWaster } from '@/contexts/TimeWasterContext';
import { toast } from 'sonner';
import { Clock, MousePointerClick, TrendingDown, Award, Download, RotateCcw } from 'lucide-react';

const DOWNLOAD_FAILURES = [
  "Did you really expect that to work?",
  "Download failed successfully.",
  "Report is too useless to download.",
  "Error 404: Purpose not found.",
  "This button is just for show.",
  "You've been pranked. Again.",
  "Download cancelled by the universe.",
  "File not found: your_wasted_time.pdf",
  "Server too busy laughing at you.",
  "Nice try, but no.",
  "ERROR: Irony overload detected.",
  "Download quota exceeded (you clicked too much).",
  "Access denied: You're not productive enough.",
  "Connection lost to reality.",
  "This feature is under construction... forever.",
  "Downloads are so 2010. Get with the times.",
  "Your ISP blocked this download for being too pointless.",
];

export default function Page5FinalReport() {
  const navigate = useNavigate();
  const { 
    timeSpent, 
    totalClicks, 
    formatTime, 
    getEfficiencyLevel, 
    getRandomTitle, 
    resetAll,
    incrementDownloadAttempts,
    downloadAttempts,
    setCurrentPage,
    stopTimer
  } = useTimeWaster();
  
  const [title, setTitle] = useState('');
  const [failureIndex, setFailureIndex] = useState(0);

  useEffect(() => {
    setCurrentPage(5);
    stopTimer();
    // Get title once and never change it
    const awardedTitle = getRandomTitle();
    setTitle(awardedTitle);
  }, [setCurrentPage, stopTimer, getRandomTitle]);

  const efficiencyLevel = getEfficiencyLevel();
  const minutesWasted = (timeSpent / 60).toFixed(2);
  const productivityLost = (totalClicks * 0.42 + timeSpent * 0.17).toFixed(2);

  const handleDownload = () => {
    incrementDownloadAttempts();
    const message = DOWNLOAD_FAILURES[failureIndex % DOWNLOAD_FAILURES.length];
    toast.error(message, {
      duration: 3000,
    });
    setFailureIndex(prev => prev + 1);
  };

  const handleRestart = () => {
    resetAll();
    navigate('/');
  };

  const getEfficiencyColor = () => {
    switch (efficiencyLevel) {
      case 'Low Attention': return 'text-neon-green';
      case 'Why Clicking': return 'text-neon-yellow';
      case 'Thoughts Gone': return 'text-neon-orange';
      case 'Certified Chaos': return 'text-neon-pink';
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4">
      <GifBackground 
        src="https://media.giphy.com/media/26tOZ42Mg6pbTUPHW/giphy.gif" 
        opacity={0.85} 
      />
      
      <div className="max-w-2xl w-full space-y-6 animate-fade-in-up">
        {/* Title */}
        <h1 className="text-3xl md:text-4xl font-bold text-center text-foreground text-glow-pink">
          Cognitive Resources Misuse Report
        </h1>

        <p className="text-center text-muted-foreground text-lg">
          Your journey of glorious uselessness is complete
        </p>

        {/* Stats Dashboard */}
        <div className="bg-card/90 backdrop-blur-sm rounded-2xl border-2 border-border p-6 space-y-4">
          {/* Time Spent */}
          <div className="flex items-center justify-between p-4 bg-muted/50 rounded-xl">
            <div className="flex items-center gap-3">
              <Clock className="w-8 h-8 text-neon-cyan" />
              <span className="text-lg text-foreground">Total Time Spent</span>
            </div>
            <span className="text-2xl font-bold text-neon-cyan text-glow-cyan">
              {Math.floor(timeSpent / 60)} minutes {timeSpent % 60} seconds
            </span>
          </div>

          {/* Total Clicks */}
          <div className="flex items-center justify-between p-4 bg-muted/50 rounded-xl">
            <div className="flex items-center gap-3">
              <MousePointerClick className="w-8 h-8 text-neon-pink" />
              <span className="text-lg text-foreground">Pointless Clicks</span>
            </div>
            <span className="text-2xl font-bold text-neon-pink text-glow-pink">
              {totalClicks}
            </span>
          </div>

          {/* Minutes Wasted */}
          <div className="flex items-center justify-between p-4 bg-muted/50 rounded-xl">
            <div className="flex items-center gap-3">
              <TrendingDown className="w-8 h-8 text-neon-orange" />
              <span className="text-lg text-foreground">Minutes Wasted</span>
            </div>
            <span className="text-2xl font-bold text-neon-orange">
              {minutesWasted}
            </span>
          </div>

          {/* Efficiency Level */}
          <div className="flex items-center justify-between p-4 bg-muted/50 rounded-xl">
            <span className="text-lg text-foreground">Efficiency Level</span>
            <span className={`text-2xl font-bold ${getEfficiencyColor()}`}>
              {efficiencyLevel}
            </span>
          </div>

          {/* Productivity Lost */}
          <div className="flex items-center justify-between p-4 bg-muted/50 rounded-xl">
            <span className="text-lg text-foreground">Productivity Lost</span>
            <span className="text-2xl font-bold text-neon-purple text-glow-purple">
              {productivityLost} units
            </span>
          </div>
        </div>

        {/* Award Title */}
        <div className="bg-gradient-to-r from-neon-pink/20 via-neon-purple/20 to-neon-cyan/20 backdrop-blur-sm rounded-2xl border-2 border-primary p-6 text-center">
          <div className="flex justify-center mb-4">
            <Award className="w-16 h-16 text-neon-yellow" />
          </div>
          <p className="text-muted-foreground mb-2">You have been awarded the title of:</p>
          <h2 className="text-3xl font-bold text-foreground text-glow-purple">
            {title}
          </h2>
        </div>

        {/* Download Attempts Counter */}
        {downloadAttempts > 0 && (
          <p className="text-center text-muted-foreground">
            Failed download attempts: {downloadAttempts}
          </p>
        )}

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button
            onClick={handleDownload}
            className="px-8 py-4 text-lg font-bold bg-secondary text-secondary-foreground hover:bg-secondary/80 rounded-xl flex items-center gap-2"
          >
            <Download className="w-5 h-5" />
            Download Report
          </Button>
          
          <Button
            onClick={handleRestart}
            className="px-8 py-4 text-lg font-bold bg-primary text-primary-foreground hover:bg-primary/80 rounded-xl flex items-center gap-2 animate-pulse-glow"
          >
            <RotateCcw className="w-5 h-5" />
            Start Wasting Again
          </Button>
        </div>
      </div>
    </div>
  );
}
