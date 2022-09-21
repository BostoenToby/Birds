<template>
  <div
    class="grid min-h-screen place-items-center bg-neutral-50"
  >
    <div class="w-full max-w-lg px-6">
      <Logo class="mx-auto mb-12 h-20"/>
      <div
        class="mb-20 rounded-lg bg-white p-6 py-10 "
      >
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  // omdat we hier setup in script plaatsen is alles in de setup en kan je direct logo gebruiken zonder export default
  import Logo from '../generic/Logo.vue' 
</script>