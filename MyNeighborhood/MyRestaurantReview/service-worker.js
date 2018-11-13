
var Name='cacheV1'

console.log('registered');

self.addEventListener('install', function(event) {
 console.log('installed');
 event.waitUntil(
   caches.open(Name).then(function(cache) {
     console.log('file caching');
     return cache.addAll([
"/",
"./index.html",
"./restaurant.html",
"./css/styles.css",
'/js/main.js',
"./js/restaurant_info.js",
"./js/dbhelper.js",
"./data/restaurants.json",
"./img/1.jpg",
"./img/2.jpg",
"./img/3.jpg",
"./img/4.jpg",
"./img/5.jpg",
"./img/6.jpg",
"./img/7.jpg",
"./img/8.jpg",
"./img/9.jpg",
"./img/10.jpg"
   ]);
   }));
});



self.addEventListener('fetch', function(event) {

    event.respondWith(
      fetch(event.request).catch(function(){
        return caches.open(Name).then(function(cache){
          return cache.match(event.request);
        })
      })
    );

});
