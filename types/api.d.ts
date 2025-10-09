import { ProblemItem, UserData } from "./component";

interface User {
  _id: string;
  name: string;
  email: string;
  createdAt: string;
  role: "customer" | "employee" | "admin";
  userId: string;
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

interface VerifyCodeRequest {
  code: number;
}

interface VerifyCodeResponse {
  success: boolean;
  message: string;
}

interface SetNewPasswordRequest {
  email: string;
  password: string;
  confirmPassword: string;
}

interface SetNewPasswordResponse {
  success: boolean;
  message: string;
}

interface Customer {
  _id: string;
  __v: number;
  userId: string;
  name: string;
  email: string;
  role: string;
  createdAt: string;
  addressLane1: string;
  addressLane2?: string;
  city: string;
  state: string;
  zipCode: string;
  passwordResetVerified: boolean;
}

interface GetCustomerListResponse {
  success: boolean;
  data: Customer[];
}

interface UploadImageResponse {
  success: boolean;
  fileUrl: string;
  message: string;
}

interface GetProblemListResponse {
  data: ProblemItem[];
  success: boolean;
}

interface GetLoggedInUserDataResponse {
  data: UserData;
  success: boolean;
}

interface UpdateProfileRequest {
  name?: string;
  email?: string;
  phone?: string;
  addressLane1?: string;
  addressLane2?: string;
  city?: string;
  state?: string;
  zipCode?: string;
  profileImage?: string;
}

interface UpdateProfileResponse {
  success: boolean;
  data: {
    _id: string;
    name: string;
    email: string;
    phone?: string;
    addressLane1?: string;
    addressLane2?: string;
    city?: string;
    state?: string;
    zipCode?: string;
    profileImage?: string;
    role: string;
    updatedAt: string;
  };
  message: string;
}

interface ChatMessage {
  _id: string;
  supportId: string;
  chatType: string;
  senderId: {
    _id: string;
    name: string;
    email: string;
  };
  message: string;
  readBy: string[];
  createdAt: string;
}

interface ChatHistory {
  success: boolean;
  data: {
    supportInfo: {
      id: string;
      title: string;
      status: string;
    };
    createdByInfo: {
      createdById: string;
      name: string;
      email: string;
      number: string;
    };
    messages: ChatMessage[];
  };
}
