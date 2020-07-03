// Haremos un functional component, traemos el hook useState
// Importamos el hook de useEffect para poder realizar un montaje del event listener, también importamos memo para evitar re-renderizados innecesarios en mi app
import React, { useState, useEffect, memo } from 'react'

// Destructuramos la propiedad children para mostrar el contenido que envolvamos con este componente
const IfOffline = ({ children }) => {
  // Lo que haremos será crear el estado y validamos en la inicialización del state si tenemos navigator definido, estará inicializado en este,  y si no lo que haremos será igual dejarlo en true
  const [online, setOnline] = useState(navigator ? navigator.onLine : true)

  useEffect(() => {
    // Si no estamos en la windows, no se hará nada
    if (!window) return;

    // Agregamos los event listener, siempre que seteamos un event listener en un componente de React, es algo muy importante quitarlos cuando este componente deja de existir, así que planeamos una función para actualizar el state
    window.addEventListener("online", goOnline)
    // Planteamos una función también para actualizar el state a offline
    window.addEventListener("offline", goOffline)
    return () => {
      // Y por ultimo quitamos los event listener cuando este componente se deja de renderizar
      window.removeEventListener("online", goOnline)
      window.removeEventListener("offline", goOffline)
    }
  }, [])

  //Definimos la función que se va a ejecutar cuando el navegador esté online
  function goOnline() {
    // Y seteamos en el estado true, para indicar que hay conexión
    setOnline(true)
  }

  // Esta función será cuando el navegador esté sin conexión
  function goOffline() {
    // Actualizamos el state a false porque estamos sin conexión
    setOnline(false)
  }

  // Realizamos una validación, si estamos online
  if (online) {
    // No retornamos nada, ya que estamos online
    return null
  }
  // De lo contrario si estamos offline, retornamos los children
  return <span>{children}</span>

}

export default memo(IfOffline)