import React from 'react';
import { View, Text, TouchableOpacity, ScrollView, ImageBackground } from 'react-native';
import { Link } from 'expo-router';
import { useLearning } from '../lib/learning-context';
import { LEVELS } from '../data/levels';

export default function HomeScreen() {
  const { progress } = useLearning();

  const menuItems = [
    {
      title: '🔊 Sound Library',
      description: 'Play and explore all machete sounds',
      href: '/sounds' as const,
      color: '#0f3460',
    },
    {
      title: '🎓 Learn',
      description: 'Practice identifying sounds',
      href: '/learn' as const,
      color: '#533483',
    },
    {
      title: '🏆 Stats',
      description: 'View your progress and scores',
      href: '/stats' as const,
      color: '#e94560',
    },
  ];

  return (
    <ScrollView className="flex-1 bg-[#16213e]">
      <View className="p-6">
        {/* Header */}
        <View className="items-center mb-8 mt-4">
          <Text className="text-6xl mb-2">⚔️</Text>
          <Text className="text-white text-3xl font-bold text-center">
            Machete Sound App
          </Text>
          <Text className="text-gray-400 text-base text-center mt-2">
            Master the sounds of the jungle
          </Text>
        </View>

        {/* Stats Bar */}
        <View className="flex-row justify-around bg-[#0f3460] rounded-2xl p-4 mb-8">
          <View className="items-center">
            <Text className="text-white text-2xl font-bold">{progress.totalScore}</Text>
            <Text className="text-gray-400 text-xs">Total Score</Text>
          </View>
          <View className="items-center">
            <Text className="text-white text-2xl font-bold">{progress.completedLevels.length}</Text>
            <Text className="text-gray-400 text-xs">Levels Done</Text>
          </View>
          <View className="items-center">
            <Text className="text-white text-2xl font-bold">{LEVELS.length}</Text>
            <Text className="text-gray-400 text-xs">Total Levels</Text>
          </View>
        </View>

        {/* Menu Items */}
        {menuItems.map((item) => (
          <Link key={item.title} href={item.href} asChild>
            <TouchableOpacity
              className="rounded-2xl p-6 mb-4"
              style={{ backgroundColor: item.color }}
            >
              <Text className="text-white text-xl font-bold mb-1">{item.title}</Text>
              <Text className="text-gray-300 text-sm">{item.description}</Text>
            </TouchableOpacity>
          </Link>
        ))}

        {/* Current Level */}
        <View className="bg-[#1a1a2e] rounded-2xl p-4 mt-2">
          <Text className="text-white text-base font-semibold mb-1">🎯 Current Level</Text>
          <Text className="text-yellow-400 text-lg font-bold">
            Level {progress.currentLevel}: {LEVELS.find(l => l.id === progress.currentLevel)?.title || 'Unknown'}
          </Text>
        </View>
      </View>
    </ScrollView>
  );
}
