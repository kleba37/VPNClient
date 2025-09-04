import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '../contexts/ThemeContext';
import VpnService from '../services/VpnService';
import { ServerInfo } from '../types/ServerInfo';

const HomeScreen: React.FC = () => {
  const navigate = useNavigate();
  // const { theme } = useTheme();
  const [isConnected, setIsConnected] = useState(false);
  const [isConnecting, setIsConnecting] = useState(false);
  const [currentServer, setCurrentServer] = useState<ServerInfo | null>(null);
  const [connectionStats, setConnectionStats] = useState({
    upload: '0 KB/s',
    download: '0 KB/s',
    ping: '0 ms',
  });

  useEffect(() => {
    if (isConnected) {
      const interval = setInterval(() => {
        setConnectionStats({
          upload: `${Math.floor(Math.random() * 1000 + 100)} KB/s`,
          download: `${Math.floor(Math.random() * 2000 + 500)} KB/s`,
          ping: `${Math.floor(Math.random() * 50 + 10)} ms`,
        });
      }, 2000);

      return () => clearInterval(interval);
    }
  }, [isConnected]);

  const handleConnect = async () => {
    if (isConnected) {
      try {
        setIsConnecting(true);
        await VpnService.disconnect();
        setIsConnected(false);
        setCurrentServer(null);
        setConnectionStats({
          upload: '0 KB/s',
          download: '0 KB/s',
          ping: '0 ms',
        });
      } catch (error) {
        console.error('Failed to disconnect from VPN:', error);
      } finally {
        setIsConnecting(false);
      }
    } else {
      if (!currentServer) {
        navigate('/servers');
        return;
      }

      try {
        setIsConnecting(true);
        await VpnService.connect(currentServer);
        setIsConnected(true);
      } catch (error) {
        console.error('Failed to connect to VPN:', error);
      } finally {
        setIsConnecting(false);
      }
    }
  };

  return (
    <div className="container gradient-bg">
      {/* Header */}
      <div className="header">
        <h1 className="title">Hysteria2 VPN</h1>
        <button
          className="settings-btn"
          onClick={() => navigate('/settings')}
        >
          ⚙️
        </button>
      </div>

      {/* Connection Status */}
      <div className="status-container">
        <div className="status-indicator">
          <div
            className={`status-dot ${
              isConnected ? 'status-connected' : 'status-disconnected'
            }`}
          />
          <span className="status-text">
            {isConnected ? 'Connected' : 'Disconnected'}
          </span>
        </div>

        {currentServer && (
          <p className="server-text">
            {currentServer.name} • {currentServer.location}
          </p>
        )}
      </div>

      {/* Main Connect Button */}
      <div className="button-container">
        <button
          className={`btn ${isConnected ? 'btn-error' : 'btn-primary'}`}
          onClick={handleConnect}
          disabled={isConnecting}
        >
          {isConnecting
            ? 'Connecting...'
            : isConnected
            ? 'Disconnect'
            : 'Connect'}
        </button>
      </div>

      {/* Connection Stats */}
      {isConnected && (
        <div className="stats-container">
          <h2 className="stats-title">Connection Stats</h2>
          <div className="stats-grid">
            <div className="stat-item">
              <div className="stat-value" style={{ color: '#667eea' }}>
                {connectionStats.upload}
              </div>
              <div className="stat-label">Upload</div>
            </div>
            <div className="stat-item">
              <div className="stat-value" style={{ color: '#764ba2' }}>
                {connectionStats.download}
              </div>
              <div className="stat-label">Download</div>
            </div>
            <div className="stat-item">
              <div className="stat-value" style={{ color: '#4ecdc4' }}>
                {connectionStats.ping}
              </div>
              <div className="stat-label">Ping</div>
            </div>
          </div>
        </div>
      )}

      {/* Quick Actions */}
      <div className="quick-actions">
        <button
          className="action-button"
          onClick={() => navigate('/servers')}
        >
          🌍 Servers
        </button>

        <button
          className="action-button"
          onClick={() => navigate('/connection')}
        >
          📊 Details
        </button>
      </div>
    </div>
  );
};

export default HomeScreen;
