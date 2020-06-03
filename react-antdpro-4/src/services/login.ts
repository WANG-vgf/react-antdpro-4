import request from '@/utils/request';
import Qs from 'qs'
export interface LoginParamsType {
  username: string;
  password: string;
  // mobile: string;
  // captcha: string;
}

export async function fakeAccountLogin(params: LoginParamsType) {
  return request('/admin/login/token', {
    method: 'POST',
    data: Qs.stringify(params),
  });
}

export async function getFakeCaptcha (mobile: string) {
  return request(`/api/login/captcha?mobile=${mobile}`);
}
