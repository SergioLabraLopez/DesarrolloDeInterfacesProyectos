import { useState, useEffect, useMemo } from 'react'
import { CarritoProvider } from "./context/CarritoContext.jsx"
import Navbar from './components/Navbar.jsx'
import Producto from './components/Producto.jsx'
import ModalCarrito from './components/ModalCarrito.jsx'

function App() {
  
  const [productos, setProductos] = useState([])
  const [cargando, setCargando] = useState(true)
  const [error, setError] = useState(null)

  const [busqueda, setBusqueda] = useState('')
  const [categoria, setCategoria] = useState('')

  useEffect(() => {
    async function cargarProductos() {
      try {
        const response = await fetch('/productos.json')
        if (!response.ok) throw new Error('Error al cargar los productos')
        const data = await response.json()
        setProductos(data)
      } catch (err) {
        setError(err.message)
      } finally {
        setCargando(false)
      }
    }
    cargarProductos()
  }, [])

  const productosFiltrados = useMemo(() => {
    return productos.filter((p) => {
      const coincideBusqueda = p.nombre.toLowerCase().includes(busqueda.toLowerCase())
      const coincideCategoria = categoria === '' || p.categoria === categoria
      return coincideBusqueda && coincideCategoria
    })
  }, [productos, busqueda, categoria])


  return (
    <CarritoProvider>
      <Navbar />
      <ModalCarrito />
      
      <div className="container my-4">
        <h2 className="mb-4">Catálogo de Productos</h2>

        <div className="row mb-4 g-3">
          <div className="col-md-6">
            <input 
              type="text" 
              className="form-control" 
              placeholder="Buscar producto..." 
              value={busqueda}
              onChange={(e) => setBusqueda(e.target.value)}
            />
          </div>
          <div className="col-md-6">
            <select 
              className="form-select" 
              value={categoria} 
              onChange={(e) => setCategoria(e.target.value)}
            >
              <option value="">Todas las categorías</option>
              <option value="Periféricos">Periféricos</option>
              <option value="Monitores">Monitores</option>
              <option value="Componentes">Componentes</option>
              <option value="Audio">Audio</option>
              <option value="Accesorios">Accesorios</option>
            </select>
          </div>
        </div>

        {cargando && <p className="text-center">Cargando productos...</p>}
        {error && <div className="alert alert-danger">{error}</div>}
        
        {!cargando && !error && (
          <div className="row g-4">
            {productosFiltrados.map((prod) => (
              <div key={prod.id} className="col-12 col-md-6 col-lg-4">
                <Producto producto={prod} />
              </div>
            ))}
          </div>
        )}
        
      </div>
    </CarritoProvider>
  )
}

export default App