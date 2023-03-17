declare global {
  namespace NodeJS {
    interface ProcessEnv {
      MYSQL_USER: string;
      MYSQL_PASSWORD: string;
      MYSQL_ROOT_PASSWORD: string;
      DATABASE_URL: string;
      JWT_SECRET: string;
    }
  }
}

export {}
