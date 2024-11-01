// 根据当前url判断页面处于哪个环境,返回相应前缀
export function getEnvPrefix() {
  const host = location.host;
  if (/^4200/.test(host)) {
    return 'test-';
  }
  if (/^test/.test(host)) {
    return 'test-';
  }
  if (/^yf-/.test(host)) {
    return 'yf-';
  }
  return '';
}
