<script setup lang="ts">
import type { TableColumn } from '@nuxt/ui';
import type { Product } from '~/interfaces/product';

const openCreateModal = ref<boolean>(false);
const openUpdateModal = ref<boolean>(false);
const selectedProduct = ref<Product | null>(null);

const columns: TableColumn<Product>[] = [
    {
        accessorKey: 'id',
        header: $t('products.table.columns.id'),
    },
    {
        accessorKey: 'name',
        header: $t('products.table.columns.name'),
    },
    {
        accessorKey: 'price',
        header: $t('products.table.columns.price'),
        cell: info => toCurrency(info.getValue() as number)
    },
    {
        accessorKey: 'unit',
        header: $t('products.table.columns.unit'),
    },
    {
        accessorKey: 'price_sale_to_business',
        header: $t('products.table.columns.price_sale_to_business'),
        cell: info => toCurrency(info.getValue() as number)
    },
    {
        accessorKey: 'wholesale_price',
        header: $t('products.table.columns.wholesale_price'),
        cell: info => toCurrency(info.getValue() as number)
    },
    {
        accessorKey: 'wholesale_price_starting_at',
        header: $t('products.table.columns.wholesale_price_starting_at'),
        cell: info => info.getValue() ? info.getValue() + ' ' + info.row.original.unit : '-'
    },
    {
        accessorKey: 'actions',
        header: $t('products.table.columns.actions'),
    }

];

const tableRef = ref<InstanceType<typeof import('~/components/ServerSideTable.vue').default> | null>(null);

const onRefresh = () => {
    selectedProduct.value = null;
    openCreateModal.value = false;
    openUpdateModal.value = false;
    tableRef.value?.refresh();
}

const editProduct = (product: Partial<{
    id: number;
    name: string;
    price: number;
    unit: string;
    price_sale_to_business: number;
    wholesale_price: number;
    wholesale_price_starting_at: number;
}>) => {
    selectedProduct.value = product as Product;
    openUpdateModal.value = true;
}

const onClose = () => {
    selectedProduct.value = null;
    openUpdateModal.value = false;
    openCreateModal.value = false;
}


</script>

<template>
    <div class="space-y-6">
        <div class="flex items-center justify-between">
            <div>
                <h1 class="text-2xl font-bold text-gray-900 dark:text-white">
                    {{ $t('products.title') }}
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
            url="/api/products/"
        >
            <template #price-cell="{ row }">
                <div class="flex flex-col items-center justify-center">
                    <UBadge color="success" size="md" class="font-bold">
                        {{ toCurrency(row.original.price) }}
                    </UBadge>
                </div>
            </template>

            <template #price_sale_to_business-cell="{ row }">
                <div class="flex flex-col items-center justify-center">
                    <UBadge :color="row.original.price_sale_to_business > 0 ? 'success' : 'info'" size="md" class="font-bold">
                        {{ toCurrency(row.original.price_sale_to_business) }}
                    </UBadge>
                </div>
            </template>

            <template #wholesale_price-cell="{ row }">
                <div class="flex flex-col items-center justify-center">
                    <UBadge :color="row.original.wholesale_price > 0 ? 'success' : 'info'" size="md" class="font-bold">
                        {{ toCurrency(row.original.wholesale_price) }}
                    </UBadge>
                </div>
            </template>

            <template #actions-cell="{ row }">
                <div class="flex items-center justify-center space-x-2">
                    <UButton size="md" color="info" variant="outline" @click="editProduct(row.original)">
                        <UIcon name="i-heroicons-pencil-square" class="mr-1" />
                        {{ $t('products.table.columns.edit') }}
                    </UButton>
                    <ProductsDelete :item="row.original" @onConfirm="onRefresh"/>
                </div>
            </template>

        </ServerSideTable>
       <ProductsCreate :open="openCreateModal" @close="onClose" @created="onRefresh"/>
       <ProductsUpdate :open="openUpdateModal" :product="selectedProduct" @close="onClose" @updated="onRefresh"/>
    </div>
</template>