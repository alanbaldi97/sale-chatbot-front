<script lang="ts" setup>

import type { TableColumn } from '@nuxt/ui';
import type { Order, OrderDetail, Shipping } from '~/interfaces/order';
import { CalendarDate, DateFormatter, getLocalTimeZone } from '@internationalized/date';

const toast = useToast();

const expanded = ref<{ [key: string]: boolean }>({});

const tableRef = ref<InstanceType<typeof import('~/components/ServerSideTable.vue').default> | null>(null);

const now = new Date();

const loading = ref<boolean>(false);

const df = new DateFormatter('es-MX', {
  dateStyle: 'medium'
});

const selectStatus = ref<string>('');

const modelValue = shallowRef({
  start: new CalendarDate(now.getFullYear(), now.getMonth() + 1, now.getDate()),
  end: new CalendarDate(now.getFullYear(), now.getMonth() + 1, now.getDate())
});

const search = ref<string>('');

const UButton = resolveComponent('UButton')

const columns: TableColumn<Order>[] = [
    {
    id: 'expand',
    cell: ({ row }) =>
        h(UButton, {
            color: 'neutral',
            variant: 'ghost',
            icon: 'i-lucide-chevron-down',
            square: true,
            'aria-label': 'Expand',
            ui: {
                leadingIcon: [
                    'transition-transform',
                    row.getIsExpanded() ? 'duration-200 rotate-180' : ''
                ]
            },
            onClick: () => row.toggleExpanded()
        })
    },
    {
        accessorKey: 'id',
        header: $t('orders.table.columns.id'),
    },
    {
        accessorKey: 'order_number',
        header: $t('orders.table.columns.orderNumber'),
    },
    {
        accessorKey: 'customer_name',
        header: $t('orders.table.columns.customerName'),
    },
    {
        accessorKey: 'customer_phone',
        header: $t('orders.table.columns.customerPhone'),
    },
    {
        accessorKey: 'created_at',
        header: $t('orders.table.columns.date'),
        cell: info => new Date(info.getValue() as string).toLocaleDateString()
    },
    {
        accessorKey: 'status',
        header: $t('orders.table.columns.status')
    },
    {
        accessorKey: 'total_amount',
        header: $t('orders.table.columns.totalAmount'),
        cell: info => toCurrency(info.getValue() as number)
    }
];

const orderDetailsColumns: TableColumn<OrderDetail>[] = [
    {
        accessorKey: 'product_name',
        header: $t('orders.table.columns.order_details.productName'),
        cell: info => info.row.original.product.name
    },
    {
        accessorKey: 'quantity',
        header: $t('orders.table.columns.order_details.quantity')
    },
    {
        accessorKey: 'shipping_cost',
        header: $t('orders.table.columns.order_details.shippingCost'),
        cell: info => toCurrency(info.row.original.shipping_cost)
    },
    {
        accessorKey: 'total',
        header: $t('orders.table.columns.order_details.total'),
        cell: info => toCurrency((info.row.original.quantity * info.row.original.price))
    }
    
];

const shippingColumns: TableColumn<Shipping>[] = [
    {
        accessorKey: 'type',
        header: $t('orders.table.columns.shipping.type')
    },
    {
        accessorKey: 'address',
        header: $t('orders.table.columns.shipping.address')
    }
];

const filters = computed(() => {
    
    const f: { [key: string]: string | number | undefined } = {};

    f.search = search.value || undefined;

    f.status = selectStatus.value || undefined;

    if (modelValue.value.start) {
        const formattedStart = modelValue.value.start.toDate(getLocalTimeZone());
        f.start = `${formattedStart.getFullYear()}-${(formattedStart.getMonth() + 1).toString().padStart(2, '0')}-${formattedStart.getDate().toString().padStart(2, '0')}`;
    }

    if (modelValue.value.end) {
        const formattedEnd = modelValue.value.end.toDate(getLocalTimeZone());
        f.end = `${formattedEnd.getFullYear()}-${(formattedEnd.getMonth() + 1).toString().padStart(2, '0')}-${formattedEnd.getDate().toString().padStart(2, '0')}`;
    }

    return f;
});

