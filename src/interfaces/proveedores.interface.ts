export interface Proveedores {
  id: number
  nombre: string
  contacto: Contacto
}

export interface Contacto {
  id: number
  telefono: string
  correo: string
}
