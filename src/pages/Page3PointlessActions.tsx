import { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { GifBackground } from '@/components/GifBackground';
import { ScreenEffects, EffectType } from '@/components/ScreenEffects';
import { Button } from '@/components/ui/button';
import { useTimeWaster } from '@/contexts/TimeWasterContext';
import { Clock, MousePointerClick } from 'lucide-react';

const SARCASTIC_FEEDBACK = [
  "That accomplished literally nothing. Well done.",
  "Congratulations! You did... something?",
  "The universe remains unchanged by your actions.",
  "If pointlessness was an Olympic sport, you'd medal.",
  "Your click has been filed under 'Unnecessary'.",
  "Error 418: I'm a teapot. Also, that was useless.",
  "Achievement Unlocked: Master of the Void",
  "Processing... Processing... Nope, still nothing.",
  "You're really committed to this, aren't you?",
  "Your dedication to futility is admirable.",
];

const FEEDBACK_COLORS = [
  'bg-neon-pink/80',
  'bg-neon-cyan/80',
  'bg-neon-purple/80',
  'bg-neon-orange/80',
  'bg-neon-green/80',
  'bg-neon-yellow/80',
];

export default function Page3PointlessActions() {
  const navigate = useNavigate();
  const { timeSpent, totalClicks, incrementClicks, formatTime, setCurrentPage } = useTimeWaster();
  const [actionCount, setActionCount] = useState(0);
  const [feedback, setFeedback] = useState('');
  const [feedbackColorIndex, setFeedbackColorIndex] = useState(0);
  const [currentEffect, setCurrentEffect] = useState<EffectType>(null);

  useEffect(() => {
    setCurrentPage(3);
  }, [setCurrentPage]);

  const triggerFeedback = useCallback(() => {
    const randomFeedback = SARCASTIC_FEEDBACK[Math.floor(Math.random() * SARCASTIC_FEEDBACK.length)];
    setFeedback(randomFeedback);
    setFeedbackColorIndex(prev => (prev + 1) % FEEDBACK_COLORS.length);
  }, []);

  const handleDoSomething = useCallback(() => {
    incrementClicks();
    setActionCount(prev => prev + 1);
    
    // Random dramatic effect
    const effects: EffectType[] = ['explosion', 'crack', 'split'];
    const randomEffect = effects[Math.floor(Math.random() * effects.length)];
    setCurrentEffect(randomEffect);
    
    triggerFeedback();
  }, [incrementClicks, triggerFeedback]);

  const handleClickAgain = useCallback(() => {
    incrementClicks();
    setActionCount(prev => prev + 1);
    
    // Tilt or invert effect
    const effects: EffectType[] = ['tilt', 'invert'];
    const randomEffect = effects[Math.floor(Math.random() * effects.length)];
    setCurrentEffect(randomEffect);
    
    triggerFeedback();
  }, [incrementClicks, triggerFeedback]);

  const handleThisWontHelp = useCallback(() => {
    incrementClicks();
    setActionCount(prev => prev + 1);
    
    // Glitch effect
    setCurrentEffect('glitch');
    
    triggerFeedback();
  }, [incrementClicks, triggerFeedback]);

  const handleEffectComplete = useCallback(() => {
    setCurrentEffect(null);
  }, []);

  const canContinue = actionCount >= 4;

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4">
      <GifBackground 
        src="https://media.giphy.com/media/l41lFw057lAJQMwg0/giphy.gif" 
        opacity={0.85} 
      />
      
      <ScreenEffects effect={currentEffect} onComplete={handleEffectComplete} />
      
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
        <h1 className="text-4xl md:text-5xl font-bold text-center text-foreground text-glow-cyan">
          Pointless Actions
        </h1>

        <p className="text-center text-muted-foreground text-lg">
          Choose your meaningless adventure
        </p>

        {/* Action Buttons */}
        <div className="flex flex-wrap justify-center gap-4">
          <Button
            onClick={handleClickAgain}
            disabled={!!currentEffect}
            className="px-8 py-6 text-lg font-bold bg-neon-cyan text-background hover:bg-neon-cyan/80 rounded-xl transition-all duration-300 hover:scale-105"
          >
            Click Again
          </Button>
          
          <Button
            onClick={handleDoSomething}
            disabled={!!currentEffect}
            className="px-8 py-6 text-lg font-bold bg-neon-pink text-background hover:bg-neon-pink/80 rounded-xl transition-all duration-300 hover:scale-105"
          >
            Do Something
          </Button>
          
          <Button
            onClick={handleThisWontHelp}
            disabled={!!currentEffect}
            className="px-8 py-6 text-lg font-bold bg-neon-purple text-background hover:bg-neon-purple/80 rounded-xl transition-all duration-300 hover:scale-105"
          >
            This Won't Help
          </Button>
        </div>

        {/* Feedback Box */}
        {feedback && (
          <div className={`${FEEDBACK_COLORS[feedbackColorIndex]} backdrop-blur-sm p-6 rounded-xl border-2 border-foreground/20 transition-all duration-300 animate-fade-in-up`}>
            <p className="text-xl text-center font-medium text-foreground">
              {feedback}
            </p>
          </div>
        )}

        {/* Action Counter */}
        <p className="text-center text-muted-foreground">
          Pointless actions performed: {actionCount} / 4
        </p>

        {/* Continue Button */}
        {canContinue && (
          <div className="flex justify-center animate-fade-in-up">
            <Button
              onClick={() => {
                incrementClicks();
                navigate('/pick-a-card');
              }}
              className="px-8 py-4 text-lg font-bold bg-primary text-primary-foreground hover:bg-primary/80 rounded-xl animate-pulse-glow"
            >
              Continue to Card Selection
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
