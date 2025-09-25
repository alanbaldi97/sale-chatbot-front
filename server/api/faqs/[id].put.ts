import { H3Event } from 'h3'

export default defineEventHandler(async (event: H3Event) => {
  try {
    const id = getRouterParam(event, 'id');
    const data: any = await fetchWithAuth(event, `/faqs/${id}`, {
      method: 'PUT',
      body: await readBody(event)
    });
    return data;
  } catch (error: any) {
    if (error.response?.status === 401) {
      return createError({ statusCode: 401, statusMessage: 'Unauthorized' });
    }
    
    const data = error?.response?._data || { message: 'Unexpected error' }

    throw createError({ statusCode: error.response?.status || 500, statusMessage: error.response?._data?.message || 'Internal Server Error', data });
  }
 
});