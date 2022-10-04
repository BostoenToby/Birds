<template>
  <route-holder :title="`Hi, ${user?.displayName}`" >
  <button @click="handleLogOut">
    Log out
  </button>
</route-holder>
</template>

<script lang="ts">
// als setup bij script staat is alles dat erna komt in de setup function gepropt
import useAuthentication from '../composables/useAuthentication'
import { useRouter } from 'vue-router'
import RouteHolder from '../components/holders/RouteHolder.vue'

export default {
  setup() {
    const { user, logout } =
      useAuthentication()
    const { replace } = useRouter()
    const handleLogOut = () => {
      logout().then(() => {
        return replace('/auth/login')
      })
    }

    return {
      user,
      RouteHolder,
      handleLogOut,
    }
  },
}
</script>
