import Fly from 'flyio/dist/npm/wx';
import LRU from 'lru-cache';
import qs from 'querystring';

/* eslint-disable */
const cache = new LRU({
  max: 500,
  length: function (n, key) {
    return n * 2 + key.length;
  },
  dispose: function (key, n) {
    n.close();
  },
  maxAge: 1000 * 60 * 60,
});
/* eslint-enable */
const fly = new Fly();
if (process.env.NODE_ENV === 'development') {
  fly.config.baseURL = 'http://www.kaoyaya.com';
} else {
  fly.config.baseURL = 'https://www.kaoyaya.com';
}
/**
 *
 * @param {object} config
 * @returns {*|Promise<any[]>}
 */
const xhr = function (config) {
  const cfg      = config;
  const search   = qs.stringify(cfg.params || cfg.data);
  const cacheKey = search ? `${cfg.url}?${search}` : cfg.url;
  const value    = cache.get(cacheKey);
  if (cfg.cache && value) {
    return Promise.resolve(value);
  }
  return fly.request(cfg.url, search, config).then((res) => {
    const data = res.data;
    if (cfg.cache) {
      if (cfg.cache.filter) {
        if (cfg.cache.filter(data)) {
          cache.set(cacheKey, data);
        }
      } else {
        cache.set(cacheKey, data);
      }
    }

    if (data.code !== 200) {
      wx.showToast({
        title: data.msg || data.message || '获取数据失败',
        icon: 'none',
      });
    }
    return data;
  });
};
export default xhr;
