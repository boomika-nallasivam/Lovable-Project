import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { GifBackground } from '@/components/GifBackground';
import { Button } from '@/components/ui/button';
import { useTimeWaster } from '@/contexts/TimeWasterContext';
import { Clock, MousePointerClick } from 'lucide-react';

interface CardContent {
  type: 'gif' | 'sticker';
  src: string;
  phrase: string;
}

const CARD_BACKS = [
  'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=200&h=280&fit=crop', // abstract gradient
  'https://images.unsplash.com/photo-1557672172-298e090bd0f1?w=200&h=280&fit=crop', // colorful abstract
  'https://images.unsplash.com/photo-1579546929662-711aa81148cf?w=200&h=280&fit=crop', // gradient blur
  'https://images.unsplash.com/photo-1614850523459-c2f4c699c52e?w=200&h=280&fit=crop', // neon gradient
  'https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?w=200&h=280&fit=crop', // abstract shapes
  'https://images.unsplash.com/photo-1614851099511-773084f6911d?w=200&h=280&fit=crop', // blue gradient
  'https://images.unsplash.com/photo-1618556450994-a6a128ef0d9d?w=200&h=280&fit=crop', // purple abstract
];

const CARD_CONTENTS: CardContent[] = [
  { type: 'gif', src: 'https://media.giphy.com/media/l0MYt5jPR6QX5pnqM/giphy.gif', phrase: "You picked the LOL card. Hilarious choice." },
  { type: 'gif', src: 'https://media.giphy.com/media/26tOZ42Mg6pbTUPHW/giphy.gif', phrase: "Confetti! For absolutely no reason." },
  { type: 'gif', src: 'https://media.giphy.com/media/3o7abGQa0aRJUurpII/giphy.gif', phrase: "BOOM! Nothing exploded but your expectations." },
  { type: 'gif', src: 'https://media.giphy.com/media/l4FGGafcOHmrlQxG0/giphy.gif', phrase: "Sparkles! Making nothing feel special." },
  { type: 'gif', src: 'https://media.giphy.com/media/g7GKcSzwQfugw/giphy.gif', phrase: "This card judges your life choices." },
  { type: 'gif', src: 'https://media.giphy.com/media/26ufdipQqU2lhNA4g/giphy.gif', phrase: "WOW! You're still here. Amazing." },
  { type: 'gif', src: 'https://media.giphy.com/media/l0MYGb1LuZ3n7dRnO/giphy.gif', phrase: "Party time! Party of one, that is." },
];

export default function Page4PickACard() {
  const navigate = useNavigate();
  const { timeSpent, totalClicks, incrementClicks, formatTime, setCurrentPage } = useTimeWaster();
  const [flippedCards, setFlippedCards] = useState<Set<number>>(new Set());
  const [selectedCard, setSelectedCard] = useState<number | null>(null);
  const [isFlipping, setIsFlipping] = useState(false);

  useEffect(() => {
    setCurrentPage(4);
  }, [setCurrentPage]);

  const handleCardClick = (cardIndex: number) => {
    if (isFlipping || flippedCards.has(cardIndex)) return;
    
    incrementClicks();
    setSelectedCard(cardIndex);
    setIsFlipping(true);

    // Flip all cards with staggered timing
    const newFlipped = new Set(flippedCards);
    
    for (let i = 0; i < 7; i++) {
      setTimeout(() => {
        newFlipped.add(i);
        setFlippedCards(new Set(newFlipped));
        
        if (i === 6) {
          setIsFlipping(false);
        }
      }, i * 100);
    }
  };

  const hasFlippedAny = flippedCards.size > 0;

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4">
      <GifBackground 
        src="https://media.giphy.com/media/l0MYEqEzwMWFCg8rm/giphy.gif" 
        opacity={0.85} 
      />
      
      <div className="max-w-4xl w-full space-y-6 animate-fade-in-up">
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
          Pick a Card
        </h1>

        <p className="text-center text-muted-foreground text-lg">
          {hasFlippedAny ? "All cards have been revealed!" : "Click any card to reveal all of them"}
        </p>

        {/* Cards Grid */}
        <div className="grid grid-cols-4 md:grid-cols-7 gap-3 justify-items-center">
          {CARD_CONTENTS.map((content, index) => (
            <div
              key={index}
              onClick={() => handleCardClick(index)}
              className={`
                relative w-24 h-36 md:w-28 md:h-40 cursor-pointer preserve-3d transition-transform duration-600
                ${flippedCards.has(index) ? 'rotate-y-180' : ''}
                ${selectedCard === index ? 'scale-110 card-glow z-10' : 'hover:scale-105'}
                ${!flippedCards.has(index) && !isFlipping ? 'hover:shadow-xl' : ''}
              `}
              style={{
                transitionDelay: flippedCards.has(index) ? `${index * 100}ms` : '0ms',
              }}
            >
              {/* Card Back */}
              <div className="absolute inset-0 backface-hidden rounded-xl overflow-hidden border-2 border-border shadow-lg">
                <img 
                  src={CARD_BACKS[index]} 
                  alt="Card back" 
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-background/20 flex items-center justify-center">
                  <span className="text-3xl text-foreground font-bold">?</span>
                </div>
              </div>

              {/* Card Front */}
              <div className="absolute inset-0 backface-hidden rotate-y-180 rounded-xl overflow-hidden border-2 border-primary bg-card shadow-lg flex flex-col items-center justify-center p-2">
                <img 
                  src={content.src} 
                  alt="Card content" 
                  className="w-16 h-16 md:w-20 md:h-20 object-contain rounded"
                />
                <p className="text-xs text-center mt-2 text-foreground/80 leading-tight">
                  {content.phrase.split(' ').slice(0, 4).join(' ')}...
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Selected Card Detail */}
        {selectedCard !== null && flippedCards.has(selectedCard) && (
          <div className="bg-card/90 backdrop-blur-sm p-6 rounded-xl border-2 border-primary animate-fade-in-up">
            <div className="flex flex-col md:flex-row items-center gap-4">
              <img 
                src={CARD_CONTENTS[selectedCard].src} 
                alt="Selected card" 
                className="w-24 h-24 object-contain rounded-lg"
              />
              <p className="text-xl text-center md:text-left font-medium text-foreground">
                {CARD_CONTENTS[selectedCard].phrase}
              </p>
            </div>
          </div>
        )}

        {/* Continue Button */}
        {hasFlippedAny && (
          <div className="flex justify-center animate-fade-in-up">
            <Button
              onClick={() => {
                incrementClicks();
                navigate('/final-report');
              }}
              className="px-8 py-4 text-lg font-bold bg-primary text-primary-foreground hover:bg-primary/80 rounded-xl animate-pulse-glow"
            >
              See Your Final Report
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
