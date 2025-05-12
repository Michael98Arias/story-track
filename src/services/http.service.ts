import type { AxiosInstance, AxiosResponse, AxiosError, InternalAxiosRequestConfig } from 'axios';
import axios, { AxiosHeaders } from 'axios';
import { HttpErrorFactory } from '../interfaces/http.interface';
import { envUsersUrl, envTasksUrl } from '../shared/constants/Environment';

class HttpService {
  private httpAuth: AxiosInstance;
  private httpTasks: AxiosInstance;

  constructor() {
    this.httpAuth = axios.create({
      baseURL: envUsersUrl,
      headers: {
        'Content-Type': 'application/json',
      },
    });

    this.httpTasks = axios.create({
      baseURL: envTasksUrl,
      headers: {
        'Content-Type': 'application/json',
      },
    });

    this.setupInterceptors(this.httpAuth);
    this.setupInterceptors(this.httpTasks);
  }

  private getAccessToken(): string | null {
    return localStorage.getItem('apiKey');
  }

  private setupInterceptors(instance: AxiosInstance): void {
    instance.interceptors.request.use((request: InternalAxiosRequestConfig) => {
      const accessToken = this.getAccessToken();

      if (accessToken) {
        request.headers = new AxiosHeaders(request.headers).set(
          'Authorization',
          `Bearer ${accessToken}`,
        );
      }

      return request;
    });

    instance.interceptors.response.use(
      (response: AxiosResponse) => response.data,
      (error: AxiosError) => {
        const httpError = HttpErrorFactory.fromAxiosError(error);
        const rejectionError = new Error(httpError.message);
        rejectionError.name = 'HttpError';
        Object.assign(rejectionError, httpError);

        return Promise.reject(rejectionError);
      },
    );
  }

  public async login<T>(url: string, config?: InternalAxiosRequestConfig): Promise<T> {
    return this.httpAuth.get<T, T>(url, config);
  }
  public async getTasks<T>(url: string, config?: InternalAxiosRequestConfig): Promise<T> {
    return this.httpTasks.get<T, T>(url, config);
  }

  public async postTask<T, K>(
    url: string,
    data?: K,
    config?: InternalAxiosRequestConfig,
  ): Promise<T> {
    return this.httpTasks.post<T, T>(url, data, config);
  }

  public async putTask<T, K>(
    url: string,
    data?: K,
    config?: InternalAxiosRequestConfig,
  ): Promise<T> {
    return this.httpTasks.put<T, T>(url, data, config);
  }

  public async deleteTask<T>(url: string, config?: InternalAxiosRequestConfig): Promise<T> {
    return this.httpTasks.delete<T, T>(url, config);
  }
}

export default new HttpService();
