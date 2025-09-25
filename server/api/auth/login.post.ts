import { H3Event } from 'h3'

export default defineEventHandler(async (event: H3Event) => {

  try {
    const config = useRuntimeConfig()

    const body = await readBody(event)

    // Llamamos al backend real
    const response = await $fetch<{ access_token: string, refresh_token: string, user: any }>(`${config.apiBase}/auth/login`, {
      method: "POST",
      body,
    })

    // Guardamos refresh en cookie segura
    setCookie(event, "refresh_token", response.refresh_token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      path: "/",
    })

    setCookie(event, "access_token", response.access_token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
    })
    // Retornamos access_token al frontend si quieres usarlo en cliente
    return { user: response.user }
  } catch (error: any) {
    return createError({ statusCode: error.statusCode || 500, statusMessage: error.statusMessage || "Invalid credentials" })
  }
  
})
