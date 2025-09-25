import { defineStore } from 'pinia'

export const useEventsStore = defineStore('events', () => {
  const lastEvent = ref<string | null>(null)

  function trigger(event: string) {
    lastEvent.value = event
  }

  return { lastEvent, trigger }
})