<template>
  <router-view class="min-h-screen bg-neutral-50"></router-view>
</template>

<script lang="ts">
import { DefaultApolloClient } from '@vue/apollo-composable'
import { provide } from 'vue'
import useFirebase from './composables/useFirebase'
import useGraphQL from './composables/useGraphQL'

export default {
  setup() {
    const { app } = useFirebase()
    const { apolloClient } = useGraphQL()

    provide(DefaultApolloClient, apolloClient)
    return {}
  },
}
</script>
