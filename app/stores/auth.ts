import { defineStore } from "pinia"

export const useAuthStore = defineStore("auth", {
  state: () => ({
    user: null as any,
    isAuthenticated: false,
  }),
  actions: {
    async login(credentials: { username: string; password: string, remember: boolean }) {
      try {
        const data = await $fetch<{ access_token: string, user: object }>("/api/auth/login", {
            method: "POST",
            body: credentials,
        })
        this.user = data.user
        this.isAuthenticated = true
        return data.user
      } catch (error) {
        throw error
      }
    },
    async logout() {
      try {
        await $fetch("/api/auth/logout", { method: "POST" })
      } catch (error) {
        // Even if logout request fails, we clear the user data
        console.error("Logout request failed:", error)
      } finally {
        this.user = null
        this.isAuthenticated = false
      }
    },
    async fetchUser() {
      try {
        const data = await $fetch<{ user: object }>("/api/auth/me")
        this.user = data.user
        return this.user
      } catch (error) {
        this.user = null
        return null
      }
    },
    setUser(user: object) {
      this.user = user
    },
    setAuthenticated(isAuth: boolean) {
      this.isAuthenticated = isAuth
    }
  },
})