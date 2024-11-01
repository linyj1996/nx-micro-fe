import axios from 'axios';
import type { AxiosRequestConfig, AxiosResponse } from 'axios';
import { domainGroup } from './domain.config';
import { isMeetyouWebview, fetchUrl } from '@fanhuan/shared';

// 添加响应拦截器
axios.interceptors.response.use(
  (response) => {
    if (response.data) {
      const { data } = response;

      if (data.status !== undefined && !data.status) {
        return Promise.reject(new Error(data.msg));
      }
      if (data.code !== undefined && data.code !== 0) {
        return Promise.reject(new Error(data.message));
      }
      return data;
    }
    return {};
  },
  (error) => {
    const { data, status } = error.response ?? {};

    if (status === 400 || status === 401) {
      return Promise.reject(new Error(data.msg || data.message));
    }
    return Promise.reject(error);
  }
);

// 统一封装配置参数
function wrapOpts(options: AxiosRequestConfig) {
  const { url, method, ...rest } = options;
  const isCrossDomain = !!location.host.match('fanhuan.com');
  const targetDomain = domainGroup.find((item) => url?.includes(item.key));
  const finalUrl = url?.match(/^http[s]?:\/\/|\/\//)
    ? url
    : isCrossDomain
    ? `${targetDomain?.path}${url}`.replace(targetDomain?.key || '', '')
    : location.protocol + '//' + location.host + url;
  return {
    ...rest,
    method: (method || 'get').toLocaleLowerCase(),
    url: finalUrl,
  };
}
function requestNative(options: AxiosRequestConfig) {
  console.log(options);
  return fetchUrl(options) as Promise<AxiosResponse & { msg?: string }>;
}

export async function request(
  options: AxiosRequestConfig
): Promise<AxiosResponse & { msg?: string }> {
  if (!options.url) {
    return Promise.reject(new Error('缺少请求链接'));
  }
  if (isMeetyouWebview) {
    return requestNative(options);
  } else {
    return axios.request(wrapOpts(options));
  }
}
