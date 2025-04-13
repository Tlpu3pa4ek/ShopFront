<template>
  <div class="flex space-x-6">


<!--    <router-link v-if="isAuthenticated" to="/cart" class="nav-link">Cart</router-link>-->
    <router-link v-if="!isAuthenticated" to="/login" class="nav-link">Login</router-link>
    <router-link v-if="!isAuthenticated" to="/register" class="nav-link">Register</router-link>


    <button v-if="userData" @click="loginDrop" ref="loginMenu" class="nav-link">
      {{ userData.name }} <i :class="arrowStyle" style="margin-left: 0.5rem"></i>
    </button>

    <div class="login-panel-parrent mt-7 m-0" v-if="showLoginPanel">
      <div class="login-panel ">
        <div class="login-panel__child text-center">

          <button v-if="isAuthenticated" @click="profilePage(userData.id)" class="nav-link">Profile</button>
        </div>
        <div class="login-panel__child text-center">
          <button v-if="isAuthenticated" @click="logout">Logout</button>
        </div>
      </div>
    </div>

    <div class="fake-div" v-if="!showLoginPanel">

    </div>


  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      userData: null,
      showLoginPanel: false,
    };
  },
  computed: {
    isAuthenticated() {
      return !!localStorage.getItem("access_token");
    },

    arrowStyle(){
      let style = ''
      // eslint-disable-next-line vue/no-side-effects-in-computed-properties
      this.showLoginPanel === true? style = 'pi pi-angle-up' : style = 'pi pi-angle-down'
      return style
    }
  },
  methods: {
    checkedRole(checkedRole) {
      return localStorage.getItem("role") === checkedRole;
    },

    loginDrop(){
      this.showLoginPanel = !this.showLoginPanel;
    },

    async getProfile() {
      try {
        const response = await axios.post(
            "http://localhost:8000/api/auth/me",
            {},
            {
              headers: {
                Authorization: `Bearer ${localStorage.getItem("access_token")}`
              }
            }
        );
        this.userData = response.data;
      } catch (error) {
        console.error("Ошибка загрузки профиля:", error);
      }
    },
    logout() {
      this.loginDrop()
      localStorage.removeItem("access_token");
      localStorage.removeItem("role");
      this.userData = null;
      this.$router.push("/login");
      setTimeout(() => {
        window.location.reload();
      }, 200);
    },
    profilePage(id) {
      this.loginDrop()
      this.$router.push(`/profile/${id}`);
    },

    handleClickOutside(event) {
      const menu = this.$refs.loginMenu;
      if (menu && !menu.contains(event.target)) {
        this.showLoginPanel = false;
      }
    },
  },
  watch: {
    isAuthenticated(newVal) {
      if (newVal) {
        this.getProfile();
      } else {
        this.userData = null;
      }
    }
  },
  mounted() {
    if (this.isAuthenticated) {
      this.getProfile();
    }

    document.addEventListener("click", this.handleClickOutside);
  },

  beforeUnmount() {
    document.removeEventListener("click", this.handleClickOutside);
  },
};
</script>

<style scoped>
.login-panel-parrent{
  cursor: pointer;
  position: relative;
}
.login-panel{
  align-items: center;
  justify-content: center;
  cursor: pointer;
  background-color: #fff;
  display: flex;
  left: -136px;
  flex-direction: column;
  width: 10rem;
  position: absolute;
  z-index: 1;
  border-radius: 12px;
}

.login-panel__child{
  font-size: 1rem;
  font-weight: 500;
  color: dimgray;
  margin: 0.5rem 0;
  padding: 0.5rem;
  width: 8rem;
  text-align: center;
}

.login-panel__child:hover {
  border-radius: 12px;
  color: #555555;
  background-color: #f6f6f6;
}


.nav-link {
  font-size: 1rem;
  font-weight: 500;
  color: #007bff;
  text-decoration: none;
  transition: color 0.3s ease-in-out;
}

.nav-link:hover {
  color: #0056b3;
}

.fake-div{
  width: 0.01rem;
}
</style>
