<template>
  <table class="w-full mt-3">
    <tr class="text-left">
      <th>Image</th>
      <th>Bird</th>
      <th>Location</th>
      <th>Name</th>
      <th>User</th>
      <th>Spotted on</th>
    </tr>
    <tbody v-if="observations">
      <tr v-for="(o, i) of observations" :key="o.id" :class="i % 2 === 0? 'bg-neutral-100' : ''">
        <td>
          <RouterLink :to="`birds/${o.bird.id}/`">
              <img
                :src="`/birds/${o.bird.name}.webp`"
                class="h-12"
              />
          </RouterLink>
        </td>
        <td><RouterLink :to="`birds/${o.bird.id}/`">
            {{ o.bird.name }}
        </RouterLink></td>
        <td>{{ o.location.name }}</td>
        <td>{{ o.name }}</td>
        <td>{{ o.userId }}</td>
        <td>{{ new Date(o.createdAt).toLocaleDateString() }}</td>
      </tr>
    </tbody>
    <!-- <tbody v-else>
      <p>No observations yet.</p>
    </tbody> -->
  </table>
</template>

<script lang="ts">
import Observation from '../../interfaces/interface.observation'
console.log("test2")
export default {
    props: {
        observations: {
            type: Array as () => Observation[],
            required: true
        }
    },
    setup(props: any) {
        console.log("test")
        return {
        observations: props.observations,
        }
  },
}
</script>
