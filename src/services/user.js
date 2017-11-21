import { stringify } from 'qs';
import { config,request,request2 } from '../utils';

export async function query() {
  return request('/api/users');
}

export async function queryCurrent() {
  return request('/api/currentUser');
}
