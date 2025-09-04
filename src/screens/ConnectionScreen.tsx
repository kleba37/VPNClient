import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  StatusBar,
  Dimensions,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {useNavigation} from '@react-navigation/native';
import {useTheme} from '../contexts/ThemeContext';
import VpnService from '../services/VpnService';
import {ConnectionStats} from '../types/ServerInfo';

const {width} = Dimensions.get('window');

const ConnectionScreen: React.FC = () => {
  const navigation = useNavigation();
  const {theme} = useTheme();
  const [connectionStats, setConnectionStats] = useState<ConnectionStats | null>(null);
  const [currentServer, setCurrentServer] = useState<any>(null);

  useEffect(() => {
    const vpnService = VpnService;
    const isConnected = vpnService.getConnectionStatus();
    
    if (isConnected) {
      const server = vpnService.getCurrentServer();
      setCurrentServer(server);
      
      // Update stats every second
      const interval = setInterval(() => {
        const stats = vpnService.getConnectionStats();
        if (stats) {
          setConnectionStats(stats);
        }
      }, 1000);
      
      return () => clearInterval(interval);
    } else {
      navigation.goBack();
    }
  }, [navigation]);

  const formatBytes = (bytes: number): string => {
    if (bytes === 0) return '0 B';
    const k = 1024;
    const sizes = ['B', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const formatTime = (ms: number): string => {
    const seconds = Math.floor(ms / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    
    if (hours > 0) {
      return `${hours}h ${minutes % 60}m ${seconds % 60}s`;
    } else if (minutes > 0) {
      return `${minutes}m ${seconds % 60}s`;
    } else {
      return `${seconds}s`;
    }
  };

  const renderStatCard = (
    title: string,
    value: string,
    subtitle: string,
    color: string,
  ) => (
    <View style={[styles.statCard, {backgroundColor: theme.colors.surface}]}>
      <Text style={[styles.statCardTitle, {color: theme.colors.textSecondary}]}>
        {title}
      </Text>
      <Text style={[styles.statCardValue, {color}]}>{value}</Text>
      <Text style={[styles.statCardSubtitle, {color: theme.colors.textSecondary}]}>
        {subtitle}
      </Text>
    </View>
  );

  const renderInfoRow = (label: string, value: string) => (
    <View style={[styles.infoRow, {borderBottomColor: theme.colors.border}]}>
      <Text style={[styles.infoLabel, {color: theme.colors.textSecondary}]}>
        {label}
      </Text>
      <Text style={[styles.infoValue, {color: theme.colors.text}]}>
        {value}
      </Text>
    </View>
  );

  if (!currentServer || !connectionStats) {
    return (
      <LinearGradient
        colors={[theme.colors.background, theme.colors.surface]}
        style={styles.loadingContainer}>
        <StatusBar barStyle="dark-content" backgroundColor="transparent" />
        <Text style={[styles.loadingText, {color: theme.colors.text}]}>
          Loading connection details...
        </Text>
      </LinearGradient>
    );
  }

  return (
    <LinearGradient
      colors={[theme.colors.background, theme.colors.surface]}
      style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="transparent" />
      
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}>
          <Text style={[styles.backButtonText, {color: theme.colors.primary}]}>
            ← Back
          </Text>
        </TouchableOpacity>
        
        <Text style={[styles.title, {color: theme.colors.text}]}>
          Connection Details
        </Text>
        
        <View style={styles.placeholder} />
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Server Info */}
        <View style={[styles.section, {backgroundColor: theme.colors.surface}]}>
          <Text style={[styles.sectionTitle, {color: theme.colors.text}]}>
            Server Information
          </Text>
          
          <View style={styles.serverHeader}>
            <Text style={styles.serverFlag}>{currentServer.flag}</Text>
            <View style={styles.serverDetails}>
              <Text style={[styles.serverName, {color: theme.colors.text}]}>
                {currentServer.name}
              </Text>
              <Text style={[styles.serverLocation, {color: theme.colors.textSecondary}]}>
                {currentServer.location}, {currentServer.country}
              </Text>
            </View>
          </View>
          
          {renderInfoRow('Host', currentServer.host)}
          {renderInfoRow('Port', currentServer.port.toString())}
          {renderInfoRow('Protocol', currentServer.protocol.toUpperCase())}
          {renderInfoRow('SNI', currentServer.sni || 'Default')}
          {renderInfoRow('ALPN', currentServer.alpn?.join(', ') || 'h3')}
        </View>

        {/* Connection Stats */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, {color: theme.colors.text}]}>
            Connection Statistics
          </Text>
          
          <View style={styles.statsGrid}>
            {renderStatCard(
              'Upload Speed',
              connectionStats.upload,
              'Current upload rate',
              theme.colors.primary,
            )}
            
            {renderStatCard(
              'Download Speed',
              connectionStats.download,
              'Current download rate',
              theme.colors.secondary,
            )}
            
            {renderStatCard(
              'Ping',
              connectionStats.ping,
              'Latency to server',
              theme.colors.accent,
            )}
            
            {renderStatCard(
              'Connection Time',
              formatTime(connectionStats.connectionTime),
              'Time since connection',
              theme.colors.success,
            )}
          </View>
        </View>

        {/* Data Usage */}
        <View style={[styles.section, {backgroundColor: theme.colors.surface}]}>
          <Text style={[styles.sectionTitle, {color: theme.colors.text}]}>
            Data Usage
          </Text>
          
          <View style={styles.dataUsageContainer}>
            <View style={styles.dataUsageItem}>
              <Text style={[styles.dataUsageLabel, {color: theme.colors.textSecondary}]}>
                Data Received
              </Text>
              <Text style={[styles.dataUsageValue, {color: theme.colors.success}]}>
                {formatBytes(connectionStats.bytesReceived)}
              </Text>
            </View>
            
            <View style={styles.dataUsageItem}>
              <Text style={[styles.dataUsageLabel, {color: theme.colors.textSecondary}]}>
                Data Sent
              </Text>
              <Text style={[styles.dataUsageValue, {color: theme.colors.warning}]}>
                {formatBytes(connectionStats.bytesSent)}
              </Text>
            </View>
          </View>
        </View>

        {/* Server Performance */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, {color: theme.colors.text}]}>
            Server Performance
          </Text>
          
          <View style={styles.performanceContainer}>
            <View style={styles.performanceItem}>
              <Text style={[styles.performanceLabel, {color: theme.colors.textSecondary}]}>
                Server Load
              </Text>
              <View style={styles.progressBar}>
                <View
                  style={[
                    styles.progressFill,
                    {
                      width: `${connectionStats.serverLoad}%`,
                      backgroundColor:
                        connectionStats.serverLoad < 30
                          ? theme.colors.success
                          : connectionStats.serverLoad < 70
                          ? theme.colors.warning
                          : theme.colors.error,
                    },
                  ]}
                />
              </View>
              <Text style={[styles.performanceValue, {color: theme.colors.text}]}>
                {connectionStats.serverLoad}%
              </Text>
            </View>
            
            <View style={styles.performanceItem}>
              <Text style={[styles.performanceLabel, {color: theme.colors.textSecondary}]}>
                Uplink Speed
              </Text>
              <Text style={[styles.performanceValue, {color: theme.colors.primary}]}>
                {currentServer.upMbps} Mbps
              </Text>
            </View>
            
            <View style={styles.performanceItem}>
              <Text style={[styles.performanceLabel, {color: theme.colors.textSecondary}]}>
                Downlink Speed
              </Text>
              <Text style={[styles.performanceValue, {color: theme.colors.secondary}]}>
                {currentServer.downMbps} Mbps
              </Text>
            </View>
          </View>
        </View>

        {/* Connection Actions */}
        <View style={styles.section}>
          <TouchableOpacity
            style={[styles.actionButton, {backgroundColor: theme.colors.error}]}
            onPress={() => {
              VpnService.disconnect();
              navigation.goBack();
            }}>
            <Text style={styles.actionButtonText}>Disconnect</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    fontSize: 16,
    color: '#666',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 60,
    paddingBottom: 20,
  },
  backButton: {
    padding: 8,
  },
  backButtonText: {
    fontSize: 16,
    fontWeight: '600',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  placeholder: {
    width: 60,
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
  },
  section: {
    marginBottom: 24,
    borderRadius: 16,
    padding: 20,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 20,
  },
  serverHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  serverFlag: {
    fontSize: 32,
    marginRight: 16,
  },
  serverDetails: {
    flex: 1,
  },
  serverName: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 4,
  },
  serverLocation: {
    fontSize: 16,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
  },
  infoLabel: {
    fontSize: 14,
  },
  infoValue: {
    fontSize: 14,
    fontWeight: '500',
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  statCard: {
    width: (width - 60) / 2 - 8,
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 16,
    elevation: 1,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.05,
    shadowRadius: 2,
  },
  statCardTitle: {
    fontSize: 12,
    marginBottom: 8,
    textAlign: 'center',
  },
  statCardValue: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 4,
    textAlign: 'center',
  },
  statCardSubtitle: {
    fontSize: 10,
    textAlign: 'center',
  },
  dataUsageContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  dataUsageItem: {
    alignItems: 'center',
  },
  dataUsageLabel: {
    fontSize: 14,
    marginBottom: 8,
  },
  dataUsageValue: {
    fontSize: 18,
    fontWeight: '600',
  },
  performanceContainer: {
    gap: 20,
  },
  performanceItem: {
    alignItems: 'center',
  },
  performanceLabel: {
    fontSize: 14,
    marginBottom: 8,
  },
  progressBar: {
    width: '100%',
    height: 8,
    backgroundColor: 'rgba(0,0,0,0.1)',
    borderRadius: 4,
    marginBottom: 8,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    borderRadius: 4,
  },
  performanceValue: {
    fontSize: 16,
    fontWeight: '600',
  },
  actionButton: {
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  actionButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default ConnectionScreen;
