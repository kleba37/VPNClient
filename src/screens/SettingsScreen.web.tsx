import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const SettingsScreen: React.FC = () => {
  const navigate = useNavigate();
  const [settings, setSettings] = useState({
    autoConnect: false,
    killSwitch: true,
    dnsProtection: true,
    notifications: true,
  });

  const handleSettingChange = (key: string, value: boolean) => {
    setSettings(prev => ({ ...prev, [key]: value }));
  };

  return (
    <div className="container gradient-bg">
      <div className="header">
        <button
          className="settings-btn"
          onClick={() => navigate('/home')}
        >
          ← Back
        </button>
        <h1 className="title">Settings</h1>
        <div></div>
      </div>

      <div style={{ marginTop: '40px' }}>
        <div className="stat-item" style={{ marginBottom: '20px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <div style={{ fontSize: '18px', fontWeight: 'bold', color: '#ffffff' }}>
                Auto Connect
              </div>
              <div style={{ fontSize: '14px', color: '#a0a0a0' }}>
                Automatically connect to VPN on startup
              </div>
            </div>
            <button
              className={`btn ${settings.autoConnect ? 'btn-primary' : 'btn-secondary'}`}
              style={{ padding: '8px 16px', fontSize: '14px' }}
              onClick={() => handleSettingChange('autoConnect', !settings.autoConnect)}
            >
              {settings.autoConnect ? 'ON' : 'OFF'}
            </button>
          </div>
        </div>

        <div className="stat-item" style={{ marginBottom: '20px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <div style={{ fontSize: '18px', fontWeight: 'bold', color: '#ffffff' }}>
                Kill Switch
              </div>
              <div style={{ fontSize: '14px', color: '#a0a0a0' }}>
                Block internet if VPN disconnects
              </div>
            </div>
            <button
              className={`btn ${settings.killSwitch ? 'btn-primary' : 'btn-secondary'}`}
              style={{ padding: '8px 16px', fontSize: '14px' }}
              onClick={() => handleSettingChange('killSwitch', !settings.killSwitch)}
            >
              {settings.killSwitch ? 'ON' : 'OFF'}
            </button>
          </div>
        </div>

        <div className="stat-item" style={{ marginBottom: '20px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <div style={{ fontSize: '18px', fontWeight: 'bold', color: '#ffffff' }}>
                DNS Protection
              </div>
              <div style={{ fontSize: '14px', color: '#a0a0a0' }}>
                Use secure DNS servers
              </div>
            </div>
            <button
              className={`btn ${settings.dnsProtection ? 'btn-primary' : 'btn-secondary'}`}
              style={{ padding: '8px 16px', fontSize: '14px' }}
              onClick={() => handleSettingChange('dnsProtection', !settings.dnsProtection)}
            >
              {settings.dnsProtection ? 'ON' : 'OFF'}
            </button>
          </div>
        </div>

        <div className="stat-item">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <div style={{ fontSize: '18px', fontWeight: 'bold', color: '#ffffff' }}>
                Notifications
              </div>
              <div style={{ fontSize: '14px', color: '#a0a0a0' }}>
                Show connection notifications
              </div>
            </div>
            <button
              className={`btn ${settings.notifications ? 'btn-primary' : 'btn-secondary'}`}
              style={{ padding: '8px 16px', fontSize: '14px' }}
              onClick={() => handleSettingChange('notifications', !settings.notifications)}
            >
              {settings.notifications ? 'ON' : 'OFF'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsScreen;
