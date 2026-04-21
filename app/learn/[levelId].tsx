import React, { useState, useRef } from 'react';
import { View, Text, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Audio } from 'expo-av';
import { getLevelById } from '../../data/levels';
import { getSoundById } from '../../data/sounds';
import { useLearning } from '../../lib/learning-context';
import { Exercise, LevelProgress } from '../../types/learning';

export default function LevelScreen() {
  const { levelId } = useLocalSearchParams<{ levelId: string }>();
  const router = useRouter();
  const { completeExercise, completeLevel, getLevelProgress } = useLearning();

  const level = getLevelById(Number(levelId));
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);
  const [correctCount, setCorrectCount] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const soundRef = useRef<Audio.Sound | null>(null);

  if (!level) {
    return (
      <View className="flex-1 bg-[#16213e] items-center justify-center">
        <Text className="text-white text-xl">Level not found</Text>
      </View>
    );
  }

  const exercise = level.exercises[currentIndex];
  const isLast = currentIndex === level.exercises.length - 1;

  const playExerciseSound = async () => {
    if (!exercise.soundId) return;
    const sound = getSoundById(exercise.soundId);
    if (!sound) return;

    try {
      if (soundRef.current) {
        await soundRef.current.stopAsync();
        await soundRef.current.unloadAsync();
      }
      setIsPlaying(true);
      const { sound: audioSound } = await Audio.Sound.createAsync(
        { uri: `https://www.soundjay.com/misc/${sound.audioFile}` },
        { shouldPlay: true }
      );
      soundRef.current = audioSound;
      audioSound.setOnPlaybackStatusUpdate((status) => {
        if (status.isLoaded && status.didJustFinish) setIsPlaying(false);
      });
    } catch {
      setIsPlaying(false);
    }
  };

  const handleAnswer = (answer: string) => {
    if (showResult) return;
    setSelectedAnswer(answer);
    setShowResult(true);

    const correct = answer === exercise.correctAnswer;
    if (correct) {
      setScore(s => s + exercise.points);
      setCorrectCount(c => c + 1);
    }
    completeExercise(level.id, correct, exercise.points);
  };

  const handleNext = () => {
    setSelectedAnswer(null);
    setShowResult(false);

    if (isLast) {
      const totalAnswers = level.exercises.length;
      const pct = (correctCount + (selectedAnswer === exercise.correctAnswer ? 1 : 0)) / totalAnswers;
      const stars = pct >= 0.9 ? 3 : pct >= 0.7 ? 2 : 1;

      const finalProgress: LevelProgress = {
        levelId: level.id,
        completed: true,
        score,
        correctAnswers: correctCount,
        totalAnswers,
        stars,
        lastPlayed: new Date(),
      };

      completeLevel(level.id, finalProgress);
      Alert.alert(
        '🎉 Level Complete!',
        `Score: ${score} pts\n${correctCount}/${totalAnswers} correct\n${'\u2b50'.repeat(stars)}`,
        [{ text: 'Back to Levels', onPress: () => router.back() }]
      );
    } else {
      setCurrentIndex(i => i + 1);
    }
  };

  const getAnswerStyle = (option: string) => {
    if (!showResult) return 'bg-[#0f3460]';
    if (option === exercise.correctAnswer) return 'bg-green-700';
    if (option === selectedAnswer) return 'bg-red-700';
    return 'bg-[#0f3460] opacity-50';
  };

  return (
    <View className="flex-1 bg-[#16213e] p-4">
      {/* Progress */}
      <View className="flex-row justify-between mb-4">
        <Text className="text-gray-400">
          {currentIndex + 1} / {level.exercises.length}
        </Text>
        <Text className="text-yellow-400 font-bold">🎯 {score} pts</Text>
      </View>

      {/* Progress Bar */}
      <View className="h-2 bg-[#0f3460] rounded-full mb-6">
        <View
          className="h-2 bg-[#e94560] rounded-full"
          style={{ width: `${((currentIndex + 1) / level.exercises.length) * 100}%` }}
        />
      </View>

      {/* Question */}
      <View className="bg-[#0f3460] rounded-2xl p-5 mb-6">
        <Text className="text-white text-lg font-bold mb-4">{exercise.question}</Text>

        {exercise.soundId && (
          <TouchableOpacity
            onPress={playExerciseSound}
            className={`flex-row items-center justify-center rounded-xl p-4 ${
              isPlaying ? 'bg-[#e94560]' : 'bg-[#533483]'
            }`}
          >
            <Text className="text-white font-bold text-lg">
              {isPlaying ? '⏹️ Playing...' : '🔊 Play Sound'}
            </Text>
          </TouchableOpacity>
        )}
      </View>

      {/* Options */}
      <ScrollView>
        {exercise.options?.map((option) => (
          <TouchableOpacity
            key={option}
            onPress={() => handleAnswer(option)}
            className={`rounded-xl p-4 mb-3 ${getAnswerStyle(option)}`}
          >
            <Text className="text-white font-semibold text-center">{option}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Result & Next */}
      {showResult && (
        <View className="mt-4">
          <Text className={`text-center text-lg font-bold mb-3 ${
            selectedAnswer === exercise.correctAnswer ? 'text-green-400' : 'text-red-400'
          }`}>
            {selectedAnswer === exercise.correctAnswer
              ? '✅ Correct! +' + exercise.points + ' pts'
              : '❌ Wrong! Correct: ' + exercise.correctAnswer}
          </Text>
          <TouchableOpacity
            onPress={handleNext}
            className="bg-[#e94560] rounded-xl p-4"
          >
            <Text className="text-white font-bold text-center">
              {isLast ? '🎉 Finish Level' : 'Next →'}
            </Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}
