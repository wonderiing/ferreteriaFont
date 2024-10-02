import type { Productos } from './productos.interface'

export interface DetallesPedido {
  id: number
  pedido: Pedido
  producto: Producto
  cantidad: number
  precioUnitario: number
  productos?: Productos | Productos[]
}

export interface Pedido {
  id: number
  estado: PedidoEstado
  fechaPedido: Date
}

export enum PedidoEstado {
  Pendiente = 'Pendiente',
  Recibido = 'Recibido'
}

export interface Producto {
  id: number
  nombre: string
  precio: number
  stock: number
  categoria: Categoria
  descripcion: string
  imagen: string
  estado: ProductoEstado
  proveedor: Proveedor
}

export interface Categoria {
  id: number
  nombre: string
}

export enum ProductoEstado {
  Activo = 'Activo'
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
