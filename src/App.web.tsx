import React from 'react';

const App: React.FC = () => {
  return (
    <div style={{ 
      padding: '20px', 
      fontFamily: 'Arial, sans-serif',
      textAlign: 'center' 
    }}>
      <h1>Hysteria2 VPN Client</h1>
      <p>Web version is under development</p>
      <div style={{ 
        marginTop: '20px',
        padding: '20px',
        backgroundColor: '#f5f5f5',
        borderRadius: '8px'
      }}>
        <p>This is a placeholder for the web version of the VPN client.</p>
        <p>Mobile and desktop versions are available.</p>
      </div>
    </div>
  );
};

export default App;
