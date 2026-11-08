import { useCarrito } from '../context/CarritoContext.jsx'

function Navbar() {
  const { items } = useCarrito()
  // Sumamos las cantidades de todos los artículos para el número del badge
  const cantidadTotal = items.reduce((suma, item) => suma + item.cantidad, 0)

  return (
    <nav className="navbar navbar-expand-md bg-dark mb-4" data-bs-theme="dark">
      <div className="container">
        <a className="navbar-brand" href="#">Mi Tienda</a>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#menuNavegacion">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="menuNavegacion">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <button 
                className="btn btn-outline-light" 
                data-bs-toggle="modal" 
                data-bs-target="#carritoModal"
              >
                Carrito <span className="badge text-bg-danger ms-1">{cantidadTotal}</span>
              </button>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  )
}

export default Navbar