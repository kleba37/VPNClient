export interface ServerInfo {
  id: string;
  name: string;
  location: string;
  country: string;
  flag: string;
  host: string;
  port: number;
  protocol: 'hysteria2';
  password?: string;
  ca?: string;
  sni?: string;
  alpn?: string[];
  upMbps: number;
  downMbps: number;
  ping: number;
  load: number; // 0-100
  isFavorite: boolean;
  lastUsed?: Date;
}

export interface ConnectionStats {
  upload: string;
  download: string;
  ping: string;
  bytesReceived: number;
  bytesSent: number;
  connectionTime: number;
  serverLoad: number;
}

export interface VpnConfig {
  server: ServerInfo;
  autoConnect: boolean;
  killSwitch: boolean;
  splitTunneling: boolean;
  allowedApps: string[];
  blockedApps: string[];
  dns: string[];
  mtu: number;
}
