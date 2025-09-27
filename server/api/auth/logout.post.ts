import { H3Event } from 'h3'

export default defineEventHandler(async (event: H3Event) => {
  deleteCookie(event, "access_token", { path: "/" })
  deleteCookie(event, "refresh_token", { path: "/" })
  event.context.accessToken = null

  return { success: true }
})