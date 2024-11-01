const host = location.host || 'localhost:4200';

let tqApi = 'https://tequan.seeyouyima.com';
let subApi = 'https://sub.seeyouyima.com';

if(/^4200/.test(host) || /^test/.test(host)) {
  tqApi = 'https://test-tequan.seeyouyima.com';
  subApi = 'https://test-sub.seeyouyima.com';
} else if(/^yf-/.test(host)) {
  tqApi = 'https://yf-tequan.seeyouyima.com';
  subApi = 'https://yf-sub.seeyouyima.com';
}

export const domainTypeList = ['/tq-api', '/sub-api'];

export const domainGroup = [
  {
    key: '/tq-api',
    path: tqApi
  },
  {
    key: '/sub-api',
    path: subApi
  }
]
