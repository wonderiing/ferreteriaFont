export interface Ventas {
  id: number
  pedido: Pedido
  usuario: Usuario
  precioTotal: number
  productos?: string | string[]
}

export interface Pedido {
  id: number
  estado: Estado
  fechaPedido: Date
}

export enum Estado {
  Pendiente = 'Pendiente',
  Recibido = 'Recibido'
}

export interface Usuario {
  id: number
  nombre: string
  apellido: string
  contacto: Contacto
  contrasena: string
  direccion: string
}

export interface Contacto {
  id: number
  telefono: string
  correo: string
}
