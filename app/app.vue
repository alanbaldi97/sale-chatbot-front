<script setup lang="ts">
import type { ToasterProps } from '@nuxt/ui';
import { useValibotI18n } from '~/composables/useValibotI18n'
useValibotI18n()

import * as locales from '@nuxt/ui/locale'
const { locale } = useI18n()

const appLocale: Ref<typeof locales.es> = ref(locales[locale.value])

const toaster: ToasterProps = { position: 'top-right', expand: true, duration: 5000 }

</script>
<template>
  <UApp :toaster="toaster" :locale="appLocale">
    <NuxtLayout />
  </UApp>
</template>
