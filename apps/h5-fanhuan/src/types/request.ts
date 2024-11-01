import type { AxiosRequestConfig } from 'axios';

export interface CommonAxiosInstance {
  request<T = void>(config: AxiosRequestConfig): Promise<T>
  get<T = void>(url: string, config?: AxiosRequestConfig): Promise<T>
  delete<T = void>(url: string, config?: AxiosRequestConfig): Promise<T>
  head<T = void>(url: string, config?: AxiosRequestConfig): Promise<T>
  post<T = void>(
    url: string,
    data?: unknown,
    config?: AxiosRequestConfig
  ): Promise<T>
  put<T = void>(
    url: string,
    data?: unknown,
    config?: AxiosRequestConfig
  ): Promise<T>
  patch<T = void>(
    url: string,
    data?: unknown,
    config?: AxiosRequestConfig
  ): Promise<T>
}
