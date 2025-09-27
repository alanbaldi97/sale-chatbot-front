<template>
  <div class="w-full flex items-center justify-between px-4 sm:px-6 lg:px-8 py-4">
    <!-- Logo y título -->
    <div class="flex items-center space-x-3">
      <!-- Botón para toggle sidebar - visible en todos los tamaños -->
      <!-- Icono de hamburguesa -->
      <UButton
        :icon="sidebarOpen ? 'i-heroicons-x-mark' : 'i-heroicons-bars-3'"
        variant="ghost"
        @click="$emit('toggle-sidebar')"
        size="sm"
      
        class="hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-300"
      />
    </div>

    <!-- Acciones del usuario -->
    <div class="flex items-center space-x-2">
      
      <!-- Selector de idioma -->
      <LanguageSelector />
      
      <!-- Notificaciones -->
      <UButton
        icon="i-heroicons-bell"
        variant="ghost"
        class="hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-300"
      />
      
      <!-- Theme toggle -->
      <UButton
        :icon="$colorMode.value === 'dark' ? 'i-heroicons-sun' : 'i-heroicons-moon'"
        variant="ghost"
        @click="$colorMode.preference = $colorMode.value === 'dark' ? 'light' : 'dark'"
        class="hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-300"
      />

      <!-- Fullscreen toggle -->
      <UButton
        :icon="isFullscreen ? 'i-heroicons-arrows-pointing-in' : 'i-heroicons-arrows-pointing-out'"
        variant="ghost"
        @click="toggleFullscreen"
        class="hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-300"
        :title="isFullscreen ? 'Salir de pantalla completa' : 'Pantalla completa'"
      />

      <!-- Avatar del usuario -->
      <UDropdownMenu :items="items" :popper="{ placement: 'bottom-end' }">
        <UButton
          variant="ghost"
          class="p-1 hover:bg-slate-100 dark:hover:bg-slate-700 ring-2 ring-transparent hover:ring-indigo-400 dark:hover:ring-purple-400 rounded-full transition-all duration-200"
        >
          <UAvatar
            src="https://avatars.githubusercontent.com/u/904724?v=4"
            alt="Avatar"
            size="sm"
          />
        </UButton>
      </UDropdownMenu>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { DropdownMenuItem } from '@nuxt/ui';
import { ref, onMounted, onUnmounted, computed } from 'vue'

interface Props {
  sidebarOpen?: boolean
}

interface Emits {
  (e: 'toggle-sidebar'): void
}

const props = withDefaults(defineProps<Props>(), {
  sidebarOpen: false
})

defineEmits<Emits>()

const isFullscreen = ref(false)
const { t } = useI18n()

const items: DropdownMenuItem[] = [
  {
    label: 'Logout',
    icon: 'i-heroicons-arrow-left-on-rectangle',
    onSelect: () => handleLogoutClick(),
    class: 'text-red-500 dark:text-red-400'
  }
]

// Estructura del menú de usuario para UDropdown
// const userMenuItems = computed(() => [
//   [{
//     label: t('user.profile'),
//     icon: 'i-heroicons-user-circle',
//     click: handleProfileClick
//   }, {
//     label: t('user.settings'),
//     icon: 'i-heroicons-cog-8-tooth',
//     click: handleSettingsClick
//   }], [{
//     label: t('user.logout'),
//     icon: 'i-heroicons-arrow-left-on-rectangle',
//     click: handleLogoutClick,
//     class: 'text-red-500 dark:text-red-400'
//   }]
// ])

// Función para toggle fullscreen
const toggleFullscreen = async () => {
  try {
    if (!document.fullscreenElement) {
      await document.documentElement.requestFullscreen()
      isFullscreen.value = true
    } else {
      await document.exitFullscreen()
      isFullscreen.value = false
    }
  } catch (error) {
    console.warn('Error al cambiar modo fullscreen:', error)
  }
}

// Escuchar cambios en fullscreen
const handleFullscreenChange = () => {
  isFullscreen.value = !!document.fullscreenElement
}

onMounted(() => {
  // Escuchar cambios de fullscreen
  document.addEventListener('fullscreenchange', handleFullscreenChange)
  
  // Verificar estado inicial
  isFullscreen.value = !!document.fullscreenElement
})

onUnmounted(() => {
  document.removeEventListener('fullscreenchange', handleFullscreenChange)
})

const handleProfileClick = () => {
  console.log('Perfil')
}

const handleSettingsClick = () => {
  console.log('Configuración')
}

const handleLogoutClick = async () => {
  console.log('Cerrar sesión')
  const authStore = useAuthStore()
  await authStore.logout()
  navigateTo('/login')
}
</script>
