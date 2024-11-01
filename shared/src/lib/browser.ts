const UA = window.navigator.userAgent;

export const isAndroid = /Android/i.test(UA);
export const isIOS = /iPhone|iPad|iPod/i.test(UA);
export const isHarmony = /OpenHarmony/i.test(UA);
export const isMeetyouWebview = /MeetYouClient/i.test(UA);
export const isWechat = /MicroMessenger/i.test(UA);
export const isQQ = isIOS
  ? /QQ|Qzone/i.test(UA) && !/MQQBrowser/i.test(UA)
  : /MQQBrowser/i.test(UA);
