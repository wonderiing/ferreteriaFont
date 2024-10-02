export interface Productos {
  id: number
  nombre: string
  precio: number
  stock: number
  categoria: Categoria
  descripcion: string
  imagen: string
  estado: Estado
  proveedor: Proveedor
}

export interface Categoria {
  id: number
  nombre: string
}

export enum Estado {
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
