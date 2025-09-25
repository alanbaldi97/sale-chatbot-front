<script setup lang="ts">
import type { TableColumn } from '@nuxt/ui';
import type { Faq } from '~/interfaces/faq';

const openCreateModal = ref<boolean>(false);
const openUpdateModal = ref<boolean>(false);
const selectedFaq = ref<Faq | null>(null);

const columns: TableColumn<Faq>[] = [
    {
        accessorKey: 'id',
        header: $t('faqs.table.columns.id'),
    },
    {
        accessorKey: 'question',
        header: $t('faqs.table.columns.question'),
    },
    {
        accessorKey: 'answer',
        header: $t('faqs.table.columns.answer'),
    },
    {
        accessorKey: 'actions',
        header: $t('faqs.table.columns.actions'),
    }

];

const tableRef = ref<InstanceType<typeof import('~/components/ServerSideTable.vue').default> | null>(null);

const onRefresh = () => {
    openCreateModal.value = false;
    openUpdateModal.value = false;
    selectedFaq.value = null;
    tableRef.value?.refresh();
}

const editFaq = (faq: Partial<{
    id: number;
    question: string;
    answer: string;
}>) => {
    selectedFaq.value = faq as Faq;
    openUpdateModal.value = true;
}



</script>

<template>
    <div class="space-y-6">
        <div class="flex items-center justify-between">
            <div>
                <h1 class="text-2xl font-bold text-gray-900 dark:text-white">
                    {{ $t('faqs.title') }}
                </h1>
            </div>
            <UButton color="primary" size="lg" @click="openCreateModal = true">
                <template #leading>
                    <UIcon name="i-heroicons-plus" />
                </template>
                {{ $t('products.addNew') }}
            </UButton>
        </div>
        <ServerSideTable
            ref="tableRef"
            :columns="columns"
            :pageSizeOptions="[50, 100, 200]"
            :initialPageSize="100"
            url="/api/faqs/"
        >
            <template #question-cell="{ row }">
                <div class="max-w-lg">
                    <UTooltip :text="row.original.question" placement="top">
                        <p class="text-gray-700 dark:text-gray-300 truncate" :title="row.original.question">
                            {{ row.original.question }}
                        </p>
                    </UTooltip>
                </div>
            </template>

            <template #answer-cell="{ row }">
                <div class="max-w-lg">
                    <p class="text-gray-700 dark:text-gray-300 truncate" :title="row.original.answer">
                        {{ row.original.answer }}
                    </p>
                </div>

            </template>

            <template #actions-cell="{ row }">
                <div class="flex items-center justify-center space-x-2">
                    <UButton size="md" color="info" variant="outline" @click="editFaq(row.original)">
                        <UIcon name="i-heroicons-pencil-square" class="mr-1" />
                        {{ $t('faqs.table.columns.edit') }}
                    </UButton>
                    <FaqsDelete :item="row.original" @onConfirm="onRefresh"/>
                </div>
            </template>

        </ServerSideTable>
       <FaqsCreate :open="openCreateModal" @close="openCreateModal = false" @created="onRefresh"/>
       <FaqsUpdate :open="openUpdateModal" :faq="selectedFaq" @close="openUpdateModal = false" @updated="onRefresh"/>
    </div>
</template>