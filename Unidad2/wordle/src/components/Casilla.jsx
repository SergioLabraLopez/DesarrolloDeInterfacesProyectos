function Casilla({ letra, estado = '', activa, onCambio, onTecla, fila, columna }) {
  let etiqueta = `Fila ${fila + 1}, columna ${columna + 1}`
  if (letra) etiqueta += `, letra ${letra}`
  if (estado) etiqueta += `, estado: ${estado}`

  return (
    <input
      aria-label={etiqueta}
      className={`casilla ${estado}`}
      value={letra}
      maxLength={1}
      disabled={!activa}
      onChange={onCambio}
      onKeyDown={onTecla}
    />
  )
}

export default Casilla