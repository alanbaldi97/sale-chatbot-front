export default defineNuxtPlugin(async () => {
  const auth = useAuthStore();

  if (import.meta.server) {
    const event = useRequestEvent();

    auth.setUser(event?.context?.user || null);
    auth.setAuthenticated(!!event?.context?.authenticated);
  }

});