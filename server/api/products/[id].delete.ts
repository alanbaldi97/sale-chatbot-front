import { H3Event } from 'h3'

export default defineEventHandler(async (event: H3Event) => {
  try {

    const id = getRouterParam(event, 'id');

    await fetchWithAuth(event, `/products/${id}`, {
      method: 'DELETE',
      body: await readBody(event)
    });
    return {
        message: 'Product deleted successfully',
    }
  } catch (error: any) {
    if (error.response?.status === 401) {
      return createError({ statusCode: 401, statusMessage: 'Unauthorized' });
    }
    throw createError({ statusCode: error.response?.status || 500, statusMessage: error.response?.detail || 'Internal Server Error' });
  }
 
});