import LayoutAuth from '@/views/auth/LayoutAuth.vue'
import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'auth',
      component: LayoutAuth,
      redirect: { name: 'login' },
      children: [
        {
          path: 'login',
          name: 'login',
          component: () => import('@/views/auth/LoginAuth.vue')
        },
        {
          path: 'register',
          name: 'register',
          component: () => import('@/views/auth/RegisterAuth.vue')
        }
      ]
    },
    {
      path: '/ferreteria',
      name: 'ferreteria',
      component: () => import('@/views/landing/LandingView.vue'),
      redirect: { name: 'productos' },
      children: [
        {
          path: 'productos',
          name: 'productos',
          component: () => import('@/views/landing/ProductosView.vue')
        },
        {
          path: 'detalles-pedido',
          name: 'detalles',
          component: () => import('@/views/landing/detallesPedido/DetallesPedidoView.vue')
        },
        {
          path: 'venta/:id',
          name: 'venta',
          props: (route) => {
            const id = Number(route.params.id)
            return isNaN(id) ? { id: 1 } : { id }
          },
          component: () => import('@/views/landing/detallesPedido/CreateVenta.vue')
        },
        {
          path: 'ventas',
          name: 'ventas',
          component: () => import('@/views/landing/detallesPedido/DetallesVentas.vue')
        },
        {
          path: 'proveedores',
          name: 'proveedores',
          component: () => import('@/views/landing/proveedores/ListProveedores.vue')
        },
        {
          path: 'edit-producto/:id',
          props: (route) => {
            const id = Number(route.params.id)
            return isNaN(id) ? { id: 1 } : { id }
          },
          name: 'editar',
          component: () => import('@/views/landing/productosC//EditProducto.vue')
        },
        {
          path: 'crear',
          name: 'crear',
          component: () => import('@/views/landing/productosC/CrearProducto.vue')
        },
        {
          path: 'crear-proveedor',
          name: 'crearP',
          component: () => import('@/views/landing/proveedores/CrearProveedor.vue')
        },
        {
          path: 'categorias',
          name: 'categorias',
          component: () => import('@/views/categoria/CategoriasView.vue')
        },
        {
          path: 'crear-categoria',
          name: 'crearC',
          component: () => import('@/views/categoria/CrearCategoria.vue')
        },
        {
          path: 'edit-categoria/:id',
          props: (route) => {
            const id = Number(route.params.id)
            return isNaN(id) ? { id: 1 } : { id }
          },
          name: 'editarC',
          component: () => import('@/views/categoria/CategoriaPut.vue')
        },
        {
          path: 'editar-proveedor/:id',
          props: (route) => {
            const id = Number(route.params.id)
            return isNaN(id) ? { id: 1 } : { id }
          },
          name: 'editarP',
          component: () => import('@/views/landing/proveedores/ProveedorPut.vue')
        }
      ]
    }
  ]
})

export default router
