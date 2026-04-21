import { ExpoConfig } from "expo/config";

const config: ExpoConfig = {
  name: "Немецкий легко",
  slug: "deutsch-lernen-app",
  version: "1.0.0",
  orientation: "portrait",
  scheme: "deutschlernen",
  userInterfaceStyle: "dark",
  splash: {
    backgroundColor: "#0f0f23",
  },
  ios: {
    supportsTablet: true,
    bundleIdentifier: "com.machete88.deutschlernen",
  },
  android: {
    adaptiveIcon: {
      backgroundColor: "#0f0f23",
    },
    package: "com.machete88.deutschlernen",
  },
  web: {
    bundler: "metro",
    output: "single",
  },
  plugins: [
    "expo-router",
    "expo-speech-recognition",
    [
      "expo-build-properties",
      {
        android: { compileSdkVersion: 35, minSdkVersion: 26 },
        ios: { deploymentTarget: "15.1" },
      },
    ],
  ],
  experiments: {
    typedRoutes: true,
  },
};

export default config;
