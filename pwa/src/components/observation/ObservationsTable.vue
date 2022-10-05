<template>
  <table>
    <tr>
      <th>Image</th>
      <th>Bird</th>
      <th>Location</th>
      <th>Name</th>
      <th>User</th>
      <th>Spotted on</th>
    </tr>
    <tbody v-if="observations.length > 0">
      <tr v-for="o of observations" :key="o.id">
        <td>
          <img
            :src="`/birds/${o.bird.name}.webp`"
            class="h-4"
          />
        </td>
        <td>{{ o.bird.name }}</td>
        <td>{{ o.location.name }}</td>
        <td>{{ o.name }}</td>
        <td>{{ o.userId }}</td>
        <td>{{ o.createdAt }}</td>
      </tr>
    </tbody>
    <tbody v-else>
      <p>No observations yet.</p>
    </tbody>
  </table>
</template>

<script lang="ts">
import { defineProps } from 'vue'
import Observation from '../../interfaces/interface.observation'
export default {
  setup() {
    const props = defineProps<{
      observations: Observation[]
    }>()

    return {
      observations: props.observations,
    }
  },
}
</script>
