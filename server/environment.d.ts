declare namespace NodeJS {
    export interface ProcessEnv {
      PORT?: string;
      NODE_ENV: 'development' | 'production';
      MONGO_URL: string;
      SECRET_TOKEN: string;
      REFRESH_TOKEN: string;
    }
  }