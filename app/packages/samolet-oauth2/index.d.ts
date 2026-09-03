export interface JwtAuthParams {
  access?: string;
  refresh?: string;
  expiresIn?: number;
  [key: string]: unknown;
}

export interface AuthStorage {
  getJwtAuthParams(): JwtAuthParams | undefined;
  setJwtAuthParams(params?: JwtAuthParams): void;
  clearJwtAuthParams(): void;
}

export interface AxiosAuthInterceptorOptions {
  clientId?: string | null;
  [key: string]: unknown;
}

export declare const authStorage: AuthStorage;

export declare function setAxiosAuthInterceptor(
  axiosClient: {
    interceptors?: {
      request?: {
        use?: (handler: (config: any) => any) => unknown;
      };
    };
  },
  options?: AxiosAuthInterceptorOptions,
): unknown;
