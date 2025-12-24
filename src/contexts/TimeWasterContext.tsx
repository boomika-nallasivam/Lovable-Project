import React, { createContext, useContext, useState, useEffect, useCallback, ReactNode } from 'react';

interface TimeWasterState {
  timeSpent: number; // in seconds
  totalClicks: number;
  currentPage: number;
  awardedTitle: string | null;
  downloadAttempts: number;
  isTimerRunning: boolean;
}

interface TimeWasterContextType extends TimeWasterState {
  incrementClicks: () => void;
  setCurrentPage: (page: number) => void;
  startTimer: () => void;
  stopTimer: () => void;
  resetAll: () => void;
  getEfficiencyLevel: () => 'Low Attention' | 'Why Clicking' | 'Thoughts Gone' | 'Certified Chaos';
  getRandomTitle: () => string;
  incrementDownloadAttempts: () => void;
  formatTime: (seconds: number) => string;
}

const TimeWasterContext = createContext<TimeWasterContextType | undefined>(undefined);

const LOW_TITLES = ["Casual Browser", "Accidental Visitor", "Time Nibbler"];
const MEDIUM_TITLES = ["Dedicated Procrastinator", "Time Tourist", "Click Enthusiast"];
const HIGH_TITLES = ["Professional Time Waster", "Master of Nothing", "Productivity Avoider"];
const EXPERT_TITLES = ["Certified Time Waster", "Supreme Procrastinator", "Grand Master of Uselessness"];

export function TimeWasterProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<TimeWasterState>({
    timeSpent: 0,
    totalClicks: 0,
    currentPage: 1,
    awardedTitle: null,
    downloadAttempts: 0,
    isTimerRunning: false,
  });

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    if (state.isTimerRunning) {
      interval = setInterval(() => {
        setState(prev => ({ ...prev, timeSpent: prev.timeSpent + 1 }));
      }, 1000);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [state.isTimerRunning]);

  const incrementClicks = useCallback(() => {
    setState(prev => ({ ...prev, totalClicks: prev.totalClicks + 1 }));
  }, []);

  const setCurrentPage = useCallback((page: number) => {
    setState(prev => ({ ...prev, currentPage: page }));
  }, []);

  const startTimer = useCallback(() => {
    setState(prev => ({ ...prev, isTimerRunning: true }));
  }, []);

  const stopTimer = useCallback(() => {
    setState(prev => ({ ...prev, isTimerRunning: false }));
  }, []);

  const resetAll = useCallback(() => {
    setState({
      timeSpent: 0,
      totalClicks: 0,
      currentPage: 1,
      awardedTitle: null,
      downloadAttempts: 0,
      isTimerRunning: false,
    });
  }, []);

  const getEfficiencyLevel = useCallback((): 'Low Attention' | 'Why Clicking' | 'Thoughts Gone' | 'Certified Chaos' => {
    const score = state.totalClicks + Math.floor(state.timeSpent / 10);
    if (score < 15) return 'Low Attention';
    if (score < 30) return 'Why Clicking';
    if (score < 50) return 'Thoughts Gone';
    return 'Certified Chaos';
  }, [state.totalClicks, state.timeSpent]);

  const getRandomTitle = useCallback((): string => {
    if (state.awardedTitle) return state.awardedTitle;
    
    const level = getEfficiencyLevel();
    let titles: string[];
    
    switch (level) {
      case 'Low Attention': titles = LOW_TITLES; break;
      case 'Why Clicking': titles = MEDIUM_TITLES; break;
      case 'Thoughts Gone': titles = HIGH_TITLES; break;
      case 'Certified Chaos': titles = EXPERT_TITLES; break;
    }
    
    const title = titles[Math.floor(Math.random() * titles.length)];
    setState(prev => ({ ...prev, awardedTitle: title }));
    return title;
  }, [state.awardedTitle, getEfficiencyLevel]);

  const incrementDownloadAttempts = useCallback(() => {
    setState(prev => ({ ...prev, downloadAttempts: prev.downloadAttempts + 1 }));
  }, []);

  const formatTime = useCallback((seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  }, []);

  return (
    <TimeWasterContext.Provider value={{
      ...state,
      incrementClicks,
      setCurrentPage,
      startTimer,
      stopTimer,
      resetAll,
      getEfficiencyLevel,
      getRandomTitle,
      incrementDownloadAttempts,
      formatTime,
    }}>
      {children}
    </TimeWasterContext.Provider>
  );
}

export function useTimeWaster() {
  const context = useContext(TimeWasterContext);
  if (context === undefined) {
    throw new Error('useTimeWaster must be used within a TimeWasterProvider');
  }
  return context;
}
