self.__precacheManifest = [].concat(self.__precacheManifest || [])
// Con este comando de workbox evitamos algún tipo de warning
workbox.precaching.suppressWarnings()
// Esto lo que hará es tomar el __precacheManifest que son los (html, css, js) que sirven para correr nuestra app lo va a guardar detrás de escena tal cual lo viene haciendo el SW por defecto
workbox.precaching.precacheAndRoute(self.__precacheManifest, {})
