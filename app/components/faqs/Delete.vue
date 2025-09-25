<script lang="ts" setup>
import { ref } from 'vue';
const props = defineProps<{
    item: any
}>();
const toast = useToast();
const emit = defineEmits(['onConfirm']);
const loading = ref<boolean>(false);
const confirmOpen = ref<boolean>(false);
const confirmDescription = props.item ? $t('common.confirmDeleteDescription', { name:
    props.item.name }) : undefined;

const onClick = () => {
    confirmOpen.value = true;
}
const onConfirm = async () => {
    try {
        loading.value = true;
        await useFetchRequest(`/api/faqs/${props.item.id}`, {
            method: 'DELETE',
        });

        toast.add({
            title: $t('common.success'),
            description: $t('faqs.messages.deleteSuccess', { name: props.item.question }),
            icon: 'i-heroicons-check-circle',
            color: 'success',
        });
        emit('onConfirm');
    } catch (error) {
        toast.add({
            title: $t('common.error'),
            description: $t('faqs.errors.deleteFailed', { name: props.item.question }),
            icon: 'i-heroicons-x-circle',
            color: 'error',
        });
    } finally {
        loading.value = false;
        confirmOpen.value = false;
    }
}
</script>

<template>
    <UButton color="error" variant="outline" @click="onClick" :loading="loading">
        <UIcon name="i-heroicons-trash" class="mr-1" />
        <span v-if="!loading">{{ $t('common.delete') }}</span>
    </UButton>
    <Confirm
        :open="confirmOpen"
        :title="$t('common.confirmDelete')"
        :description="confirmDescription"
        :confirmText="$t('common.delete')"
        :cancelText="$t('common.cancel')"
        :loading="loading"
        @close="confirmOpen = false"
        @confirm="onConfirm"
    />
</template>