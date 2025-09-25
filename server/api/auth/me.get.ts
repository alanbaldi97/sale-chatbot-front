import { H3Event } from 'h3'

export default defineEventHandler(async (event: H3Event) => {

  try {

    // Llamamos al backend real
    const user = await fetchWithAuth<{
        id: number,
        username: string,
        name: string,
        last_name: string,
        remember_me: boolean
     }>(event, `/auth/me`)

    // Retornamos access_token al frontend si quieres usarlo en cliente
    return { user };
  } catch (error: any) {
    return createError({ statusCode: error.statusCode || 500, statusMessage: error.statusMessage || "Invalid credentials" })
  }
  
})
