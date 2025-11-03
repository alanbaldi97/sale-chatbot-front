<template>
  <div class="space-y-6">
    <div>
      <h1 class="text-2xl font-bold text-gray-900 dark:text-white">
        Costos
      </h1>
      <p class="text-gray-600 dark:text-gray-400">
        Revisa y analiza los costos
      </p>
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <UCard class="lg:col-span-2">
        <template #header>
          <h3 class="text-lg font-medium text-gray-900 dark:text-white">
            Uso de Gemini AI
          </h3>
        </template>
        
        <div class="w-full h-full">
            <GraphsBarChart v-if="!loading && !hasError" :chart-data="charData" :options="options" />
            <div v-else-if="hasError" class="flex flex-col items-center justify-center h-64 space-y-4">
              <UIcon name="i-heroicons-exclamation-triangle" class="w-8 h-8 text-red-500" />
              <p class="text-red-600 dark:text-red-400">Error al cargar los datos del gráfico.</p>
            </div>
            <div v-else class="flex items-center justify-center h-64">
              <UProgress indeterminate size="lg" />
              <span class="sr-only">Cargando gráfico...</span>
            </div>
        </div>
      </UCard>

      <UCard>
        <template #header>
          <h3 class="text-lg font-medium text-gray-900 dark:text-white">
            Mes corriente
          </h3>
        </template>
        
        <div class="space-y-4">
            <div v-if="loading" class="flex items-center justify-center h-32">
                    <UProgress indeterminate size="lg" />
                <span class="sr-only">Cargando datos...</span>
            </div>
            <div v-else-if="hasError" class="flex flex-col items-center justify-center h-32 space-y-4">
                <UIcon name="i-heroicons-exclamation-triangle" class="w-8 h-8 text-red-500" />
                <p class="text-red-600 dark:text-red-400">Error al cargar los datos.</p>
            </div>
            <div v-else-if="itemCurrentMonth" class="space-y-4">
                <div class="flex items-center justify-between">
                    <span class="text-gray-700 dark:text-gray-300">Costo en MXN</span>
                    <span class="text-lg font-semibold text-gray-900 dark:text-white">
                        {{ toCurrency(itemCurrentMonth.total_cost_mxn, 'MXN') }}
                    </span>
                </div>
                <div class="flex items-center justify-between">
                    <span class="text-gray-700 dark:text-gray-300">Costo en USD</span>
                    <span class="text-lg font-semibold text-gray-900 dark:text-white">
                        {{ toCurrency(itemCurrentMonth.total_cost_usd, 'USD') }}
                    </span>
                </div>
                <div class="flex items-center justify-between">
                    <span class="text-gray-700 dark:text-gray-300">Días restantes</span>
                    <span class="text-lg font-semibold text-gray-900 dark:text-white">
                        {{ new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0).getDate() - new Date().getDate() }} días
                    </span>
                </div>
            </div>
            
        </div>
      </UCard>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { ItemPricing } from '~/interfaces/item_pricing';



const loading = ref(false);

const hasError = ref(false);

 const options = ref({
    responsive: true,
    plugins: {
    legend: {
        position: 'top',
    },
    title: {
        display: true,
        text: 'Costos Mensuales',
    },
    },
});

const itemCurrentMonth = ref<ItemPricing | null>(null);

const charData = ref({
    labels: ['Red', 'Blue', 'Yellow'],
    datasets: [
    {
        label: 'Dataset 1',
        data: [300, 50, 100],
        backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
        hoverOffset: 4,
    },
    ],
});


const getData = async () => {
    loading.value = true;
    try {
        const data:any = await useFetchRequest('/api/query-billing');

        const history = data.history.reverse();

        itemCurrentMonth.value = data.current_month;
        
        charData.value = {
            labels: history.map((item: any) => item.month_name),
            datasets: [
                {
                    label: 'Costos MXN',
                    data: history.map((item: any) => item.total_cost_mxn),
                    backgroundColor: ['#005377'],
                    hoverOffset: 4,
                },
            ],

        }

    } catch (error) {
        hasError.value = true;
    } finally {
        loading.value = false;
    }
};


onMounted(() => {
  getData();
});

</script>