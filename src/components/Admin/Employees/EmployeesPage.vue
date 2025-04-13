<script>
import axios from "axios";

export default {
  data() {
    return {
      employeesData: [],
      employeesDialog: {
        visible: false,
        data: {},
      },
      loading: true,
    }
  },
  methods: {
    openEmployeesDialog(data){
      this.employeesDialog.visible = true
      this.employeesDialog.data = {...data}
      || {
            name: null,
            position: null,
            shift: null,
            email: null,
            phone_number: null,
            hired_at: null,
          }
    },

    closeEmployeesDialog(){
      this.employeesDialog.visible = false
      this.employeesDialog.data = {}
    },

    async deleteCategory(data){
      await axios.delete(`http://localhost:8000/api/employee/delete/${data.id}`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('access_token')}`
        }
      })
          .then(async () => {
            await this.getEmployees()
          })
          .catch((error) => {
            console.log(error);
          })
    },

    async createEmployees(data) {
      if (data.id){
        axios.put(`http://localhost:8000/api/employee/update/${data.id}`, this.employeesDialog.data,{
              headers: {
                'Authorization': `Bearer ${localStorage.getItem('access_token')}`
              }
            }
        )
            .then(async () => {
              await this.getEmployees()
        });
      } else {
        await axios.post('http://localhost:8000/api/employee/create', this.employeesDialog.data, {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('access_token')}`
          }
        })
            .then(async () => {
              await this.getEmployees()
            })
            .catch(error => {
              console.log(error);
            });
      }

      this.closeEmployeesDialog()
    },


    async getEmployees(){
      await axios.get('http://localhost:8000/api/employee/', {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('access_token')}`
        }
      })
          .then(response => {
            this.employeesData = response.data;
          })
          .catch(error => {
            console.log(error);
          });
    },

  },
  async mounted() {
    await this.getEmployees()
    this.loading = false
  }
}
</script>

<template>

  <div class="grid grid-cols-12 gap-8 mt-8">
    <div class="col-span-12 card">
      <div class=" justify-content-between">
        <div class="font-semibold text-xl mb-4">Сотрудники</div>
        <button @click="openEmployeesDialog()" class="history-button">Добавить сотрудника</button>
      </div>

      <DataTable :value="employeesData" :rows="5" :paginator="true" responsiveLayout="scroll">
        <AppColumn field="name" header="Name" :sortable="true"/>
        <AppColumn field="position" header="Position" :sortable="true"/>
        <AppColumn field="shift" header="Shift" :sortable="true"/>
        <AppColumn field="email" header="Email" :sortable="true"/>
        <AppColumn field="phone_number" header="Phone_number" :sortable="true" />
        <AppColumn field="hired_at" header="Hired At" :sortable="true"/>
        <AppColumn>
          <template #body="slotProps">
            <div class="flex flex-row">
              <AppButton icon="pi pi-pencil" outlined rounded severity="danger" class="mr-2 p-1 text-green-500 bg-white border-green-300 hover:bg-green-50 border-solid border-2" @click="openEmployeesDialog(slotProps.data)" />
              <AppButton icon="pi pi-trash" outlined rounded severity="danger" class=" p-1 text-red-500 bg-white border-red-300 hover:bg-red-50 border-solid border-2" @click="deleteCategory(slotProps.data, $event)" />
              <ConfirmPopup group="deleteGroup"></ConfirmPopup>
            </div>
          </template>
        </AppColumn>
      </DataTable>

      <AppDialog :visible="employeesDialog.visible" modal header="Добавление сотрудника"
                 :style="{ width: '40rem' }" :closable="false"
                 :breakpoints="{ '1199px': '75vw', '575px': '90vw' }">
        <div>
          <div class="card mt-2">
            <label>Имя</label>
            <input
                v-model="employeesDialog.data.name"
                type="email"
                placeholder="Укажите имя"
                class="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
            />
          </div>

          <div class="card mt-2">
            <label>Email</label>
            <input
                v-model="employeesDialog.data.email"
                type="email"
                placeholder="Укажите email"
                class="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
            />
          </div>

          <div class="card mt-2">
            <label>Номер телефона</label>
            <input
                v-model="employeesDialog.data.phone_number"
                type="email"
                placeholder="укажите номер"
                class="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
            />
          </div>

          <div class="card mt-2">
            <label>Позиция</label>
            <input
                v-model="employeesDialog.data.position"
                type="email"
                placeholder="Введите позицию"
                class="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
            />
          </div>

          <div class="card mt-2">
            <label>Дата когда был нанят сотрудник</label>
            <input
                v-model="employeesDialog.data.hired_at"
                type="date"
                placeholder="Выберите дату"
                class="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
            />
          </div>

          <div class="card mt-2">
            <label>Смена</label>
            <input
                v-model="employeesDialog.data.shift"
                type="text"
                placeholder="Укажите смену"
                class="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
            />
          </div>
        </div>
        <template #footer>
          <button @click="closeEmployeesDialog()" class="close-button mr-1 ml-1">Закрыть</button>
          <button @click="createEmployees(employeesDialog.data)" class="save-button ml-1">Сохранить</button>
        </template>

      </AppDialog>
    </div>
  </div>
</template>

<style scoped>
.close-button {
  background-color: #909090;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
  margin-bottom: 20px;
}

.close-button:hover {
  background-color: #6c6c6c;
}
.save-button {
  background-color: #0151aa;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
  margin-bottom: 20px;
}

.save-button:hover {
  background-color: #00408f;
}
.history-button {
  background-color: #ff9f00;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
  margin-bottom: 20px;
}

.history-button:hover {
  background-color: #e68900;
}
</style>