import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Switch,
  StatusBar,
  Alert,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {useNavigation} from '@react-navigation/native';
import {useTheme} from '../contexts/ThemeContext';

const SettingsScreen: React.FC = () => {
  const navigation = useNavigation();
  const {theme, isDark, toggleTheme} = useTheme();

  const [settings, setSettings] = useState({
    autoConnect: false,
    killSwitch: true,
    splitTunneling: false,
    notifications: true,
    dataUsage: true,
    protocol: 'hysteria2',
    dns: '1.1.1.1',
    mtu: 1500,
  });

  const handleSettingChange = (key: string, value: any) => {
    setSettings(prev => ({...prev, [key]: value}));
  };

  const handleExportConfig = () => {
    Alert.alert(
      'Export Configuration',
      'Export current VPN configuration?',
      [
        {text: 'Cancel', style: 'cancel'},
        {text: 'Export', onPress: () => {
          // In real app, this would export the config
          Alert.alert('Success', 'Configuration exported successfully');
        }},
      ],
    );
  };

  const handleClearData = () => {
    Alert.alert(
      'Clear Data',
      'This will clear all VPN settings and connection history. Continue?',
      [
        {text: 'Cancel', style: 'cancel'},
        {text: 'Clear', style: 'destructive', onPress: () => {
          Alert.alert('Success', 'Data cleared successfully');
        }},
      ],
    );
  };

  const renderSettingItem = (
    title: string,
    subtitle: string,
    type: 'switch' | 'button' | 'select',
    value?: any,
    onValueChange?: (value: any) => void,
    onPress?: () => void,
  ) => (
    <View style={[styles.settingItem, {borderBottomColor: theme.colors.border}]}>
      <View style={styles.settingInfo}>
        <Text style={[styles.settingTitle, {color: theme.colors.text}]}>
          {title}
        </Text>
        <Text style={[styles.settingSubtitle, {color: theme.colors.textSecondary}]}>
          {subtitle}
        </Text>
      </View>

      {type === 'switch' && (
        <Switch
          value={value}
          onValueChange={onValueChange}
          trackColor={{false: theme.colors.border, true: theme.colors.primary}}
          thumbColor={value ? theme.colors.surface : theme.colors.textSecondary}
        />
      )}

      {type === 'button' && (
        <TouchableOpacity
          style={[styles.settingButton, {backgroundColor: theme.colors.primary}]}
          onPress={onPress}>
          <Text style={styles.settingButtonText}>Configure</Text>
        </TouchableOpacity>
      )}

      {type === 'select' && (
        <TouchableOpacity
          style={[styles.selectButton, {borderColor: theme.colors.border}]}
          onPress={onPress}>
          <Text style={[styles.selectButtonText, {color: theme.colors.text}]}>
            {value}
          </Text>
          <Text style={[styles.selectButtonArrow, {color: theme.colors.textSecondary}]}>
            ›
          </Text>
        </TouchableOpacity>
      )}
    </View>
  );

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
          Settings
        </Text>

        <View style={styles.placeholder} />
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Connection Settings */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, {color: theme.colors.text}]}>
            Connection
          </Text>

          {renderSettingItem(
            'Auto-connect',
            'Automatically connect to VPN when app starts',
            'switch',
            settings.autoConnect,
            (value) => handleSettingChange('autoConnect', value),
          )}

          {renderSettingItem(
            'Kill Switch',
            'Block internet when VPN disconnects',
            'switch',
            settings.killSwitch,
            (value) => handleSettingChange('killSwitch', value),
          )}

          {renderSettingItem(
            'Split Tunneling',
            'Allow some apps to bypass VPN',
            'switch',
            settings.splitTunneling,
            (value) => handleSettingChange('splitTunneling', value),
          )}
        </View>

        {/* Protocol Settings */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, {color: theme.colors.text}]}>
            Protocol
          </Text>

          {renderSettingItem(
            'Protocol',
            'VPN protocol to use',
            'select',
            settings.protocol.toUpperCase(),
            undefined,
            () => Alert.alert('Protocol', 'Hysteria2 is the only supported protocol'),
          )}

          {renderSettingItem(
            'DNS Servers',
            'Custom DNS servers',
            'button',
            undefined,
            undefined,
            () => Alert.alert('DNS', 'Configure custom DNS servers'),
          )}

          {renderSettingItem(
            'MTU',
            'Maximum Transmission Unit',
            'button',
            undefined,
            undefined,
            () => Alert.alert('MTU', 'Configure MTU settings'),
          )}
        </View>

        {/* App Settings */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, {color: theme.colors.text}]}>
            App
          </Text>

          {renderSettingItem(
            'Dark Theme',
            'Use dark theme for the app',
            'switch',
            isDark,
            undefined,
            toggleTheme,
          )}

          {renderSettingItem(
            'Notifications',
            'Show VPN connection notifications',
            'switch',
            settings.notifications,
            (value) => handleSettingChange('notifications', value),
          )}

          {renderSettingItem(
            'Data Usage',
            'Track VPN data usage',
            'switch',
            settings.dataUsage,
            (value) => handleSettingChange('dataUsage', value),
          )}
        </View>

        {/* Advanced Settings */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, {color: theme.colors.text}]}>
            Advanced
          </Text>

          {renderSettingItem(
            'Export Config',
            'Export VPN configuration file',
            'button',
            undefined,
            undefined,
            handleExportConfig,
          )}

          {renderSettingItem(
            'Clear Data',
            'Clear all app data and settings',
            'button',
            undefined,
            undefined,
            handleClearData,
          )}
        </View>

        {/* About */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, {color: theme.colors.text}]}>
            About
          </Text>

          <View style={[styles.aboutItem, {borderBottomColor: theme.colors.border}]}>
            <Text style={[styles.aboutLabel, {color: theme.colors.textSecondary}]}>
              Version
            </Text>
            <Text style={[styles.aboutValue, {color: theme.colors.text}]}>
              1.0.0
            </Text>
          </View>

          <View style={[styles.aboutItem, {borderBottomColor: theme.colors.border}]}>
            <Text style={[styles.aboutLabel, {color: theme.colors.textSecondary}]}>
              Protocol
            </Text>
            <Text style={[styles.aboutValue, {color: theme.colors.text}]}>
              Hysteria2
            </Text>
          </View>

          <View style={[styles.aboutItem, {borderBottomColor: theme.colors.border}]}>
            <Text style={[styles.aboutLabel, {color: theme.colors.textSecondary}]}>
              License
            </Text>
            <Text style={[styles.aboutValue, {color: theme.colors.text}]}>
              MIT
            </Text>
          </View>
        </View>
      </ScrollView>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
    marginBottom: 32,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 16,
    marginTop: 8,
  },
  settingItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 16,
    borderBottomWidth: 1,
  },
  settingInfo: {
    flex: 1,
    marginRight: 16,
  },
  settingTitle: {
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 4,
  },
  settingSubtitle: {
    fontSize: 14,
    lineHeight: 20,
  },
  settingButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
  },
  settingButtonText: {
    color: 'white',
    fontSize: 14,
    fontWeight: '500',
  },
  selectButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
    borderWidth: 1,
    minWidth: 100,
  },
  selectButtonText: {
    fontSize: 14,
    fontWeight: '500',
    marginRight: 8,
  },
  selectButtonArrow: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  aboutItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 16,
    borderBottomWidth: 1,
  },
  aboutLabel: {
    fontSize: 16,
  },
  aboutValue: {
    fontSize: 16,
    fontWeight: '500',
  },
});

export default SettingsScreen;
