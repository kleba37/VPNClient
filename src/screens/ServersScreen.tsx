import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  StatusBar,
  Alert,
  ActivityIndicator,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {useNavigation} from '@react-navigation/native';
import {useTheme} from '../contexts/ThemeContext';
import {VpnService} from '../services/VpnService';
import {ServerInfo} from '../types/ServerInfo';

const ServersScreen: React.FC = () => {
  const navigation = useNavigation();
  const {theme} = useTheme();
  const [servers, setServers] = useState<ServerInfo[]>([]);
  const [loading, setLoading] = useState(true);
  const [testingServer, setTestingServer] = useState<string | null>(null);

  useEffect(() => {
    loadServers();
  }, []);

  const loadServers = async () => {
    try {
      setLoading(true);
      const serverList = await VpnService.getInstance().getServerList();
      setServers(serverList);
    } catch (error) {
      Alert.alert('Error', 'Failed to load servers');
    } finally {
      setLoading(false);
    }
  };

  const handleServerSelect = (server: ServerInfo) => {
    Alert.alert(
      'Select Server',
      `Connect to ${server.name} (${server.location})?`,
      [
        {text: 'Cancel', style: 'cancel'},
        {
          text: 'Connect',
          onPress: () => {
            (navigation as any).navigate('Home', {selectedServer: server});
          },
        },
      ],
    );
  };

  const handleTestServer = async (server: ServerInfo) => {
    try {
      setTestingServer(server.id);
      const result = await VpnService.getInstance().testServer(server);
      
      Alert.alert(
        'Server Test Results',
        `Ping: ${result.ping}ms\nSpeed: ${result.speed}%`,
        [{text: 'OK'}],
      );
    } catch (error) {
      Alert.alert('Error', 'Failed to test server');
    } finally {
      setTestingServer(null);
    }
  };

  const toggleFavorite = (serverId: string) => {
    setServers(prev =>
      prev.map(server =>
        server.id === serverId
          ? {...server, isFavorite: !server.isFavorite}
          : server,
      ),
    );
  };

  const renderServerItem = ({item}: {item: ServerInfo}) => (
    <TouchableOpacity
      style={[
        styles.serverItem,
        {
          backgroundColor: theme.colors.surface,
          borderColor: theme.colors.border,
        },
      ]}
      onPress={() => handleServerSelect(item)}>
      <View style={styles.serverHeader}>
        <View style={styles.serverInfo}>
          <Text style={[styles.serverFlag, {fontSize: 24}]}>{item.flag}</Text>
          <View style={styles.serverDetails}>
            <Text style={[styles.serverName, {color: theme.colors.text}]}>
              {item.name}
            </Text>
            <Text style={[styles.serverLocation, {color: theme.colors.textSecondary}]}>
              {item.location}, {item.country}
            </Text>
          </View>
        </View>
        
        <TouchableOpacity
          style={styles.favoriteButton}
          onPress={() => toggleFavorite(item.id)}>
          <Text style={styles.favoriteIcon}>
            {item.isFavorite ? '❤️' : '🤍'}
          </Text>
        </TouchableOpacity>
      </View>

      <View style={styles.serverStats}>
        <View style={styles.statItem}>
          <Text style={[styles.statLabel, {color: theme.colors.textSecondary}]}>
            Ping
          </Text>
          <Text style={[styles.statValue, {color: theme.colors.primary}]}>
            {item.ping}ms
          </Text>
        </View>
        
        <View style={styles.statItem}>
          <Text style={[styles.statLabel, {color: theme.colors.textSecondary}]}>
            Load
          </Text>
          <Text
            style={[
              styles.statValue,
              {
                color:
                  item.load < 30
                    ? theme.colors.success
                    : item.load < 70
                    ? theme.colors.warning
                    : theme.colors.error,
              },
            ]}>
            {item.load}%
          </Text>
        </View>
        
        <View style={styles.statItem}>
          <Text style={[styles.statLabel, {color: theme.colors.textSecondary}]}>
            Speed
          </Text>
          <Text style={[styles.statValue, {color: theme.colors.secondary}]}>
            {item.upMbps}Mbps
          </Text>
        </View>
      </View>

      <View style={styles.serverActions}>
        <TouchableOpacity
          style={[
            styles.actionButton,
            {backgroundColor: theme.colors.primary},
          ]}
          onPress={() => handleServerSelect(item)}>
          <Text style={styles.actionButtonText}>Connect</Text>
        </TouchableOpacity>
        
        <TouchableOpacity
          style={[
            styles.actionButton,
            {backgroundColor: theme.colors.surface, borderColor: theme.colors.border},
          ]}
          onPress={() => handleTestServer(item)}
          disabled={testingServer === item.id}>
          {testingServer === item.id ? (
            <ActivityIndicator size="small" color={theme.colors.primary} />
          ) : (
            <Text style={[styles.actionButtonText, {color: theme.colors.text}]}>
              Test
            </Text>
          )}
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );

  if (loading) {
    return (
      <LinearGradient
        colors={[theme.colors.background, theme.colors.surface]}
        style={styles.loadingContainer}>
        <StatusBar barStyle="dark-content" backgroundColor="transparent" />
        <ActivityIndicator size="large" color={theme.colors.primary} />
        <Text style={[styles.loadingText, {color: theme.colors.text}]}>
          Loading servers...
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
          Select Server
        </Text>
        
        <TouchableOpacity
          style={styles.refreshButton}
          onPress={loadServers}>
          <Text style={[styles.refreshButtonText, {color: theme.colors.primary}]}>
            🔄
          </Text>
        </TouchableOpacity>
      </View>

      {/* Server List */}
      <FlatList
        data={servers}
        renderItem={renderServerItem}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.serverList}
        showsVerticalScrollIndicator={false}
      />
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
    marginTop: 16,
    fontSize: 16,
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
  refreshButton: {
    padding: 8,
  },
  refreshButtonText: {
    fontSize: 20,
  },
  serverList: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  serverItem: {
    marginBottom: 16,
    borderRadius: 16,
    padding: 20,
    borderWidth: 1,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  serverHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  serverInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  serverFlag: {
    marginRight: 12,
  },
  serverDetails: {
    flex: 1,
  },
  serverName: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 4,
  },
  serverLocation: {
    fontSize: 14,
  },
  favoriteButton: {
    padding: 4,
  },
  favoriteIcon: {
    fontSize: 20,
  },
  serverStats: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 20,
    paddingVertical: 16,
    borderTopWidth: 1,
    borderTopColor: 'rgba(0,0,0,0.1)',
  },
  statItem: {
    alignItems: 'center',
  },
  statLabel: {
    fontSize: 12,
    marginBottom: 4,
  },
  statValue: {
    fontSize: 16,
    fontWeight: '600',
  },
  serverActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 12,
  },
  actionButton: {
    flex: 1,
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
  },
  actionButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: 'white',
  },
});

export default ServersScreen;
