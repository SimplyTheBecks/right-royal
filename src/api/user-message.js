import request from '../utils/request';

export default function count() {
  return request({
    url: '/user-messages/count',
    method: 'get',
  });
}
