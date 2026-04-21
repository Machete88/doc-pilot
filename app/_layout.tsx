import '../global.css';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { LearningProvider } from '../lib/learning-context';

export default function RootLayout() {
  return (
    <LearningProvider>
      <StatusBar style="light" />
      <Stack
        screenOptions={{
          headerStyle: { backgroundColor: '#1a1a2e' },
          headerTintColor: '#ffffff',
          headerTitleStyle: { fontWeight: 'bold' },
          contentStyle: { backgroundColor: '#16213e' },
        }}
      >
        <Stack.Screen name="index" options={{ title: '⚔️ Machete Sounds', headerShown: true }} />
        <Stack.Screen name="sounds" options={{ title: '🔊 Sound Library' }} />
        <Stack.Screen name="learn" options={{ title: '🎓 Learn' }} />
        <Stack.Screen name="learn/[levelId]" options={{ title: 'Level' }} />
        <Stack.Screen name="stats" options={{ title: '🏆 Stats' }} />
      </Stack>
    </LearningProvider>
  );
}
