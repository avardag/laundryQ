export interface ApiErrorResponse {
  status: "error" | "fail";
  message: string;
}

export interface ApiResponse {
  status: "success" | "error" | "fail";
}
export interface User {
  firstName: string;
  lastName: string;
  isActivated: boolean;
  phone: string;
  email: string;
  id: number;
}
export interface Tokens {
  accessToken: string;
  refreshToken: string;
}

export interface AuthData {
  user: User;
  tokens: Tokens;
}
export interface AuthApiResponse extends ApiResponse {
  data: AuthData;
}

export interface UsersApiResponse extends ApiResponse {
  data: {
    users: User[];
  };
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface SignupRequest extends LoginRequest {
  firstName: string;
  lastName: string;
  passwordConfirm: string;
  phone: string;
}
