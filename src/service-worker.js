self.__precacheManifest = [].concat(self.__precacheManifest || [])
// Con este comando de workbox evitamos algún tipo de warning
workbox.precaching.suppressWarnings()
// Esto lo que hará es tomar el __precacheManifest que son los (html, css, js) que sirven para correr nuestra app lo va a guardar detrás de escena tal cual lo viene haciendo el SW por defecto
workbox.precaching.precacheAndRoute(self.__precacheManifest, {})

// registerNavigationRoute si tenemos algo ya cacheado en el SW que tiene algún tipo de comportamiento por defecto lo va a respetar, pero si tenemos una URL que no conocemos, pedirá a index.html que le diga a workbox lo que se debería mostrar
workbox.routing.registerNavigationRoute('/index.html')

// Con esto workbox va a capturar cada una de las request que hacemos de Google Analytics de nuestra aplicación, las va a guardar en memoria y cuando un usuario retome conexión será enviado correctametne a Google Analytics
workbox.googleAnalytics.initialize()


// Aplicaremos una regla nueva, agregamos un regexp para todas las request que se hacen a la API
// Usaremos la estrategia StaleWhileRevalidate y solamente será para las petición de índole GET
workbox.routing.registerRoute(/^https?:\/\/www.themealdb.com\/api\/.*/,
  new workbox.strategies.StaleWhileRevalidate(), 'GET')

// Registramos otra regla de Network First para las fonts que se traen de google apis, ahora ya que CacheFirst por ser la estrategia más peligrosas, le podemos poner un vencimiento al caché
workbox.routing.registerRoute(/^https:\/\/fonts.(?:googleapis|gstatic).com\/(.*)/,
  new workbox.strategies.CacheFirst(
    {
      // Para ponerle el vencimiento al cache, lo haremos dentro del método en un objeto, le añadimpos un nombre cualquiera al cache
      cacheName: 'fonts-on-cache',
      // Usamos un plugin de workbox, el que usaremos es el de expiration, que nos va a decir cuando vence este cache
      // Ponemos una lista de plugins
      plugins: [
        // Creamos y llamamos el plugin
        new workbox.expiration.Plugin({
          // Entre las opciones del plugin, le otorgaremos un máximo de 30 días para su expiración
          maxAgeSeconds: 86400
        })
      ]
    }
  ), 'GET')

// Por defecto. Va al final de todo
/* Por defecto las rutas que hagamos van a referir siempre al mismo dominio, si queremos setear que por defecto workbox utilice la estragia de Network First tenemos que especificar la expresión regular. Luego de eso, tenemos que especificarle qué estrategia queremos que utilice y por último podemos especificar qué metodos queremos que cachee (recomendable solo GET) */
workbox.routing.registerRoute(/^https?.*/,
  new workbox.strategies.NetworkFirst(), 'GET')

