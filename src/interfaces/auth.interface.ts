import type { UserRole } from '../enums/role.enum';

export interface AuthState {
  authenticated: boolean;
  role: UserRole;
}
