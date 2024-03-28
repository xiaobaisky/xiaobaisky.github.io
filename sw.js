/*
 * @Description: sw
 * @Author: 安知鱼
 * @Email: 2268025923@qq.com
 * @Date: 2022-02-22 11:23:58
 * @LastEditTime: 2022-03-08 12:24:30
 * @LastEditors: 安知鱼
 */
const workboxVersion = "6.5.4";

importScripts(`https://storage.googleapis.com/workbox-cdn/releases/${workboxVersion}/workbox-sw.js`);

workbox.core.setCacheNameDetails({
  prefix: "Haisky",
});

workbox.core.skipWaiting();

workbox.core.clientsClaim();

// 注册成功后要立即缓存的资源列表
// 具体缓存列表在gulpfile.js中配置，见下文
workbox.precaching.precacheAndRoute([{"revision":"e664748a85d70b8117ed2d73996bedf6","url":"./404.html"},{"revision":"f698bc5cfb9ba7ada2f99753656e10f3","url":"./index.html"},{"revision":"142706edefa96841ddce336906b4e282","url":"./js/main.js"},{"revision":"4e9fbb85c6f9c98dfe34fd6997ef0cab","url":"./css/index.css"}], {
  directoryIndex: null,
});

// 清空过期缓存
workbox.precaching.cleanupOutdatedCaches();

// 图片资源（可选，不需要就注释掉）
// workbox.routing.registerRoute(
//   /\.(?:png|jpg|jpeg|gif|bmp|webp|svg|ico)$/,
//   new workbox.strategies.CacheFirst({
//     cacheName: 'images',
//     plugins: [
//       new workbox.expiration.ExpirationPlugin({
//         maxEntries: 1000,
//         maxAgeSeconds: 60 * 60 * 24 * 30,
//       }),
//       new workbox.cacheableResponse.CacheableResponsePlugin({
//         statuses: [0, 200],
//       }),
//     ],
//   })
// )

// 字体文件（可选，不需要就注释掉）
workbox.routing.registerRoute(
  /\.(?:eot|ttf|woff|woff2)$/,
  new workbox.strategies.CacheFirst({
    cacheName: "fonts",
    plugins: [
      new workbox.expiration.ExpirationPlugin({
        maxEntries: 1000,
        maxAgeSeconds: 60 * 60 * 24 * 30,
      }),
      new workbox.cacheableResponse.CacheableResponsePlugin({
        statuses: [0, 200],
      }),
    ],
  })
);

// 谷歌字体（可选，不需要就注释掉）
//workbox.routing.registerRoute(
//  /^https:\/\/fonts\.googleapis\.com/,
//  new workbox.strategies.StaleWhileRevalidate({
//    cacheName: "google-fonts-stylesheets",
//  })
//);
//workbox.routing.registerRoute(
 // /^https:\/\/fonts\.gstatic\.com/,
//  new workbox.strategies.CacheFirst({
 //   cacheName: "google-fonts-webfonts",
 //   plugins: [
 //     new workbox.expiration.ExpirationPlugin({
 //       maxEntries: 1000,
  //      maxAgeSeconds: 60 * 60 * 24 * 30,
  //    }),
 //     new workbox.cacheableResponse.CacheableResponsePlugin({
  //      statuses: [0, 200],
 //     }),
 //   ],
 // })
//);

// jsdelivr的CDN资源（可选，不需要就注释掉）
// workbox.routing.registerRoute(
//   /^https:\/\/cdn\.jsdelivr\.net/,
//   new workbox.strategies.CacheFirst({
//     cacheName: 'static-libs',
//     plugins: [
//       new workbox.expiration.ExpirationPlugin({
//         maxEntries: 1000,
//         maxAgeSeconds: 60 * 60 * 24 * 30,
//       }),
//       new workbox.cacheableResponse.CacheableResponsePlugin({
//         statuses: [0, 200],
//       }),
//     ],
//   })
// )

workbox.googleAnalytics.initialize();