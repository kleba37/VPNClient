import React from 'react';
import { useNavigate } from 'react-router-dom';

const ConnectionScreen: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="container gradient-bg">
      <div className="header">
        <button
          className="settings-btn"
          onClick={() => navigate('/home')}
        >
          ← Back
        </button>
        <h1 className="title">Connection Details</h1>
        <div></div>
      </div>

      <div style={{ marginTop: '40px' }}>
        <div className="stat-item" style={{ marginBottom: '20px' }}>
          <div style={{ fontSize: '18px', fontWeight: 'bold', color: '#ffffff', marginBottom: '10px' }}>
            Connection Information
          </div>
          <div style={{ fontSize: '14px', color: '#a0a0a0', lineHeight: '1.6' }}>
            <div>Protocol: Hysteria2</div>
            <div>Encryption: ChaCha20-Poly1305</div>
            <div>Server: US East (New York)</div>
            <div>IP: 192.168.1.100</div>
            <div>Duration: 2h 34m</div>
          </div>
        </div>

        <div className="stat-item" style={{ marginBottom: '20px' }}>
          <div style={{ fontSize: '18px', fontWeight: 'bold', color: '#ffffff', marginBottom: '10px' }}>
            Data Usage
          </div>
          <div style={{ fontSize: '14px', color: '#a0a0a0', lineHeight: '1.6' }}>
            <div>Downloaded: 1.2 GB</div>
            <div>Uploaded: 245 MB</div>
            <div>Total: 1.45 GB</div>
          </div>
        </div>

        <div className="stat-item">
          <div style={{ fontSize: '18px', fontWeight: 'bold', color: '#ffffff', marginBottom: '10px' }}>
            Performance
          </div>
          <div style={{ fontSize: '14px', color: '#a0a0a0', lineHeight: '1.6' }}>
            <div>Average Speed: 45 Mbps</div>
            <div>Peak Speed: 78 Mbps</div>
            <div>Average Ping: 23ms</div>
            <div>Packet Loss: 0%</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConnectionScreen;

