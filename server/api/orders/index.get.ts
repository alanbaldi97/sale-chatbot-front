import { H3Event } from 'h3'

export default defineEventHandler(async (event: H3Event) => {

  try {
    const { page, pageSize, ...filters } = getQuery(event);
    const data: any = await fetchWithAuth(event, `/orders?paginate=true&page=${page}&page_size=${pageSize}`, {
      params: filters
    });
    return data;
  } catch (error: any) {
    if (error.response?.status === 401) {
      return createError({ statusCode: 401, statusMessage: 'Unauthorized' });
    }
    throw createError({ statusCode: 500, statusMessage: 'Internal Server Error' });
  }
 
});
