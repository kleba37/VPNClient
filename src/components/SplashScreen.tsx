import React, {useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  StatusBar,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {useNavigation} from '@react-navigation/native';
import {useTheme} from '../contexts/ThemeContext';

const {width, height} = Dimensions.get('window');

const SplashScreen: React.FC = () => {
  const navigation = useNavigation();
  const {theme} = useTheme();

  useEffect(() => {
    // Navigate to home after 3 seconds
    const timer = setTimeout(() => {
      (navigation as any).navigate('Home');
    }, 3000);

    return () => clearTimeout(timer);
  }, [navigation]);

  return (
    <LinearGradient
      colors={[theme.colors.primary, theme.colors.secondary]}
      style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="transparent" />
      
      <View
        style={[
          styles.logoContainer,
          {
            opacity: 1,
            transform: [{scale: 1}],
          },
        ]}>
        <View style={styles.logo}>
          <Text style={styles.logoText}>VPN</Text>
          <Text style={styles.logoSubtext}>Hysteria2</Text>
        </View>
      </View>

      <View
        style={[
          styles.subtitleContainer,
          {
            opacity: 1,
            transform: [
              {
                translateY: 0,
              },
            ],
          },
        ]}>
        <Text style={styles.subtitle}>Fast • Secure • Reliable</Text>
        <Text style={styles.description}>
          Next-generation VPN protocol for ultimate performance
        </Text>
      </View>

      <View style={styles.footer}>
        <Text style={styles.footerText}>Powered by Hysteria2</Text>
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 60,
  },
  logo: {
    alignItems: 'center',
  },
  logoText: {
    fontSize: 48,
    fontWeight: 'bold',
    color: 'white',
    letterSpacing: 2,
  },
  logoSubtext: {
    fontSize: 18,
    color: 'rgba(255, 255, 255, 0.8)',
    marginTop: 8,
    letterSpacing: 1,
  },
  subtitleContainer: {
    alignItems: 'center',
    marginBottom: 80,
  },
  subtitle: {
    fontSize: 20,
    color: 'white',
    fontWeight: '600',
    marginBottom: 12,
    letterSpacing: 0.5,
  },
  description: {
    fontSize: 16,
    color: 'rgba(255, 255, 255, 0.7)',
    textAlign: 'center',
    lineHeight: 24,
  },
  footer: {
    position: 'absolute',
    bottom: 60,
    alignItems: 'center',
  },
  footerText: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.6)',
  },
});

export default SplashScreen;
