<template>
    <UButton
        v-if="!hasChildren"
        :to="route.path"
        variant="ghost"
        class="w-full justify-start hover:bg-blue-100 dark:hover:bg-blue-800/30 hover:text-blue-800 dark:hover:text-blue-200 rounded-lg transition-all duration-200"
        :class="{ 'bg-blue-50 dark:bg-blue-800/40 text-blue-700 dark:text-blue-100 border-r-2 border-blue-500 dark:border-blue-400': $route.path === route.path }"
    >
        <template #leading>
            <UIcon :name="route.icon" class="w-4 h-4" />
        </template>
        {{ route.name }}
    </UButton>
    <div class="space-y-1" v-else-if="!route.section">
        <UButton
            variant="ghost"
            class="w-full justify-start hover:bg-blue-100 dark:hover:bg-blue-800/30 dark:hover:text-blue-200 rounded-lg transition-all duration-200"
            :class="{ 
                'bg-blue-50 dark:bg-blue-800/40 text-blue-700 dark:text-blue-100': isOpen || $route.path.startsWith(route.path)
            }"
            @click="toggle"
        >
            <template #leading>
                <UIcon name="i-heroicons-folder" class="w-4 h-4" />
            </template>
                {{ route.name }}
            <template #trailing>
                <UIcon 
                    :name="isOpen ? 'i-heroicons-chevron-down' : 'i-heroicons-chevron-right'" 
                    class="w-4 h-4 transition-transform duration-200"
                />
            </template>
        </UButton>
        
        <Transition
        enter-active-class="transition-all duration-300 ease-out"
        enter-from-class="opacity-0 transform -translate-y-2 scale-95"
        enter-to-class="opacity-100 transform translate-y-0 scale-100"
        leave-active-class="transition-all duration-200 ease-in"
        leave-from-class="opacity-100 transform translate-y-0 scale-100"
        leave-to-class="opacity-0 transform -translate-y-2 scale-95"
        >
            <div v-if="isOpen" class="ml-4 space-y-1 border-l-2 border-slate-200 dark:border-slate-700 pl-2">
                <template v-for="itemRoute in route.children" :key="itemRoute.path">
                    <AppLink :route="itemRoute" />
                </template>
            </div>
        </Transition>
    </div>
    <div class="pt-4 space-y-2" v-else-if="route.section">
        <h3 class="px-2 text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wide">
            {{ route.name }}
        </h3>
        <template v-for="itemRoute in route.children" :key="itemRoute.path">
            <AppLink :route="itemRoute" />
        </template> 
       
      </div>
</template>
<script setup lang="ts">
import type { Route } from '~/interfaces/route';

const isOpen = ref(false)

interface Props {
    route: Route
}

const props = defineProps<Props>()

const route = computed(
    () => props.route
)

const hasChildren = computed(() => route.value.children && route.value.children.length > 0)

const toggle = () => {
    isOpen.value = !isOpen.value
}


</script>