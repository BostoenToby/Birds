<template>
  <router-view></router-view>
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
