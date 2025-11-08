export default defineEventHandler(async (event) => {
  const url = getRequestURL(event);
  
  // Excluir rutas que no necesitan autenticación
  const publicPaths = [
    '/api/auth/login',
    '/api/auth/me',
    '/_nuxt',
    '/favicon.ico'
  ];
  
  // Si la ruta es pública, no hacer nada
  if (publicPaths.some(path => url.pathname.startsWith(path))) {
    return;
  }

  try {
      const res = await fetchWithAuth<{
        id: number,
        username: string,
        name: string,
        last_name: string,
        remember_me: boolean
     }>(event, `/auth/me`);

     event.context.user = res;
     event.context.authenticated = true;
    } catch (error) {
      deleteCookie(event, 'access_token');
    }
})