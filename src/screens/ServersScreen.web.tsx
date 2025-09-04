import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface Server {
  id: string;
  name: string;
  location: string;
  flag: string;
  ping: number;
  load: number;
}

const ServersScreen: React.FC = () => {
  const navigate = useNavigate();
  const [servers] = useState<Server[]>([
    { id: '1', name: 'US East', location: 'New York', flag: '🇺🇸', ping: 45, load: 23 },
    { id: '2', name: 'US West', location: 'Los Angeles', flag: '🇺🇸', ping: 67, load: 45 },
    { id: '3', name: 'Europe', location: 'Amsterdam', flag: '🇳🇱', ping: 89, load: 12 },
    { id: '4', name: 'Asia', location: 'Singapore', flag: '🇸🇬', ping: 123, load: 67 },
    { id: '5', name: 'UK', location: 'London', flag: '🇬🇧', ping: 78, load: 34 },
  ]);

  const handleServerSelect = (server: Server) => {
    // Store selected server and navigate back
    localStorage.setItem('selectedServer', JSON.stringify(server));
    navigate('/home');
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
        <h1 className="title">Servers</h1>
        <div></div>
      </div>

      <div style={{ marginTop: '40px' }}>
        {servers.map((server) => (
          <div
            key={server.id}
            className="stat-item"
            style={{
              marginBottom: '15px',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
            }}
            onClick={() => handleServerSelect(server)}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                <span style={{ fontSize: '24px' }}>{server.flag}</span>
                <div>
                  <div style={{ fontSize: '18px', fontWeight: 'bold', color: '#ffffff' }}>
                    {server.name}
                  </div>
                  <div style={{ fontSize: '14px', color: '#a0a0a0' }}>
                    {server.location}
                  </div>
                </div>
              </div>
              <div style={{ textAlign: 'right' }}>
                <div style={{ fontSize: '16px', fontWeight: 'bold', color: '#4ecdc4' }}>
                  {server.ping}ms
                </div>
                <div style={{ fontSize: '12px', color: '#a0a0a0' }}>
                  {server.load}% load
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ServersScreen;
