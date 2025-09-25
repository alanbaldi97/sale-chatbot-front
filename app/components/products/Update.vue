<script setup lang="ts">
import * as z from "zod";
import type { FormSubmitEvent } from '@nuxt/ui'
import type { Product } from "~/interfaces/product";

const props = defineProps<{
    open: boolean;
    product: Product | null;
}>();

const emit = defineEmits(['close', 'updated']);

const localOpen = ref<boolean>(props.open)

const loading = ref<boolean>(false);

const toast = useToast();

const schema = z.object({
    name: z.string().min(3),
    price: z.number().min(1),
    unit: z.string().min(1),
    price_sale_to_business: z.number().min(0),
    wholesale_price: z.number().min(0),
    wholesale_price_starting_at: z.number().min(0)
})

type Schema = z.infer<typeof schema>

const product = reactive<Schema>({
    name: props.product?.name || '',
    price: props.product?.price || 1,
    unit: props.product?.unit || '',
    price_sale_to_business: props.product?.price_sale_to_business || 0,
    wholesale_price: props.product?.wholesale_price || 0,
    wholesale_price_starting_at: props.product?.wholesale_price_starting_at || 0
})

watch(() => props.open, (newVal) => {
    localOpen.value = newVal;
});

watch(() => props.product, (newProduct) => {
    product.name = newProduct?.name || '';
    product.price = newProduct?.price || 1;
    product.unit = newProduct?.unit || '';
    product.price_sale_to_business = newProduct?.price_sale_to_business || 0;
    product.wholesale_price = newProduct?.wholesale_price || 0;
    product.wholesale_price_starting_at = newProduct?.wholesale_price_starting_at || 0;
});

const onSubmit = async (event: FormSubmitEvent<Schema>) => {
    loading.value = true;
    try {
        await useFetchRequest(`/api/products/${props.product?.id}`, {
            method: 'PUT',
            body: event.data
        });

        toast.add({
            title: $t('common.success'),
            description: $t('products.messages.updateSuccess'),
            icon: 'i-heroicons-check-circle',
            color: 'success',
        });

        emit('updated');
    } catch (error) {
        toast.add({
            title: $t('common.error'),
            description: $t('products.errors.updateFailed'),
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


</script>

<template>

    <UModal v-model:open="localOpen" size="lg" @close:prevent="close" @update:open="(val) => { if (!val) close() }">
        <template #header>
            <h2 class="text-lg font-medium text-gray-900 dark:text-white">
                {{ $t('products.form.edit.title') }}
            </h2>
        </template>
        <template #body>
            <UForm
                id="update-product-form"
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
                <UFormField :label="$t('products.form.wholesale_price')" name="wholesale_price" class="space-y-2">
                    <UInput
                        v-model="product.wholesale_price"
                        type="number"
                        :label="$t('products.form.wholesale_price')"
                        :placeholder="$t('products.form.wholesale_price_placeholder')"
                        class="w-full"
                    />
                </UFormField>
                <UFormField :label="$t('products.form.wholesale_price_starting_at')" name="wholesale_price_starting_at" class="space-y-2">
                    <UInput
                        v-model="product.wholesale_price_starting_at"
                        type="number"
                        :label="$t('products.form.wholesale_price_starting_at')"
                        :placeholder="$t('products.form.wholesale_price_starting_at_placeholder')"
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
                <UButton type="submit" color="primary" form="update-product-form" :loading="loading">
                    {{ $t('common.save') }}
                </UButton>
            </div>
        </template>

    </UModal>

</template>