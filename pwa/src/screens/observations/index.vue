<template>
  <route-holder title="Observations">
    <template #header-actions>
      <RouterLink to="/observations/add" class="bg-theme rounded-md bg-neutral-800 px-4 py-2 text-white" @click="createObservation">
        Create observation
      </RouterLink>
    </template>
    <ObservationsTable v-if="result" :observations="result.observations"></ObservationsTable>
  </route-holder>
</template>

<script lang="ts">
import { useQuery } from '@vue/apollo-composable'
import gql from 'graphql-tag'
import { watch } from 'vue'
import RouteHolder from '../../components/holders/RouteHolder.vue'
import ObservationsTable from '../../components/observation/ObservationsTable.vue'
export default {
  components: {
    RouteHolder,
    ObservationsTable,
  },

  setup() {
    const OBSERVATIONS = gql`
      query observations {
        observations {
          name
          id
          active
          bird {
            id
            name
            category
            description
            fullname
            observations
            url
          }
          createdAt
          description
          location {
            createdAt
            id
            location
            name
            updatedAt
          }
          userId
          weather
        }
      }
    `

    const { result, loading, error } =
      useQuery(OBSERVATIONS)

      watch(result, () => {
        console.log(result)
      })
    return {
      result,
      loading,
      error,
    }
  },
}
</script>
