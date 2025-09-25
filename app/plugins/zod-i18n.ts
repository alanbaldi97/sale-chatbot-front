import * as z from "zod";
import { defineNuxtPlugin } from 'nuxt/app'

export default defineNuxtPlugin(async (nuxtApp) => {

    const i18n = nuxtApp.vueApp.config.globalProperties.$i18n
    const locale = i18n.locale.valueOf()

    const loadTranslation = async (lang: string) => {
        if (lang === 'es') {
            z.config(z.locales.es());
        }
        else if (lang === 'en') {
            z.config(z.locales.en());
        }
    }

    await loadTranslation(locale);
})