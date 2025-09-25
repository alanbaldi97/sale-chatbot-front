<template>
  <div class="space-y-6">
    <div class="flex items-center justify-between">
      <div>
        <h1 class="text-2xl font-bold text-gray-900 dark:text-white">
          Proyectos
        </h1>
        <p class="text-gray-600 dark:text-gray-400">
          Gestiona todos tus proyectos
        </p>
      </div>
      <UButton color="primary">
        <template #leading>
          <UIcon name="i-heroicons-plus" />
        </template>
        Nuevo proyecto
      </UButton>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <UCard v-for="project in projects" :key="project.id">
        <template #header>
          <div class="flex items-center justify-between">
            <h3 class="text-lg font-medium text-gray-900 dark:text-white">
              {{ project.name }}
            </h3>
            <UBadge :color="project.status === 'active' ? 'green' : project.status === 'pending' ? 'yellow' : 'gray'" variant="soft">
              {{ project.status }}
            </UBadge>
          </div>
        </template>
        
        <div class="space-y-3">
          <p class="text-sm text-gray-600 dark:text-gray-400">
            {{ project.description }}
          </p>
          
          <div class="flex items-center space-x-2">
            <UIcon name="i-heroicons-calendar" class="w-4 h-4 text-gray-400" />
            <span class="text-xs text-gray-500 dark:text-gray-400">
              {{ project.dueDate }}
            </span>
          </div>
          
          <div class="flex items-center space-x-2">
            <span class="text-xs text-gray-500 dark:text-gray-400">Progreso:</span>
            <UProgress :value="project.progress" class="flex-1" />
            <span class="text-xs text-gray-500 dark:text-gray-400">{{ project.progress }}%</span>
          </div>
          
          <div class="flex items-center space-x-1">
            <UAvatar v-for="member in project.team" :key="member" :src="member" size="xs" />
          </div>
        </div>
      </UCard>
    </div>
  </div>
</template>

<script setup lang="ts">
const projects = [
  {
    id: 1,
    name: 'Rediseño de sitio web',
    description: 'Actualización completa del diseño y funcionalidad del sitio principal.',
    status: 'active',
    progress: 75,
    dueDate: '15 Sep 2024',
    team: [
      'https://avatars.githubusercontent.com/u/904724?v=4',
      'https://avatars.githubusercontent.com/u/5375356?v=4'
    ]
  },
  {
    id: 2,
    name: 'App móvil',
    description: 'Desarrollo de la aplicación móvil para iOS y Android.',
    status: 'pending',
    progress: 30,
    dueDate: '30 Oct 2024',
    team: [
      'https://avatars.githubusercontent.com/u/1402241?v=4'
    ]
  },
  {
    id: 3,
    name: 'Dashboard Analytics',
    description: 'Panel de control para visualización de datos y métricas.',
    status: 'completed',
    progress: 100,
    dueDate: '01 Aug 2024',
    team: [
      'https://avatars.githubusercontent.com/u/904724?v=4',
      'https://avatars.githubusercontent.com/u/5375356?v=4',
      'https://avatars.githubusercontent.com/u/1402241?v=4'
    ]
  }
]
</script>
