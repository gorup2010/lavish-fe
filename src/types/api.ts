export type AuthResponse = {
  id: number;
  username: string;
  accessToken: string;
};

export type RefreshResponse = {
  accessToken: string;
};

export type ErrorResponse = {
  code: number;
  message: string;
}