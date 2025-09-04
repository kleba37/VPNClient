import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './contexts/ThemeContext';
import HomeScreen from './screens/HomeScreen.web';
import ServersScreen from './screens/ServersScreen.web';
import SettingsScreen from './screens/SettingsScreen.web';
import ConnectionScreen from './screens/ConnectionScreen.web';
import SplashScreen from './components/SplashScreen.web';
import './App.web.css';

const App: React.FC = () => {
  return (
    <ThemeProvider>
      <Router>
        <div className="app">
          <Routes>
            <Route path="/" element={<SplashScreen />} />
            <Route path="/home" element={<HomeScreen />} />
            <Route path="/servers" element={<ServersScreen />} />
            <Route path="/settings" element={<SettingsScreen />} />
            <Route path="/connection" element={<ConnectionScreen />} />
          </Routes>
        </div>
      </Router>
    </ThemeProvider>
  );
};

export default App;
