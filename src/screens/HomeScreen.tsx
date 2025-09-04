import React, {useState, useEffect, useRef} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Animated,
  Dimensions,
  StatusBar,
  Alert,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {useNavigation} from '@react-navigation/native';
import {useTheme} from '../contexts/ThemeContext';
import VpnService from '../services/VpnService';
import {ServerInfo} from '../types/ServerInfo';

const {width, height} = Dimensions.get('window');

const HomeScreen: React.FC = () => {
  const navigation = useNavigation();
  const {theme} = useTheme();
  const [isConnected, setIsConnected] = useState(false);
  const [isConnecting, setIsConnecting] = useState(false);
  const [currentServer, setCurrentServer] = useState<ServerInfo | null>(null);
  const [connectionStats, setConnectionStats] = useState({
    upload: '0 KB/s',
    download: '0 KB/s',
    ping: '0 ms',
  });

  const pulseAnim = useRef(new Animated.Value(1)).current;
  const buttonScale = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    if (isConnecting) {
      Animated.loop(
        Animated.sequence([
          Animated.timing(pulseAnim, {
            toValue: 1.1,
            duration: 1000,
            useNativeDriver: true,
          }),
          Animated.timing(pulseAnim, {
            toValue: 1,
            duration: 1000,
            useNativeDriver: true,
          }),
        ]),
      ).start();
    } else {
      pulseAnim.setValue(1);
    }
  }, [isConnecting, pulseAnim]);

  const showNotification = (message: string, type: 'success' | 'error' = 'success') => {
    Alert.alert(type === 'success' ? 'Success' : 'Error', message);
  };

  const getCurrentServer = (): ServerInfo | null => {
    return currentServer;
  };

  const handleConnect = async () => {
    if (isConnected) {
      try {
        setIsConnecting(true);
        await VpnService.disconnect();
        setIsConnected(false);
        setCurrentServer(null);
        showNotification('Disconnected from VPN');
      } catch (error) {
        showNotification('Failed to disconnect', 'error');
      } finally {
        setIsConnecting(false);
      }
    } else {
      try {
        setIsConnecting(true);
        const server = getCurrentServer();
        if (server) {
          await VpnService.connect(server.host);
          setIsConnected(true);
          showNotification(`Connected to ${server.name}`);
        } else {
          showNotification('No server selected', 'error');
        }
      } catch (error) {
        showNotification('Failed to connect', 'error');
      } finally {
        setIsConnecting(false);
      }
    }
  };

  const animateButton = () => {
    Animated.sequence([
      Animated.timing(buttonScale, {
        toValue: 0.95,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.timing(buttonScale, {
        toValue: 1,
        duration: 100,
        useNativeDriver: true,
      }),
    ]).start();
  };

  return (
    <LinearGradient
      colors={[theme.colors.background, theme.colors.surface]}
      style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="transparent" />
      
      {/* Header */}
      <View style={styles.header}>
        <Text style={[styles.title, {color: theme.colors.text}]}>
          Hysteria2 VPN
        </Text>
        <TouchableOpacity
          style={styles.settingsButton}
          onPress={() => navigation.navigate('Settings')}>
          <Text style={[styles.settingsText, {color: theme.colors.primary}]}>
            ⚙️
          </Text>
        </TouchableOpacity>
      </View>

      {/* Connection Status */}
      <View style={styles.statusContainer}>
        <View style={styles.statusIndicator}>
          <Animated.View
            style={[
              styles.statusDot,
              {
                backgroundColor: isConnected ? theme.colors.success : theme.colors.error,
                transform: [{scale: pulseAnim}],
              },
            ]}
          />
          <Text style={[styles.statusText, {color: theme.colors.text}]}>
            {isConnected ? 'Connected' : 'Disconnected'}
          </Text>
        </View>
        
        {currentServer && (
          <Text style={[styles.serverText, {color: theme.colors.textSecondary}]}>
            {currentServer.name} • {currentServer.location}
          </Text>
        )}
      </View>

      {/* Main Connect Button */}
      <View style={styles.buttonContainer}>
        <Animated.View style={{transform: [{scale: buttonScale}]}}>
          <TouchableOpacity
            style={[
              styles.connectButton,
              {
                backgroundColor: isConnected ? theme.colors.error : theme.colors.primary,
              },
            ]}
            onPress={() => {
              animateButton();
              handleConnect();
            }}
            disabled={isConnecting}>
            <LinearGradient
              colors={
                isConnected
                  ? [theme.colors.error, theme.colors.warning]
                  : [theme.colors.primary, theme.colors.secondary]
              }
              style={styles.buttonGradient}>
              <Text style={styles.connectButtonText}>
                {isConnecting
                  ? 'Connecting...'
                  : isConnected
                  ? 'Disconnect'
                  : 'Connect'}
              </Text>
            </LinearGradient>
          </TouchableOpacity>
        </Animated.View>
      </View>

      {/* Connection Stats */}
      {isConnected && (
        <View style={styles.statsContainer}>
          <Text style={[styles.statsTitle, {color: theme.colors.text}]}>
            Connection Stats
          </Text>
          <View style={styles.statsGrid}>
            <View style={styles.statItem}>
              <Text style={[styles.statValue, {color: theme.colors.primary}]}>
                {connectionStats.upload}
              </Text>
              <Text style={[styles.statLabel, {color: theme.colors.textSecondary}]}>
                Upload
              </Text>
            </View>
            <View style={styles.statItem}>
              <Text style={[styles.statValue, {color: theme.colors.secondary}]}>
                {connectionStats.download}
              </Text>
              <Text style={[styles.statLabel, {color: theme.colors.textSecondary}]}>
                Download
              </Text>
            </View>
            <View style={styles.statItem}>
              <Text style={[styles.statValue, {color: theme.colors.accent}]}>
                {connectionStats.ping}
              </Text>
              <Text style={[styles.statLabel, {color: theme.colors.textSecondary}]}>
                Ping
              </Text>
            </View>
          </View>
        </View>
      )}

      {/* Quick Actions */}
      <View style={styles.quickActions}>
        <TouchableOpacity
          style={[styles.actionButton, {backgroundColor: theme.colors.surface}]}
          onPress={() => navigation.navigate('Servers')}>
          <Text style={[styles.actionButtonText, {color: theme.colors.primary}]}>
            🌍 Servers
          </Text>
        </TouchableOpacity>
        
        <TouchableOpacity
          style={[styles.actionButton, {backgroundColor: theme.colors.surface}]}
          onPress={() => navigation.navigate('Connection')}>
          <Text style={[styles.actionButtonText, {color: theme.colors.secondary}]}>
            📊 Details
          </Text>
        </TouchableOpacity>
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 60,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 40,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
  },
  settingsButton: {
    padding: 8,
  },
  settingsText: {
    fontSize: 24,
  },
  statusContainer: {
    alignItems: 'center',
    marginBottom: 60,
  },
  statusIndicator: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  statusDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginRight: 8,
  },
  statusText: {
    fontSize: 18,
    fontWeight: '600',
  },
  serverText: {
    fontSize: 16,
  },
  buttonContainer: {
    alignItems: 'center',
    marginBottom: 60,
  },
  connectButton: {
    borderRadius: 50,
    overflow: 'hidden',
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 4},
    shadowOpacity: 0.3,
    shadowRadius: 8,
  },
  buttonGradient: {
    paddingVertical: 20,
    paddingHorizontal: 60,
    alignItems: 'center',
    justifyContent: 'center',
  },
  connectButtonText: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
    letterSpacing: 1,
  },
  statsContainer: {
    marginBottom: 40,
  },
  statsTitle: {
    fontSize: 18,
    fontWeight: '600',
    textAlign: 'center',
    marginBottom: 20,
  },
  statsGrid: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  statItem: {
    alignItems: 'center',
  },
  statValue: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 14,
  },
  quickActions: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 'auto',
    marginBottom: 40,
  },
  actionButton: {
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderRadius: 12,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  actionButtonText: {
    fontSize: 16,
    fontWeight: '600',
  },
});

export default HomeScreen;
