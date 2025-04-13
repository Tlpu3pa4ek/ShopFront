<script setup>

import FeaturesWidget from "@/components/Client/Lending/FeaturesWidget.vue";
import PricingWidget from "@/components/Client/Lending/PricingWidget.vue";
import HighlightsWidget from "@/components/Client/Lending/HighlightsWidget.vue";
import HeroWidget from "@/components/Client/Lending/HeroWidget.vue";
import FooterWidget from "@/components/Client/Lending/FooterWidget.vue";
import TopbarWidget from "@/components/Client/Lending/TopbarWidget.vue";
</script>

<template>

  <div class="py-6 px-6 mx-0 md:mx-12 lg:mx-0 lg:px-10 flex items-center justify-between relative lg:static">
    <TopbarWidget />
  </div>
  <HeroWidget />
  <FeaturesWidget />
  <HighlightsWidget />
  <PricingWidget />
  <FooterWidget />

</template>

<style scoped>

</style>