<template>
  <div class="space-y-6">
    <!-- Header de la página -->
    <div class="flex items-center justify-between">
      <div>
        <h1 class="text-2xl font-bold text-gray-900 dark:text-white">
          {{ $t('dashboard.title') }}
        </h1>
        <p class="text-gray-600 dark:text-gray-400">
          {{ $t('dashboard.welcome') }}
        </p>
      </div>
      <UButton color="info" size="lg">
        <template #leading>
          <UIcon name="i-heroicons-plus" />
        </template>
        {{ $t('dashboard.createNew') }}
      </UButton>
    </div>

    <!-- Métricas principales -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <UCard>
        <div class="flex items-center justify-between">
          <div>
            <p class="text-sm font-medium text-gray-600 dark:text-gray-400">
              {{ $t('dashboard.metrics.totalUsers') }}
            </p>
            <p class="text-2xl font-bold text-gray-900 dark:text-white">
              2,543
            </p>
          </div>
          <div class="p-4 bg-gradient-to-br from-blue-100 to-blue-200 dark:from-blue-900/80 dark:to-blue-800/80 rounded-2xl shadow-lg ring-1 ring-blue-200/50 dark:ring-blue-700/50">
            <UIcon name="i-heroicons-users" class="w-7 h-7 text-blue-600 dark:text-blue-400" />
          </div>
        </div>
        <div class="mt-4 flex items-center text-sm">
          <span class="text-green-600 dark:text-green-400 font-medium">+12%</span>
          <span class="text-gray-600 dark:text-gray-400 ml-2">{{ $t('dashboard.metrics.lastMonth') }}</span>
        </div>
      </UCard>

      <UCard>
        <div class="flex items-center justify-between">
          <div>
            <p class="text-sm font-medium text-gray-600 dark:text-gray-400">
              {{ $t('dashboard.metrics.revenue') }}
            </p>
            <p class="text-2xl font-bold text-gray-900 dark:text-white">
              $45,231
            </p>
          </div>
          <div class="p-4 bg-gradient-to-br from-green-100 to-green-200 dark:from-green-900/80 dark:to-green-800/80 rounded-2xl shadow-lg ring-1 ring-green-200/50 dark:ring-green-700/50">
            <UIcon name="i-heroicons-currency-dollar" class="w-7 h-7 text-green-600 dark:text-green-400" />
          </div>
        </div>
        <div class="mt-4 flex items-center text-sm">
          <span class="text-green-600 dark:text-green-400 font-medium">+8%</span>
          <span class="text-gray-600 dark:text-gray-400 ml-2">{{ $t('dashboard.metrics.lastMonth') }}</span>
        </div>
      </UCard>

      <UCard>
        <div class="flex items-center justify-between">
          <div>
            <p class="text-sm font-medium text-gray-600 dark:text-gray-400">
              {{ $t('dashboard.metrics.activeProjects') }}
            </p>
            <p class="text-2xl font-bold text-gray-900 dark:text-white">
              24
            </p>
          </div>
          <div class="p-4 bg-gradient-to-br from-purple-100 to-purple-200 dark:from-purple-900/80 dark:to-purple-800/80 rounded-2xl shadow-lg ring-1 ring-purple-200/50 dark:ring-purple-700/50">
            <UIcon name="i-heroicons-folder" class="w-7 h-7 text-purple-600 dark:text-purple-400" />
          </div>
        </div>
        <div class="mt-4 flex items-center text-sm">
          <span class="text-green-600 dark:text-green-400 font-medium">+3</span>
          <span class="text-gray-600 dark:text-gray-400 ml-2">{{ $t('dashboard.metrics.thisWeek') }}</span>
        </div>
      </UCard>

      <UCard>
        <div class="flex items-center justify-between">
          <div>
            <p class="text-sm font-medium text-gray-600 dark:text-gray-400">
              {{ $t('dashboard.metrics.completedTasks') }}
            </p>
            <p class="text-2xl font-bold text-gray-900 dark:text-white">
              89%
            </p>
          </div>
          <div class="p-4 bg-gradient-to-br from-orange-100 to-orange-200 dark:from-orange-900/80 dark:to-orange-800/80 rounded-2xl shadow-lg ring-1 ring-orange-200/50 dark:ring-orange-700/50">
            <UIcon name="i-heroicons-check-circle" class="w-7 h-7 text-orange-600 dark:text-orange-400" />
          </div>
        </div>
        <div class="mt-4 flex items-center text-sm">
          <span class="text-green-600 dark:text-green-400 font-medium">+5%</span>
          <span class="text-gray-600 dark:text-gray-400 ml-2">{{ $t('dashboard.metrics.lastWeek') }}</span>
        </div>
      </UCard>
    </div>

    <!-- Gráficos y contenido adicional -->
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <UCard>
        <template #header>
          <h3 class="text-lg font-medium text-gray-900 dark:text-white">
            {{ $t('dashboard.recentActivity.title') }}
          </h3>
        </template>
        
        <div class="space-y-4">
          <div class="flex items-start space-x-3">
            <UAvatar size="sm" src="https://avatars.githubusercontent.com/u/904724?v=4" />
            <div class="flex-1 min-w-0">
              <p class="text-sm font-medium text-gray-900 dark:text-white">
                John Doe {{ $t('dashboard.recentActivity.userCreatedProject') }}
              </p>
              <p class="text-xs text-gray-500 dark:text-gray-400">
                {{ $t('dashboard.recentActivity.timeAgo.hoursAgo', { hours: 2 }) }}
              </p>
            </div>
          </div>
          
          <div class="flex items-start space-x-3">
            <UAvatar size="sm" src="https://avatars.githubusercontent.com/u/5375356?v=4" />
            <div class="flex-1 min-w-0">
              <p class="text-sm font-medium text-gray-900 dark:text-white">
                Jane Smith {{ $t('dashboard.recentActivity.userCompletedTask') }}
              </p>
              <p class="text-xs text-gray-500 dark:text-gray-400">
                {{ $t('dashboard.recentActivity.timeAgo.hoursAgo', { hours: 4 }) }}
              </p>
            </div>
          </div>
          
          <div class="flex items-start space-x-3">
            <UAvatar size="sm" src="https://avatars.githubusercontent.com/u/1402241?v=4" />
            <div class="flex-1 min-w-0">
              <p class="text-sm font-medium text-gray-900 dark:text-white">
                Mike Johnson {{ $t('dashboard.recentActivity.userUploadedFiles') }}
              </p>
              <p class="text-xs text-gray-500 dark:text-gray-400">
                {{ $t('dashboard.recentActivity.timeAgo.yesterday') }}
              </p>
            </div>
          </div>
        </div>
      </UCard>

      <UCard>
        <template #header>
          <h3 class="text-lg font-medium text-gray-900 dark:text-white">
            {{ $t('dashboard.upcomingTasks.title') }}
          </h3>
        </template>
        
        <div class="space-y-3">
          <div class="flex items-center space-x-3">
            <UCheckbox />
            <div class="flex-1">
              <p class="text-sm font-medium text-gray-900 dark:text-white">
                {{ $t('dashboard.upcomingTasks.reviewProposal') }}
              </p>
              <p class="text-xs text-gray-500 dark:text-gray-400">
                {{ $t('dashboard.upcomingTasks.dueTomorrow') }}
              </p>
            </div>
            <div class="px-3 py-1.5 rounded-full bg-amber-500 text-white shadow-lg">
              <span class="text-xs font-medium">{{ $t('dashboard.upcomingTasks.status.pending') }}</span>
            </div>
          </div>
          
          <div class="flex items-center space-x-3">
            <UCheckbox />
            <div class="flex-1">
              <p class="text-sm font-medium text-gray-900 dark:text-white">
                {{ $t('dashboard.upcomingTasks.updateDocs') }}
              </p>
              <p class="text-xs text-gray-500 dark:text-gray-400">
                {{ $t('dashboard.upcomingTasks.dueInDays', { days: 3 }) }}
              </p>
            </div>
            <div class="px-3 py-1.5 rounded-full bg-blue-500 text-white shadow-lg">
              <span class="text-xs font-medium">{{ $t('dashboard.upcomingTasks.status.inProgress') }}</span>
            </div>
          </div>
          
          <div class="flex items-center space-x-3">
            <UCheckbox />
            <div class="flex-1">
              <p class="text-sm font-medium text-gray-900 dark:text-white">
                {{ $t('dashboard.upcomingTasks.teamMeeting') }}
              </p>
              <p class="text-xs text-gray-500 dark:text-gray-400">
                {{ $t('dashboard.upcomingTasks.fridayMeeting') }}
              </p>
            </div>
            <div class="px-3 py-1.5 rounded-full bg-green-500 text-white shadow-lg">
              <span class="text-xs font-medium">{{ $t('dashboard.upcomingTasks.status.scheduled') }}</span>
            </div>
          </div>
        </div>
      </UCard>
    </div>
  </div>
</template>