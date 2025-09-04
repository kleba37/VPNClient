import { ServerInfo } from './ServerInfo';

export type RootStackParamList = {
  Home: { selectedServer?: ServerInfo } | undefined;
  Servers: undefined;
  Settings: undefined;
  Connection: undefined;
  Splash: undefined;
};
