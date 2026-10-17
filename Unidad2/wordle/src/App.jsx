import { useEffect, useState } from 'react'
import Casilla from './components/Casilla.jsx'

const FILAS = 6
const COLUMNAS = 5
// const PALABRAS = ['PERRO', 'GATOS'];
const PALABRAS = [
  'PERRO', 'PLATO', 'RELOJ', 'GATOS', 'LIBRO', 'PLAYA', 'MONTE', 'NIEVE', 'FUEGO', 'AGUAS',
  'ARBOL', 'BARCO', 'CAMPO', 'CASAS', 'CERRO', 'CLASE', 'COCHE', 'CORTE', 'DANZA', 'DIETA',
  'DULCE', 'EDAD', 'EROES', 'ETAPA', 'FESTA', 'FLOTA', 'FRUTA', 'GRUPO', 'HIELO', 'HUEVO',
  'JUEGO', 'JUSTO', 'JUNIO', 'LABIO', 'LAPIZ', 'LECHE', 'LUCES', 'LUNAR', 'MADRE', 'MAGIA',
  'MAPAS', 'MARCA', 'METAL', 'MICRO', 'MITAD', 'MUNDO', 'MUSIK', 'NADAR', 'NARIZ', 'NOCHE'
];

function palabraAlAzar() {
  return PALABRAS[Math.floor(Math.random() * PALABRAS.length)]
}

function tableroVacio() {
  const tablero = []
  for (let f = 0; f < FILAS; f++) {
    tablero.push(Array(COLUMNAS).fill(''))
  }
  return tablero
}

function borrarHaciaAtras(evento) {
    if (evento.key === 'Backspace' && evento.target.value === '') {
      evento.target.previousElementSibling?.focus()
    }
  }

function evaluarFila(fila, solucion) {
  const estados = Array(COLUMNAS).fill('ausente')
  const disponibles = solucion.split('')

  for (let i = 0; i < COLUMNAS; i++) {
    if (fila[i] === solucion[i]) {
      estados[i] = 'correcta'
      disponibles[i] = null
    }
  }

  for (let i = 0; i < COLUMNAS; i++) {
    if (estados[i] !== 'correcta' && disponibles.includes(fila[i])) {
      estados[i] = 'presente'
      const indice = disponibles.indexOf(fila[i])
      disponibles[indice] = null
    }
  }

  return estados
}

function App() {
  const [intentos, setIntentos] = useState(tableroVacio())
  const [filaActual, setFilaActual] = useState(0)
  const [solucion, setSolucion] = useState(palabraAlAzar())
  const [error, setError] = useState('')

  const ultimo = filaActual > 0 ? intentos[filaActual - 1].join('') : ''
  const ganada = ultimo === solucion
  const terminada = ganada || filaActual === FILAS

  console.log(solucion);

  useEffect(() => {
    document.querySelector('.casilla:enabled')?.focus()
  }, [filaActual])

  function nuevaPartida() {
    setIntentos(tableroVacio())
    setFilaActual(0)
    setSolucion(palabraAlAzar())
  }

  function cambiarLetra(f, c, evento) {
    setError('')
    const letra = evento.target.value.toUpperCase()
    if (!/^[A-ZÑ]?$/.test(letra)) return

const copia = intentos.map((fila) => [...fila])
    copia[f][c] = letra
    setIntentos(copia)

    if (letra !== '') evento.target.nextElementSibling?.focus()
  }

  function comprobar(evento) {
    evento.preventDefault()
    if (terminada) return

    if (intentos[filaActual].includes('')) {
      setError('Faltan letras')
      return
    }

    setError('')
    setFilaActual(filaActual + 1)
  }

  return (
    <form className="juego" onSubmit={comprobar}>
      <h1>Wordle</h1>
      <div className="tablero">
        {intentos.map((fila, f) => {
          const estadosFila = f < filaActual ? evaluarFila(fila, solucion) : Array(COLUMNAS).fill('')
          
          return (
            <div className="fila" key={f}>
              {fila.map((letra, c) => (
                <Casilla
                key={c}
                letra={letra}
                estado={estadosFila[c]}
                activa={f === filaActual && !terminada}
                onCambio={(evento) => cambiarLetra(f, c, evento)}
                onTecla={borrarHaciaAtras}
                fila={f}
                columna={c}
              />
              ))}
            </div>
          )
        })}
      </div>
      {terminada ? (
        <>
          <p className="mensaje" role="status">
            {ganada
              ? '¡Enhorabuena, has acertado!'
              : `La palabra era ${solucion}`}
          </p>
          <button className="boton" type="button" onClick={nuevaPartida}>
            Nueva partida
          </button>
        </>
      ) : (
        <button className="boton" type="submit">
          Comprobar
        </button>
      )}
      {error !== '' && (
        <p className="mensaje" role="alert">
          {error}
        </p>
      )}
    </form>
  )
}

export default App
