<template>
  <div class="min-h-screen bg-gray-50 dark:bg-gray-900">
    <!-- Solo header, sin sidebar -->
    <header class="sticky top-0 z-40 bg-white dark:bg-gray-900 shadow-sm">
      <div class="w-full flex items-center justify-between px-4 sm:px-6 lg:px-8 py-4">
        <div class="flex items-center space-x-2">
          <UIcon name="i-heroicons-home-modern" class="w-8 h-8 text-primary" />
          <h1 class="text-xl font-bold text-gray-900 dark:text-white">Dashboard</h1>
        </div>
        <div class="flex items-center space-x-2">
          <UButton
            :icon="$colorMode.value === 'dark' ? 'i-heroicons-sun' : 'i-heroicons-moon'"
            variant="ghost"
            @click="$colorMode.preference = $colorMode.value === 'dark' ? 'light' : 'dark'"
          />
          <div class="relative" ref="userMenuRef">
            <UButton
              variant="ghost"
              @click="userMenuOpen = !userMenuOpen"
              class="p-1"
            >
              <UAvatar src="https://avatars.githubusercontent.com/u/904724?v=4" size="sm" />
            </UButton>
            
            <!-- Dropdown Menu -->
            <div
              v-if="userMenuOpen"
              class="absolute right-0 mt-2 w-56 bg-white dark:bg-gray-800 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none z-50"
            >
              <div class="py-1">
                <button
                  @click="handleProfileClick"
                  class="flex items-center w-full px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
                >
                  <UIcon name="i-heroicons-user-circle" class="w-4 h-4 mr-3" />
                  Perfil
                </button>
                <button
                  @click="handleSettingsClick"
                  class="flex items-center w-full px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
                >
                  <UIcon name="i-heroicons-cog-8-tooth" class="w-4 h-4 mr-3" />
                  Configuración
                </button>
                <hr class="my-1 border-gray-200 dark:border-gray-600">
                <button
                  @click="handleLogoutClick"
                  class="flex items-center w-full px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
                >
                  <UIcon name="i-heroicons-arrow-left-on-rectangle" class="w-4 h-4 mr-3" />
                  Cerrar sesión
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>

    <!-- Contenido a pantalla completa -->
    <main>
      <slot />
    </main>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'

const userMenuOpen = ref(false)
const userMenuRef = ref()

// Cerrar menú al hacer click fuera
onMounted(() => {
  document.addEventListener('click', (event) => {
    if (userMenuRef.value && !userMenuRef.value.contains(event.target)) {
      userMenuOpen.value = false
    }
  })
})

const handleProfileClick = () => {
  console.log('Perfil')
  userMenuOpen.value = false
}

const handleSettingsClick = () => {
  console.log('Configuración')
  userMenuOpen.value = false
}

const handleLogoutClick = () => {
  console.log('Cerrar sesión')
  userMenuOpen.value = false
}
</script>
