<template>
  <router-view></router-view>

  <AppFooter />
</template>

<script lang="ts">
import AppFooterVue from '../generic/AppFooter.vue'

export default {
  components: {
    AppFooter: AppFooterVue,
  },
}
</script>
