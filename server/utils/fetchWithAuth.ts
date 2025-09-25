import { H3Event } from 'h3'

export async function fetchWithAuth<T>(
  event: H3Event,
  url: string,
  options: any = {}
): Promise<T> {
  let accessToken = getCookie(event, "access_token")

  const config = useRuntimeConfig();

  try {
    return await $fetch(`${config.apiBase}${url}`, {
      ...options,
      headers: {
        ...(options.headers || {}),
        Authorization: `Bearer ${accessToken}`,
      },
    })
  } catch (err: any) {
    // Si el token expiró
    if (err?.status === 401) {
      const refreshToken = getCookie(event, "refresh_token")
      if (!refreshToken) throw createError({ statusCode: 401, statusMessage: "Unauthorized" })

      // Renovar token
      const newTokens = await $fetch<{ access_token: string }>(
        `${config.apiBase}/auth/refresh`,
        {
          method: "POST",
          body: { refresh_token: refreshToken },
        }
      )

      // Guardar en contexto
      setCookie(event, "access_token", newTokens.access_token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
      })

      // Reintentar petición original
      return await $fetch(`${config.apiBase}${url}`, {
        ...options,
        headers: {
          ...(options.headers || {}),
          Authorization: `Bearer ${newTokens.access_token}`,
        },
      })
    }

    throw err
  }
}
