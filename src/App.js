import React from 'react'
// Cambiamos BrowserRouter por un router compun
import { Router, Route, Link } from "react-router-dom"
import Home from './pages/Home'
import Recipe from './pages/Recipe'
import Timer from './pages/Timer'
import './App.css'
// Importamos createBrowserHistory desde la librería history
import { createBrowserHistory } from 'history'
// Lo que haré será importar la librería de Google Analytics
import ReactGA from 'react-ga'

// Vamos a bindear esto a la historia de la aplicaciónen React Router
// Creamos el plugin para la historia del browser, esto lo que nos permite hacer es trackear que páginas visitan los usuarios
const history = createBrowserHistory()

// Inicializamos REACT GA y usamos un id fake
ReactGA.initialize('UA-000000-01')

// Trackeamos la page view inicial cuando ingresamos a la aplicación
ReactGA.pageview(window.location.pathname + window.location.search)

// Agregamos este evento que nos va a decir cuando un usuario cambia de página
history.listen(function (location) {
  // Trackeamos una page view con la librería de GA y dentro del page view construimos la url que está visitando el usuario
  ReactGA.pageview(window.location.pathname + window.location.search)
})

export default class App extends React.Component {
  render() {
    return (
      // Reemplazamos el BrowserRouter por Router y le agregamos el prop de history 
      <Router history={history}>
        <div>
          <header>
            <Link to="/">Recetas</Link>
          </header>

          <main>
            <Route exact path="/" component={Home} />
            <Route path="/recipe/:recipeId" component={Recipe} />
            <Route path="/timer" component={Timer} />
          </main>
        </div>
      </Router>
    );
  }
}
