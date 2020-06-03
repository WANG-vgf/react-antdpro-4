import request from '@/utils/request';

export async function query(): Promise<any> {
  return request('/users');
}

export async function queryCurrent(): Promise<any> {
  return request('/currentUser');
}

export async function queryNotices(): Promise<any> {
  return request('/notices');
}

export async function getMenu(): Promise<any> {
  return request('/base/v1/basemenu/getmenu', {
    method: 'POST'
  });
}
