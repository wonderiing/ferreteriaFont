<template>
  <!-- component -->

  <div class="flex items-center justify-center min-h-screen p-12">
    <!-- Cambié max-w-[550px] a min-h-screen -->
    <div class="mx-auto w-full max-w-[550px]">
      <form method="POST" @submit.prevent="submitProveedor">
        <h2 class="mb-3 block font-medium text-[#07074D]">Registrar Proveedor</h2>
        <br />

        <!-- Nombre del producto -->
        <div class="mb-5">
          <label for="name" class="mb-3 block text-base font-medium text-[#07074D]"> Nombre </label>
          <input
            type="text"
            v-model="nombre"
            name="name"
            id="name"
            class="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
          />
        </div>

        <!-- Precio -->
        <div class="mb-5">
          <label for="email" class="mb-3 block text-base font-medium text-[#07074D]">
            Telefono
          </label>
          <input
            type="text"
            name="telefono"
            v-model="telefono"
            id="telefono"
            placeholder=""
            class="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
          />
        </div>

        <!-- Stock -->
        <div class="mb-5">
          <label for="subject" class="mb-3 block text-base font-medium text-[#07074D]">
            Correo Electronico
          </label>
          <input
            type="text"
            v-model="correo"
            name="subject"
            id="subject"
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

const telefono = ref('')
const correo = ref('')
const contactoId = ref()
const nombre = ref('')

const submitContacto = async () => {
  const endpoint = 'http://localhost:8080/api/contactos'
  const data = {
    telefono: telefono.value,
    correo: correo.value
  }
  try {
    const response = await axios.post(endpoint, data)
    const { id } = response.data
    contactoId.value = id
    console.log(response.data)
  } catch (err) {
    console.error(err)
  }
}
const submitProveedor = async () => {
  await submitContacto()
  const endpoint = 'http://localhost:8080/api/proveedores'
  const data = {
    nombre: nombre.value,
    contactoId: contactoId.value
  }
  try {
    await axios.post(endpoint, data)
    alert('Proveedor registrado con exito')
  } catch (err) {
    console.error(err)
    alert('Algo fallo')
  }
}
</script>
