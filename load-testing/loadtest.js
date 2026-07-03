import http from 'k6/http';
import { sleep, check } from 'k6';

export const options = {
  vus: 20,
  duration: '30s',
};

export default function () {

  let res = http.get('http://13.126.71.168');

  check(res, {
    'status is 200': (r) => r.status === 200,
  });

  sleep(1);
}