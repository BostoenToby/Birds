<template>
  <route-holder title="Locations">
    <template #header-actions>
      <router-link
        to="/locations/add"
        class="bg-theme rounded-md bg-neutral-800 px-4 py-2 text-white"
      >
        Add location
      </router-link>
    </template>

    <MapView
      :map-coordinates="{ lng: 3.3250207, lat: 50.8436179 }"
      @coordinateSelection="handleCoordinateSelection"
    />
  </route-holder>
</template>

<script lang="ts">
import gql from 'graphql-tag'
import RouteHolder from '../../components/holders/RouteHolder.vue'
import MapView from '../../components/generic/MapView.vue'

import { useQuery } from '@vue/apollo-composable'
import { LngLatLike } from 'mapbox-gl'

export default {
  components: {
    RouteHolder,
    MapView,
  },

  setup() {
    const handleCoordinateSelection = (e: LngLatLike) => {
      console.log(e)
    }

    return {
      handleCoordinateSelection,
    }
  },
}
</script>
