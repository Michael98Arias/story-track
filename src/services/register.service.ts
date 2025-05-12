import type { UserRegister, UserRegisterResponse } from 'src/interfaces/register.interface';
import HttpService from './http.service';

class RegisterService {
  async register(credentials: UserRegister): Promise<UserRegisterResponse> {
    const url = '';
    return await HttpService.register<UserRegisterResponse, UserRegister>(url, credentials);
  }
}

export default new RegisterService();
