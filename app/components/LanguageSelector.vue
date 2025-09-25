<template>
  <UDropdownMenu class="relative" ref="languageSelectorRef" :items="availableLocales">
    <UButton
      variant="ghost"
      class="hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-400"
    >
      <template #leading>
        <UIcon name="i-heroicons-language" />
      </template>
      {{ currentLocale?.label }}
      <template #trailing>
        <UIcon name="i-heroicons-chevron-down" class="w-4 h-4" />
      </template>
    </UButton>
    <template #item="{ item }">
      <div class="flex items-center" @click="item.click">
        <span class="ml-2">{{ item.icon }}</span>
        <span class="ml-2">{{ item.label }}</span>
      </div>
    </template>
  </UDropdownMenu>
</template>

<script setup lang="ts">
const { locale, setLocale } = useI18n()

const languageSelectorRef = ref<HTMLElement>()

const availableLocales = computed(() => [
  { code: 'es', label: 'Español', icon: '🇪🇸', click: () => changeLocale('es'), slot: 'item' },
  { code: 'en', label: 'English', icon: '🇺🇸', click: () => changeLocale('en'), slot: 'item' }
])

const currentLocale = computed(() => 
  availableLocales.value.find(l => l.code === locale.value) || availableLocales.value[0]
)

const changeLocale = (code: string) => {
  setLocale(code as any)
}
</script>
