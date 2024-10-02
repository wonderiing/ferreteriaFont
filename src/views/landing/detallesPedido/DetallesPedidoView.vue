<template>
  <div class="table-container">
    <h2>Lista de Pedidos</h2>

    <table>
      <thead>
        <tr>
          <th>ID</th>
          <th>Estado</th>
          <th>Producto</th>
          <th>Cantidad</th>
          <th>Precio Unitario</th>
          <th>Fecha de Pedido</th>
          <th>Pedido ID</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="detalle in detallesPedido" :key="detalle.id">
          <td>{{ detalle.id }}</td>
          <td>{{ detalle.pedido.estado }}</td>
          <td>{{ detalle.producto.nombre }}</td>
          <td>{{ detalle.cantidad }}</td>
          <td>${{ detalle.precioUnitario }}</td>
          <td>{{ detalle.pedido.fechaPedido }}</td>
          <td>{{ detalle.pedido.id }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup lang="ts">
import type { DetallesPedido } from '@/interfaces/detpedido.interface'
import axios from 'axios'
import { onMounted, ref } from 'vue'

const endpoint = 'http://localhost:8080/api/detalle-pedido'
const detallesPedido = ref<DetallesPedido[]>([])

const getDetallesPedido = async () => {
  try {
    const response = await axios.get(endpoint)
    detallesPedido.value = response.data
  } catch (error) {
    console.error(error)
  }
}

onMounted(async () => {
  getDetallesPedido()
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

table {
  width: 100%; /* Mantiene la tabla ocupando el 100% del contenedor */
  border-collapse: collapse;
  margin-top: 20px; /* Espaciado adicional entre el título y la tabla */
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
