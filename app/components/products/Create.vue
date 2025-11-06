<script setup lang="ts">
import * as z from "zod";
import type { FormSubmitEvent } from '@nuxt/ui'
import type { TableColumn } from '@nuxt/ui';

const props = defineProps<{
    open: boolean;
}>();

const emit = defineEmits(['close', 'created']);

const localOpen = ref<boolean>(props.open)

const loading = ref<boolean>(false);

const toast = useToast();

const schema = z.object({
    name: z.string().min(3),
    price: z.number().min(1),
    unit: z.string().min(1),
    price_sale_to_business: z.number().min(0),
    wholesale_price: z.number().min(0),
    wholesale_price_starting_at: z.number().min(0),
    price_boards: z.array(z.object({
        quantity: z.number().min(0.5),
        price: z.number().min(0),
    }))
})

type Schema = z.infer<typeof schema>

const product = reactive<Schema>({
    name: '',
    price: 1,
    unit: '',
    price_sale_to_business: 0,
    wholesale_price: 0,
    wholesale_price_starting_at: 0,
    price_boards: [] 
})
const columnsPrices: TableColumn<{
    quantity: number;
    price: number;
}>[] = [
    {
        accessorKey: 'quantity',
        header: $t('products.form.quantity') as string
    },
    {
        accessorKey: 'price',
        header: $t('products.form.price_board_price') as string,
    },
    {
        accessorKey: 'actions',
        header: $t('products.form.actions') as string,
    }
];

watch(() => props.open, (newVal) => {
    localOpen.value = newVal;
});

const onSubmit = async (event: FormSubmitEvent<Schema>) => {
    loading.value = true;
    try {
        if (event.data.price_boards.length === 0) {
            toast.add({
                title: $t('common.error'),
                description: $t('products.errors.noPriceBoards'),
                icon: 'i-heroicons-x-circle',
                color: 'warning',
            });
            return;
        }

        await useFetchRequest('/api/products', {
            method: 'POST',
            body: event.data
        });

        toast.add({
            title: $t('common.success'),
            description: $t('products.messages.createSuccess'),
            icon: 'i-heroicons-check-circle',
            color: 'success',
        });

        emit('created');

        resetForm();

    } catch (error) {
        toast.add({
            title: $t('common.error'),
            description: $t('products.errors.createFailed'),
            icon: 'i-heroicons-x-circle',
            color: 'error',
        });
    } finally {
        loading.value = false;
    }
}

const close = () => {
    emit('close');
    resetForm();
}

const resetForm = () => {
    product.name = '';
    product.price = 1;
    product.unit = '';
    product.price_sale_to_business = 0;
    product.wholesale_price = 0;
    product.wholesale_price_starting_at = 0;
    product.price_boards = [];
}


</script>

<template>

    <UModal v-model:open="localOpen" size="lg" @close:prevent="close" @update:open="(val) => { if (!val) close() }">
        <template #header>
            <h2 class="text-lg font-medium text-gray-900 dark:text-white">
                {{ $t('products.form.create.title') }}
            </h2>
        </template>
        <template #body>
            <UForm
                id="create-product-form"
                :schema="schema"
                :state="product"
                @submit="onSubmit"
                class="space-y-6"
            >
                <UFormField :label="$t('products.form.name')" name="name" class="space-y-2 w-full">
                    <UInput
                        v-model="product.name"
                        :label="$t('products.form.name')"
                        :placeholder="$t('products.form.name_placeholder')"
                        class="w-full"
                    />
                </UFormField>

                <UFormField :label="$t('products.form.price')" name="price" class="space-y-2">
                    <UInput
                        v-model="product.price"
                        type="number"
                        :placeholder="$t('products.form.price_placeholder')"
                        class="w-full"
                    />
                </UFormField>

                <UFormField :label="$t('products.form.unit')" name="unit" class="space-y-2">

                    <UInput
                        v-model="product.unit"
                        :label="$t('products.form.unit')"
                        :placeholder="$t('products.form.unit_placeholder')"
                        class="w-full"
                    />
                </UFormField>
                <UFormField :label="$t('products.form.price_sale_to_business')" name="price_sale_to_business" class="space-y-2">
                    <UInput
                        v-model="product.price_sale_to_business"
                        type="number"
                        :placeholder="$t('products.form.price_sale_to_business_placeholder')"
                        class="w-full"
                    />
                </UFormField>

                <div class="w-full flex justify-end">
                     <UButton
                        type="button"
                        color="primary"
                        size="sm"
                        @click="product.price_boards.push({ quantity: 1, price: 0 })"
                    >
                        {{ $t('products.form.add_price_board') }}
                    </UButton>
                </div>

                <UTable class="mt-4" :columns="columnsPrices" :data="product.price_boards">
                    <template #quantity-cell="{ row }">
                        <UInput
                            v-model="row.original.quantity"
                            type="number"
                            class="w-full"
                        />
                    </template>
                    <template #price-cell="{ row }">
                        <UInput
                            v-model="row.original.price"
                            type="number"
                            class="w-full"
                        />
                    </template>
                    <template #actions-cell="{ row }">
                        <div class="flex items-center justify-center space-x-2 w-[40px]">
                            <UButton
                                type="button"
                                color="error"
                                size="sm"
                                @click="product.price_boards.splice(row.index, 1)"
                            >
                                <UIcon name="i-heroicons-trash" />
                            </UButton>
                        </div>
                    </template>
                </UTable>
                
            </UForm>
        </template>
        <template #footer >
            <div class="flex justify-end space-x-2 w-full">
                <UButton type="button" color="error" @click="close">
                    {{ $t('common.cancel') }}
                </UButton>
                <UButton type="submit" color="primary" form="create-product-form" :loading="loading">
                    {{ $t('common.save') }}
                </UButton>
            </div>
        </template>

    </UModal>

</template>