import { createContext, useContext, useState } from 'react'

const CarritoContext = createContext(null)

export function CarritoProvider({ children }) {
  const [items, setItems] = useState([])

  function agregar(producto) {
    setItems((actuales) => {
      const existe = actuales.find((i) => i.id === producto.id)
      if (existe) {
        return actuales.map((i) =>
          i.id === producto.id ? { ...i, cantidad: i.cantidad + 1 } : i
        )
      }
      return [...actuales, { ...producto, cantidad: 1 }]
    })
  }

  function eliminar(id) {
    setItems((actuales) => actuales.filter((i) => i.id !== id))
  }

  const total = items.reduce((suma, i) => suma + i.precio * i.cantidad, 0)

  return (
    <CarritoContext value={{ items, agregar, eliminar, total }}>
      {children}
    </CarritoContext>
  )
}

export function useCarrito() {
  return useContext(CarritoContext)
}