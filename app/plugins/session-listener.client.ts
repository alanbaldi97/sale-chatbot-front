export default defineNuxtPlugin((nuxtApp) => {
    const { $t } = nuxtApp.vueApp.config.globalProperties

    const events = useEventsStore()
    const authStore = useAuthStore()
    const router = useRouter()

    const toast = useToast()

    events.$subscribe(async (mutation, state) => {
        if (state.lastEvent === 'session-expired') {
            toast.add({
                title: $t('session.expired'),
                description: $t('session.pleaseLogin'),
                icon: 'i-heroicons-exclamation-circle',
                color: 'warning',
            });
            await authStore.logout(); // Clear user data and authentication state
            router.push('/login')
            state.lastEvent = null; // Reset the event after handling
        }
    })
})