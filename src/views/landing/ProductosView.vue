<template>
  <div class="flex flex-wrap justify-center items-center min-h-screen p-4 bg-gray-100 mt-16">
    <div
      class="max-w-[240px] mx-4 mb-6 transition-transform transform hover:scale-105 card"
      v-for="producto in paginatedProducts"
      :key="producto.id"
    >
      <div
        class="relative flex flex-col text-gray-700 bg-white shadow-lg rounded-xl overflow-hidden transition-shadow duration-300 hover:shadow-xl"
      >
        <div class="h-40 overflow-hidden">
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQmq-8bB6LONzrMn5nTFdaT0EARwio0Q7EmVw&s"
            alt="card-image"
            class="object-cover w-full h-full"
          />
        </div>
        <div class="p-4">
          <h5 class="text-lg font-semibold text-blue-gray-900 mb-2">{{ producto.nombre }}</h5>
          <h5 class="text-lg font-semibold text-blue-gray-900 mb-2">${{ producto.precio }}</h5>
          <h5 class="text-lg font-semibold text-blue-gray-900 mb-2">Stock: {{ producto.stock }}</h5>

          <p class="text-sm font-light leading-relaxed text-gray-600">
            {{ producto.descripcion }}
          </p>
          <p class="text-sm font-light leading-relaxed text-gray-600">
            Categoria: {{ producto.categoria.nombre }}
          </p>
        </div>
        <div class="p-4 pt-0">
          <RouterLink
            :to="{ name: 'venta', params: { id: producto.id } }"
            class="w-full text-xs font-bold uppercase transition-all py-2 px-4 rounded-lg bg-gray-900 text-white shadow-md hover:shadow-lg focus:opacity-90"
            type="button"
          >
            Simular Venta
          </RouterLink>
          <br />
          <br />
          <RouterLink
            :to="{ name: 'editar', params: { id: producto.id } }"
            class="w-full text-xs font-bold uppercase transition-all py-2 px-4 rounded-lg bg-gray-900 text-white shadow-md hover:shadow-lg focus:opacity-90"
            type="button"
          >
            Editar Producto
          </RouterLink>
        </div>
      </div>
    </div>
  </div>

  <!-- Pagination Controls -->
  <div class="flex justify-center mt-4">
    <button
      @click="prevPage"
      :disabled="currentPage === 1"
      class="px-4 py-2 mx-1 text-white bg-gray-800 rounded hover:bg-gray-700 disabled:opacity-50"
    >
      Previous
    </button>
    <button
      @click="nextPage"
      :disabled="currentPage === totalPages"
      class="px-4 py-2 mx-1 text-white bg-gray-800 rounded hover:bg-gray-700 disabled:opacity-50"
    >
      Next
    </button>
    <RouterLink
      :to="{ name: 'crear' }"
      class="px-4 py-2 mx-1 text-white bg-gray-800 rounded hover:bg-gray-700 disabled:opacity-50"
    >
      Crear Producto
    </RouterLink>
  </div>
</template>

<script setup lang="ts">
import type { Productos } from '@/interfaces/productos.interface'
import axios from 'axios'
import { onMounted, ref, computed } from 'vue'

const productosArray = ref<Productos[]>([])
const currentPage = ref(1)
const itemsPerPage = 10

const paginatedProducts = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage
  const end = start + itemsPerPage
  return productosArray.value.slice(start, end)
})

const totalPages = computed(() => {
  return Math.ceil(productosArray.value.length / itemsPerPage)
})

const nextPage = () => {
  if (currentPage.value < totalPages.value) {
    currentPage.value++
  }
}

const prevPage = () => {
  if (currentPage.value > 1) {
    currentPage.value--
  }
}

const getProductos = async () => {
  const endpoint = 'http://localhost:8080/api/productos'

  try {
    const response = await axios.get(endpoint)
    productosArray.value = response.data
    console.log(productosArray.value)
  } catch (error) {
    console.error(error)
  }
}

onMounted(async () => {
  getProductos()
})
</script>

<style scoped>
.card {
  margin-bottom: 1.5rem;
  transition: transform 0.3s;
}

.card:hover {
  transform: translateY(-5px);
}

.card img {
  transition: transform 0.3s;
}

.card img:hover {
  transform: scale(1.1);
}

body {
  background-color: #f3f4f6;
}
</style>
