<script setup>

import NavigationBar from "@/components/Navigation/NavigationBar.vue";
</script>

<template>

  <NavigationBar/>
  <div class="container mx-auto px-4 py-2">
    <router-view></router-view>
  </div>
</template>
