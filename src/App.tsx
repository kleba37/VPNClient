import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {StatusBar, LogBox} from 'react-native';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {GestureHandlerRootView} from 'react-native-gesture-handler';

// Screens
import HomeScreen from './screens/HomeScreen';
import ServersScreen from './screens/ServersScreen';
import SettingsScreen from './screens/SettingsScreen';
import ConnectionScreen from './screens/ConnectionScreen';

// Components
import SplashScreen from './components/SplashScreen';

// Services
// import VpnService from './services/VpnService';
import {ThemeProvider} from './contexts/ThemeContext';

const Stack = createStackNavigator();

// Ignore specific warnings for development
LogBox.ignoreLogs(['Require cycle:']);

const App: React.FC = () => {
  return (
    <GestureHandlerRootView style={{flex: 1}}>
      <SafeAreaProvider>
        <ThemeProvider>
          <NavigationContainer>
            <StatusBar
              barStyle="light-content"
              backgroundColor="#1a1a2e"
              translucent={true}
            />
            <Stack.Navigator
              initialRouteName="Splash"
              screenOptions={{
                headerShown: false,
                cardStyle: {backgroundColor: '#1a1a2e'},
              }}>
              <Stack.Screen name="Splash" component={SplashScreen} />
              <Stack.Screen name="Home" component={HomeScreen} />
              <Stack.Screen name="Servers" component={ServersScreen} />
              <Stack.Screen name="Settings" component={SettingsScreen} />
              <Stack.Screen name="Connection" component={ConnectionScreen} />
            </Stack.Navigator>
          </NavigationContainer>
        </ThemeProvider>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
};

export default App;
