import request from '@/utils/request';
import Qs from 'qs'

export async function getFinanceList(page: number) {
  return request('/store/v1/storebankcard/list', {
    method: 'POST',
    data: Qs.stringify(page),
  });
}
