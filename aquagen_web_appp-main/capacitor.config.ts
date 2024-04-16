import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.fluxgen.texgenv2',
  appName: 'FG Water',
  webDir: 'build',
  server: {
    androidScheme: 'https'
  }
};

export default config;
