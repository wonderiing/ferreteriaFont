<template>
  <!-- component -->
  <div class="flex items-center justify-center min-h-screen p-12">
    <!-- Cambié max-w-[550px] a min-h-screen -->
    <div class="mx-auto w-full max-w-[550px]">
      <form method="POST" @submit.prevent="putProdocuto">
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
            Precio
          </label>
          <input
            type="number"
            name="email"
            id="email"
            v-model="precioR"
            placeholder="example@domain.com"
            class="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
          />
        </div>
        <div class="mb-5">
          <label for="subject" class="mb-3 block text-base font-medium text-[#07074D]">
            Stock
          </label>
          <input
            type="number"
            name="subject"
            id="subject"
            v-model="stockR"
            class="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
          />
        </div>
        <div class="mb-5">
          <label for="message" class="mb-3 block text-base font-medium text-[#07074D]">
            Descripcion
          </label>
          <textarea
            type="text"
            rows="4"
            v-model="descripcionR"
            name="message"
            id="message"
            class="w-full resize-none rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
          ></textarea>
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
        @click="deleteProducto"
      >
        Delete
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { PedidoByID } from '@/interfaces/productoById.interface'
import axios from 'axios'
import { onMounted, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const producto = ref<PedidoByID>()
const router = useRoute()
const endpoint = `http://localhost:8080/api/productos/${router.params.id}`
const nombreR = ref('')
const precioR = ref()
const stockR = ref()
const descripcionR = ref('')
const routerR = useRouter()

const getProductoById = async () => {
  try {
    const response = await axios.get(endpoint)
    producto.value = response.data
    const { nombre, stock, precio, descripcion } = await response.data
    ;(nombreR.value = nombre),
      (stockR.value = stock),
      (precioR.value = precio),
      (descripcionR.value = descripcion)
  } catch (err) {
    console.error(err)
  }
}

const deleteProducto = async () => {
  try {
    await axios.delete(endpoint)
    alert('Producto Eliminado Correctamente')
  } catch (err) {
    alert('Algo fallo al Eliminar el producto')
  }
}

const putProdocuto = async () => {
  try {
    const data = {
      nombre: nombreR.value,
      precio: precioR.value,
      stock: stockR.value,
      descripcion: descripcionR.value,
      categoriaId: producto.value?.categoria.id,
      imagen: producto.value?.imagen,
      estado: producto.value?.estado,
      proveedorId: producto.value?.proveedor.id
    }

    const response = await axios.put(endpoint, data)
    alert('Producto Modificado Exitosamente')
    console.log(response.data)
    routerR.replace({ name: 'productos' })
  } catch (error) {
    console.error(error)
  }
}

onMounted(async () => {
  await getProductoById()
})
</script>

<style scoped>
.flex {
  flex-direction: column;
}

.min-h-screen {
  min-height: calc(100vh - 100px);
}
</style>
