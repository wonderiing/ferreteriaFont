<template>
  <!-- component -->

  <div class="flex items-center justify-center min-h-screen p-12">
    <!-- Cambié max-w-[550px] a min-h-screen -->
    <div class="mx-auto w-full max-w-[550px]">
      <form method="PUT" @submit.prevent="putCategoria">
        <h2 class="mb-3 block font-medium text-[#07074D]">Editar Categoria</h2>
        <br />

        <!-- Nombre del producto -->
        <div class="mb-5">
          <label for="name" class="mb-3 block text-base font-medium text-[#07074D]"> Nombre </label>
          <input
            type="text"
            name="name"
            v-model="nombre"
            id="name"
            class="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
          />
        </div>

        <!-- Botón de envío -->
        <div>
          <button
            class="hover:shadow-form rounded-md bg-[#6A64F1] py-3 px-8 text-base font-semibold text-white outline-none"
          >
            Submit
          </button>
        </div>
      </form>
      <br />
      <button
        class="hover:shadow-form rounded-md bg-[#ff0707] py-3 px-10 text-base font-semibold text-white outline-none"
        @click="deleteCategorias"
      >
        Delete
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import axios from 'axios'
import { ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const nombre = ref('')
const router = useRoute()
const routerR = useRouter()
const endpoint = `http://localhost:8080/api/categorias/${router.params.id}`

const putCategoria = async () => {
  const data = {
    nombre: nombre.value
  }
  try {
    const response = await axios.put(endpoint, data)
    console.log(response.data)
    alert('Categoria Modificada Exitosamente')
    routerR.replace({ name: 'categorias' })
  } catch (err) {
    alert('Algo fallo')
    console.error(err)
  }
}

const deleteCategorias = async () => {
  try {
    axios.delete(endpoint)
    alert('Eliminado Correctamente')
  } catch (err) {
    alert('Algo fallo')
    console.error(err)
  }
}
</script>
