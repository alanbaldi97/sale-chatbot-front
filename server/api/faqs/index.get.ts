import { H3Event } from 'h3'

export default defineEventHandler(async (event: H3Event) => {

  try {
    const { page, pageSize } = getQuery(event);
    const data: any = await fetchWithAuth(event, `/faqs?paginate=true&page=${page}&page_size=${pageSize}`);
    return data;
  } catch (error: any) {
    if (error.response?.status === 401) {
      return createError({ statusCode: 401, statusMessage: 'Unauthorized' });
    }
    throw createError({ statusCode: 500, statusMessage: 'Internal Server Error' });
  }
 
});
