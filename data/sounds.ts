import { Sound, SoundCategory } from '../types/learning';

export const SOUNDS: Sound[] = [
  {
    id: 'machete_swing',
    name: 'Machete Swing',
    emoji: '⚔️',
    audioFile: 'machete_swing.mp3',
    category: 'weapons',
    description: 'The whoosh of a swinging machete',
  },
  {
    id: 'machete_hit',
    name: 'Machete Hit',
    emoji: '💥',
    audioFile: 'machete_hit.mp3',
    category: 'weapons',
    description: 'Impact sound of a machete',
  },
  {
    id: 'jungle_birds',
    name: 'Jungle Birds',
    emoji: '🦜',
    audioFile: 'jungle_birds.mp3',
    category: 'nature',
    description: 'Tropical birds in the jungle',
  },
  {
    id: 'river_flow',
    name: 'River Flow',
    emoji: '🌊',
    audioFile: 'river_flow.mp3',
    category: 'nature',
    description: 'Flowing river water',
  },
  {
    id: 'leaves_rustle',
    name: 'Leaves Rustle',
    emoji: '🍃',
    audioFile: 'leaves_rustle.mp3',
    category: 'nature',
    description: 'Rustling leaves in the wind',
  },
  {
    id: 'footsteps_grass',
    name: 'Footsteps on Grass',
    emoji: '👣',
    audioFile: 'footsteps_grass.mp3',
    category: 'movement',
    description: 'Walking through grass',
  },
  {
    id: 'rain_forest',
    name: 'Rain Forest',
    emoji: '🌧️',
    audioFile: 'rain_forest.mp3',
    category: 'nature',
    description: 'Rain falling in a forest',
  },
  {
    id: 'thunder',
    name: 'Thunder',
    emoji: '⛈️',
    audioFile: 'thunder.mp3',
    category: 'nature',
    description: 'Loud thunderclap',
  },
];

export const SOUND_CATEGORIES: SoundCategory[] = [
  {
    id: 'weapons',
    name: 'Weapons',
    emoji: '⚔️',
    sounds: SOUNDS.filter(s => s.category === 'weapons'),
  },
  {
    id: 'nature',
    name: 'Nature',
    emoji: '🌿',
    sounds: SOUNDS.filter(s => s.category === 'nature'),
  },
  {
    id: 'movement',
    name: 'Movement',
    emoji: '👣',
    sounds: SOUNDS.filter(s => s.category === 'movement'),
  },
];

export const getSoundById = (id: string): Sound | undefined =>
  SOUNDS.find(s => s.id === id);
