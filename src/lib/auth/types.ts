interface LoginResponse {
  status: string;
  message: string;
  data: {
    accessToken: string;
    refreshToken: string;
    expireAt: number;
    isAdmin: boolean;
  };
}
