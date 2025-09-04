/* global jest */

// Mock React Native modules
jest.mock('react-native-linear-gradient', () => 'LinearGradient');
jest.mock('react-native-vector-icons/MaterialIcons', () => 'Icon');
jest.mock('react-native-svg', () => 'Svg');
jest.mock('react-native-gesture-handler', () => 'GestureHandler');
jest.mock('react-native-reanimated', () => 'Reanimated');
jest.mock('react-native-safe-area-context', () => 'SafeAreaContext');
jest.mock('react-native-screens', () => 'Screens');
jest.mock('react-native-permissions', () => 'Permissions');
jest.mock('react-native-device-info', () => 'DeviceInfo');
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

// Silence console warnings and errors during tests
console.warn = jest.fn();
console.error = jest.fn();

// Set development mode to false
global.__DEV__ = false;
