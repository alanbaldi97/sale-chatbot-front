<template>
  <div class="space-y-6">
    <div>
      <h1 class="text-2xl font-bold text-gray-900 dark:text-white">
        Analytics
      </h1>
      <p class="text-gray-600 dark:text-gray-400">
        Visualiza tus métricas y estadísticas
      </p>
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <UCard class="lg:col-span-2">
        <template #header>
          <h3 class="text-lg font-medium text-gray-900 dark:text-white">
            Tráfico del sitio web
          </h3>
        </template>
        
        <div class="h-64 bg-gray-100 dark:bg-gray-800 rounded-lg flex items-center justify-center">
          <div class="text-center">
            <UIcon name="i-heroicons-chart-bar" class="w-12 h-12 text-gray-400 mx-auto mb-2" />
            <p class="text-gray-500 dark:text-gray-400">Gráfico de tráfico aquí</p>
          </div>
        </div>
      </UCard>

      <UCard>
        <template #header>
          <h3 class="text-lg font-medium text-gray-900 dark:text-white">
            Estadísticas clave
          </h3>
        </template>
        
        <div class="space-y-4">
          <div>
            <div class="flex items-center justify-between mb-1">
              <span class="text-sm font-medium text-gray-700 dark:text-gray-300">Conversión</span>
              <span class="text-sm text-gray-500 dark:text-gray-400">3.2%</span>
            </div>
            <UProgress :value="32" />
          </div>
          
          <div>
            <div class="flex items-center justify-between mb-1">
              <span class="text-sm font-medium text-gray-700 dark:text-gray-300">Retención</span>
              <span class="text-sm text-gray-500 dark:text-gray-400">68%</span>
            </div>
            <UProgress :value="68" />
          </div>
          
          <div>
            <div class="flex items-center justify-between mb-1">
              <span class="text-sm font-medium text-gray-700 dark:text-gray-300">Satisfacción</span>
              <span class="text-sm text-gray-500 dark:text-gray-400">92%</span>
            </div>
            <UProgress :value="92" />
          </div>
        </div>
      </UCard>
    </div>
  </div>
</template>
