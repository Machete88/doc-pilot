export interface Sound {
  id: string;
  name: string;
  emoji: string;
  audioFile: string;
  category: string;
  description?: string;
}

export interface SoundCategory {
  id: string;
  name: string;
  emoji: string;
  sounds: Sound[];
}

export interface Exercise {
  id: string;
  type: 'listen' | 'identify' | 'sequence' | 'match';
  question: string;
  soundId?: string;
  options?: string[];
  correctAnswer: string;
  points: number;
}

export interface Level {
  id: number;
  title: string;
  description: string;
  emoji: string;
  exercises: Exercise[];
  locked: boolean;
}

export interface LevelProgress {
  levelId: number;
  completed: boolean;
  score: number;
  correctAnswers: number;
  totalAnswers: number;
  stars: number;
  lastPlayed?: Date;
}

export interface UserProgress {
  currentLevel: number;
  completedLevels: number[];
  levelProgress: Record<number, LevelProgress>;
  totalScore: number;
  totalCorrectAnswers: number;
}

export interface AppStats {
  totalSoundsPlayed: number;
  favoriteSounds: string[];
  streakDays: number;
  lastPlayedDate?: string;
}
