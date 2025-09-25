<script setup lang="ts">
// Usar el layout de autenticación en lugar del default
definePageMeta({
  layout: 'auth'
})

import * as z from "zod";
import type { FormSubmitEvent } from '@nuxt/ui'

const toast = useToast();

const auth = useAuthStore();

const schema = z.object({
  username: z.string().min(3),
  password: z.string().min(8),
  rememberMe: z.boolean().optional()
})

type Schema = z.infer<typeof schema>


const state = reactive({
  username: '',
  password: '',
  rememberMe: false
})

const showPassword = ref(false)
const isLoading = ref(false)

const onSubmit = async (event: FormSubmitEvent<Schema>) => {

  console.log('Formulario enviado:', state)

  isLoading.value = true
  try {

    await auth.login({
      username: state.username,
      password: state.password,
      remember: state.rememberMe
    })

    await navigateTo('/');

  } catch (error) {
    toast.add({
      title: 'Error de autenticación',
      description: 'Usuario o contraseña incorrectos. Por favor, inténtalo de nuevo.',
      icon: 'i-heroicons-x-circle',
      color: 'error',
    })
  } finally {
    isLoading.value = false
  }
}
</script>

<template>
  <div class="space-y-8">
    <UCard class="backdrop-blur-sm bg-white/90 dark:bg-slate-800/90 shadow-2xl border-0 dark:border dark:border-slate-700/50">
      <template #header>
        <div class="text-center space- y-2">
          <h2 class="text-2xl font-bold bg-primary bg-clip-text text-transparent">
            Bienvenido
          </h2>
        </div>
      </template>

      <UForm :schema="schema" :state="state" class="space-y-6 login-form" @submit="onSubmit">
        <UFormField label="Nombre de usuario" name="username" class="space-y-2">
          <UInput 
            v-model="state.username" 
            type="text" 
            placeholder="ejemplo: usuario123"
            size="lg"
            icon="i-heroicons-user"
            class="w-full transition-all duration-200 h-12"
          />
        </UFormField>

        <UFormField label="Contraseña" name="password" class="space-y-2">
          <UInput 
            v-model="state.password" 
            :type="showPassword ? 'text' : 'password'"
            placeholder="Introduce tu contraseña"
            size="lg"
            icon="i-heroicons-lock-closed"
            class="w-full transition-all duration-200 h-12"
          >
            <template #trailing>
              <UButton
                variant="ghost"
                size="xs"
                :icon="showPassword ? 'i-heroicons-eye-slash' : 'i-heroicons-eye'"
                @click="showPassword = !showPassword"
                class="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 w-8 h-8 flex items-center justify-center"
              />
            </template>
          </UInput>
        </UFormField>

        <div class="flex items-center justify-between">
          <UCheckbox
            v-model="state.rememberMe"
            label="Recordarme"
            class="text-sm text-gray-600 dark:text-gray-400"
          />
          <UButton
            variant="ghost"
            size="sm"
            class="text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
          >
            ¿Olvidaste tu contraseña?
          </UButton>
        </div>

        <UButton 
          type="submit" 
          color="primary" 
          size="lg"
          block
          :loading="isLoading"
          class="font-semibold"
        >
          <template v-if="!isLoading">
            <UIcon name="i-heroicons-arrow-right-on-rectangle" class="w-4 h-4 mr-2" />
            Iniciar Sesión
          </template>
          <template v-else>
            Iniciando sesión...
          </template>
        </UButton>
      </UForm>
    </UCard>
  </div>
</template>

