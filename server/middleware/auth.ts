export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig();

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
    } finally {
      return;
    }
})