<template>
  <nav class=" nav-menu-items flex items-center justify-between py-4 border-b border-gray-300 bg-white shadow-md px-6 rounded-lg mb-4">
    <div class="flex space-x-6 pl-2">
      <div class="admin-panel mt-9" v-show="showAdminPanel">
        <div class="admin-panel__child pt-4 pb-2 text-center">
          <router-link to="/dashboard" class="nav-link" @click="adminDrop">Dashboard</router-link>
        </div>
        <div class="admin-panel__child pt-2 pb-4 text-center">
          <router-link to="/employees" class="nav-link" @click="adminDrop">Employees</router-link>
        </div>
        <div class="admin-panel__child pt-2 pb-4 text-center">
          <router-link to="/edit/categories" class="nav-link" @click="adminDrop">Categories</router-link>
        </div>
      </div>
      <div v-if="checkedRole('admin')" class="nav-link pl-4" ref="adminMenu" @click="adminDrop">
         Admin <i :class="arrowStyle" style="margin-left: 0.5rem"></i>
      </div>
      <div v-if="checkedRole('user')" class="nav-link">
        <router-link to="/home">Home</router-link>
      </div>
      <div v-if="checkedRole('user')" class="nav-link">
        <router-link to="/about" >About us</router-link>
      </div>
      <div v-if="checkedRole('user')" class="nav-link">
        <router-link to="/contacts">Contacts</router-link>
      </div>

    </div>
    <AuthButtons class=""/>
  </nav>
</template>

<script>

import AuthButtons from "@/components/Client/Authorization/AuthButtons.vue";

export default {
  data(){
    return{
      visible: false,
      showAdminPanel: false,
    }
  },
  components: {
    AuthButtons
  },
  computed: {

    isAuthenticated() {
      return !!localStorage.getItem("access_token");
    },

    // eslint-disable-next-line vue/return-in-computed-property
    arrowStyle(){
      let style = ''
      // eslint-disable-next-line vue/no-side-effects-in-computed-properties
      this.showAdminPanel === true? style = 'pi pi-angle-up' : style = 'pi pi-angle-down'
      return style
    }
  },
  methods: {
    checkedRole(checkedRole) {
      return localStorage.getItem("role") === checkedRole;
    },

    adminDrop(){
      this.showAdminPanel = !this.showAdminPanel;
    },
    handleClickOutside(event) {
      const menu = this.$refs.adminMenu;
      if (menu && !menu.contains(event.target)) {
        this.showAdminPanel = false;
      }
    },
  },
  mounted() {
    document.addEventListener("click", this.handleClickOutside);
  },
  beforeUnmount() {
    document.removeEventListener("click", this.handleClickOutside);
  },
};
</script>

<style scoped>
.nav-menu-items{
  min-height: 70px;
}

.admin-panel{
  background-color: #fff;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 10rem;
  padding-left: -80px;
  position: absolute;
  z-index: 1;
  border-radius: 12px;
}

.admin-panel__child{
  margin: 0.5rem 0;
  padding: 0.5rem;
  width: 9rem;
  text-align: center;
}
.admin-panel__child:hover{
  border-radius: 12px;
  background-color: #f6f6f6;
}

.nav-link {
  cursor: pointer;
  font-size: 1rem;
  font-weight: 500;
  color: #007bff;
  text-decoration: none;
  transition: color 0.3s ease-in-out;
}

.nav-link:hover {
  color: #0056b3;
}
</style>
