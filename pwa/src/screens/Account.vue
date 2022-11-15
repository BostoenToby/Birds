<template>
  <route-holder :title="'title'">
    <template #header-actions>
      <button
        class="@dark:bg-neutral-50 @dark:text-neutral-800 mt-6 rounded-md bg-neutral-800 px-4 py-2 text-white"
        @click="handleLogOut"
      >
        Log out
      </button>
    </template>
    <div class="mb-12 grid grid-cols-3">
      <div>
        <h2
          class="font-theme mb-3 text-2xl font-medium tracking-wide"
        >
          Stats
        </h2>
        <p>
          Birds spotted: {{ customUser?.observationsCount }}
        </p>
      </div>
      <div class="span-2">
        <p class="text-xl font-medium">Realtime</p>
        <div class="flex items-center gap-3">
          <input
            type="checkbox"
            id="server"
            v-model="connectedToServer"
          />
          <label for="server">Connected to server </label>
        </div>
        <div class="flex gap-2">
          <span
            class="h-4 w-4 animate-pulse text-green-800"
          ></span>
          <p>Offline</p>
        </div>
      </div>
    </div>

    <div v-if="customUser">
      <h2
        class="font-theme mb-3 text-2xl font-medium tracking-wide"
      >
        Recent observations
      </h2>
      <observations-table
        :observations="customUser.observations!"
      />
    </div>
  </route-holder>
</template>

<script lang="ts">
import RouteHolder from '../components/holders/RouteHolder.vue'
import useAuthentication from '../composables/useAuthentication'
import { useRouter } from 'vue-router'
import useCustomUser from '../composables/useCustomerUser'
import ObservationsTable from '../components/observation/ObservationsTable.vue'
import useSocket from '../composables/useSocket'
import { ref, watch } from 'vue'
import { disconnect } from 'process'
import { computed } from '@vue/reactivity'

export default {
  components: {
    RouteHolder,
    ObservationsTable,
  },

  setup() {
    const { user, logout } = useAuthentication()
    const { customUser } = useCustomUser()
    const { replace } = useRouter()
    const { connectToServer, connected, disconnectFromServer } = useSocket()

    const connectedToServer = ref<boolean>(connected.value)

    const handleLogOut = () => {
      logout().then(() => {
        return replace('/auth/login')
      })
    }

    // const title = computed(() => t('account.welcome', { user: user.value?.displayName}))

    const getToken = async () => {
      console.log(await user.value?.getIdToken())
    }

    getToken()

    watch(connectedToServer, () => {
      if (connectedToServer.value === false) {
        disconnectFromServer()
      } else {
        connectToServer()
      }
    })

    return {
      user,
      customUser,
      connectedToServer,
      disconnectFromServer,
      title,

      handleLogOut,
    }
  },
}
</script>
