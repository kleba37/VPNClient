import {ServerInfo, ConnectionStats, VpnConfig} from '../types/ServerInfo';

export class VpnService {
  private static instance: VpnService;
  private isConnected: boolean = false;
  private currentServer: ServerInfo | null = null;
  private connectionStats: ConnectionStats | null = null;
  private connectionStartTime: number = 0;

  private constructor() {}

  public static getInstance(): VpnService {
    if (!VpnService.instance) {
      VpnService.instance = new VpnService();
    }
    return VpnService.instance;
  }

  public async connect(server: ServerInfo): Promise<void> {
    try {
      // Simulate connection process
      await this.simulateConnection(server);
      
      this.currentServer = server;
      this.isConnected = true;
      this.connectionStartTime = Date.now();
      
      // Start monitoring connection stats
      this.startStatsMonitoring();
      
      console.log(`Connected to ${server.name} (${server.host}:${server.port})`);
    } catch (error) {
      console.error('Failed to connect to VPN:', error);
      throw error;
    }
  }

  public async disconnect(): Promise<void> {
    try {
      // Simulate disconnection process
      await this.simulateDisconnection();
      
      this.isConnected = false;
      this.currentServer = null;
      this.connectionStats = null;
      this.connectionStartTime = 0;
      
      console.log('Disconnected from VPN');
    } catch (error) {
      console.error('Failed to disconnect from VPN:', error);
      throw error;
    }
  }

  public getConnectionStatus(): boolean {
    return this.isConnected;
  }

  public getCurrentServer(): ServerInfo | null {
    return this.currentServer;
  }

  public getConnectionStats(): ConnectionStats | null {
    if (!this.isConnected || !this.connectionStartTime) {
      return null;
    }

    const connectionTime = Date.now() - this.connectionStartTime;
    
    return {
      upload: this.connectionStats?.upload || '0 KB/s',
      download: this.connectionStats?.download || '0 KB/s',
      ping: this.connectionStats?.ping || '0 ms',
      bytesReceived: this.connectionStats?.bytesReceived || 0,
      bytesSent: this.connectionStats?.bytesSent || 0,
      connectionTime,
      serverLoad: this.currentServer?.load || 0,
    };
  }

  public async testServer(server: ServerInfo): Promise<{ping: number; speed: number}> {
    try {
      // Simulate server testing
      const ping = Math.floor(Math.random() * 100) + 10;
      const speed = Math.floor(Math.random() * 100) + 50;
      
      return {ping, speed};
    } catch (error) {
      console.error('Failed to test server:', error);
      throw error;
    }
  }

  public async getServerList(): Promise<ServerInfo[]> {
    // Mock server list - in real app this would come from API
    return [
      {
        id: '1',
        name: 'US East',
        location: 'New York',
        country: 'US',
        flag: '🇺🇸',
        host: 'us-east.hysteria2.com',
        port: 443,
        protocol: 'hysteria2',
        password: 'password123',
        sni: 'us-east.hysteria2.com',
        alpn: ['h3'],
        upMbps: 1000,
        downMbps: 1000,
        ping: 25,
        load: 45,
        isFavorite: true,
        lastUsed: new Date(),
      },
      {
        id: '2',
        name: 'US West',
        location: 'Los Angeles',
        country: 'US',
        flag: '🇺🇸',
        host: 'us-west.hysteria2.com',
        port: 443,
        protocol: 'hysteria2',
        password: 'password123',
        sni: 'us-west.hysteria2.com',
        alpn: ['h3'],
        upMbps: 1000,
        downMbps: 1000,
        ping: 35,
        load: 30,
        isFavorite: false,
      },
      {
        id: '3',
        name: 'Europe',
        location: 'Amsterdam',
        country: 'NL',
        flag: '🇳🇱',
        host: 'eu.hysteria2.com',
        port: 443,
        protocol: 'hysteria2',
        password: 'password123',
        sni: 'eu.hysteria2.com',
        alpn: ['h3'],
        upMbps: 1000,
        downMbps: 1000,
        ping: 15,
        load: 60,
        isFavorite: true,
      },
      {
        id: '4',
        name: 'Asia',
        location: 'Singapore',
        country: 'SG',
        flag: '🇸🇬',
        host: 'asia.hysteria2.com',
        port: 443,
        protocol: 'hysteria2',
        password: 'password123',
        sni: 'asia.hysteria2.com',
        alpn: ['h3'],
        upMbps: 1000,
        downMbps: 1000,
        ping: 80,
        load: 20,
        isFavorite: false,
      },
    ];
  }

  private async simulateConnection(server: ServerInfo): Promise<void> {
    // Simulate connection delay
    await new Promise(resolve => setTimeout(resolve, 2000));
  }

  private async simulateDisconnection(): Promise<void> {
    // Simulate disconnection delay
    await new Promise(resolve => setTimeout(resolve, 1000));
  }

  private startStatsMonitoring(): void {
    // In a real app, this would monitor actual connection stats
    // For now, we'll just simulate it
    setInterval(() => {
      if (this.isConnected) {
        this.connectionStats = {
          upload: `${Math.floor(Math.random() * 1000 + 100)} KB/s`,
          download: `${Math.floor(Math.random() * 2000 + 500)} KB/s`,
          ping: `${Math.floor(Math.random() * 50 + 10)} ms`,
          bytesReceived: Math.floor(Math.random() * 1000000),
          bytesSent: Math.floor(Math.random() * 500000),
          connectionTime: Date.now() - this.connectionStartTime,
          serverLoad: this.currentServer?.load || 0,
        };
      }
    }, 2000);
  }

  // Hysteria2 specific methods
  public async generateHysteria2Config(server: ServerInfo): Promise<string> {
    const config = {
      server: `${server.host}:${server.port}`,
      protocol: 'hysteria2',
      password: server.password,
      sni: server.sni,
      alpn: server.alpn || ['h3'],
      ca: server.ca,
      up_mbps: server.upMbps,
      down_mbps: server.downMbps,
    };

    return JSON.stringify(config, null, 2);
  }

  public async validateHysteria2Config(config: string): Promise<boolean> {
    try {
      const parsed = JSON.parse(config);
      return !!(parsed.server && parsed.protocol === 'hysteria2');
    } catch {
      return false;
    }
  }
}
