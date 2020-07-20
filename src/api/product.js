import request from '../utils/request';

export default function all() {
  return request({
    url: 'api/products',
    method: 'get',
  });
}
