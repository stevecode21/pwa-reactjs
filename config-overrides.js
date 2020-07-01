// Importamoslos injects necesarios del rewire
const { defaultInjectConfig, rewireWorkboxInject } = require('react-app-rewire-workbox')
// Importamos el path 
const path = require('path');

module.exports = function override(config, env) {
  // Generamos un service worker

  if (env === "production") {
    console.log("Generating Service Worker")
    const workboxConfig = {
      // Inyectamos una configuración por defecto 
      ...defaultInjectConfig,
      // Tiene que ver con el modulo de precaching y se mete junto al archivo service-worker.js
      swSrc: path.join(__dirname, 'src', 'service-worker.js')
    }
    config = rewireWorkboxInject(workboxConfig)(config, env)
  }
  // retornamos la configuración
  return config;
}