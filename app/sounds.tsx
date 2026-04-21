import React, { useState, useRef } from 'react';
import { View, Text, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { Audio } from 'expo-av';
import { SOUND_CATEGORIES, SOUNDS } from '../data/sounds';
import { Sound } from '../types/learning';

export default function SoundsScreen() {
  const [playingId, setPlayingId] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const soundRef = useRef<Audio.Sound | null>(null);

  const filteredSounds = selectedCategory === 'all'
    ? SOUNDS
    : SOUNDS.filter(s => s.category === selectedCategory);

  const playSound = async (sound: Sound) => {
    try {
      if (soundRef.current) {
        await soundRef.current.stopAsync();
        await soundRef.current.unloadAsync();
        soundRef.current = null;
      }

      if (playingId === sound.id) {
        setPlayingId(null);
        return;
      }

      setPlayingId(sound.id);

      const { sound: audioSound } = await Audio.Sound.createAsync(
        { uri: `https://www.soundjay.com/misc/${sound.audioFile}` },
        { shouldPlay: true }
      );

      soundRef.current = audioSound;

      audioSound.setOnPlaybackStatusUpdate((status) => {
        if (status.isLoaded && status.didJustFinish) {
          setPlayingId(null);
        }
      });
    } catch (error) {
      setPlayingId(null);
      Alert.alert('🔇 Sound Unavailable', `Could not play "${sound.name}". Audio file not found.`);
    }
  };

  return (
    <View className="flex-1 bg-[#16213e]">
      {/* Category Filter */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        className="max-h-16 py-2 px-4"
      >
        <TouchableOpacity
          onPress={() => setSelectedCategory('all')}
          className={`px-4 py-2 rounded-full mr-2 ${
            selectedCategory === 'all' ? 'bg-[#e94560]' : 'bg-[#0f3460]'
          }`}
        >
          <Text className="text-white font-semibold">🌟 All</Text>
        </TouchableOpacity>
        {SOUND_CATEGORIES.map(cat => (
          <TouchableOpacity
            key={cat.id}
            onPress={() => setSelectedCategory(cat.id)}
            className={`px-4 py-2 rounded-full mr-2 ${
              selectedCategory === cat.id ? 'bg-[#e94560]' : 'bg-[#0f3460]'
            }`}
          >
            <Text className="text-white font-semibold">{cat.emoji} {cat.name}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Sounds Grid */}
      <ScrollView className="flex-1 px-4">
        <View className="flex-row flex-wrap">
          {filteredSounds.map(sound => (
            <TouchableOpacity
              key={sound.id}
              onPress={() => playSound(sound)}
              className={`w-[47%] m-[1.5%] rounded-2xl p-4 items-center ${
                playingId === sound.id ? 'bg-[#e94560]' : 'bg-[#0f3460]'
              }`}
            >
              <Text className="text-4xl mb-2">{sound.emoji}</Text>
              <Text className="text-white font-bold text-center text-sm">{sound.name}</Text>
              <Text className="text-gray-400 text-xs text-center mt-1">{sound.description}</Text>
              <View className="mt-2">
                <Text className="text-white text-xl">
                  {playingId === sound.id ? '⏹️' : '▶️'}
                </Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </View>
  );
}
