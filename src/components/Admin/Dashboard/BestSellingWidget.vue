<script>
import axios from "axios";

export default {
  data() {
    return {
      bestSalesData: [],
      loading: true,
    }
  },
  methods: {
    async getLastSales() {
      await axios.get('http://localhost:8000/api/admin/get-washes?popular=1', {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('access_token')}`
        }
      })
          .then(response => {
            this.bestSalesData = response.data;
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
    <div class="font-semibold text-xl mb-4">Best Selling Products</div>
    <DataTable :value="bestSalesData" :rows="5" :paginator="true" responsiveLayout="scroll">
      <AppColumn field="name" header="Name" :sortable="true"/>
      <AppColumn field="image" header="Image">
        <template #body="{data}">
          <img :src="data.image" alt="">
        </template>
      </AppColumn>
      <AppColumn field="service_count" header="Count" :sortable="true"/>
    </DataTable>
  </div>
</template>
