<template>
  <div class="pt-3 px-6 pb-6">
    <footer class="hidden sm:block max-w-6xl">
      <p class="text-sm text-neutral-800">
        Toby Bostoen - Disclaimer
        {{ new Date().getFullYear() }}
      </p>
    </footer>
    <nav class="block sm:hidden">
      <AppNavigation />
    </nav>
  </div>
</template>

<script lang="ts">
  import AppNavigation from '../generic/AppNavigation.vue'
  export default {
    components: {
      AppNavigation
    }
  }
</script>
