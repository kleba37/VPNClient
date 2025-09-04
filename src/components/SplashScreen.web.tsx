import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const SplashScreen: React.FC = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate('/home');
    }, 2000);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="container gradient-bg" style={{
      justifyContent: 'center',
      alignItems: 'center',
      textAlign: 'center'
    }}>
      <div style={{
        fontSize: '48px',
        marginBottom: '20px',
        animation: 'pulse 2s infinite'
      }}>
        🔒
      </div>
      <h1 style={{
        fontSize: '32px',
        fontWeight: 'bold',
        marginBottom: '10px',
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        backgroundClip: 'text'
      }}>
        Hysteria2 VPN
      </h1>
      <p style={{
        fontSize: '16px',
        color: '#a0a0a0',
        marginBottom: '40px'
      }}>
        Secure • Fast • Reliable
      </p>
      <div style={{
        width: '50px',
        height: '50px',
        border: '3px solid rgba(255, 255, 255, 0.3)',
        borderTop: '3px solid #667eea',
        borderRadius: '50%',
        animation: 'spin 1s linear infinite',
        margin: '0 auto'
      }} />
    </div>
  );
};

export default SplashScreen;

