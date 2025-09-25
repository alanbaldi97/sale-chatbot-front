<script setup lang="ts">
const props = defineProps<{
    open: boolean;
    title: string;
    description?: string;
    confirmText?: string;
    cancelText?: string;
    loading?: boolean;
}>();
const emit = defineEmits(['close', 'confirm']);
const localOpen = ref<boolean>(props.open)
watch(() => props.open, (newVal) => {
    localOpen.value = newVal;
});
const onClose = () => {
    emit('close');
}

const onConfirm = () => {
    emit('confirm');
}

const onUpdate = (val: boolean) => {
    if (!val) {
        onClose();
    }
}

</script>
<template>
    <UModal v-model:open="localOpen" :title="title" :description="description" :loading="loading" :closeable="!localOpen" :overlay-closeable="!localOpen" :width="'500px'" v-on:update:open="onUpdate">
        <template #footer>
            <div class="flex justify-end space-x-2 w-full">
                <UButton v-if="cancelText" variant="outline" color="error" @click="onClose" :disabled="loading">{{ cancelText }}</UButton>
                <UButton v-if="confirmText" color="primary" @click="onConfirm" :loading="loading">{{ confirmText }}</UButton>
            </div>
        </template>
    </UModal>
</template>