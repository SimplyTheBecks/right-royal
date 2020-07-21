import request from '../utils/request';

export default function count() {
  return request({
    url: '/user-notifications/count',
    method: 'get',
  });
}
