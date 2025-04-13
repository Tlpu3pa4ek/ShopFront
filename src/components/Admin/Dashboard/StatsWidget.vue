<template>
    <div class="col-span-12 lg:col-span-6 xl:col-span-3 bg-white rounded-5">
        <div class="card mb-0 p-4 ">
            <div class="flex justify-between mb-4">
                <div>
                    <span class="block text-muted-color font-medium mb-4">Orders</span>
                    <div class="text-surface-900 dark:text-surface-0 font-medium text-xl">{{userData.orders}}</div>
                </div>
                <div class="flex items-center justify-center bg-blue-100 dark:bg-blue-400/10 rounded-border" style="width: 2.5rem; height: 2.5rem">
                    <i class="pi pi-shopping-cart text-blue-500 !text-xl"></i>
                </div>
            </div>
        </div>
    </div>
    <div class="col-span-12 lg:col-span-6 xl:col-span-3 bg-white">
        <div class="card mb-0 p-4">
            <div class="flex justify-between mb-4">
                <div>
                    <span class="block text-muted-color font-medium mb-4">Revenue</span>
                    <div class="text-surface-900 dark:text-surface-0 font-medium text-xl">₸{{userData.revenue}}</div>
                </div>
                <div class="flex items-center justify-center bg-orange-100 dark:bg-orange-400/10 rounded-border" style="width: 2.5rem; height: 2.5rem">
                    <i class="pi pi-dollar text-orange-500 !text-xl"></i>
                </div>
            </div>
        </div>
    </div>
    <div class="col-span-12 lg:col-span-6 xl:col-span-3 bg-white">
        <div class="card mb-0 p-4">
            <div class="flex justify-between mb-4">
                <div>
                    <span class="block text-muted-color font-medium mb-4">Customers</span>
                    <div class="text-surface-900 dark:text-surface-0 font-medium text-xl">{{userData.customers}}</div>
                </div>
                <div class="flex items-center justify-center bg-cyan-100 dark:bg-cyan-400/10 rounded-border" style="width: 2.5rem; height: 2.5rem">
                    <i class="pi pi-users text-cyan-500 !text-xl"></i>
                </div>
            </div>
        </div>
    </div>
    <div class="col-span-12 lg:col-span-6 xl:col-span-3 bg-white">
        <div class="card mb-0 p-4">
            <div class="flex justify-between mb-4">
                <div>
                    <span class="block text-muted-color font-medium mb-4">Employees</span>

                  <button @click="downloadExel()" class="text-surface-900 dark:text-surface-0 font-medium text-lg text-blue-500">Скачать таблицу</button>
                </div>
                <div class="flex items-center justify-center bg-purple-100 dark:bg-purple-400/10 rounded-border" style="width: 2.5rem; height: 2.5rem">
                    <i class="pi pi-comment text-purple-500 !text-xl"></i>
                </div>
            </div>
        </div>
    </div>


</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      userData: [],
      employeesDialog: {
        visible: false,
        data: {},
      },
      loading: true,
    }
  },
  methods: {
    async downloadExel(){
      try {
        const response = await axios.get('http://localhost:8000/api/admin/export-clients', {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('access_token')}`
          },
          responseType: 'blob'
        });

        const disposition = response.headers['content-disposition'];
        const fileName = disposition ? disposition.split('filename=')[1].replace(/"/g, '') : 'clients_data.xlsx';

        const url = URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', fileName);

        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);

        URL.revokeObjectURL(url);

      } catch (error) {
        console.error('Ошибка при скачивании файла:', error);
      }
    },


    async getOrder() {
      await axios.get('http://localhost:8000/api/admin/get-washes?order=1', {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('access_token')}`
        }
      })
          .then(response => {
            this.userData.orders = response.data;
          })
          .catch(error => {
            console.log(error);
          });
    },
    async createEmployees() {
      // {
      //   name: 1,
      //       email: 1,
      //     phone_number: 1,
      //     position: 1,
      //     hired_at: 1,
      //     shift: 1,
      // }
      await axios.post('http://localhost:8000/api/employee/create', this.employeesDialog.data, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('access_token')}`
        }
      })
          .then(response => {
            console.log('response.data: ', response.data);
            this.userData = response.data;
            console.log('userData: ', this.userData);
            this.userPhotoUrl = `http://localhost/storage/${response.data.photo}`;
          })
          .catch(error => {
            console.log(error);
          });
    },

    async getCustomers() {
      await axios.get('http://localhost:8000/api/admin/get-washes?customers=1', {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('access_token')}`
        }
      })
          .then(response => {
            this.userData.customers = response.data;
          })
          .catch(error => {
            console.log(error);
          });
    },

    async getRevenue() {
      await axios.get('http://localhost:8000/api/car-washes/get-revenue?revenue=1', {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('access_token')}`
        }
      })
          .then(response => {
            this.userData.revenue = response.data;
          })
          .catch(error => {
            console.log(error);
          });
    },
  },
  async mounted() {
    await this.getOrder()
    await this.getCustomers()
    await this.getRevenue()
    this.loading = false
  }
}
</script>
<style scoped>

</style>