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
  <UModal v-model:open="openModal" size="md" :dismissible="false">
      <template #header>
        <h2 class="p-0 font-medium text-gray-900 dark:text-white">
            {{ $t('configuration.title') }}
        </h2>
      </template>
     <template #body>
        <div class="flex flex-wrap justify-between p-1">
          <span class="text-md block text-md font-medium text-gray-700 dark:text-gray-300">{{ $t('configuration.onOff') }}</span>
          <USwitch v-model="configuration.auto_response" />
        </div>
        <div class="p-1 flex flex-wrap justify-between items-center">
          <label class="block text-md font-medium text-gray-700 dark:text-gray-300">
            {{ $t('configuration.hourRange') }}
          </label>
          <USwitch v-model="configuration.hour_range" />
        </div>
        <div v-if="configuration.hour_range" class="flex w-full justify-around bg-gray-200 p-1 rounded-md">
          <div>
            <label class="block text-sm text-gray-600 dark:text-gray-400">
              {{ $t('configuration.startHour') }}
            </label>
            <UInput type="time" v-model="configuration.start_hour" class="mt-1" icon="i-lucide-clock"/>
          </div>
          <div>
            <label class="block text-sm text-gray-600 dark:text-gray-400">
              {{ $t('configuration.endHour') }}
            </label>
            <UInput type="time" v-model="configuration.end_hour" class="mt-1" icon="i-lucide-clock"/>
          </div>
        </div>
     </template>
     <template #footer>
        <div class="flex justify-end space-x-2 w-full">
          <UButton
            variant="soft"
            color="neutral"
            @click="openModal = false"
          >
            {{ $t('common.cancel') }}
          </UButton>
          <UButton
            variant="solid"
            color="primary"
            :loading="loading"
            @click="saveConfiguration"
          >
            {{ $t('common.save') }}
          </UButton>
        </div>
     </template>
  </UModal>
</template>

<script setup lang="ts">
import type { DropdownMenuItem } from '@nuxt/ui';
import { ref, onMounted, onUnmounted } from 'vue'

interface Props {
  sidebarOpen?: boolean
}

interface Emits {
  (e: 'toggle-sidebar'): void
}

const props = withDefaults(defineProps<Props>(), {
  sidebarOpen: false
})

const loading = ref<boolean>(false)

const toast = useToast()

defineEmits<Emits>()

const isFullscreen = ref(false)
const openModal = ref(false)

const configuration = ref({
  auto_response: false,
  hour_range: false,
  start_hour: '09:00',
  end_hour: '18:00'
})

const items: DropdownMenuItem[] = [
  {
    label: $t('user.settings'),
    icon: 'i-heroicons-cog-8-tooth',
    onSelect: () => handleSettingsClick(),
    class: 'text-gray-500 dark:text-gray-400'
  },
  {
    label: $t('user.logout'),
    icon: 'i-heroicons-arrow-left-on-rectangle',
    onSelect: () => handleLogoutClick(),
    class: 'text-red-500 dark:text-red-400'
  }
]

const getConfiguration = async () => {
  try {
    const configData: any = await useFetchRequest('/api/configuration')
    configuration.value.auto_response = configData.auto_response
    configuration.value.hour_range = configData.hour_range
    configuration.value.start_hour = configData.start_hour
    configuration.value.end_hour = configData.end_hour
  } catch (error) {
    toast.add({
      title: 'Error',
      description: $t('configuration.getError'),
      icon: 'i-heroicons-x-circle',
      color: 'error',
    });
  }
}

const saveConfiguration = async () => {
  try {
    loading.value = true

    let payload = {
      auto_response: configuration.value.auto_response,
      hour_range: configuration.value.hour_range,
      start_hour: configuration.value.hour_range ? configuration.value.start_hour : null,
      end_hour: configuration.value.hour_range ? configuration.value.end_hour : null
    }

    await useFetchRequest('/api/configuration', {
      method: 'PUT',
      body: payload
    })
    toast.add({
      title: $t('common.success'),
      description: $t('configuration.savedSuccess'),
      icon: 'i-heroicons-check-circle',
      color: 'success',
    });
  } catch (error) {
    toast.add({
      title: 'Error',
      description: $t('configuration.getError'),
      icon: 'i-heroicons-x-circle',
      color: 'error',
    });
  } finally {
    loading.value = false
    openModal.value = false
  }
}

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
  getConfiguration()
})

onUnmounted(() => {
  document.removeEventListener('fullscreenchange', handleFullscreenChange)
})

const handleSettingsClick = () => {
  openModal.value = true
}

const handleLogoutClick = async () => {
  const authStore = useAuthStore()
  await authStore.logout()
  navigateTo('/login')
}
</script>
