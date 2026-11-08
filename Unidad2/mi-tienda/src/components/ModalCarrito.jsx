import { useCarrito } from '../context/CarritoContext.jsx'

function ModalCarrito() {
  const { items, eliminar, total } = useCarrito()

  return (
    <div className="modal fade" id="carritoModal" tabIndex="-1" aria-hidden="true">
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h1 className="modal-title fs-5">Tu Carrito</h1>
            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Cerrar"></button>
          </div>
          <div className="modal-body">
            {items.length === 0 ? (
              <p>El carrito está vacío.</p>
            ) : (
              <ul className="list-group mb-3">
                {items.map((i) => (
                  <li key={i.id} className="list-group-item d-flex justify-content-between align-items-center">
                    <div>
                      {i.nombre} <br />
                      <small className="text-muted">{i.cantidad} x {i.precio.toFixed(2)} €</small>
                    </div>
                    <button className="btn btn-sm btn-outline-danger" onClick={() => eliminar(i.id)}>
                      Quitar
                    </button>
                  </li>
                ))}
              </ul>
            )}
            <h5 className="text-end fw-bold">Total: {total.toFixed(2)} €</h5>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ModalCarrito