export interface TokenResponse {
  clientId: string;
  keyspace: string;
  scopes: string[];
  accessToken: string;
  expiresIn: number;
}

export interface ValidationResponse {
  valid: boolean;
}
