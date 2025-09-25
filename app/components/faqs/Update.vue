<script setup lang="ts">
import * as z from "zod";
import type { FormSubmitEvent } from '@nuxt/ui'

const props = defineProps<{
    open: boolean;
    faq: Partial<{
        id: number;
        question: string;
        answer: string;
    }> | null;
}>();

const emit = defineEmits(['close', 'updated']);

const localOpen = ref<boolean>(props.open)

const loading = ref<boolean>(false);

const toast = useToast();

const schema = z.object({
    question: z.string().min(5),
    answer: z.string().min(15),
})

type Schema = z.infer<typeof schema>

const faq = reactive<Schema>({
    question: '',
    answer: ''
})

watch(() => props.open, (newVal) => {
    localOpen.value = newVal;
});

watch(() => props.faq, (newVal) => {
    faq.question = newVal?.question || '';
    faq.answer = newVal?.answer || '';
});

const onSubmit = async (event: FormSubmitEvent<Schema>) => {
    loading.value = true;
    try {
        await useFetchRequest(`/api/faqs/${props.faq?.id}`, {
            method: 'PUT',
            body: event.data
        });

        toast.add({
            title: $t('common.success'),
            description: $t('faqs.messages.updateSuccess'),
            icon: 'i-heroicons-check-circle',
            color: 'success',
        });

        emit('updated');

        resetForm();

    } catch (error:any) {
        let messages = $t('faqs.errors.updateFailed');
        if (error?.response?.status === 422) {
            messages = error.response._data.data.detail.map((err: any) => err.msg).join(', ') || $t('faqs.errors.updateFailed');
        }
        toast.add({
            title: $t('common.error'),
            description: messages,
            icon: 'i-heroicons-x-circle',
            color: 'error',
        });
    } finally {
        loading.value = false;
    }
}

const close = () => {
    emit('close');
}

const resetForm = () => {
    faq.question = '';
    faq.answer = '';
}


</script>

<template>

    <UModal v-model:open="localOpen" size="lg" @close:prevent="close" @update:open="(val) => { if (!val) close() }">
        <template #header>
            <h2 class="text-lg font-medium text-gray-900 dark:text-white">
                {{ $t('faqs.form.create.title') }}
            </h2>
        </template>
        <template #body>
            <UForm
                id="update-faq-form"
                :schema="schema"
                :state="faq"
                @submit="onSubmit"
                class="space-y-6"
            >
                <UFormField :label="$t('faqs.form.question')" name="question" class="space-y-2 w-full">
                    <UInput
                        v-model="faq.question"
                        :label="$t('faqs.form.question')"
                        :placeholder="$t('faqs.form.question_placeholder')"
                        class="w-full"
                    />
                </UFormField>

                <UFormField :label="$t('faqs.form.answer')" name="answer" class="space-y-2">
                    <UTextarea
                        v-model="faq.answer"
                        :placeholder="$t('faqs.form.answer_placeholder')"
                        class="w-full"
                        
                    />
                </UFormField>
                
            </UForm>
        </template>
        <template #footer >
            <div class="flex justify-end space-x-2 w-full">
                <UButton type="button" color="error" @click="close">
                    {{ $t('common.cancel') }}
                </UButton>
                <UButton type="submit" color="primary" form="update-faq-form" :loading="loading">
                    {{ $t('common.save') }}
                </UButton>
            </div>
        </template>

    </UModal>

</template>