export class User {
  email: string;
  password: string;
  accessToken: string;
  refreshToken?: string;
  isActive: boolean;
}
