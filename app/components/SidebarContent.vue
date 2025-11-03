<template>
  <div class="flex flex-col h-full">
    <!-- Logo del sidebar -->
    <div class="flex items-center justify-between p-4 border-b border-slate-200/60 dark:border-slate-700/60">
      <div class="flex items-center space-x-3">
        <div class="w-6 h-6 rounded-lg bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center">
          <UIcon name="i-heroicons-home-modern" class="w-4 h-4 text-white" />
        </div>
        <span class="text-lg font-semibold bg-gradient-to-r from-slate-900 to-slate-700 dark:from-white dark:to-slate-300 bg-clip-text text-transparent">
          Dashboard
        </span>
      </div>
      <UButton
        icon="i-heroicons-x-mark"
        variant="ghost"
        size="sm"
        class="lg:hidden hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-400"
        @click="$emit('close')"
      />
    </div>

    <!-- Navegación principal -->
    <nav class="flex-1 p-4 space-y-3 overflow-y-auto">
      <template v-for="route in routes">
        <AppLink :route="route" />
      </template>
    </nav>

  </div>
</template>

<script setup lang="ts">
import type { Route } from '~/interfaces/route';

defineEmits(['close'])

const routes: Route[] = [
  {
    path: '/',
    name:  $t('nav.orders'),
    icon: 'i-heroicons-shopping-bag'
  },
  {
    path: '/products',
    name: $t('nav.products'),
    icon: 'i-heroicons-cube'
  },
  {
    path: '/faqs',
    name: $t('nav.faqs'),
    icon: 'i-heroicons-question-mark-circle'
  },
  {
    path: '/costs',
    name: $t('nav.costs'),
    icon: 'i-heroicons-currency-dollar'
  },
  {
    path: '/chat',
    name: $t('nav.chat'),
    icon: 'i-heroicons-chat-bubble-left-right'
  }
]

</script>
