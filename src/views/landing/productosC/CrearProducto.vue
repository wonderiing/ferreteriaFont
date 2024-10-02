<template>
  <!-- component -->

  <div class="flex items-center justify-center min-h-screen p-12">
    <!-- Cambié max-w-[550px] a min-h-screen -->
    <div class="mx-auto w-full max-w-[550px]">
      <form method="POST" @submit.prevent="submitPedido">
        <h2 class="mb-3 block font-medium text-[#07074D]">Crear Producto</h2>
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

        <!-- Precio -->
        <div class="mb-5">
          <label for="email" class="mb-3 block text-base font-medium text-[#07074D]">
            Precio
          </label>
          <input
            type="number"
            v-model="precio"
            name="email"
            id="email"
            placeholder="0.00"
            class="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
          />
        </div>

        <!-- Stock -->
        <div class="mb-5">
          <label for="subject" class="mb-3 block text-base font-medium text-[#07074D]">
            Stock
          </label>
          <input
            type="number"
            v-model="stock"
            name="subject"
            id="subject"
            class="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
          />
        </div>

        <!-- Categoría -->
        <div class="mb-5">
          <label for="categoria" class="mb-3 block text-base font-medium text-[#07074D]">
            Categoría
          </label>
          <select
            name="categoria"
            id="categoria"
            v-model="categoriaId"
            class="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
          >
            <option value="" disabled selected>Seleccione una categoría</option>
            <!-- Aquí recorremos el array de categorías -->
            <option v-for="categoria in categoriaArray" :key="categoria.id" :value="categoria.id">
              {{ categoria.nombre }}
            </option>
          </select>
        </div>

        <div class="mb-5">
          <label for="categoria" class="mb-3 block text-base font-medium text-[#07074D]">
            Proveedores
          </label>
          <select
            name="categoria"
            id="categoria"
            v-model="proveedorId"
            class="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
          >
            <option value="" disabled selected>Seleccione una categoría</option>
            <option v-for="proveedor in proveedoresArray" :key="proveedor.id" :value="proveedor.id">
              {{ proveedor.nombre }}
            </option>
          </select>
        </div>

        <!-- Descripción -->
        <div class="mb-5">
          <label for="message" class="mb-3 block text-base font-medium text-[#07074D]">
            Descripción
          </label>
          <textarea
            rows="4"
            name="message"
            id="message"
            v-model="descripcion"
            class="w-full resize-none rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
          ></textarea>
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
import type { Categoria } from '@/interfaces/categoria.interface'
import type { Proveedores } from '@/interfaces/proveedores.interface'
import axios from 'axios'
import { onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'

const nombre = ref('')
const precio = ref()
const stock = ref()
const descripcion = ref('')
const categoriaId = ref()
const proveedorId = ref()
const routerR = useRouter()

const categoriaArray = ref<Categoria[]>([])
const proveedoresArray = ref<Proveedores[]>([])

const endpoint = 'http://localhost:8080/api/categorias'
const getCategoria = async () => {
  try {
    const response = await axios.get(endpoint)
    categoriaArray.value = response.data
    console.log(categoriaArray.value)
  } catch (err) {
    console.error(err)
  }
}

const getProveedor = async () => {
  try {
    const endpoint = 'http://localhost:8080/api/proveedores'
    const response = await axios.get(endpoint)
    proveedoresArray.value = response.data
    console.log(proveedoresArray.value)
  } catch (err) {
    console.error(err)
  }
}

const submitPedido = async () => {
  const endpoint = 'http://localhost:8080/api/productos'
  const data = {
    nombre: nombre.value,
    precio: precio.value,
    stock: stock.value,
    descripcion: descripcion.value,
    estado: 'Activo',
    imagen: 'producto.jpg',
    categoriaId: categoriaId.value,
    proveedorId: proveedorId.value
  }

  try {
    const response = await axios.post(endpoint, data)
    console.log(response.data)
    alert('Producto agregado correctamente')
    routerR.replace({ name: 'productos' })
  } catch (err) {
    console.error(err)
  }
}

onMounted(async () => {
  await getCategoria(), getProveedor()
})
</script>
