import HttpService from './http.service';
import type { UserLogin, UserLoginResponse } from '../interfaces/login.interface';

class LoginService {
  async login(credentials: UserLogin): Promise<UserLoginResponse> {
    const url = `?username=${encodeURIComponent(credentials.username)}&password=${encodeURIComponent(credentials.password)}`;
    return await HttpService.login<UserLoginResponse>(url);
  }
}
export default new LoginService();
