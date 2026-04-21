import { Level } from '../types/learning';

export const LEVELS: Level[] = [
  {
    id: 1,
    title: 'Jungle Basics',
    description: 'Learn the fundamental sounds of the jungle',
    emoji: '🌳',
    locked: false,
    exercises: [
      {
        id: 'ex1_1',
        type: 'listen',
        question: 'Listen to this sound. What is it?',
        soundId: 'machete_swing',
        options: ['Machete Swing', 'River Flow', 'Thunder', 'Birds'],
        correctAnswer: 'Machete Swing',
        points: 10,
      },
      {
        id: 'ex1_2',
        type: 'identify',
        question: 'Which sound comes from nature?',
        soundId: 'jungle_birds',
        options: ['Machete Hit', 'Jungle Birds', 'Footsteps', 'Machete Swing'],
        correctAnswer: 'Jungle Birds',
        points: 10,
      },
      {
        id: 'ex1_3',
        type: 'listen',
        question: 'Identify this water sound',
        soundId: 'river_flow',
        options: ['Rain Forest', 'River Flow', 'Thunder', 'Leaves Rustle'],
        correctAnswer: 'River Flow',
        points: 15,
      },
    ],
  },
  {
    id: 2,
    title: 'Weapon Sounds',
    description: 'Master the sounds of the machete',
    emoji: '⚔️',
    locked: true,
    exercises: [
      {
        id: 'ex2_1',
        type: 'listen',
        question: 'What kind of hit is this?',
        soundId: 'machete_hit',
        options: ['Machete Hit', 'Thunder', 'Footsteps', 'River Flow'],
        correctAnswer: 'Machete Hit',
        points: 15,
      },
      {
        id: 'ex2_2',
        type: 'sequence',
        question: 'Order these sounds from quietest to loudest',
        options: ['Leaves Rustle', 'Machete Swing', 'Thunder'],
        correctAnswer: 'Leaves Rustle,Machete Swing,Thunder',
        points: 20,
      },
    ],
  },
  {
    id: 3,
    title: 'Storm & Rain',
    description: 'Recognize weather-related sounds',
    emoji: '⛈️',
    locked: true,
    exercises: [
      {
        id: 'ex3_1',
        type: 'listen',
        question: 'Is this light rain or a storm?',
        soundId: 'rain_forest',
        options: ['Rain Forest', 'Thunder', 'River Flow', 'Leaves Rustle'],
        correctAnswer: 'Rain Forest',
        points: 15,
      },
      {
        id: 'ex3_2',
        type: 'identify',
        question: 'What causes this loud boom?',
        soundId: 'thunder',
        options: ['Machete Hit', 'Footsteps', 'Thunder', 'River Flow'],
        correctAnswer: 'Thunder',
        points: 20,
      },
    ],
  },
];

export const getLevelById = (id: number): Level | undefined =>
  LEVELS.find(l => l.id === id);

export const getUnlockedLevels = (): Level[] =>
  LEVELS.filter(l => !l.locked);
