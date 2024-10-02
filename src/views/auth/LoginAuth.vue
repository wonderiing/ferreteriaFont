<template>
  <!-- text login -->
  <h1 class="text-center text-2xl font-bold text-gray-600 mb-6">LOGIN</h1>
  <!-- email input -->
  <div class="w-3/4 mb-6">
    <input
      type="email"
      name="email"
      id="email"
      class="w-full py-4 px-8 bg-slate-200 placeholder:font-semibold rounded hover:ring-1 outline-blue-500"
      placeholder="email"
      v-model="email"
    />
  </div>
  <!-- password input -->
  <div class="w-3/4 mb-6">
    <input
      type="password"
      name="password"
      id="password"
      class="w-full py-4 px-8 bg-slate-200 placeholder:font-semibold rounded hover:ring-1 outline-blue-500"
      placeholder="Password"
      v-model="password"
    />
  </div>
  <!-- remember input -->
  <div class="w-3/4 flex flex-row justify-between">
    <div class="flex items-center gap-x-1">
      <input type="checkbox" name="remember" id="" class="w-4 h-4" />
      <label for="" class="text-sm text-slate-400">Remember me</label>
    </div>
    <div>
      <a href="#" class="text-sm text-slate-400 hover:text-blue-500">Forgot?</a>
    </div>
  </div>
  <!-- button -->
  <div class="w-3/4 mt-4">
    <button
      type="submit"
      class="py-4 bg-blue-400 w-full rounded text-blue-50 font-bold hover:bg-blue-700"
      @click="getSuperUser"
    >
      LOGIN
    </button>
  </div>
</template>

<script setup lang="ts">
import axios from 'axios'
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const email = ref('')
const password = ref('')

const getSuperUser = async () => {
  const endpoint = 'http://localhost:8080/api/super-usuarios/buscar'
  const data = {
    correo: email.value
  }

  try {
    const response = await axios.post(endpoint, data)
    const { correo, id, password } = await response.data
    localStorage.setItem('password', password)
    localStorage.setItem('correo', password)
    localStorage.setItem('id', id)

    alert('Login exitoso')
    router.replace({ name: 'ferreteria' })
  } catch (error) {
    alert('Algo fallo, intentalo denuevo')
    console.log(error)
  }
}
</script>
