import request from '../utils/request';

export default function count() {
  return request({
    url: 'api/user-notifications/count',
    method: 'get',
  });
}
