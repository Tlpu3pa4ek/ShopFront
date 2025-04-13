<script>
// // import { ProductService } from '@/service/ProductService';
// import { onMounted, ref } from 'vue';
//
// const products = ref(null);
//
// function formatCurrency(value) {
//     return value.toLocaleString('en-US', { style: 'currency', currency: 'USD' });
// }
//
// onMounted(() => {
//     ProductService.getProductsSmall().then((data) => (products.value = data));
// });

import axios from "axios";

export default {
  data() {
    return {
      salesData: [],
      loading: true,
    }
  },
  methods: {
    async getLastSales() {
      await axios.get('http://localhost:8000/api/admin/get-washes?last=1', {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('access_token')}`
        }
      })
          .then(response => {
            this.salesData = response.data;
          })
          .catch(error => {
            console.log(error);
          });
    },
  },
  async mounted() {
    await this.getLastSales()
    this.loading = false
  }
}
</script>

<template>
    <div class="card">
        <div class="font-semibold text-xl mb-4">Recent Sales</div>
        <DataTable :value="salesData" :rows="5" :paginator="true" responsiveLayout="scroll">
          <AppColumn field="image" header="Image">
            <template #body="{data}">
              <img :src="data.image" alt="">
            </template>
          </AppColumn>
          <AppColumn field="name" header="Name" :sortable="true" />
          <AppColumn field="status" header="Status" :sortable="true" />
          <AppColumn field="date" header="Date" :sortable="true" />
          <AppColumn field="time" header="Time" :sortable="true" />
        </DataTable>
    </div>
</template>
