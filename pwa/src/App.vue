<template>
  <router-view class="min-h-screen bg-neutral-50"></router-view>
</template>

<script lang="ts">
import useFirebase from './composables/useFirebase'

export default {
  setup() {
    const { app } = useFirebase()

    return {}
  },
}
</script>
