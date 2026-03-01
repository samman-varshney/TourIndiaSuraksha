import { UserRole } from '../../enums/UserRole';

/** Request body sent to the login endpoint */
export interface LoginRequestDto {
  email: string;
  password: string;
}

/** Response shape received from the login endpoint */
export interface LoginResponseDto {
  token: string;
  refreshToken: string;
  user: {
    id: string;
    name: string;
    email: string;
    role: UserRole;
  };
}

/** Request body sent to the register endpoint */
export interface RegisterRequestDto {
  name: string;
  email: string;
  password: string;
  role: UserRole;
}

/** Request body for password reset initiation */
export interface ForgotPasswordRequestDto {
  email: string;
}
