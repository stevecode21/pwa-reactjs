self.__precacheManifest = [].concat(self.__precacheManifest || [])
// Con este comando de workbox evitamos algún tipo de warning
workbox.precaching.suppressWarnings()
// Esto lo que hará es tomar el __precacheManifest que son los (html, css, js) que sirven para correr nuestra app lo va a guardar detrás de escena tal cual lo viene haciendo el SW por defecto
workbox.precaching.precacheAndRoute(self.__precacheManifest, {})

// registerNavigationRoute si tenemos algo ya cacheado en el SW que tiene algún tipo de comportamiento por defecto lo va a respetar, pero si tenemos una URL que no conocemos, pedirá a index.html que le diga a workbox lo que se debería mostrar
workbox.routing.registerNavigationRoute('/index.html')

/* Por defecto las rutas que hagamos van a referir siempre al mismo dominio, si queremos setear que por defecto workbox utilice la estragia de Network First tenemos que especificar la expresión regular. Luego de eso, tenemos que especificarle qué estrategia queremos que utilice y por último podemos especificar qué metodos queremos que cachee (recomendable solo GET) */
workbox.routing.registerRoute(/^https?.*/,
  new workbox.strategies.NetworkFirst(), 'GET')