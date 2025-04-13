<script>
import axios from "axios";

export default {
  data() {
    return {
      data: '',
      category_name: '',
      description: '',
      editMode: false,
      filters: {
        global: {}
      },
      categoryDialog: {
        visible: false,
        data: {},
      },
      selectedProducts: []
    };
  },
  methods: {
    addCategory() {
      axios.post('http://localhost:8000/api/categories', {
        'name': this.category_name,
        'description': this.description
      }).then(() => {
        this.category_name = '';
        this.description = '';
        this.getCategories();
      });
    },

    getCategories() {
      axios.get('http://localhost:8000/api/categories', {
        headers:{
          'Authorization': `Bearer ${localStorage.getItem('access_token')}`
        }
      })
          .then(response => this.data = response.data);
    },

    closeDialog(){
      this.categoryDialog.visible = false
      this.categoryDialog.data = {}
    },

    openDialog(item){
      this.categoryDialog.visible = true
      this.categoryDialog.data = {...item} || {
        category_name: '',
        description: '',
      }
    },

    async deleteCategory(data){
      axios.delete(`http://localhost:8000/api/categories/delete/${data.id}`,  {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('access_token')}`
        }
      }).then(() => {
        this.getCategories();
      });
    },

    saveDialogData(data) {
      console.log(data)
      if (data.id){
        axios.put(`http://localhost:8000/api/categories/update/${data.id}`, {
          'name': data.category_name,
          'description': data.description
        }, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('access_token')}`
        }
      }).then(() => {
          this.getCategories();
        });
      } else {
        axios.post(`http://localhost:8000/api/categories/create`, {
          'name': data.category_name,
          'description': data.description
        }, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('access_token')}`
        }
      }).then(() => {
          this.getCategories();
        });
      }
      this.closeDialog()
    },

    isEdit(id) {
      this.editMode = this.editMode === id ? null : id;
    }
  },
  mounted() {
    this.getCategories();
  }
};
</script>

<template>

    <div class="card">

      <Toolbar class="mb-6">
        <template #start>
          <AppButton label="New" icon="pi pi-plus" severity="secondary" class="mr-4 p-2 pr-4 pl-4 bg-lime-400 hover:bg-lime-500 text-zinc-700" @click="openDialog()" />
        </template>

        <template #end>
          <AppButton label="Export" icon="pi pi-upload" class="bg-gray-200 p-2 pl-4 pr-4 hover:bg-gray-300 text-zinc-700" severity="secondary" @click="exportCSV($event)" />
        </template>
      </Toolbar>


      <DataTable v-model:selection="selectedProducts" dataKey="id" :value="data" :filters="filters" :rows="5" :paginator="true" responsiveLayout="scroll">
        <template #header>
          <div class="flex flex-wrap gap-2 items-center justify-between">
            <h2 class="m-0">Categories</h2>
            <IconField>
              <InputIcon>
                <i class="pi pi-search" />
              </InputIcon>
              <InputText class="p-2 pr-4 pl-4" v-model="filters['global'].value" placeholder="Search..." />
            </IconField>
          </div>
        </template>

        <AppColumn field="category_name" header="Category Name" :sortable="true"/>
        <AppColumn field="description" header="Description" :sortable="true"/>
        <AppColumn field="name" header="Car Wash" :sortable="true"/>
        <AppColumn field="instagram" header="Instagram" :sortable="true"/>
        <AppColumn field="phone" header="Phone" :sortable="true"/>
        <AppColumn>
          <template #body="slotProps">
            <div class="flex flex-row">
              <AppButton icon="pi pi-pencil" outlined rounded severity="danger" class="mr-2 p-1 text-green-500 bg-white border-green-300 hover:bg-green-50 border-solid border-2" @click="openDialog(slotProps.data)" />
              <AppButton icon="pi pi-trash" outlined rounded severity="danger" class=" p-1 text-red-500 bg-white border-red-300 hover:bg-red-50 border-solid border-2" @click="deleteCategory(slotProps.data, $event)" />
              <ConfirmPopup group="deleteGroup"></ConfirmPopup>
            </div>
          </template>
        </AppColumn>
      </DataTable>


      <AppDialog :visible="categoryDialog.visible" modal header="Добавление сотрудника"
                 :style="{ width: '40rem' }" :closable="false"
                 :breakpoints="{ '1199px': '75vw', '575px': '90vw' }">
        <div>
          <div class="card">
            <label>Название</label>
            <input
                v-model="categoryDialog.data.category_name"
                type="text"
                placeholder="Укажите название"
                class="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
            />
          </div>


          <div class="card">
            <label>Описание</label>
            <input
                v-model="categoryDialog.data.description"
                type="text"
                placeholder="Укажите описание"
                class="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
            />
          </div>
        </div>
        <template #footer>
          <button @click="closeDialog()" class="close-button mr-1 ml-1">Закрыть</button>
          <button @click="saveDialogData(categoryDialog.data)" class="save-button ml-1">Сохранить</button>
        </template>

      </AppDialog>
    </div>

</template>

<style scoped>

.card{
  padding: 1rem;
  background-color: #fff;
}

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


</style>
