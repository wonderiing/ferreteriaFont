<template>
  <!-- component -->
  <link
    rel="stylesheet"
    href="https://demos.creative-tim.com/notus-js/assets/styles/tailwind.css"
  />
  <link
    rel="stylesheet"
    href="https://demos.creative-tim.com/notus-js/assets/vendor/@fortawesome/fontawesome-free/css/all.min.css"
  />

  <nav
    class="top-0 absolute z-50 w-full flex flex-wrap items-center justify-between px-2 py-3 navbar-expand-lg bg-blueGray-800"
  >
    <div class="container px-4 mx-auto flex flex-wrap items-center justify-between">
      <div
        class="w-full relative flex justify-between lg:w-auto lg:static lg:block lg:justify-start"
      >
        <a
          class="text-sm font-bold leading-relaxed inline-block mr-4 py-2 whitespace-nowrap uppercase text-white"
          href="#"
          >Ferreteria</a
        ><button
          class="cursor-pointer text-xl leading-none px-3 py-1 border border-solid border-transparent rounded bg-transparent block lg:hidden outline-none focus:outline-none"
          type="button"
          onclick="toggleNavbar('example-collapse-navbar')"
        >
          <i class="text-white fas fa-bars"></i>
        </button>
      </div>
      <div
        class="lg:flex flex-grow items-center bg-white lg:bg-opacity-0 lg:shadow-none hidden bg-blueGray-800"
        id="example-collapse-navbar"
      >
        <ul class="flex flex-col lg:flex-row list-none mr-auto">
          <li class="flex items-center">
            <a
              class="lg:text-white lg:hover:text-blueGray-200 text-blueGray-700 px-3 py-4 lg:py-2 flex items-center text-xs uppercase font-bold"
              href="https://www.creative-tim.com/learning-lab/tailwind/js/overview/notus?ref=njs-register"
              ><i
                class="lg:text-blueGray-200 text-blueGray-400 far fa-file-alt text-lg leading-lg mr-2"
              ></i>
              Docs</a
            >
          </li>
        </ul>
        <RouterLink
          :to="{ name: 'productos' }"
          class="text-sm font leading-relaxed inline-block mr-4 py-2 whitespace-nowrap uppercase text-white"
          >Productos</RouterLink
        >
        <RouterLink
          :to="{ name: 'detalles' }"
          class="text-sm font leading-relaxed inline-block mr-4 py-2 whitespace-nowrap uppercase text-white"
          >Detalles de Pedidos</RouterLink
        >
        <RouterLink
          :to="{ name: 'ventas' }"
          class="text-sm font leading-relaxed inline-block mr-4 py-2 whitespace-nowrap uppercase text-white"
          >Registro de Ventas</RouterLink
        >
        <RouterLink
          :to="{ name: 'proveedores' }"
          class="text-sm font leading-relaxed inline-block mr-4 py-2 whitespace-nowrap uppercase text-white"
          >Proveedores</RouterLink
        >
        <RouterLink
          :to="{ name: 'categorias' }"
          class="text-sm font leading-relaxed inline-block mr-4 py-2 whitespace-nowrap uppercase text-white"
          >Categorias</RouterLink
        >
      </div>
    </div>
  </nav>
  <body>
    <RouterView></RouterView>
  </body>
  <footer class="relative pt-8 pb-6 mt-16">
    <div class="container mx-auto px-4">
      <div class="flex flex-wrap items-center md:justify-between justify-center">
        <div class="w-full md:w-6/12 px-4 mx-auto text-center">
          <div class="text-sm text-blueGray-500 font-semibold py-1">
            <a class="text-blueGray-500 hover:text-gray-800" target="_blank"
              >Bases de Datos Proyecto Final</a
            >
            Carlos Rodriguez
            <a class="text-blueGray-500 hover:text-blueGray-800" target="_blank"></a>.
          </div>
        </div>
      </div>
    </div>
  </footer>
</template>
