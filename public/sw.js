if(!self.define){const e=e=>{"require"!==e&&(e+=".js");let s=Promise.resolve();return a[e]||(s=new Promise(async s=>{if("document"in self){const a=document.createElement("script");a.src=e,document.head.appendChild(a),a.onload=s}else importScripts(e),s()})),s.then(()=>{if(!a[e])throw new Error(`Module ${e} didn’t register its module`);return a[e]})},s=(s,a)=>{Promise.all(s.map(e)).then(e=>a(1===e.length?e[0]:e))},a={require:Promise.resolve(s)};self.define=(s,c,i)=>{a[s]||(a[s]=Promise.resolve().then(()=>{let a={};const r={uri:location.origin+s.slice(1)};return Promise.all(c.map(s=>{switch(s){case"exports":return a;case"module":return r;default:return e(s)}})).then(e=>{const s=i(...e);return a.default||(a.default=s),a})}))}}define("./sw.js",["./workbox-432e0d0b"],(function(e){"use strict";importScripts(),e.skipWaiting(),e.clientsClaim(),e.precacheAndRoute([{url:"/_next/static/-4LDEV0BQPPuKOzIa2Rg9/_buildManifest.js",revision:"4cf6ae5da133769568b70d5f1f0fae1b"},{url:"/_next/static/-4LDEV0BQPPuKOzIa2Rg9/_ssgManifest.js",revision:"abee47769bf307639ace4945f9cfd4ff"},{url:"/_next/static/-4LDEV0BQPPuKOzIa2Rg9/pages/App.js",revision:"54c8d7fa0e73c0d60194fc24bb3c27bc"},{url:"/_next/static/-4LDEV0BQPPuKOzIa2Rg9/pages/_app.js",revision:"a7bd228b3d3c746d3701cd6d0100e081"},{url:"/_next/static/-4LDEV0BQPPuKOzIa2Rg9/pages/_error.js",revision:"1d1788e44afcc656cafc6c6928a1bb8c"},{url:"/_next/static/-4LDEV0BQPPuKOzIa2Rg9/pages/accountPage.js",revision:"f5784599b0643ca6e43e43f655456458"},{url:"/_next/static/-4LDEV0BQPPuKOzIa2Rg9/pages/enter.js",revision:"94e33d4d9504ad1e13c530f5072cb06a"},{url:"/_next/static/-4LDEV0BQPPuKOzIa2Rg9/pages/index.js",revision:"e4de02eb05314e97ace8ec13e736ff03"},{url:"/_next/static/-4LDEV0BQPPuKOzIa2Rg9/pages/navbar.js",revision:"2dc604fffcfac7a7788b89cadfeebe99"},{url:"/_next/static/-4LDEV0BQPPuKOzIa2Rg9/pages/newProject.js",revision:"e2aa850af368566a63f65d5603c4c77f"},{url:"/_next/static/-4LDEV0BQPPuKOzIa2Rg9/pages/project.js",revision:"3685a084a720375f2799519015e024f5"},{url:"/_next/static/-4LDEV0BQPPuKOzIa2Rg9/pages/projectdisplay.js",revision:"fba565f7450ff7c0d4db21cf47f72487"},{url:"/_next/static/-4LDEV0BQPPuKOzIa2Rg9/pages/queriedResults.js",revision:"b19a4578ed16f3f27494e7183699670b"},{url:"/_next/static/-4LDEV0BQPPuKOzIa2Rg9/pages/updateProject.js",revision:"ecfaf086f1a5fa3f04ae62ff0c57f2b9"},{url:"/_next/static/chunks/18617663e4508104f6f43e3edf6d66025c5ec047.d5966b69da28ad4a50ac.js",revision:"5359101502e35a91060b589fb6f6739d"},{url:"/_next/static/chunks/19796813cfb04d9fdc869429454a05064b2bf06e.ddebc3e5c485fc7ddb7b.js",revision:"6e16341e12751c3c04c2c6cb575bb7e2"},{url:"/_next/static/chunks/a45f33d1f2301239df1673699813c4e9d0f7ed7f.8ae6bfc229ebd25949b6.js",revision:"55d8dddc81b3b323473ded2e80220173"},{url:"/_next/static/chunks/commons.cd9ca553a70fe5f8c3dd.js",revision:"5b4e704c66f64aebc4ecd3ff47aeef83"},{url:"/_next/static/chunks/framework.e84fa698c7ee940652bd.js",revision:"0b711c3e02b0095b778e8d3a6cd216d2"},{url:"/_next/static/css/09e8f3c4650746734b89.css",revision:"730128833c0bfdd91990d5ff271a22b8"},{url:"/_next/static/css/10232154543c9d5b4e82.css",revision:"8516a3ce65149875e912835451137cd3"},{url:"/_next/static/css/231b95746b711ad529dd.css",revision:"126f231ad1d2456abfc9e0e22e03733f"},{url:"/_next/static/css/3c68fc67240308fecf08.css",revision:"579a5bbb366d022a6290f0c1e9d5f64d"},{url:"/_next/static/css/b1c3acbc2cbf9d89d1d2.css",revision:"d5c3151a591e347b7da518385304db5d"},{url:"/_next/static/css/c1be4d2bb886ab9a80ab.css",revision:"d7aacaaf0ed2b2e3a2003a06abda9df7"},{url:"/_next/static/css/d92d28d40f830723651c.css",revision:"6ac6fc78c8c7b1912cf27840a5c0279d"},{url:"/_next/static/runtime/main-454f56f7d2f62f59fded.js",revision:"047abb96f0ab8ddd71f1d4daf8f9b67d"},{url:"/_next/static/runtime/polyfills-db3eeaf8fbc6db3a50d4.js",revision:"cf3e362240114c40790b57c8ebecab35"},{url:"/_next/static/runtime/webpack-c212667a5f965e81e004.js",revision:"f5e6e2fca3144cc944812cfa3547f475"},{url:"/betalogo144.png",revision:"a7a3226a2c2dc958a46a3117ac5dbd63"},{url:"/betalogo144.svg",revision:"6e56e644ffc684681ba390ad657a25d8"},{url:"/betalogo192.png",revision:"75ec7c9424bb03704f4896875cce2914"},{url:"/betalogo192.svg",revision:"d468e608feefd060a47daec3fc095f73"},{url:"/betalogo512.png",revision:"973f5790d05da0ea4ecc50117c42caeb"},{url:"/betalogo512.svg",revision:"8916e01493d274d246f936aab65eb06c"},{url:"/book.svg",revision:"6ce80fd7ac9c7d18c2730940bc3a2679"},{url:"/components.js",revision:"b9ce9c7232e92342b5b065dec3b7f827"},{url:"/delete.svg",revision:"5d27f4107b5b7ab23707c797845acb39"},{url:"/edit.svg",revision:"58aa6ff715f8d8ad72468d90662d264d"},{url:"/favicon.ico",revision:"21b739d43fcb9bbb83d8541fe4fe88fa"},{url:"/favorite.svg",revision:"a9555272bb5f2dcabc7a687472958bbc"},{url:"/login.svg",revision:"72f026d17040b1753a751ab436a2e10e"},{url:"/manifest.json",revision:"129c83ae435cdddf6ac3f99a06ac026a"},{url:"/maskable_icon.png",revision:"a79c89d7d7ac7f2307c60be543a3a395"},{url:"/me.jpg",revision:"a01962489584b79c76f09a7b6cdb7185"},{url:"/navpreview.svg",revision:"e5c24d6e07ad735bf1de48df22d043f9"},{url:"/notification.svg",revision:"3d5c1f01c5dbc3d1165ba23298493634"},{url:"/offline.svg",revision:"48d2b661b256fe0c47f6556576720339"},{url:"/plus.svg",revision:"f6fa9561e4ccbf8410f352f4569249c5"},{url:"/projects.js",revision:"3cb233bf06fb2ec68258490fab1619ed"},{url:"/queriedResults.js",revision:"32c7523a432ed2ea6381775dd6f51336"},{url:"/save.svg",revision:"5f90b927374175a85f843ca8575f6c74"},{url:"/search (copy 1).svg",revision:"94b9b669316e4dab26f9bc16acf5b2fd"},{url:"/search.png",revision:"6adca9ed29c9614166563698bb6af702"},{url:"/search.svg",revision:"96214ef666e6e31c31fe5ca962993f8c"},{url:"/settings.svg",revision:"0555b69a698b1e938cd97cfc06d214a7"},{url:"/updateProject(with_localStorage).js",revision:"1c0e3015d898b932db7624214a3ee5eb"},{url:"/user.svg",revision:"90c5dcd87988b7d13b4149ac0946e530"},{url:"/vercel.svg",revision:"26bf2d0adaf1028a4d4c6ee77005e819"}],{ignoreURLParametersMatching:[]}),e.cleanupOutdatedCaches(),e.registerRoute("/",new e.NetworkFirst({cacheName:"start-url",plugins:[new e.ExpirationPlugin({maxEntries:1,maxAgeSeconds:86400,purgeOnQuotaError:!0})]}),"GET"),e.registerRoute(/^https:\/\/fonts\.(?:googleapis|gstatic)\.com\/.*/i,new e.CacheFirst({cacheName:"google-fonts",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:31536e3,purgeOnQuotaError:!0})]}),"GET"),e.registerRoute(/\.(?:eot|otf|ttc|ttf|woff|woff2|font.css)$/i,new e.StaleWhileRevalidate({cacheName:"static-font-assets",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:604800,purgeOnQuotaError:!0})]}),"GET"),e.registerRoute(/\.(?:jpg|jpeg|gif|png|svg|ico|webp)$/i,new e.StaleWhileRevalidate({cacheName:"static-image-assets",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400,purgeOnQuotaError:!0})]}),"GET"),e.registerRoute(/\.(?:js)$/i,new e.StaleWhileRevalidate({cacheName:"static-js-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400,purgeOnQuotaError:!0})]}),"GET"),e.registerRoute(/\.(?:css|less)$/i,new e.StaleWhileRevalidate({cacheName:"static-style-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400,purgeOnQuotaError:!0})]}),"GET"),e.registerRoute(/\.(?:json|xml|csv)$/i,new e.NetworkFirst({cacheName:"static-data-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400,purgeOnQuotaError:!0})]}),"GET"),e.registerRoute(/\/api\/.*$/i,new e.NetworkFirst({cacheName:"apis",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:16,maxAgeSeconds:86400,purgeOnQuotaError:!0})]}),"GET"),e.registerRoute(/.*/i,new e.NetworkFirst({cacheName:"others",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400,purgeOnQuotaError:!0})]}),"GET")}));
