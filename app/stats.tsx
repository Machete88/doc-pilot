import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { useLearning } from '../lib/learning-context';
import { LEVELS } from '../data/levels';

export default function StatsScreen() {
  const { progress, resetProgress } = useLearning();

  const accuracy = progress.totalCorrectAnswers > 0
    ? Math.round(
        (progress.totalCorrectAnswers /
          Object.values(progress.levelProgress).reduce((sum, lp) => sum + lp.totalAnswers, 0)) *
          100
      )
    : 0;

  const handleReset = () => {
    Alert.alert(
      '⚠️ Reset Progress',
      'Are you sure you want to reset all your progress? This cannot be undone.',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Reset',
          style: 'destructive',
          onPress: () => resetProgress(),
        },
      ]
    );
  };

  return (
    <ScrollView className="flex-1 bg-[#16213e] p-4">
      {/* Overall Stats */}
      <View className="bg-[#0f3460] rounded-2xl p-5 mb-6">
        <Text className="text-white text-lg font-bold mb-4">🏆 Overall Performance</Text>
        <View className="flex-row justify-around">
          <View className="items-center">
            <Text className="text-yellow-400 text-3xl font-bold">{progress.totalScore}</Text>
            <Text className="text-gray-400 text-sm">Total Score</Text>
          </View>
          <View className="items-center">
            <Text className="text-green-400 text-3xl font-bold">{accuracy}%</Text>
            <Text className="text-gray-400 text-sm">Accuracy</Text>
          </View>
          <View className="items-center">
            <Text className="text-blue-400 text-3xl font-bold">
              {progress.completedLevels.length}/{LEVELS.length}
            </Text>
            <Text className="text-gray-400 text-sm">Levels</Text>
          </View>
        </View>
      </View>

      {/* Per-Level Stats */}
      <Text className="text-white text-lg font-bold mb-3">📊 Level Details</Text>
      {LEVELS.map(level => {
        const lp = progress.levelProgress[level.id];
        return (
          <View
            key={level.id}
            className={`rounded-2xl p-4 mb-3 ${
              lp?.completed ? 'bg-[#533483]' : 'bg-[#1a1a2e]'
            }`}
          >
            <View className="flex-row items-center justify-between">
              <View className="flex-row items-center">
                <Text className="text-3xl mr-3">{level.emoji}</Text>
                <View>
                  <Text className="text-white font-bold">{level.title}</Text>
                  <Text className="text-gray-400 text-sm">
                    {lp?.completed ? 'Completed' : lp ? 'In Progress' : 'Not started'}
                  </Text>
                </View>
              </View>
              {lp?.completed && (
                <View className="items-end">
                  <Text className="text-yellow-400 font-bold">{lp.score} pts</Text>
                  <Text className="text-gray-400 text-sm">
                    {lp.correctAnswers}/{lp.totalAnswers} correct
                  </Text>
                </View>
              )}
            </View>
            {lp?.completed && (
              <View className="flex-row mt-2">
                {[1, 2, 3].map(s => (
                  <Text key={s} className="text-lg">
                    {s <= lp.stars ? '⭐' : '☆'}
                  </Text>
                ))}
              </View>
            )}
          </View>
        );
      })}

      {/* Reset Button */}
      <TouchableOpacity
        onPress={handleReset}
        className="bg-red-800 rounded-2xl p-4 mt-4 mb-8"
      >
        <Text className="text-white font-bold text-center">🗑️ Reset All Progress</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}
