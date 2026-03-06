import { baseApiService } from "../baseApiService";
import { authRoutes } from "../api-routes";

export class AuthService {
  private static instance: AuthService;

  public static getInstance(): AuthService {
    if (!AuthService.instance) {
      AuthService.instance = new AuthService();
    }
    return AuthService.instance;
  }

  public async login(payload: LoginRequestDTO): Promise<LoginResponseDTO> {
    return baseApiService.post<LoginResponseDTO>(
      authRoutes.guest.login(),
      payload,
      { requireAuth: false },
    );
  }
  public async register(
    payload: RegisterRequestDto,
  ): Promise<RegisterResponseDTO> {
    return baseApiService.post<RegisterResponseDTO>(
      authRoutes.guest.register(),
      payload,
      { requireAuth: false },
    );
  }
}
export const authservice = AuthService.getInstance();

interface LoginResponseDTO {
  authToken: string;
  userid: string;
}
interface LoginRequestDTO {
  email: string;
  password: string;
}
interface RegisterRequestDto {
  username: string;
  email: string;
  password: string;
}
interface RegisterResponseDTO {
  authToken: string;
  userid: string;
}
