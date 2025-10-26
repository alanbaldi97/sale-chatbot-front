<template>
  <UPopover>
    <UInput v-model="displayTime" readonly placeholder="Select time" icon="i-lucide-clock" />
    
    <template #content>
      <div class="p-4 flex gap-2 overflow-auto">
        <USelect v-model="hour" :options="hours" />
        <USelect v-model="minute" :options="minutes" />
      </div>
    </template>
  </UPopover>
</template>

<script setup>
const hour = ref('13')
const minute = ref('30')

const hours = Array.from({ length: 24 }, (_, i) => i.toString().padStart(2, '0'))
const minutes = Array.from({ length: 60 }, (_, i) => i.toString().padStart(2, '0'))

const displayTime = computed(() => `${hour.value}:${minute.value}`)
</script>