declare module 'react-native-config' {
  export interface NativeConfig {
    API_KEY?: string;
    BASE_URL?: string;
  }

  export const Config: NativeConfig;
  export default Config;
}
