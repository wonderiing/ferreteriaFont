<template>
  <!-- component -->

  <div class="flex items-center justify-center min-h-screen p-12">
    <!-- Cambié max-w-[550px] a min-h-screen -->
    <div class="mx-auto w-full max-w-[550px]">
      <form method="POST" @submit.prevent="submitCategoria">
        <h2 class="mb-3 block font-medium text-[#07074D]">Crear Categoria</h2>
        <br />

        <!-- Nombre del producto -->
        <div class="mb-5">
          <label for="name" class="mb-3 block text-base font-medium text-[#07074D]"> Nombre </label>
          <input
            type="text"
            name="name"
            id="name"
            v-model="nombre"
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
    </div>
  </div>
</template>

<script setup lang="ts">
import axios from 'axios'
import { ref } from 'vue'

const nombre = ref('')
const endpoint = 'http://localhost:8080/api/categorias'

const submitCategoria = async () => {
  const data = {
    nombre: nombre.value
  }
  try {
    const response = await axios.post(endpoint, data)
    console.log(response.data)
    alert('Categoria registrada exitosamente')
  } catch (err) {
    alert('Algo fallo')
    console.error(err)
  }
}
</script>
