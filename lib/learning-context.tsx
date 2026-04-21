import React, { createContext, useContext, useReducer, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { UserProgress, LevelProgress } from '../types/learning';
import { LEVELS } from '../data/levels';

const STORAGE_KEY = '@machete_sound_progress';

const initialProgress: UserProgress = {
  currentLevel: 1,
  completedLevels: [],
  levelProgress: {},
  totalScore: 0,
  totalCorrectAnswers: 0,
};

type Action =
  | { type: 'LOAD_PROGRESS'; payload: UserProgress }
  | { type: 'COMPLETE_EXERCISE'; levelId: number; correct: boolean; points: number }
  | { type: 'COMPLETE_LEVEL'; levelId: number; progress: LevelProgress }
  | { type: 'RESET_PROGRESS' };

function progressReducer(state: UserProgress, action: Action): UserProgress {
  switch (action.type) {
    case 'LOAD_PROGRESS':
      return action.payload;
    case 'COMPLETE_EXERCISE': {
      const current = state.levelProgress[action.levelId] || {
        levelId: action.levelId,
        completed: false,
        score: 0,
        correctAnswers: 0,
        totalAnswers: 0,
        stars: 0,
      };
      return {
        ...state,
        totalScore: state.totalScore + (action.correct ? action.points : 0),
        totalCorrectAnswers: state.totalCorrectAnswers + (action.correct ? 1 : 0),
        levelProgress: {
          ...state.levelProgress,
          [action.levelId]: {
            ...current,
            score: current.score + (action.correct ? action.points : 0),
            correctAnswers: current.correctAnswers + (action.correct ? 1 : 0),
            totalAnswers: current.totalAnswers + 1,
          },
        },
      };
    }
    case 'COMPLETE_LEVEL': {
      const nextLevelId = action.levelId + 1;
      const nextLevel = LEVELS.find(l => l.id === nextLevelId);
      const updatedLevels = LEVELS.map(l =>
        l.id === nextLevelId ? { ...l, locked: false } : l
      );
      return {
        ...state,
        completedLevels: [...state.completedLevels, action.levelId],
        currentLevel: nextLevel ? nextLevelId : state.currentLevel,
        levelProgress: {
          ...state.levelProgress,
          [action.levelId]: { ...action.progress, completed: true },
        },
      };
    }
    case 'RESET_PROGRESS':
      return initialProgress;
    default:
      return state;
  }
}

interface LearningContextType {
  progress: UserProgress;
  completeExercise: (levelId: number, correct: boolean, points: number) => void;
  completeLevel: (levelId: number, levelProgress: LevelProgress) => void;
  resetProgress: () => void;
  getLevelProgress: (levelId: number) => LevelProgress | undefined;
}

const LearningContext = createContext<LearningContextType | null>(null);

export function LearningProvider({ children }: { children: React.ReactNode }) {
  const [progress, dispatch] = useReducer(progressReducer, initialProgress);

  useEffect(() => {
    loadProgress();
  }, []);

  useEffect(() => {
    saveProgress();
  }, [progress]);

  const loadProgress = async () => {
    try {
      const stored = await AsyncStorage.getItem(STORAGE_KEY);
      if (stored) {
        dispatch({ type: 'LOAD_PROGRESS', payload: JSON.parse(stored) });
      }
    } catch (e) {
      console.error('Failed to load progress', e);
    }
  };

  const saveProgress = async () => {
    try {
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
    } catch (e) {
      console.error('Failed to save progress', e);
    }
  };

  const completeExercise = (levelId: number, correct: boolean, points: number) => {
    dispatch({ type: 'COMPLETE_EXERCISE', levelId, correct, points });
  };

  const completeLevel = (levelId: number, levelProgress: LevelProgress) => {
    dispatch({ type: 'COMPLETE_LEVEL', levelId, progress: levelProgress });
  };

  const resetProgress = () => {
    dispatch({ type: 'RESET_PROGRESS' });
  };

  const getLevelProgress = (levelId: number): LevelProgress | undefined =>
    progress.levelProgress[levelId];

  return (
    <LearningContext.Provider
      value={{ progress, completeExercise, completeLevel, resetProgress, getLevelProgress }}
    >
      {children}
    </LearningContext.Provider>
  );
}

export const useLearning = () => {
  const ctx = useContext(LearningContext);
  if (!ctx) throw new Error('useLearning must be used within LearningProvider');
  return ctx;
};
