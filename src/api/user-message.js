import request from '../utils/request';

export default function count() {
  return request({
    url: 'api/user-messages/count',
    method: 'get',
  });
}
