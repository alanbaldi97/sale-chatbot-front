export default defineNuxtRouteMiddleware(async (to, from) => {

  const auth = useAuthStore();

  if (to.path !== '/login' && !auth.isAuthenticated) {
    return navigateTo('/login');
  }

  if (to.path === '/login' && auth.isAuthenticated) {
    return navigateTo('/');
  }
 
});