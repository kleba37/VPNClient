import {ServerInfo, ConnectionStats, VpnConfig} from '../types/ServerInfo';

export interface VpnServiceInterface {
  connect(server: string): Promise<void>;
  disconnect(): Promise<void>;
  isConnected(): boolean;
  getStatus(): string;
}

class VpnService implements VpnServiceInterface {
  private connected = false;
  private currentServer = '';

  async connect(server: string): Promise<void> {
    this.currentServer = server;
    this.connected = true;
    console.log(`Connected to ${server}`);
  }

  async disconnect(): Promise<void> {
    this.connected = false;
    this.currentServer = '';
    console.log('Disconnected');
  }

  isConnected(): boolean {
    return this.connected;
  }

  getStatus(): string {
    return this.connected ? 'Connected' : 'Disconnected';
  }
}

export default new VpnService();
