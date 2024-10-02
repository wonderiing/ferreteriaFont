<template>
  <!-- component -->
  <div
    class="relative flex min-h-screen text-gray-800 antialiased flex-col justify-center overflow-hidden bg-gray-50 py-6 sm:py-12"
  >
    <div class="relative py-3 sm:w-96 mx-auto text-center">
      <span class="text-2xl font-light">Simulando venta con {{ producto?.nombre }}</span>
      <div class="mt-4 bg-white shadow-md rounded-lg text-left">
        <div class="h-2 bg-purple-400 rounded-t-md"></div>
        <div class="px-8 py-6">
          <label class="block font-semibold"> Cantidad </label>
          <input
            v-model="cantidad"
            type="text"
            placeholder=""
            class="border w-full h-5 px-3 py-5 mt-2 hover:outline-none focus:outline-none focus:ring-indigo-500 focus:ring-1 rounded-md"
          />
          <label class="block mt-3 font-semibold"> Direccion </label>
          <input
            type="text"
            placeholder=""
            class="border w-full h-5 px-3 py-5 mt-2 hover:outline-none focus:outline-none focus:ring-indigo-500 focus:ring-1 rounded-md"
          />
          <div class="flex justify-between items-baseline">
            <button
              type="submit"
              class="mt-4 bg-purple-500 text-white py-2 px-6 rounded-md hover:bg-purple-600"
              @click="submitPedido"
            >
              Haz tu pedido
            </button>
            <a href="#" class="text-sm hover:underline"></a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Producto } from '@/interfaces/detpedido.interface'
import axios from 'axios'
import { onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'

const cantidad = ref()
const router = useRoute()
const producto = ref<Producto>()
const fechaR = ref('')
const pedidoId = ref()
const productoId = ref(router.params.id)
const precioR = ref()
const usuarioId = localStorage.getItem('id')
const ventaId = ref()

function obtenerFechaFormateada() {
  try {
    const fecha = new Date()
    const año = fecha.getFullYear()
    const mes = (fecha.getMonth() + 1).toString().padStart(2, '0')
    const dia = fecha.getDate().toString().padStart(2, '0')
    fechaR.value = `${año}-${mes}-${dia}`
  } catch (error) {
    console.error('Error al obtener la fecha:', error)
  }
}

const obtenerProducto = async () => {
  try {
    const endpoint = `http://localhost:8080/api/productos/${router.params.id}`
    const response = await axios.get(endpoint)
    producto.value = response.data
    const { precio } = response.data
    precioR.value = precio
  } catch (error) {
    console.error('Error al obtener el producto:', error)
    alert('No se pudo obtener el producto')
  }
}

const submitDetallesPedido = async () => {
  const endpoint = 'http://localhost:8080/api/detalle-pedido'
  const data = {
    pedidoId: pedidoId.value,
    productoId: productoId.value,
    cantidad: cantidad.value,
    precioUnitario: precioR.value * cantidad.value
  }

  try {
    const response = await axios.post(endpoint, data)
    console.log('Detalles del pedido guardados:', response.data)
    return true
  } catch (error) {
    console.error('Error al insertar detalles del pedido:', error)
    return false
  }
}

const submitVenta = async () => {
  const endpoint = 'http://localhost:8080/api/ventas'
  const data = {
    pedidoId: pedidoId.value,
    usuarioId: usuarioId,
    precioTotal: precioR.value * cantidad.value
  }

  try {
    const response = await axios.post(endpoint, data)
    const { id } = response.data
    ventaId.value = id
    console.log('Venta registrada:', response.data)
    return true
  } catch (error) {
    console.error('Error al registrar la venta:', error)
    return false
  }
}

const submitPedido = async () => {
  try {
    const endpoint = `http://localhost:8080/api/pedidos`
    const data = {
      estado: 'Pendiente',
      fechaPedido: fechaR.value
    }

    const response = await axios.post(endpoint, data)
    const { id } = response.data
    pedidoId.value = id

    const detallesGuardados = await submitDetallesPedido()

    if (!detallesGuardados) {
      await deleteVentaAndPedido()
      alert('Error al guardar los detalles del pedido. Por favor, inténtelo de nuevo.')
      return
    }

    const ventaGuardada = await submitVenta()

    if (!ventaGuardada) {
      await deleteVentaAndPedido()
      alert('Error al registrar la venta. Por favor, inténtelo de nuevo.')
      return
    }

    alert('Pedido completado con éxito')
  } catch (error) {
    console.error('Error al enviar el pedido:', error)
    alert('Algo Fallo. Inténtelo de nuevo.')
  }
}

const deleteVentaAndPedido = async () => {
  try {
    if (ventaId.value) {
      const endpointVenta = `http://127.0.0.1:8080/api/ventas/${ventaId.value}`
      await axios.delete(endpointVenta)
    }
    if (pedidoId.value) {
      const endpointPedido = `http://127.0.0.1:8080/api/pedidos/${pedidoId.value}`
      await axios.delete(endpointPedido)
    }
    alert('Venta y pedido eliminados correctamente.')
  } catch (err) {
    console.error('Error al eliminar venta y pedido:', err)
    alert('Error al eliminar venta y pedido.')
  }
}

onMounted(async () => {
  obtenerProducto()
  obtenerFechaFormateada()
})
</script>
