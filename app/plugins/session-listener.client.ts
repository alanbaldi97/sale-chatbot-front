export default defineNuxtPlugin(() => {
    const events = useEventsStore()
    const authStore = useAuthStore()
    const router = useRouter()

    const toast = useToast()

    events.$subscribe(async (mutation, state) => {
        if (state.lastEvent === 'session-expired') {
            toast.add({
                title: 'Session Expired',
                description: 'Your session has expired. Please log in again.',
                icon: 'i-heroicons-exclamation-circle',
                color: 'warning',
            });
            await authStore.logout(); // Clear user data and authentication state
            router.push('/login')
            state.lastEvent = null; // Reset the event after handling
        }
    })
})