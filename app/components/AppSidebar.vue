<template>
  <!-- Overlay para móvil -->
   <Transition
    enter-active-class="transition-opacity duration-300 ease-out"
    enter-from-class="opacity-0"
    enter-to-class="opacity-100"
    leave-active-class="transition-opacity duration-300 ease-in"
    leave-from-class="opacity-100"
    leave-to-class="opacity-0"
  >
    <div
      v-if="isOpen"
      class="fixed inset-0 z-40 backdrop-blur-sm lg:hidden"
      @click="isOpen = false"
    ></div>
  </Transition>

  <!-- Sidebar móvil -->
   <Transition
    enter-active-class="transition-transform duration-300 ease-out"
    enter-from-class="-translate-x-full"
    enter-to-class="translate-x-0"
    leave-active-class="transition-transform duration-300 ease-in"
    leave-from-class="translate-x-0"
    leave-to-class="-translate-x-full"
  >
    <aside
      v-if="isOpen"
      class="fixed inset-y-0 left-0 z-50 w-64 bg-white/95 dark:bg-slate-900/95 backdrop-blur-xl border-r border-slate-200/60 dark:border-slate-700/60 shadow-2xl lg:hidden"
    >
      <SidebarContent @close="isOpen = false" />
    </aside>
  </Transition>

  <!-- Sidebar para desktop -->
  <aside 
    :class="[
      'hidden lg:flex lg:flex-col lg:w-64 lg:fixed lg:inset-y-0 lg:border-r lg:border-slate-200 lg:dark:border-slate-700 lg:bg-white lg:dark:bg-slate-900 transform transition-transform duration-300 ease-in-out shadow-lg !top-[68px] lg:backdrop-blur-xl',
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
