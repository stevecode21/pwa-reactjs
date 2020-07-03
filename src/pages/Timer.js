import React from 'react'

export default class Timer extends React.Component {

  constructor(props) {
    super(props)
    this.state = { timer: 3, timeLeft: 0 }
  }

  start = async () => {
    // Validamos si hay notificaciones disponibles y también validamos si tenemos un service worker
    if (!('Notification' in window) || !('serviceWorker' in navigator)) {
      /* En Android las notificaciones necesitan un service worker */
      // Ponemos un alert
      return alert('Tu browser no soporta notificaciones')
    }
    // Ahora validamos si tenemos el permiso necesario para realizar las notificaciones, para eso usamos Notification.permission, que nos dirá que permiso tenemos, generalmente estará en default, cuando sea así, pediremos permiso al usuario
    if (Notification.permission === 'default') {
      // Ahora usamos await con la request permission, que nos avisa recien cuando el usuario clickee
      await Notification.requestPermission()
    }

    // Ahora validamos si  el permiso está bloqueado
    if (Notification.permission === 'blocked') {
      return alert("Bloqueaste las notificaciones 🙄")
    }

    // Validamos si el permiso está activo
    if (Notification.permission !== 'granted') {
      return
    }



    var timer = this.state.timer
    this.setState({ timeLeft: timer })

    var countdownInterval = setInterval(() => {
      timer = timer - 1;
      this.setState({ timeLeft: timer })
      if (timer <= 0) {
        clearInterval(countdownInterval)
        this.showNotification()
      }
    }, 1000)
  }

  //Este método me ayudará a mostrar la notificación
  showNotification = async () => {
    // Para empezar, requeriremos del service worker, asi que solo funcionara en modo producción
    const registration = await navigator.serviceWorker.getRegistration()

    // Hacemos un pequeño chequeo del service worker, si no está registrado
    if (!registration) return alert("No hay un Service Worker")

    // Por ultimo enviamos la notificación, con showNotification, en el primer argumento, enviamos el mensaje y por otra parte tenemos un argumento de opciones
    registration.showNotification("Listo el timer 😃", {
      // Aquí podemos setear el body, que es un texto aclaratorio
      body: 'Ding ding ding',
      // Seteamos una imagen, un pequeño icono
      img: '/icon.png'
    })

  }

  handleChange = (e) => {
    this.setState({ timer: e.target.value })
  }

  render() {
    const { timer, timeLeft } = this.state

    return <div className="Timer">
      <div className="name">Timer</div>
      {timeLeft === 0 ?
        <div className="center">
          <input type="number" min="0" max="999" step="1" value={timer} onChange={this.handleChange} />
          <button onClick={this.start}>Start</button>
        </div>
        :
        <div className="timeLeft">{timeLeft}s</div>
      }
    </div>
  }
}
