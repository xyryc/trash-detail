interface User {
  id: string;
  name: string;
  email: string;
  createdAt: string,
  role: "customer" | "employee" | "admin";
  userId: string
}

interface LoginRequest {
  email: string;
  password: string;
}

interface LoginResponse {
  accessToken: string;
  user: User;
}

interface ForgotPasswordRequest {
  email: string;
}

interface ForgotPasswordResponse {
  success: boolean;
  message: string;
}