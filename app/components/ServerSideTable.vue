<script setup lang="ts">
import type { TableColumn } from '@nuxt/ui';

const toast = useToast();

const props = defineProps<{
  columns: TableColumn<any>[];
  pageSizeOptions?: number[];
  initialPageSize?: number;
  url: string;
  requestFilters?: Record<string, any>;
}>();

const loading: Ref<boolean> = ref(false);

const data = ref<any[]>([]);

const pagination = ref({
  pageIndex: 0,
  pageSize: props.initialPageSize || 100,
  total: 0
});

const fetchData = async () => {
 try {
    loading.value = true;
    const page = pagination.value.pageIndex + 1; // Convert to 1-based index for the API
    const filters = props.requestFilters ? mapFilters(props.requestFilters) : {};
    const response = await useFetchRequest<{ items: any[]; total: number }>(props.url, {
      params: {
        page,
        pageSize: pagination.value.pageSize,
        ...filters
      }
    });
    data.value = response.items;
    pagination.value.total = response.total;
  } catch (error) {
    toast.add({
      title: 'Error',
      description: $t('products.errors.fetchFailed'),
      icon: 'i-heroicons-x-circle',
      color: 'error',
    });
  } finally {
    loading.value = false;
  }
};

const onChangePage = (page: number) => {
  pagination.value.pageIndex = page - 1;
  fetchData();
};


onMounted(() => {
  fetchData();
});

const refresh = (resetPage: boolean = false) => {
  if (resetPage) {
    pagination.value.pageIndex = 0;
  }
  fetchData();
};


defineExpose({
  refresh
});

</script>
<template>

    <div class="w-full space-y-4 pb-4 dark:bg-slate-900 p-4 rounded-lg light:bg-white">
      <UTable :columns="columns" :data="data" v-model:pagination="pagination" :loading="loading" loading-color="primary" loading-animation="carousel" v-bind="$attrs" >
        <template v-for="(_, slotName) in $slots" #[slotName]="slotProps">
          <slot :name="slotName" v-bind="slotProps" />
        </template>
        <template #no-data>
          <div class="w-full text-center py-6 text-gray-500 dark:text-gray-400">
            {{ $t('common.noData') }}
          </div>
        </template>
      </UTable>
      <div class="flex justify-center border-t border-default pt-4">
        <UPagination
            :default-page="(pagination.pageIndex || 0) + 1"
            :items-per-page="pagination.pageSize"
            :total="pagination.total"
            @update:page="onChangePage"
          />
      </div>
    </div>

   
</template>