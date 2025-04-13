<script>
import axios from "axios";
import PrimePreloader from '@/components/Preloader/PrimePreloader.vue';

export default {
  components: { PrimePreloader},
  data() {
    return {
      loading: true,
      userData: '',
      historyData: '',
      selectedFile: null, // Для загрузки фото
      userPhotoUrl: '',    // Для отображения фото
    }
  },
  methods: {
    async getInfo() {
      await axios.post('http://localhost:8000/api/auth/me', {}, {
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
    history() {
      axios.get(`http://localhost:8000/api/user/`, {
        headers:{
          'Authorization': `Bearer ${localStorage.getItem('access_token')}`
        }
      })
          .then(response => {
            this.historyData = response.data;
          })
    },
    handleFileChange(event) {
      this.selectedFile = event.target.files[0]; // Сохраняем выбранный файл

      this.uploadPhoto()
    },
    uploadPhoto() {
      if (!this.selectedFile) {
        alert("Please select a photo to upload!");
        return;
      }

      const formData = new FormData();
      formData.append("photo", this.selectedFile); // Добавляем фото в FormData

      axios.post('http://localhost:8000/api/user/upload-photo', formData, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('access_token')}`,
          'Content-Type': 'multipart/form-data',
        }
      })
          .then(response => {
            console.log('Access token in localStorage:', localStorage.getItem('access_token'));

            this.userPhotoUrl = `${response.data.photo_url}`; // Обновляем URL после загрузки
            this.getInfo();
          })
          .catch(error => {
            console.log("Failed to upload photo:", error);
          });
    }
  },
  async mounted() {
    await this.getInfo();
    this.loading = false
  }
}
</script>

<template>
<!--  <div v-if="userData" class="user-info">-->
<!--    <h3>Name: {{ userData.name }}</h3>-->
<!--    <h3>Email: {{ userData.email }}</h3>-->
<!--    <h3>Role: {{ userData.role }}</h3>-->
<!--  </div>-->

<!--  <div v-if="userPhotoUrl" class="photo-section">-->
<!--    <h3>User Photo:</h3>-->
<!--    <img :src="userPhotoUrl" alt="User Photo" class="user-photo" />-->
<!--  </div>-->

<!--  <div class="upload-section">-->
<!--    <h3>Upload New Photo:</h3>-->
<!--    <input type="file" @change="handleFileChange" />-->
<!--    <button @click="uploadPhoto" class="upload-button">Upload Photo</button>-->

<!--  </div>-->


  <PrimePreloader v-if="loading"/>

  <div v-else>


    <div class="flex flex-col md:flex-row bg-white shadow-lg rounded-lg overflow-hidden" style="margin-top: 3rem">
      <!-- Левая часть: Информация о пользователе -->
      <div class="bg-beige-100 p-8 flex flex-col items-center" style="background-color: #f5ede6;">
        <div class="avatar-container">
          <img v-if="!userData.photo" src="src/assets/images/user.def.photo.png" class="avatar1" alt="UserAcatar">
          <img v-if="userData.photo" :src="`http://localhost:8000/storage/${userData.photo}`" class="avatar" alt="UserAcatar">
          <label class="upload-label">
            Загрузить фото
            <input type="file" class="upload-input" accept="image/jpeg, image/png" @change="handleFileChange">
          </label>
        </div>
        <!--        <h2 v-if="userData" class="mt-4 text-xl font-semibold">{{ userData.name }}</h2>-->
        <!--        <p v-if="userData" class="text-gray-600">{{ userData.email }}</p>-->
        <!--        <p v-if="userData" class="text-gray-600">Role: {{ userData.role }}</p>-->

        <div class="flex mt-4 space-x-4">
          <a href="#" class="text-gray-600 hover:text-blue-500"><i class="fab fa-facebook-f"></i></a>
          <a href="#" class="text-gray-600 hover:text-blue-500"><i class="fab fa-twitter"></i></a>
          <a href="#" class="text-gray-600 hover:text-blue-500"><i class="fab fa-linkedin-in"></i></a>
          <a href="#" class="text-gray-600 hover:text-blue-500"><i class="fab fa-instagram"></i></a>
        </div>

        <button @click="history()" class="history-button">Purchases History</button>
      </div>

      <!-- Правая часть: История покупок -->
      <div class="p-8 flex-1">
        <h1 class="text-4xl font-bold">{{ userData.name }}</h1>
        <p class="mt-6 text-gray-600">Email: {{ userData.email }}</p>
        <p class="mt-2 text-gray-600">Role: {{ userData.role }}</p>


        <div v-if="historyData" class="history-table-container">
<!--          <div class="card">-->
<!--            <div class="font-semibold text-xl mb-4">History</div>-->
<!--            <DataTable :value="historyData" :rows="5" :paginator="true" responsiveLayout="scroll">-->
<!--              <AppColumn header="Number" :sortable="true" style="width: 35%">-->
<!--                <template #body="">-->
<!--                  {{}}-->
<!--                </template>-->
<!--              </AppColumn>-->
<!--              <AppColumn field="name" header="Name" :sortable="true" style="width: 35%"/>-->
<!--              <AppColumn field="status" header="Status" :sortable="true" style="width: 35%"/>-->
<!--              <AppColumn field="time" header="Time" :sortable="true" style="width: 35%"/>-->
<!--            </DataTable>-->
<!--          </div>-->

          <table class="history-table">
            <thead>
            <tr>
              <th>Number</th>
              <th>Name</th>
              <th>Status</th>
              <th>Time</th>
              <!--          <th>Create Time</th>-->
            </tr>
            </thead>
            <tbody>
            <tr v-for="(data, index) in historyData" :key="data.id">
              <td>{{ index + 1 }}</td>
              <td>{{ data.name }}</td>
              <td>{{ data.status }}</td>
              <td>{{ data.time }}</td>
              <!--          <td>{{ new Date(data.created_at).toLocaleString() }}</td>-->

            </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>






</template>

<style scoped>
/* User Info Section */
.user-info {
  background-color: #f9f9f9;
  padding: 20px;
  border-radius: 8px;
  margin-bottom: 20px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.user-info h3 {
  font-size: 18px;
  color: #333;
  margin: 5px 0;
}

.photo-section {
  margin-bottom: 20px;
}

.user-photo {
  width: 150px;
  height: 150px;
  border-radius: 50%;
  object-fit: cover;
  margin: 10px 0;
}

.upload-section {
  margin-bottom: 20px;
}

.upload-button {
  background-color: #007bff;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
  margin-top: 10px;
}

.upload-button:hover {
  background-color: #0056b3;
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

/* Table Section */
.history-table-container {
  overflow-x: auto;
}

.history-table {
  width: 100%;
  border-collapse: collapse;
  margin: 20px 0;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.history-table th, .history-table td {
  padding: 12px 15px;
  text-align: left;
}

.history-table thead {
  background-color: #f1f1f1;
}

.history-table th {
  font-weight: bold;
  color: #444;
}

.history-table tr:nth-child(even) {
  background-color: #f9f9f9;
}

.history-table tr:hover {
  background-color: #f2f2f2;
}

.history-table td {
  border-bottom: 1px solid #ddd;
}





.avatar-container {
  position: relative;
  width: 175px;
  height: 175px;
  margin: 20px auto;
  border-radius: 50%;
  overflow: hidden;
  background: greenyellow;
}

.avatar {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
.avatar1 {
  width: 175px;
  height: 175px;

}

.upload-label {
  position: absolute;
  display: flex;
  left: 0;
  bottom: 0;
  height: 100px;
  width: 100%;
  background: rgba(0, 0, 0, 0.6);
  color: #fff;
  padding: 0;
  font-size: 16px;
  cursor: pointer;
  text-align: center;
  align-items: center;
  justify-content: center;
  opacity: 0;
}

.upload-label:hover {
  opacity: 5;
}

.upload-input {
  display: none;
}

</style>
