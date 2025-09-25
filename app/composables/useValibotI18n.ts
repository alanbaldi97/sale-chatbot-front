// composables/useValibotI18n.ts
import { watch } from 'vue'
import * as z from "zod";
import { useI18n } from 'vue-i18n'

export function useValibotI18n() {
  const { locale } = useI18n() // esto SÍ está permitido dentro de un composable

    const loadTranslation = async (lang: string) => {
        if (lang === 'es') {
            z.config(z.locales.es());
        } else if (lang === 'en') {
            z.config(z.locales.en());
        }
    }
  // cargar idioma inicial
  loadTranslation(locale.value)

  // escuchar cambios de idioma reactivos
  watch(locale, (newLocale) => {
    loadTranslation(newLocale)
  })
}
