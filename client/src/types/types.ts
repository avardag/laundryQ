export interface ApiErrorResponse {
  status: "error" | "fail";
  message: string;
}

export interface ApiResponse {
  status: "success" | "error" | "fail";
}
export interface DeletedResponse extends ApiResponse {
  data: {
    deletedId: number;
  };
}
// enum Roles {
//   user = "user",
//   moderator = "moderator",
//   admin = "admin",
//   superuser = "superuser",
// }
export interface User {
  firstName: string;
  lastName: string;
  isActivated: boolean;
  phone: string;
  email: string;
  id: number;
  accessToken: string;
  role: "user" | "moderator" | "admin" | "superuser";
  city: string;
  address: string;
  laundryId: number | null;
  postcode: string;
}
export interface UpdateUserRequest {
  id: number;
  laundryId?: number;
  firstName?: string;
  lastName?: string;
  phone?: string;
  email?: string;
  city?: string;
  address?: string;
  postcode?: string;
}

export interface AuthApiResponse extends ApiResponse {
  user: User;
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
  city: string;
  address: string;
  postcode: string;
}
