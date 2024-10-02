<template>
  <!-- component -->
  <div class="flex items-center justify-center min-h-screen p-12">
    <!-- Cambié max-w-[550px] a min-h-screen -->
    <div class="mx-auto w-full max-w-[550px]">
      <form method="PUT" @submit.prevent="putProveedor">
        <div class="mb-5">
          <label for="name" class="mb-3 block text-base font-medium text-[#07074D]"> Nombre </label>
          <input
            type="text"
            name="name"
            id="name"
            v-model="nombreR"
            class="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
          />
        </div>
        <div class="mb-5">
          <label for="email" class="mb-3 block text-base font-medium text-[#07074D]">
            Telefono
          </label>
          <input
            type="text"
            name="email"
            id="email"
            v-model="telefonoR"
            placeholder="example@domain.com"
            class="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
          />
        </div>
        <div class="mb-5">
          <label for="subject" class="mb-3 block text-base font-medium text-[#07074D]">
            Stock
          </label>
          <input
            type="text"
            name="subject"
            id="subject"
            v-model="correoR"
            class="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
          />
        </div>

        <div>
          <button
            class="hover:shadow-form rounded-md bg-[#6A64F1] py-3 px-8 text-base font-semibold text-white outline-none"
          >
            Submit
          </button>
          <br />
          <br />
        </div>
      </form>
      <button
        class="hover:shadow-form rounded-md bg-[#ff0707] py-3 px-10 text-base font-semibold text-white outline-none"
      >
        Delete
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Proveedores } from '@/interfaces/proveedores.interface'
import axios from 'axios'
import { onMounted, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const router = useRoute()
const routerR = useRouter()

const nombreR = ref('')
const telefonoR = ref('')
const correoR = ref('')
const contactoId = ref()
const endpoint = `http://localhost:8080/api/proveedores/${router.params.id}`
const proveedor = ref<Proveedores>()

const getProveedor = async () => {
  try {
    const response = await axios.get(endpoint)
    const { nombre, contacto } = response.data
    nombreR.value = nombre
    const { id, telefono, correo } = response.data.contacto
    ;(correoR.value = correo), (contactoId.value = id), (telefonoR.value = telefono)
    console.log(proveedor.value)
  } catch (err) {
    console.error(err)
  }
}

const submitContacto = async () => {
  try {
    const endpoint = `http://localhost:8080/api/contactos/${contactoId.value}`
    const data = {
      telefono: telefonoR.value,
      correo: correoR.value
    }
    const response = await axios.put(endpoint, data)
    console.log(response.data)
  } catch (err) {
    console.error(err)
  }
}

const putProveedor = async () => {
  try {
    await submitContacto()
    const data = {
      nombre: nombreR.value,
      contactoId: contactoId.value
    }
    const response = await axios.put(endpoint, data)
    console.log(response)
    alert('Proveedor Actualizado Correctamente')
    routerR.replace({ name: 'proveedores' })
  } catch (err) {
    console.error(err)
  }
}

const deleteProveedor = async () => {
  try {
    await axios.delete(endpoint)
    alert('Eliminado exitosamente')
    routerR.replace({ name: 'proveedores' })
  } catch (err) {
    alert('Algo fallo')
  }
}

onMounted(async () => {
  await getProveedor()
})
</script>
