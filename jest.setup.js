// Mock React Native modules
jest.mock('react-native-reanimated', () => {
  const Reanimated = require('react-native-reanimated/mock');
  Reanimated.default.call = () => {};
  return Reanimated;
});

jest.mock('react-native-linear-gradient', () => 'LinearGradient');
jest.mock('react-native-svg', () => 'Svg');
jest.mock('react-native-vector-icons', () => 'Icon');

// Mock navigation
jest.mock('@react-navigation/native', () => ({
  useNavigation: () => ({
    navigate: jest.fn(),
    goBack: jest.fn(),
  }),
  useRoute: () => ({
    params: {},
  }),
}));

// Mock other modules
jest.mock('react-native-permissions', () => ({}));
jest.mock('react-native-device-info', () => ({}));
jest.mock('react-native-network-info', () => ({}));
jest.mock('react-native-config', () => ({}));
jest.mock('react-native-keychain', () => ({}));
jest.mock('react-native-mmkv', () => ({
  MMKV: jest.fn(() => ({
    set: jest.fn(),
    getString: jest.fn(),
    getBoolean: jest.fn(),
    delete: jest.fn(),
    clearAll: jest.fn(),
  })),
}));
jest.mock('react-native-splash-screen', () => ({}));

// Silence specific warnings
jest.spyOn(console, 'warn').mockImplementation(() => {});
jest.spyOn(console, 'error').mockImplementation(() => {});

// Global test setup
global.__DEV__ = false;
