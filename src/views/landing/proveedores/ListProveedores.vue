<template>
  <div class="table-container">
    <h2>Lista de Pedidos</h2>

    <!-- Campo de entrada para filtrar por nombre de proveedor -->
    <div class="filter-container">
      <input type="text" v-model="filtroProveedor" placeholder="Filtrar por nombre de proveedor" />
      <RouterLink
        :to="{ name: 'crearP' }"
        class="px-4 py-2 mx-1 text-white bg-gray-800 rounded hover:bg-gray-700 disabled:opacity-50"
      >
        Crear Proveedor
      </RouterLink>
    </div>

    <table>
      <thead>
        <tr>
          <th>Nombre</th>
          <th>Producto</th>
          <th>Correo</th>
          <th>Teléfono</th>
          <th>Edicion</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="proveedor in proveedoresFiltrados" :key="proveedor.id">
          <td>{{ proveedor.proveedor.nombre }}</td>
          <td>{{ proveedor.nombre }}</td>
          <td>{{ proveedor.proveedor.contacto.correo }}</td>
          <td>{{ proveedor.proveedor.contacto.telefono }}</td>
          <td>
            <RouterLink :to="{ name: 'editarP', params: { id: proveedor.proveedor.id } }"
              >Editar</RouterLink
            >
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup lang="ts">
import type { Productos } from '@/interfaces/productos.interface'
import axios from 'axios'
import { computed, onMounted, ref } from 'vue'

const proveedorArray = ref<Productos[]>([])
const filtroProveedor = ref('') // Variable para el filtro

const getProductos = async () => {
  const endpoint = 'http://localhost:8080/api/productos'

  try {
    const response = await axios.get(endpoint)
    proveedorArray.value = response.data
    console.log(proveedorArray.value)
  } catch (error) {
    console.error(error)
  }
}

// Computed para filtrar los proveedores
const proveedoresFiltrados = computed(() => {
  if (!filtroProveedor.value) {
    return proveedorArray.value
  }
  return proveedorArray.value.filter((proveedor) =>
    proveedor.proveedor.nombre.toLowerCase().includes(filtroProveedor.value.toLowerCase())
  )
})

onMounted(async () => {
  await getProductos()
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
  text-align: center;
}

.filter-container {
  margin: 20px 0;
}

input {
  padding: 8px;
  width: 100%;
  max-width: 300px;
  border: 1px solid #ddd;
  border-radius: 4px;
}

table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;
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
