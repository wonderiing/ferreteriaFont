<template>
  <div class="table-container">
    <h2>Lista de Pedidos</h2>

    <!-- Filtros -->
    <div class="filters">
      <input type="number" v-model="filtroIdPedido" placeholder="Filtrar por ID de Pedido" />
      <input type="date" v-model="filtroFechaInicio" placeholder="Fecha Inicio" />
      <input type="date" v-model="filtroFechaFin" placeholder="Fecha Fin" />
      <button @click="filtrarVentas">Filtrar</button>
      <button @click="limpiarFiltros">Limpiar Filtros</button>
    </div>

    <table>
      <thead>
        <tr>
          <th>ID</th>
          <th>Cliente</th>
          <th>Producto/s</th>
          <th>Precio Total</th>
          <th>Fecha de Entrega</th>
          <th>Direccion</th>
          <th>Pedido ID</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="venta in ventasFiltradas" :key="venta.id">
          <td>{{ venta.id }}</td>
          <td>{{ venta.usuario.nombre }} {{ venta.usuario.apellido }}</td>
          <td>{{ venta.productos?.join(', ') }}</td>
          <td>$ {{ venta.precioTotal }}</td>
          <td>{{ venta.pedido.fechaPedido }}</td>
          <td>{{ venta.usuario.direccion }}</td>
          <td>{{ venta.pedido.id }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup lang="ts">
import type { DetallesPedido } from '@/interfaces/detpedido.interface'
import type { Ventas } from '@/interfaces/ventas.interface'
import axios from 'axios'
import { onMounted, ref, computed } from 'vue'

const endpoint = 'http://localhost:8080/api/ventas'
const ventas = ref<Ventas[]>([])
const detallesPedido = ref<DetallesPedido[]>([])

// Filtros
const filtroIdPedido = ref<number | null>(null)
const filtroFechaInicio = ref<string | null>(null)
const filtroFechaFin = ref<string | null>(null)

const getVentas = async () => {
  try {
    const response = await axios.get(endpoint)
    console.log(response.data)
    ventas.value = response.data
  } catch (error) {
    console.error(error)
  }
}

const getDetallesPedido = async () => {
  try {
    const endpoint = 'http://localhost:8080/api/detalle-pedido'
    const response = await axios.get(endpoint)
    detallesPedido.value = response.data
  } catch (err) {
    console.error(err)
  }
}

const productosById = () => {
  ventas.value.forEach((venta) => {
    detallesPedido.value.forEach((detalle) => {
      if (venta.pedido.id === detalle.pedido.id) {
        // Verifica si productos es un arreglo o inicialízalo si es undefined
        if (typeof venta.productos === 'string') {
          // Si ya es una cadena, conviértela en un arreglo
          venta.productos = [venta.productos]
        } else if (!Array.isArray(venta.productos)) {
          // Si productos es undefined o null, inicializa como un arreglo
          venta.productos = []
        }

        // Agrega el nombre del producto
        venta.productos.push(detalle.producto.nombre)
      }
    })
  })
}

const filtrarVentas = () => {
  // Este método se puede usar para forzar la reactividad
}

const limpiarFiltros = () => {
  filtroIdPedido.value = null
  filtroFechaInicio.value = null
  filtroFechaFin.value = null
}

const ventasFiltradas = computed(() => {
  return ventas.value.filter((venta) => {
    const cumpleId = filtroIdPedido.value ? venta.pedido.id === filtroIdPedido.value : true

    const fechaPedido = new Date(venta.pedido.fechaPedido)
    const cumpleFechaInicio = filtroFechaInicio.value
      ? fechaPedido >= new Date(filtroFechaInicio.value)
      : true
    const cumpleFechaFin = filtroFechaFin.value
      ? fechaPedido <= new Date(filtroFechaFin.value)
      : true

    return cumpleId && cumpleFechaInicio && cumpleFechaFin
  })
})

onMounted(async () => {
  await getVentas()
  await getDetallesPedido()
  productosById()
})
</script>

<style scoped>
.table-container {
  margin-top: 20px;
  max-width: 800px;
  margin-left: auto;
  margin-right: auto;
}

h2 {
  font-family: Arial, sans-serif;
  text-align: center; /* Centra el título */
}

.filters {
  display: flex;
  justify-content: center;
  margin-bottom: 20px; /* Espaciado adicional entre filtros y tabla */
  margin-top: 20px; /* Añadir margen superior para separación del navbar */
}

.filters input {
  margin-right: 10px; /* Espaciado entre campos de entrada */
}

table {
  width: 100%; /* Mantiene la tabla ocupando el 100% del contenedor */
  border-collapse: collapse;
}

th,
td {
  border: 1px solid #ddd;
  padding: 12px;
  text-align: center;
}

th {
  background-color: #171235;
  color: white;
}

tr:hover {
  background-color: #f1f1f1;
}

tr:nth-child(even) {
  background-color: #f9f9f9;
}
</style>
