<template>
  <route-holder title="Observations">
    <ObservationTable />
  </route-holder>
</template>

<script lang="ts">
import RouteHolder from '../../components/holders/RouteHolder.vue'
import ObservationsTable from '../../components/observation/ObservationsTable.vue'
export default {
  components: {
    RouteHolder,
    ObservationsTable,
  },
}
</script>
