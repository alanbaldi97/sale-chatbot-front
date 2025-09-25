import { H3Event } from 'h3'
export default defineEventHandler(async (event: H3Event) => {

  const config = useRuntimeConfig()
  
  const refreshToken = getCookie(event, "refresh_token")

  if (!refreshToken) {
    throw createError({ statusCode: 401, statusMessage: "No refresh token" })
  }

  const response = await $fetch<{ access_token: string }>(
    `${config.apiBase}/auth/refresh`,
    {
      method: "POST",
      body: { refresh_token: refreshToken },
    }
  )

  event.context.accessToken = response.access_token

  return { access_token: response.access_token }
})
