module.exports = {
  extends: [
    'react-app',
    'react-app/jest'
  ],
  rules: {
    // Disable React Native specific rules for web
    'react-native/no-inline-styles': 'off',
    'react-native/no-color-literals': 'off',
    'react-native/no-unused-styles': 'off',
    'react-native/split-platform-components': 'off',
    'react-native/no-raw-text': 'off',
    'react-native/no-single-element-style-arrays': 'off',
    
    // Allow trailing spaces for web
    'no-trailing-spaces': 'off',
    
    // Allow missing trailing commas
    'comma-dangle': 'off',
    
    // Allow self-closing components
    'react/self-closing-comp': 'off',
    
    // Allow unused variables with underscore prefix
    '@typescript-eslint/no-unused-vars': ['error', { 'argsIgnorePattern': '^_' }],
    
    // Allow curly braces
    'curly': 'off',
    
    // Allow eol-last
    'eol-last': 'off'
  }
};