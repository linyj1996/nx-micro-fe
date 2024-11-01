/* eslint-disable @typescript-eslint/no-unsafe-function-type */
import * as jssdk from '@meetyou/toolbox/lib/jssdk';
import {
  isiOS,
  isWechat,
  isMeetyouWebview,
} from '@meetyou/toolbox/lib/browser';
import { appId } from './platform';
// import { wxshare } from '@meetyou/toolbox/lib/wxshare';
// import awake from './awake';
// import { changeRefreshHeadersStatus } from './request';

// core
export const { callNative } = jssdk;
export const { listenEvent } = jssdk;
// get
export const { getAppInfo } = jssdk;
export const { getUserInfo } = jssdk;
export const { getNetworkType: getNetInfo } = jssdk;
// listen
// export const { onnetworkchange : onNetworkChange } : {onnetworkchange: any}= jssdk;
export const { onpagehide: onPageHide } = jssdk;
export const { onpageshow: onPageShow } = jssdk;
export const { openTopic: openCircleTopic } = jssdk;
export const { openLogin } = jssdk;
// tool
export const { showToast } = jssdk;
// ga

/**
 * 在微信内部才引入分享方法
 * @returns {Promise<boolean>} A Promise that resolves to a boolean indicating if the user is logged in.
 */
const importWxshare = () => {
  return import('@meetyou/toolbox/lib/wxshare');
};

/**
 * 验证是否登录
 *
 * @return {Promise<boolean>} A Promise that resolves to a boolean indicating if the user is logged in.
 */
function isLogon() {
  return getUserInfo().then(function (userInfo) {
    return userInfo.hasLogin;
  });
}
/**
 * @description 设置顶部导航栏右侧按钮
 */
function setTopBarRightButton(
  params: jssdk.ISdkParams,
  callback: jssdk.SdkRawCallback<any> | undefined
) {
  listenEvent('topbar/rightButton', params, callback);
}
/**
 * @description 打开返还webview页面
 */
function openFhWeb(params: jssdk.ISdkParams | undefined) {
  callNative('fh/ebweb', params);
}

/**
 * @description 设置顶部导航栏标题
 */
function setTopbarTitle(title: string) {
  callNative('topbar/title', {
    title,
  });
}
/**
 * @description 打开分享
 */
export function openShare(
  params: jssdk.ISdkParams | undefined,
  callback: jssdk.SdkRawCallback<any> | undefined
) {
  callNative('share/do', params, callback);
}
/**
 * @description 设置顶部导航标题
 */
export function setTitle(title: string) {
  if (isMeetyouWebview && isiOS) {
    setTopbarTitle(title);
  } else {
    document.title = title;
  }
}

/**
 * @description 设置开启/关闭 右滑返回功能app内
 */
export function setPopGesture(enable = false) {
  if (isMeetyouWebview) {
    callNative('popGesture', {
      enable: enable ? 1 : 0,
    });
  }
}

/**
 * @description 设置开启/关闭 下拉刷新功能
 */
export function setPullRefresh(enable = false) {
  if (!isMeetyouWebview) return;
  if (enable) {
    callNative('pullRefresh/open');
  } else {
    callNative('pullRefresh/close');
  }
}

/**
 * @description 打开页面
 */
export function openFhWebpage(params: jssdk.ISdkParams) {
  if (isMeetyouWebview) {
    openFhWeb(params);
  } else {
    window.location.href = params.url;
  }
}

/**
 * @description 设置app内右上角分享
 */
export function setShareInApp({
  title,
  content,
  imageURL,
  fromURL,
  clickCallback,
  callback,
}: {
  title: string;
  content: string;
  imageURL: string;
  fromURL: string;
  clickCallback?: Function;
  callback?: Function;
}) {
  setTopBarRightButton(
    {
      title: '分享',
    },
    () => {
      if (typeof clickCallback === 'function') {
        clickCallback();
      }

      if (isMeetyouWebview && isiOS) {
        const inputs = Array.from(document.querySelectorAll('input,textarea'));

        if (inputs.length > 0) {
          inputs.forEach((input) => (input as HTMLElement).blur());
        }
      }
      openShare(
        {
          title,
          content,
          imageURL,
          fromURL,
          mediaType: 0,
        },
        (_path, data) => {
          if (!!data.success && typeof callback === 'function') {
            callback();
          }
        }
      );
    }
  );
}

