import React from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { Link } from 'expo-router';
import { LEVELS } from '../data/levels';
import { useLearning } from '../lib/learning-context';

export default function LearnScreen() {
  const { progress, getLevelProgress } = useLearning();

  const getStars = (levelId: number) => {
    const lp = getLevelProgress(levelId);
    if (!lp || !lp.completed) return 0;
    const pct = lp.correctAnswers / lp.totalAnswers;
    if (pct >= 0.9) return 3;
    if (pct >= 0.7) return 2;
    return 1;
  };

  return (
    <ScrollView className="flex-1 bg-[#16213e] p-4">
      <Text className="text-white text-xl font-bold mb-4">🎓 Choose a Level</Text>

      {LEVELS.map((level) => {
        const isCompleted = progress.completedLevels.includes(level.id);
        const isLocked = level.locked && !progress.completedLevels.includes(level.id - 1) && level.id !== 1;
        const stars = getStars(level.id);
        const lp = getLevelProgress(level.id);

        return (
          <Link
            key={level.id}
            href={isLocked ? ('#' as any) : (`/learn/${level.id}` as any)}
            asChild
          >
            <TouchableOpacity
              disabled={isLocked}
              className={`rounded-2xl p-5 mb-4 ${
                isLocked
                  ? 'bg-[#1a1a2e] opacity-50'
                  : isCompleted
                  ? 'bg-[#533483]'
                  : 'bg-[#0f3460]'
              }`}
            >
              <View className="flex-row items-center justify-between">
                <View className="flex-row items-center flex-1">
                  <Text className="text-4xl mr-3">{isLocked ? '🔒' : level.emoji}</Text>
                  <View className="flex-1">
                    <Text className="text-white font-bold text-base">
                      Level {level.id}: {level.title}
                    </Text>
                    <Text className="text-gray-400 text-sm mt-1">{level.description}</Text>
                    <Text className="text-gray-500 text-xs mt-1">
                      {level.exercises.length} exercises
                    </Text>
                  </View>
                </View>

                <View className="items-end">
                  {isCompleted && (
                    <View className="flex-row">
                      {[1, 2, 3].map(s => (
                        <Text key={s} className="text-lg">
                          {s <= stars ? '⭐' : '☆'}
                        </Text>
                      ))}
                    </View>
                  )}
                  {lp && !isCompleted && (
                    <Text className="text-yellow-400 text-sm">
                      {lp.correctAnswers}/{lp.totalAnswers}
                    </Text>
                  )}
                  {!isLocked && !isCompleted && !lp && (
                    <Text className="text-green-400 text-sm">▶ Start</Text>
                  )}
                </View>
              </View>

              {lp && lp.score > 0 && (
                <View className="mt-2 bg-black bg-opacity-20 rounded-lg p-2">
                  <Text className="text-yellow-400 text-sm">🎯 Score: {lp.score} pts</Text>
                </View>
              )}
            </TouchableOpacity>
          </Link>
        );
      })}
    </ScrollView>
  );
}
