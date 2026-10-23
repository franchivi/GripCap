import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'

// Las páginas se sirven pre-renderizadas (ver vite.config.js), así que el HTML
// que recibe Google ya lleva el contenido sin ejecutar JavaScript.
//
// Se renderiza con createRoot y NO con hydrateRoot a propósito: framer-motion
// aplica estilos iniciales (opacity 0) sobre los que el DOM pre-renderizado no
// coincide, y la hidratación falla con los errores #418 y #425 de React. React
// acabaría renderizando desde cero igualmente, pero ensuciando la consola.
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)
