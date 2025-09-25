<template>
  <div class="min-h-screen bg-gradient-to-br from-gray-50 via-slate-50 to-gray-100 dark:bg-gradient-to-br dark:from-slate-800 dark:via-blue-900/20 dark:to-slate-700">
    <!-- Header -->
    <header class="sticky top-0 z-40 bg-white/90 dark:bg-slate-900/90 backdrop-blur-xl shadow-xs border-b border-slate-200/50 dark:border-slate-600/50">
      <AppHeader :sidebar-open="sidebarOpen" @toggle-sidebar="toggleSidebar" />
    </header>

    <!-- Sidebar -->
    <AppSidebar v-model="sidebarOpen" />

    <!-- Main content -->
    <main :class="[
      'transition-all duration-300 ease-in-out',
      sidebarOpen ? 'lg:pl-64' : 'lg:pl-0'
    ]">
      <div class="px-4 py-6 sm:px-6 lg:px-8">
        <NuxtPage />
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
const sidebarOpen = ref(true) // Por defecto abierto en desktop

const toggleSidebar = () => {
  sidebarOpen.value = !sidebarOpen.value
}
</script>
