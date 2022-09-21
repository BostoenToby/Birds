<template>
  <div class="grid grid-rows-[auto_1fr_auto] min-h-screen h-screen sm:h-auto">
    <AppHeader />
  
    <router-view class="overflow-y-auto"></router-view>
  
    <AppFooter />
  </div>
</template>

<script lang="ts">
import AppFooter from '../generic/AppFooter.vue'
import AppHeader from '../generic/AppHeader.vue'

export default {
  components: {
    AppFooter,
    AppHeader,
  },
}
</script>
