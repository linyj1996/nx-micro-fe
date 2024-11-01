import { queryParse } from '@meetyou/toolbox/lib/tools';

let { app_id } = queryParse(window.location.search);
export const userAgent = window.navigator.userAgent.toLowerCase();
export const isApp = /meetyou/.test(userAgent);
export const isIOS = /ipad|iphone|ipod/.test(userAgent);
export const isAndroid = /android/.test(userAgent);
export const isWeixin = /micromessenger/g.test(userAgent);
export const isQQ = /qq\//g.test(userAgent);
export const isWeibo = /weibo/g.test(userAgent);
export const isIphoneX =
  isIOS &&
  ((window.screen.height === 780 && window.screen.width === 360) ||
    (window.screen.width < 600 && window.screen.height >= 812));
export const isSafari = /(?=safari)(?!=mqqbrower)(?!=ucbrowser)/.test(
  userAgent
);
const iphoneVer = userAgent.match(/cpu iphone os (.*?) like mac os/);
export const iosVersion = iphoneVer ? iphoneVer[1].replace(/_/g, '.') : '';
export const isIOS9 =
  iosVersion.length === 0 ? false : iosVersion.slice(0, 2).indexOf('9.') !== -1;
export const isIOS10 =
  iosVersion.length === 0 ? false : iosVersion.slice(0, 2).indexOf('10') !== -1;
export const isFullScreen = window.innerHeight / window.innerWidth > 1.8;
export const getIsFullScreen = () =>
  window.innerHeight / window.innerWidth > 1.8;
export const getIsSmallScreen = () =>
  window.innerHeight / window.innerWidth < 1.5;
export const isMy = !!(app_id === '01' || app_id === '1');
export const isYbb = !!(app_id === '02' || app_id === '2');

// 获取版本号
const meetyouclientMatch = userAgent.match(
  /meetyouclient\/([\d.]*)([\s]+)([(]+)([\d]*)([)+])/i
);
export const meetyouclient =
  meetyouclientMatch && meetyouclientMatch[4] ? meetyouclientMatch[4] : null;
const myAppInfoMatch = userAgent.match(/MYAPPINFO([(]+)([\d\S]*)([)+])/i);
export const myAppInfo =
  myAppInfoMatch && myAppInfoMatch[2] ? myAppInfoMatch[2] : null;
let version = '';
if (myAppInfo) {
  [, , version] = myAppInfo.split('-');
} else if (meetyouclient) {
  version =
    // eslint-disable-next-line prefer-template
    meetyouclient.substring(3, 5) +
    '.' +
    meetyouclient.substring(5, 6) +
    '.' +
    meetyouclient.substring(6, 7);
}
export const appVersion = version;

// userAgent 获取app_id
if (isApp) {
  const newUseAgent = userAgent.split('(');
  const finalUseAgent = newUseAgent[newUseAgent.length - 1] || '';
  if (!app_id) {
    app_id = finalUseAgent.substr(0, 2);
  }
}

let curAppId = 7;

if (isWeixin) {
  curAppId = 4;
} else if (isWeibo) {
  curAppId = 5;
} else if (isQQ) {
  curAppId = 6;
} else if (app_id === '01' || app_id === '1') {
  curAppId = 1;
} else if (app_id === '02' || app_id === '2') {
  curAppId = 2;
} else if (app_id === '03' || app_id === '3') {
  curAppId = 3;
} else if (app_id === '19') {
  curAppId = 19;
} else if (app_id === '23') {
  curAppId = 23;
}

const appId = curAppId;

export { appId };
