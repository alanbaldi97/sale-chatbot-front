<script lang="ts" setup>
import type { ChatMessageProps } from '@nuxt/ui';
import type { ChatStatus } from 'ai';

const authStore = useAuthStore();

const messages = ref<ChatMessageProps[]>([])

const status = ref<ChatStatus>('ready');

const input = ref('');


const generateUuidBot = () => {
  return 'xxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    const r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
}

const onSubmit = async (message: any) => {
  const userInput = input.value.trim();

    if (userInput === '') return;

    const sendMessage = {
        user_id: authStore.user.id,
        message: userInput
    }

    messages.value.push({
      id: authStore.user.id,
      role: 'user',
      parts: [
        {
          type: 'text',
          text: userInput
        }
      ]
    });
    input.value = '';

    try {
        status.value = 'submitted';

        const response = await useFetchRequest<{ response: string }>('/api/chat', {
            method: 'POST',
            body: sendMessage
        });

        messages.value.push({
            id: generateUuidBot(),
            role: 'assistant',
            parts: [
                {
                    type: 'text',
                    text: response.response
                }
            ],
        });

        status.value = 'ready';

    } catch (error: any) {
        let messages = $t('faqs.errors.updateFailed');
        if (error?.response?.status === 422) {
            messages = error.response._data.data.detail.map((err: any) => err.msg).join(', ') || $t('faqs.errors.updateFailed');
        }
        status.value = 'error';

    }

};

const loadConversation = async () => {
    try {

        const data: any = await useFetchRequest(`/api/chat/${authStore.user.id}`, {
            method: 'GET',
        });

        messages.value = data.map((item: any) => ({
            id: item.sender === "user" ? item.user_id : generateUuidBot(),
            role: item.sender === "user" ? 'user' : 'assistant',
            parts: [
                {
                    type: 'text',
                    text: item.message
                }
            ]
        }));

    } catch (error: any) {
        console.error('Failed to load conversation:', error);
    }
};


onMounted(() => {
    loadConversation();
});

</script>

<template>
  <div class="space-y-6 flex flex-col h-full">
    <div class="flex items-center justify-between">
        <div>
            <h1 class="text-2xl font-bold text-gray-900 dark:text-white">
                {{ $t('chat.title') }}
            </h1>
        </div>
    </div>
    <UCard>
        
        <UChatPalette class="h-[500px] md:h-[600px] lg:h-[700px]">
            <UChatMessages :messages="messages" :status="status" auto-scroll
            :assistant="{
                avatar: {
                    type: 'icon',
                    icon: 'i-lucide-bot',
                    size: 'md',
                }
            }"
            :user="{
                avatar: {
                    type: 'icon',
                    icon: 'i-heroicons-user-circle',
                    size: 'md',
                }
            }"
            >
                <template #indicator>
                    <UButton
                        class="px-0"
                        color="neutral"
                        variant="link"
                        loading
                        loading-icon="i-lucide-loader"
                        label="Thinking..."
                    />
                </template>
            </UChatMessages>
            <template #prompt>
                <UChatPrompt id="chat-input" v-model="input" placeholder="Escribe tu mensaje..." variant="soft" class="p-2" @submit="onSubmit">
                    <UChatPromptSubmit :status="status" />
                </UChatPrompt>
            </template>
        </UChatPalette>
    </UCard>

  </div>
</template>