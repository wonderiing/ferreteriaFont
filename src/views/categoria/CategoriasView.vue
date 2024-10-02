<template>
  <div class="table-container">
    <h2>Lista de Pedidos</h2>

    <!-- Campo de entrada para filtrar por nombre de proveedor -->
    <div class="filter-container">
      <br />
      <RouterLink
        :to="{ name: 'crearC' }"
        class="px-4 py-2 mx-1 text-white bg-gray-800 rounded hover:bg-gray-700 disabled:opacity-50"
      >
        Crear Categorias
      </RouterLink>
    </div>

    <table>
      <thead>
        <tr>
          <th>ID</th>
          <th>Nombre</th>
          <th>Edicion</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="categoria in categoriaArray" :key="categoria.id">
          <td>{{ categoria.id }}</td>
          <td>{{ categoria.nombre }}</td>
          <td>
            <RouterLink :to="{ name: 'editarC', params: { id: categoria.id } }">Editar</RouterLink>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup lang="ts">
import type { Categoria } from '@/interfaces/categoria.interface'
import axios from 'axios'
import { onMounted, ref } from 'vue'

const categoriaArray = ref<Categoria[]>([])

const getCategorias = async () => {
  const endpoint = 'http://localhost:8080/api/categorias'
  try {
    const response = await axios.get(endpoint)
    categoriaArray.value = response.data
  } catch (err) {
    console.error(err)
  }
}

onMounted(async () => {
  await getCategorias()
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