/**
 * @description 设置分享app内和微信
 */
export async function setShare({
  title,
  content,
  imageURL,
  fromURL,
  clickCallback,
  appCallback,
  wxCallback,
}: {
  title: string;
  content: string;
  imageURL: string;
  fromURL: string;
  clickCallback?: Function;
  appCallback?: Function;
  wxCallback?: Function;
}) {
  if (isMeetyouWebview) {
    setShareInApp({
      title,
      content,
      imageURL,
      fromURL,
      clickCallback,
      callback: appCallback,
    });
  }
  if (isWechat) {
    const { wxshare } = await importWxshare();
    wxshare(
      {
        title,
        desc: content,
        link: fromURL,
        imgUrl: imageURL,
      },
      () => {
        if (typeof wxCallback === 'function') {
          console.log('微信分享成功');
          wxCallback();
        }
      }
    );
  }
}
/**
 * @description 检查是否登录
 */
export async function checkLoginStatus(options: jssdk.ISdkParams) {
  if (!(await isLogon())) {
    // changeRefreshHeadersStatus(true);
    openLogin(options);
    return false;
  }
  return true;
}

/**
 * @description 检查用户是否有权限
 */
export const checkUserAuth = (() => {
  let isLogin = false;
  return async ({ requireLogin = true, requireIsApp = true } = {}) => {
    if (!isMeetyouWebview) {
      if (requireIsApp) {
        // todo
        // awake();
        return false;
      }
      return true;
    }
    if (isLogin) {
      return true;
    }
    if (requireLogin && (await checkLoginStatus({ noreload: 0 }))) {
      isLogin = true;
      return true;
    }
    return false;
  };
})();

/**
 * 打开小程序
 *
 * @param {number} id - 小程序Id
 * @param {string} path - 小程序链接.
 */
export function openWxMiniProgram(id: string, path: string) {
  if (isMeetyouWebview) {
    callNative('toast/show', { text: '即将离开美柚\n打开“微信小程序”' });
    if (id) {
      setTimeout(() => {
        callNative('weixin/invokeMiniprogram', {
          user_name: id.replace(/^\s+|\s+$/g, ''),
          path: path.replace(/^\s+|\s+$/g, ''),
        });
      }, 1500);
    } else {
      callNative('toast/show', { text: '缺少微信小程序id' });
    }
  } else {
    checkUserAuth();
  }
}

/**
 * 通过客户端协议请求接口,header等信息客户端会自动添加
 */
export function fetchUrl(opts: {
  url?: string;
  method?: string;
  params?: object;
  headers?: object;
}) {
  opts = opts || {};
  opts.url = (opts.url || '').match(/^http[s]?:\/\/|\/\//)
    ? opts.url
    : location.protocol + '//' + location.host + (opts.url || '');
  opts.method = (opts.method || 'get').toLocaleLowerCase();
  opts.params = opts.params || {};
  opts.headers = opts.headers || {};

  // 会根据 method 来自动判断 params 放在哪里，get 放 url 上， post 放 body 中  默认 json，
  // 如果 headers 中带有 Content-Type：application/x-www-form-urlencoded 会采用form表单格式
  const routeUrl = appId !== 23 && isiOS ? 'fh/eco/fetchurl' : 'eco/fetchurl';
  return new Promise((resolve, reject) => {
    callNative(
      routeUrl,
      {
        url: opts.url,
        method: opts.method,
        params: opts.params,
        Concurrent: true, // 这个参数是为了兼容Android并发请求
        headers: opts.headers, // 'Content-Type': 'application/x-www-form-urlencoded'
      },
      function (path: string, res: any) {
        if (typeof res === 'string') {
          res = JSON.parse(res); // Android机型，返回数据类型可能是字符串，需要解析成为对象
        }

        if (res?.status === 'false') {
          // 兼容iOS返回数据，状态字段写成字符串false情况
          res.status = false;
        }

        if (res.status) {
          resolve(res.data);
        } else {
          reject(res); // 客户端端约20秒左右会超时
        }
      }
    );
  });
}
