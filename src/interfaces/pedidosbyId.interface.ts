export interface PedidosPorID {
  id: number
  pedido: Pedido
  producto: Producto
  cantidad: number
  precioUnitario: number
}

export interface Pedido {
  id: number
  estado: string
  fechaPedido: Date
}

export interface Producto {
  id: number
  nombre: string
  precio: number
  stock: number
  categoria: Categoria
  descripcion: string
  imagen: string
  estado: string
  proveedor: Proveedor
}

export interface Categoria {
  id: number
  nombre: string
}

export interface Proveedor {
  id: number
  nombre: string
  contacto: Contacto
}

export interface Contacto {
  id: number
  telefono: string
  correo: string
}
