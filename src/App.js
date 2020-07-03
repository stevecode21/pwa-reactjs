import React from 'react'
import { Router, Route, Link } from "react-router-dom"
import Home from './pages/Home'
import Recipe from './pages/Recipe'
import Timer from './pages/Timer'
// Importamos el componente para el content offline
import IfOffline from './components/IfOffline'
import './App.css'
import { createBrowserHistory } from 'history'
import ReactGA from 'react-ga'

const history = createBrowserHistory()

ReactGA.initialize('UA-000000-01')

ReactGA.pageview(window.location.pathname + window.location.search)

history.listen(function (location) {
  ReactGA.pageview(window.location.pathname + window.location.search)
})

export default class App extends React.Component {
  render() {
    return (
      // Reemplazamos el BrowserRouter por Router y le agregamos el prop de history 
      <Router history={history}>
        <div>
          <header>
            {/* Aquí llamamos a mi componente  IfOffline */}
            <Link to="/">Recetas <IfOffline>Offline</IfOffline></Link>
            {/* Agregamos un nuevo link para ir a la page de nuestro timer */}
            <Link to="/timer" className="timerLink">🕐</Link>
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
