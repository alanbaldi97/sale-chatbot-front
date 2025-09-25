<template>
  <!-- Overlay para móvil -->
  <div
    v-if="isOpen"
    class="fixed inset-0 z-40 lg:hidden bg-black opacity-25"
    @click="isOpen = false"
  ></div>

  <!-- Sidebar móvil -->
  <aside
    :class="[
      'fixed inset-y-0 left-0 z-50 w-64 bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-700 transform transition-transform !duration-300 !ease-in-out lg:hidden shadow-xl ',
      isOpen ? 'translate-x-0' : '-translate-x-full'
    ]"
  >
    <SidebarContent @close="isOpen = false" />
  </aside>

  <!-- Sidebar para desktop -->
  <aside 
    :class="[
      'hidden lg:flex lg:flex-col lg:w-64 lg:fixed lg:inset-y-0 lg:border-r lg:border-slate-200 lg:dark:border-slate-700 lg:bg-white lg:dark:bg-slate-900 transform transition-transform duration-300 ease-in-out shadow-lg !top-[68px]',
      isOpen ? 'lg:translate-x-0' : 'lg:-translate-x-full'
    ]"
  >
    <SidebarContent />
  </aside>
</template>

<script setup lang="ts">
interface Props {
  modelValue: boolean
}

interface Emits {
  (e: 'update:modelValue', value: boolean): void
}

const props = defineProps<Props>()
const emit = defineEmits<Emits>()

const isOpen = computed({
  get: () => props.modelValue,
  set: (value: boolean) => emit('update:modelValue', value)
})
</script>