const onSearch = () => {
    tableRef.value?.refresh(true);
}

const clearFilters = () => {
    search.value = '';
    onSearch();
}

const exportToExcel = async () => {
    try {
        loading.value = true;
        const url = `/api/orders/export-excel`;

        const data: any = await useFetchRequest(url, {
            method: 'GET',
            params: mapFilters(filters.value),
            responseType: 'blob'
        });

        if (data) {
            const blob = new Blob([data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
            const link = document.createElement('a');
            link.href = window.URL.createObjectURL(blob);
            link.download = `orders_${new Date().toISOString().split('T')[0]}.xlsx`;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            onSearch();
        }

    } catch (error) {
        toast.add({
            title: 'Error',
            description: $t('orders.errors.exportFailed'),
            icon: 'i-heroicons-x-circle',
            color: 'error',
        });
    }finally {
        loading.value = false;
    }
}

</script>
<template>
    <div class="space-y-6">
        <div class="flex items-center justify-between">
            <div>
                <h1 class="text-2xl font-bold text-gray-900 dark:text-white">
                    {{ $t('orders.title') }}
                </h1>
            </div>
        </div>

        <UCard class="w-full">
            <div class="flex flex-row flex-wrap gap-4 items-center">
                <div class="flex flex-row flex-wrap gap-4 items-end">
                    <div >
                        <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                            {{ $t('orders.filterBySearch') }}
                        </label>
                        <UInput
                            v-model="search"
                            :placeholder="$t('orders.filterBySearchPlaceholder')"
                            clearable
                            class="w-64 mr-4"
                            icon="i-lucide-search"
                            @keyup.enter="onSearch"

                        >
                            <template v-if="search?.length" #trailing>
                                <UButton
                                    color="neutral"
                                    variant="link"
                                    size="sm"
                                    icon="i-lucide-circle-x"
                                    aria-label="Clear input"
                                    @click="clearFilters"
                                />
                            </template>
                        </UInput>
                    </div>
                    <div>
                        <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                            {{ $t('orders.filterByDate') }}
                        </label>
                        <UPopover>
                            <UButton color="neutral" variant="subtle" icon="i-lucide-calendar">
                                <template v-if="modelValue.start">
                                    <template v-if="modelValue.end">
                                    {{ df.format(modelValue.start.toDate(getLocalTimeZone())) }} - {{ df.format(modelValue.end.toDate(getLocalTimeZone())) }}
                                    </template>

                                    <template v-else>
                                    {{ df.format(modelValue.start.toDate(getLocalTimeZone())) }}
                                    </template>
                                </template>
                                <template v-else>
                                    Pick a date
                                </template>
                            </UButton>

                            <template #content>
                                <UCalendar v-model="modelValue" class="p-2" :number-of-months="2" range  />
                            </template>
                        </UPopover>
                    </div>
                    <div>
                        <USelect
                            v-model="selectStatus"
                            :items="[
                                { label: 'Pendiente', value: 'pending' },
                                { label: 'Exportado', value: 'exported' }
                            ]"
                            value-key="value"
                            label-key="label"
                            :placeholder="$t('orders.table.columns.status')"
                            class="w-48"
                            clearable
                            :searchable="false" >
                        
                            <template #item-label="{ item }">
                                <UBadge
                                    :class="{
                                        'bg-yellow-100 text-yellow-800': item.value === 'pending',
                                        'bg-blue-100 text-blue-800': item.value === 'exported'
                                    }"
                                    size="md"
                                    class="capitalize font-medium"
                                >
                                    {{ $t(`orders.status.${item.value}`) }}
                                </UBadge>
                            </template>
                            <template #default="{ modelValue }">
                                <UBadge
                                    :class="{
                                        'bg-yellow-100 text-yellow-800': modelValue === 'pending',
                                        'bg-blue-100 text-blue-800': modelValue === 'exported'
                                    }"
                                    size="md"
                                    class="capitalize font-medium"
                                    v-if="modelValue"

                                >
                                    {{ $t(`orders.status.${modelValue}`) }}
                                </UBadge>
                            </template>
                        </USelect>
                    </div>
                </div>
                <div class="flex-1 flex justify-end">
                    <UButton color="success" variant="solid" icon="i-lucide-file-spreadsheet" class="mr-2 dark:bg-green-600 dark:hover:bg-green-700" :loading="loading" @click="exportToExcel">
                        {{ $t('orders.exportToExcel') }}
                    </UButton>
                    <UButton color="primary" variant="solid" icon="i-lucide-search" @click="onSearch">
                        {{ $t('orders.filterBySearch') }}
                    </UButton>
                </div>
                
            </div>
        </UCard>

        <ServerSideTable
            ref="tableRef"
            :columns="columns"
            :pageSizeOptions="[50, 100, 200]"
            :initialPageSize="100"
            url="/api/orders/"
            v-model:expanded="expanded"
            :requestFilters="filters"
        >

            <template #status-cell="{ row }">
                <UBadge
                    :class="{
                        'bg-yellow-100 text-yellow-800': row.original.status === 'pending',
                        'bg-blue-100 text-blue-800': row.original.status === 'exported'
                    }"
                    size="md"
                    class="capitalize font-medium"
                >
                    {{ $t(`orders.status.${row.original.status}`) }}
                </UBadge>
            </template>

            <template #total_amount-cell="{ row }">
                <UBadge color="success" size="md" class="font-bold">
                    {{ toCurrency(row.original.total_amount) }}
                </UBadge>
            </template>

            <template #expanded="{row}">
                <div class="text-md font-semibold text-gray-900 dark:text-white mb-4 text-center">
                    <span class="font-semibold text-gray-700 dark:text-gray-300 ">{{ $t('orders.table.columns.shipping.header') }}</span>
                </div>
                <div class="p-2 bg-gray-100 dark:bg-gray-800 rounded-lg mt-2">
                   
                    <UTable :columns="shippingColumns" :data="[row.original.shipping]" :pagination="{ pageIndex: 0, pageSize: 1 }" >
                        <template #type-cell="{ row }">
                            <UBadge color="neutral" class="font-bold">
                                {{ row.original.type }}
                            </UBadge>
                        </template>
                        <template #address-cell="{ row }">
                            <span class="text-gray-700 dark:text-gray-300">
                                {{ row.original.address ? row.original.address : $t('orders.noAddress') }}
                            </span>
                        </template>
                    </UTable>
                </div>
                 <div class="text-md font-semibold text-gray-900 dark:text-white mb-4 text-center mt-4">
                    <span class="font-semibold text-gray-700 dark:text-gray-300 ">{{ $t('orders.table.columns.order_details.header') }}</span>
                </div>
                <div class="p-2 bg-gray-100 dark:bg-gray-800 rounded-lg ">
                    <UTable :columns="orderDetailsColumns" :data="row.original.order_details" :pagination="{ pageIndex: 0, pageSize: row.original.order_details.length }" >
                        <template #quantity-cell="{ row }">
                            <UBadge color="neutral" class="font-bold">
                                {{ row.original.quantity }}
                            </UBadge>
                        </template>
                        <template #total-cell="{ row }">
                            <UBadge color="success" class="font-bold">
                               {{ toCurrency(row.original.price) }}
                            </UBadge>
                        </template>
                        <template #shipping_cost-cell="{ row }">
                            <UBadge color="success" class="font-bold">
                               {{ row.original.shipping_cost ? toCurrency(row.original.shipping_cost) : '-' }}
                            </UBadge>
                        </template>
                    </UTable>
                </div>
            </template>

            <template #no-data>
                <p class="text-center text-gray-600 dark:text-gray-400">
                    {{ $t('orders.noOrders') }}
                </p>
            </template>
        </ServerSideTable>
    </div>
</template>