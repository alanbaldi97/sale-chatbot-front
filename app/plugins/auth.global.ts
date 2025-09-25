export default defineNuxtPlugin(async () => {
  const auth = useAuthStore();

  if (import.meta.server) {
    auth.setUser(useRequestEvent()?.context.user || null);
    auth.setAuthenticated(!!useRequestEvent()?.context.authenticated);
  }

});