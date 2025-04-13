<script setup>

import StatsWidget from "@/components/Admin/Dashboard/StatsWidget.vue";
import RecentSalesWidget from "@/components/Admin/Dashboard/RecentSalesWidget.vue";
import BestSellingWidget from "@/components/Admin/Dashboard/BestSellingWidget.vue";
import NotificationsWidget from "@/components/Admin/Dashboard/NotificationsWidget.vue";
</script>

<template>
  <div class="grid grid-cols-12 gap-8 mt-8">
    <StatsWidget class="bg-white p-4"/>

    <div class="grid gap-8 col-span-12 xl:col-span-6">
      <RecentSalesWidget class="bg-white p-4 "/>
      <BestSellingWidget class="bg-white p-4 "/>
    </div>
    <div class="col-span-12 xl:col-span-6">
      <NotificationsWidget class="bg-white p-4"/>
    </div>

  </div>
</template>

<style scoped>

</style>