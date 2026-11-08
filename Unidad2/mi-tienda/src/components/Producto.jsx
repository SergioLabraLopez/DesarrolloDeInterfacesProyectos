import { useCarrito } from '../context/CarritoContext.jsx'

function Producto({ producto }) {
  const { agregar } = useCarrito()

  return (
    <div className="card h-100">
      <div className="card-body d-flex flex-column">
        <h5 className="card-title">{producto.nombre}</h5>
        <h6 className="card-subtitle mb-2 text-muted">{producto.categoria}</h6>
        <p className="card-text">{producto.descripcion}</p>
        <p className="fw-bold mt-auto">{producto.precio.toFixed(2)} €</p>
        <button 
          className="btn btn-primary w-100" 
          onClick={() => agregar(producto)}
        >
          Añadir
        </button>
      </div>
    </div>
  )
}

export default Producto