<template>
  <route-holder :title="`${birdName}`">
    <div v-if="loading">
      <p>Loading</p>
    </div>

    <div v-else-if="error">
      <p>Error happened</p>
    </div>

    <div
      class="grid grid-cols-[1fr_2fr] gap-12"
      v-else-if="result"
    >
      <img
        class="aspect-square w-full"
        :src="`/birds/${result.bird.name}.webp`"
        :alt="`Drawing of a ${result.bird.name}`"
      />
      <div class="max-w-lg">
        <p class="mb-3 text-sm">
          {{ result.bird.category }}
        </p>
        <p class="text-lg leading-relaxed">
          {{ result.bird.description }}
        </p>
      </div>
    </div>
  </route-holder>
</template>

<script lang="ts">
import RouteHolder from '../../components/holders/RouteHolder.vue'
import { useRoute } from 'vue-router'
import { ref, Ref, watch } from 'vue'
import Bird from '../../interfaces/interface.bird'
import gql from 'graphql-tag'
import { useQuery } from '@vue/apollo-composable'

export default {
  components: {
    RouteHolder,
  },

  setup() {
    const { params } = useRoute()

    // const bird: Ref<Partial<Bird> | null> = ref(null)
    // partial --> een stuk van de interface van Bird

    // query bird ($id: String!) --> komt uit docs van graphql playground --> bij bird het type van id
    //$typeString --> naam is vrij te kiezen
    const BIRDS_BY_ID = gql`
      query bird($id: String!) {
        bird(id: $id) {
          id
          name
          url
          description
          category
        }
      }
    `
    const { result, loading, error } = useQuery(
      BIRDS_BY_ID,
      {
        id: params.id,
      },
    )

    const birdName: Ref<String | undefined> = ref(result?.value?.bird.name || '...')

    watch(result, (result) => {
      if (result) {
        birdName.value = result.bird.name
      }
    })

    return {
      result,
      loading,
      error,
      birdName,
    }
  },
}
</script>
